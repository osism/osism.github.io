---
sidebar_label: Nova
---

# Nova

## Nested virtualisation

### AMD

```
echo "options kvm-amd nested=1" | sudo tee /etc/modprobe.d/kvm-nested-virtualization.conf
sudo modprobe -r kvm_amd
sudo modprobe kvm_amd
cat /sys/module/kvm_amd/parameters/nested
1
docker restart nova_libvirt
```

### Intel

```
echo "options kvm-intel nested=1" | sudo tee /etc/modprobe.d/kvm-nested-virtualization.conf
sudo modprobe -r kvm_intel
sudo modprobe kvm_intel
cat /sys/module/kvm_intel/parameters/nested
1
docker restart nova_libvirt
```
