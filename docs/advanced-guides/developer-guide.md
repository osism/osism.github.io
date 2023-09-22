---
sidebar_label: Developer Guide
sidebar_position: 90
---

# Developer Guide

## Release notes

We use [Reno](https://docs.openstack.org/reno/latest/) to manage the release notes.

### Installation

Reno is provided as a [Python package](https://pypi.org/project/reno/) and can be installed with pip.

```
pip3 install reno
```

### Usage

For each change in a repository, a release note is created with Reno.
Something meaningful is used as the name for the note. For example, if the
requirements file for Ansible is removed, `remove-ansible-requirements` is a good name.

```
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
