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
reported as warnings and do not abort the run.

Only the Python standard library is required. PyYAML is used when available;
without it the OSSA YAML is parsed with a small fallback parser.
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
    """Parse '>=13.0.0 <27.0.3, >=28.0.0 <28.0.3, ==21.0.0' style ranges."""
    ranges, fixed, pinned = [], [], []
    for chunk in re.split(r"\s*,\s*", spec.strip()):
        if not chunk:
            continue
        ranges.append(chunk)
        for op, ver in re.findall(r"(<=|>=|==|<|>)\s*(\d+(?:\.\d+)*)", chunk):
            if op == "<":
                fixed.append(ver)
            elif op == "==":
                pinned.append(ver)
    return {"ranges": ranges, "fixed_versions": sorted(set(fixed), key=version_tuple),
            "pinned_versions": sorted(set(pinned), key=version_tuple)}


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
# collector
# --------------------------------------------------------------------------- #


class Collector:
    def __init__(self, repo_dir: Path, output_dir: Path, use_github: bool = True) -> None:
        self.repo_dir = repo_dir
        self.output_dir = output_dir
        self.use_github = use_github
        self.warnings: list[str] = []
        self.gh = shutil.which("gh") if use_github else None
        self.github_token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
        self.data: dict = {"generated": datetime.now(timezone.utc).isoformat(timespec="seconds")}

    # ---- transport -------------------------------------------------------- #

    def warn(self, message: str) -> None:
        self.warnings.append(message)
        print(f"  ! {message}", file=sys.stderr)

    def fetch(self, url: str, headers: dict | None = None, allow_404: bool = False) -> bytes | None:
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
                    return None
            except (urllib.error.URLError, TimeoutError, OSError) as err:
                if attempt == 2:
                    self.warn(f"failed to fetch {url}: {err}")
                    return None
        return None

    def fetch_text(self, url: str, **kw) -> str | None:
        raw = self.fetch(url, **kw)
        return raw.decode("utf-8", "replace") if raw is not None else None

    def fetch_json(self, url: str, **kw):
        raw = self.fetch(url, headers={"Accept": "application/json"}, **kw)
        if raw is None:
            return None
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.warn(f"invalid JSON from {url}")
            return None

    def gerrit_json(self, path: str, allow_404: bool = False):
        raw = self.fetch(f"{GERRIT}/{path.lstrip('/')}", headers={"Accept": "application/json"},
                         allow_404=allow_404)
        if raw is None:
            return None
        text = raw.decode("utf-8", "replace")
        if text.startswith(")]}'"):
            text = text.split("\n", 1)[1] if "\n" in text else ""
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            self.warn(f"invalid JSON from Gerrit {path}")
            return None

    def github_json(self, path: str, allow_404: bool = False):
        """GitHub REST API via `gh api` when available, urllib otherwise."""
        if not self.use_github:
            return None
        if self.gh:
            proc = subprocess.run([self.gh, "api", path], capture_output=True, text=True)
            if proc.returncode == 0:
                try:
                    return json.loads(proc.stdout)
                except json.JSONDecodeError:
                    self.warn(f"invalid JSON from gh api {path}")
                    return None
            if allow_404 and "HTTP 404" in proc.stderr:
                return None
            self.warn(f"gh api {path} failed: {proc.stderr.strip()[:200]}")
            return None
        headers = {"Accept": "application/vnd.github+json"}
        if self.github_token:
            headers["Authorization"] = f"Bearer {self.github_token}"
        raw = self.fetch(f"{GH_API}/{path.lstrip('/')}", headers=headers, allow_404=allow_404)
        if raw is None:
            return None
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.warn(f"invalid JSON from GitHub {path}")
            return None

    def load_yaml(self, text: str, what: str):
        if yaml is None:
            return None
        try:
            return yaml.safe_load(text)
        except yaml.YAMLError as err:  # type: ignore[attr-defined]
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
        elif m := re.search(r"(OSSA-\d{4}-\d{3})", reference, re.IGNORECASE):
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
            if change is None:
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
                path = sorted(files)[-1]
                raw = self.fetch(f"{GERRIT}/changes/{change['_number']}/revisions/current/files/"
                                 f"{urllib.parse.quote(path, safe='')}/content")
                if raw is not None:
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
            ossa_id = re.search(r"(OSSA-\d{4}-\d{3})", path).group(1)
            self.data["input"]["ossa_id"] = ossa_id

        master_text = None
        if path:
            master_text = self.fetch_text(OPENDEV_RAW.format(repo="openstack/ossa", branch="master", path=path),
                                          allow_404=True)
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
        self.data["ossa"] = self.ossa
        print(f"    {self.ossa.get('id')}: {self.ossa.get('title')}")

    def parse_ossa(self, text: str, path: str) -> dict:
        doc = self.load_yaml(text, "OSSA document") if path.endswith(".yaml") or path.endswith(".yml") else None
        ossa: dict = {"format": "yaml" if isinstance(doc, dict) else "text"}
        if isinstance(doc, dict):
            ossa.update({
                "id": doc.get("id"),
                "title": doc.get("title"),
                "date": str(doc.get("date")) if doc.get("date") else None,
                "description": (doc.get("description") or "").strip(),
                "affected_products": [
                    {"product": p.get("product"), "version": p.get("version"),
                     **parse_version_ranges(str(p.get("version", "")))}
                    for p in doc.get("affected-products") or []],
                "cves": [v.get("cve-id") for v in doc.get("vulnerabilities") or [] if v.get("cve-id")],
                "reporters": [{"name": r.get("name"), "affiliation": r.get("affiliation")}
                              for r in doc.get("reporters") or []],
                "issue_links": list((doc.get("issues") or {}).get("links") or []),
                "reviews": {str(k): list(v or []) for k, v in (doc.get("reviews") or {}).items()},
                "notes": [str(n).strip() for n in doc.get("notes") or []],
                "errata_history": [str(e) for e in doc.get("errata_history") or []],
            })
        else:
            ossa.update(self.parse_ossa_fallback(text))

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
            m = re.search(r"(OSSA-\d{4}-\d{3})", path) or re.search(r"(OSSA-\d{4}-\d{3})", text)
            ossa["id"] = m.group(1) if m else None
        ossa["products"] = [p["product"] for p in ossa.get("affected_products", []) if p.get("product")]
        return ossa

    @staticmethod
    def parse_ossa_fallback(text: str) -> dict:
        """Minimal parser for the flat OSSA YAML schema (used without PyYAML)."""
        def scalar(key: str) -> str | None:
            m = re.search(rf"^{key}:\s*(.+)$", text, re.MULTILINE)
            return m.group(1).strip().strip("'\"") if m else None

        description = ""
        m = re.search(r"^description:\s*\|\s*\n((?:[ \t]+.*\n|\n)+)", text, re.MULTILINE)
        if m:
            description = "\n".join(line[2:] if line.startswith("  ") else line
                                    for line in m.group(1).splitlines()).strip()
        products = [{"product": p, "version": v.strip("'\""), **parse_version_ranges(v.strip("'\""))}
                    for p, v in re.findall(r"- product:\s*(\S+)\s*\n\s*version:\s*(.+)", text)]
        reporters = [{"name": n.strip(), "affiliation": a.strip()}
                     for n, a in re.findall(r"- name:\s*(.+)\n\s*affiliation:\s*(.+)", text)]
        reviews: dict[str, list[str]] = {}
        block = re.search(r"^reviews:\s*\n((?:[ \t]+.*\n|\n)+)", text, re.MULTILINE)
        if block:
            current = None
            for line in block.group(1).splitlines():
                if m := re.match(r"^\s{2}(\S.*?):\s*$", line):
                    current = m.group(1)
                    reviews[current] = []
                elif current and (m := re.match(r"^\s+-\s*(\S+)", line)):
                    reviews[current].append(m.group(1))
        return {"id": scalar("id"), "title": scalar("title"), "date": scalar("date"),
                "description": description, "affected_products": products, "reporters": reporters,
                "reviews": reviews, "notes": [], "errata_history": [], "issue_links": [], "cves": []}

    # ---- step 3: Launchpad ------------------------------------------------ #

    def collect_bugs(self) -> None:
        print("==> Launchpad bugs")
        bugs = []
        for bug_id in self.ossa["bugs"]:
            bug = self.fetch_json(f"{LP_API}/bugs/{bug_id}", allow_404=True)
            if bug is None:
                self.warn(f"Launchpad bug {bug_id} not readable (private or missing)")
                bugs.append({"id": bug_id, "web_link": f"https://bugs.launchpad.net/bugs/{bug_id}",
                             "error": "not readable"})
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
            if c is None:
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
        reviews.sort(key=lambda r: (r["project"] or "", r["branch"] or "", r["number"]))
        self.data["reviews"] = reviews
        for r in reviews:
            flag = "" if r["listed_in_ossa"] else "  (not listed in OSSA)"
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
        elif text:
            for block in re.split(r"\n(?=- name:)", text):
                name = re.search(r"- name:\s*(\S+)", block)
                if not name:
                    continue
                get = lambda key: (re.search(rf"^\s*{key}:\s*(.+)$", block, re.MULTILINE) or [None, ""])[1]
                series.append({"name": name.group(1), "release_id": str(get("release-id")).strip(),
                               "status": str(get("status")).strip(), "initial_release": str(get("initial-release")).strip(),
                               "eol_date": str(get("eol-date")).strip(), "next_phase": {},
                               "slurp": "slurp: yes" in block})
        self.data["series"] = series
        self.series_by_id = {s["release_id"]: s for s in series}
        self.series_by_name = {s["name"]: s for s in series}

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
                if text is None:
                    per_series[rid] = {"series": s["name"], "error": "no deliverable file"}
                    continue
                doc = self.load_yaml(text, url)
                versions = []
                if isinstance(doc, dict):
                    for rel in doc.get("releases") or []:
                        hashes = [p.get("hash") for p in rel.get("projects") or []]
                        versions.append({"version": str(rel.get("version")), "hash": hashes[0] if hashes else None})
                    branches = [b.get("name") for b in doc.get("branches") or []]
                else:
                    versions = [{"version": v, "hash": None} for v in re.findall(r"- version:\s*(\S+)", text)]
                    branches = re.findall(r"- name:\s*(stable/\S+|unmaintained/\S+)", text)
                # keep final releases only; rc tags and eom/eol markers are reported separately
                markers = [v["version"] for v in versions if not RE_VERSION.fullmatch(v["version"])]
                versions = [v for v in versions if RE_VERSION.fullmatch(v["version"])]
                versions.sort(key=lambda v: version_tuple(v["version"]))
                per_series[rid] = {"series": s["name"], "versions": [v["version"] for v in versions],
                                   "latest": versions[-1]["version"] if versions else None,
                                   "markers": markers, "branches": branches,
                                   "release_notes": f"https://releases.openstack.org/{s['name']}/index.html"}
            releases[product] = per_series
        self.data["releases"] = releases

        # fixed versions from the OSSA ranges: released or not?
        fixed = []
        for p in self.ossa.get("affected_products", []):
            product = p.get("product")
            for ver in p.get("fixed_versions", []):
                entry = {"product": product, "version": ver, "released": False, "series": None, "tag_date": None}
                for rid, info in releases.get(product, {}).items():
                    if ver in info.get("versions", []):
                        entry["released"] = True
                        entry["series"] = rid
                        break
                if entry["series"] is None:
                    major = ver.split(".")[0]
                    for rid, info in releases.get(product, {}).items():
                        if any(v.split(".")[0] == major for v in info.get("versions", [])):
                            entry["series"] = rid
                            break
                if entry["released"] and self.use_github:
                    entry["tag_date"] = self.github_tag_date(product, ver)
                fixed.append(entry)
            for ver in p.get("pinned_versions", []):
                entry = {"product": product, "version": ver, "pinned_vulnerable": True, "series": None,
                         "fixed_in": None, "released": False, "tag_date": None,
                         "note": "listed as '==' (only this version is vulnerable; the fix is the next release)"}
                major = ver.split(".")[0]
                for rid, info in releases.get(product, {}).items():
                    later = [v for v in info.get("versions", []) if v.split(".")[0] == major and version_tuple(v) > version_tuple(ver)]
                    if any(v.split(".")[0] == major for v in info.get("versions", [])):
                        entry["series"] = rid
                        if later:
                            entry["fixed_in"] = later[0]
                            entry["released"] = True
                            if self.use_github:
                                entry["tag_date"] = self.github_tag_date(product, later[0])
                        break
                fixed.append(entry)
        self.data["fixed_versions"] = fixed
        for f in fixed:
            if f.get("pinned_vulnerable"):
                fix = f"fixed in {f['fixed_in']} (released)" if f.get("fixed_in") else "no later release yet"
                print(f"    {f['product']} =={f['version']} ({f['series'] or '?'}): {fix}")
                continue
            state = "released" if f["released"] else "NOT released yet"
            print(f"    {f['product']} {f['version']} ({f['series'] or '?'}): {state}"
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
            if doc is None:
                records.append({"id": cve, "state": "not published", "url": f"https://www.cve.org/CVERecord?id={cve}"})
                print(f"    {cve}: not published yet")
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

    def collect_osism_kolla(self) -> None:
        print("==> OSISM container-images-kolla")
        result: dict = {"repo": f"https://github.com/{KOLLA_IMAGES_REPO}"}
        products = self.ossa.get("products") or []
        product_variants = set()
        for p in products:
            product_variants |= {p, p.replace("-", "_"), p.replace("_", "-")}

        tree = self.github_json(f"repos/{KOLLA_IMAGES_REPO}/git/trees/main?recursive=1") or {}
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
        commit_cache: dict = {}
        foreign_cache: dict = {}
        for rid in built:
            entries = []
            for path in sorted(patches.get(rid, [])):
                if not path.endswith(".patch"):
                    continue
                header = parse_patch_header(self.fetch_text(KOLLA_IMAGES_RAW.format(path=path), allow_404=True) or "")
                slug = patch_slug(path)
                matches = []
                if header.get("change_id"):
                    matches = [r for r in reviews if r.get("change_id") == header["change_id"]]
                if not matches:
                    matches = [r for r in reviews if r.get("subject_slug") and len(slug) >= 20
                               and (r["subject_slug"].startswith(slug) or slug.startswith(r["subject_slug"][:len(slug)]))]
                if not matches and header.get("bugs") and ossa_bugs & set(header["bugs"]):
                    matches = [r for r in reviews if set(r.get("closes_bugs") or []) & set(header["bugs"])]
                branch_names = {f"stable/{rid}", f"unmaintained/{rid}"}
                same_branch = [r for r in matches if r.get("branch") in branch_names]
                entry = {
                    "path": path, "url": f"https://github.com/{KOLLA_IMAGES_REPO}/blob/main/{path}",
                    "subject": header.get("subject"), "change_id": header.get("change_id"),
                    "author": header.get("author"), "patch_date": header.get("date"), "bugs": header.get("bugs"),
                    "related_to_ossa": bool(matches),
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
                commits = self.github_json(f"repos/{KOLLA_IMAGES_REPO}/commits?path={urllib.parse.quote(path, safe='')}&per_page=100") or []
                if commits:
                    first = commits[-1]
                    sha = first["sha"]
                    entry["added_by_commit"] = {"sha": sha, "date": first["commit"]["committer"]["date"],
                                               "subject": first["commit"]["message"].split("\n", 1)[0],
                                               "url": f"https://github.com/{KOLLA_IMAGES_REPO}/commit/{sha}"}
                    if sha not in commit_cache:
                        pulls = self.github_json(f"repos/{KOLLA_IMAGES_REPO}/commits/{sha}/pulls") or []
                        commit_cache[sha] = [{"number": p["number"], "title": p["title"], "state": p["state"],
                                              "merged_at": p.get("merged_at"), "merge_commit_sha": p.get("merge_commit_sha"),
                                              "url": p["html_url"]} for p in pulls]
                    entry["pull_requests"] = commit_cache[sha]
                    if len(commits) > 1:
                        entry["later_commits"] = [{"sha": c["sha"][:7], "date": c["commit"]["committer"]["date"][:10],
                                                   "subject": c["commit"]["message"].split("\n", 1)[0]} for c in commits[:-1]]
                entries.append(entry)
            patch_entries[rid] = entries
            if entries:
                related = sum(1 for e in entries if e["related_to_ossa"])
                print(f"    {rid}: {len(entries)} patch file(s) for {', '.join(products)}, {related} related to this OSSA")
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
        """Tags of a repository in the OSISM registry (anonymous pull token), or an error."""
        if not hasattr(self, "_registry_auth"):
            self._registry_auth = None
            req = urllib.request.Request(f"{REGISTRY}/v2/", headers={"User-Agent": USER_AGENT})
            try:
                urllib.request.urlopen(req, timeout=TIMEOUT)
            except urllib.error.HTTPError as err:
                challenge = err.headers.get("WWW-Authenticate", "")
                realm = re.search(r'realm="([^"]+)"', challenge)
                service = re.search(r'service="([^"]+)"', challenge)
                if realm:
                    self._registry_auth = (realm.group(1), service.group(1) if service else "")
            except (urllib.error.URLError, TimeoutError, OSError) as err:
                self.warn(f"registry {REGISTRY} not reachable: {err}")
        if not self._registry_auth:
            return {"error": "no token endpoint"}
        realm, service = self._registry_auth
        tok = self.fetch_json(f"{realm}?service={urllib.parse.quote(service)}&scope=repository:{repo}:pull") or {}
        token = tok.get("token") or tok.get("access_token")
        if not token:
            return {"error": "no anonymous token"}
        raw = self.fetch(f"{REGISTRY}/v2/{repo}/tags/list", headers={"Authorization": f"Bearer {token}"}, allow_404=True)
        if raw is None:
            return {"error": "repository not found"}
        try:
            data = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return {"error": "invalid JSON"}
        if data.get("errors"):
            return {"error": data["errors"][0].get("code", "error")}
        return {"tags": data.get("tags") or []}

    # ---- step 8: kolla images and kolla-ansible tag variables ------------- #

    def collect_kolla(self) -> None:
        print("==> Kolla images and kolla-ansible image tag variables")
        maintained = [s for s in self.data.get("series", []) if s["status"] == "maintained"]
        maintained.sort(key=lambda s: s["release_id"])
        ref_ids = [rid for rid in getattr(self, "osism_built_releases", []) if rid in self.series_by_id
                   and self.series_by_id[rid]["status"] in ("maintained", "unmaintained")]
        ref = f"stable/{ref_ids[-1]}" if ref_ids else (f"stable/{maintained[-1]['release_id']}" if maintained else "master")
        info: dict = {"reference_branch": ref, "products": {}}
        for product in self.ossa.get("products") or []:
            entry: dict = {"kolla_images": [], "tag_variables": [], "enable_flags": [], "roles": []}
            listing = self.fetch_json(OPENDEV_API.format(repo="openstack/kolla", path=f"docker/{product}", ref=ref), allow_404=True)
            if isinstance(listing, list):
                entry["kolla_images"] = sorted(i["name"] for i in listing if i.get("type") == "dir")
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
        info["exemplars"] = [str(p) for p in sorted(advisories, key=lambda p: p.stat().st_mtime)[-2:]]
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
            newest = sorted(advisories, key=lambda p: p.stat().st_mtime)[-1]
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
        for rid in sorted(ids):
            s = self.series_by_id.get(rid, {})
            branch = f"stable/{rid}"
            if s.get("status") == "unmaintained":
                branch = f"unmaintained/{rid}"
            elif s.get("status") == "development":
                branch = "master"
            rel_reviews = [r for r in reviews if r["branch"] == branch and r["project"] and r["project"].split("/")[-1] in self.ossa.get("products", [])]
            statuses = sorted({r["status"] for r in rel_reviews})
            product_versions = []
            fixed_here = []
            for product, per_series in self.data.get("releases", {}).items():
                info = per_series.get(rid, {})
                if info.get("latest"):
                    product_versions.append(f"{product} {info['latest']}")
                for f in self.data.get("fixed_versions", []):
                    if f.get("product") != product or f.get("series") != rid:
                        continue
                    if f.get("pinned_vulnerable"):
                        fixed_here.append(f"{f['fixed_in']} (released)" if f.get("fixed_in") else f"=={f['version']} vulnerable, no later release")
                    else:
                        fixed_here.append(f"{f['version']} ({'released' if f['released'] else 'not released'})")
            patches = self.data.get("osism_kolla", {}).get("patches", {}).get(rid, [])
            related = [e for e in patches if e.get("related_to_ossa")]
            prs = sorted({f"#{p['number']}" for e in related for p in e.get("pull_requests", [])})
            fix_merged_upstream = any(r["status"] == "MERGED" for r in rel_reviews)
            covered = bool(related) or fix_merged_upstream
            rows.append({
                "release": rid,
                "series": s.get("name"),
                "upstream_status": s.get("status"),
                "eol_date": s.get("eol_date") or "",
                "branch": branch,
                "fix_reviews": ", ".join(f"{r['number']} ({r['status']})" for r in rel_reviews) or "-",
                "fix_review_status": "/".join(statuses) or "-",
                "fix_merged_upstream": fix_merged_upstream,
                "latest_versions": ", ".join(product_versions) or "-",
                "fixed_version": ", ".join(fixed_here) or "-",
                "osism_builds": rid in built,
                "osism_officially_supported": rid in supported,
                "osism_patch_files_total": len(patches),
                "osism_patch_files_related": len(related),
                "osism_prs": ", ".join(prs) or "-",
                "covered": covered,
            })
        self.data["coverage"] = rows

    # ---- output ---------------------------------------------------------- #

    def write(self) -> Path:
        ossa_id = self.ossa.get("id") or "OSSA-unknown"
        out = self.output_dir / ossa_id
        out.mkdir(parents=True, exist_ok=True)
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
        rows = [["Reference", d["input"]["reference"]],
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
                "(Launchpad bugs must be *Public Security*) before writing anything.\n")

        add("## 2. OSSA core data\n")
        rows = [["ID", o.get("id")], ["Title", o.get("title")], ["Date", o.get("date")],
                ["Products", ", ".join(o.get("products") or [])],
                ["CVEs assigned", ", ".join(o.get("cves_assigned") or []) or "-"],
                ["CVEs pending", f"{o.get('cves_pending_count')} requested from MITRE, not assigned yet" if o.get("cves_pending_count") else "-"],
                ["Reporters", "; ".join(f"{r['name']} ({r['affiliation']})" for r in o.get("reporters") or []) or "-"],
                ["Launchpad bugs", ", ".join(f"#{b}" for b in o.get("bugs") or []) or "-"],
                ["Errata history", "; ".join(o.get("errata_history") or []) or "-"]]
        add(md_table(["Field", "Value"], rows))
        add("### Affected version ranges (verbatim from the OSSA)\n")
        for p in o.get("affected_products") or []:
            add(f"- `{p.get('product')}`: `{p.get('version')}` → fixed versions {p.get('fixed_versions') or '-'}, "
                f"pinned vulnerable versions {p.get('pinned_versions') or '-'}")
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
        rows = []
        for f in d.get("fixed_versions", []):
            if f.get("pinned_vulnerable"):
                status = (f"only this version vulnerable ('==' pin), fixed in {f['fixed_in']}" if f.get("fixed_in")
                          else "only this version vulnerable ('==' pin), **no later release yet**")
                rows.append([f["product"], f["version"], f.get("series") or "?", status, (f.get("tag_date") or "")[:10]])
            else:
                rows.append([f["product"], f["version"], f.get("series") or "?", "released" if f["released"] else "**not released**",
                             (f.get("tag_date") or "")[:10]])
        add(md_table(["Product", "Version", "Series", "Status", "Tag date"], rows))

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
            if c.get("description"):
                add(f"\n> {c['description']}")
            add("")

        add("## 8. OSISM: container-images-kolla\n")
        ok = d.get("osism_kolla", {})
        add(f"- Built OpenStack releases (defaults/*.sh): {', '.join(ok.get('built_releases') or []) or '-'}")
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
                tag = "**related to this OSSA**" if e.get("related_to_ossa") else "not related to this OSSA"
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
                    add(f"  - added by {c['url']} ({c['date'][:10]}): {c['subject']}")
                for p in e.get("pull_requests") or []:
                    add(f"  - PR #{p['number']} {p['state']} merged {str(p.get('merged_at') or '')[:10]}: {p['title']} — {p['url']} "
                        f"(merge commit {str(p.get('merge_commit_sha') or '')[:7]})")
                for lc in e.get("later_commits") or []:
                    add(f"  - later touched by {lc['sha']} ({lc['date']}): {lc['subject']}")
            add("")
        if not any_patch:
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
                        elif prm.get("error"):
                            line += f" → rolling `{prm['image']}`: **{prm['error']}** (do not list it in the override)"
                        else:
                            line += f" → rolling `{prm['image']}`: no release tags"
                    add(line)
            add("")

        add("## 10. Local documentation repository\n")
        add(f"- Target file: `{loc.get('target_file')}` — {'**already exists → update mode**' if loc.get('target_exists') else 'does not exist → new advisory'}")
        add(f"- Index file: `{loc.get('index_file')}` ({len(loc.get('index_rows') or [])} rows)")
        add("- Style exemplars (newest advisories): " + ", ".join(f"`{p}`" for p in loc.get("exemplars") or []))
        add(f"- Previous advisories for the same project: {', '.join(loc.get('previous_advisories_same_project') or []) or '-'}")
        add("- OSISM releases: " + "; ".join(f"OSISM {r['osism']} ({r['status']}): OpenStack {', '.join(r['openstack']) or '?'}"
                                          for r in loc.get("osism_releases") or []))
        add("")

        add("## 11. Coverage matrix (draft input for the Affected Versions table)\n")
        rows = [[c["release"], c["series"] or "", c["upstream_status"] or "", c["eol_date"], c["branch"],
                 c["latest_versions"], c["fixed_version"], c["fix_reviews"],
                 "yes" if c["osism_officially_supported"] else "no", "yes" if c["osism_builds"] else "no",
                 (f"{c['osism_patch_files_related']} related ({c['osism_prs']}), {c['osism_patch_files_total']} total"
                  if c["osism_patch_files_total"] else "-"),
                 "yes" if c["covered"] else "**no**"]
                for c in d.get("coverage", [])]
        add(md_table(["Release", "Series", "Upstream status", "EOL", "Branch", "Latest version", "Fixed version",
                      "Fix reviews", "OSISM supported", "OSISM builds", "OSISM patches", "Covered"], rows))
        add("Reading guide: a release is *covered* when OSISM patch files related to this OSSA exist for it "
            "(community-curated backport or early adoption of an unmerged upstream fix) or the upstream fix is merged "
            "on the branch the images are built from. The advisory lists every release OSISM builds images for — "
            "including the YYYY.2 releases that are not officially supported but always receive the fixes in "
            "practice — so every row with Covered = no must be clarified with the author (fix in preparation? "
            "not planned?) and the answer recorded in the advisory.\n")

        add("## 12. Open points to verify manually\n")
        points = []
        if o.get("cves_pending"):
            points.append("CVE ids are still pending — write 'CVE pending' and re-check the Launchpad bug titles / OSSA errata before publishing.")
        for c in d.get("cves", []):
            if c.get("state") == "not published":
                points.append(f"{c['id']} is not published on cve.org yet — the link will resolve later; no CVSS available.")
        if not any(m for c in d.get("cves", []) for m in c.get("metrics") or []):
            points.append("No CVSS score available — the Severity is OSISM's own assessment and must say so.")
        unmerged = [r for r in d.get("reviews", []) if r["status"] == "NEW"]
        if unmerged:
            points.append(f"{len(unmerged)} upstream review(s) not merged yet — fixed versions are expectations, not releases.")
        for f in d.get("fixed_versions", []):
            if not f.get("pinned_vulnerable") and not f["released"]:
                points.append(f"{f['product']} {f['version']} is not released yet.")
        if not any(e.get("related_to_ossa") for entries in ok.get("patches", {}).values() for e in entries):
            points.append("No OSISM patch files related to this OSSA found — confirm whether OSISM shipped a fix "
                          "(PR search / CHANGELOG / upstream stable branch) or state that it is pending.")
        for c in d.get("coverage", []):
            if c["osism_builds"] and not c["covered"] and c["upstream_status"] != "development":
                scope = "officially supported" if c["osism_officially_supported"] else "built (not officially supported, but always covered in practice)"
                points.append(f"{c['release']} ({c['series']}) is {scope} by OSISM but has neither an OSISM patch for this "
                              "issue nor a merged upstream fix — ASK THE AUTHOR about the status (backport in preparation? "
                              "next rebuild? not planned?) and record the answer in the advisory.")
        extra = [r for r in d.get("reviews", []) if not r["listed_in_ossa"]]
        if extra:
            points.append("Reviews referencing the bugs but not listed in the OSSA: " + ", ".join(str(r["number"]) for r in extra)
                          + " — decide whether they belong to this advisory (follow-ups, OSSN material).")
        for b in d.get("bugs", []):
            if b.get("information_type") and "Private" in b["information_type"]:
                points.append(f"Bug #{b['id']} is still private — do not publish details.")
        if loc.get("target_exists"):
            points.append("An advisory file already exists — update it (errata, CVE ids, release status) instead of rewriting it.")
        points.append("Decide which container images carry the vulnerable code (tag variables in section 9) and whether a "
                      "rebuild of all images or a single service image is needed.")
        points.append("Override snippet: set the *_tag AND every <service>*_image parameter with the rolling kolla namespace "
                      "(section 9); stable releases pull from kolla/release/<version>. List only images that exist in the "
                      "rolling registry and keep sidecar images without project code on their deployed tag.")
        points.append("Check the OSISM default configuration for the affected feature (enable flags in section 9 and the "
                      "configuration guide) to state whether default deployments are affected.")
        for p in points:
            add(f"- [ ] {p}")
        add("")
        if self.warnings:
            add("## 13. Collection warnings\n")
            for w in self.warnings:
                add(f"- {w}")
            add("")
        return "\n".join(L)

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


def find_repo_dir(start: Path) -> Path:
    for candidate in (start, *start.parents):
        if (candidate / "docs" / "appendix" / "security").exists():
            return candidate
    return start


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("reference", help="OSSA reference (Gerrit URL/number, OSSA id, or security.openstack.org URL)")
    parser.add_argument("--output-dir", type=Path, default=None,
                        help="directory for <OSSA-ID>/dossier.md and raw.json (default: a temporary directory)")
    parser.add_argument("--repo-dir", type=Path, default=None,
                        help="osism.github.io checkout (default: detected from the current directory)")
    parser.add_argument("--no-github", action="store_true", help="skip everything that needs the GitHub API")
    parser.add_argument("--print", action="store_true", help="print the dossier to stdout when done")
    args = parser.parse_args()

    repo_dir = args.repo_dir or find_repo_dir(Path.cwd())
    output_dir = args.output_dir or Path(tempfile.gettempdir()) / "security-advisory"
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
