---
sidebar_label: Ceph
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem

# Ceph

The official Ceph documentation is located on https://docs.ceph.com/en/latest/rados/configuration/

It is **strongly advised** to use the documentation for the version being used.

* Pacific - https://docs.ceph.com/en/pacific/rados/configuration/
* Quincy - https://docs.ceph.com/en/quincy/rados/configuration/
* Reef - https://docs.ceph.com/en/reef/rados/configuration/

Its a good idea to review all options in the follwing list.


## Unique Identifier

The File System ID is a unique identifier for the cluster.
The identifier is set via the parameter `fsid` in `environments/ceph/configuration.yml`
and must be unique. It can be generated with `uuidgen`.

```yaml title="environments/ceph/configuration.yml"
fsid: c2120a4a-669c-4769-a32c-b7e9d7b848f4
```

## Configure the mon address on the mon nodes

Set the variable `monitor_address` in the inventory files of the mon hosts to give ceph-ansible the
advise which ip adress should be used to reach the monitor instances.
(`inventory/host_vars/<HOSTNAME>.yml`).

## Client

The `client.admin` keyring is placed in the file `environments/infrastructure/files/ceph/ceph.client.admin.keyring`.

## Systemctl Parameters, Swappiness and Friends

The swappiness is set via the `os_tuning_params` dictionary. The dictionary can
only be completely overwritten via an entry in the file `environments/ceph/configuration.yml`.

By default, the dictionary looks like this. If the swappiness of `10` is to be used, it is not
necessary to add the `os_tuning_params` dictionary to the configuration repository. This is only
necessary if the swappiness is to be customised.

```yaml title="environments/ceph/configuration.yml"
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

## RGW service

1. Add following configuration in `environments/ceph/configuration.yml`

   ```yaml title="environments/ceph/configuration.yml"
   ceph_conf_overrides:
     "client.rgw.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
       "rgw content length compat": "true"
       "rgw enable apis": "swift, s3, admin"
       "rgw keystone accepted roles": "member, admin"
       "rgw keystone accepted admin roles": "admin"
       "rgw keystone admin domain": "default"
       "rgw keystone admin password": "{{ ceph_rgw_keystone_password }}"
       "rgw keystone admin project": "service"
       "rgw keystone admin tenant": "service"
       "rgw keystone admin user": "ceph_rgw"
       "rgw keystone api version": "3"
       "rgw keystone url": "https://api-int.testbed.osism.xyz:5000"
       "rgw keystone verify ssl": "false"
       "rgw keystone implicit tenants": "true"
       "rgw s3 auth use keystone": "true"
       "rgw swift account in url": "true"
       "rgw swift versioning enabled": "true"
   ```

   If the `ceph_conf_overrides` parameter already exists in `environments/ceph/configuration.yml`,
   expand it and do not overwrite it.

   If self-signed SSL certificates are used, two additional parameters must be set.

   ```yaml title="environments/ceph/configuration.yml"
    "rgw keystone verify ssl": "false"
    "rgw verify ssl": "false"
   ```

   For all possible configuration parameters visit the
   [Ceph configuration reference](https://docs.ceph.com/en/quincy/radosgw/config-ref/).

2. Add the `ceph_rgw_keystone_password` from `environments/kolla/secrets.yml` to
   `environments/ceph/secrets.yml`.

3. Add following configuration in `environments/kolla/configuration.yml`

   ```yaml title="environments/kolla/configuration.yml"
   enable_ceph_rgw: true
   enable_ceph_rgw_keystone: true

   ceph_rgw_swift_compatibility: false
   ceph_rgw_swift_account_in_url: true
   ```
4. On the nodes on which the RGW service is to be deployed, `radowsgw_interface` **or**
   `radosgw_address` must be set in the host vars for the nodes in the inventory.
   If `radowsgw_interface` is used, the first IPv4 address on this interface is used.

   ```yaml title=inventory/host_vars/testbed-node-0.testbed.osism.xyz/vars.yml
   ##########################################################
   # ceph

   radosgw_address: 192.168.16.10
   ```

5. The nodes on which the RGW service is to be deployed can be defined in inventory group
   `ceph-rgw`. By default, the RGW services are deployed on the Ceph control nodes..

   ```ini title="inventory/20-roles"
   [ceph-rgw:children]
   ceph-control
   ```

## Configuration of custom ceph pools

Extra pools can be defined via the `openstack_pools_extra` parameter.

```yaml title="inventory/group_vars/generic/ceph.yml"
openstack_cinder_extra001_pool:
  name: extra001
  pg_num: "{{ openstack_pool_default_pg_num }}"
  pgp_num: "{{ openstack_pool_default_pg_num }}"
  rule_name: "replicated_rule"
  min_size: "{{ openstack_pool_default_min_size }}"
  application: "rbd"

openstack_pools_extra:
  - "{{ openstack_cinder_extra001_pool }}"
```

If more than one Ceph cluster is managed with one manager, do not place the
parameters in `inventory/group_vars/generic` but in a corresponding directory.

If, for example, the inventory group of the Ceph cluster on which the additional
pools are to be created is `ceph.rbd`, then the parameters would be stored in
`inventory/group_vars/ceph.rbd.yml` accordingly.

| Parameter                         | Default value |
|:----------------------------------|:--------------|
| `openstack_pool_default_pg_num`   | 64            |
| `openstack_pool_default_min_size` | 0             |

## OSD devices

For more advanced OSD layout requirements leave out the `devices` key
and instead use `lvm_volumes`. Details for this can be found on the
[OSD Scenario](https://docs.ceph.com/projects/ceph-ansible/en/latest/osds/scenarios.html) documentation.

In order to aid in creating the `lvm_volumes` config entries and provision the LVM devices for them,
OSISM has the two playbooks `ceph-configure-lvm-volumes` and `ceph-create-lvm-devices` available.
TODO: add reference to https://docs.ceph.com/en/latest/rados/operations/pgcalc/ and PG autocaler dryrun

### Configure the device layout

For each Ceph storage node edit the file `inventory/host_vars/<nodename>.yml`
add a configuration like the following to it. Ensure that no `devices` parameter
is present in the file.

**General information about the parameters**

* With the optional parmaeter `ceph_osd_db_wal_devices_buffer_space_percent` it is possible to
  set the percentage of VGs to leave free. The parameter is not set by default. Can be helpful
  for SSD performance of some older SSD models or to extend lifetime of SSDs in general.

  ```yaml
  ceph_osd_db_wal_devices_buffer_space_percent: 10
  ```
* It is possible to configure the devices to be used with the parameters `ceph_osd_devices`,
  `ceph_db_devices`, `ceph_wal_devices`, and `ceph_db_wal_devices`. This is described below.
* It is always possible to use device names such as `sda` or device IDs such as
  `disk/by-id/wwn-<something>` or `disk/by-id/nvme-eui.<something>`.
  The top level dierectory `/dev/` is not prefixed and is added automatically.
* The `db_size` parameter is optional and defaults to `(VG size - buffer space (if enabled)) / num_osds`.
* The `wal_size` parameter is optional and defaults to `2 GB`.
* The `num_osds` parameter specifies the maximum number of OSDs that can be assigned to a WAL device or DB device.
* The optional parameter `wal_pv` can be used to set the device that is to be used as the WAL device.
* The optional parameter `db_pv` can be used to set the device that is to be used as the DB device.

**Layout variants**

OSISM basically utilizes LVM volumes for all OSD setup variants.

<Tabs>

<TabItem value="osd_only" label="OSD only">

This variant does not use a dedicated wal- or db-device.
This is the most simple variant and this variant can be used if you use a all-flash setup with NVMes.

The `sda` device will be used as an OSD device without WAL and DB volume device.

```yaml
ceph_osd_devices:
  sda:
```
</TabItem>

<TabItem value="osd_and_db" label="OSD + DB device">

The `nvme0n1` device will be used as an source for DB device volumes.
With the configured values the provisioning mechanism creates 6 logical volumes of 30GB size each on the nvme which can
be used for 6 OSD instances.

 ```yaml
 ceph_db_devices:
   nvme0n1:
     num_osds: 6
     db_size: 30 GB
 ```

The devices `sda` up to `sdf` will use the previously defined DB volumes from `nvme0n1` for the listed OSD instances.

 ```yaml
 ceph_osd_devices:
    sda:
      db_pv: nvme0n1
    ...
    sdf:
      db_pv: nvme0n1
 ```
</TabItem>

<TabItem value="osd_and_wal" label="OSD + WAL device">

The `nvme0n1` device will be used as an source for WAL device volumes.
With the configured values the provisioning mechanism creates 6 logical volumes of 2B size each on `nvme0n1` which can
be used for 6 OSD instances.


```yaml
ceph_wal_devices:
  nvme0n1:
    num_osds: 6
    wal_size: 2 GB
```

The devices `sda` up to `sdf` will use the previously defined WAL volumes from `nvme0n1` for the listed OSD instances.

```yaml
ceph_osd_devices:
   sda:
     wal_pv: nvme0n1
```
</TabItem>

<TabItem value="osd_and_wal" label="OSD and DB + WAL on same device">

The `nvme0n1` device will be used as an source for WAL and DB device volumes.
With the configured values the provisioning mechanism creates 6 logical DB volumes of 30GB and 6 logical WAL volumes of 2B size each
on `nvme0n1` which can be used for 6 OSD instances.


The `nvme0n1` device will be used as an DB device and a WAL device. It is possible to use those devices for up
to 6 OSDs.

```yaml
ceph_db_wal_devices:
  nvme0n1:
    num_osds: 6
    db_size: 30 GB
    wal_size: 2 GB
```

The `sda` device will be used as an OSD device with `nvme0n1` as DB device and `nvme0n1` as WAL device.

```yaml
ceph_osd_devices:
   sda:
     db_pv: nvme0n1
     wal_pv: nvme0n1
```

In the example shown here, both the data structures for the RocksDB and for the write-ahead log are placed on the faster NVMe device.
(This is described in the [Ceph documentation](https://docs.ceph.com/en/latest/rados/configuration/bluestore-config-ref/) as "...whenever a DB device is specified but an explicit WAL device is not, the WAL will be implicitly colocated with the DB on the faster device...").

</TabItem>

<TabItem value="osd_and_wal" label="OSD and DB + WAL different device">

The `nvme0n1` device will be used as an source for WAL and `nvme1n1` for DB device volumes.
With the configured values the provisioning mechanism creates 6 logical volumes of 30 GB and 6 logical WAL volumes of 2B size each.

```yaml
ceph_db_devices:
  nvme0n1:
    num_osds: 6
    db_size: 30 GB
```

The `nvme1n1` device will be used as an WAL device. It is possible to use this WAL device for up to 6 OSDs. Each
OSD is provided with 2 GB.

```yaml
ceph_wal_devices:
  nvme1n1:
    num_osds: 6
    wal_size: 2 GB
```

The `sda` device will be used as an OSD device with `nvme0n1` as DB device and `nvme1n1` as WAL device.

```yaml
ceph_osd_devices:
   sda:
     db_pv: nvme0n1
     wal_pv: nvme1n1
```
</TabItem>

</Tabs>

### Provision the configured layout

1. Commit and push the configuration to your configuration repository
2. Establish the changed configuration
   Make sure that you do not have any open changes on the manager node either, as these will be discarded during this step.
   ```
   $ osism apply configuration
   $ osism reconciler sync
   $ osism apply facts
   ```

3. After the configuration has been pulled and facts updated,
   you can run the LVM configuration playbook:

   ```
   $ osism apply ceph-configure-lvm-volumes
   ```

   This will generate a new configuration file for each node in `/tmp` 
   on the first manager node named `<nodename>-ceph-lvm-configuration.yml`.

4. Take the generated configuration file from `/tmp` and **replace the previously
   configuration** for each node.

   In this example, the following content was in the host vars file before
   `osism apply ceph-configure-lvm-volumes` was called.

   ```yaml
   ceph_osd_devices:
     sdb:
     sdc:
   ```

   The following content has now been generated in the file in the `/tmp` directory by running
   `osism apply ceph-configure-lvm-volumes`.

   ```yaml
   ceph_osd_devices:
     sdb:
       osd_lvm_uuid: 196aad32-7cc4-5350-8a45-1b03f50fc9bb
     sdc:
       osd_lvm_uuid: c6df96be-1264-5815-9cb2-da5eb453a6de
   lvm_volumes:
   - data: osd-block-196aad32-7cc4-5350-8a45-1b03f50fc9bb
     data_vg: ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb
   - data: osd-block-c6df96be-1264-5815-9cb2-da5eb453a6de
     data_vg: ceph-c6df96be-1264-5815-9cb2-da5eb453a6de
   ```

   This content from the file in the `/tmp` directory is added in the host vars file.
   The previous `ceph_osd_devices` is replaced with the new content.

5. Commit and push the configuration to your configuration repository **again**
6. Establish the changed configuration
   Make sure that you do not have any open changes on the manager node either, as these will be discarded during this step.
   ```
   $ osism apply configuration
   $ osism reconciler sync
   ```

7. Finally create the LVM devices.

   ```
   $ osism apply ceph-create-lvm-devices
   ```

   These PVs, VGs and LVs are created using the example from step 4.

   ```
   $ sudo pvs
     PV         VG                                        Fmt  Attr PSize   PFree
     /dev/sdb   ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb lvm2 a--  <20.00g    0
     /dev/sdc   ceph-c6df96be-1264-5815-9cb2-da5eb453a6de lvm2 a--  <20.00g    0

   $ sudo vgs
     VG                                        #PV #LV #SN Attr   VSize   VFree
     ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb   1   1   0 wz--n- <20.00g    0
     ceph-c6df96be-1264-5815-9cb2-da5eb453a6de   1   1   0 wz--n- <20.00g    0

   $ sudo lvs
     LV                                             VG                                        Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
     osd-block-196aad32-7cc4-5350-8a45-1b03f50fc9bb ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb -wi-a----- <20.00g
     osd-block-c6df96be-1264-5815-9cb2-da5eb453a6de ceph-c6df96be-1264-5815-9cb2-da5eb453a6de -wi-a----- <20.00g
   ```

7. Everything is now ready for the deployment of the OSDs.
   Details on deploying Ceph in the [Ceph deploy guide](../deploy-guide/services/ceph).

### Full examples

#### Use of dedicated DB devices

The `ceph_osd_devices` and `ceph_db_devices` parameters with the following content are initially added
in the host vars of the node. Devices `/dev/sda` and `/dev/sdb` are used as OSD devices. The device `/dev/sdd`
is used as a DB device for up to 2 OSDs. For each OSD that uses `/dev/sdd` as DB device, an LV volume of
(in this case) 5 GByte is created Please note that at least 30 GByte must be used for a DB device in production.

```yaml
ceph_db_devices:
  sdd:
    num_osds: 2
    db_size: 5 GB

ceph_osd_devices:
  sdb:
    db_pv: sdd
  sdc:
    db_pv: sdd
```

Then generate the required LVM2 device configuration with the `ceph-configure-lvm-volumes` play.

```
osism apply facts
osism reconciler sync
osism apply ceph-configure-lvm-volumes
```

Check the `/tmp` directory on the manager node for files like `testbed-node-0.testbed.osism.xyz-ceph-lvm-configuration.yml`.
Add this content to the host vars of the correspondingnode. The existing `ceph_osd_devices` parameter is replaced.

```yaml
---
#
# This is Ceph LVM configuration for testbed-node-0.testbed.osism.xyz
# generated by ceph-configure-lvm-volumes playbook.
#
ceph_db_devices:
  sdd:
    db_size: 5 GB
    num_osds: 2
    vg_name: ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb
ceph_osd_devices:
  sdb:
    db_pv: sdd
    osd_lvm_uuid: 75960289-2e0e-525d-8bb5-dd8552531ef5
  sdc:
    db_pv: sdd
    osd_lvm_uuid: ce2c2cb6-f911-52dd-b57f-4476bf7afe9f
lvm_volumes:
- data: osd-block-75960289-2e0e-525d-8bb5-dd8552531ef5
  data_vg: ceph-75960289-2e0e-525d-8bb5-dd8552531ef5
  db: osd-db-75960289-2e0e-525d-8bb5-dd8552531ef5
  db_vg: ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb
- data: osd-block-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f
  data_vg: ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f
  db: osd-db-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f
  db_vg: ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb
```

Finally, create the necessary PVs, VGs and LVs. The parameter `-e ignore_db_too_small=true` is only set
here in the example because we use less than 30 GByte for the size of the DB LV.

```
osism reconciler sync
osism apply ceph-create-lvm-devices -e ignore_db_too_small=true
```

You can check the PVs, VGs, and LVs on the node.

```
$ sudo pvs
  PV         VG                                           Fmt  Attr PSize   PFree
  /dev/sdb   ceph-75960289-2e0e-525d-8bb5-dd8552531ef5    lvm2 a--  <20.00g      0
  /dev/sdc   ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f    lvm2 a--  <20.00g      0
  /dev/sdd   ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb lvm2 a--  <20.00g <10.00g

$ sudo vgs
  VG                                           #PV #LV #SN Attr   VSize   VFree
  ceph-75960289-2e0e-525d-8bb5-dd8552531ef5      1   1   0 wz--n- <20.00g      0
  ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f      1   1   0 wz--n- <20.00g      0
  ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb   1   2   0 wz--n- <20.00g <10.00g

$ sudo lvs
  LV                                             VG                                           Attr       LSize   [...]
  osd-block-75960289-2e0e-525d-8bb5-dd8552531ef5 ceph-75960289-2e0e-525d-8bb5-dd8552531ef5    -wi-a----- <20.00g
  osd-block-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f    -wi-a----- <20.00g
  osd-db-75960289-2e0e-525d-8bb5-dd8552531ef5    ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb -wi-a-----   5.00g
  osd-db-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f    ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb -wi-a-----   5.00g
```

#### Use of partitions

The use of partitions presented in this example is not recommended for use in production but only for POCs.

First create partitions that should be used for Ceph. In this example we use a block device `/dev/sdb`
with four partitions that will be used for Ceph OSDs.

```
$ sudo fdisk -l /dev/sdb
Disk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 709B8C6C-51E1-4644-9ED4-0604607FCCEE

Device        Start      End  Sectors Size Type
/dev/sdb1      2048 10487807 10485760   5G Linux filesystem
/dev/sdb2  10487808 20973567 10485760   5G Linux filesystem
/dev/sdb3  20973568 31459327 10485760   5G Linux filesystem
/dev/sdb4  31459328 41943006 10483679   5G Linux filesystem
```

The `ceph_osd_devices` parameter with the following content is initially added in the host vars of the node.
The partitions `/dev/sda1`, `/dev/sdb1`, `/dev/sdc1` and `/dev/sdd1`, are to be used as OSD.

```yaml
ceph_osd_devices:
  sdb1:
  sdb2:
  sdb3:
  sdb4:
```

Then generate the required LVM2 device configuration with the `ceph-configure-lvm-volumes` play.

```
osism apply facts
osism reconciler sync
osism apply ceph-configure-lvm-volumes
```

Check the `/tmp` directory on the manager node for files like `testbed-node-0.testbed.osism.xyz-ceph-lvm-configuration.yml`.
Add this content to the host vars of the correspondingnode. The existing `ceph_osd_devices` parameter is replaced.

```yaml
---
#
# This is Ceph LVM configuration for testbed-node-0.testbed.osism.xyz
# generated by ceph-configure-lvm-volumes playbook.
#
ceph_osd_devices:
  sdb1:
    osd_lvm_uuid: 9e8799ae-c716-5212-8833-49f153ffbcef
  sdb2:
    osd_lvm_uuid: 8518d3a2-3194-5764-b55a-c51222b9b576
  sdb3:
    osd_lvm_uuid: a0da232a-e5b8-5823-8c42-8fb231442edc
  sdb4:
    osd_lvm_uuid: 56f7b5bc-82b0-5626-90a5-adf6078ceba6
lvm_volumes:
- data: osd-block-9e8799ae-c716-5212-8833-49f153ffbcef
  data_vg: ceph-9e8799ae-c716-5212-8833-49f153ffbcef
- data: osd-block-8518d3a2-3194-5764-b55a-c51222b9b576
  data_vg: ceph-8518d3a2-3194-5764-b55a-c51222b9b576
- data: osd-block-a0da232a-e5b8-5823-8c42-8fb231442edc
  data_vg: ceph-a0da232a-e5b8-5823-8c42-8fb231442edc
- data: osd-block-56f7b5bc-82b0-5626-90a5-adf6078ceba6
  data_vg: ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6
```

Finally, create the necessary PVs, VGs and LVs.

```
osism reconciler sync
osism apply ceph-create-lvm-devices
```

You can check the PVs, VGs, and LVs on the node.

```
$ sudo pvs
  PV         VG                                        Fmt  Attr PSize  PFree
  /dev/sdb1  ceph-9e8799ae-c716-5212-8833-49f153ffbcef lvm2 a--  <5.00g    0
  /dev/sdb2  ceph-8518d3a2-3194-5764-b55a-c51222b9b576 lvm2 a--  <5.00g    0
  /dev/sdb3  ceph-a0da232a-e5b8-5823-8c42-8fb231442edc lvm2 a--  <5.00g    0
  /dev/sdb4  ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6 lvm2 a--  <5.00g    0

$ sudo vgs
  VG                                        #PV #LV #SN Attr   VSize  VFree
  ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6   1   1   0 wz--n- <5.00g    0
  ceph-8518d3a2-3194-5764-b55a-c51222b9b576   1   1   0 wz--n- <5.00g    0
  ceph-9e8799ae-c716-5212-8833-49f153ffbcef   1   1   0 wz--n- <5.00g    0
  ceph-a0da232a-e5b8-5823-8c42-8fb231442edc   1   1   0 wz--n- <5.00g    0

$ sudo lvs
  LV                                             VG                                        Attr       LSize  [...]
  osd-block-56f7b5bc-82b0-5626-90a5-adf6078ceba6 ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6 -wi-a----- <5.00g
  osd-block-8518d3a2-3194-5764-b55a-c51222b9b576 ceph-8518d3a2-3194-5764-b55a-c51222b9b576 -wi-a----- <5.00g
  osd-block-9e8799ae-c716-5212-8833-49f153ffbcef ceph-9e8799ae-c716-5212-8833-49f153ffbcef -wi-a----- <5.00g
  osd-block-a0da232a-e5b8-5823-8c42-8fb231442edc ceph-a0da232a-e5b8-5823-8c42-8fb231442edc -wi-a----- <5.00g
```

## Dashboard

Password for the admin user of the Ceph dashboard is set via `ceph_dashboard_password`.

```yaml title="environments/ceph/secrets.yml"
ceph_dashboard_password: password
```

User name of the admin user, port and listen IP address can be set via additional parameters.

```yaml title="environments/ceph/configuration.yml"
ceph_dashboard_addr: 0.0.0.0
ceph_dashboard_port: 7000
ceph_dashboard_username: admin
```

The Ceph dashboard is bootstrapped with the `ceph-bootstrap-dashboard` play.

```
$ osism apply ceph-bootstrap-dashboard
```

### Configuring the openstack loadbalancer to expose the ceph dashboard

The ceph dashboard runs in an active/standby configuration. In its default standby instances will
redirect to the active instance. Most deployments will want to use the openstack loadbalancer to
expose the ceph dashboard on the internal network and direct traffic directly to the active
instance.

In this scenario the dashboard should be configured to return an http error with status `404` on
standby instances.

```yaml title="environments/ceph/configuration.yml"
ceph_dashboard_standby_behaviour: error
ceph_dashboard_standby_error_status_code: 404
```

Create a loadbalancer configuration

```jinja2 title="environments/kolla/files/overlays/haproxy/services.d/ceph_dashboard.cfg"

{%- set internal_tls_bind_info = 'ssl crt /etc/haproxy/certificates/haproxy-internal.pem' if kolla_enable_tls_internal|bool else '' %}

listen ceph_dashboard
  option httpchk
  http-check expect status 200,404
  http-check disable-on-404
  {{ "bind %s:%s %s"|e|format(kolla_internal_vip_address, 8140, internal_tls_bind_info)|trim() }}
{% for host in groups['ceph-mgr'] %}
  server {{ hostvars[host]['ansible_facts']['hostname'] }} {{ hostvars[host]['monitor_address'] }}:7000 check inter 2000 rise 2 fall 5
{% endfor %}
```

and apply it.

```
$ osism apply -a reconfigure loadbalancer
```

## Second Ceph cluster

With OSISM, it is possible to manage any number of independent Ceph clusters via a single OSISM
manager service using sub-environments. A sub environment is basically nothing more than another directory
below the `environments` directory of the configuration repository with a special name.

A sub-environment for Ceph always has the name `ceph.NAME`. The `ceph.NAME` directory in the
configuration repository then contains the `configuration.yml`, `images.yml` and `secrets.yml`
files as usual.

In this example, a sub-environment `ceph.rgw` is created which is used for a Ceph cluster that
will only be used as an RGW cluster.

In comparison to the normal `ceph` environment, the groups to be used must be overwritten for a
Ceph sub-environment. In this case, two groups are defined: `ceph.rgw` and `ceph.rgw.empty`.
Any other groups can be used, e.g. `ceph.rgw.osd`. It is recommended to base the name of the
groups on the name of the sub-environments.

The `ceph.rgw.empty` group is important because there are plays in ceph-ansible that are executed
when nodes are in a specific group. To explicitly avoid this, certain groups are set to the empty
group.

All available group name parameters are listed in the [[099-ceph.yml]](https://github.com/osism/defaults/blob/main/all/099-ceph.yml)
file of the [osism/defaults](https://github.com/osism/defaults) repository.

```yaml title="environments/ceph.rgw/configuration.yml"
##########################
# groups

ceph_group_name: ceph.rgw

client_group_name: ceph.rgw
grafana_server_group_name: ceph.rgw
iscsi_gw_group_name: ceph.rgw.empty
mds_group_name: ceph.rgw.empty
mgr_group_name: ceph.rgw
mon_group_name: ceph.rgw
nfs_group_name: ceph.rgw.empty
osd_group_name: ceph.rgw
rbdmirror_group_name: ceph.rgw.empty
restapi_group_name: ceph.rgw.empty
rgw_group_name: ceph.rgw
rgwloadbalancer_group_name: ceph.rgw.empty
```

The groups used are then added in the inventory in the `10-custom` file.

```ini title="inventory/10-custom"
[ceph.rgw]
testbed-node-3.testbed.osism.xyz
testbed-node-4.testbed.osism.xyz
testbed-node-5.testbed.osism.xyz

[ceph.rgw.empty]
```

The sub environment can then be specified with all `apply` commands of the OSISM CLI. For example,
to deploy the Ceph mon services of the `ceph.rgw` sub environment:

```
osism apply --sub rgw ceph-osds
```

## Resource limits

Resource limits for the individual Ceph services can be set via `environments/ceph/configuration.yml`.
The possible parameters and their defaults for memory limits and CPU limits are listed below.

* Memory limits

  ```yaml
  ceph_mds_docker_memory_limit: "{{ ansible_facts['memtotal_mb'] }}m"
  ceph_mgr_docker_memory_limit: "{{ ansible_facts['memtotal_mb'] }}m"
  ceph_mon_docker_memory_limit: "{{ ansible_facts['memtotal_mb'] }}m"
  ceph_osd_docker_memory_limit: "{{ ansible_facts['memtotal_mb'] }}m"
  ceph_rbd_mirror_docker_memory_limit: "{{ ansible_facts['memtotal_mb'] }}m"
  ceph_rgw_docker_memory_limit: "4096m"
  ```

* CPU limits

  ```yaml
  ceph_mds_docker_cpu_limit: 4
  ceph_mgr_docker_cpu_limit: 1
  ceph_mon_docker_cpu_limit: 1
  ceph_osd_docker_cpu_limit: 4
  ceph_rbd_mirror_docker_cpu_limit: 1
  ceph_rgw_docker_cpu_limit: 8
  ```

## CPU Pinning

CPU pinning and specifying the NUMA nodes to be used for the Ceph OSD and RGW services can be
set via `environments/ceph/configuration.yml`.
The possible parameters and possible values are listed below. The parameters are not enabled
by default.

* Limit the specific CPUs or cores a container can use. A comma-separated list or
  hyphen-separated range of CPUs a container can use, if you have more than one CPU.
  The first CPU is numbered 0. A valid value might be 0-3 (to use the first, second,
  third, and fourth CPU) or 1,3 (to use the second and fourth CPU).

  ```yaml
  # ceph_osd_docker_cpuset_cpus: "0,2,4,6,8,10,12,14,16"
  # ceph_rgw_docker_cpuset_cpus: "0,2,4,6,8,10,12,14,16"
  ```

* Memory nodes in which to allow execution (e.g. 0-3, 0,1). Only effective on NUMA systems.

  ```yaml
  # ceph_osd_docker_cpuset_mems: "0"
  # ceph_rgw_docker_cpuset_mems: "0"
  ```

  Available NUMA nodes on a node can be displayed with [numactl](https://github.com/numactl/numactl).
  In this example, there are 2 NUMA nodes. The pinned CPUs should all be assigned to the
  specified NUMA node.

  ```
  # numactl --hardware
  available: 2 nodes (0-1)
  node 0 cpus: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59
  node 0 size: 515581 MB
  node 0 free: 511680 MB
  node 1 cpus: 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79
  node 1 size: 516078 MB
  node 1 free: 511865 MB
  node distances:
  node   0   1
    0:  10  20
    1:  20  10
  ```
