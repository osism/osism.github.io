---
sidebar_label: Releases
sidebar_position: 10
---

# Releases

## How we handle releases

Currently we do a major release every 6 months. Minor releases we do when
needed and about every 2 weeks.

In a minor release, only updates, bug fixes, etc. take place. There are also
no major upgrades of included components such as OpenStack, Keycloak or Ceph
in a minor release.

It is possible to jump from any minor version within a major version to higher
minor versions without any intervention.

Deprecations, removals, etc. take place in a major release. New mandatory
features are also added in a major release. Upgrades of the included components
can also take place during a major release (e.g. OpenStack Xena -> OpenStack Yoga).

It is possible to jump from the previous major version to the next major version.
It may be that manual intervention is necessary. For example, configuration
parameters may need to be added or services that no longer exist may need to be
removed.

## How to make a release

1. On all repositories that are used, check that the versions to be used have an
   appropriate version tag (e.g. `v0.20230308.0`).

   ```text
   osism/ansible-collection-commons
   osism/ansible-collection-services
   osism/ansible-collection-validations
   osism/ansible-defaults
   osism/ansible-playbooks
   osism/ansible-playbooks-manager
   osism/cf-generics
   osism/kolla-operations
   osism/python-osism
   ```

2. Copy the `latest` directory. The release to be created is used as the new name.

   ```text
   latest -> 6.0.0b
   ```

3. Remove all `# renovate` lines from the `base.yml` file.

4. Remove all Ceph and OpenStack releases that should not be part of the pre-release.
   There is only one OpenStack version and one Ceph version per (pre-)release.

5. Ensure that the symlinks `openstack.yml` and `ceph.yml` point to the releases
   to be used in this pre-release.

   ```text
   base.yml
   ceph-pacific.yml
   ceph.yml -> ceph-pacific.yml
   openstack-zed.yml
   openstack.yml -> openstack-zed.yml
   ```

6. Run `src/prepare-release.py`.

   ```bash
   RELEASE=6.0.0b python3 src/prepare-release.py
   ```

7. Do the steps from the `Stable release` starting from the 4th step.

### Stable release

1. Copy the directory of the last pre-release or the previous stable release.
   The release to be created is used as the new name.

   ```text
   5.0.0a -> 5.0.0b
   5.0.0b -> 5.0.0
   5.0.0  -> 5.1.0
   5.1.0  -> 5.2.0
   5.2.0  -> 5.3.0
   ```

2. Change all necessary versions in the YAML files within the new directory.
   In any case, the version of the pre-release or the version of the stable
   release must be replaced by the release to be created.

3. The release to be created is submitted as a pull request as usual and then
   merged.

4. Add a tag with the name of the new release to the listed repositories.

   ```text
   osism/container-image-ceph-ansible
   osism/container-image-inventory-reconciler
   osism/container-image-osism-ansible
   osism/container-images-kolla
   ```

5. After completing the creation of the images in repository `container-images-kolla`,
   the file `images.yml` must be added to repository `osism/sbom` as
   `5.0.0/openstack.yml` (instead of `5.0.0`, the corresponding release is used).
   The file is available as a build artifact of the `Release container images` action
   on the created tag.

   Before the file is added, it is enhanced with the checksums of the images. The script
   is available in the `osism/sbom` repository.

   ```bash
   VERSION=5.0.0 python3 scripts/add-image-checksum.py
   ```

6. If `5.0.0/openstack.yml` is present in `osism/sbom`, repository
   `osism/container-image-kolla-ansible` can be tagged like the other
   repositories before.

7. Add the created SPDX files from the listed repositories to the `osism/sbom` repository.
   The file are available as build artifacts of the ``Build container image`` action
   on the created tags.

   ```text
   osism/container-image-ceph-ansible
   osism/container-image-kolla-ansible
   osism/container-image-osism-ansible
   ```

8. Add and run temporary CI jobs in `osism/testbed` that uses the pre-release.

   ```yaml
   - job:
       name: testbed-deploy-stable-next
       parent: testbed-deploy
       vars:
         manager_version: "5.0.0a"
         refstack: true
       nodeset: testbed-orchestrator

   - job:
       name: testbed-upgrade-stable-next
       parent: testbed-deploy
       vars:
         manager_version: "4.2.0"
         manager_version_next: "5.0.0a"
       nodeset: testbed-orchestrator
   ```

9. Test. Test. Test.

10. Prepare a PR to change the stable version to the new stable version in the following Zuul jobs
    in the `osism/testbed` repository. All tests there must pass successfully before the tag is
    set on this repository in the next step. The temporary CI jobs (step 8)  are removed again with
    this PR.

    ```text
    testbed-deploy-stable
    testbed-update-stable
    testbed-update-stable
    testbed-upgrade-stable
    ```

11. Add a new release notes file to `doc/source/notes`. Generate the versions table with the
    help of the `release-table.py` script in the `osism/sbom` repository.

12. After all known issues are documented, a corresponding tag, e.g. `5.0.0`, is set on the
    [osism/release](https://github.com/osism/release/releases) repository.

13. Create a [GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) with the new tag on the
    [osism/release](https://github.com/osism/release/releases) repository. The release is
    now public available.

14. As the last of the release process, the previously prepared PR is merged on the
    `osism/testbed` repository to change the stable version.

## How we write release notes

We use [Reno](https://docs.openstack.org/reno/latest/) to manage the release notes.

### Installation

Reno is provided as a [Python package](https://pypi.org/project/reno/) and can be installed with pip.

```bash
pip3 install reno
```

### Usage

For each change in a repository, a release note is created with Reno.
Something meaningful is used as the name for the note. For example, if the
requirements file for Ansible is removed, `remove-ansible-requirements` is a good name.

```console
$ reno new remove-ansible-requirements
no configuration file in: ./releasenotes/config.yaml, ./reno.yaml
Created new notes file in releasenotes/notes/remove-ansible-requirements-6c6eba43f616bc6b.yaml
```

The created file contains prepared entries for several categories. It is described briefly
in each instance which contents belong in which category. What is not needed is deleted.

```yaml
prelude: >
    Replace this text with content to appear at the top of the section for this
    release. All of the prelude content is merged together and then rendered
    separately from the items listed in other parts of the file, so the text
    needs to be worded so that both the prelude and the other items make sense
    when read independently. This may mean repeating some details. Not every
    release note requires a prelude. Usually only notes describing major
    features or adding release theme details should have a prelude.
features:
  - |
    List new features here, or remove this section.  All of the list items in
    this section are combined when the release notes are rendered, so the text
    needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
issues:
  - |
    List known issues here, or remove this section.  All of the list items in
    this section are combined when the release notes are rendered, so the text
    needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
upgrade:
  - |
    List upgrade notes here, or remove this section.  All of the list items in
    this section are combined when the release notes are rendered, so the text
    needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
deprecations:
  - |
    List deprecations notes here, or remove this section.  All of the list
    items in this section are combined when the release notes are rendered, so
    the text needs to be worded so that it does not depend on any information
    only available in another section, such as the prelude. This may mean
    repeating some details.
critical:
  - |
    Add critical notes here, or remove this section.  All of the list items in
    this section are combined when the release notes are rendered, so the text
    needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
security:
  - |
    Add security notes here, or remove this section.  All of the list items in
    this section are combined when the release notes are rendered, so the text
    needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
fixes:
  - |
    Add normal bug fixes here, or remove this section.  All of the list items
    in this section are combined when the release notes are rendered, so the
    text needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
other:
  - |
    Add other notes here, or remove this section.  All of the list items in
    this section are combined when the release notes are rendered, so the text
    needs to be worded so that it does not depend on any information only
    available in another section, such as the prelude. This may mean repeating
    some details.
```

### Example

Here is an example of a [commit from the osism/cfg-generics repository](https://github.com/osism/cfg-generics/commit/e2f04a9f4a51eb058446d7a8ab6835df53989099).

```yaml
---
features:
  - |
    The `requirements.yml` has been removed. The version will be set in the `run.sh`
    script for the seed process in the future exactly as later in the update process
    via the parameters `ANSIBLE_COLLECTION_SERVICES_VERSION` and
    `ANSIBLE_PLAYBOOKS_MANAGER_VERSION`.
upgrade:
  - |
    In existing configuration repositories, the `environments/manager/requirements.yml`
    file can be removed after the generics have been synced.
```

### Repositories without release notes

We do not create release notes in the following repositories:

* osism/github-manager
* osism/osism.github.io
* osism/release
