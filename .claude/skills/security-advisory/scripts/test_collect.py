#!/usr/bin/env python3
"""Tests for collect.py. Standard library only, no network.

  python3 -m unittest discover -s .claude/skills/security-advisory/scripts -p 'test_*.py'

The collector feeds a published security advisory, so a wrong answer is not a crash but a
confident false statement. These tests pin down what has to happen when an input is missing,
ambiguous or unreadable: it must surface as "unknown" / "unverified" and as an open point in
dossier section 12, never as a negative.

Set OSSA_CORPUS to the ossa/ directory of an openstack/ossa checkout to run the parser
comparison against every real advisory instead of the fixtures only.
"""

from __future__ import annotations

import contextlib
import io
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parent))

import collect  # noqa: E402
from collect import FAILED, Collector  # noqa: E402

# Fixtures modelled on the shapes found in openstack/ossa (the content is made up).
OSSA_CAPITALISED = """\
date: 2026-08-13

id: OSSA-2026-901

title: Unauthorized policy deletion lock

description: >
  Jane Doe with Example Corp reported a vulnerability in Octavia policy
  authorization. By associating another project's policy with an amphora,
  an authenticated user may prevent deletion of that policy.

  All Octavia deployments are affected.

errata: >
  MITRE assigned CVE-2026-11111 after initial publication.

affected-products:
  - product: Octavia
    version: '<16.0.2, ==17.0.0, ==18.0.0'

vulnerabilities:
  - cve-id: CVE-2026-11111

reporters:
  - name: Jane Doe
    affiliation: Example Corp, Research Lab
    reported:
      - CVE-2026-11111

issues:
  links:
    - https://launchpad.net/bugs/2100001

reviews:
  2026.2/hibiscus (development):
    - https://review.opendev.org/900001

  2026.1/gazpacho:
    - https://review.opendev.org/900002

errata_history:
  - 2026-08-17 - Errata 1
  - 2026-08-13 - Original Version
"""

OSSA_NOTES = """\
date: 2026-08-25
id: OSSA-2026-902
title: Inconsistent scope enforcement for delegated tokens
description: |
  First paragraph of the description
  on two lines.

  Second paragraph.
affected-products:
  - product: keystone
    version: '>=13.0.0 <27.0.3, >=28.0.0 <28.0.3'
vulnerabilities:
  - cve-id: CVE-2026-22222
  - cve-id: CVE-2026-pending
reporters:
  - name: John Roe
    affiliation: Example Org
issues:
  links:
    - https://launchpad.net/bugs/2100002
    - https://bugs.launchpad.net/keystone/+bug/2100003
reviews:
  master :
    - https://review.opendev.org/c/openstack/keystone/+/900010
  2025.1/epoxy:
    - https://review.opendev.org/900011
    - https://review.opendev.org/900012
notes:
  - 'The two patch sets are interdependent and must be applied together.
    The guard introduced by the second patch depends on the ``[auth]
    additional_primary_auth_methods`` option; it''s not optional.'

  - A plain note that continues
    on a second line.
"""

OSSA_QUOTED_PRODUCT = """\
date: 2019-05-01
id: OSSA-2019-903
title: "Quoted title: with a colon"
description: 'A single-quoted description that spans
  two lines.'
affected-products:
  - product: 'os-vif'
    version: '>=1.15.0<1.15.2, 1.16.0'
vulnerabilities:
  - cve-id: CVE-2019-33333
reporters:
  - name: Some One
    affiliation: UNKNOWN
issues:
  links:
    - https://launchpad.net/bugs/1800001
reviews:
  stein:
    - https://review.opendev.org/600001
"""

OSSA_MULTI_PRODUCT = """\
date: 2023-01-24
id: OSSA-2023-904
title: Arbitrary file access through custom image descriptor
description: >
  A vulnerability in image processing for Cinder, Glance and Nova.
affected-products:
  - product: Cinder, Glance, Nova
    version: 'Cinder <19.1.2, >=20.0.0 <20.0.2, ==21.0.0; Glance <23.0.1, ==25.0.0; Nova <24.1.2, ==26.0.0'
vulnerabilities:
  - cve-id: CVE-2022-44444
reporters:
  - name: Some One
    affiliation: Example
issues:
  links:
    - https://launchpad.net/bugs/1990001
reviews:
  zed:
    - https://review.opendev.org/800001
"""

FIXTURES = {"capitalised": OSSA_CAPITALISED, "notes": OSSA_NOTES, "quoted": OSSA_QUOTED_PRODUCT,
            "multi": OSSA_MULTI_PRODUCT}


def make_collector(use_github: bool = True) -> Collector:
    with contextlib.redirect_stderr(io.StringIO()):
        return Collector(repo_dir=Path("."), output_dir=Path("."), use_github=use_github)


def quiet(func, *args, **kwargs):
    with contextlib.redirect_stderr(io.StringIO()), contextlib.redirect_stdout(io.StringIO()):
        return func(*args, **kwargs)


def parse(text: str, with_pyyaml: bool) -> tuple[dict, list[str]]:
    collector = make_collector()
    collector.warnings.clear()
    with mock.patch.object(collect, "yaml", collect.yaml if with_pyyaml else None):
        ossa = quiet(collector.parse_ossa, text, "ossa/OSSA-0000-000.yaml")
    return ossa, collector.warnings


def section(dossier: str, number: int) -> str:
    start = dossier.index(f"\n## {number}. ")
    end = dossier.find("\n## ", start + 1)
    return dossier[start:end if end != -1 else None]


class VersionRanges(unittest.TestCase):
    def test_upper_bound_is_the_fixed_version(self):
        r = collect.parse_version_ranges(">=13.0.0 <27.0.3, >=28.0.0 <28.0.3, ==29.0.0")
        self.assertEqual(r["fixed_versions"], ["27.0.3", "28.0.3"])
        self.assertEqual(r["pinned_versions"], ["29.0.0"])
        self.assertEqual(r["last_vulnerable_versions"], [])

    def test_inclusive_upper_bound_names_no_fixed_version(self):
        r = collect.parse_version_ranges(">=13.0.0 <=13.1.3, >=14.0.0 <=14.0.4")
        self.assertEqual(r["fixed_versions"], [])
        self.assertEqual(r["last_vulnerable_versions"], ["13.1.3", "14.0.4"])

    def test_sloppy_spellings(self):
        r = collect.parse_version_ranges(">=1.15.0<1.15.2, 1.16.0, =18.0.0")
        self.assertEqual(r["fixed_versions"], ["1.15.2"])
        self.assertEqual(r["pinned_versions"], ["1.16.0", "18.0.0"])

    def test_versions_sort_numerically(self):
        r = collect.parse_version_ranges("<9.4.2, <10.0.1")
        self.assertEqual(r["fixed_versions"], ["9.4.2", "10.0.1"])


class ProductNormalisation(unittest.TestCase):
    def test_capitalised_product_becomes_the_deliverable_name(self):
        ossa, _ = parse(OSSA_CAPITALISED, with_pyyaml=False)
        self.assertEqual(ossa["products"], ["octavia"])
        self.assertEqual(ossa["affected_products"][0]["product_display"], "Octavia")
        self.assertTrue(ossa["affected_products"][0]["valid_name"])

    def test_lowercase_product_is_unchanged(self):
        ossa, _ = parse(OSSA_NOTES, with_pyyaml=False)
        self.assertEqual(ossa["products"], ["keystone"])

    def test_quotes_are_stripped(self):
        self.assertEqual(collect.normalise_products([{"product": "'os-vif'", "version": "'<1.0.1'"}])[0]["product"],
                         "os-vif")
        ossa, _ = parse(OSSA_QUOTED_PRODUCT, with_pyyaml=False)
        self.assertEqual(ossa["products"], ["os-vif"])

    def test_combined_field_is_split_with_its_ranges(self):
        ossa, warnings = parse(OSSA_MULTI_PRODUCT, with_pyyaml=False)
        self.assertEqual(ossa["products"], ["cinder", "glance", "nova"])
        by_name = {p["product"]: p for p in ossa["affected_products"]}
        self.assertEqual(by_name["glance"]["version"], "<23.0.1, ==25.0.0")
        self.assertEqual(by_name["cinder"]["fixed_versions"], ["19.1.2", "20.0.2"])
        self.assertEqual(by_name["nova"]["pinned_versions"], ["26.0.0"])
        self.assertTrue(any("several products" in w for w in warnings))

    def test_combined_field_without_attributable_ranges_keeps_the_whole_range(self):
        products = collect.normalise_products([{"product": "Ironic, Ironic-Python-Agent", "version": "<21.4.3"}])
        self.assertEqual([p["product"] for p in products], ["ironic", "ironic-python-agent"])
        self.assertEqual({p["version"] for p in products}, {"<21.4.3"})

    def test_unusable_name_is_flagged_and_becomes_an_open_point(self):
        collector = make_collector()
        collector.ossa = quiet(collector.parse_ossa,
                               OSSA_NOTES.replace("product: keystone", "product: Identity Service (Keystone)"),
                               "ossa/OSSA-2026-902.yaml")
        self.assertFalse(collector.ossa["affected_products"][0]["valid_name"])
        self.assertTrue(any("does not look like a deliverable name" in w for w in collector.warnings))
        self.assertTrue(any("does not look like a deliverable name" in p for p in collector.open_points()))


class YamlParsers(unittest.TestCase):
    """Both YAML paths must produce the same OSSA data, whichever is installed."""

    def test_subset_parser_extracts_notes_and_errata(self):
        ossa, _ = parse(OSSA_NOTES, with_pyyaml=False)
        self.assertEqual(len(ossa["notes"]), 2)
        self.assertTrue(ossa["notes"][0].startswith("The two patch sets are interdependent"))
        self.assertIn("it's not optional.", ossa["notes"][0])
        self.assertEqual(ossa["notes"][1], "A plain note that continues on a second line.")
        ossa, _ = parse(OSSA_CAPITALISED, with_pyyaml=False)
        self.assertEqual(ossa["errata_history"], ["2026-08-17 - Errata 1", "2026-08-13 - Original Version"])
        self.assertEqual(ossa["errata"], "MITRE assigned CVE-2026-11111 after initial publication.")
        self.assertEqual(ossa["date"], "2026-08-13")

    def test_subset_parser_handles_scalars_and_keys(self):
        ossa, _ = parse(OSSA_NOTES, with_pyyaml=False)
        self.assertEqual(ossa["description"], "First paragraph of the description\non two lines.\n\nSecond paragraph.")
        self.assertEqual(list(ossa["reviews"]), ["master", "2025.1/epoxy"])
        self.assertEqual(ossa["bugs"], [2100002, 2100003])
        self.assertEqual(ossa["cves_assigned"], ["CVE-2026-22222"])
        self.assertEqual(ossa["cves_pending_count"], 1)
        ossa, _ = parse(OSSA_QUOTED_PRODUCT, with_pyyaml=False)
        self.assertEqual(ossa["title"], "Quoted title: with a colon")
        self.assertEqual(ossa["description"], "A single-quoted description that spans two lines.")
        ossa, _ = parse(OSSA_CAPITALISED, with_pyyaml=False)
        self.assertEqual(ossa["reporters"], [{"name": "Jane Doe", "affiliation": "Example Corp, Research Lab"}])
        self.assertIn("deletion of that policy.\nAll Octavia deployments", ossa["description"])

    def test_missing_pyyaml_is_reported(self):
        with mock.patch.object(collect, "yaml", None):
            collector = make_collector()
        self.assertTrue(any("PyYAML is not installed" in w for w in collector.warnings))

    def test_unparseable_document_is_reported_not_silently_empty(self):
        collector = make_collector()
        collector.ossa = quiet(collector.parse_ossa, "OSSA-2015-001\n=============\nfree text", "ossa/OSSA-2015-001.rst")
        self.assertEqual(collector.ossa["format"], "text")
        self.assertEqual(collector.ossa["id"], "OSSA-2015-001")
        self.assertTrue(any("could not be parsed" in p for p in collector.open_points()))

    @unittest.skipIf(collect.yaml is None, "PyYAML not installed")
    def test_both_parsers_agree_on_the_fixtures(self):
        for name, text in FIXTURES.items():
            with self.subTest(fixture=name):
                self.assertEqual(parse(text, with_pyyaml=True)[0], parse(text, with_pyyaml=False)[0])

    @unittest.skipIf(collect.yaml is None, "PyYAML not installed")
    @unittest.skipUnless(os.environ.get("OSSA_CORPUS"), "OSSA_CORPUS not set")
    def test_both_parsers_agree_on_the_real_advisories(self):
        files = sorted(Path(os.environ["OSSA_CORPUS"]).glob("OSSA-*.yaml"))
        self.assertTrue(files, "no OSSA-*.yaml files in OSSA_CORPUS")
        for path in files:
            with self.subTest(advisory=path.name):
                text = path.read_text()
                self.assertEqual(parse(text, with_pyyaml=True)[0], parse(text, with_pyyaml=False)[0])


class OssaFileSelection(unittest.TestCase):
    BATCH = ["ossa/OSSA-2026-030.yaml", "ossa/OSSA-2026-031.yaml"]

    def test_requested_id_selects_its_file(self):
        self.assertEqual(collect.select_ossa_file(self.BATCH, "OSSA-2026-030"), "ossa/OSSA-2026-030.yaml")
        self.assertEqual(collect.select_ossa_file(self.BATCH, "ossa-2026-031"), "ossa/OSSA-2026-031.yaml")

    def test_requested_id_missing_from_the_change_is_an_error(self):
        with self.assertRaises(SystemExit) as ctx:
            collect.select_ossa_file(self.BATCH, "OSSA-2026-029")
        self.assertIn("OSSA-2026-029", str(ctx.exception))

    def test_batched_change_without_an_id_is_an_error_not_a_guess(self):
        with self.assertRaises(SystemExit) as ctx:
            collect.select_ossa_file(self.BATCH, None)
        self.assertIn("OSSA-2026-030, OSSA-2026-031", str(ctx.exception))

    def test_single_advisory_without_an_id(self):
        self.assertEqual(collect.select_ossa_file(["ossa/OSSA-2026-037.yaml"], None), "ossa/OSSA-2026-037.yaml")

    def test_file_name_without_an_ossa_id_is_an_error(self):
        with self.assertRaises(SystemExit):
            collect.select_ossa_file(["ossa/OSSA-2026-37.yaml"], None)


class SeriesResolution(unittest.TestCase):
    LIBRARY = {  # a library keeps one major version across many series
        "2024.1": {"versions": ["10.5.0", "10.6.0"], "release_model": "cycle-with-intermediary"},
        "2025.1": {"versions": ["10.9.0"], "release_model": "cycle-with-intermediary"},
        "2025.2": {"versions": ["10.12.0"], "release_model": "cycle-with-intermediary"},
        "2026.1": {"versions": ["11.0.0", "12.0.0"], "release_model": "cycle-with-intermediary"},
    }
    SERVICE = {
        "2025.1": {"versions": ["27.0.0", "27.0.2"], "release_model": "cycle-with-rc"},
        "2025.2": {"versions": ["28.0.0"], "release_model": "cycle-with-rc"},
    }

    def test_released_version_is_authoritative(self):
        self.assertEqual(collect.resolve_series("10.9.0", self.LIBRARY)["series"], "2025.1")
        self.assertEqual(collect.resolve_series("10.9.0", self.LIBRARY)["basis"], "released")

    def test_unreleased_library_version_is_not_guessed_from_the_major(self):
        resolved = collect.resolve_series("10.13.0", self.LIBRARY)
        self.assertIsNone(resolved["series"])
        self.assertEqual(resolved["candidates"], ["2024.1", "2025.1", "2025.2"])

    def test_candidates_are_narrowed_by_minor_version_but_stay_unverified(self):
        resolved = collect.resolve_series("10.9.1", self.LIBRARY)
        self.assertIsNone(resolved["series"])
        self.assertEqual(resolved["candidates"], ["2025.1"])

    def test_unreleased_service_version_maps_through_its_single_major(self):
        self.assertEqual(collect.resolve_series("27.0.3", self.SERVICE)["series"], "2025.1")

    def test_single_candidate_of_a_library_is_still_unverified(self):
        # only one series was looked up — that does not make the major version unique upstream
        resolved = collect.resolve_series("10.9.1", {"2025.1": self.LIBRARY["2025.1"]})
        self.assertIsNone(resolved["series"])

    def test_unverified_series_is_rendered_and_raised(self):
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000"}
        collector.data["fixed_versions"] = [
            {"product": "keystonemiddleware", "version": "10.13.0", "released": False, "series": None,
             "series_candidates": ["2024.1", "2025.1"], "series_basis": None, "lookup_failed": False, "tag_date": None}]
        dossier = collector.render_dossier()
        self.assertIn("**unverified** (candidates: 2024.1, 2025.1)", section(dossier, 6))
        self.assertIn("cannot be mapped to an OpenStack series", section(dossier, 12))


def coverage_collector(reviews: list[dict], patches: dict, built: list[str] | None = None,
                       use_github: bool = True, state: str = "ok") -> Collector:
    collector = make_collector(use_github=use_github)
    collector.ossa = {"id": "OSSA-2026-902", "products": ["keystone"], "reviews": {}, "bugs": [2100002],
                      "affected_products": []}
    collector.series_by_id = {
        "2024.1": {"name": "caracal", "status": "unmaintained", "release_id": "2024.1"},
        "2025.1": {"name": "epoxy", "status": "maintained", "release_id": "2025.1"},
        "2026.2": {"name": "hibiscus", "status": "development", "release_id": "2026.2"},
    }
    collector.data.update({
        "series": list(collector.series_by_id.values()),
        "bugs": [{"id": 2100002, "title": "Delegated tokens", "information_type": "Public Security", "tasks": [],
                  "date_created": "2026-08-01", "web_link": "https://bugs.launchpad.net/bugs/2100002"}],
        "reviews": reviews,
        "osism_kolla": {"state": state, "built_releases": built or [], "patches": patches},
        "local": {"officially_supported_openstack_releases": ["2024.1", "2025.1"]},
    })
    collector.osism_built_releases = built or []
    collector.build_coverage()
    return collector


def review(number: int, branch: str, status: str = "MERGED", listed: bool = True, confirmed: bool | None = None) -> dict:
    return {"number": number, "project": "openstack/keystone", "branch": branch, "status": status,
            "listed_in_ossa": listed, "confirmed_fix": listed if confirmed is None else confirmed,
            "change_id": "I" + "a" * 40, "subject": "Fix it", "submitted": "2026-08-25", "updated": "2026-08-25",
            "files": []}


def patch(related: bool, unverified: bool, verified_commit: bool = True) -> dict:
    return {"path": "patches/2024.1/keystone/0001-Fix-it.patch", "related_to_ossa": related,
            "related_unverified": unverified, "match_kind": "change-id" if related else "file name",
            "pull_requests": [{"number": 731, "state": "closed", "title": "keystone: fix", "url": "https://example.invalid/731"}],
            "added_by_commit": {"sha": "134fb90" + "0" * 33, "date": "2026-08-25T00:00:00Z", "subject": "keystone: fix",
                                "url": "https://example.invalid/c", "renamed_from": [], "verified": verified_commit,
                                "unverified_reason": None if verified_commit else "more than 10 renames"}}


class Coverage(unittest.TestCase):
    BUILT = ["2024.1", "2025.1"]

    def row(self, collector: Collector, release: str) -> dict:
        return next(c for c in collector.data["coverage"] if c["release"] == release)

    def covered_cell(self, collector: Collector, release: str) -> str:
        """The rendered 'Covered' column: a state that is right in the dict but wrong in the dossier is wrong."""
        row = next(line for line in section(collector.render_dossier(), 11).splitlines() if line.startswith(f"| {release}"))
        return row.rstrip(" |").rsplit("|", 1)[1].strip()

    def test_states(self):
        self.assertEqual(collect.coverage_state(True, False, False), "yes")
        self.assertEqual(collect.coverage_state(False, True, True), "yes")
        self.assertEqual(collect.coverage_state(False, False, True), "unverified")
        self.assertEqual(collect.coverage_state(False, False, False), "no")

    def test_listed_merged_review_covers_the_release(self):
        collector = coverage_collector([review(1, "stable/2025.1")], {}, self.BUILT)
        self.assertEqual(self.row(collector, "2025.1")["covered"], "yes")
        self.assertEqual(self.covered_cell(collector, "2025.1"), "yes")
        self.assertFalse(any(p.startswith("2025.1 ") for p in collector.open_points()))

    def test_merged_related_bug_follow_up_is_not_coverage(self):
        """The fix is merged on master only; a Related-Bug cleanup merged on the unmaintained branch."""
        collector = coverage_collector([review(1, "master"), review(2, "unmaintained/2024.1", listed=False)], {}, self.BUILT)
        self.assertEqual(self.row(collector, "2024.1")["covered"], "unverified")
        self.assertEqual(self.covered_cell(collector, "2024.1"), "**unverified**")
        asked = [p for p in collector.open_points() if p.startswith("2024.1 ")]
        self.assertEqual(len(asked), 1)
        self.assertIn("UNVERIFIED", asked[0])
        self.assertIn("ASK THE AUTHOR", asked[0])

    def test_backport_with_the_change_id_of_a_listed_review_is_coverage(self):
        collector = coverage_collector([review(2, "unmaintained/2024.1", listed=False, confirmed=True)], {}, self.BUILT)
        self.assertEqual(self.row(collector, "2024.1")["covered"], "yes")

    def test_unmerged_review_is_not_coverage(self):
        collector = coverage_collector([review(1, "stable/2025.1", status="NEW")], {}, self.BUILT)
        self.assertEqual(self.row(collector, "2025.1")["covered"], "no")
        self.assertEqual(self.covered_cell(collector, "2025.1"), "**no**")
        self.assertTrue(any(p.startswith("2025.1 ") and "ASK THE AUTHOR" in p for p in collector.open_points()))

    def test_patch_matched_by_file_name_only_is_unverified(self):
        collector = coverage_collector([], {"2024.1": [patch(related=False, unverified=True)]}, self.BUILT)
        row = self.row(collector, "2024.1")
        self.assertEqual(row["covered"], "unverified")
        self.assertEqual(row["osism_prs"], "-", "an unverified match must not put a PR into the fix column")
        self.assertEqual(row["osism_prs_unverified"], "#731")
        self.assertEqual(self.covered_cell(collector, "2024.1"), "**unverified**")
        self.assertTrue(any(p.startswith("2024.1 ") and "ASK THE AUTHOR" in p for p in collector.open_points()))

    def test_patch_with_the_change_id_of_the_fix_covers_the_release(self):
        collector = coverage_collector([], {"2024.1": [patch(related=True, unverified=False)]}, self.BUILT)
        self.assertEqual(self.row(collector, "2024.1")["covered"], "yes")
        self.assertEqual(self.row(collector, "2024.1")["osism_prs"], "#731")

    def test_development_series_and_unbuilt_releases_are_not_asked(self):
        collector = coverage_collector([], {}, ["2025.1"])
        points = collector.open_points()
        self.assertFalse(any(p.startswith("2026.2 ") for p in points))
        self.assertFalse(any(p.startswith("2024.1 ") for p in points))

    def test_unverified_attribution_is_an_open_point(self):
        collector = coverage_collector([], {"2024.1": [patch(True, False, verified_commit=False)]}, self.BUILT)
        self.assertTrue(any("could not be verified" in p and "git log --follow" in p for p in collector.open_points()))
        self.assertIn("attribution unverified", section(collector.render_dossier(), 8))

    def test_kolla_reference_branch_follows_the_series_status(self):
        collector = coverage_collector([], {}, self.BUILT)
        self.assertEqual(collector.branch_for("2024.1"), "unmaintained/2024.1")
        self.assertEqual(collector.branch_for("2025.1"), "stable/2025.1")
        self.assertEqual(collector.branch_for("2026.2"), "master")


class WithoutGithub(unittest.TestCase):
    def test_flag_is_recorded_and_warned(self):
        collector = make_collector(use_github=False)
        self.assertTrue(collector.data["github_skipped"])
        self.assertTrue(any("--no-github" in w and "UNKNOWN" in w for w in collector.warnings))
        self.assertIs(collector.github_json("repos/x/y"), FAILED)

    def test_unknown_is_not_rendered_as_absent(self):
        collector = coverage_collector([], {}, built=[], use_github=False, state="skipped")
        dossier = collector.render_dossier()
        self.assertIn("unknown (GitHub not queried)", section(dossier, 8))
        self.assertNotIn("No patch files for the affected products", section(dossier, 8))
        row = next(line for line in section(dossier, 11).splitlines() if line.startswith("| 2025.1"))
        self.assertEqual(row.count("unknown (GitHub not queried)"), 2)

    def test_coverage_questions_stay_unconditional(self):
        collector = coverage_collector([], {}, built=[], use_github=False, state="skipped")
        points = collector.open_points()
        self.assertTrue(any(p.startswith("2024.1 ") and "ASK THE AUTHOR" in p for p in points))
        self.assertTrue(any(p.startswith("2025.1 ") and "ASK THE AUTHOR" in p for p in points))
        self.assertTrue(any("unknown (GitHub not queried)" in p for p in points))

    def test_failed_tree_lookup_is_unknown_too(self):
        collector = make_collector()
        collector.ossa = {"products": ["keystone"], "bugs": [], "cves_assigned": [], "id": "OSSA-0000-000"}
        with mock.patch.object(collector, "github_json", return_value=FAILED), \
                mock.patch.object(collector, "fetch_text", return_value=FAILED):
            quiet(collector.collect_osism_kolla)
        self.assertEqual(collector.data["osism_kolla"]["state"], "failed")


class NeedToKnow(unittest.TestCase):
    def points(self, bugs: list[dict], change_status: str = "MERGED") -> list[str]:
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000"}
        collector.data.update({"bugs": bugs, "ossa_change": {"status": change_status}})
        return [p for p in collector.open_points() if p.startswith("STOP")]

    def test_public_security_does_not_block(self):
        self.assertEqual(self.points([{"id": 1, "information_type": "Public Security"}]), [])

    def test_unreadable_bug_blocks_even_when_the_change_is_merged(self):
        collector = make_collector()
        collector.ossa = {"bugs": [2100002], "cves_assigned": []}
        with mock.patch.object(collector, "fetch_json", return_value=None):
            quiet(collector.collect_bugs)
        self.assertNotIn("information_type", collector.data["bugs"][0])
        stops = self.points(collector.data["bugs"])
        self.assertEqual(len(stops), 1)
        self.assertIn("#2100002", stops[0])
        self.assertIn("not readable", stops[0])

    def test_failed_lookup_blocks_as_well(self):
        collector = make_collector()
        collector.ossa = {"bugs": [2100002], "cves_assigned": []}
        with mock.patch.object(collector, "fetch_json", return_value=FAILED):
            quiet(collector.collect_bugs)
        self.assertIn("lookup failed", self.points(collector.data["bugs"])[0])

    def test_every_other_information_type_blocks(self):
        for kind in ("Private Security", "Private", "Embargoed", "Proprietary", "Public", None):
            with self.subTest(information_type=kind):
                self.assertEqual(len(self.points([{"id": 1, "information_type": kind}])), 1)

    def test_blocker_is_rendered_in_section_12(self):
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000"}
        collector.data["bugs"] = [{"id": 7, "error": "not readable", "web_link": "https://bugs.launchpad.net/bugs/7"}]
        self.assertIn("- [ ] STOP — bug #7", section(collector.render_dossier(), 12))

    def test_unmerged_change_without_bugs_blocks(self):
        self.assertEqual(len(self.points([], change_status="NEW")), 1)
        self.assertEqual(self.points([], change_status="MERGED"), [])


class FailedLookups(unittest.TestCase):
    """A 404 is an answer, a failed request is not."""

    def http_error(self, code: int):
        return collect.urllib.error.HTTPError("https://example.invalid", code, "error", {}, io.BytesIO())

    def test_fetch_tells_404_and_failure_apart(self):
        collector = make_collector()
        with mock.patch.object(collect.urllib.request, "urlopen", side_effect=self.http_error(404)):
            self.assertIsNone(quiet(collector.fetch, "https://example.invalid", allow_404=True))
            self.assertIs(quiet(collector.fetch, "https://example.invalid"), FAILED)
        with mock.patch.object(collect.urllib.request, "urlopen", side_effect=self.http_error(503)):
            self.assertIs(quiet(collector.fetch, "https://example.invalid", allow_404=True), FAILED)
        with mock.patch.object(collect.urllib.request, "urlopen", side_effect=TimeoutError("timed out")):
            self.assertIs(quiet(collector.fetch, "https://example.invalid", allow_404=True), FAILED)
        self.assertFalse(FAILED)
        self.assertEqual(FAILED or {}, {})

    def cve_collector(self, answer) -> Collector:
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000", "cves_assigned": ["CVE-2026-22222"], "cves_pending": []}
        with mock.patch.object(collector, "fetch_json", return_value=answer):
            quiet(collector.collect_cves)
        return collector

    def test_cve_404_means_not_published(self):
        collector = self.cve_collector(None)
        self.assertEqual(collector.data["cves"][0]["state"], "not published")
        self.assertTrue(any("No CVSS score available" in p for p in collector.open_points()))

    def test_cve_lookup_failure_is_not_a_claim_about_upstream(self):
        collector = self.cve_collector(FAILED)
        self.assertEqual(collector.data["cves"][0]["state"], "lookup failed")
        points = collector.open_points()
        self.assertTrue(any("CVE-2026-22222 could not be fetched" in p for p in points))
        self.assertFalse(any("No CVSS score available" in p for p in points))
        self.assertFalse(any("not published on cve.org" in p for p in points))
        self.assertIn("could not be fetched", section(collector.render_dossier(), 7))

    def releases_collector(self, answer) -> Collector:
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000", "products": ["keystone"], "reviews": {},
                          "affected_products": collect.normalise_products([{"product": "Keystone", "version": "<27.0.3"}])}
        collector.data["series"] = [{"name": "epoxy", "release_id": "2025.1", "status": "maintained"}]
        collector.series_by_id = {"2025.1": collector.data["series"][0]}
        with mock.patch.object(collector, "fetch_text", return_value=answer), \
                mock.patch.object(collector, "github_json", return_value=None):
            quiet(collector.collect_releases)
        return collector

    def test_deliverable_404_means_no_deliverable(self):
        collector = self.releases_collector(None)
        self.assertEqual(collector.data["releases"]["keystone"]["2025.1"]["error"], "no deliverable file")

    def test_deliverable_lookup_failure_is_unknown(self):
        collector = self.releases_collector(FAILED)
        self.assertEqual(collector.data["releases"]["keystone"]["2025.1"]["error"], "lookup failed")
        dossier = collector.render_dossier()
        self.assertIn("lookup failed", section(dossier, 6))
        self.assertIn("**unknown (lookup failed)**", section(dossier, 6))
        points = collector.open_points()
        self.assertTrue(any("could not be fetched for 2025.1" in p for p in points))
        self.assertFalse(any("is not released yet" in p for p in points))

    def test_deliverable_is_parsed(self):
        text = ("launchpad: keystone\nrelease-model: cycle-with-rc\nreleases:\n  - version: 27.0.0\n    projects:\n"
                "      - repo: openstack/keystone\n        hash: abc\n  - version: 27.0.0.0rc1\n    projects:\n"
                "      - repo: openstack/keystone\n        hash: def\nbranches:\n  - name: stable/2025.1\n"
                "    location: 27.0.0.0rc1\n")
        for with_pyyaml in (False,) + ((True,) if collect.yaml else ()):
            with self.subTest(pyyaml=with_pyyaml), mock.patch.object(collect, "yaml", collect.yaml if with_pyyaml else None):
                info = self.releases_collector(text).data["releases"]["keystone"]["2025.1"]
                self.assertEqual(info["versions"], ["27.0.0"])
                self.assertEqual(info["markers"], ["27.0.0.0rc1"])
                self.assertEqual(info["branches"], ["stable/2025.1"])
                self.assertEqual(info["release_model"], "cycle-with-rc")


class RegistryLookups(unittest.TestCase):
    def dossier_line(self, param: dict) -> str:
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000"}
        collector.data["kolla"] = {"reference_branch": "stable/2025.1", "products": {"neutron": {
            "osism_image_parameters": [{"variable": "neutron_server_image", "default": "x", "image": "kolla/neutron-server",
                                        **param}]}}}
        self.points = collector.open_points()
        return next(line for line in section(collector.render_dossier(), 9).splitlines() if "neutron_server_image" in line)

    def test_confirmed_missing_repository_is_an_instruction(self):
        line = self.dossier_line({"error": "repository not found", "lookup_failed": False})
        self.assertIn("not in the rolling registry (do not list it in the override)", line)
        self.assertFalse(any("rolling registry could not be queried" in p for p in self.points))

    def test_failed_lookup_is_not_an_instruction(self):
        line = self.dossier_line({"error": "HTTP 503 without a token realm", "lookup_failed": True})
        self.assertIn("lookup failed", line)
        self.assertIn("verify manually", line)
        self.assertNotIn("(do not list it in the override)", line)
        self.assertTrue(any("neutron_server_image" in p for p in self.points))

    def test_override_snippet_uses_the_parameters_of_osism_defaults(self):
        """There is no glance_image: the names come from osism/defaults, not from analogy (PR #1086)."""
        parameters = [
            {"variable": "glance_tag", "default": "{{ kolla_glance_version|default(kolla_image_version) }}"},
            {"variable": "glance_api_image", "default": "{{ docker_image_url }}glance-api", "image": "kolla/glance-api",
             "rolling_tags": ["2025.1"]},
            {"variable": "glance_api_tag", "default": "{{ glance_tag }}"},
            {"variable": "glance_tls_proxy_image", "default": "{{ docker_image_url }}glance-tls-proxy",
             "image": "kolla/glance-tls-proxy", "error": "repository not found", "lookup_failed": False},
        ]
        lines = collect.override_snippet(parameters)
        self.assertTrue(lines[0].startswith('glance_tag: "<release id>"'))
        self.assertIn('glance_api_image: "registry.osism.tech/kolla/glance-api"', lines)
        self.assertEqual(len(lines), 2, "an image confirmed missing from the rolling registry is left out")
        parameters[3].update(error="HTTP 503", lookup_failed=True)
        self.assertIn("verify that this rolling image exists", collect.override_snippet(parameters)[2])
        collector = make_collector()
        collector.ossa = {"id": "OSSA-0000-000"}
        collector.data["kolla"] = {"reference_branch": "stable/2025.1",
                                   "products": {"glance": {"osism_image_parameters": parameters}}}
        rendered = section(collector.render_dossier(), 9)
        self.assertIn('  glance_api_image: "registry.osism.tech/kolla/glance-api"', rendered)
        self.assertIn("never rename a parameter", rendered)

    def test_probe_without_a_token_realm_is_a_failed_lookup(self):
        for side_effect in (collect.urllib.error.HTTPError("u", 503, "unavailable", {}, io.BytesIO()), OSError("unreachable")):
            with self.subTest(error=side_effect):
                collector = make_collector()
                with mock.patch.object(collect.urllib.request, "urlopen", side_effect=side_effect):
                    result = quiet(collector.registry_tags, "kolla/neutron-server")
                self.assertTrue(result["lookup_failed"])
                self.assertTrue(any("UNKNOWN" in w for w in collector.warnings))

    def test_repository_404_is_confirmed(self):
        collector = make_collector()
        collector._registry_auth = ("https://registry.invalid/token", "harbor-registry")
        with mock.patch.object(collector, "fetch_json", return_value={"token": "t"}), \
                mock.patch.object(collector, "fetch", return_value=None):
            self.assertEqual(collector.registry_tags("kolla/nope"), {"error": "repository not found", "lookup_failed": False})
        with mock.patch.object(collector, "fetch_json", return_value={"token": "t"}), \
                mock.patch.object(collector, "fetch", return_value=FAILED):
            self.assertTrue(quiet(collector.registry_tags, "kolla/nope")["lookup_failed"])


class PatchAttribution(unittest.TestCase):
    """The chain verified in osism/container-images-kolla: #776 renumbered what #731 introduced."""

    NEW = "patches/2025.1/keystone/0003-Include-system-scope-in-rescope-guard.patch"
    OLD = "patches/2025.1/keystone/0007-Include-system-scope-in-rescope-guard.patch"

    @staticmethod
    def commit(sha: str, subject: str) -> dict:
        return {"sha": sha, "commit": {"message": subject, "committer": {"date": "2026-08-01T00:00:00Z"}}}

    def github(self, details: dict):
        renumber = self.commit("01ae42c", "keystone: add patches for CVEs (#776)")
        added = self.commit("134fb90", "keystone: Add patches for multiple CVEs (#731)")
        lists = {self.NEW: [renumber], self.OLD: [renumber, added]}

        def fake(path: str, allow_404: bool = False):
            if "/commits?path=" in path:
                name = collect.urllib.parse.unquote(path.split("path=")[1].split("&")[0])
                return lists.get(name, [])
            return details.get(path.rsplit("/", 1)[1], FAILED)
        return fake

    def test_renames_are_followed_to_the_introducing_commit(self):
        collector = make_collector()
        details = {"01ae42c": {"files": [{"filename": self.NEW, "status": "renamed", "previous_filename": self.OLD}]},
                   "134fb90": {"files": [{"filename": self.OLD, "status": "added"}]}}
        with mock.patch.object(collector, "github_json", side_effect=self.github(details)):
            intro = collector.patch_introduction(self.NEW)
        self.assertTrue(intro["verified"])
        self.assertEqual(intro["commit"]["sha"], "134fb90")
        self.assertEqual(intro["renamed_from"], [self.OLD])

    def test_single_visible_commit_is_not_trusted_without_its_detail(self):
        collector = make_collector()
        with mock.patch.object(collector, "github_json", side_effect=self.github({})):
            intro = quiet(collector.patch_introduction, self.NEW)
        self.assertFalse(intro["verified"])
        self.assertEqual(intro["commit"]["sha"], "01ae42c")

    def test_rename_loop_stops_at_the_hop_limit(self):
        collector = make_collector()
        details = {"01ae42c": {"files": [{"filename": self.NEW, "status": "renamed", "previous_filename": self.NEW}]}}
        with mock.patch.object(collector, "github_json", side_effect=self.github(details)):
            intro = collector.patch_introduction(self.NEW)
        self.assertFalse(intro["verified"])
        self.assertIn("renames", intro["reason"])


class LocalRepository(unittest.TestCase):
    def test_exemplars_are_the_newest_by_name_not_by_mtime(self):
        with tempfile.TemporaryDirectory() as tmp:
            security = Path(tmp) / "docs" / "appendix" / "security"
            security.mkdir(parents=True)
            for name in ("ossa-2026-001.md", "ossa-2026-037.md", "ossa-2026-038.md"):
                (security / name).write_text("| Affected Project | Keystone |\nreleases 2024.1 and 2025.1\n")
            (security / "ossa-2026-001.md").write_text("touched last: 2023.1\n")
            os.utime(security / "ossa-2026-001.md", (2_000_000_000, 2_000_000_000))
            collector = make_collector()
            collector.repo_dir = Path(tmp)
            collector.ossa = {"id": "OSSA-2026-040", "products": ["keystone"]}
            quiet(collector.collect_local)
            local = collector.data["local"]
        self.assertEqual([Path(p).name for p in local["exemplars"]], ["ossa-2026-037.md", "ossa-2026-038.md"])
        self.assertEqual(local["newest_advisory"], "ossa-2026-038.md")
        self.assertEqual(local["releases_mentioned_in_newest_advisory"], ["2024.1", "2025.1"])

    def test_missing_checkout_is_detected(self):
        with tempfile.TemporaryDirectory() as tmp:
            self.assertIsNone(collect.find_repo_dir(Path(tmp)))
            (Path(tmp) / "docs" / "appendix" / "security").mkdir(parents=True)
            nested = Path(tmp) / "docs" / "guides"
            nested.mkdir()
            self.assertEqual(collect.find_repo_dir(nested), Path(tmp))


class PatchFiles(unittest.TestCase):
    PATCH = """\
From 0123456789abcdef0123456789abcdef01234567 Mon Sep 17 00:00:00 2001
From: Jane Doe <jane@example.org>
Date: Tue, 25 Aug 2026 10:00:00 +0200
Subject: [PATCH 3/7] Include system scope in rescope guard

Longer explanation.

Closes-Bug: #2100002
Related-Bug: 2100003
Change-Id: I0123456789abcdef0123456789abcdef01234567
---
 keystone/auth.py | 2 +-
"""

    def test_slugs_follow_git_format_patch(self):
        self.assertEqual(collect.slugify_subject("Include system scope in rescope guard"),
                         "include-system-scope-in-rescope-guard")
        self.assertEqual(collect.slugify_subject("Fix: a/b (c)!"), "fix-a-b-c")
        self.assertEqual(len(collect.slugify_subject("x" * 80)), 52)
        self.assertEqual(collect.patch_slug("patches/2025.1/keystone/0003-Include-system-scope-in-rescope-guard.patch"),
                         "include-system-scope-in-rescope-guard")

    def test_patch_header(self):
        info = collect.parse_patch_header(self.PATCH)
        self.assertEqual(info["subject"], "Include system scope in rescope guard")
        self.assertEqual(info["change_id"], "I0123456789abcdef0123456789abcdef01234567")
        self.assertEqual(info["bugs"], [2100002, 2100003])
        self.assertEqual(info["author"], "Jane Doe <jane@example.org>")

    def test_empty_patch(self):
        self.assertEqual(collect.parse_patch_header("")["bugs"], [])
        self.assertIsNone(collect.parse_patch_header("")["change_id"])


if __name__ == "__main__":
    unittest.main()
