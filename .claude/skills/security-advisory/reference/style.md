# Style and content rules for OSISM security advisories

Distilled from the advisories in `docs/appendix/security/`. When in doubt, imitate the two newest
files there; they are the canonical examples.

## File and page

- File: `docs/appendix/security/ossa-YYYY-NNN.md` (lower case). Front matter only contains
  `sidebar_label: OSSA-YYYY-NNN`.
- H1: `# OSSA-YYYY-NNN: <Title>`. Use the OSSA title; reword only to make it more specific
  (for example add the mechanism: "… via pool scheduling").
- Wrap prose at about 100 characters. Tables are formatted with `markdown-table-formatter`
  (left-aligned columns, `|:---|`). Admonitions use Docusaurus syntax (`:::warning`, `:::info`).
- Links to other docs are relative (`../../release-notes/`). External links are absolute.
- Language: English, precise, no marketing. Write for an operator who runs OSISM and needs to
  decide within minutes whether to act.

## Property table (first table under the H1)

| Property         | Rule                                                                                                                                                                                                                             |
|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date             | The `date` of the OSSA document (not the day the page is written). With errata: `2026-01-15 (Errata: 2026-01-16)`.                                                                                                               |
| CVE              | Linked ids `[CVE-…](https://www.cve.org/CVERecord?id=CVE-…)`, comma separated. Four or more ids: plain ids in the cell, links only in References. Not assigned yet: `CVE pending (requested from MITRE)`.                        |
| Severity         | CVSS base severity from the CVE record when it contains one (`High`, `Medium`, …). Otherwise OSISM's assessment; then the Summary must contain the sentence below. A qualifier is allowed: `High (multi-pool deployments only)`. |
| Affected Project | Project name without "OpenStack": `Keystone`, `Nova`, `Neutron`, `Designate`, `keystonemiddleware`.                                                                                                                              |
| Reporter         | `Name (Affiliation)`, comma separated, in the order of the OSSA.                                                                                                                                                                 |

Standard sentence when no CVSS exists (put it in the Summary):

> Upstream has not published a CVSS score for this issue. The severity rating above is OSISM's
> assessment: …

## Section order (mandatory, same headings)

1. `## Summary`
2. `## Affected Versions`
3. `## Impact on OSISM` with `### How to Check if You Are Affected` and `####` sub-steps
4. `## Vulnerability Details` (`### CVE-… — Title` subsections when there are several CVEs;
   `### Prerequisite Changes` when the fix consists of several dependent patches)
5. `## Remediation` with `### For OSISM Releases` and `### Mitigation`
6. `## References`

## Summary

- One to three paragraphs: what is wrong, where (API/endpoint/service), who can exploit it
  (role, prerequisites), what the attacker gains.
- Name the reporters in prose when several independent reports exist ("X of Y reported that …").
- Always end with one bold sentence about scope, one of:
  - `**Every OSISM deployment running an unpatched <Project> version is affected.**`
  - `**Only deployments using <feature> are affected.**`
  - `**This vulnerability only affects OSISM deployments that <condition>.** Standard OSISM
    deployments … are **not affected**.`

## Affected Versions

- Quote the upstream ranges verbatim in a sentence: ``The upstream advisory states the affected
  ranges as `>=14.0.0 <26.0.6`, `>=27.0.0 <27.0.4` and `>=28.0.0 <28.0.2` …``. Derive the fixed
  versions from the upper bounds (`<26.0.6` → fixed in 26.0.6). `==X.Y.Z` means only that version is
  vulnerable and the fix is the next point release.
- Choose one table variant:
  - **A — OSISM fix exists** (preferred): `OpenStack Release | Upstream Status | Fix in OSISM Images`
  - **B — nothing fixed upstream yet**: `OpenStack Release | Latest Released <Project> Version | Upstream Status`
  - **C — simple upstream-only case**: `<Project> Version | Status` with `Vulnerable`/`Fixed` rows
- Release naming in tables: `Caracal (2024.1)`, `Dalmatian (2024.2)`, `Epoxy (2025.1)`,
  `Flamingo (2025.2)`, `Gazpacho (2026.1)`, `Hibiscus (2026.2, dev)`. In prose: `2025.1 (Epoxy)`.
- Status phrases (reuse verbatim):
  - `Unmaintained, no upstream fix`
  - `End of life since YYYY-MM-DD, no fix`
  - `Fixed in <Project> X.Y.Z`
  - `Fix merged on master`
  - `Vulnerable — fix proposed (X.Y.Z), not yet merged`
  - `Vulnerable — end of maintenance, no upstream fix`
  - `Community-curated backport ([PR #N](https://github.com/osism/container-images-kolla/pull/N))`
  - ``Upstream fix via `stable/2025.1` branch``
  - `Community-curated backport in preparation` / `Patched image in preparation` (only after the
    author confirmed it)
  - `Not shipped by OSISM yet`
- After the table: one paragraph on unmaintained/EOL releases ("neither will receive an official
  fixed release"), one on how OSISM covers them ("community-curated backports, shipped as downstream
  patches in the <Project> container images"), one on releases built from the upstream stable branch
  ("Rebuilt images include the fix without additional downstream patches"), and a closing sentence
  such as `Patched container images are available for all supported OpenStack releases.` when true.

### Which OpenStack releases to list

- List **every OpenStack release OSISM builds images for** (dossier section 8, "Built OpenStack
  releases", from the oldest release the newest existing advisory still lists upward), plus the
  newest upstream release and the development series with their upstream status
  (`Not shipped by OSISM yet` when OSISM has no images for them).
- OSISM officially supports only the SLURP releases of its Maintained/Extended Maintenance releases
  (`docs/concepts/release-cadence.md`, `docs/release-notes/index.md`), but ships security fixes for
  the intermediate `YYYY.2` releases as well. Treat 2024.2, 2025.2, … exactly like the supported
  releases: list them and state their fix status.
- **A release without a fix is never guessed.** When the dossier shows no OSISM patch and no merged
  upstream fix for a listed release (coverage column "Covered = no"), ask the author about the
  status before writing (typical answers: backport in preparation, will be shipped with the next
  image rebuild, will not be fixed). Record the answer in the table (`Community-curated backport in
  preparation`, `Patched image in preparation`) and in the Remediation section ("A fix for
  2024.2 (Dalmatian) is in preparation and will be announced in an update of this advisory."), and
  mention it in the report to the author so the page is updated once the fix ships.
- Say "community-curated backport" only for patches OSISM carries for series that get no official
  upstream release (unmaintained/EOL). For a still unmerged upstream fix that OSISM ships early, say
  "the images carry the proposed upstream patch ahead of its official upstream release".

## Impact on OSISM

- First state whether a default OSISM deployment is affected and why (default configuration,
  optional service via `enable_<service>` in `environments/kolla/configuration.yml`, default policy,
  default backend). The upstream advisory scopes the issue; OSISM-specific conclusions must be
  marked as such ("… is OSISM's own assessment of the affected code path").
- `### How to Check if You Are Affected` contains one `####` step per check, each with a bash block
  and a one-sentence interpretation ("No output means … not affected"). Typical checks:
  - service deployed: `docker ps --format '{{.Names}}' | grep ^<service>`
  - running version: `docker exec <container> pip show <project> | grep ^Version`
  - configuration: `docker exec <container> grep <option> /etc/<service>/<service>.conf`
  - configuration repository: `grep -r "<option>" environments/kolla/ inventory/`
  - API/extension/resources: `openstack --os-cloud admin … -f value -c …`
- Use the kolla container names (`keystone`, `nova_api`, `neutron_server`, `designate_central`,
  `glance_api`, `cinder_api`, `horizon`, …) and the paths inside the containers.
- When the running version check cannot distinguish a patched OSISM image from an unpatched one,
  say so: "… unless you have deployed an OSISM container image that includes the backported fix
  (see Remediation)".

## Vulnerability Details

- Explain root cause → exploitation → what the fix does, naming functions and files from the
  upstream patch (`NeutronDbPluginV2.onboard_network_subnets()` in `neutron/db/db_base_plugin_v2.py`).
  Read the actual diff; do not paraphrase the OSSA description only.
- Quote a short, decisive code fragment of the fix when it makes the change clearer.
- Several CVEs → one `### CVE-… — Title` subsection each, in the order of the OSSA.
- Several dependent patches → `### Prerequisite Changes` with a numbered list
  (`**Subject** ([Bug #N](https://bugs.launchpad.net/<project>/+bug/N)) — what it does`).
- Behavior changes for operators (new config options, stricter defaults) go into a `:::warning`
  admonition. Quote new options with their section: `` `[auth] additional_primary_auth_methods` ``.

## Remediation

`### For OSISM Releases`:

- OSISM fix reference (when patch files exist):
  ```markdown
  - [container-images-kolla commit abc1234](https://github.com/osism/container-images-kolla/commit/<full sha>)
    ([PR #N](https://github.com/osism/container-images-kolla/pull/N))
  ```
  Use the PR's merge commit (`merge_commit_sha`), 7 characters in the link text, the full sha in
  the URL. State which releases the change covers.
- Releases built from the upstream stable branch: "the container images build <Project> from the
  upstream stable branches, which contain the fix as of <Project> X.Y.Z. Rebuilt images include the
  fix automatically."
- Standard sentence: `A fix will be included in upcoming OSISM releases that ship the patched
  <Project> container images. Consult the [OSISM Release Notes](../../release-notes/) for version
  information and availability.`
- Name the service(s) whose images contain the affected code and give the rolling-image override
  in `environments/kolla/images.yml`. A stable OSISM release pulls the Kolla images from the
  `kolla/release/<openstack_version>` namespace with pinned version tags (`docker_namespace` in
  `environments/kolla/configuration.yml`); the rolling images live in the `kolla` namespace. The
  snippet therefore always overrides the `*_tag` **and every `<service>*_image` parameter** of the
  affected images with the rolling namespace — a tag override alone points at an image that does
  not exist. Take the parameter names from dossier section 9 (they come from
  [osism/defaults all/002-images-kolla.yml](https://github.com/osism/defaults/blob/main/all/002-images-kolla.yml))
  and list only images that exist in the rolling registry (also shown in section 9):
  ```yaml title="environments/kolla/images.yml"
  neutron_server_tag: "2025.1"  # or "2024.1", "2024.2", "2025.2", depending on your OpenStack release
  neutron_server_image: "registry.osism.tech/kolla/neutron-server"
  ```
  Add the sentence "Replace `registry.osism.tech` if you pull the images from a mirror." Prefer the
  most specific variables when only one service is affected and say which images do not need an
  update; use the umbrella tag (`designate_tag`) plus all `designate_*_image` parameters when
  several services are affected. Sidecar images whose tag follows the umbrella tag but that contain
  no project code (for example `keystone_httpd_*`) must keep their deployed tag — say so.
  Libraries (keystonemiddleware, oslo.*) land in every image that installs them — say which images
  matter for OSISM.

`### Mitigation`:

- Start with whether default deployments need to act at all ("Deployments with a single pool — the
  OSISM default — are not exploitable; updating the images at the next regular maintenance is
  sufficient.").
- Then a numbered list of interim measures: policy overrides in
  `/etc/kolla/config/<service>/policy.yaml`, configuration changes, audits with concrete commands,
  monitoring of specific log lines/API calls, restricting API access.
- When there is no mitigation: "applying the patched container image is the only effective
  remediation" followed by the list of what to monitor/audit meanwhile.

## References (fixed order, one bullet each)

1. `[OSSA-YYYY-NNN Advisory](https://security.openstack.org/ossa/OSSA-YYYY-NNN.html)` — while the
   page is not published yet use `[OpenDev Review (OSSA-YYYY-NNN Advisory)](https://review.opendev.org/c/openstack/ossa/+/<number>)`
2. `[OSISM Fix (container-images-kolla commit abc1234)](…/commit/<full sha>)`
3. `[OSISM Fix (container-images-kolla PR #N)](…/pull/N)`
4. `[OpenDev Review (Fix - <Series>)](https://review.opendev.org/<number>)` per series, newest
   series first (Hibiscus, Gazpacho, Flamingo, Epoxy, …). Unmerged: `(Proposed Fix - <Series>)`.
   Several patches per series: `(Fix 1/2 - <Series>)`.
5. `[Launchpad Bug #N](https://bugs.launchpad.net/<project>/+bug/N)` per bug
6. `[CVE-…](https://www.cve.org/CVERecord?id=CVE-…)` per CVE
7. Optional: oss-security announcement, upstream documentation

## Index entry (`docs/appendix/security/index.md`)

Add one row to the OSSA table, sorted by advisory id:

```markdown
| [OSSA-2026-037](ossa-2026-037.md) | Inconsistent scope enforcement for delegated tokens | OpenStack Keystone |
```

The description is a short noun phrase (aim for ≤ 55 characters, no trailing period); the
component is `OpenStack <Project>`. Re-run `markdown-table-formatter` on the index afterwards.

## Need-to-know principle

Only write about issues that are public: the OSSA change is merged or the Launchpad bugs are
*Public Security*. If a bug is still private, stop and tell the author. Never include exploit
payloads beyond what the upstream advisory and the public fix already disclose.

## Commit message

Follow the existing history (`git log -- docs/appendix/security`):

```text
Add OSSA-2026-037 security advisory for Keystone

Document <one-paragraph summary of the issue, CVE ids, who is affected>.

<One paragraph on the OSISM side: default deployments affected or not,
which releases got which fix (upstream stable branch vs. community-curated
backport, container-images-kolla PR #N), which image tag to override.>

Assisted-by: Claude:<model id, e.g. claude-fable-5>
Signed-off-by: <git user.name> <<git user.email>>
```

Never use `Co-Authored-By:`. Do not commit unless the author asked for it.
