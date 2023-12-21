---
sidebar_label: Nova
---
# Nova

## Disable & enable a compute service

```
openstack --os-cloud admin compute service set --disable --description MAINTENANCE testbed-node-0 nova-compute
```
```
openstack --os-cloud admin compute service list --long
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | MAINTENANCE                                        | False       |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
```

```
openstack --os-cloud admin compute service set --enable testbed-node-0 nova-compute
```

```
openstack --os-cloud admin compute service list
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | enabled  | up    | 2023-12-14T14:22:54.000000 |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+
```


## Force down & up a compute service

```
openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --down testbed-node-0 nova-compute
```

```
openstack --os-cloud admin compute service list --long
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | down  | 2023-12-14T14:21:47.000000 | None                                               | True        |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
```

```
openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --up testbed-node-0 nova-compute
```

```
openstack --os-cloud admin compute service list --long
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | None                                               | False       |
+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+
```

## Remove a compute service

1. Live migrate all instances running on the compute node
   with the help of the [OpenStack Resource Manager](./day2-operations/resource-manager#live-migration)

2. Evacuate all instances on the compute node
   with the help of the [OpenStack Resource Manager](./day2-operations/resource-manager#evacutation)

3. Ensure that no more instances are running on the compute node

   ```
   ps ax | grep qemu
   ```

4. Stop all OpenStack Nova services on the compute node

   ```
   systemctl stop kolla-nova_ssh-container.service
   systemctl stop kolla-nova_libvirt-container.service
   systemctl stop kolla-nova_compute-container.service

5. Delete the compute service

   ```
   $ openstack --os-cloud admin compute service list
   +--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+
   | ID                                   | Binary         | Host    | Zone     | Status   | State | Updated At                 |
   +--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+
   | f161d739-21de-4cb0-a5d3-d21cff652697 | nova-scheduler | manager | internal | enabled  | up    | 2023-12-21T11:52:59.000000 |
   | 646d16db-acd9-486c-bd16-8fe2c13bf198 | nova-conductor | manager | internal | enabled  | up    | 2023-12-21T11:53:04.000000 |
   | 90345eb5-cf2f-47ef-becc-758ee36fb132 | nova-compute   | manager | nova     | disabled | down  | 2023-12-21T11:53:00.000000 |
   +--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+
   $ openstack --os-cloud admin compute service delete 90345eb5-cf2f-47ef-becc-758ee36fb132
   ```
