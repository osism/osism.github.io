---
sidebar_label: Cinder
---

# Cinder

## Remove service

```
$ openstack --os-cloud admin volume service list
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
| Binary           | Host                              | Zone     | Status  | State | Updated At                 |
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
| cinder-scheduler | testbed-node-0                    | internal | enabled | up    | 2023-10-01T08:53:14.000000 |
| cinder-scheduler | testbed-node-1                    | internal | enabled | up    | 2023-10-01T08:53:15.000000 |
| cinder-scheduler | testbed-node-2                    | internal | enabled | up    | 2023-10-01T08:53:15.000000 |
| cinder-volume    | testbed-node-0@rbd-1              | nova     | enabled | down  | 2023-09-30T18:50:05.000000 |
| cinder-volume    | testbed-node-2@rbd-1              | nova     | enabled | down  | 2023-09-30T18:50:05.000000 |
| cinder-volume    | testbed-node-1@rbd-1              | nova     | enabled | down  | 2023-09-30T18:50:08.000000 |
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
```

```
$ docker exec -it cinder_api cinder-manage service remove cinder-volume testbed-node-0@rbd-1
Service cinder-volume on host testbed-node-0@rbd-1 removed.
$ docker exec -it cinder_api cinder-manage service remove cinder-volume testbed-node-1@rbd-1
Service cinder-volume on host testbed-node-1@rbd-1 removed.
$ docker exec -it cinder_api cinder-manage service remove cinder-volume testbed-node-2@rbd-1
Service cinder-volume on host testbed-node-2@rbd-1 removed.
```

```
dragon@mgr001:~$ openstack --os-cloud admin volume service list
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
| Binary           | Host                              | Zone     | Status  | State | Updated At                 |
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
| cinder-scheduler | testbed-node-0                    | internal | enabled | up    | 2023-10-01T08:56:24.000000 |
| cinder-scheduler | testbed-node-1                    | internal | enabled | up    | 2023-10-01T08:56:25.000000 |
| cinder-scheduler | testbed-node-2                    | internal | enabled | up    | 2023-10-01T08:56:25.000000 |
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
```
