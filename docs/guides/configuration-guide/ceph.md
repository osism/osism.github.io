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

   ```yaml
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

   ```
    "rgw keystone verify ssl": "false"
    "rgw verify ssl": "false"
   ```

   For all possible configuration parameters visit the
   [Ceph configuration reference](https://docs.ceph.com/en/quincy/radosgw/config-ref/).

2. Add the `ceph_rgw_keystone_password` from `environments/kolla/secrets.yml` to
   `environments/ceph/secrets.yml`.

3. Add following configuration in `environments/kolla/configuration.yml`

   ```yaml
   enable_ceph_rgw: true
   enable_ceph_rgw_keystone: true

   ceph_rgw_swift_compatibility: false
   ceph_rgw_swift_account_in_url: true
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
|-----------------------------------|---------------|
| `openstack_pool_default_pg_num`   | 64            |
| `openstack_pool_default_min_size` | 0             |

## LVM devices

For more advanced OSD layout requirements leave out the `devices` key
and instead use `lvm_volumes`. Details for this can be found on the
[OSD Scenario](https://docs.ceph.com/projects/ceph-ansible/en/latest/osds/scenarios.html) documentation.

In order to aid in creating the `lvm_volumes` config entries and provision the LVM devices for them,
OSISM has the two playbooks `ceph-configure-lvm-devices` and `ceph-create-lvm-devices` available.

1. For each Ceph storage node edit the file `inventory/host_vars/<nodename>.yml`
   add a configuration like the following to it:

   ```
   # optional percentage of VGs to leave free,
   # defaults to false
   # Can be helpful for SSD performance of some older SSD models
   # or to extend lifetime of SSDs in general

   ceph_osd_db_wal_devices_buffer_space_percent: 10

   ceph_db_devices:
     nvme0n1:            # required, PV for a DB VG
                         # Will be prefixed by /dev/ and can also be specified
                         # like "by-path/foo" or other things under /dev/
       num_osds: 6       # required, number of OSDs that shall be
                         # maximum deployed to this device
       db_size: 30 GB    # optional, if not set, defaults to
                         # (VG size - buffer space (if enabled)) / num_osds
   ceph_wal_devices:
     nvme1n1:            # See above, PV for a WAL VG
       num_osds: 6       # See above
       wal_size: 2 GB    # optional, if not set, defaults to 2 GiB

   ceph_db_wal_devices:
   nvme2n1:              # See above, PV for combined WAL+DB VG
     num_osds: 3         # See above
       db_size: 30 GB    # See above, except that it also considers
                         # total WAL size when calculating LV sizes
       wal_size: 2 GB    # See above

   ceph_osd_devices:
     sda:                # Device name, will be prefixed by /dev/, see above conventions
                         # This would create a "block only" OSD without DB/WAL
                         # In reality, to ensure each device is uniquely identifiable,
                         # you should use WWN or EUI-64
                         # (in that case the entry here would be something like 
                         # disk/by-id/wwn-<something> or disk/by-id/nvme-eui.<something>)
     sdb:                # Create an OSD with dedicated DB
       db_pv: nvme0n1    # Must be one device configured in ceph_db_devices
                         # or ceph_db_wal_devices
     sdc:                # Create an OSD with dedicated WAL
       wal_pv: nvme1n1   # Must be one device configured in ceph_wal_devices
                         # or ceph_db_wal_devices
     sdb:                # Create an OSD with dedicated DB/WAL residing on different devices
       db_pv: nvme0n1    # See above
       wal_pv: nvme1n1   # See above
     sdc:                # Create an OSD with dedicated DB/WAL residing on the same VG/PV
       db_pv: nvme2n1    # Must be one device configured in ceph_db_wal_devices
       wal_pv: nvme2n1   # Must be the same device configured in ceph_db_wal_devices
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
   generated configuration** for each node.

5. Push the updated configuration **again** to your configuration repository and re-run:

   ```
   $ osism apply configuration
   $ osism reconciler sync
   $ osism apply facts
   ```

6. Finally let OSISM create the LVM devices for you.

   ```
   $ osism apply ceph-create-lvm-devices
   ```

7. Deploy OSDs with `ceph-osds`.

   When everything has finished and is ready to be deployed,
   you can run:

   ```
   $ osism apply ceph-osds
   ```
