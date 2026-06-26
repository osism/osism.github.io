---
sidebar_label: Retiring OpenStack Releases
sidebar_position: 15
---

# Retiring OpenStack Releases

## Policy

We retire an OpenStack release when it is retired upstream — the version is
removed from every repository that references it. In case of a known
interest of an operator to continue running this release, we may **delay** the
removal and keep building patched images from the `<version>-eol` tag in the
meantime (see [Retiring a release](#retiring)). Retirement still happens; it is
only postponed until security support ends.

When a release is retired upstream depends on whether it is a SLURP release.
The authoritative schedule is the
[OpenStack releases](https://releases.openstack.org/) page.

## Upstream release lifecycle

Every code change described here is driven by the way upstream OpenStack moves a
release through its lifecycle:

1. **Maintained** — the release lives on the `stable/<version>` branch (for
   example `stable/2024.2`). This is what most build jobs check out.
2. **Unmaintained** — the branch is renamed to `unmaintained/<version>` (for
   example `unmaintained/2024.1`). It still exists, but upstream no longer
   guarantees maintenance.
3. **End of life (EOL)** — the branch is **deleted**. Its final state is
   preserved as the immutable `<version>-eol` tag (for example `2024.2-eol`).

Anything that referred to `stable/<version>` or `unmaintained/<version>`
**breaks** the moment upstream deletes that branch. That broken build is
usually the first visible sign that a release has reached EOL.

### SLURP vs. non-SLURP

SLURP (Skip-Level Upgrade Release Process) releases are maintained for longer
than the non-SLURP releases in between them. As a result two adjacent releases
can be in different phases at the same time. For example:

- `2024.1` (SLURP) — still alive, in the `unmaintained/2024.1` phase.
- `2024.2` (non-SLURP) — already EOL; `stable/2024.2` is gone, only the
  `2024.2-eol` tag remains.

This is why a non-SLURP release is typically the first one you need to retire,
while the older SLURP release next to it is still being built.

## Retiring a release {#retiring}

Retirement always ends the same way: the version is removed from every
repository that references it. The only open question is *when*. Work through
this once the release reaches EOL upstream:

1. **The trigger.** Upstream deletes `stable/<version>`, so every build that
   checked it out fails. That broken build is usually the first sign the
   release has reached EOL.
2. **Do we know any operators running this version that still need security updates?**
   - **No** — remove the version now. Go straight to [Removing the
     version](#removing).
   - **Yes** — we cannot remove it yet, because we still need to ship security
     updates. First [keep the affected images building from the `<version>-eol`
     tag](#keep-building) as a stopgap, then defer the removal until security
     support ends or all operators have upgraded to a maintained release version.

Either way the destination is the same removal work; the security-update case
just puts a bridge in front of it.

## Keep building during security support {#keep-building}

This step applies only while we still ship security updates for an EOL release.
The affected build and push jobs stay in place; the only change is the source:
the deleted `stable/<version>` branch is replaced by the `<version>-eol` tag.
Add an explicit branch for the retired version rather than changing the
default, so other versions keep using `stable/`.

### Which repositories keep building

This is not every repository that references the release. The question is: what
is actually required to deliver a security update to a site that is *already
running* the EOL release? Only those keep building; everything else is removed
now as usual (see [Removing the version](#removing)).

- `container-images-kolla` builds the OpenStack service images (nova, neutron,
  cinder, …) — the patched code itself. `container-image-kolla-ansible` builds
  the tool that deploys and updates those images. Together they are the delivery
  vehicle for a fix, so they keep building from the `<version>-eol` tag.
- The derived images in `container-images` that build on top of the kolla
  images (`keystone-shib`, `cinder-volume-extra`, `cinder-volume-huawei`)
  follow the same decision: they keep building only if a supported site
  actually deploys them; otherwise their matrix entry is removed now. The
  `openstackclient` image in the same repository is not part of the delivery
  vehicle and is removed now.
- `cfg-cookiecutter` only scaffolds a *new* configuration repository. An existing
  site generated its configuration once and never re-runs cookiecutter for a
  patch, so it is removed now.
- `openstack-octavia-amphora-image` builds the Octavia amphora appliance image.
  Removing it means no fresh amphora builds for the EOL release — a deliberate
  scope decision that amphora-level rebuilds are not part of the EOL
  security-update commitment.

The rule of thumb: keep the repositories that carry patched OpenStack code to a
running site; remove the ones only needed to *stand up* a new deployment, which
should not happen after EOL.

:::note Re-evaluate this split for each release
The split above reflects how 2024.2 was handled, where
`container-images-kolla` and `container-image-kolla-ansible` received the
`-eol` build fix while `cfg-cookiecutter` and `openstack-octavia-amphora-image`
were removed. If a future release needs amphora security updates for a
site, `openstack-octavia-amphora-image` would have to keep building too —
re-evaluate the list against the actual support commitment for the release
being retired.
:::

`container-images-kolla` — `scripts/001-prepare.sh`
([#728](https://github.com/osism/container-images-kolla/pull/728)):

```bash
if [[ "$OPENSTACK_VERSION" == "2024.1" ]]; then
    git checkout origin/unmaintained/$OPENSTACK_VERSION
elif [[ "$OPENSTACK_VERSION" == "2024.2" ]]; then
    git checkout 2024.2-eol
else
    git checkout origin/stable/$OPENSTACK_VERSION
fi
```

`container-image-kolla-ansible` — `Containerfile`
([#909](https://github.com/osism/container-image-kolla-ansible/pull/909)):

```bash
if [ "$OPENSTACK_VERSION" = "master" ]; then
  git clone https://github.com/openstack/kolla-ansible /repository
elif [ "$OPENSTACK_VERSION" = "2024.2" ]; then
  git clone -b 2024.2-eol https://github.com/openstack/kolla-ansible /repository
else
  git clone -b stable/$OPENSTACK_VERSION https://github.com/openstack/kolla-ansible /repository
fi
```

The same pattern applies to any other build that checks out a per-version
branch: point the retired version at its `<version>-eol` tag instead of
`stable/<version>`.

The intermediate `unmaintained/<version>` phase (the `2024.1` line above) is
handled the same way — point at `origin/unmaintained/<version>` while the
branch still exists, then switch to the `<version>-eol` tag once it is deleted.

### Defer the removal

Keeping the images building is a stopgap, not the end state. Prepare the
removal changes (see [Removing the version](#removing)) for these build
repositories anyway, open them as pull requests, and **hold them open** until
we no longer ship security updates for the release. When that window closes,
merge the held PRs to complete the retirement. Keeping the removal PRs open
(rather than only filing an issue) makes the pending work visible and ready to
merge.

For example, while 2024.2 stays on the `-eol` tag, the removal PRs
[container-images-kolla #726](https://github.com/osism/container-images-kolla/pull/726)
and
[container-image-kolla-ansible #908](https://github.com/osism/container-image-kolla-ansible/pull/908)
remain open and are merged once 2024.2 can be fully retired and removed.

## Removing the version {#removing}

This is the end state of every retirement, reached either immediately or after
the security-update bridge above. Remove the version from every repository that
carries a per-version reference to it. The repositories below encode
per-OpenStack-version build matrices; use the linked changes as examples.

| Repository                        | What to change                                                                                                                                                                                                                                                                                                                                                                                                             | Example                                                                            |
|:----------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------|
| `cfg-cookiecutter`                | Remove the per-version tox job (e.g. `cfg-cookiecutter-tox-2024.2`) from `.zuul.yaml` and its entry in the check pipeline.                                                                                                                                                                                                                                                                                                 | [#843](https://github.com/osism/cfg-cookiecutter/pull/843) (2024.2)                |
| `openstack-octavia-amphora-image` | Drop the per-version build jobs from `.zuul.yaml`, the version rows in `README.md`, and the version block in `playbooks/cleanup.yml`.                                                                                                                                                                                                                                                                                      | [#142](https://github.com/osism/openstack-octavia-amphora-image/pull/142) (2024.2) |
| `container-images-kolla`          | Remove the per-version build branch in `.zuul.yaml` and the matching `elif` in `scripts/001-prepare.sh`.                                                                                                                                                                                                                                                                                                                   | [#573](https://github.com/osism/container-images-kolla/pull/573) (2023.2)          |
| `container-image-kolla-ansible`   | Remove the per-version build/push jobs in `.zuul.yaml` and the matching `elif` in the `Containerfile`.                                                                                                                                                                                                                                                                                                                     | [#745](https://github.com/osism/container-image-kolla-ansible/pull/745) (2023.2)   |
| `container-images`                | Remove the version from the `matrix` in the per-version GitHub Actions workflows (not Zuul) under `.github/workflows/`: `build-openstackclient-container-image.yml`, `build-keystone-shib-container-image.yml`, `build-cinder-volume-extra-image.yml`, `build-cinder-volume-huawei-image.yml`. These builds do not fail at EOL — the requirements tarball outlives the deleted branch — so remove the entries proactively. | [#560](https://github.com/osism/container-images/pull/560) (2023.1)                |
| `metalbox`                        | Remove `zuul/vars/container-images-openstack-<version>.yml`, the per-image entries in `zuul/vars/container-images-metalbox.yml`, the version from the `openstack_versions` default in `zuul/mirror-octavia-image.yml`, and any `.zuul.yaml` jobs.                                                                                                                                                                          | (no prior precedent — see note)                                                    |
| `testbed`                         | No per-version matrix; verify that no version lane in `.zuul.yaml` still targets the retired release. If release upgrades are done right, the lanes have already moved forward as part of normal release preparation (see [Version pointers that move forward](#forward-pointers)).                                                                                                                                        | (verification only)                                                                |

For builds that we kept on the `<version>-eol` tag during security support
(see [Keep building during security support](#keep-building)), removal means
deleting those build/push jobs and the `elif` branch that selected the
`-eol` tag.

:::note metalbox has no precedent
`metalbox` has not had a release retired before, so there is no prior change to
copy. Decide whether to **delete** the version vars files or **keep** them as
historical references; if in doubt, delete, to match how the other
repositories drop a retired version.
:::

## Version pointers that move forward (not retirement) {#forward-pointers}

Several repositories carry a *single* "current" OpenStack version that advances
as part of normal release work rather than retirement cleanup. They do not hold
a per-version matrix, so there is no version to "remove" from them — the
reference is simply moved forward to the next release. They are listed here so
they are not mistaken for retirement targets:

- `testbed` — `openstack_version` / `openstack_version_next` in `.zuul.yaml`,
  defaults in `config/scripts/*.sh`, and per-version conditionals in the deploy
  scripts.
- `release` — the per-version release manifests
  (`release/latest/openstack-<version>.yml`) and the per-component
  `origin/stable/<version>` map in `src/git-diff-log.py`.
- `defaults` — version-conditional image selection (e.g. in
  `all/002-images-kolla.yml`).
- `ansible-collection-services` — `openstackclient_version` in
  `roles/openstackclient/defaults/main.yml`.
- `openstack-ironic-images` — `DIB_REPOREF_*: origin/stable/<version>` in
  `files/osism-ipa.yml`.
- `zuul-jobs` — `devstack_release: stable/<version>` in
  `roles/devstack/defaults/main.yml`.
- `container-images` — `openstackclient/Containerfile` fetches
  `requirements-stable-<version>.tar.gz`.

:::caution
Some of these pins use `stable/<version>` directly. If such a pin is left
pointing at a version that reaches EOL, it breaks the same way a retired build
job does, because the upstream branch is deleted. Advance these pins to a
maintained release in good time; if one must keep targeting an EOL release,
point it at the `<version>-eol` tag as in [Keep building during security
support](#keep-building).
:::

## Tracking the work

Track each retirement in an [osism/issues](https://github.com/osism/issues/issues)
issue that lists the affected repositories as a checklist, so the work can be
followed across repositories. The repository list in this guide is a starting
point — adapt it as appropriate for the release being retired, since the set of
repositories that still reference a given version changes over time. Search the
repositories for the version string to confirm which ones are actually
affected.

[#1367](https://github.com/osism/issues/issues/1367) (Retire OpenStack 2024.2
Dalmatian) is an example of such a tracking issue. Treat it as an illustration
rather than a definitive checklist: verify its list against the current state
of the repositories before relying on it.
