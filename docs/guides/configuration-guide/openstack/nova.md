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
