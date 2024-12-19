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

## Back instance memory by hugepages

Qemu/KVM can make use of hugepages, which reduces the required number of TLB entries for the instances memory. Thus it will reduce the number TLB misses, which will result in faster memory access inside the instance.
As with [dedicated cores](#dedicated-cores-for-instances) usage will enable NUMA topologies and require the [NUMA topology filter to be added to the nova-scheduler's enabled filters](#add-numa-topology-filter-to-nova-scheduler).
Since allocating hugepages requires contiguous regions of memory it is advisable to do so at boot time, by [specifying the required size and number of hugepages on the kernel cmdline](https://docs.kernel.org/admin-guide/mm/hugetlbpage.html).

If you have configured dedicated cores, make sure to configure a matching hugepage reservation by NUMA node.
E.g. assuming a compute node with two NUMA nodes of 32GB where some cores and 8GB of 4k memory pages on the first NUMA node are reserved for the hypervisor services, while the rest should be used as hugepage-backed instance memory, the following cmdline could be used: `default_hugepagesz=1G transparent_hugepage=never hugepagesz=1G hugepages=0:24,1:32`
This would set a default hugepage size of 1GB, turn off [transparent hugepages](https://docs.kernel.org/admin-guide/mm/transhuge.html), and reserve 24 1GB hugepages on NUMA node 0 and 32 1GB hugepages on NUMA node 1.
To set this via osism for a group of hosts defined in the inventory create or add to the file with the following content:

```yaml title="inventory/group_vars/INVENTORY_GROUP_NAME.yml"
---
grub__configuration:
  - name: cmdline_linux
    value:
      - default_hugepagesz=1G
      - transparent_hugepage=never
      - hugepagesz=1G
      - hugepages=0:24,1:32
```
Of course the same configuration may also be set by host using `host_vars` in `inventory/host_vars/INVENTORY_HOST_NAME.yml`.

Sync the variables with the inventory by running

```
osism sync inventory
```

and apply the configuration with

```
osism apply grub
```

After rebooting the nodes the hugepages will be allocated. You may check this by, e.g. looking at the corresponding values in `/proc/meminfo`

```
grep Huge /proc/meminfo
AnonHugePages:         0 kB
ShmemHugePages:        0 kB
FileHugePages:         0 kB
HugePages_Total:      24
HugePages_Free:       24
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:    1048576 kB
Hugetlb:        25165824 kB
```

If you require hugepages for services on the compute node, make sure to configure nova to reserve them for the host by setting [DEFAULT.reserved_huge_pages](https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_huge_pages) accordingly.

To back an instance's memory by hugepages add the property `hw:mem_page_size=large` to a flavor and create the instance from it, e.g.:

```
openstack flavor set --property hw:mem_page_size=large $FLAVOR_NAME
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
