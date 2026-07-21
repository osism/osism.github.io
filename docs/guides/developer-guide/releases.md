---
sidebar_label: Releases
sidebar_position: 10
---

# Releases

## How we handle releases

We do one major release per year, anchored on the SLURP (`YYYY.1`) OpenStack
release and cut about one month after the matching Kolla release. Minor releases
we do when needed and about every 6 to 8 weeks. See the
[Release Cadence](../../concepts/release-cadence.md) concept for the full
cadence and support lifecycle.

In a minor release, only updates, bug fixes, and security fixes take place. The
OpenStack version is not upgraded in a minor release; it is tied to the major
release. Kubernetes (managed with Gardener) and Ceph (managed with cephadm) are
exceptions — they are not bound to the OSISM major release and can be updated
independently of it.

It is possible to jump from any minor version within a major version to higher
minor versions without any intervention.

Deprecations, removals, etc. take place in a major release. New mandatory
features are also added in a major release. The upgrade of the OpenStack release
also happens during a major release (e.g. OpenStack 2025.1 -> OpenStack 2026.1).

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

## How we write release notes

Release notes for OSISM releases are maintained as Markdown pages in the
[osism/osism.github.io](https://github.com/osism/osism.github.io) repository
(`docs/release-notes/`) and published at
[osism.tech/docs/release-notes](https://osism.tech/docs/release-notes/).

Per-component changelogs are generated from the git history in the
osism/release repository. This is documented in the
[README of the osism/release repository](https://github.com/osism/release#release-process).
