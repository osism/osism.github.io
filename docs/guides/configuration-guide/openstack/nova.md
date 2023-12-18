---
sidebar_label: Nova
---

# Nova

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

On the compute node, the local SSD to be used is formatted with a file system of
your choice and mounted to `/var/lib/nova`. When using more than one local SSD, a
software RAID 1 should be used

A `nova.conf` is created as an overlay for the compute node `testbed-node-0`.

```ini title="environments/kolla/files/overlays/testbed-node-0/nova.conf"
[libvirt]
images_type = raw

[glance]
enable_rbd_download = true
```

In the inventory, the parameters `nova_instance_datadir_volume` and `nova_backend_ceph`
are added in the section for the `kolla` environment.


```yaml title="inventory/host_vars/testbed-node-0.yml"
##########################################################
# kolla

nova_instance_datadir_volume: /var/lib/nova
nova_backend_ceph: no
```
