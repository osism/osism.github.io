---
sidebar_label: Nova
---
# Nova

## Cleanup database

Purge database entries that are marked as deleted, that are older than
the date specified.

```console
docker exec -it nova_conductor bash
(nova-conductor)[root@testbed-node-0/]# nova-manage db archive_deleted_rows --before 2025-01-01
(nova-conductor)[root@testbed-node-0/]# nova-manage db purge --before 2025-01-01
```

## Get all servers on a node

```bash
openstack --os-cloud admin server list --all-projects --host testbed-node-0
```

## Stop all servers running on a node

```bash
for server in $(openstack --os-cloud admin server list --all-projects --host testbed-node-0 --vm-state active -f value -c ID | tr -d '\r'); do
    echo stopping server $server
    openstack --os-cloud admin server stop $server
    sleep 2
done
```

## Disable & enable a compute service

```bash
openstack --os-cloud admin compute service set --disable --description MAINTENANCE testbed-node-0 nova-compute
```

```console
openstack --os-cloud admin compute service list --long
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | MAINTENANCE                                        | False       |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
```

```bash
openstack --os-cloud admin compute service set --enable testbed-node-0 nova-compute
```

```console
openstack --os-cloud admin compute service list
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | enabled  | up    | 2023-12-14T14:22:54.000000 |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+
```


## Force down & up a compute service

```bash
openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --down testbed-node-0 nova-compute
```

```console
openstack --os-cloud admin compute service list --long
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | down  | 2023-12-14T14:21:47.000000 | None                                               | True        |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
```

```bash
openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --up testbed-node-0 nova-compute
```

```console
openstack --os-cloud admin compute service list --long
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | None                                               | False       |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
```

## Huge pages

```console
$ grep Huge /proc/meminfo
AnonHugePages:         0 kB
ShmemHugePages:        0 kB
FileHugePages:         0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:               0 kB
```

```console
$ sudo sudo hugeadm --pool-list
libhugetlbfs: ERROR: Line too long when parsing mounts
      Size  Minimum  Current  Maximum  Default
   2097152        0        0        0        *
1073741824        0        0        0
```

```text title="/etc/default/grub"
GRUB_CMDLINE_LINUX="default_hugepagesz=1G hugepagesz=1G hugepages=512 transparent_hugepage=never"
```

```bash
update-grub
reboot
```

```console
$ grep Huge /proc/meminfo
AnonHugePages:         0 kB
ShmemHugePages:        0 kB
FileHugePages:         0 kB
HugePages_Total:     512
HugePages_Free:      512
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:    1048576 kB
Hugetlb:        536870912 kB
```

```console
$ sudo hugeadm --pool-list
libhugetlbfs: ERROR: Line too long when parsing mounts
      Size  Minimum  Current  Maximum  Default
   2097152        0        0        0        *
1073741824      512      512      512
```

## Quality of Service (QoS)

* https://docs.openstack.org/nova/latest/admin/resource-limits.html

## Host aggregates

Host aggregates can be managed with the playbook. The playbook is used with
`osism apply -e openstack host-aggregates`.

Further arguments for host aggregates can be found in the
[documentation for the openstack.cloud.host_aggregate](https://docs.ansible.com/ansible/latest/collections/openstack/cloud/host_aggregate_module.html) Ansible module.

```yaml title="environments/openstack/playbook-host-aggregates.yml"
---
- name: Manage host aggregates
  hosts: localhost
  connection: local

  vars:
    host_aggregates:
      - name: aggregate1
        hosts:
          - host1
          - host2
          - host3

  tasks:
    - name: Create host aggregate
      openstack.cloud.host_aggregate:
        cloud: admin
        state: present
        name: "{{ item.name }}"
        hosts: "{{ item.hosts }}"
      loop: "{{ host_aggregates }}"
```
