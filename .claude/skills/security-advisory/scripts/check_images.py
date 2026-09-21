#!/usr/bin/env python3
"""Check the image override snippets of security advisories against osism/defaults.

  python3 check_images.py docs/appendix/security/ossa-*.md

Every ``*_image`` / ``*_tag`` line in the YAML code blocks of an advisory is compared with
all/002-images-kolla.yml of osism/defaults, the file that defines the image parameters:

  * every ``*_image`` / ``*_tag`` parameter must exist there — ``glance_image`` does not, the
    parameter is ``glance_api_image``; names are never derived by analogy with another service
  * the image name must be the one the parameter has there (``kolla/glance-api``, not
    ``kolla/glance``) and must use the rolling ``kolla`` namespace
  * in a block titled ``environments/kolla/images.yml`` (the form of the template) a tag override
    needs the image parameters it governs, and an image parameter needs its tag: the rolling tags
    only exist in the rolling namespace and the pinned tags only in ``kolla/release/<version>``.
    Untitled blocks are exempt, older advisories show the tag-only form first and explain it.

Exit status: 0 all snippets are valid, 1 at least one error, 2 the defaults file could not be
loaded — then nothing was verified, which is not the same as valid.

Only the Python standard library is required.
"""

from __future__ import annotations

import argparse
import difflib
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

DEFAULTS_URL = "https://raw.githubusercontent.com/osism/defaults/main/all/002-images-kolla.yml"
DEFAULTS_PAGE = "https://github.com/osism/defaults/blob/main/all/002-images-kolla.yml"
SNIPPET_TITLE = "environments/kolla/images.yml"

RE_PARAMETER = re.compile(r"^([a-z0-9_]+_(?:image|tag)):\s*(.*?)\s*$")
RE_BLOCK = re.compile(r"^(?P<indent>[ \t]*)```ya?ml(?P<info>[^\n]*)\n(?P<body>.*?)^(?P=indent)```", re.MULTILINE | re.DOTALL)


def scalar(value: str) -> str:
    """The value of a 'key: value' line without its comment and quotes."""
    value = value.strip()
    if value[:1] in ("'", '"'):
        end = value.find(value[0], 1)
        return value[1:end] if end != -1 else value[1:]
    return re.sub(r"\s+#.*$", "", value)


def load_image_parameters(text: str) -> dict:
    """{'images': {parameter: image name}, 'tags': {parameter: governing tag parameter or None}}."""
    raw = {m.group(1): scalar(m.group(2)) for line in text.splitlines() if (m := RE_PARAMETER.match(line))}

    def reference(value: str) -> str | None:
        m = re.fullmatch(r"\{\{\s*([a-z0-9_]+)\s*\}\}", value)
        return m.group(1) if m else None

    images: dict[str, str] = {}
    for name, value in raw.items():
        if not name.endswith("_image"):
            continue
        seen = {name}
        while (ref := reference(value)) and ref in raw and ref not in seen:  # "{{ neutron_server_image }}"
            seen.add(ref)
            value = raw[ref]
        if m := re.search(r"docker_image_url\s*\}\}([A-Za-z0-9._-]+)$", value):
            images[name] = m.group(1)
    tags = {name: (reference(value) if reference(value) in raw else None)
            for name, value in raw.items() if name.endswith("_tag")}
    return {"images": images, "tags": tags}


def tag_chain(parameter: str, tags: dict) -> list[str]:
    """A tag parameter and the tag parameters it inherits from: glance_api_tag → glance_tag."""
    chain = []
    while parameter and parameter not in chain:
        chain.append(parameter)
        parameter = tags.get(parameter)
    return chain


def snippets(markdown: str) -> list[tuple[int, dict[str, str], bool]]:
    """(line number, {parameter: value}, titled images.yml) of every YAML block with image parameters."""
    found = []
    for block in RE_BLOCK.finditer(markdown):
        values = {}
        for line in block.group("body").splitlines():
            if m := RE_PARAMETER.match(line.strip()):
                values[m.group(1)] = scalar(m.group(2))
        if values:
            found.append((markdown.count("\n", 0, block.start()) + 1, values,
                          f'title="{SNIPPET_TITLE}"' in block.group("info")))
    return found


def suggestions(parameter: str, known: list[str]) -> str:
    prefix = parameter.split("_")[0] + "_"
    suffix = "_" + parameter.rsplit("_", 1)[1]
    same_service = sorted(k for k in known if k.startswith(prefix) and k.endswith(suffix))
    close = same_service or difflib.get_close_matches(parameter, known, n=5, cutoff=0.6)
    return f" — defined there: {', '.join(close)}" if close else ""


def check_snippet(values: dict[str, str], parameters: dict, pairing: bool = True) -> list[str]:
    images, tags = parameters["images"], parameters["tags"]
    errors = []
    for name, value in values.items():
        if name.endswith("_image"):
            if name not in images:
                errors.append(f"`{name}` is not an image parameter of osism/defaults{suggestions(name, list(images))}")
                continue
            if not re.fullmatch(rf"[^/\s]+/kolla/{re.escape(images[name])}", value):
                errors.append(f"`{name}` must point at the rolling image `<registry>/kolla/{images[name]}`, not `{value}`")
            if pairing and not any(tag in values for tag in tag_chain(name[:-len("_image")] + "_tag", tags)):
                errors.append(f"`{name}` is set without its tag (`{name[:-len('_image')]}_tag` or the tag it inherits "
                              "from): the pinned release tag does not exist in the rolling namespace")
        elif name not in tags:
            errors.append(f"`{name}` is not a tag parameter of osism/defaults{suggestions(name, list(tags))}")
    for name in values if pairing else ():
        if name not in tags:
            continue
        governed = [image for image in images if name in tag_chain(image[:-len("_image")] + "_tag", tags)]
        if governed and not any(image in values for image in governed):
            errors.append(f"`{name}` is overridden without any of the image parameters it governs "
                          f"({', '.join(sorted(governed))}): the tag alone points at an image that does not exist")
    return errors


def check_advisory(markdown: str, parameters: dict) -> list[str]:
    return [f"line {line}: {error}" for line, values, titled in snippets(markdown)
            for error in check_snippet(values, parameters, pairing=titled)]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("advisories", nargs="+", type=Path, help="advisory Markdown files")
    parser.add_argument("--defaults-file", type=Path, default=None,
                        help=f"local copy of all/002-images-kolla.yml (default: fetch {DEFAULTS_URL})")
    args = parser.parse_args()

    try:
        if args.defaults_file:
            text = args.defaults_file.read_text()
        else:
            with urllib.request.urlopen(urllib.request.Request(DEFAULTS_URL), timeout=30) as resp:
                text = resp.read().decode("utf-8")
    except (OSError, urllib.error.URLError) as err:
        print(f"error: cannot load the image parameters ({err}) — NOTHING was verified", file=sys.stderr)
        return 2
    parameters = load_image_parameters(text)
    if not parameters["images"]:
        print(f"error: no image parameters found in the defaults file — NOTHING was verified ({DEFAULTS_PAGE})", file=sys.stderr)
        return 2

    failed = False
    for path in args.advisories:
        markdown = path.read_text()
        errors = check_advisory(markdown, parameters)
        failed = failed or bool(errors)
        for error in errors:
            print(f"{path}: {error}")
        if not errors:
            print(f"{path}: ok ({len(snippets(markdown))} block(s) with image parameters)")
    if failed:
        print(f"\nThe image parameters are defined in {DEFAULTS_PAGE}", file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
