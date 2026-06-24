---
sidebar_label: Releases
sidebar_position: 10
---

# Releases

## How we handle releases

Currently we do a major release about once a year. Minor releases we do when
needed, typically every couple of months.

:::warning Confirm release cadence

This guide previously stated "a major release every 6 months" and "minor
releases about every 2 weeks". Recent practice differs: the last major
releases were 7–11 months apart (8.0.0: September 2024, 9.0.0: April 2025,
10.0.0: March 2026), and the 9.x minor releases were 6–10 weeks apart.
The wording above is derived from observed practice and needs to be
confirmed as the intended cadence.

:::

In a minor release, only updates, bug fixes, etc. take place. There are also
no major upgrades of included components such as OpenStack, Keycloak or Ceph
in a minor release.

It is possible to jump from any minor version within a major version to higher
minor versions without any intervention.

Deprecations, removals, etc. take place in a major release. New mandatory
features are also added in a major release. Upgrades of the included components
can also take place during a major release (e.g. OpenStack 2024.1 -> OpenStack
2025.1).

It is possible to jump from the previous major version to the next major version.
It may be that manual intervention is necessary. For example, configuration
parameters may need to be added or services that no longer exist may need to be
removed.

## How to make a release

All component versions of a release are pinned in the
[osism/release](https://github.com/osism/release) repository. The mechanics
inside that repository — continuous version updates via Renovate, tagging the
core container image projects with `scripts/create-tags.sh`, freezing a
release with `src/create-version.py`, and changelog generation — are
documented in the
[README of the osism/release repository](https://github.com/osism/release#release-process).

The checklist below covers the overall release flow, including the steps that
happen outside the osism/release repository.

:::warning Confirm checklist

This checklist was reverse engineered from the git history of the 9.x and
10.0.0 releases. The testbed jobs are switched ahead of the documentation
steps to match the order observed for the 10.1.0 release, but the completeness
of the steps still needs to be confirmed by the people who actually made those
releases.

:::

:::note Major releases: sync the inventory first

If the release moves to a new OpenStack series, bump `KOLLA_BRANCH` in
[osism/generics](https://github.com/osism/generics)
`src/check-kolla-inventory.py` to the matching `stable/<series>` branch and
resolve the drift the `generics-tox-check-kolla` job then reports — add the
new kolla-ansible service groups to the inventory (or, for services OSISM does
not deploy, to the IGNORE lists) and merge. The inventory is baked into the
`osism-ansible` and `inventory-reconciler` images, so it must match the new
series before the release candidate is built and tested; otherwise the testing
in the steps below validates an inventory that aborts on the new release.

:::

1. Create one or more release candidates (e.g. `10.1.0-rc.1`) in the
   osism/release repository as described in its README.

2. Add temporary release candidate jobs to `.zuul.yaml` in the
   [osism/testbed](https://github.com/osism/testbed) repository that deploy
   the release candidate and upgrade from the current stable release to the
   release candidate (e.g. `abstract-testbed-deploy-rc` with
   `manager_version: 10.1.0-rc.1` and `abstract-testbed-upgrade-rc`).

3. Test. Test. Test.

4. Create the final release version (e.g. `10.1.0`) in the osism/release
   repository as described in its README.

5. Switch the pinned stable jobs in the
   [osism/testbed](https://github.com/osism/testbed) repository to the new
   release and remove the temporary release candidate jobs added in step 2.
   Do this before the documentation steps that follow: the stable jobs are
   what validate the release, so they must pass before it is announced. For
   the `10.1.0` example the version variables change as follows.

   - Deploy jobs (`abstract-testbed-deploy-stable` and
     `abstract-testbed-deploy-stable-in-a-nutshell`): set `manager_version`
     to the new release — `10.1.0`.

   - Upgrade job (`testbed-upgrade-stable-*`): a major upgrade across the
     series boundary, from the last release of the previous major series to
     the new release — `manager_version: 9.5.0`,
     `manager_version_next: 10.1.0`.

   - Update job (`testbed-update-stable-*`): a minor update within the same
     major series, from the preceding release in the series to the new
     release — `manager_version: 10.0.0`, `manager_version_next: 10.1.0`.
     The first release of a new major series has no in-series predecessor,
     so this job only becomes meaningful from the second release of a series
     onwards.

   The jobs that track the development head instead of a pinned release —
   `testbed-update-stable-current-*` (update to `latest`) and
   `testbed-upgrade-stable-next-*` (upgrade to `latest`) — are not touched
   here. All stable jobs must pass successfully.

6. Add release notes to the
   [osism/osism.github.io](https://github.com/osism/osism.github.io)
   repository: a new `docs/release-notes/osism-N.md` file for a major
   release, or a new entry in the existing file for a minor release.

7. Update the version examples in the documentation that reference a concrete
   release, e.g. `docs/guides/configuration-guide/manager.mdx`,
   `docs/guides/upgrade-guide/manager.mdx` and
   `docs/guides/configuration-guide/configuration-repository.md`.

8. As the last step, bump the `manager_version` default in the
   [osism/cfg-cookiecutter](https://github.com/osism/cfg-cookiecutter)
   repository so that newly created configuration repositories use the new
   release. The documentation promises that this default is always the latest
   stable release.

:::warning Confirm retirement of GitHub releases

Earlier releases were tagged on the osism/release repository and published as
[GitHub releases](https://github.com/osism/release/releases). This was last
done for 8.0.2 (October 2024), and the Releases section is now hidden on the
repository homepage. It needs to be confirmed that GitHub releases are
permanently retired — and documented what, if anything, replaces them as the
public release announcement.

:::

## How we write release notes

Release notes for OSISM releases are maintained as Markdown pages in the
[osism/osism.github.io](https://github.com/osism/osism.github.io) repository
(`docs/release-notes/`) and published at
[osism.tech/docs/release-notes](https://osism.tech/docs/release-notes/).

Per-component changelogs are generated from the git history in the
osism/release repository. This is documented in the
[README of the osism/release repository](https://github.com/osism/release#release-process).

:::warning Removed: Reno

This guide previously documented [Reno](https://docs.openstack.org/reno/latest/)
based release notes in the component repositories. Reno is no longer used
(e.g. osism/generics removed its release notes in
[#446](https://github.com/osism/generics/pull/446)), so that section was
removed. Please confirm that no component repository still relies on Reno.

:::
