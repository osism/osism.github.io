---
sidebar_label: Cinder
---

# Cinder

## Cleanup database

Purge database entries that are marked as deleted, that are older than
the number of days specified.

```
docker exec -it cinder_api bash
(cinder-api)[root@testbed-node-0/]# cinder-manage db purge 30
```

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
$ openstack --os-cloud admin volume service list
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
| Binary           | Host                              | Zone     | Status  | State | Updated At                 |
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
| cinder-scheduler | testbed-node-0                    | internal | enabled | up    | 2023-10-01T08:56:24.000000 |
| cinder-scheduler | testbed-node-1                    | internal | enabled | up    | 2023-10-01T08:56:25.000000 |
| cinder-scheduler | testbed-node-2                    | internal | enabled | up    | 2023-10-01T08:56:25.000000 |
+------------------+-----------------------------------+----------+---------+-------+----------------------------+
```

## Sync quota

It can happen that more block storage usage is stored in the database for a project than
is actually used. This can be corrected using [cinder-manage](https://docs.openstack.org/cinder/latest/cli/cinder-manage.html).

For all projects:

```
$ docker exec -it cinder_api cinder-manage quota sync
```

Only for a specific project:

```
$ docker exec -it cinder_api cinder-manage quota sync --project-id PROJECT_ID
```

## Quality of Service (QoS)

* https://docs.openstack.org/cinder/latest/admin/basic-volume-qos.html

Create `default` volume QoS policy that allows 1000 read IOPS and 1000 write IOPS.

```
$ openstack --os-cloud admin volume qos create \
    --consumer both \
    --property read_iops_sec=1000 \
    --property write_iops_sec=1000 \
    default
+------------+---------------------------------------------+
| Field      | Value                                       |
+------------+---------------------------------------------+
| consumer   | both                                        |
| id         | 48920d26-e85f-4920-8ed4-ff8d322c77b9        |
| name       | testing                                     |
| properties | read_iops_sec='1000', write_iops_sec='1000' |
+------------+---------------------------------------------+
```

```
$ openstack --os-cloud admin volume qos list
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
| ID                                   | Name    | Consumer | Associations | Properties                                  |
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
| 48920d26-e85f-4920-8ed4-ff8d322c77b9 | default | both     |              | read_iops_sec='1000', write_iops_sec='1000' |
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
```

Assign the `default` volume QoS policy to the `__DEFAULT` volume type.

```
$ openstack --os-cloud admin volume qos associate default __DEFAULT__
```

```
$ openstack --os-cloud admin volume qos list
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
| ID                                   | Name    | Consumer | Associations | Properties                                  |
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
| 48920d26-e85f-4920-8ed4-ff8d322c77b9 | default | both     | __DEFAULT__  | read_iops_sec='1000', write_iops_sec='1000' |
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
```

Change the read IOPS from 1000 to 2000 and the write IOPS from 1000 to 2000 of the `default` volume QoS policy.

```
$ openstack --os-cloud admin volume qos set \
    --property read_iops_sec=2000 \
    --property write_iops_sec=2000 \
    default
```

```
$ openstack --os-cloud admin volume qos list
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
| ID                                   | Name    | Consumer | Associations | Properties                                  |
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
| 48920d26-e85f-4920-8ed4-ff8d322c77b9 | default | both     | __DEFAULT__  | read_iops_sec='2000', write_iops_sec='2000' |
+--------------------------------------+---------+----------+--------------+---------------------------------------------+
```

The following properties are available.

For Fixed IOPS per volume:
* `read_iops_sec`
* `write_iops_sec`
* `total_iops_sec`

For Burst IOPS per volume:
* `read_iops_sec_max`
* `write_iops_sec_max`
* `total_iops_sec_max`

For Fixed bandwidth per volume:
* `read_bytes_sec`
* `write_bytes_sec`
* `total_bytes_sec`

For Burst bandwidth per volume:
* `read_bytes_sec_max`
* `write_bytes_sec_max`
* `total_bytes_sec_max`

For burst bucket size:
* `size_iops_sec`
