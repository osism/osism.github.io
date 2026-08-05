---
sidebar_label: Data updates
sidebar_position: 10
---

# Data updates on the MetalBox

The data a MetalBox serves — the NetBox inventory, the Ironic images, the container
images, and the Ubuntu packages — is updated independently of the MetalBox services
themselves. The update of the services is described in
[Service updates](./service-updates.md).

Most of the updates can be performed either with or without external connectivity. In
the variant without external connectivity, the artifacts are downloaded elsewhere,
copied to `/home/dragon` on the MetalBox node, and the update script is run with
`SKIP_DOWNLOAD=true` so that it uses the local file instead of fetching it.

:::tip

Downloads from the Hetzner Object Storage can occasionally be interrupted. Use
`aria2c` for resumable, multi-connection downloads as described in the
[Troubleshooting Guide](../../troubleshooting-guide/metalbox.md#resumable-downloads-with-aria2c).

:::

## Update of the NetBox data

1. Export the NetBox configuration repository with
   `netbox-manager export-archive -i`. When using a NetBox configuration repository
   provided by OSISM, the file can be downloaded from GitHub after a trigger of the
   `Run export` action. Copy `netbox-export.img` to `/home/dragon` on the MetalBox
   node.
2. Run `mount-images.sh` to mount the `netbox-export.img` image.
3. Run `netbox-import.sh` to sync the files in `/opt/configuration/netbox`.
4. Run `unmount-images.sh` to unmount the `netbox-export.img` image.
5. Run `netbox-manage.sh` to sync NetBox with the state in
   `/opt/configuration/netbox`.

It is also possible to update only the data of specific devices. To do this, the
netbox-manager can be used directly in the NetBox directory. In the following example,
only files with the prefix `300-node10` are processed.

```bash
cd /opt/configuration/netbox
netbox-manager run --limit 300-node10
```

## Update of the Ironic images

### Without external connectivity

1. Download the Ironic images:
   * [osism-ipa.initramfs](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-ipa.initramfs)
   * [osism-ipa.kernel](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-ipa.kernel)
   * [osism-node.qcow2](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-node.qcow2)
   * [osism-node.qcow2.CHECKSUM](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-node.qcow2.CHECKSUM)
   * [osism-esp.raw](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-esp.raw)
2. Copy the downloaded files to `/home/dragon` on the MetalBox node.
3. Run `SKIP_DOWNLOAD=true update-ironic-images.sh` to update the Ironic images.

### With external connectivity

1. Run `update-ironic-images.sh` to update the Ironic images.

## Update of the container registry

### Without external connectivity

1. Download
   [registry.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/registry.tar.bz2).
2. Copy `registry.tar.bz2` to `/home/dragon` on the MetalBox node.
3. Run `SKIP_DOWNLOAD=true update-registry.sh` to update the container registry.

### With external connectivity

1. Run `update-registry.sh` to update the container registry.

:::info

`registry.tar.bz2` is the version-independent base tarball for the MetalBox itself. To
serve all container images required by the nodes inside the CloudPod, one of the full
variants is needed instead. The available tarballs are described in
[Container registry tarballs](../../deploy-guide/metalbox.md#container-registry-tarballs),
the import procedure in
[Using the MetalBox as a full container registry](../../deploy-guide/metalbox.md#full-container-registry).

:::

### Update from a single image on the container registry

Instead of updating the whole registry, a single image can be exported on a local
system and imported on the MetalBox. Replace `osism/inventory-reconciler:latest` and
`registry-delta-YYYYMMDD-HHMM.tar.gz` as needed.

1. Run `scripts/single-image-export.sh osism/inventory-reconciler:latest` on a local
   system to create a `registry-delta-YYYYMMDD-HHMM.tar.gz` file. A matching
   `.CHECKSUM` file is written next to it.
2. Copy `registry-delta-YYYYMMDD-HHMM.tar.gz` to `/home/dragon` on the MetalBox node.
3. Run `single-image-import.sh registry-delta-YYYYMMDD-HHMM.tar.gz` on the MetalBox
   node to import the image into the local registry on `localhost:5001`.

The image passed to `single-image-export.sh` is given **without** the registry host but
**with** its namespace prefix, which selects where the image is pulled from:

* `osism/` — OSISM Manager images, e.g. `osism/ara-server:1.7.3`
* `kolla/` — Kolla images, e.g. `kolla/nova-api:2024.2`
* `dockerhub/` — Docker Hub images, e.g. `dockerhub/library/redis:7.4.7-alpine`

The source registry defaults to `registry.osism.tech` and can be overridden with the
`DOCKER_REGISTRY` environment variable. A `registry.osism.tech/` or
`registry.osism.cloud/` prefix on the image is accepted and stripped, so
`registry.osism.tech/osism/inventory-reconciler:latest` works as well. The
`dockerhub/` prefix is removed for the destination name, so the image ends up in the
registry under `library/redis:7.4.7-alpine`.

`single-image-import.sh` reads the target image name from the `manifest.txt` inside the
tarball and pushes to `localhost:5001` by default; the target can be overridden with
the `TARGET_REGISTRY` environment variable. The registry must already be running.

## Update of the Ubuntu repository files

### Without external connectivity

1. Download
   [ubuntu-noble.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/ubuntu-noble.tar.bz2).
2. Copy `ubuntu-noble.tar.bz2` to `/home/dragon` on the MetalBox node.
3. Run `SKIP_DOWNLOAD=true update-repository.sh` to update the Ubuntu repository files.

### With external connectivity

1. Run `update-repository.sh` to update the Ubuntu repository.
