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
