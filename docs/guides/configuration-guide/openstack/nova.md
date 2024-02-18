---
sidebar_label: Nova
---

# Nova

* [Nova admin guide](https://docs.openstack.org/nova/latest/admin/index.html)
* [Nova configuration guide](https://docs.openstack.org/nova/latest/admin/configuration/index.html)
* [Nova configuration reference](https://docs.openstack.org/nova/latest/configuration/config.html)

## Nested virtualisation

### AMD

```
echo "options kvm-amd nested=y" | sudo tee /etc/modprobe.d/kvm-nested-virtualization.conf
sudo modprobe -r kvm_amd
sudo modprobe kvm_amd
cat /sys/module/kvm_amd/parameters/nested
Y
docker restart nova_libvirt
```

### Intel

```
echo "options kvm-intel nested=y" | sudo tee /etc/modprobe.d/kvm-nested-virtualization.conf
sudo modprobe -r kvm_intel
sudo modprobe kvm_intel
cat /sys/module/kvm_intel/parameters/nested
Y
docker restart nova_libvirt
```

## Reserve compute node resources

How many resources you want to reserve on a compute node depends very much on which additional
services are running on the compute node.

### Host memory

* https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_host_memory_mb

```ini title="environments/kolla/files/overlays/nova/nova-compute.conf"
[DEFAULT]
reserved_host_memory_mb = 32768
```

### Host CPUs

* https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_host_cpus

```ini title="environments/kolla/files/overlays/nova/nova-compute.conf"
[DEFAULT]
reserved_host_cpus = 4
```

## Local SSD storage

In this example, a local SSD is provided for use on compute node `testbed-node-0`.
By default, Nova accesses the local storage on a file basis.

It is also possible to work with logical volumes instead. However, this is not
recommended or supported by OSISM. More details in the
[Nova Configuration Guide](https://docs.openstack.org/nova/latest/admin/configuration/index.html).

On the compute node, the local SSD to be used is formatted with a file system of
your choice and mounted to `/var/lib/nova`. When using more than one local SSD, a
software RAID 1 should be used It is recommended to automate the creation of the
file system and the creation of the mount point with a custom playbook.

A `nova.conf` configuration file is created as an overlay file for the compute node
`testbed-node-0`.

```ini title="environments/kolla/files/overlays/nova/testbed-node-0/nova.conf"
[libvirt]
images_type = raw

[glance]
enable_rbd_download = true
```

As Ceph is still used as the storage backend for Glance and Cinder, the image type is
set to `raw`. To allow to download and cache images from Ceph via rbd rather than the
Glance API via http  `enable_rbd_download` is set to `true`.

In the inventory, the parameters `nova_instance_datadir_volume` and `nova_backend_ceph`
are added in the section for the `kolla` environment.


```yaml title="inventory/host_vars/testbed-node-0.yml"
##########################################################
# kolla

nova_instance_datadir_volume: /var/lib/nova
nova_backend_ceph: no
```

It is currently not possible to completely deactivate the Ceph integration with Nova.
So if you have all compute nodes with local storage, you still have to do the Ceph
integration for Nova itself and convert each compute node specifically to local storage.
If this is not done, errors will occur when deploying Nova.
