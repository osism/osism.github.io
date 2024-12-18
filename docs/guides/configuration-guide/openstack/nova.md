---
sidebar_label: Nova
---

# Nova

* [Nova admin guide](https://docs.openstack.org/nova/latest/admin/index.html)
* [Nova configuration guide](https://docs.openstack.org/nova/latest/configuration/index.html)
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

## Dedicated cores for instances

This section will describe how to use dedicated cores for nova instances. There are a few configuration options involved, so please refer to [the upstream documentation](https://docs.openstack.org/nova/latest/admin/cpu-topologies.html) for a full overview of possible combinations and results.

### Add NUMA topology filter to nova scheduler

Add the `NUMATopologyFilter` to the list of enabled nova filters.
The filter makes the nova scheduler [NUMA](https://en.wikipedia.org/wiki/Non-uniform_memory_access) aware, so that the instance will have pinned cores from the same NUMA node.
Get the list of currently enabled filters or use the list of [default filters](https://docs.openstack.org/nova/latest/configuration/config.html#filter_scheduler.enabled_filters) and add the `NUMATopologyFilter` in the nova-scheduler config, e.g.:

```ini title="environments/kolla/files/overlays/nova/nova-scheduler.conf"
[filter_scheduler]
enabled_filters = ComputeFilter,ComputeCapabilitiesFilter,ImagePropertiesFilter,ServerGroupAntiAffinityFilter,ServerGroupAffinityFilter,NUMATopologyFilter
```

Apply the configuration using the osism CLI on the manager

```
osism apply nova
```

### Specify CPU cores to be used as dedicated cores

The nova compute service needs to be aware of which CPU threads should be used as dedicated cores on each hypervisor. The config option [cpu_dedicated_set](https://docs.openstack.org/nova/latest/configuration/config.html#compute.cpu_dedicated_set) is used to do that. It takes a comma-separated list of CPU threads, ranges or threads to exclude.
Before deciding on the set of dedicated cores assess the number of services and their required CPU load to exclude the required number of threads from the list.
The following example will leave thread 0 and 1 for the compute node and use ansible facts to extend the range to the other available threads:

Warning: Do **not** use `ansible_processor_*` facts if you intend to use [cpu_power_management_strategy=cpu_state](https://docs.openstack.org/nova/latest/configuration/config.html#libvirt.cpu_power_management_strategy) as offline cores will not be shown and subsequent applies will result in a wrong range

```ini title="environments/kolla/files/overlays/nova/nova-compute.conf"
[compute]
cpu_dedicated_set=2-{{ ansible_facts['processor_nproc'] - 1 }}
```

You may use node specific configuration to override the dedicated set for specific compute nodes, e.g.:

```ini title="environments/kolla/files/overlays/nova/$INVENTORY_HOSTNAME/nova-compute.conf"
[compute]
cpu_dedicated_set=4-12,^8,15
```

Apply the configuration using the osism CLI on the manager

```
osism apply nova
```

### Create flavors or images backed by dedicated cores

To make the configured dedicated cores available to users, create flavors with property `hw:cpu_policy=dedicated`, so that the given `vcpus` will be pinned to the threads in the dedicated set specified on the compute node, e.g.:

```
openstack flavor create --ram 4096 --disk 10 --vcpus 2 --property hw:cpu_policy=dedicated $FLAVOR_NAME 
```

Note that this configuration will pin the qemu emulator threads to the instances CPUs. This will be fine for most workloads, but might not be sufficient for real-time or latency sensitive workloads like loadbalancers. If you get reports of [CPU steal](https://docs.kernel.org/filesystems/proc.html#miscellaneous-kernel-statistics-in-proc-stat) on an instance with dedicated cores or know that you need this, you may pin the emulator threads to another dedicated core by setting the property `hw:emulator_threads_policy=isolate`.

```
openstack flavor set --property hw:emulator_threads_policy=isolate $FLAVOR_NAME 
```

### Mixing dedicated and shared cores on a compute node

You may also mix dedicated and shared cores on a single compute node by adding cores to the [shared CPU set](https://docs.openstack.org/nova/latest/configuration/config.html#compute.cpu_shared_set), e.g.

```ini title="environments/kolla/files/overlays/nova/nova-compute.conf"
[compute]
cpu_shared_set=4-12,^8,15
```

This will allow nova to schedule instances with floating cores on this set of CPU cores.
When a shared CPU set is specified setting the property `hw:emulator_threads_policy=share` will pin the emulator threads to this set of cores.

### Mixing dedicated and shared cores in a nova instance

It is possible to create instances with a mixed set of dedicated and shared CPU cores. Set the property `hw:cpu_policy=mixed`:

```
openstack flavor set --property hw:cpu_policy=mixed $MIXED_FLAVOR_NAME 
```

and specify a mask for the instance cores which are to be pinned with property [hw:cpu_dedicated_mask](https://docs.openstack.org/nova/latest/configuration/extra-specs.html#hw:cpu_dedicated_mask). E.g.:

```
openstack flavor set --property hw:cpu_dedicated_mask=0-1 $MIXED_FLAVOR_NAME 
```

to pin instance cores 0 and 1.

### Creating images with special CPU requirements

All properties used in this section may also be set on images to indicate that instances should use the specified mixed or dedicated cores or isolated emulator threads. Note however that properties set on flavors take precedence.

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
`testbed-node-0`. The name of the directory must match the name of the host in the
inventory. If the compute node has a file with the name `testbed-node-0.yml` in the
`host_vars` directory in the inventory, then the name of the directory
in the overlays is `testbed-node-0` accordingly. If the file name there were
`testbed-node-0.testbed.osism.xyz.yml` then the name of the directory would be
`testbed-node-0.testbed.osism.xyz`.

```ini title="environments/kolla/files/overlays/nova/testbed-node-0/nova.conf"
[libvirt]
images_type = raw

[glance]
enable_rbd_download = true
```

As Ceph is still used as the storage backend for Glance and Cinder, the image type is
set to `raw`. To allow to download and cache images from Ceph via rbd rather than the
Glance API via http  `enable_rbd_download` is set to `true`.

Parameters must also be added in the inventory. This differs depending on the OSISM
version used.

Up to OSISM 6 it looks like this:

In the inventory, the parameter `nova_instance_datadir_volume`
is added in the section for the `kolla` environment.

```yaml title="inventory/host_vars/testbed-node-0.yml"
##########################################################
# kolla

nova_instance_datadir_volume: /var/lib/nova
```

Starting with OSISM 7, it looks like this:

In the inventory, the parameters `nova_instance_datadir_volume` and `nova_backend`,
are added in the section for the `kolla` environment.

```yaml title="inventory/host_vars/testbed-node-0.yml"
##########################################################
# kolla

nova_instance_datadir_volume: /var/lib/nova
nova_backend: default
```

It is currently not possible to completely deactivate the Ceph integration with Nova.
So if you have all compute nodes with local storage, you still have to do the Ceph
integration for Nova itself and convert each compute node specifically to local storage.
If this is not done, errors will occur when deploying Nova.
