---
sidebar_label: Ceph
sidebar_position: 40
---

# Ceph

## Unique Identifier

The File System ID is a unique identifier for the cluster.
The identifier is set via the parameter `fsid` in `environments/ceph/configuration.yml`
and must be unique. It can be generated with `uuidgen`.

```yaml title="environments/ceph/configuration.yml"
fsid: c2120a4a-669c-4769-a32c-b7e9d7b848f4
```

## Client

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

## Extra pools

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

## LVM devices

For more advanced OSD layout requirements leave out the `devices` key
and instead use `lvm_volumes`. Details for this can be found on the
[OSD Scenario](https://docs.ceph.com/projects/ceph-ansible/en/latest/osds/scenarios.html) documentation.

In order to aid in creating the `lvm_volumes` config entries and provision the LVM devices for them,
OSISM has the two playbooks `ceph-configure-lvm-volumes` and `ceph-create-lvm-devices` available.

1. For each Ceph storage node edit the file `inventory/host_vars/<nodename>.yml`
   add a configuration like the following to it. Ensure that no `devices` parameter
   is present in the file.

   1. Parameters

      * With the optional parmaeter `ceph_osd_db_wal_devices_buffer_space_percent` it is possible to
        set the percentage of VGs to leave free. The parameter is not set by default. Can be helpful
        for SSD performance of some older SSD models or to extend lifetime of SSDs in general.

        ```yaml
        ceph_osd_db_wal_devices_buffer_space_percent: 10
        ```
      * It is possible to configure the devices to be used with the parameters `ceph_osd_devices`,
        `ceph_db_devices`, `ceph_wal_devices`, and `ceph_db_wal_devices`. This is described below.
      * It is always possible to use device names such as `sda` or device IDs such as
        `disk/by-id/wwn-<something>` or `disk/by-id/nvme-eui.<something>`. `/dev/` is not
        prefixed and is added automatically.
      * The `db_size` parameter is optional and defaults to `(VG size - buffer space (if enabled)) / num_osds`.
      * The `wal_size` parameter is optional and defaults to `2 GB`.
      * The `num_osds` parameter specifies the maximum number of OSDs that can be assigned to a WAL device or DB device.
      * The optional parameter `wal_pv` can be used to set the device that is to be used as the WAL device.
      * The optional parameter `db_pv` can be used to set the device that is to be used as the DB device.

   2. OSD only

      The `sda` device will be used as an OSD device without WAL and DB device.

      ```yaml
      ceph_osd_devices:
        sda:
      ```

    3. OSD + DB device

       The `nvme0n1` device will be used as an DB device. It is possible to use this DB device for up to 6 OSDs. Each
       OSD is provided with 30 GB.

       ```yaml
       ceph_db_devices:
         nvme0n1:
           num_osds: 6
           db_size: 30 GB
       ```

       The `sda` device will be used as an OSD device with `nvme0n1` as DB device.

       ```yaml
       ceph_osd_devices:
          sda:
            db_pv: nvme0n1
       ```

    4. OSD + WAL device

       The `nvme0n1` device will be used as an WAL device. It is possible to use this WAL device for up to 6 OSDs. Each
       OSD is provided with 2 GB.

       ```yaml
       ceph_wal_devices:
         nvme0n1:
           num_osds: 6
           wal_size: 2 GB
       ```

       The `sda` device will be used as an OSD device with `nvme0n1` as WAL device.

       ```yaml
       ceph_osd_devices:
          sda:
            wal_pv: nvme0n1
       ```

    5. OSD + DB device + WAL device (same device for DB + WAL)

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

    6. OSD + DB device + WAL device (different device for DB + WAL)

       The `nvme0n1` device will be used as an DB device. It is possible to use this DB device for up to 6 OSDs. Each
       OSD is provided with 30 GB.

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

2. Push the configuration to your configuration repository and after that do the following

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

5. Push the updated configuration **again** to your configuration repository and re-run:

   ```
   $ osism apply configuration
   $ osism reconciler sync
   ```

6. Finally create the LVM devices.

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
