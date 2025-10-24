---
sidebar_label: Image Manager
sidebar_position: 50
---

# Image Manager

The [OpenStack Image Manager](https://pypi.org/project/openstack-image-manager/) is
a tool for managing all machine images on an OpenStack environment.

## Requirements

:::info

This information is only relevant for the operator of an OpenStack environment. You
can skip this section if you want to use OpenStack Image Manager as a normal user
and you are not an operator of an OpenStack environment.

:::

The OpenStack Image Service (Glance) is required to upload and discover data assets
that are used by other services.

Since this script stores many images in a single project, the Glance quota must be set
accordingly high or to unlimited.

```ini file="environments/kolla/files/overlays/glance/glance-api.conf"
[DEFAULT]
user_storage_quota = 1TB
```

With most storage backends it makes sense to convert the imported images directly to RAW.
So it is required for using Ceph and it's features too. Recited from the Ceph documentation
[QEMU and block devices](https://docs.ceph.com/en/latest/rbd/qemu-rbd/) and
[Block devices and OpenStack](https://docs.ceph.com/en/latest/rbd/rbd-openstack/).

:::info

The raw data format is really the only sensible format option to use with RBD. Technically,
you could use other QEMU-supported formats (such as qcow2 or vmdk), but doing so would add
additional overhead, and would also render the volume unsafe for virtual machine live
migration when caching (see below) is enabled.

Important Ceph doesn't support QCOW2 for hosting a virtual machine disk. Thus if you want
to boot virtual machines in Ceph (ephemeral backend or boot from volume), the Glance image
format must be RAW.

See the [OpenStack Glance documentation](https://docs.openstack.org/glance/latest/configuration/sample-configuration.html)
for more details.

:::

This requires the following parameter for the image import workflow.

```ini file="environments/kolla/files/overlays/glance/glance-api.conf"
[taskflow_executor]
conversion_format = raw

[image_import_opts]
image_import_plugins = ['image_decompression', 'image_conversion']

[image_conversion]
output_format = raw
```

## Getting started

This **Getting started** will upload a private image to your OpenStack environment with
the help of the OpenStack Image Manager.

1. Install the [openstack-image-manager](https://pypi.org/project/openstack-image-manager/)
   package with [pip](https://pypi.org/project/pip/).

   ```sh
   pip3 install openstack-image-manager
   ```

   The installation can also be done via [pipenv](https://pypi.org/project/pipenv/).

   A `Pipfile` file is created with this content. The [latest version of openstack-image-manager](https://pypi.org/project/openstack-image-manager/#history)
   is used.

   ```ini
   [[source]]
   url = "https://pypi.org/simple"
   verify_ssl = true
   name = "pypi"

   [packages]
   openstack-image-manager = "==0.20250413.0"

   [dev-packages]

   [requires]
   python_version = "3.10"
   ```

   The dependencies are then installed and the shell is prepared for use:

   ```sh
   pipenv install
   pipenv shell
   ```

2. Create a image definition in the file `getting-started.yml` in the local directory `images`.

   ```yaml
   ---
   images:
     - name: MyCirros
       enable: true
       format: qcow2
       login: cirros
       password: gocubsgo
       min_disk: 1
       min_ram: 32
       status: active
       visibility: private
       multi: false
       meta:
         architecture: x86_64
         hw_disk_bus: scsi
         hw_rng_model: virtio
         hw_scsi_model: virtio-scsi
         hw_watchdog_action: reset
         hypervisor_type: qemu
         os_distro: cirros
         replace_frequency: never
         uuid_validity: none
         provided_until: none
       tags: []
       versions:
         - version: '0.6.2'
           url: https://github.com/cirros-dev/cirros/releases/download/0.6.2/cirros-0.6.2-x86_64-disk.img
           checksum: "sha256:07e44a73e54c94d988028515403c1ed762055e01b83a767edf3c2b387f78ce00"
           build_date: 2023-05-30
         - version: '0.6.3'
           url: https://github.com/cirros-dev/cirros/releases/download/0.6.3/cirros-0.6.3-x86_64-disk.img
           checksum: "sha256:7d6355852aeb6dbcd191bcda7cd74f1536cfe5cbf8a10495a7283a8396e4b75b"
           build_date: 2024-09-26
   ```

3. Run the OpenStack Image Manager. It is assumed that a profile with the name `openstack` exists in the
   [clouds.yaml](https://docs.openstack.org/python-openstackclient/latest/configuration/index.html#configuration-files).

   ```bash
   openstack-image-manager --cloud openstack --filter ".*Cirr.*" --images images/
   ```

## Image definitions

The configuration consists of different parameter settings, such as values for
minimum RAM or the visibility of the image. Have a look at the examples below
for all parameters. After a change to the configuration, validate it with
`tox -- --dry-run`.

### SCS image standard

* The value of `login` is stored as `image_original_user` in the metadata of an image.
* If `image_description` is not set as meta information, `image_description` is set
  to the name of the image.
* The value of `build_date` of a specific version of an image is stored as `image_build_date`
  in the metadata of an image.
* The value of `url` of a specific version of an image is stored as `image_source`
  in the metadata of an image.

### Image with regular rebuilds

This type of image definition is used for images that are rebuilt at regular
intervals. For example, this is the case for the daily builds of the Ubuntu
images.

The attribute `multi: true` is set.

With this type of image definition, the version of the distribution (or product,
whatever is contained in the image) used is already in the name of the image
definition. The `version` properties from the definition's `versions` list
are appended only to older iterations of the image as timestamp suffixes
in parentheses upon each rotation (except for the latest entry).

```yaml
images:
  - name: Ubuntu 24.04
    format: qcow2
    login: ubuntu
    min_disk: 8
    min_ram: 512
    status: active
    visibility: public
    multi: true
    meta:
      architecture: x86_64
      hw_disk_bus: scsi
      hw_scsi_model: virtio-scsi
      hw_watchdog_action: reset
      os_distro: ubuntu
      os_version: '24.04'
    tags: []
    versions:
      - version: '20240416'
        url: https://cloud-images.ubuntu.com/noble/20240416/noble-server-cloudimg-amd64.img
      - version: '20240422'
        url: https://cloud-images.ubuntu.com/noble/20240422/noble-server-cloudimg-amd64.img
```


This configuration creates the following images:

* **Ubuntu 24.04 (20240416)**
* **Ubuntu 24.04**

If a newer build is added, the following rotation takes place:

* **Ubuntu 24.04 (20240416)** does not change
* **Ubuntu 24.04** becomes **Ubuntu 24.04 (20240422)**
* the new image becomes **Ubuntu 24.04**

By default the last three images will be visible. When a fourth image is added, the visibility of
the last image in the list is changed to `community` and the image can be deleted in the future.

### Image without regular rebuild

This type of image definition is used for images that are not rebuilt. For example,
this is the case for the flatcar images. For each release of Flatcar there is exactly
one image which will not be rebuilt in the future.

The attribute `multi: false` is set.

With this type of image definition, the version of the distribution (or product,
whatever is contained in the image) used is not in the name of the image definition.
Instead, the ``version`` properties from the image definition's ``versions`` list
are appended as static version suffixes to the images' names.

```yaml
images:
  - name: RancherOS
    format: qcow2
    login: rancher
    min_disk: 8
    min_ram: 2048
    status: active
    visibility: public
    multi: false
    meta:
      architecture: x86_64
      hw_disk_bus: scsi
      hw_scsi_model: virtio-scsi
      hw_watchdog_action: reset
    tags: []
    versions:
      - version: '1.3.0'
        url: https://github.com/rancher/os/releases/download/v1.3.0/rancheros-openstack.img
      - version: '1.4.0'
        url: https://github.com/rancher/os/releases/download/v1.4.0/rancheros-openstack.img
      - version: '1.4.1'
        url: https://github.com/rancher/os/releases/download/v1.4.1/rancheros-openstack.img
```

This configuration creates the following images:

* **RancherOS 1.3.0**
* **RancherOS 1.4.0**
* **RancherOS 1.4.1**

If a new version is added, no rotation takes place. The new version is added
as **RancherOS x.y.z**. Here also the visibility of older images is not changed.

### Other properties

#### Image properties

* Removal of properties is not yet possible
* URL, name and format can not be changed
* Any keys can be added to `meta`, these will be added to the image
* Existing keys in `meta` can be changed, the same applies to `min_disk`
  and `min_ram`

#### Image tags

#### image status

* deactivation: change `status` to `deactivated`
* reactivation: change `status` to `active`

#### Image visibility

A full documentation about the visibility of images can be found in the **Image visibility** section in the
[OpenStack Image Service API Documentation](https://docs.openstack.org/api-ref/image/v2/index.html#general-information).

* public: set ``visibility`` to ``public``
* community: set ``visibility`` to ``community``
* shared: set ``visibility`` to ``shared``
* private: set ``visibility`` to ``private``
