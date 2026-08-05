---
sidebar_label: MetalBox
---

# MetalBox

## Inspecting images on the local container registry

If something does not work as expected with container images served from the local
registry — e.g. a deployment pulls the wrong tag, an image is reported as missing, or
after an `update-registry.sh` or `single-image-import.sh` run it is unclear whether a
specific image actually ended up in the mirror — use `list-registry-images.sh` to
enumerate what is currently stored on the local registry (`localhost:5001`).

```bash
list-registry-images.sh          # list all repositories with their tags
list-registry-images.sh -t       # list only repository names
list-registry-images.sh -d       # list tags including the content digest
list-registry-images.sh -h       # show full help
```

## Manual preparation of the Ironic volume

```bash
docker run --rm --name httpd-ironic \
  --entrypoint /prepare-ironic-volume.sh \
  -v /opt/httpd/configuration/prepare-ironic-volume.sh:/prepare-ironic-volume.sh \
  -v ironic:/var/lib/ironic \
  localhost:5001/library/httpd:alpine
```

## Resumable downloads with aria2c {#resumable-downloads-with-aria2c}

Downloads from the Hetzner Object Storage can occasionally be interrupted. Use `aria2c`
for resumable, multi-connection downloads:

```bash
aria2c -x 4 -s 4 --auto-file-renaming=false https://nbg1.your-objectstorage.com/osism/metalbox/ubuntu-noble.tar.bz2
```

Replace the URL as needed for other files. The `-x 4 -s 4` flags use 4 connections for
faster downloads, and `--auto-file-renaming=false` prevents duplicate files on resume.
