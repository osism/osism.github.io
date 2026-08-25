# Advisory template

Copy the skeleton below into `docs/appendix/security/ossa-yyyy-nnn.md` and replace every
`{{PLACEHOLDER}}`. Delete optional blocks that do not apply. The finished file must not contain
`{{` anymore. Section headings, their order and the property table rows are fixed (see
[style.md](style.md)).

````markdown
---
sidebar_label: OSSA-{{YYYY}}-{{NNN}}
---

# OSSA-{{YYYY}}-{{NNN}}: {{TITLE}}

| Property         | Value                                                     |
|:-----------------|:----------------------------------------------------------|
| Date             | {{OSSA_DATE}}                                             |
| CVE              | [CVE-{{ID}}](https://www.cve.org/CVERecord?id=CVE-{{ID}}) |
| Severity         | {{SEVERITY}}                                              |
| Affected Project | {{PROJECT}}                                               |
| Reporter         | {{REPORTER_NAME}} ({{REPORTER_AFFILIATION}})              |

## Summary

{{WHAT_IS_WRONG_WHERE_AND_WHO_CAN_EXPLOIT_IT — one to three paragraphs}}

{{OPTIONAL: Upstream has not published a CVSS score for this issue. The severity rating above is
OSISM's assessment: …}}

**{{SCOPE_SENTENCE — every deployment affected / only deployments using X affected}}**

## Affected Versions

The upstream advisory states the affected ranges as `{{RANGE_1}}`, `{{RANGE_2}}` and `{{RANGE_3}}`,
so the fixes are expected in / are contained in {{PROJECT}} {{FIXED_VERSIONS_WITH_SERIES}}.

{{OPTIONAL: **At the time of this advisory there is no fixed {{PROJECT}} release available upstream
for any series.** The upstream fixes are still under review on OpenDev and have not merged yet.}}

| OpenStack Release      | Upstream Status                    | Fix in OSISM Images                                                                                  |
|:-----------------------|:-----------------------------------|:-----------------------------------------------------------------------------------------------------|
| Caracal (2024.1)       | Unmaintained, no upstream fix      | Community-curated backport ([PR #{{N}}](https://github.com/osism/container-images-kolla/pull/{{N}})) |
| Dalmatian (2024.2)     | End of life since {{DATE}}, no fix | Community-curated backport ([PR #{{N}}](https://github.com/osism/container-images-kolla/pull/{{N}})) |
| Epoxy (2025.1)         | Fixed in {{PROJECT}} {{X.Y.Z}}     | Upstream fix via `stable/2025.1` branch                                                              |
| Flamingo (2025.2)      | Fixed in {{PROJECT}} {{X.Y.Z}}     | Upstream fix via `stable/2025.2` branch                                                              |
| Gazpacho (2026.1)      | Fixed in {{PROJECT}} {{X.Y.Z}}     | Not shipped by OSISM yet                                                                             |
| Hibiscus (2026.2, dev) | Fix merged on master               | Not shipped by OSISM yet                                                                             |

{{PARAGRAPH: unmaintained / EOL releases receive no official fixed release; OSISM provides
community-curated backports as downstream patches in the {{PROJECT}} container images.}}

{{PARAGRAPH: releases built from the upstream stable branches contain the fix as of {{PROJECT}}
{{X.Y.Z}}; rebuilt images include the fix without additional downstream patches.}}

{{CLOSING_SENTENCE: Patched container images are available for all supported OpenStack releases.}}

## Impact on OSISM

{{DEFAULT_DEPLOYMENT_STATEMENT — is the service/feature enabled by default (`enable_{{service}}` in
`environments/kolla/configuration.yml`), which configuration makes a deployment exploitable, what
is OSISM's own assessment beyond the upstream scope.}}

### How to Check if You Are Affected

#### Check the Running {{PROJECT}} Version

```bash
docker exec {{CONTAINER}} pip show {{project}} | grep ^Version
```

If the version is below the fixed version for your release (see the table above) and you have not
deployed an OSISM container image that includes the fix, your deployment is **affected**.

#### {{FURTHER_CHECK — configuration, deployed service, API extension, resources}}

```bash
{{COMMAND}}
```

{{INTERPRETATION — "No output means … not affected." / "A match confirms …"}}

## Vulnerability Details

{{ROOT_CAUSE → EXPLOITATION → FIX, naming the functions/files changed by the upstream patch. One
`### CVE-… — Title` subsection per CVE when there are several.}}

{{OPTIONAL:
### Prerequisite Changes

The upstream fix consists of {{N}} changes that OSISM ships together in the patched images:

1. **{{SUBJECT}}** ([Bug #{{N}}](https://bugs.launchpad.net/{{project}}/+bug/{{N}})) — {{WHAT_IT_DOES}}
}}

{{OPTIONAL:
:::warning

{{BEHAVIOR_CHANGE for operators — new options, stricter defaults, what to configure before/after.}}

:::
}}

## Remediation

### For OSISM Releases

{{WHY — no upstream fix for X, therefore OSISM provides the fix as downstream patches for the
{{PROJECT}} container images via the following change:}}

- [container-images-kolla commit {{SHA7}}](https://github.com/osism/container-images-kolla/commit/{{FULL_SHA}})
  ([PR #{{N}}](https://github.com/osism/container-images-kolla/pull/{{N}}))

{{WHICH RELEASES the change covers; which releases get the fix through the upstream stable branch.}}

A fix will be included in upcoming OSISM releases that ship the patched {{PROJECT}} container
images. Consult the [OSISM Release Notes](../../release-notes/) for version information and
availability.

The affected code runs in the `{{SERVICE}}` service{{S}}. Using rolling tags, {{override the
`{{image}}` container image / override all {{PROJECT}} container images}} in
`environments/kolla/images.yml`. With a stable OSISM release the Kolla images are pulled from the
`kolla/release/<openstack_version>` namespace with pinned version tags (`docker_namespace` in
`environments/kolla/configuration.yml`), whereas the rolling images live in the `kolla` namespace.
The image parameters therefore have to be overridden together with the tag; the tag override alone
would point at an image that does not exist:

```yaml title="environments/kolla/images.yml"
{{TAG_VARIABLE}}: "2025.1"  # or "2024.1", "2024.2", "2025.2", depending on your OpenStack release
{{IMAGE_VARIABLE}}: "registry.osism.tech/kolla/{{IMAGE_NAME}}"
```

Replace `registry.osism.tech` if you pull the images from a mirror. {{OPTIONAL: sidecar images whose
tag follows the umbrella tag but contain no project code, and which tag to pin for them.}}

{{OPTIONAL: The {{OTHER}} images do not contain the affected code and do not need to be updated
for this issue.}}

### Mitigation

{{WHETHER DEFAULT DEPLOYMENTS NEED TO ACT; then interim measures:}}

1. {{POLICY_OVERRIDE / CONFIGURATION_CHANGE with file path and snippet}}
2. {{AUDIT with a concrete command}}
3. {{MONITORING of specific log lines or API calls}}

## References

- [OSSA-{{YYYY}}-{{NNN}} Advisory](https://security.openstack.org/ossa/OSSA-{{YYYY}}-{{NNN}}.html)
- [OSISM Fix (container-images-kolla commit {{SHA7}})](https://github.com/osism/container-images-kolla/commit/{{FULL_SHA}})
- [OSISM Fix (container-images-kolla PR #{{N}})](https://github.com/osism/container-images-kolla/pull/{{N}})
- [OpenDev Review (Fix - Hibiscus)](https://review.opendev.org/{{NUMBER}})
- [OpenDev Review (Fix - Gazpacho)](https://review.opendev.org/{{NUMBER}})
- [OpenDev Review (Fix - Flamingo)](https://review.opendev.org/{{NUMBER}})
- [OpenDev Review (Fix - Epoxy)](https://review.opendev.org/{{NUMBER}})
- [Launchpad Bug #{{N}}](https://bugs.launchpad.net/{{project}}/+bug/{{N}})
- [CVE-{{ID}}](https://www.cve.org/CVERecord?id=CVE-{{ID}})
````

## Index row for `docs/appendix/security/index.md`

```markdown
| [OSSA-{{YYYY}}-{{NNN}}](ossa-{{yyyy}}-{{nnn}}.md) | {{SHORT_DESCRIPTION ≤ 55 chars}} | OpenStack {{PROJECT}} |
```
