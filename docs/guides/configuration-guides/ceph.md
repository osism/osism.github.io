---
sidebar_label: Ceph
sidebar_position: 10
---

# Ceph

## Client

In order to use the Ceph client on the manager node, the IP addresses of the Ceph
monitor services, usually they run on the Ceph control plane, are added in
`environments/infrastructure/configuration.yml` first.

```yaml title="environments/infrastructure/configuration.yml"
##########################
# cephclient

cephclient_mons:
  - 192.168.16.10
  - 192.168.16.11
  - 192.168.16.12
```

The `client.admin` keyring is placed in the file `environments/infrastructure/files/ceph/ceph.client.admin.keyring`.

## Swappiness

The swappiness is set via the `os_tuning_params` dictionary. The dictionary can
only be completely overwritten via an entry in the file `environments/ceph/configuration.yml`.

By default, the dictionary looks like this:

```
os_tuning_params:
  - { name: fs.file-max, value: 26234859 }
  - { name: vm.zone_reclaim_mode, value: 0 }
  - { name: vm.swappiness, value: 10 }
  - { name: vm.min_free_kbytes, value: "{{ vm_min_free_kbytes }}" }
```

The sysctl paremeters are written to the file `/etc/sysctl.d/ceph-tuning.conf`
on the storage nodes.

```
# cat /etc/sysctl.d/ceph-tuning.conf
fs.aio-max-nr=1048576
fs.file-max=26234859
vm.zone_reclaim_mode=0
vm.swappiness=10
vm.min_free_kbytes=4194303
```
