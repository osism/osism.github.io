---
sidebar_label: Container Image Labels
sidebar_position: 25
---

# Container Image Labels

Every image built from a release tag carries the same set of labels, so they
can be read the same way on every image. An image leaves a label out only where
its build has nothing for the label to describe.

This applies to the kolla service images and to the images kolla-ansible,
osism-ansible, osism-kubernetes, ceph-ansible and inventory-reconciler. New
images follow the same rules.

## The labels

### OCI labels

`org.opencontainers.image.created`, `documentation`, `licenses`, `revision`,
`source`, `title`, `url`, `vendor` and `version`.

`revision` is the full commit of the image's own repository. `source` and `url`
name that repository.

### Commits of the cloned repositories

`de.osism.commit.<repo>` for every repository the build clones and takes
content from, with the full commit it used. The label is named after the
repository without its organisation, `-` replaced by `_`:

| Repository                | Label                               |
|:--------------------------|:------------------------------------|
| `osism/release`           | `de.osism.commit.release`           |
| `osism/ansible-playbooks` | `de.osism.commit.ansible_playbooks` |
| `osism/generics`          | `de.osism.commit.generics`          |
| `osism/defaults`          | `de.osism.commit.defaults`          |
| `ceph/ceph-ansible`       | `de.osism.commit.ceph_ansible`      |
| `openstack/kolla`         | `de.osism.commit.kolla`             |
| `openstack/kolla-ansible` | `de.osism.commit.kolla_ansible`     |

The image's own repository is recorded by `revision`, not by a
`de.osism.commit.*` label.

Packages a package manager installs (pip, ansible-galaxy) and files downloaded
at a version are not repositories in this sense. Their versions are pinned in
`osism/release` or in the image's own repository, which the labels already
name.

### Series

`de.osism.release.<product>=<series>` where the image is built for one series
of a product: `de.osism.release.openstack` on kolla and kolla-ansible,
`de.osism.release.ceph` on ceph-ansible.

### Image inputs

An input that is an image, not a repository, is recorded by version and digest.
The version alone does not identify it, since an image can be pushed again
under the same version. kolla-ansible records the kolla SBOM image it copies
`/sbom.yml` from as `de.osism.sbom=<version>` and
`de.osism.sbom.digest=<digest>`.

The SBOM image is the only image input recorded this way so far. The `uv`
binary that all of these images except the kolla service images copy from
`ghcr.io/astral-sh/uv:<version>` is pinned by version in the Containerfile,
which `revision` names, but not by digest, and has no label.

### Base image

`org.opencontainers.image.base.name` and `org.opencontainers.image.base.digest`
for the stage the image is made from. For the kolla service images this is the
distribution image kolla's `base` image is built from.

## Labels have to be true

A label is only useful if the build used what it names. A tag or branch can
move while a build runs, so each build resolves its inputs **once**, at the
start, and uses the result everywhere:

- `build.yml` resolves the release tag (or `HEAD` for a latest build) to a
  commit before anything is read from `osism/release`.
- Files of `osism/release` are read through that commit, not the tag name, and
  the refs of the other repositories come from those files.
- The commits are passed as `SHA_<REPO>` build arguments, and the Containerfile
  checks each repository out at its commit before anything uses its content.
- Base and input images are resolved to a digest and pulled by that digest.
- The same variables set the labels.

[osism/container-image-kolla-ansible#949](https://github.com/osism/container-image-kolla-ansible/pull/949)
is the reference implementation.

Commit labels hold full hashes. The local image tag a build derives from the
same commit can stay short.

Existing labels outside these rules are kept for the time being. Users outside
the OSISM repositories may read them.

## Reading the labels

From a pulled image:

```bash
docker inspect <image> \
  --format '{{ index .Config.Labels "de.osism.commit.release" }}'
```

Without pulling the image:

```bash
skopeo inspect --config docker://registry.osism.tech/osism/osism-ansible:<version> \
  | jq '.config.Labels'
```

The release checks in `osism/release` rely on these labels.
`check-osism-images.sh` fails an image whose `de.osism.commit.release` does not
name the commit of the release tag, and `check-kolla-images.sh` does the same
for the kolla service images. Both are described in the
[README of osism/release](https://github.com/osism/release).
