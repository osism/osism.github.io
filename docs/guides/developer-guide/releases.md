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
10.0.0 releases. The order and completeness of the steps need to be confirmed
by the people who actually made those releases.

:::

1. Create one or more release candidates (e.g. `10.0.0-rc.1`) in the
   osism/release repository as described in its README.

2. Add temporary release candidate jobs to `.zuul.yaml` in the
   [osism/testbed](https://github.com/osism/testbed) repository that deploy
   the release candidate and upgrade from the current stable release to the
   release candidate (e.g. `abstract-testbed-deploy-rc` with
   `manager_version: 10.0.0-rc.1` and `abstract-testbed-upgrade-rc`).

3. Test. Test. Test.

4. Create the final release version (e.g. `10.0.0`) in the osism/release
   repository as described in its README.

5. Add release notes to the
   [osism/osism.github.io](https://github.com/osism/osism.github.io)
   repository: a new `docs/release-notes/osism-N.md` file for a major
   release, or a new entry in the existing file for a minor release.

6. Update the version examples in the documentation that reference a concrete
   release, e.g. `docs/guides/configuration-guide/manager.mdx`,
   `docs/guides/upgrade-guide/manager.mdx` and
   `docs/guides/configuration-guide/configuration-repository.md`.

7. Bump the `manager_version` default in the
   [osism/cfg-cookiecutter](https://github.com/osism/cfg-cookiecutter)
   repository so that newly created configuration repositories use the new
   release. The documentation promises that this default is always the latest
   stable release.

8. As the last step, finalize the release in the osism/testbed repository:
   remove the temporary release candidate jobs and switch the stable jobs
   (`abstract-testbed-deploy-stable`, `testbed-update-stable-*`,
   `testbed-upgrade-stable-*`) to the new release. All stable jobs must pass
   successfully.

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
