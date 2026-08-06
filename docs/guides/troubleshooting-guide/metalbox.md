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

The `ironic` Docker volume is shared between Ironic and the HTTPd. Ironic writes the
boot artifacts for the nodes into `/var/lib/ironic/httpboot`, and the HTTPd publishes
that directory as `/ironic` — the path the nodes fetch from through
`external_http_url`. For this to work, the directory has to exist and belong to
uid/gid `42422`, the `ironic` user inside the containers.

Preparing the volume is part of `osism apply httpd`, which normally runs through
[`deploy-infrastructure.sh`](https://github.com/osism/metalbox/blob/main/scripts/deploy-infrastructure.sh#L15)
during the deployment. Use `osism apply httpd` whenever it is available — it covers the
volume and the rest of the HTTPd configuration. Note that `deploy-infrastructure.sh`
only calls it when the `httpd` container is not already running, so re-running that
script does not repair an emptied volume on a MetalBox whose HTTPd is up.

The command below is the fallback for when the play cannot run at all: `osism apply`
dispatches through the Manager and its task queue, so it is unavailable before the
Manager and the infrastructure services are deployed, and while they are broken. The
manual invocation only needs Docker and the local registry:

```bash
docker run --rm --name httpd-ironic \
  --entrypoint /prepare-ironic-volume.sh \
  -v /opt/httpd/configuration/prepare-ironic-volume.sh:/prepare-ironic-volume.sh \
  -v ironic:/var/lib/ironic \
  localhost:5001/library/httpd:alpine
```

The script only does something when `/var/lib/ironic/httpboot` does not exist, so
running it against an already prepared volume changes nothing.

## Resumable downloads with aria2c {#resumable-downloads-with-aria2c}

Downloads from the Hetzner Object Storage can occasionally be interrupted. Use `aria2c`
for resumable, multi-connection downloads:

```bash
aria2c -x 4 -s 4 --auto-file-renaming=false https://nbg1.your-objectstorage.com/osism/metalbox/ubuntu-noble.tar.bz2
```

Replace the URL as needed for other files. The `-x 4 -s 4` flags use 4 connections for
faster downloads, and `--auto-file-renaming=false` prevents duplicate files on resume.
