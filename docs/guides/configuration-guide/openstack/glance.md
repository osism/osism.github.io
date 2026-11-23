---
sidebar_label: Glance
---

# Glance

* [Glance admin guide](https://docs.openstack.org/glance/latest/admin/index.html)
* [Glance configuration reference](https://docs.openstack.org/glance/latest/configuration/index.html)

## Storing images in Cinder

With Ceph, keep Glance on RBD (`glance_backend_ceph: "yes"`): images, volumes
and instance disks then live in the same cluster and are cloned instead of
copied. Do not use the Cinder store on a Ceph-backed Cinder: glance-api has no
Cinder keyring and cannot read the images.

Without Ceph, Glance can store each image in a Cinder volume on the block
storage array. OSISM supports this for arrays attached over NVMe-oF, such as
NetApp ONTAP with NVMe/TCP or Pure Storage FlashArray with NVMe/TCP. Arrays
attached over iSCSI or Fibre Channel are not supported as a Glance store,
because glance-api gets no access to the host's devices for them.

The NVMe host ID handling this needs is part of OSISM 11.1.0 and later.

### Configuration

```yaml title="environments/kolla/configuration.yml"
glance_backend_file: "no"
glance_default_backend: "cinder"
glance_backend_nvme: "yes"
```

* `glance_backend_file: "no"`: without it, Glance keeps the file store and
  runs only one glance-api service.
* `glance_default_backend: "cinder"`: new images are stored in Cinder. It is
  not derived from any other setting.
* `glance_backend_nvme: "yes"`: glance-api runs privileged with access to
  `/dev` and gets the host's NVMe host NQN and host ID, so it can connect to
  the array.

### Multi-attach volume type

Every read of an image attaches its volume to the glance-api host. A volume
type without multi-attach allows only one attachment at a time, so two reads
of the same image at once, for example two instances booted from it, cannot
both attach. Glance retries for about 15 seconds: reads first become slow,
then they fail. A failed download ends with an incomplete response.

Image volumes must therefore use a volume type with multi-attach enabled. The
backend must support multi-attach (see the
[Cinder support matrix](https://docs.openstack.org/cinder/latest/reference/support-matrix.html)).

Create the volume type after Cinder is deployed. Use the `volume_backend_name`
of the array's backend.

```bash
openstack --os-cloud admin volume type create \
  --private --project service \
  --property multiattach="<is> True" \
  --property volume_backend_name=<backend name> \
  glance-multiattach
```

Then tell Glance to use it.

```ini title="environments/kolla/files/overlays/glance/glance-api.conf"
[cinder]
cinder_volume_type = glance-multiattach
```

Apply the configuration using the osism CLI on the manager.

```bash
osism apply glance
```

The volume type applies only to images uploaded afterwards. To check an
existing deployment, look at the type of the image volumes in the `service`
project. Volumes named `image-<image ID>` must have the multi-attach type.

```bash
openstack --os-cloud admin volume list --project service --long
openstack --os-cloud admin volume type show glance-multiattach -c properties
```

Upload images whose volumes have another type again.

