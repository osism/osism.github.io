#!/usr/bin/env python3
"""Tests for check_images.py. Standard library only, no network.

The reference case is PR #1086: an advisory shipped `glance_image: "registry.osism.tech/kolla/glance"`,
a parameter and an image that do not exist (`glance_api_image`, `kolla/glance-api`).
"""

from __future__ import annotations

import contextlib
import io
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parent))

import check_images  # noqa: E402

# excerpt of osism/defaults all/002-images-kolla.yml
DEFAULTS = """\
---
docker_namespace: osism

##############################
# role: glance

glance_tag: "{{ kolla_glance_version|default(kolla_image_version) }}"
glance_api_image: "{{ docker_image_url }}glance-api"
glance_api_tag: "{{ glance_tag }}"
glance_tls_proxy_image: "{{ docker_image_url }}glance-tls-proxy"
glance_tls_proxy_tag: "{{ glance_tag }}"

##############################
# role: keystone

keystone_tag: "{{ kolla_keystone_version|default(kolla_image_version) }}"
keystone_image: "{{ docker_image_url }}keystone"
keystone_service_tag: "{{ keystone_tag }}"
keystone_httpd_image: "{{ docker_image_url }}httpd"
keystone_httpd_tag: "{{ keystone_tag }}"

##############################
# role: neutron

neutron_tag: "{{ kolla_neutron_version|default(kolla_image_version) }}"
neutron_server_image: "{{ docker_image_url }}neutron-server"
neutron_server_tag: "{{ neutron_tag }}"
neutron_rpc_server_image: "{{ neutron_server_image }}"
neutron_rpc_server_tag: "{{ neutron_server_tag }}"
"""

PARAMETERS = check_images.load_image_parameters(DEFAULTS)


def advisory(*lines: str, title: bool = True) -> str:
    fence = '```yaml title="environments/kolla/images.yml"' if title else "```yaml"
    return "# OSSA\n\nText.\n\n" + fence + "\n" + "\n".join(lines) + "\n```\n\nMore text.\n"


class DefaultsFile(unittest.TestCase):
    def test_images_and_aliases(self):
        self.assertEqual(PARAMETERS["images"]["glance_api_image"], "glance-api")
        self.assertEqual(PARAMETERS["images"]["keystone_httpd_image"], "httpd")
        self.assertEqual(PARAMETERS["images"]["neutron_rpc_server_image"], "neutron-server")
        self.assertNotIn("glance_image", PARAMETERS["images"])

    def test_tag_inheritance(self):
        self.assertEqual(check_images.tag_chain("glance_api_tag", PARAMETERS["tags"]), ["glance_api_tag", "glance_tag"])
        self.assertEqual(check_images.tag_chain("neutron_rpc_server_tag", PARAMETERS["tags"]),
                         ["neutron_rpc_server_tag", "neutron_server_tag", "neutron_tag"])
        self.assertEqual(check_images.tag_chain("glance_tag", PARAMETERS["tags"]), ["glance_tag"])


class Snippets(unittest.TestCase):
    def errors(self, *lines: str, title: bool = True) -> list[str]:
        return check_images.check_advisory(advisory(*lines, title=title), PARAMETERS)

    def test_the_snippet_of_pr_1086_is_rejected(self):
        errors = self.errors('glance_tag: "2025.1"  # or "2025.2", depending on your OpenStack release',
                             'glance_image: "registry.osism.tech/kolla/glance"')
        self.assertEqual(len(errors), 2)
        self.assertIn("`glance_image` is not an image parameter", errors[0])
        self.assertIn("glance_api_image", errors[0], "the error names the parameters that do exist")
        self.assertIn("line 5", errors[0])
        self.assertIn("`glance_tag` is overridden without any of the image parameters it governs", errors[1])

    def test_the_corrected_snippet_passes(self):
        self.assertEqual(self.errors('glance_tag: "2025.1"  # or "2025.2"',
                                     'glance_api_image: "registry.osism.tech/kolla/glance-api"'), [])

    def test_wrong_image_name_for_an_existing_parameter(self):
        errors = self.errors('glance_tag: "2025.1"', 'glance_api_image: "registry.osism.tech/kolla/glance"')
        self.assertEqual(len(errors), 1)
        self.assertIn("`<registry>/kolla/glance-api`", errors[0])

    def test_release_namespace_is_rejected(self):
        errors = self.errors('glance_tag: "2025.1"', 'glance_api_image: "registry.osism.tech/kolla/release/2025.1/glance-api"')
        self.assertIn("rolling image", errors[0])

    def test_mirror_registry_and_aliased_image_pass(self):
        self.assertEqual(self.errors('neutron_server_tag: "2025.1"',
                                     'neutron_server_image: "mirror.example.org/kolla/neutron-server"',
                                     'neutron_rpc_server_image: "mirror.example.org/kolla/neutron-server"',
                                     'neutron_rpc_server_tag: "2025.1"'), [])

    def test_unknown_tag_parameter(self):
        errors = self.errors('glance_registry_tag: "2025.1"')
        self.assertIn("`glance_registry_tag` is not a tag parameter", errors[0])

    def test_tag_alone_is_rejected_in_a_titled_snippet(self):
        self.assertEqual(len(self.errors('keystone_tag: "2025.1"')), 1)

    def test_image_without_its_tag_is_rejected(self):
        errors = self.errors('glance_api_image: "registry.osism.tech/kolla/glance-api"')
        self.assertIn("set without its tag", errors[0])

    def test_sidecar_image_may_be_left_out(self):
        self.assertEqual(self.errors('keystone_tag: "2025.1"', 'keystone_image: "registry.osism.tech/kolla/keystone"'), [])

    def test_untitled_blocks_are_checked_for_names_but_not_for_pairing(self):
        self.assertEqual(self.errors('keystone_tag: "2024.2"', title=False), [])
        self.assertEqual(len(self.errors('glance_image: "registry.osism.tech/kolla/glance"', title=False)), 1)

    def test_other_yaml_blocks_are_ignored(self):
        text = "```yaml\n\"onboard_network_subnets\": \"rule:context_is_admin\"\nenable_glance: \"yes\"\n```\n"
        self.assertEqual(check_images.snippets(text), [])


class CommandLine(unittest.TestCase):
    def run_main(self, *argv: str) -> tuple[int, str]:
        out = io.StringIO()
        with mock.patch.object(sys, "argv", ["check_images.py", *argv]), \
                contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
            return check_images.main(), out.getvalue()

    def test_exit_codes(self):
        with tempfile.TemporaryDirectory() as tmp:
            defaults = Path(tmp) / "defaults.yml"
            defaults.write_text(DEFAULTS)
            good, bad = Path(tmp) / "good.md", Path(tmp) / "bad.md"
            good.write_text(advisory('glance_tag: "2025.1"', 'glance_api_image: "registry.osism.tech/kolla/glance-api"'))
            bad.write_text(advisory('glance_tag: "2025.1"', 'glance_image: "registry.osism.tech/kolla/glance"'))
            self.assertEqual(self.run_main("--defaults-file", str(defaults), str(good))[0], 0)
            status, output = self.run_main("--defaults-file", str(defaults), str(good), str(bad))
            self.assertEqual(status, 1)
            self.assertIn("glance_image", output)

    def test_unverified_is_not_valid(self):
        with tempfile.TemporaryDirectory() as tmp:
            page = Path(tmp) / "page.md"
            page.write_text(advisory('glance_tag: "2025.1"'))
            status, output = self.run_main("--defaults-file", str(Path(tmp) / "missing.yml"), str(page))
            self.assertEqual(status, 2)
            self.assertIn("NOTHING was verified", output)
            empty = Path(tmp) / "empty.yml"
            empty.write_text("---\n")
            self.assertEqual(self.run_main("--defaults-file", str(empty), str(page))[0], 2)
            with mock.patch.object(check_images.urllib.request, "urlopen", side_effect=OSError("offline")):
                self.assertEqual(self.run_main(str(page))[0], 2)


if __name__ == "__main__":
    unittest.main()
