#!/usr/bin/env python3
"""Collect everything needed to write an OSISM security advisory from an OSSA.

Input is a single OpenStack Security Advisory (OSSA) reference. Accepted forms:

  https://review.opendev.org/c/openstack/ossa/+/1002324
  https://review.opendev.org/1002324
  1002324
  OSSA-2026-037
  https://security.openstack.org/ossa/OSSA-2026-037.html

The script resolves the OSSA change on Gerrit, reads the OSSA YAML, and then
collects from public sources:

  * Launchpad bugs referenced by the OSSA (title, tasks, description)
  * the upstream fix reviews per series on Gerrit (status, subject, files)
  * upstream series status (maintained / unmaintained / end of life)
  * released versions of the affected project per series and whether the
    fixed versions have been released
  * CVE records (state, description, CVSS)
  * the OSISM side in osism/container-images-kolla: patch files per release,
    the pull requests that added them, CHANGELOG entries and PR search hits
  * kolla image names and kolla-ansible image tag variables of the project
  * the local documentation repository: existing advisories, index entries,
    OSISM release support status

Everything is written to <output-dir>/<OSSA-ID>/dossier.md (readable summary)
and raw.json (all collected data). Failures of individual sources are
reported as warnings and do not abort the run. A lookup that failed is never
reported as a negative: the dossier says "lookup failed" / "unknown" and adds
an open point, so that an outage cannot turn into a statement about upstream.

Only the Python standard library is required. PyYAML is used when available;
without it YAML is parsed with parse_yaml_subset(), which covers the subset
used by openstack/ossa and openstack/releases. scripts/test_collect.py keeps
both parsers in agreement.
"""

from __future__ import annotations

import argparse
import base64
import email
import email.header
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

try:  # optional
    import yaml  # type: ignore
except ImportError:  # pragma: no cover
    yaml = None

GERRIT = "https://review.opendev.org"
OPENDEV_RAW = "https://opendev.org/{repo}/raw/branch/{branch}/{path}"
OPENDEV_API = "https://opendev.org/api/v1/repos/{repo}/contents/{path}?ref={ref}"
LP_API = "https://api.launchpad.net/1.0"
CVE_API = "https://cveawg.mitre.org/api/cve/{cve}"
GH_API = "https://api.github.com"
KOLLA_IMAGES_REPO = "osism/container-images-kolla"
KOLLA_IMAGES_RAW = "https://raw.githubusercontent.com/osism/container-images-kolla/main/{path}"
CFG_GENERICS_RAW = "https://raw.githubusercontent.com/osism/cfg-generics/main/{path}"
OSISM_DEFAULTS_RAW = "https://raw.githubusercontent.com/osism/defaults/main/{path}"
REGISTRY = "https://registry.osism.tech"
USER_AGENT = "osism-security-advisory-collector/1.0 (+https://osism.tech)"
TIMEOUT = 30

MAX_RENAME_HOPS = 10
GITHUB_MAX_PAGES = 10

COVERED_YES = "yes"
COVERED_UNVERIFIED = "unverified"
COVERED_NO = "no"
PUBLIC_SECURITY = "Public Security"
COVERED_LABEL = {COVERED_YES: "yes", COVERED_UNVERIFIED: "**unverified**", COVERED_NO: "**no**"}
GITHUB_UNKNOWN = {"skipped": "unknown (GitHub not queried)", "failed": "unknown (GitHub lookup failed)"}

RE_OSSA_ID = re.compile(r"(OSSA-\d{4}-\d{3})", re.IGNORECASE)
RE_PRODUCT_KEY = re.compile(r"[a-z0-9._-]+")
RE_CVE = re.compile(r"CVE-\d{4}-(?:\d{4,}|pending)", re.IGNORECASE)
RE_LP_BUG = re.compile(r"launchpad\.net/(?:bugs/|[^/\s]+/\+bug/)(\d+)")
RE_REVIEW = re.compile(r"review\.opendev\.org/(?:c/[^\s]+/\+/)?(\d+)")
RE_RELEASE_ID = re.compile(r"(\d{4}\.\d)")
RE_VERSION = re.compile(r"\d+(?:\.\d+)+")


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #


def slugify_subject(subject: str, limit: int = 52) -> str:
    """Mimic git format-patch file naming: non-alphanumerics become '-'."""
    slug = re.sub(r"[^A-Za-z0-9]+", "-", subject).strip("-")
    return slug[:limit].rstrip("-").lower()


def patch_slug(filename: str) -> str:
    name = Path(filename).name
    name = re.sub(r"^\d{4}-", "", name)
    name = re.sub(r"\.patch$", "", name)
    return name.lower()


def version_tuple(version: str) -> tuple[int, ...]:
    return tuple(int(x) for x in version.split("."))


def parse_version_ranges(spec: str) -> dict:
    """Parse '>=13.0.0 <27.0.3, >=28.0.0 <28.0.3, ==21.0.0' style ranges.

    '<X' names the fixed version, '==X' (also written '=X' or as a bare version) a single
    vulnerable version, '<=X' the last vulnerable version: the fixed version is then the next
    release and is not named by the OSSA.
    """
    ranges, fixed, pinned, last_vulnerable = [], [], [], []
    for chunk in re.split(r"\s*,\s*", spec.strip()):
        if not chunk:
            continue
        ranges.append(chunk)
        if RE_VERSION.fullmatch(chunk):
            pinned.append(chunk)
            continue
        for op, ver in re.findall(r"(<=|>=|==|<|>|=)\s*(\d+(?:\.\d+)*)", chunk):
            if op == "<":
                fixed.append(ver)
            elif op in ("==", "="):
                pinned.append(ver)
            elif op == "<=":
                last_vulnerable.append(ver)
    return {"ranges": ranges, "fixed_versions": sorted(set(fixed), key=version_tuple),
            "pinned_versions": sorted(set(pinned), key=version_tuple),
            "last_vulnerable_versions": sorted(set(last_vulnerable), key=version_tuple)}


def normalise_products(entries: list[dict]) -> list[dict]:
    """Turn 'affected-products' into one entry per deliverable.

    'product' becomes the lowercase deliverable name that the upstream paths use
    (deliverables/<series>/<product>.yaml, kolla docker/<product>), 'product_display' keeps the
    spelling of the OSSA. A field naming several products ('Cinder, Glance, Nova') is split; its
    version string is split on ';' when every part starts with the product name.
    """
    result = []
    for entry in entries or []:
        display = str(entry.get("product") or "").strip().strip("'\"").strip()
        version = str(entry.get("version") or "").strip().strip("'\"").strip()
        if not display:
            continue
        names = [n.strip() for n in display.split(",") if n.strip()]
        versions = {}
        if len(names) > 1:
            for part in version.split(";"):
                part = part.strip()
                for name in names:
                    if part.lower().startswith(name.lower() + " "):
                        versions[name] = part[len(name):].strip()
        for name in names:
            key = name.lower()
            ver = versions.get(name, version) if len(versions) == len(names) else version
            result.append({"product": key, "product_display": name, "version": ver,
                           "split_from": display if len(names) > 1 else None,
                           "valid_name": bool(RE_PRODUCT_KEY.fullmatch(key)),
                           **parse_version_ranges(ver)})
    return result


def select_ossa_file(files: list[str], wanted: str | None) -> str:
    """Pick the OSSA document out of the ossa/OSSA-* files of a change — without guessing.

    Changes that add several advisories at once are routine in openstack/ossa. With an OSSA id the
    matching file is taken (hard error when there is none); without one a change touching several
    advisories is a hard error, because there is no stated target to check a guess against.
    """
    files = sorted(files)
    by_id: dict[str, list[str]] = {}
    for f in files:
        if m := RE_OSSA_ID.search(f):
            by_id.setdefault(m.group(1).upper(), []).append(f)
    if wanted:
        candidates = by_id.get(wanted.upper())
        if not candidates:
            sys.exit(f"error: the change does not contain a file for {wanted} (OSSA files: {', '.join(files)})")
    elif len(by_id) > 1:
        sys.exit(f"error: the change touches several advisories ({', '.join(sorted(by_id))}); "
                 "pass the OSSA id of the one you want instead of the change")
    elif not by_id:
        sys.exit(f"error: cannot derive an OSSA id from {', '.join(files)}")
    else:
        candidates = next(iter(by_id.values()))
    return next((f for f in candidates if f.endswith((".yaml", ".yml"))), candidates[-1])


def resolve_series(version: str, per_series: dict) -> dict:
    """Map a version of a deliverable to its OpenStack series — or say that it cannot be done.

    Authoritative: the version is listed in the deliverable file of a series. Accepted as well: the
    version is unreleased, the deliverable is 'cycle-with-rc' (one major version per series) and
    exactly one series carries that major. Everything else — libraries and other independently
    numbered deliverables share a major across many series — is reported as candidates only.
    """
    for rid, info in per_series.items():
        if version in info.get("versions", []):
            return {"series": rid, "candidates": [rid], "basis": "released"}
    major = version.split(".")[0]
    minor = ".".join(version.split(".")[:2])
    by_major = [rid for rid, info in per_series.items()
                if any(v.split(".")[0] == major for v in info.get("versions", []))]
    by_minor = [rid for rid in by_major
                if any(".".join(v.split(".")[:2]) == minor for v in per_series[rid].get("versions", []))]
    if len(by_major) == 1 and per_series[by_major[0]].get("release_model") == "cycle-with-rc":
        return {"series": by_major[0], "candidates": by_major, "basis": "major version (cycle-with-rc)"}
    return {"series": None, "candidates": by_minor or by_major, "basis": None}


def coverage_state(confirmed_patch: bool, confirmed_review: bool, unverified_evidence: bool) -> str:
    """'yes' needs confirmed evidence; anything weaker is 'unverified' and is asked like 'no'."""
    if confirmed_patch or confirmed_review:
        return COVERED_YES
    return COVERED_UNVERIFIED if unverified_evidence else COVERED_NO


def md_table(headers: list[str], rows: list[list[str]]) -> str:
    if not rows:
        return "_none_\n"
    widths = [len(h) for h in headers]
    for row in rows:
        for i, cell in enumerate(row):
            widths[i] = max(widths[i], len(str(cell)))
    line = "| " + " | ".join(str(h).ljust(widths[i]) for i, h in enumerate(headers)) + " |"
    sep = "|" + "|".join(":" + "-" * (widths[i] + 1) for i in range(len(headers))) + "|"
    body = ["| " + " | ".join(str(c).ljust(widths[i]) for i, c in enumerate(row)) + " |" for row in rows]
    return "\n".join([line, sep] + body) + "\n"


def excerpt(text: str, limit: int) -> str:
    text = (text or "").strip()
    return text if len(text) <= limit else text[:limit].rstrip() + " […]"


def parse_patch_header(text: str) -> dict:
    """Extract subject, author, date, Change-Id and bug references from a git format-patch file."""
    info: dict = {"subject": None, "author": None, "date": None, "change_id": None, "bugs": []}
    if not text:
        return info
    lines = text.splitlines()
    if lines and lines[0].startswith("From ") and "Mon Sep 17 00:00:00 2001" in lines[0]:
        lines = lines[1:]
    head, _, _ = "\n".join(lines).partition("\n---\n")
    try:
        msg = email.message_from_string(head)
    except Exception:  # pragma: no cover - defensive
        return info
    subject = msg.get("Subject")
    if subject:
        try:
            subject = str(email.header.make_header(email.header.decode_header(subject)))
        except Exception:  # pragma: no cover - defensive
            pass
        subject = re.sub(r"^\s*\[PATCH[^\]]*\]\s*", "", " ".join(subject.split()))
        info["subject"] = subject or None
    info["author"] = msg.get("From")
    info["date"] = msg.get("Date")
    body = msg.get_payload() if isinstance(msg.get_payload(), str) else ""
    if m := re.search(r"^Change-Id:\s*(I[0-9a-f]{40})", body, re.MULTILINE):
        info["change_id"] = m.group(1)
    info["bugs"] = sorted({int(b) for b in re.findall(r"(?:Closes|Related|Partial)-Bug:\s*#?(\d+)", body)})
    return info


# --------------------------------------------------------------------------- #
# YAML without PyYAML
# --------------------------------------------------------------------------- #


class _MiniYaml:
    """Parser for the YAML subset of openstack/ossa and openstack/releases.

    Block mappings and sequences, plain / quoted / block scalars including multi-line folding,
    comments and simple flow sequences. No anchors, tags, flow mappings or multiple documents.
    Plain scalars stay strings except booleans and null; the collector str()s what it reads.
    """

    def __init__(self, text: str) -> None:
        self.lines = text.expandtabs().splitlines()
        self.i = 0

    @staticmethod
    def _indent(line: str) -> int:
        return len(line) - len(line.lstrip(" "))

    def _skip(self) -> None:
        while self.i < len(self.lines):
            stripped = self.lines[self.i].strip()
            if stripped and not stripped.startswith("#") and stripped not in ("---", "..."):
                return
            self.i += 1

    def parse(self):
        self._skip()
        if self.i >= len(self.lines):
            return None
        return self._node(self._indent(self.lines[self.i]))

    @staticmethod
    def _is_item(body: str) -> bool:
        return body == "-" or body.startswith("- ")

    @staticmethod
    def _find_close(text: str, quote: str) -> int | None:
        i = 0
        while i < len(text):
            if quote == '"' and text[i] == "\\":
                i += 2
                continue
            if text[i] == quote:
                if quote == "'" and text[i + 1:i + 2] == "'":
                    i += 2
                    continue
                return i
            i += 1
        return None

    def _split_key(self, body: str) -> tuple[str, str] | None:
        if self._is_item(body):
            return None
        if body[:1] in ("'", '"'):
            end = self._find_close(body[1:], body[0])
            if end is None:
                return None
            after = body[end + 2:]
            if after == ":" or after.startswith(": "):
                return self._unquote(body[1:end + 1], body[0]), after[1:].strip()
            return None
        m = re.match(r"^(\S.*?):(?: +(.*))?$", body)
        return (m.group(1).rstrip(), (m.group(2) or "").strip()) if m else None

    def _node(self, indent: int):
        body = self.lines[self.i][indent:]
        if self._is_item(body):
            return self._seq(indent)
        if self._split_key(body):
            return self._map(indent)
        self.i += 1
        return self._value(body.strip(), indent - 1)

    def _map(self, indent: int) -> dict:
        out: dict = {}
        while True:
            self._skip()
            if self.i >= len(self.lines):
                break
            line = self.lines[self.i]
            if self._indent(line) != indent:
                if self._indent(line) > indent:
                    raise ValueError(f"unexpected indentation in line {self.i + 1}")
                break
            pair = self._split_key(line[indent:])
            if pair is None:
                break
            self.i += 1
            out[pair[0]] = self._value(pair[1], indent)
        return out

    def _seq(self, indent: int) -> list:
        out: list = []
        while True:
            self._skip()
            if self.i >= len(self.lines):
                break
            line = self.lines[self.i]
            if self._indent(line) != indent or not self._is_item(line[indent:]):
                break
            rest = line[indent + 1:].lstrip(" ")
            if rest and self._split_key(rest):
                # "- key: value" opens a mapping whose keys align with the text after the dash
                content_indent = len(line) - len(rest)
                self.lines[self.i] = " " * content_indent + rest
                out.append(self._map(content_indent))
            else:
                self.i += 1
                out.append(self._value(rest, indent, in_sequence=True))
        return out

    def _value(self, rest: str, parent_indent: int, in_sequence: bool = False):
        if not rest or rest.startswith("#"):
            self._skip()
            if self.i >= len(self.lines):
                return None
            indent = self._indent(self.lines[self.i])
            same_level_list = (indent == parent_indent and not in_sequence
                               and self._is_item(self.lines[self.i][indent:]))
            return self._node(indent) if indent > parent_indent or same_level_list else None
        if rest[0] in "|>":
            return self._block_scalar(rest, parent_indent)
        if rest[0] in ("'", '"'):
            return self._quoted(rest)
        plain = self._plain(rest, parent_indent)
        if plain.startswith("[") and plain.endswith("]"):
            return [item.strip().strip("'\"") for item in plain[1:-1].split(",") if item.strip()]
        if plain == "{}":
            return {}
        return {"true": True, "yes": True, "on": True, "false": False, "no": False, "off": False,
                "null": None, "~": None}.get(plain.lower(), plain)

    @staticmethod
    def _fold(parts: list[str]) -> str:
        """YAML line folding: a line break becomes a space, n empty lines become n line breaks."""
        out, blanks = "", 0
        for part in parts:
            if part == "":
                blanks += 1
                continue
            if out:
                out += "\n" * blanks if blanks else " "
            out += part
            blanks = 0
        return out

    def _plain(self, first: str, parent_indent: int) -> str:
        parts = [re.sub(r"\s+#.*$", "", first)]
        while self.i < len(self.lines):
            j = self.i
            while j < len(self.lines) and not self.lines[j].strip():
                j += 1
            if j >= len(self.lines) or self._indent(self.lines[j]) <= parent_indent \
                    or self.lines[j].strip().startswith("#"):
                break
            parts.extend([""] * (j - self.i))
            parts.append(re.sub(r"\s+#.*$", "", self.lines[j].strip()))
            self.i = j + 1
        return self._fold(parts)

    @staticmethod
    def _unquote(text: str, quote: str) -> str:
        if quote == "'":
            return text.replace("''", "'")
        escapes = {"n": "\n", "t": "\t", '"': '"', "\\": "\\", "/": "/", "0": "\0", " ": " "}
        return re.sub(r"\\(.)", lambda m: escapes.get(m.group(1), m.group(0)), text)

    def _quoted(self, first: str) -> str:
        quote, buf, parts = first[0], first[1:], []
        while True:
            end = self._find_close(buf, quote)
            if end is not None:
                parts.append(buf[:end] if not parts else buf[:end].lstrip())
                break
            parts.append(buf.rstrip() if not parts else buf.strip())
            if self.i >= len(self.lines):
                raise ValueError("unterminated quoted scalar")
            buf = self.lines[self.i]
            self.i += 1
        if quote == '"':  # a trailing backslash joins the lines without a space
            joined: list[str] = []
            for part in parts:
                if joined and joined[-1].endswith("\\") and not joined[-1].endswith("\\\\"):
                    joined[-1] = joined[-1][:-1] + part
                else:
                    joined.append(part)
            parts = joined
        return self._unquote(self._fold(parts), quote)

    def _block_scalar(self, header: str, parent_indent: int) -> str:
        style = header[0]
        chomp = "+" if "+" in header[:3] else "-" if "-" in header[:3] else ""
        block = []
        while self.i < len(self.lines):
            line = self.lines[self.i]
            if line.strip() and self._indent(line) <= parent_indent:
                break
            block.append(line)
            self.i += 1
        filled = [line for line in block if line.strip()]
        if not filled:
            return ""
        content_indent = self._indent(filled[0])
        lines = [line[content_indent:] if line.strip() else "" for line in block]
        trailing = 0
        while lines and lines[-1] == "":
            lines.pop()
            trailing += 1
        if style == "|":
            text = "\n".join(lines)
        else:  # folded: more-indented lines keep their line breaks
            text, blanks, prev = lines[0], 0, lines[0]
            for line in lines[1:]:
                if line == "":
                    blanks += 1
                    continue
                if line.startswith(" ") or prev.startswith(" "):
                    text += "\n" * (blanks + 1)
                else:
                    text += "\n" * blanks if blanks else " "
                text += line
                prev, blanks = line, 0
        if chomp == "-":
            return text
        return text + "\n" + ("\n" * trailing if chomp == "+" else "")


def parse_yaml_subset(text: str):
    """Parse YAML without PyYAML; raises ValueError for input outside the supported subset."""
    try:
        return _MiniYaml(text).parse()
    except (IndexError, KeyError) as err:
        raise ValueError(f"unsupported YAML: {err}") from err


# --------------------------------------------------------------------------- #
# collector
# --------------------------------------------------------------------------- #


class _Failed:
    """Falsy marker: the lookup failed, so the answer is unknown.

    None is reserved for a confirmed negative (an allowed HTTP 404). Callers that only need a
    default keep writing `or {}`; callers that turn a miss into a statement must tell None and
    FAILED apart.
    """

    __slots__ = ()

    def __bool__(self) -> bool:
        return False

    def __repr__(self) -> str:
        return "FAILED"


FAILED = _Failed()


class Collector:
    def __init__(self, repo_dir: Path, output_dir: Path, use_github: bool = True) -> None:
        self.repo_dir = repo_dir
        self.output_dir = output_dir
        self.use_github = use_github
        self.warnings: list[str] = []
        self._path_commits: dict = {}
        self._commit_details: dict = {}
        self.gh = shutil.which("gh") if use_github else None
        self.github_token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
        self.data: dict = {"generated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                           "github_skipped": not use_github}
        if not use_github:
            self.warn("GitHub is not queried (--no-github): OSISM patch files, pull requests, built releases "
                      "and tag dates are UNKNOWN, not absent — look them up manually")
        if yaml is None:
            self.warn("PyYAML is not installed — YAML is parsed with the built-in subset parser; "
                      "compare the OSSA core data in section 2 with the raw YAML")

    # ---- transport -------------------------------------------------------- #

    def warn(self, message: str) -> None:
        self.warnings.append(message)
        print(f"  ! {message}", file=sys.stderr)

    def fetch(self, url: str, headers: dict | None = None, allow_404: bool = False):
        """Body as bytes; None for an allowed 404 (confirmed negative); FAILED for everything else."""
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **(headers or {})})
        for attempt in (1, 2):
            try:
                with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
                    return resp.read()
            except urllib.error.HTTPError as err:
                if err.code == 404 and allow_404:
                    return None
                if attempt == 2 or err.code < 500:
                    self.warn(f"HTTP {err.code} for {url}")
                    return FAILED
            except (urllib.error.URLError, TimeoutError, OSError) as err:
                if attempt == 2:
                    self.warn(f"failed to fetch {url}: {err}")
                    return FAILED
        return FAILED

    def fetch_text(self, url: str, **kw):
        raw = self.fetch(url, **kw)
        return raw.decode("utf-8", "replace") if isinstance(raw, bytes) else raw

    def fetch_json(self, url: str, **kw):
        raw = self.fetch(url, headers={"Accept": "application/json"}, **kw)
        if not isinstance(raw, bytes):
            return raw
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.warn(f"invalid JSON from {url}")
            return FAILED

    def gerrit_json(self, path: str, allow_404: bool = False):
        raw = self.fetch(f"{GERRIT}/{path.lstrip('/')}", headers={"Accept": "application/json"},
                         allow_404=allow_404)
        if not isinstance(raw, bytes):
            return raw
        text = raw.decode("utf-8", "replace")
        if text.startswith(")]}'"):
            text = text.split("\n", 1)[1] if "\n" in text else ""
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            self.warn(f"invalid JSON from Gerrit {path}")
            return FAILED

    def github_json(self, path: str, allow_404: bool = False):
        """GitHub REST API via `gh api` when available, urllib otherwise. None / FAILED as in fetch()."""
        if not self.use_github:
            return FAILED
        if self.gh:
            proc = subprocess.run([self.gh, "api", path], capture_output=True, text=True)
            if proc.returncode == 0:
                try:
                    return json.loads(proc.stdout)
                except json.JSONDecodeError:
                    self.warn(f"invalid JSON from gh api {path}")
                    return FAILED
            if allow_404 and "HTTP 404" in proc.stderr:
                return None
            self.warn(f"gh api {path} failed: {proc.stderr.strip()[:200]}")
            return FAILED
        headers = {"Accept": "application/vnd.github+json"}
        if self.github_token:
            headers["Authorization"] = f"Bearer {self.github_token}"
        raw = self.fetch(f"{GH_API}/{path.lstrip('/')}", headers=headers, allow_404=allow_404)
        if not isinstance(raw, bytes):
            return raw
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.warn(f"invalid JSON from GitHub {path}")
            return FAILED

    def github_list(self, path: str):
        """All pages of a GitHub list endpoint, or FAILED."""
        items: list = []
        for page in range(1, GITHUB_MAX_PAGES + 1):
            chunk = self.github_json(f"{path}{'&' if '?' in path else '?'}per_page=100&page={page}")
            if not isinstance(chunk, list):
                return FAILED
            items.extend(chunk)
            if len(chunk) < 100:
                return items
        self.warn(f"GitHub listing {path} has more than {GITHUB_MAX_PAGES} pages; the oldest entries are missing")
        return FAILED

    def load_yaml(self, text: str, what: str):
        try:
            return yaml.safe_load(text) if yaml is not None else parse_yaml_subset(text)
        except Exception as err:  # yaml.YAMLError or ValueError; neither may abort the run
            self.warn(f"cannot parse YAML of {what}: {err}")
            return None

    # ---- step 1: resolve the OSSA reference ------------------------------- #

    def resolve(self, reference: str) -> None:
        print(f"==> Resolving {reference}")
        reference = reference.strip()
        change_number = None
        ossa_id = None

        if m := re.fullmatch(r"\d+", reference):
            change_number = int(m.group())
        elif m := RE_REVIEW.search(reference):
            change_number = int(m.group(1))
        elif m := RE_OSSA_ID.search(reference):
            ossa_id = m.group(1).upper()
        else:
            sys.exit(f"error: cannot interpret OSSA reference {reference!r}")

        if ossa_id and change_number is None:
            query = urllib.parse.quote(f'project:openstack/ossa message:"{ossa_id}"', safe=":/\"")
            changes = self.gerrit_json(f"changes/?q={query}&o=CURRENT_REVISION&o=CURRENT_FILES&n=20") or []
            candidates = []
            for change in changes:
                rev = change.get("revisions", {}).get(change.get("current_revision"), {})
                files = list(rev.get("files", {}).keys())
                if any(ossa_id in f for f in files):
                    candidates.append(change)
            candidates.sort(key=lambda c: (c.get("status") != "MERGED", -c.get("_number", 0)))
            if not candidates:
                self.warn(f"no Gerrit change in openstack/ossa found for {ossa_id}; "
                          "falling back to the master branch of openstack/ossa")
            else:
                change_number = candidates[0]["_number"]
                self.data["ossa_gerrit_candidates"] = [
                    {"number": c["_number"], "status": c.get("status"), "subject": c.get("subject")}
                    for c in candidates]

        change = None
        if change_number is not None:
            change = self.gerrit_json(f"changes/{change_number}?o=CURRENT_REVISION&o=CURRENT_COMMIT"
                                      "&o=CURRENT_FILES")
            if not change:
                sys.exit(f"error: Gerrit change {change_number} could not be loaded")
            if change.get("project") != "openstack/ossa":
                self.warn(f"change {change_number} belongs to {change.get('project')}, "
                          "not openstack/ossa")

        self.data["input"] = {"reference": reference, "change_number": change_number, "ossa_id": ossa_id}
        self.change = change

    # ---- step 2: load and parse the OSSA document ------------------------- #

    def load_ossa(self) -> None:
        print("==> Loading OSSA document")
        change = self.change
        info: dict = {}
        text = None
        path = None

        if change:
            rev = change["revisions"][change["current_revision"]]
            files = [f for f in rev.get("files", {}) if f.startswith("ossa/OSSA-")]
            if not files:
                self.warn("the change does not touch an ossa/OSSA-*.{yaml,rst} file")
            else:
                path = select_ossa_file(files, self.data["input"]["ossa_id"])
                if len(files) > 1:
                    self.warn(f"the change touches {len(files)} OSSA files ({', '.join(sorted(files))}); using {path}")
                raw = self.fetch(f"{GERRIT}/changes/{change['_number']}/revisions/current/files/"
                                 f"{urllib.parse.quote(path, safe='')}/content")
                if raw:
                    text = base64.b64decode(raw).decode("utf-8", "replace")
            info = {
                "number": change["_number"],
                "url": f"{GERRIT}/c/{change['project']}/+/{change['_number']}",
                "project": change.get("project"),
                "branch": change.get("branch"),
                "topic": change.get("topic"),
                "subject": change.get("subject"),
                "status": change.get("status"),
                "created": change.get("created"),
                "updated": change.get("updated"),
                "submitted": change.get("submitted"),
                "current_revision": change.get("current_revision"),
                "commit_message": rev.get("commit", {}).get("message"),
                "files": sorted(rev.get("files", {}).keys()),
            }

        ossa_id = self.data["input"]["ossa_id"]
        if path is None and ossa_id:
            path = f"ossa/{ossa_id}.yaml"
        if path and ossa_id is None:
            m = RE_OSSA_ID.search(path)
            if not m:
                sys.exit(f"error: cannot derive an OSSA id from {path}")
            ossa_id = m.group(1).upper()
            self.data["input"]["ossa_id"] = ossa_id

        master_text = None
        if path:
            master_text = self.fetch_text(OPENDEV_RAW.format(repo="openstack/ossa", branch="master", path=path),
                                          allow_404=True) or None
        if text is None:
            text = master_text
            if text is not None:
                self.warn("using the OSSA document from the master branch of openstack/ossa")
        if text is None:
            sys.exit("error: OSSA document could not be loaded from Gerrit or opendev.org")

        info["path"] = path
        info["master_identical"] = (master_text == text) if master_text is not None else None
        if master_text is not None and master_text != text:
            self.warn("the OSSA document on master differs from the reviewed change "
                      "(errata or later edits?) — both versions are in raw.json")

        # other changes in openstack/ossa mentioning this advisory (errata)
        related = []
        if ossa_id:
            query = urllib.parse.quote(f'project:openstack/ossa message:"{ossa_id}"', safe=":/\"")
            for c in self.gerrit_json(f"changes/?q={query}&n=20") or []:
                related.append({"number": c["_number"], "status": c.get("status"), "subject": c.get("subject"),
                                "updated": c.get("updated"), "url": f"{GERRIT}/{c['_number']}"})
        info["related_ossa_changes"] = related

        self.data["ossa_change"] = info
        self.data["ossa_text"] = text
        self.data["ossa_text_master"] = master_text if master_text != text else None
        self.ossa = self.parse_ossa(text, path or "")
        if ossa_id and str(self.ossa.get("id") or ossa_id).upper() != ossa_id:
            self.warn(f"{path} was selected for {ossa_id} but its id field says {self.ossa['id']} — "
                      "check that this is the advisory you asked for")
            self.ossa["id_in_document"], self.ossa["id"] = self.ossa["id"], ossa_id
        self.data["ossa"] = self.ossa
        print(f"    {self.ossa.get('id')}: {self.ossa.get('title')}")

    def parse_ossa(self, text: str, path: str) -> dict:
        doc = self.load_yaml(text, "OSSA document") if path.endswith((".yaml", ".yml")) else None
        ossa: dict = {"format": "yaml" if isinstance(doc, dict) else "text"}
        if not isinstance(doc, dict):
            self.warn("the OSSA document could not be parsed as YAML — title, description, products, notes and "
                      "errata are NOT extracted; read the raw document")
            doc = {}

        def entries(key: str) -> list[dict]:
            return [e for e in doc.get(key) or [] if isinstance(e, dict)]

        def as_list(value) -> list:
            return [value] if isinstance(value, str) else list(value or [])

        issues = doc.get("issues") if isinstance(doc.get("issues"), dict) else {}
        reviews = doc.get("reviews") if isinstance(doc.get("reviews"), dict) else {}
        ossa.update({
            "id": doc.get("id"),
            "title": doc.get("title"),
            "date": str(doc.get("date")) if doc.get("date") else None,
            "description": str(doc.get("description") or "").strip(),
            "errata": str(doc.get("errata") or "").strip(),
            "affected_products": normalise_products(entries("affected-products")),
            "cves": [str(v["cve-id"]) for v in entries("vulnerabilities") if v.get("cve-id")],
            "reporters": [{"name": r.get("name"), "affiliation": r.get("affiliation")} for r in entries("reporters")],
            "issue_links": [str(link) for link in as_list(issues.get("links"))],
            "reviews": {str(k): [str(u) for u in as_list(v)] for k, v in reviews.items()
                        if not isinstance(v, dict)},
            "notes": [str(n).strip() for n in as_list(doc.get("notes"))],
            "errata_history": [str(e) for e in as_list(doc.get("errata_history"))],
        })

        # union with regex extraction — robust against schema drift
        ossa["bugs"] = sorted({int(b) for b in RE_LP_BUG.findall(text)} |
                              {int(b) for link in ossa.get("issue_links", []) for b in RE_LP_BUG.findall(link)})
        ossa["review_numbers"] = sorted({int(n) for n in RE_REVIEW.findall(text)})
        cves = {c.upper() for c in RE_CVE.findall(text)} | {c.upper() for c in ossa.get("cves", [])}
        ossa["cves"] = sorted(cves)
        ossa["cves_pending"] = sorted(c for c in cves if c.endswith("PENDING"))
        ossa["cves_pending_count"] = sum(1 for c in RE_CVE.findall(text) if c.upper().endswith("PENDING"))
        ossa["cves_assigned"] = sorted(c for c in cves if not c.endswith("PENDING"))
        if not ossa.get("id"):
            m = RE_OSSA_ID.search(path) or RE_OSSA_ID.search(text)
            ossa["id"] = m.group(1).upper() if m else None
        ossa["products"] = [p["product"] for p in ossa["affected_products"]]
        for p in ossa["affected_products"]:
            if p["split_from"]:
                self.warn(f"the OSSA names several products in one field ({p['split_from']!r}); "
                          f"split into {p['product']!r} with the range {p['version']!r}")
            if not p["valid_name"]:
                self.warn(f"product {p['product_display']!r} does not look like a deliverable name — "
                          "the upstream release, kolla and patch lookups for it come back empty")
        return ossa

    # ---- step 3: Launchpad ------------------------------------------------ #

    def collect_bugs(self) -> None:
        print("==> Launchpad bugs")
        bugs = []
        for bug_id in self.ossa["bugs"]:
            bug = self.fetch_json(f"{LP_API}/bugs/{bug_id}", allow_404=True)
            if not bug:
                # a private bug answers 404 to anonymous requests, exactly like a deleted one
                error = "not readable (HTTP 404: private, embargoed or missing)" if bug is None else "lookup failed"
                self.warn(f"Launchpad bug {bug_id}: {error}")
                bugs.append({"id": bug_id, "web_link": f"https://bugs.launchpad.net/bugs/{bug_id}",
                             "error": error})
                continue
            tasks = self.fetch_json(f"{LP_API}/bugs/{bug_id}/bug_tasks") or {}
            attachments = self.fetch_json(f"{LP_API}/bugs/{bug_id}/attachments") or {}
            entry = {
                "id": bug_id,
                "title": bug.get("title"),
                "information_type": bug.get("information_type"),
                "date_created": bug.get("date_created"),
                "tags": bug.get("tags"),
                "web_link": bug.get("web_link"),
                "description": bug.get("description"),
                "cves_in_title": sorted({c.upper() for c in RE_CVE.findall(bug.get("title") or "")}),
                "tasks": [{"target": t.get("bug_target_name"), "status": t.get("status"),
                           "importance": t.get("importance")} for t in tasks.get("entries", [])],
                "attachments": [{"title": a.get("title"), "type": a.get("type"), "link": a.get("web_link")}
                                for a in attachments.get("entries", [])],
            }
            bugs.append(entry)
            print(f"    #{bug_id} [{entry['information_type']}] {entry['title']}")
        self.data["bugs"] = bugs
        title_cves = {c for b in bugs for c in b.get("cves_in_title", []) if not c.endswith("PENDING")}
        extra = sorted(title_cves - set(self.ossa["cves_assigned"]))
        if extra:
            self.warn(f"CVE ids found in Launchpad titles but not in the OSSA: {', '.join(extra)}")
            self.ossa["cves_assigned"] = sorted(set(self.ossa["cves_assigned"]) | title_cves)

    # ---- step 4: upstream fix reviews ------------------------------------ #

    def collect_reviews(self) -> None:
        print("==> Upstream fix reviews on Gerrit")
        listed = {}
        for series_label, urls in self.ossa.get("reviews", {}).items():
            for url in urls:
                if m := RE_REVIEW.search(url):
                    listed[int(m.group(1))] = series_label
        for number in self.ossa.get("review_numbers", []):
            if self.change and number == self.change.get("_number"):
                continue
            listed.setdefault(number, None)

        # additional changes referencing the bugs (follow-ups not listed in the OSSA)
        found_numbers: set[int] = set()
        for bug_id in self.ossa["bugs"]:
            for query in (f"message:{bug_id}", f"topic:bug/{bug_id}"):
                q = urllib.parse.quote(query, safe=":/")
                for c in self.gerrit_json(f"changes/?q={q}&n=100") or []:
                    if c.get("project") != "openstack/ossa":
                        found_numbers.add(c["_number"])

        reviews = []
        for number in sorted(set(listed) | found_numbers):
            c = self.gerrit_json(f"changes/{number}?o=CURRENT_REVISION&o=CURRENT_COMMIT&o=CURRENT_FILES",
                                 allow_404=True)
            if not c:
                self.warn(f"Gerrit change {number} not readable")
                continue
            rev = c.get("revisions", {}).get(c.get("current_revision"), {})
            message = rev.get("commit", {}).get("message", "")
            reviews.append({
                "number": number,
                "url": f"{GERRIT}/{number}",
                "project": c.get("project"),
                "branch": c.get("branch"),
                "status": c.get("status"),
                "change_id": c.get("change_id"),
                "subject": c.get("subject"),
                "subject_slug": slugify_subject(c.get("subject", "")),
                "topic": c.get("topic"),
                "created": c.get("created"),
                "updated": c.get("updated"),
                "submitted": c.get("submitted"),
                "current_revision": c.get("current_revision"),
                "series_label": listed.get(number),
                "listed_in_ossa": number in listed,
                "closes_bugs": sorted({int(b) for b in re.findall(r"(?:Closes|Related|Partial)-Bug:\s*#?(\d+)", message)}),
                "files": sorted(f for f in rev.get("files", {}) if f != "/COMMIT_MSG"),
                "commit_message": message,
            })
        # A review is a confirmed fix when the OSSA lists it or when it shares the Change-Id of a listed
        # review (backport of the same change). Everything else only mentions the bug: follow-ups,
        # prerequisites and Related-Bug cleanups must not count as "the fix is merged on this branch".
        listed_change_ids = {r["change_id"] for r in reviews if r["listed_in_ossa"] and r["change_id"]}
        for r in reviews:
            r["confirmed_fix"] = r["listed_in_ossa"] or r["change_id"] in listed_change_ids
        reviews.sort(key=lambda r: (r["project"] or "", r["branch"] or "", r["number"]))
        self.data["reviews"] = reviews
        for r in reviews:
            flag = "" if r["listed_in_ossa"] else ("  (not listed in OSSA, same Change-Id as a listed review)"
                                                   if r["confirmed_fix"] else "  (not listed in OSSA)")
            print(f"    {r['number']} {r['project']} {r['branch']} {r['status']}: {r['subject']}{flag}")

    # ---- step 5: upstream series and releases ----------------------------- #

    def collect_series(self) -> None:
        print("==> Upstream series status")
        text = self.fetch_text(OPENDEV_RAW.format(repo="openstack/releases", branch="master",
                                                  path="data/series_status.yaml"))
        series = []
        doc = self.load_yaml(text, "series_status.yaml") if text else None
        if isinstance(doc, list):
            for s in doc:
                series.append({"name": s.get("name"), "release_id": str(s.get("release-id")),
                               "status": s.get("status"), "initial_release": str(s.get("initial-release") or ""),
                               "eol_date": str(s.get("eol-date") or ""),
                               "next_phase": s.get("next-phase") or {}, "slurp": bool(s.get("slurp"))})
        else:
            self.warn("upstream series status not available — branch names and release status are unknown")
        self.data["series"] = series
        self.series_by_id = {s["release_id"]: s for s in series}
        self.series_by_name = {s["name"]: s for s in series}

    def branch_for(self, release_id: str) -> str:
        """Upstream branch of a release, from its series status."""
        status = self.series_by_id.get(release_id, {}).get("status")
        if status == "unmaintained":
            return f"unmaintained/{release_id}"
        return "master" if status == "development" else f"stable/{release_id}"

    def collect_releases(self) -> None:
        print("==> Upstream releases of the affected products")
        products = self.ossa.get("products") or []
        relevant_ids = set(self.osism_built_releases) if hasattr(self, "osism_built_releases") else set()
        for label in self.ossa.get("reviews", {}):
            if m := RE_RELEASE_ID.search(label):
                relevant_ids.add(m.group(1))
        for s in self.data.get("series", []):
            if s["status"] in ("development", "maintained"):
                relevant_ids.add(s["release_id"])
        releases: dict = {}
        for product in products:
            per_series = {}
            for rid in sorted(relevant_ids):
                s = self.series_by_id.get(rid)
                if not s:
                    continue
                url = OPENDEV_RAW.format(repo="openstack/releases", branch="master",
                                         path=f"deliverables/{s['name']}/{product}.yaml")
                text = self.fetch_text(url, allow_404=True)
                doc = self.load_yaml(text, url) if text else None
                if not isinstance(doc, dict):
                    # only a 404 says that upstream has no such deliverable in this series
                    per_series[rid] = {"series": s["name"],
                                       "error": "no deliverable file" if text is None else "lookup failed"}
                    continue
                versions = []
                for rel in doc.get("releases") or []:
                    hashes = [p.get("hash") for p in rel.get("projects") or []]
                    versions.append({"version": str(rel.get("version")), "hash": hashes[0] if hashes else None})
                branches = [b.get("name") for b in doc.get("branches") or []]
                # keep final releases only; rc tags and eom/eol markers are reported separately
                markers = [v["version"] for v in versions if not RE_VERSION.fullmatch(v["version"])]
                versions = [v for v in versions if RE_VERSION.fullmatch(v["version"])]
                versions.sort(key=lambda v: version_tuple(v["version"]))
                per_series[rid] = {"series": s["name"], "versions": [v["version"] for v in versions],
                                   "latest": versions[-1]["version"] if versions else None,
                                   "markers": markers, "branches": branches,
                                   "release_model": doc.get("release-model"),
                                   "release_notes": f"https://releases.openstack.org/{s['name']}/index.html"}
            releases[product] = per_series
        self.data["releases"] = releases

        # fixed versions from the OSSA ranges: released or not, and in which series?
        fixed = []
        for p in self.ossa.get("affected_products", []):
            product = p.get("product")
            per_series = releases.get(product, {})
            lookup_failed = any(info.get("error") == "lookup failed" for info in per_series.values())
            for ver in p.get("fixed_versions", []):
                resolved = resolve_series(ver, per_series)
                entry = {"product": product, "version": ver, "released": resolved["basis"] == "released",
                         "series": resolved["series"], "series_candidates": resolved["candidates"],
                         "series_basis": resolved["basis"], "lookup_failed": lookup_failed, "tag_date": None}
                if entry["released"]:
                    entry["tag_date"] = self.github_tag_date(product, ver)
                fixed.append(entry)
            for ver in p.get("pinned_versions", []):
                resolved = resolve_series(ver, per_series)
                entry = {"product": product, "version": ver, "pinned_vulnerable": True,
                         "series": resolved["series"], "series_candidates": resolved["candidates"],
                         "series_basis": resolved["basis"], "lookup_failed": lookup_failed,
                         "fixed_in": None, "released": False, "tag_date": None,
                         "note": "listed as '==' (only this version is vulnerable; the fix is the next release)"}
                if resolved["series"]:
                    later = [v for v in per_series[resolved["series"]].get("versions", [])
                             if version_tuple(v) > version_tuple(ver)]
                    if later:
                        entry["fixed_in"] = later[0]
                        entry["released"] = True
                        entry["tag_date"] = self.github_tag_date(product, later[0])
                fixed.append(entry)
        self.data["fixed_versions"] = fixed
        for f in fixed:
            series = f["series"] or f"series unverified, candidates: {', '.join(f['series_candidates']) or 'none'}"
            if f.get("pinned_vulnerable"):
                fix = f"fixed in {f['fixed_in']} (released)" if f.get("fixed_in") else "no later release yet"
                print(f"    {f['product']} =={f['version']} ({series}): {fix}")
                continue
            state = "released" if f["released"] else "NOT released yet"
            print(f"    {f['product']} {f['version']} ({series}): {state}"
                  + (f" on {f['tag_date']}" if f.get("tag_date") else ""))

    def github_tag_date(self, product: str, version: str) -> str | None:
        ref = self.github_json(f"repos/openstack/{product}/git/ref/tags/{version}", allow_404=True)
        if not ref:
            return None
        obj = ref.get("object", {})
        if obj.get("type") == "tag":
            tag = self.github_json(f"repos/openstack/{product}/git/tags/{obj.get('sha')}", allow_404=True) or {}
            return (tag.get("tagger") or {}).get("date")
        commit = self.github_json(f"repos/openstack/{product}/git/commits/{obj.get('sha')}", allow_404=True) or {}
        return (commit.get("committer") or {}).get("date")

    # ---- step 6: CVE records --------------------------------------------- #

    def collect_cves(self) -> None:
        print("==> CVE records")
        records = []
        for cve in self.ossa.get("cves_assigned", []):
            doc = self.fetch_json(CVE_API.format(cve=cve), allow_404=True)
            if not isinstance(doc, dict):
                # only a 404 says "not published"; a failed lookup says nothing about upstream
                state = "not published" if doc is None else "lookup failed"
                records.append({"id": cve, "state": state, "url": f"https://www.cve.org/CVERecord?id={cve}"})
                print(f"    {cve}: {state}")
                continue
            record = doc.get("containers", {}).get("cna", {})  # codespell:ignore cna
            metrics = []
            for m in record.get("metrics") or []:
                for key, val in m.items():
                    if key.startswith("cvss") and isinstance(val, dict):
                        metrics.append({"version": key, "score": val.get("baseScore"),
                                        "severity": val.get("baseSeverity"), "vector": val.get("vectorString")})
            records.append({
                "id": cve,
                "url": f"https://www.cve.org/CVERecord?id={cve}",
                "state": doc.get("cveMetadata", {}).get("state"),
                "published": doc.get("cveMetadata", {}).get("datePublished"),
                "title": record.get("title"),
                "description": next((d.get("value") for d in record.get("descriptions") or [] if d.get("lang", "en").startswith("en")), None),
                "metrics": metrics,
                "affected": record.get("affected"),
                "references": [r.get("url") for r in record.get("references") or []],
            })
            score = ", ".join(f"{m['version']} {m['score']} {m['severity']}" for m in metrics) or "no CVSS"
            print(f"    {cve}: {records[-1]['state']} ({score})")
        for cve in self.ossa.get("cves_pending", []):
            records.append({"id": cve, "state": "pending assignment"})
            print(f"    {cve}: pending assignment (re-check the Launchpad bug titles and the OSSA errata later)")
        self.data["cves"] = records

    # ---- step 7: OSISM container-images-kolla ----------------------------- #

    def patch_introduction(self, path: str) -> dict:
        """The commit that introduced a patch file, following renames like `git log --follow`.

        The commit list of a path does not follow renames, and the patch files are renumbered
        whenever a CVE batch is added: the oldest commit of the current path is then the
        renumbering, not the fix. The commit detail names the previous file name, so the chain is
        walked until a commit *adds* the file. 'verified' is False when the walk could not be
        completed; the returned commit is then only the best known candidate.
        """
        current, renamed_from, best, commits_of_path = path, [], None, []
        reason = f"more than {MAX_RENAME_HOPS} renames"
        for hop in range(MAX_RENAME_HOPS + 1):
            if current not in self._path_commits:
                self._path_commits[current] = self.github_list(
                    f"repos/{KOLLA_IMAGES_REPO}/commits?path={urllib.parse.quote(current, safe='')}")
            commits = self._path_commits[current]
            if hop == 0:
                commits_of_path = commits or []
            if not commits:
                reason = f"no commit history for {current}"
                break
            best = commits[-1]
            sha = best["sha"]
            if sha not in self._commit_details:
                self._commit_details[sha] = self.github_json(f"repos/{KOLLA_IMAGES_REPO}/commits/{sha}")
            files = (self._commit_details[sha] or {}).get("files") or []
            change = next((f for f in files if f.get("filename") == current), None)
            if change and change.get("status") == "added":
                return {"commit": best, "renamed_from": renamed_from, "verified": True, "reason": None,
                        "commits_of_path": commits_of_path}
            if change and change.get("status") == "renamed" and change.get("previous_filename"):
                current = change["previous_filename"]
                renamed_from.append(current)
                continue
            reason = (f"commit {sha[:7]} changes {current} with status {change.get('status')!r}" if change
                      else f"commit {sha[:7]} does not list {current} (lookup failed or more than 300 files)")
            break
        return {"commit": best, "renamed_from": renamed_from, "verified": False, "reason": reason,
                "commits_of_path": commits_of_path}

    def collect_osism_kolla(self) -> None:
        print("==> OSISM container-images-kolla")
        result: dict = {"repo": f"https://github.com/{KOLLA_IMAGES_REPO}"}
        products = self.ossa.get("products") or []
        product_variants = set()
        for p in products:
            product_variants |= {p, p.replace("-", "_"), p.replace("_", "-")}

        tree = self.github_json(f"repos/{KOLLA_IMAGES_REPO}/git/trees/main?recursive=1")
        # "skipped" and "failed" mean UNKNOWN: no built releases and no patch files must not read as "none"
        result["state"] = "ok" if tree else ("skipped" if not self.use_github else "failed")
        tree = tree or {}
        paths = [t["path"] for t in tree.get("tree", []) if t.get("type") == "blob"]
        if tree.get("truncated"):
            self.warn("GitHub tree listing of container-images-kolla was truncated")
        built = sorted({Path(p).stem for p in paths if p.startswith("defaults/") and re.fullmatch(r"defaults/\d{4}\.\d\.sh", p)})
        result["built_releases"] = built
        self.osism_built_releases = built

        patches: dict = {}
        overlays: dict = {}
        for path in paths:
            m = re.match(r"(patches|overlays)/(\d{4}\.\d)/([^/]+)/(.+)$", path)
            if not m:
                continue
            kind, rid, project_dir, rest = m.groups()
            if project_dir.lower() not in product_variants:
                continue
            target = patches if kind == "patches" else overlays
            target.setdefault(rid, []).append(path)

        reviews = self.data.get("reviews", [])
        ossa_bugs = set(self.ossa.get("bugs") or [])
        patch_entries: dict = {}
        pulls_cache: dict = {}
        foreign_cache: dict = {}
        for rid in built:
            entries = []
            for path in sorted(patches.get(rid, [])):
                if not path.endswith(".patch"):
                    continue
                header = parse_patch_header(self.fetch_text(KOLLA_IMAGES_RAW.format(path=path), allow_404=True) or "")
                slug = patch_slug(path)
                matches, match_kind = [], None
                if header.get("change_id"):
                    matches = [r for r in reviews if r.get("change_id") == header["change_id"]]
                    match_kind = "change-id" if matches else None
                if not matches:
                    matches = [r for r in reviews if r.get("subject_slug") and len(slug) >= 20
                               and (r["subject_slug"].startswith(slug) or slug.startswith(r["subject_slug"][:len(slug)]))]
                    match_kind = "file name" if matches else None
                if not matches and header.get("bugs") and ossa_bugs & set(header["bugs"]):
                    matches = [r for r in reviews if set(r.get("closes_bugs") or []) & set(header["bugs"])]
                    match_kind = "bug reference" if matches else None
                # Only the Change-Id of a confirmed fix review ties a patch file to this OSSA. A similar
                # file name or a shared bug number is a hint for the author, not evidence of coverage.
                confirmed = match_kind == "change-id" and any(r.get("confirmed_fix") for r in matches)
                branch_names = {f"stable/{rid}", f"unmaintained/{rid}"}
                same_branch = [r for r in matches if r.get("branch") in branch_names]
                entry = {
                    "path": path, "url": f"https://github.com/{KOLLA_IMAGES_REPO}/blob/main/{path}",
                    "subject": header.get("subject"), "change_id": header.get("change_id"),
                    "author": header.get("author"), "patch_date": header.get("date"), "bugs": header.get("bugs"),
                    "related_to_ossa": confirmed,
                    "related_unverified": bool(matches) and not confirmed,
                    "match_kind": match_kind,
                    "matches_upstream": [{"number": r["number"], "branch": r["branch"], "status": r["status"],
                                          "subject": r["subject"]} for r in (same_branch or matches)],
                }
                if not matches and header.get("change_id"):
                    cid = header["change_id"]
                    if cid not in foreign_cache:
                        found = self.gerrit_json(f"changes/?q=change:{cid}&n=10") or []
                        found.sort(key=lambda c: (c.get("branch") != "master", c.get("branch") or ""))
                        foreign_cache[cid] = [{"number": c["_number"], "project": c.get("project"), "branch": c.get("branch"),
                                              "status": c.get("status"), "subject": c.get("subject")} for c in found]
                    entry["foreign_upstream_changes"] = foreign_cache[cid]
                intro = self.patch_introduction(path)
                if intro["commit"]:
                    first = intro["commit"]
                    sha = first["sha"]
                    entry["added_by_commit"] = {"sha": sha, "date": first["commit"]["committer"]["date"],
                                               "subject": first["commit"]["message"].split("\n", 1)[0],
                                               "url": f"https://github.com/{KOLLA_IMAGES_REPO}/commit/{sha}",
                                               "renamed_from": intro["renamed_from"],
                                               "verified": intro["verified"], "unverified_reason": intro["reason"]}
                    if sha not in pulls_cache:
                        pulls = self.github_json(f"repos/{KOLLA_IMAGES_REPO}/commits/{sha}/pulls") or []
                        pulls_cache[sha] = [{"number": p["number"], "title": p["title"], "state": p["state"],
                                             "merged_at": p.get("merged_at"), "merge_commit_sha": p.get("merge_commit_sha"),
                                             "url": p["html_url"]} for p in pulls]
                    entry["pull_requests"] = pulls_cache[sha]
                    entry["later_commits"] = [{"sha": c["sha"][:7], "date": c["commit"]["committer"]["date"][:10],
                                               "subject": c["commit"]["message"].split("\n", 1)[0]}
                                              for c in intro["commits_of_path"] if c["sha"] != sha]
                else:
                    entry["added_by_commit"] = None
                    entry["attribution_error"] = intro["reason"]
                entries.append(entry)
            patch_entries[rid] = entries
            if entries:
                related = sum(1 for e in entries if e["related_to_ossa"])
                unverified = sum(1 for e in entries if e["related_unverified"])
                print(f"    {rid}: {len(entries)} patch file(s) for {', '.join(products)}, {related} related to this OSSA"
                      + (f", {unverified} possibly related (unverified)" if unverified else ""))
        result["patches"] = patch_entries
        result["overlays"] = {rid: sorted(v) for rid, v in overlays.items()}

        # CHANGELOG entries
        changelog = self.fetch_text(KOLLA_IMAGES_RAW.format(path="CHANGELOG.md")) or ""
        terms = set(self.ossa.get("cves_assigned", [])) | {self.ossa.get("id") or ""} | {str(b) for b in self.ossa["bugs"]}
        terms.discard("")
        hits = []
        version_header = None
        for line in changelog.splitlines():
            if line.startswith("## "):
                version_header = line[3:].strip()
                continue
            lowered = line.lower()
            if any(t.lower() in lowered for t in terms) or any(f"{p.lower()}:" in lowered or f" {p.lower()} " in lowered
                                                               for p in products if len(p) > 3) and ("cve" in lowered or "ossa" in lowered or "ossn" in lowered or "security" in lowered):
                hits.append({"version": version_header, "line": line.strip()})
        result["changelog_hits"] = hits

        # PR search
        searches = []
        for term in sorted(terms) + [f"{p} CVE" for p in products] + [f"{p} security" for p in products]:
            q = urllib.parse.quote(f"repo:{KOLLA_IMAGES_REPO} is:pr {term}")
            found = self.github_json(f"search/issues?q={q}&per_page=15&sort=updated") or {}
            for item in found.get("items", []):
                searches.append({"term": term, "number": item["number"], "title": item["title"],
                                 "state": item["state"], "closed_at": item.get("closed_at"), "url": item["html_url"]})
        dedup: dict = {}
        for s in searches:
            dedup.setdefault(s["number"], s)["terms"] = sorted(set(dedup.get(s["number"], {}).get("terms", []) + [s["term"]]))
        result["pr_search_hits"] = sorted(dedup.values(), key=lambda s: -s["number"])
        self.data["osism_kolla"] = result

    # ---- OSISM container registry -------------------------------------- #

    def registry_tags(self, repo: str) -> dict:
        """Tags of a repository in the OSISM registry (anonymous pull token), or an error.

        'lookup_failed' separates "the registry could not be asked" (unknown) from the confirmed
        answer "repository not found".
        """
        if not hasattr(self, "_registry_auth"):
            self._registry_auth = None
            problem = "no answer"
            req = urllib.request.Request(f"{REGISTRY}/v2/", headers={"User-Agent": USER_AGENT})
            for _attempt in (1, 2):
                try:
                    urllib.request.urlopen(req, timeout=TIMEOUT)
                    problem = "no authentication challenge (HTTP 200)"
                    break
                except urllib.error.HTTPError as err:
                    challenge = err.headers.get("WWW-Authenticate", "")
                    realm = re.search(r'realm="([^"]+)"', challenge)
                    service = re.search(r'service="([^"]+)"', challenge)
                    if err.code == 401 and realm:
                        self._registry_auth = (realm.group(1), service.group(1) if service else "")
                        break
                    problem = f"HTTP {err.code} without a token realm"
                    if err.code < 500:
                        break
                except (urllib.error.URLError, TimeoutError, OSError) as err:
                    problem = f"not reachable: {err}"
            if not self._registry_auth:
                self._registry_problem = problem
                self.warn(f"registry {REGISTRY}: {problem} — the rolling images are UNKNOWN, not missing")
        if not self._registry_auth:
            return {"error": self._registry_problem, "lookup_failed": True}
        realm, service = self._registry_auth
        tok = self.fetch_json(f"{realm}?service={urllib.parse.quote(service)}&scope=repository:{repo}:pull") or {}
        token = tok.get("token") or tok.get("access_token")
        if not token:
            self.warn(f"registry {REGISTRY}: no anonymous token for {repo}")
            return {"error": "no anonymous token", "lookup_failed": True}
        raw = self.fetch(f"{REGISTRY}/v2/{repo}/tags/list", headers={"Authorization": f"Bearer {token}"}, allow_404=True)
        if raw is None:
            return {"error": "repository not found", "lookup_failed": False}
        if not raw:
            return {"error": "tag listing failed", "lookup_failed": True}
        try:
            data = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.warn(f"registry {REGISTRY}: invalid JSON in the tag listing of {repo}")
            return {"error": "invalid JSON", "lookup_failed": True}
        if data.get("errors"):
            self.warn(f"registry {REGISTRY}: {data['errors'][0].get('code', 'error')} for {repo}")
            return {"error": data["errors"][0].get("code", "error"), "lookup_failed": True}
        return {"tags": data.get("tags") or []}

    # ---- step 8: kolla images and kolla-ansible tag variables ------------- #

    def collect_kolla(self) -> None:
        print("==> Kolla images and kolla-ansible image tag variables")
        maintained = [s for s in self.data.get("series", []) if s["status"] == "maintained"]
        maintained.sort(key=lambda s: s["release_id"])
        ref_ids = [rid for rid in getattr(self, "osism_built_releases", []) if rid in self.series_by_id
                   and self.series_by_id[rid]["status"] in ("maintained", "unmaintained")]
        ref_id = ref_ids[-1] if ref_ids else (maintained[-1]["release_id"] if maintained else None)
        ref = self.branch_for(ref_id) if ref_id else "master"
        info: dict = {"reference_branch": ref, "products": {}}
        for product in self.ossa.get("products") or []:
            entry: dict = {"kolla_images": [], "tag_variables": [], "enable_flags": [], "roles": []}
            listing = self.fetch_json(OPENDEV_API.format(repo="openstack/kolla", path=f"docker/{product}", ref=ref), allow_404=True)
            if isinstance(listing, list):
                entry["kolla_images"] = sorted(i["name"] for i in listing if i.get("type") == "dir")
            elif listing is not None:
                entry["note"] = (f"the lookup of docker/{product} in openstack/kolla FAILED — the image list is "
                                 "unknown, check it manually")
            else:
                entry["note"] = (f"no docker/{product} directory in openstack/kolla — probably a library that is "
                                 "installed into several images (check which images consume it)")
            roles = self.fetch_json(OPENDEV_API.format(repo="openstack/kolla-ansible", path="ansible/roles", ref=ref)) or []
            role_names = [r["name"] for r in roles if isinstance(r, dict) and r.get("type") == "dir"
                          and (r["name"] == product or r["name"].startswith(product + "-"))]
            entry["roles"] = role_names
            for role in role_names:
                text = self.fetch_text(OPENDEV_RAW.format(repo="openstack/kolla-ansible", branch=ref,
                                                          path=f"ansible/roles/{role}/defaults/main.yml"), allow_404=True) or ""
                for m in re.finditer(r"^([a-z0-9_]+_tag):\s*(.+)$", text, re.MULTILINE):
                    entry["tag_variables"].append({"role": role, "variable": m.group(1), "default": m.group(2).strip()})
            for path in ("ansible/group_vars/all.yml", f"ansible/group_vars/all/{product}.yml"):
                text = self.fetch_text(OPENDEV_RAW.format(repo="openstack/kolla-ansible", branch=ref, path=path), allow_404=True) or ""
                for m in re.finditer(rf"^(enable_{re.escape(product)}[a-z0-9_]*):\s*(.+)$", text, re.MULTILINE):
                    entry["enable_flags"].append({"source": f"kolla-ansible {path}", "flag": m.group(1), "default": m.group(2).strip()})
            generics = self.fetch_text(CFG_GENERICS_RAW.format(path="environments/kolla/configuration.yml"), allow_404=True) or ""
            for m in re.finditer(rf"^(enable_{re.escape(product)}[a-z0-9_]*):\s*(.+)$", generics, re.MULTILINE):
                entry["enable_flags"].append({"source": "osism/cfg-generics environments/kolla/configuration.yml",
                                              "flag": m.group(1), "default": m.group(2).strip()})
            # OSISM image parameters (osism/defaults) and rolling image availability
            if not hasattr(self, "_osism_defaults_images"):
                self._osism_defaults_images = self.fetch_text(OSISM_DEFAULTS_RAW.format(path="all/002-images-kolla.yml")) or ""
            prod_var = re.escape(product.replace("-", "_"))
            entry["osism_image_parameters"] = []
            for m in re.finditer(rf"^({prod_var}[a-z0-9_]*_(image|tag)):\s*(.+)$", self._osism_defaults_images, re.MULTILINE):
                param = {"variable": m.group(1), "default": m.group(3).strip().strip('"')}
                if m.group(2) == "image":
                    name = re.search(r"docker_image_url \}\}([A-Za-z0-9._-]+)", param["default"])
                    if name:
                        param["image"] = f"kolla/{name.group(1)}"
                        result = self.registry_tags(param["image"])
                        if "tags" in result:
                            param["rolling_tags"] = sorted(t for t in result["tags"] if re.fullmatch(r"\d{4}\.\d", t))
                        else:
                            param["error"] = result["error"]
                            param["lookup_failed"] = result["lookup_failed"]
                entry["osism_image_parameters"].append(param)
            info["products"][product] = entry
            print(f"    {product}: images {entry['kolla_images'] or '-'}; tag variables "
                  f"{[t['variable'] for t in entry['tag_variables']] or '-'}")
        self.data["kolla"] = info

    # ---- step 9: local documentation repository --------------------------- #

    def collect_local(self) -> None:
        print("==> Local documentation repository")
        docs = self.repo_dir / "docs"
        security = docs / "appendix" / "security"
        info: dict = {"security_dir": str(security)}
        advisories = sorted(security.glob("ossa-*.md")) if security.exists() else []
        info["existing_advisories"] = [p.name for p in advisories]
        # the file names sort chronologically; mtime is checkout time and says nothing about age
        info["exemplars"] = [str(p) for p in advisories[-2:]]
        ossa_id = (self.ossa.get("id") or "").lower()
        target = security / f"{ossa_id}.md" if ossa_id else None
        info["target_file"] = str(target) if target else None
        info["target_exists"] = bool(target and target.exists())
        info["index_file"] = str(security / "index.md")
        index_rows = []
        same_project = []
        products = [p.lower() for p in self.ossa.get("products") or []]
        if (security / "index.md").exists():
            for line in (security / "index.md").read_text().splitlines():
                if m := re.match(r"^\|\s*\[(OSSA-\d{4}-\d{3})\]\(([^)]+)\)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|$", line):
                    index_rows.append({"id": m.group(1), "file": m.group(2), "description": m.group(3), "component": m.group(4)})
        info["index_rows"] = index_rows
        for p in advisories:
            text = p.read_text()
            m = re.search(r"^\|\s*Affected Project\s*\|\s*(.+?)\s*\|$", text, re.MULTILINE)
            if m and any(prod in m.group(1).lower() for prod in products):
                same_project.append(p.name)
        info["previous_advisories_same_project"] = same_project
        if advisories:
            newest = advisories[-1]
            info["releases_mentioned_in_newest_advisory"] = sorted(set(RE_RELEASE_ID.findall(newest.read_text())))
            info["newest_advisory"] = newest.name

        # OSISM release support status and OpenStack mapping
        osism_releases = []
        rn_index = docs / "release-notes" / "index.md"
        if rn_index.exists():
            for line in rn_index.read_text().splitlines():
                if m := re.match(r"^\|\s*\[OSISM (\d+)\]\(([^)]+)\)\s*\|\s*([^|]+?)\s*\|", line):
                    number, rel_file, status = m.group(1), m.group(2), m.group(3)
                    notes = (docs / "release-notes" / Path(rel_file).name)
                    openstack = set()
                    if notes.exists():
                        text = notes.read_text()
                        openstack |= set(re.findall(r"^###\s+OpenStack\s+(\d{4}\.\d)", text, re.MULTILINE))
                        openstack |= set(re.findall(r"supports only OpenStack\s+(\d{4}\.\d)", text))
                    osism_releases.append({"osism": int(number), "status": status, "openstack": sorted(openstack)})
        cadence = docs / "concepts" / "release-cadence.md"
        mapping = {}
        if cadence.exists():
            for m in re.finditer(r"^\|\s*(\d+)\s*\|\s*(\d{4}\.\d)\s*\|\s*([^|]+?)\s*\|", cadence.read_text(), re.MULTILINE):
                mapping[int(m.group(1))] = m.group(2)
        for rel in osism_releases:
            if rel["osism"] in mapping and mapping[rel["osism"]] not in rel["openstack"]:
                rel["openstack"].append(mapping[rel["osism"]])
                rel["openstack"].sort()
        supported = sorted({v for r in osism_releases if r["status"] in ("Maintained", "Extended Maintenance") for v in r["openstack"]})
        info["osism_releases"] = osism_releases
        info["osism_openstack_mapping_from_cadence"] = mapping
        info["officially_supported_openstack_releases"] = supported
        info["release_cadence_doc"] = str(cadence) if cadence.exists() else None
        self.data["local"] = info
        print(f"    existing advisories: {len(advisories)}; target exists: {info['target_exists']}; "
              f"officially supported OpenStack releases: {supported or '?'}")

    # ---- step 10: coverage matrix ---------------------------------------- #

    def build_coverage(self) -> None:
        rows = []
        built = set(getattr(self, "osism_built_releases", []))
        supported = set(self.data.get("local", {}).get("officially_supported_openstack_releases", []))
        ids = set(built) | supported
        for label in self.ossa.get("reviews", {}):
            if m := RE_RELEASE_ID.search(label):
                ids.add(m.group(1))
        for s in self.data.get("series", []):
            if s["status"] in ("development", "maintained"):
                ids.add(s["release_id"])
        # ignore releases older than anything OSISM still documents as supported or recently covered
        local = self.data.get("local", {})
        floor_candidates = set(supported) | set(local.get("releases_mentioned_in_newest_advisory") or [])
        if floor_candidates:
            floor = min(floor_candidates)
            ids = {rid for rid in ids if rid >= floor}
        reviews = self.data.get("reviews", [])
        builds_known = self.data.get("osism_kolla", {}).get("state", "ok") == "ok"
        for rid in sorted(ids):
            s = self.series_by_id.get(rid, {})
            branch = self.branch_for(rid)
            rel_reviews = [r for r in reviews if r["branch"] == branch and r["project"] and r["project"].split("/")[-1] in self.ossa.get("products", [])]
            statuses = sorted({r["status"] for r in rel_reviews})
            product_versions = []
            fixed_here = []
            for product, per_series in self.data.get("releases", {}).items():
                info = per_series.get(rid, {})
                if info.get("latest"):
                    product_versions.append(f"{product} {info['latest']}")
                for f in self.data.get("fixed_versions", []):
                    if f.get("product") != product:
                        continue
                    if f.get("series") != rid:
                        if not f.get("series") and rid in (f.get("series_candidates") or []):
                            fixed_here.append(f"{f['version']}? (series unverified)")
                        continue
                    if f.get("pinned_vulnerable"):
                        fixed_here.append(f"{f['fixed_in']} (released)" if f.get("fixed_in") else f"=={f['version']} vulnerable, no later release")
                    else:
                        fixed_here.append(f"{f['version']} ({'released' if f['released'] else 'not released'})")
            patches = self.data.get("osism_kolla", {}).get("patches", {}).get(rid, [])
            related = [e for e in patches if e.get("related_to_ossa")]
            unverified = [e for e in patches if e.get("related_unverified")]
            prs = sorted({f"#{p['number']}" for e in related for p in e.get("pull_requests", [])})
            prs_unverified = sorted({f"#{p['number']}" for e in unverified for p in e.get("pull_requests", [])} - set(prs))
            merged = [r for r in rel_reviews if r["status"] == "MERGED"]
            fix_merged_upstream = any(r.get("confirmed_fix") for r in merged)
            covered = coverage_state(bool(related), fix_merged_upstream, bool(unverified) or bool(merged))
            rows.append({
                "release": rid,
                "series": s.get("name"),
                "upstream_status": s.get("status"),
                "eol_date": s.get("eol_date") or "",
                "branch": branch,
                "fix_reviews": ", ".join(f"{r['number']} ({r['status']}{'' if r.get('confirmed_fix') else ', not in OSSA'})"
                                         for r in rel_reviews) or "-",
                "fix_review_status": "/".join(statuses) or "-",
                "fix_merged_upstream": fix_merged_upstream,
                "latest_versions": ", ".join(product_versions) or "-",
                "fixed_version": ", ".join(fixed_here) or "-",
                "osism_builds": (rid in built) if builds_known else None,  # None: unknown
                "osism_officially_supported": rid in supported,
                "osism_patch_files_total": len(patches),
                "osism_patch_files_related": len(related),
                "osism_patch_files_unverified": len(unverified),
                "osism_prs": ", ".join(prs) or "-",
                "osism_prs_unverified": ", ".join(prs_unverified) or "-",
                "covered": covered,
            })
        self.data["coverage"] = rows

    # ---- output ---------------------------------------------------------- #

    def write(self) -> Path:
        ossa_id = self.ossa.get("id") or "OSSA-unknown"
        out = self.output_dir / ossa_id
        out.mkdir(parents=True, exist_ok=True, mode=0o700)  # may hold embargoed material
        self.data["warnings"] = self.warnings
        (out / "raw.json").write_text(json.dumps(self.data, indent=2, sort_keys=True, default=str) + "\n")
        (out / f"{ossa_id}.yaml").write_text(self.data.get("ossa_text") or "")
        dossier = out / "dossier.md"
        dossier.write_text(self.render_dossier())
        return dossier

    def render_dossier(self) -> str:  # noqa: C901 - long but linear
        d = self.data
        o = self.ossa
        ch = d.get("ossa_change", {})
        L: list[str] = []
        add = L.append

        add(f"# Research dossier for {o.get('id')}\n")
        add(f"Generated {d['generated']} by security-advisory/scripts/collect.py. "
            "Everything below was collected automatically from public sources; verify before publishing.\n")

        add("## 1. Input and OSSA change\n")
        rows = [["Reference", d.get("input", {}).get("reference")],
                ["Gerrit change", f"{ch.get('url')} ({ch.get('status')})" if ch.get("number") else "-"],
                ["Subject", ch.get("subject") or "-"], ["Topic", ch.get("topic") or "-"],
                ["Created / submitted", f"{(ch.get('created') or '')[:10]} / {(ch.get('submitted') or '')[:10]}"],
                ["OSSA file", ch.get("path") or "-"],
                ["Master identical", str(ch.get("master_identical"))]]
        add(md_table(["Field", "Value"], rows))
        others = [c for c in ch.get("related_ossa_changes") or [] if c["number"] != ch.get("number")]
        if others:
            add("Other changes in openstack/ossa mentioning this advisory (errata candidates):\n")
            for c in others:
                add(f"- {c['url']} — {c['status']} — {c['subject']} (updated {c['updated'][:10]})")
            add("")
        if ch.get("status") and ch["status"] != "MERGED":
            add(":warning: **The OSSA change is not merged.** Check that the embargo has been lifted "
                "(need-to-know rule in style.md; the blockers are listed in section 12) before writing anything.\n")

        add("## 2. OSSA core data\n")
        rows = [["ID", o.get("id")], ["Title", o.get("title")], ["Date", o.get("date")],
                ["Products", ", ".join(f"{p['product_display']} (deliverable `{p['product']}`)"
                                       for p in o.get("affected_products") or []) or "-"],
                ["CVEs assigned", ", ".join(o.get("cves_assigned") or []) or "-"],
                ["CVEs pending", f"{o.get('cves_pending_count')} requested from MITRE, not assigned yet" if o.get("cves_pending_count") else "-"],
                ["Reporters", "; ".join(f"{r['name']} ({r['affiliation']})" for r in o.get("reporters") or []) or "-"],
                ["Launchpad bugs", ", ".join(f"#{b}" for b in o.get("bugs") or []) or "-"],
                ["Errata history (newest first)", "; ".join(o.get("errata_history") or []) or "-"],
                ["Errata", " ".join((o.get("errata") or "").split()) or "-"]]
        add(md_table(["Field", "Value"], rows))
        add("### Affected version ranges (verbatim from the OSSA)\n")
        for p in o.get("affected_products") or []:
            add(f"- `{p.get('product')}`: `{p.get('version')}` → fixed versions {p.get('fixed_versions') or '-'}, "
                f"pinned vulnerable versions {p.get('pinned_versions') or '-'}"
                + (f", last vulnerable versions ('<=', fixed version not named) {p['last_vulnerable_versions']}"
                   if p.get("last_vulnerable_versions") else ""))
        add("")
        add("### Description (verbatim from the OSSA)\n")
        add("> " + (o.get("description") or "").replace("\n", "\n> ") + "\n")
        if o.get("notes"):
            add("### Notes (verbatim from the OSSA)\n")
            for n in o["notes"]:
                add(f"- {n}")
            add("")
        add("### Reviews listed in the OSSA\n")
        for label, urls in (o.get("reviews") or {}).items():
            add(f"- {label}: {', '.join(urls)}")
        add("")

        add("## 3. Launchpad bugs\n")
        for b in d.get("bugs", []):
            if b.get("error"):
                add(f"### Bug #{b['id']} — {b['error']}\n\n{b['web_link']}\n")
                continue
            add(f"### Bug #{b['id']} — {b['title']}\n")
            add(f"- Link: {b['web_link']}")
            add(f"- Information type: **{b['information_type']}**; created {str(b['date_created'])[:10]}; tags: {', '.join(b.get('tags') or []) or '-'}")
            add("- Tasks: " + "; ".join(f"{t['target']}: {t['status']} ({t['importance']})" for t in b.get("tasks", [])))
            if b.get("attachments"):
                add("- Attachments: " + "; ".join(f"{a['title']} [{a['type']}]" for a in b["attachments"]))
            add("")
            add("Description (excerpt):\n")
            add("```text\n" + excerpt(b.get("description") or "", 4000) + "\n```\n")

        add("## 4. Upstream fix reviews (Gerrit)\n")
        rows = [[str(r["number"]), r["project"] or "", r["branch"] or "", r["status"] or "", r["subject"] or "",
                 (r["submitted"] or r["updated"] or "")[:10], "yes" if r["listed_in_ossa"] else "**no**"]
                for r in d.get("reviews", [])]
        add(md_table(["Review", "Project", "Branch", "Status", "Subject", "Submitted/updated", "In OSSA"], rows))
        add("Files touched per review (for the Vulnerability Details section):\n")
        for r in d.get("reviews", []):
            add(f"- {r['number']} ({r['branch']}): " + ", ".join(f"`{f}`" for f in r["files"][:12])
                + (" …" if len(r["files"]) > 12 else ""))
        add("")
        add("Fetch a diff with: `curl -s https://review.opendev.org/changes/<number>/revisions/current/patch | base64 -d`\n")

        add("## 5. Upstream series status (openstack/releases data/series_status.yaml)\n")
        rows = []
        for s in d.get("series", []):
            if s["status"] == "future" or s["release_id"] in ("None", "", None):
                continue
            nxt = s.get("next_phase") or {}
            phase = s.get("eol_date") or (f"{nxt.get('status')} on {nxt.get('date')}" if nxt.get("date") else "-")
            rows.append([s["release_id"], s["name"], s["status"], "yes" if s.get("slurp") else "",
                         s.get("initial_release") or "", phase])
        add(md_table(["Release", "Series", "Status", "SLURP", "Initial release", "EOL / next phase"], rows[:10]))

        add("## 6. Upstream releases of the affected products\n")
        for product, per_series in d.get("releases", {}).items():
            rows = []
            for rid, info in sorted(per_series.items()):
                rows.append([rid, info.get("series") or "", info.get("latest") or info.get("error") or "-",
                             ", ".join(info.get("branches") or []) or "-"])
            add(f"### {product}\n")
            add(md_table(["Release", "Series", "Latest released version", "Branches"], rows))
        add("### Fixed versions named by the OSSA\n")
        github_unknown = GITHUB_UNKNOWN.get(d.get("osism_kolla", {}).get("state", "ok"))

        def series_cell(f: dict) -> str:
            if f.get("series"):
                return f["series"]
            return "**unverified** (candidates: " + (", ".join(f.get("series_candidates") or []) or "none") + ")"

        def tag_date(f: dict) -> str:
            return (f.get("tag_date") or "")[:10] or (github_unknown if github_unknown and f.get("released") else "")

        rows = []
        for f in d.get("fixed_versions", []):
            if f.get("pinned_vulnerable"):
                status = (f"only this version vulnerable ('==' pin), fixed in {f['fixed_in']}" if f.get("fixed_in")
                          else "only this version vulnerable ('==' pin), **no later release yet**")
                rows.append([f["product"], f["version"], series_cell(f), status, tag_date(f)])
            else:
                status = "released" if f["released"] else (
                    "**unknown (lookup failed)**" if f.get("lookup_failed") else "**not released**")
                rows.append([f["product"], f["version"], series_cell(f), status, tag_date(f)])
        add(md_table(["Product", "Version", "Series", "Status", "Tag date"], rows))
        add("A series is only named when the version is listed in the deliverable file of that series, or when the "
            "deliverable is `cycle-with-rc` and a single series carries its major version. **unverified** means the "
            "version cannot be mapped from the release data (libraries share a major version across many series): "
            "take the series from the branch of the fix review in section 4.\n")

        add("## 7. CVE records\n")
        if o.get("cves_pending_count"):
            add(f"{o['cves_pending_count']} CVE id(s) requested from MITRE and still pending assignment. Re-check the "
                "Launchpad bug titles and the OSSA errata history before publishing.\n")
        for c in d.get("cves", []):
            if c.get("state") == "pending assignment":
                continue
            add(f"### {c['id']} — {c.get('state')}\n")
            if c.get("url"):
                add(f"- {c['url']}")
            if c.get("published"):
                add(f"- Published: {c['published'][:10]}")
            for m in c.get("metrics") or []:
                add(f"- {m['version']}: **{m['score']} {m['severity']}** `{m['vector']}`")
            if c.get("metrics") == []:
                add("- No CVSS metrics in the CVE record → use OSISM's own assessment (see style.md)")
            if c.get("state") == "lookup failed":
                add("- **The CVE record could not be fetched.** Nothing is known about its publication state or "
                    "CVSS score — look it up manually, do not write that upstream published no score.")
            if c.get("description"):
                add(f"\n> {c['description']}")
            add("")

        add("## 8. OSISM: container-images-kolla\n")
        ok = d.get("osism_kolla", {})
        add(f"- Built OpenStack releases (defaults/*.sh): "
            f"{github_unknown or ', '.join(ok.get('built_releases') or []) or '-'}")
        loc = d.get("local", {})
        add(f"- Officially supported OpenStack releases (docs/release-notes + release cadence): "
            f"{', '.join(loc.get('officially_supported_openstack_releases') or []) or '?'}")
        add(f"- Releases mentioned in the newest existing advisory ({loc.get('newest_advisory')}): "
            f"{', '.join(loc.get('releases_mentioned_in_newest_advisory') or []) or '-'}")
        add("")
        add("### Patch files for the affected products\n")
        any_patch = False
        for rid, entries in sorted(ok.get("patches", {}).items()):
            if not entries:
                continue
            any_patch = True
            add(f"#### {rid}\n")
            for e in entries:
                tag = ("**related to this OSSA**" if e.get("related_to_ossa") else
                       f"**possibly related — unverified** (matched by {e.get('match_kind')} only, no Change-Id of a "
                       "fix review listed in the OSSA)" if e.get("related_unverified") else "not related to this OSSA")
                add(f"- `{e['path']}` — {tag}")
                if e.get("subject"):
                    add(f"  - subject: {e['subject']}" + (f" (Change-Id {e['change_id']})" if e.get("change_id") else ""))
                if e.get("matches_upstream"):
                    add("  - upstream review: " + "; ".join(f"{m['number']} ({m['branch']}, {m['status']}) {m['subject']}"
                                                            for m in e["matches_upstream"]))
                elif e.get("foreign_upstream_changes"):
                    f0 = e["foreign_upstream_changes"][0]
                    add(f"  - belongs to upstream change {f0['number']} ({f0['project']}, {f0['branch']}, {f0['status']}): "
                        f"{f0['subject']}")
                else:
                    add("  - no upstream review identified (no Change-Id in the patch and no matching subject)")
                if e.get("added_by_commit"):
                    c = e["added_by_commit"]
                    add(f"  - added by {c['url']} ({c['date'][:10]}): {c['subject']}"
                        + (f" — followed {len(c['renamed_from'])} rename(s) back from the current file name"
                           if c.get("renamed_from") else ""))
                    if not c.get("verified", True):
                        add(f"  - **attribution unverified** ({c.get('unverified_reason')}): this may be a renumbering "
                            "commit, check with `git log --follow`")
                elif e.get("attribution_error"):
                    add(f"  - **introducing commit unknown** ({e['attribution_error']})")
                for p in e.get("pull_requests") or []:
                    add(f"  - PR #{p['number']} {p['state']} merged {str(p.get('merged_at') or '')[:10]}: {p['title']} — {p['url']} "
                        f"(merge commit {str(p.get('merge_commit_sha') or '')[:7]})")
                for lc in e.get("later_commits") or []:
                    add(f"  - later touched by {lc['sha']} ({lc['date']}): {lc['subject']}")
            add("")
        if github_unknown:
            add(f"_Patch files: **{github_unknown}**. This says nothing about whether OSISM ships a fix — look the "
                "patches and pull requests up manually (reference/sources.md)._\n")
        elif not any_patch:
            add("_No patch files for the affected products in any built release. Either the fix is not yet "
                "shipped by OSISM, or OSISM relies on the upstream stable branch (check section 4/6)._\n")
        if ok.get("overlays"):
            add("Overlay files: " + "; ".join(f"{rid}: {', '.join(v)}" for rid, v in ok["overlays"].items()) + "\n")
        add("### CHANGELOG.md entries\n")
        for h in ok.get("changelog_hits") or []:
            add(f"- [{h['version']}] {h['line']}")
        if not ok.get("changelog_hits"):
            add("_none_")
        add("")
        add("### Pull request search hits\n")
        for s in ok.get("pr_search_hits") or []:
            add(f"- #{s['number']} {s['state']} ({str(s.get('closed_at') or '')[:10]}): {s['title']} — {s['url']} "
                f"(terms: {', '.join(s.get('terms') or [s['term']])})")
        if not ok.get("pr_search_hits"):
            add("_none_")
        add("")

        add("## 9. Kolla images and kolla-ansible tag variables\n")
        k = d.get("kolla", {})
        add(f"Reference branch: `{k.get('reference_branch')}`. Stable OSISM releases pull the Kolla images from the "
            "`kolla/release/<openstack_version>` namespace with pinned tags; the rolling images live in `kolla`. The "
            "remediation snippet must override the `*_tag` and every `<service>*_image` parameter with the rolling "
            "namespace.\n")
        for product, e in (k.get("products") or {}).items():
            add(f"### {product}\n")
            add(f"- Kolla images: {', '.join(e.get('kolla_images') or []) or '-'}")
            if e.get("note"):
                add(f"- Note: {e['note']}")
            add(f"- kolla-ansible roles: {', '.join(e.get('roles') or []) or '-'}")
            if e.get("tag_variables"):
                add("- Image tag variables (override in `environments/kolla/images.yml`):")
                for t in e["tag_variables"]:
                    add(f"  - `{t['variable']}` (role {t['role']}, default `{t['default']}`)")
            if e.get("enable_flags"):
                add("- Enable flags:")
                for f in e["enable_flags"]:
                    add(f"  - `{f['flag']}: {f['default']}` ({f['source']})")
            if e.get("osism_image_parameters"):
                add("- OSISM image parameters (osism/defaults `all/002-images-kolla.yml`) and rolling images in "
                    f"`{REGISTRY}`:")
                for prm in e["osism_image_parameters"]:
                    line = f"  - `{prm['variable']}` = `{prm['default']}`"
                    if prm.get("image"):
                        if prm.get("rolling_tags"):
                            line += f" → rolling `{prm['image']}` tags: {', '.join(prm['rolling_tags'])}"
                        elif prm.get("error") and not prm.get("lookup_failed"):
                            line += f" → rolling `{prm['image']}`: not in the rolling registry (do not list it in the override)"
                        elif prm.get("error"):
                            line += (f" → rolling `{prm['image']}`: **lookup failed ({prm['error']}) — unknown, verify "
                                     "manually before omitting it from the override**")
                        else:
                            line += f" → rolling `{prm['image']}`: no release tags"
                    add(line)
            add("")

        add("## 10. Local documentation repository\n")
        add(f"- Target file: `{loc.get('target_file')}` — {'**already exists → update mode**' if loc.get('target_exists') else 'does not exist → new advisory'}")
        add(f"- Index file: `{loc.get('index_file')}` ({len(loc.get('index_rows') or [])} rows)")
        add("- Style exemplars (the two newest advisories by file name): " + ", ".join(f"`{p}`" for p in loc.get("exemplars") or []))
        add(f"- Previous advisories for the same project: {', '.join(loc.get('previous_advisories_same_project') or []) or '-'}")
        add("- OSISM releases: " + "; ".join(f"OSISM {r['osism']} ({r['status']}): OpenStack {', '.join(r['openstack']) or '?'}"
                                          for r in loc.get("osism_releases") or []))
        add("")

        add("## 11. Coverage matrix (draft input for the Affected Versions table)\n")
        rows = [[c["release"], c["series"] or "", c["upstream_status"] or "", c["eol_date"], c["branch"],
                 c["latest_versions"], c["fixed_version"], c["fix_reviews"],
                 "yes" if c["osism_officially_supported"] else "no",
                 github_unknown if c["osism_builds"] is None else ("yes" if c["osism_builds"] else "no"),
                 github_unknown if c["osism_builds"] is None else (
                     f"{c['osism_patch_files_related']} related ({c['osism_prs']}), "
                     + (f"{c['osism_patch_files_unverified']} unverified ({c['osism_prs_unverified']}), "
                        if c.get("osism_patch_files_unverified") else "")
                     + f"{c['osism_patch_files_total']} total" if c["osism_patch_files_total"] else "-"),
                 COVERED_LABEL[c["covered"]]]
                for c in d.get("coverage", [])]
        add(md_table(["Release", "Series", "Upstream status", "EOL", "Branch", "Latest version", "Fixed version",
                      "Fix reviews", "OSISM supported", "OSISM builds", "OSISM patches", "Covered"], rows))
        add("Reading guide: a release is *covered* (**yes**) only on confirmed evidence: an OSISM patch file that "
            "carries the Change-Id of a fix review listed in the OSSA (community-curated backport or early adoption "
            "of an unmerged upstream fix), or a fix review listed in the OSSA (or a backport with the same Change-Id) "
            "that is merged on the branch the images are built from. **unverified** means there are only hints — a "
            "patch file matched by file name or bug number, or a merged review that merely mentions the bug. The "
            "advisory lists every release OSISM builds images for — including the YYYY.2 releases that are not "
            "officially supported but always receive the fixes in practice — so every row with Covered = no **or "
            "unverified** must be clarified with the author (fix in preparation? not planned? is the hint the fix?) "
            "and the answer recorded in the advisory.\n")

        add("## 12. Open points to verify manually\n")
        for p in self.open_points():
            add(f"- [ ] {p}")
        add("")
        if self.warnings:
            add("## 13. Collection warnings\n")
            for w in self.warnings:
                add(f"- {w}")
            add("")
        return "\n".join(L)

    def open_points(self) -> list[str]:  # noqa: C901 - long but linear
        """Section 12. Everything that is unknown, unverified or a blocker must show up here."""
        d = self.data
        o = self.ossa
        ok = d.get("osism_kolla", {})
        loc = d.get("local", {})
        github_unknown = GITHUB_UNKNOWN.get(ok.get("state", "ok"))
        points = []
        # need-to-know (style.md): public status is established positively, per bug. An unreadable bug
        # is what an embargoed bug looks like anonymously, so it blocks exactly like a private one.
        for b in d.get("bugs", []):
            if b.get("information_type") != PUBLIC_SECURITY:
                points.append(f"STOP — bug #{b['id']} is not confirmed *{PUBLIC_SECURITY}* (information type: "
                              f"{b.get('information_type') or b.get('error') or 'unknown'}). Do not write or publish "
                              f"anything until its public status is positively established ({b.get('web_link')}).")
        ch = d.get("ossa_change", {})
        if not d.get("bugs") and ch.get("status") != "MERGED":
            points.append("STOP — the OSSA references no Launchpad bug and its change is not merged: nothing "
                          "establishes that the issue is public.")
        if o.get("format") == "text":
            points.append("The OSSA document could not be parsed — title, description, products, notes and errata "
                          "are missing from section 2; read the raw document.")
        for p in o.get("affected_products") or []:
            if not p.get("valid_name"):
                points.append(f"Product {p['product_display']!r} does not look like a deliverable name — the empty "
                              "results in sections 6, 8, 9 and 11 are a lookup problem, not a finding. Identify the "
                              "deliverable(s) and look them up manually.")
            elif p.get("split_from"):
                points.append(f"The OSSA names several products in one field ({p['split_from']!r}); check the version "
                              f"range the collector attributed to {p['product']}: `{p['version']}`.")
            if p.get("last_vulnerable_versions"):
                points.append(f"{p['product']}: the OSSA gives inclusive upper bounds (<= "
                              f"{', '.join(p['last_vulnerable_versions'])}) — the fixed version is the next release of "
                              "that series (section 6), it is not named by the OSSA.")
        if o.get("cves_pending"):
            points.append("CVE ids are still pending — write 'CVE pending' and re-check the Launchpad bug titles / OSSA errata before publishing.")
        for c in d.get("cves", []):
            if c.get("state") == "not published":
                points.append(f"{c['id']} is not published on cve.org yet — the link will resolve later; no CVSS available.")
            elif c.get("state") == "lookup failed":
                points.append(f"The CVE record of {c['id']} could not be fetched — publication state and CVSS score are "
                              "UNKNOWN. Look them up manually before choosing the Severity.")
        cve_lookup_failed = any(c.get("state") == "lookup failed" for c in d.get("cves", []))
        if not cve_lookup_failed and not any(m for c in d.get("cves", []) for m in c.get("metrics") or []):
            points.append("No CVSS score available — the Severity is OSISM's own assessment and must say so.")
        unmerged = [r for r in d.get("reviews", []) if r["status"] == "NEW"]
        if unmerged:
            points.append(f"{len(unmerged)} upstream review(s) not merged yet — fixed versions are expectations, not releases.")
        for product, per_series in d.get("releases", {}).items():
            failed = sorted(rid for rid, info in per_series.items() if info.get("error") == "lookup failed")
            if failed:
                points.append(f"The upstream release data of {product} could not be fetched for {', '.join(failed)} — "
                              "latest and fixed versions of these releases are UNKNOWN, not missing.")
        for f in d.get("fixed_versions", []):
            if not f.get("series"):
                points.append(f"{f['product']} {f['version']} cannot be mapped to an OpenStack series from the release "
                              f"data (candidates: {', '.join(f.get('series_candidates') or []) or 'none'}) — take the "
                              "series from the branch of the fix review, never from the version number.")
            if not f.get("pinned_vulnerable") and not f["released"] and not f.get("lookup_failed"):
                points.append(f"{f['product']} {f['version']} is not released yet.")
        if github_unknown:
            points.append(f"OSISM patch files, pull requests, built releases and tag dates: {github_unknown}. Look them "
                          "up manually (reference/sources.md); the coverage questions below are asked for every release.")
        elif not any(e.get("related_to_ossa") for entries in ok.get("patches", {}).values() for e in entries):
            points.append("No OSISM patch files related to this OSSA found — confirm whether OSISM shipped a fix "
                          "(PR search / CHANGELOG / upstream stable branch) or state that it is pending.")
        for c in d.get("coverage", []):
            if c["osism_builds"] is False or c["covered"] == COVERED_YES or c["upstream_status"] == "development":
                continue
            scope = ("officially supported" if c["osism_officially_supported"] else
                     "possibly built (unknown)" if c["osism_builds"] is None else
                     "built (not officially supported, but always covered in practice)")
            if c["covered"] == COVERED_UNVERIFIED:
                points.append(f"{c['release']} ({c['series']}) is {scope} by OSISM and its coverage is UNVERIFIED: there "
                              "are only hints (patch file matched by name or bug number, or a merged review that is not "
                              "a fix listed in the OSSA) — ASK THE AUTHOR whether the fix is really shipped for this "
                              "release and record the answer in the advisory.")
            else:
                points.append(f"{c['release']} ({c['series']}) is {scope} by OSISM but has neither an OSISM patch for this "
                              "issue nor a merged upstream fix — ASK THE AUTHOR about the status (backport in preparation? "
                              "next rebuild? not planned?) and record the answer in the advisory.")
        for entries in ok.get("patches", {}).values():
            for e in entries:
                commit = e.get("added_by_commit")
                if (e.get("related_to_ossa") or e.get("related_unverified")) and not (commit and commit.get("verified")):
                    points.append(f"The commit and pull request that introduced `{e['path']}` could not be verified — "
                                  "check with `git log --follow` before citing them in Remediation and References.")
        extra = [r for r in d.get("reviews", []) if not r["listed_in_ossa"]]
        if extra:
            points.append("Reviews referencing the bugs but not listed in the OSSA: " + ", ".join(str(r["number"]) for r in extra)
                          + " — decide whether they belong to this advisory (follow-ups, OSSN material).")
        for product, e in (d.get("kolla", {}).get("products") or {}).items():
            failed = [prm["variable"] for prm in e.get("osism_image_parameters") or [] if prm.get("lookup_failed")]
            if failed:
                points.append(f"{product}: the rolling registry could not be queried for {', '.join(failed)} — verify the "
                              "images manually before leaving any of them out of the override snippet.")
        if loc.get("target_exists"):
            points.append("An advisory file already exists — update it (errata, CVE ids, release status) instead of rewriting it.")
        points.append("Decide which container images carry the vulnerable code (tag variables in section 9) and whether a "
                      "rebuild of all images or a single service image is needed.")
        points.append("Override snippet: set the *_tag AND every <service>*_image parameter with the rolling kolla namespace "
                      "(section 9); stable releases pull from kolla/release/<version>. List only images that exist in the "
                      "rolling registry and keep sidecar images without project code on their deployed tag.")
        points.append("Check the OSISM default configuration for the affected feature (enable flags in section 9 and the "
                      "configuration guide) to state whether default deployments are affected.")
        return points

    # ---- driver ---------------------------------------------------------- #

    def run(self, reference: str) -> Path:
        self.resolve(reference)
        self.load_ossa()
        self.collect_bugs()
        self.collect_reviews()
        self.collect_series()
        self.collect_osism_kolla()   # sets osism_built_releases used by collect_releases/collect_kolla
        self.collect_releases()
        self.collect_cves()
        self.collect_kolla()
        self.collect_local()
        self.build_coverage()
        return self.write()


def find_repo_dir(start: Path) -> Path | None:
    for candidate in (start, *start.parents):
        if (candidate / "docs" / "appendix" / "security").exists():
            return candidate
    return None


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("reference", help="OSSA reference (Gerrit URL/number, OSSA id, or security.openstack.org URL)")
    parser.add_argument("--output-dir", type=Path, default=None,
                        help="directory for <OSSA-ID>/dossier.md and raw.json (default: a new private temporary directory)")
    parser.add_argument("--repo-dir", type=Path, default=None,
                        help="osism.github.io checkout (default: detected from the current directory)")
    parser.add_argument("--no-github", action="store_true", help="skip everything that needs the GitHub API")
    parser.add_argument("--print", action="store_true", help="print the dossier to stdout when done")
    args = parser.parse_args()

    repo_dir = find_repo_dir((args.repo_dir or Path.cwd()).resolve())
    if repo_dir is None:
        # exemplars, index rows and the release floor of the coverage matrix all come from the checkout
        sys.exit(f"error: no docs/appendix/security directory in or above {args.repo_dir or Path.cwd()} — "
                 "run the collector inside the osism.github.io checkout or pass --repo-dir")
    # the dossier may contain embargoed material: a private, unpredictable directory (mode 0700)
    output_dir = args.output_dir or Path(tempfile.mkdtemp(prefix="security-advisory-"))
    collector = Collector(repo_dir=repo_dir, output_dir=output_dir, use_github=not args.no_github)
    dossier = collector.run(args.reference)
    print(f"\nDossier written to {dossier}")
    print(f"Raw data written to {dossier.parent / 'raw.json'}")
    if collector.warnings:
        print(f"{len(collector.warnings)} warning(s) — see section 13 of the dossier")
    if args.print:
        print("\n" + dossier.read_text())


if __name__ == "__main__":
    main()
