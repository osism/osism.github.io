---
sidebar_label: Ceph
sidebar_position: 50
---

# Ceph operations cheatsheet

## Where to find docs

The official Ceph documentation is located on https://docs.ceph.com/en/latest

It is **strongly advised** to use the documentation for the version being used.

* Pacific - https://docs.ceph.com/en/pacific
* Quincy - https://docs.ceph.com/en/quincy
* Reef - https://docs.ceph.com/en/reef

ceph-ansible documentation is located on https://docs.ceph.com/projects/ceph-ansible/en/latest/

:::note

Do not take information in the documentation at face value.
Especially when it comes to advanced/rarely used/very new features it is **strongly advised**
to test any claims made in the documentation about any particular feature.

Never assume that things will work as written without actually testing it on a test setup
as close to your real workload scenario as possible.

:::

## Advice on Ceph releases

The current Ceph releases and their support status can be found on https://docs.ceph.com/en/latest/releases/

When a new Ceph stable version is released you are **strongly advised**
to not roll it out on any production cluster whatsoever.
Even though its listed as "stable" it doesn't mean that this is actually true.
Especially avoid using .0 releases on anything remotely production
unless you really, really now what you're doing and can live with a possible catastrophic failure.

Be **very** conservative about what version you run on production systems.

Shiny new features aren't worth the risk of total or partial data loss/corruption.

## General maintenance

### 60 seconds cluster overview

The following commands can be used to quickly check the status of Ceph:

```
$ ceph -s # Print overall cluster status
$ ceph health detail # Print detailed health information
$ ceph osd tree # Display current OSD tree
$ ceph df # Cluster storage usage by pool and storage class
$ ceph osd pool ls detail # List pools with detailed configuration
$ ceph osd df {plain|tree} {class e.g. hdd|ssd} # Get usage stats for OSDs
$ ceph -w # Watch Ceph health messages sequentially
$ ceph versions # List daemon versions running in the cluster
``` 

Also you can run the following on each node running ceph-daemons,
to provide further debug information about the environment:

```
# lscpu
# cat /proc/cpuinfo # if lscpu isn't available
# free -g
# ip l
# ethtool <device> # for each network adapter
```

### Mute/Unmute a health warning

```
$ ceph health mute <what> <duration>
$ ceph health unmute <what>
```

### Disable/Enable (deep-)scrubbing

```
$ ceph osd set noscrub
$ ceph osd set nodeep-scrub
$ ceph osd unset noscrub
$ ceph osd unset nodeep-scrub
```

:::warning

Use this sparingly only in emergency situations.
Setting these flags will cause a HEALTH_WARN status,
increase risk of data corruption and also the risk of generating
a HEALTH_WARN due to PGs not being (deep-)scrubbed in time.

:::

### Reboot a single node

The traditional way of doing this is by setting the ``noout`` flag,
do the appropriate maintenance work and after the node is back online
unset the flag like so:

```
ceph osd set noout
```

After maintenance is done and host is back up:

```
ceph osd unset noout
```

On versions Luminous or above you can set the flag individually for single
OSDs or entire CRUSH buckets, which can be a safer option in case of prolonged
maintenance periods.

Add noout for a OSD:

```
ceph osd add-noout osd.<ID>
```

Remove noout for a OSD:

```
ceph osd rm-noout osd.<ID>
```

Add noout for CRUSH bucket (e.g. host name as seen in ``ceph osd tree``):

```
ceph osd set-group noout <crush-bucket-name>
```

Remove noout for CRUSH bucket:

```
ceph osd unset-group noout <crush-bucket-name>
```

## Gathering information about block devices

### Enumerate typical storage devices and LVM

```
# lsblk
# lsblk -S
# lsscsi
# nvme list
# pvs
# vgs
# lvs
```

### SMART data for SATA/SAS and NVME devices

```
# smartctl -a /dev/sdX
# nvme smart-log /dev/nvmeXnY
```

### Check format of a NVME device

```
# nvme id-ns -H /dev/nvmeXnY
```

:::note

Check the last lines named "LBA Format".
It will show which formats are supported,
which format is in use and which format offers the best performance
according to the vendor.

:::

### Format a NVME device to a different LBA format using nvme-cli

:::warning

This will destroy all data on the device!

:::

```
# nvme format --lbaf=<id> /dev/nvmeXnY
```

### Secure Erase a NVME drive using nvme-cli

:::warning

This will destroy all data on the device!

:::

```
# nvme format -s2 /dev/nvmeXnY
# blkdiscard /dev/nvmeXnY
# nvme format -s1 /dev/nvmeXnY
```  

### Secure Erase a SATA/SAS drive using hdparm

:::warning

This will destroy all data on the device!

:::


1. Gather device info:

   ```
   # hdparm -I /dev/sdX
   ```

  Check that the output says **"not frozen"** and **"not locked"**,
  also it should list support for enhanced erase and list time estimates
  for **SECURITY ERASE UNIT** and/or **ENHANCED SECURITY ERASE UNIT**

2. Set a master password for the disk (required, will be automatically removed after wipe)

   ```
   # hdparm --user-master wipeit --security-set-pass wipeit /dev/sdX
   # hdparm -I /dev/sdX
   ```

   Check that "Security level" is now **"high"** and master password is now
   **"enabled"** instead of **"not enabled"** before

3. Wipe the device

   If device supports enhanced security erase (better), use the following:

   ```
   # hdparm --user-master wipeit --security-erase-enhanced wipeit /dev/sdX
   ```

   If not, use standard security erase:

   ```
   # hdparm --user-master wipeit --security-erase wipeit /dev/sdX
   ```      

:::note

On some systems the system firmware might "freeze" the device,
which makes it impossible to issue a secure erase or reformat the device.
In that case it might be necessary to either "unfreeze" the drive or
to install the drive in another system where it can be unfrozen.
Also make sure that the device is *actually* wiped. Its recommended to
at least perform a blanking pass on HDDs with a tool like nwipe.

:::

## OSD maintenance tasks

### Locate a specific OSD in the cluster

```
$ ceph osd find osd.<ID>
```

### Get OSD metadata (global and single OSD)

```
$ ceph osd metadata
$ ceph osd metadata osd.<ID>
```

:::note

      Interesting fields:
      osd_objectstore, rotational, hostname, devices, device_ids, device_paths,
      bluefs_db_rotational, bluefs_wal_rotational,
      bluefs_dedicated_db, bluefs_dedicated_wal,
      bluestore_bdev_rotational

:::

### Add a new OSD using ceph-ansible

### Remove a OSD using ceph-ansible

### Replace a defect OSD

### Remove a single OSD node

### Remove an OSD (removing it completely, not reprovisioning it again) without double rebalance

```
$ ceph osd crush reweight osd.<ID> 0.0
... Wait for rebalance to complete, then mark it OUT:
$ ceph osd out osd.<ID>
# systemctl stop ceph-osd@<ID>
# systemctl disable ceph-osd@<ID>
$ ceph osd purge osd.<ID> --yes-i-really-mean-it
```

### Remove an OSD (temporarily e.g. when replacing a broken disk)

```
$ ceph osd out osd.<ID>
# systemctl stop ceph-osd@<ID>
# systemctl disable ceph-osd@<ID>
```

### Disable backfills/recovery completely

:::warning

Use only in emergency situations!

:::

```
$ ceph osd set nobackfill
$ ceph osd set norecovery
$ ceph osd set norebalance
```

Unset the flags with ``ceph osd unset <flag>``.

### Rebalance OSDs

## Placement Group maintenance

### Dump placement groups

Usually only useful when parsing it, so here are two ways to get the data:
```
$ ceph pg dump
$ ceph pg dump --format=json-pretty
```

### Query a PG about its status

```
$ ceph pg <pgid> query
```

### Start (deep-)scrubbing of a placement group

```
$ ceph pg scrub <pgid>
$ ceph pg deep-scrub <pgid>
```

:::note

Instructing a PG to (deep-)scrub does not mean that it will do so immediately,
it can take some time for the scrub to start.

:::

### HEALTH_WARN - Large omap objects found...

Finding PGs which have large OMAP objects:

```
# ceph pg dump --format=json | jq '.pg_map.pg_stats[] |
select(.stat_sum.num_large_omap_objects != 0) |
(.pgid, .stat_sum.num_large_omap_objects, .up, .acting)'
```
(Remove the line breaks between the single quotes or `jq` might act weird!)

This will dump all PG IDs with large OMAP objects and their up/acting OSDs.
You then can grep the logs of these OSDs for **"Large omap object"**
to find the actual objects causing the health warning.

Also the PG ID before the dot is equal to the pool ID it belongs to.

In case the logs have been rotated, instruct those OSDs to do a deep-scrub
and watch the logs for the message to appear.

From there you can investigate the issue further,
mostly it'll be due to the index of a RGW bucket getting too big due to too many objects,
thus resharding that bucket's index will be necessary.

### Instruct a PG to repair in case of scrub errors (inconsistent PG)

```
$ ceph pg repair <pgid>
```

:::note

Recovery might not start immediately and might take some time.
You can query the status of the recovery through ``ceph pg <pgid> query``.
Be sure to read the Ceph manual about this topic *thoroughly*:

https://docs.ceph.com/en/latest/rados/operations/pg-repair/

:::

## RADOS Pool maintenance

:::note

Read the RADOS pool operations documentation in detail before playing around with pools.
Especially when considering making changes to the CRUSH map.
Wrong decisions there can lead to data loss or other catastrophic failures.

https://docs.ceph.com/en/latest/rados/operations/pools/

:::

### Get pools and their configuration

```
$ ceph osd pool ls detail
```

### Dump all CRUSH rules

```
$ ceph osd crush rule dump
```

### Get autoscaler status

```
$ ceph osd pool autoscale-status
```

### Create a replicated pool

```
$ ceph osd pool create <pool_name> <pg_num> <pgp_num> replicated [<crush_rule_name>]
```

### Enabling an application on a pool

Required, otherwise a health warning will be raised after some time.

```
$ ceph osd pool application enable <pool_name> <application_name> # Syntax
$ ceph osd pool application enable cinder rbd # Example
```

Typical application names are: rbd, rgw, cephfs

### Delete a pool

:::warning

This will delete all data in that pool. There is no undo/undelete.

:::

```
$ ceph osd pool delete <pool_name> <pool_name> --yes-i-really-really-mean-it
```

:::note

In order to be able to delete pools, it has to be enabled on the monitors
by setting the ``mon_allow_pool_delete`` flag to true. Default is false.

See: https://docs.ceph.com/en/latest/rados/configuration/mon-config-ref

:::

### Set number of PGs for a pool

```
$ ceph osd pool set <poolname> pg_num <num_pgs>
```

:::note

Num PGs must be a power of two! Be careful about changing number of PGs.
Changing pg_num to a new value will gradually increase pgp_num on newer versions of Ceph.

In older versions one also has to set pgp_num manually, either in increments or in one big leap.

:::

### Create CRUSH rules for different storage classes

```
$ ceph osd crush rule create-replicated replicated_hdd default host hdd
$ ceph osd crush rule create-replicated replicated_ssd default host ssd
$ ceph osd crush rule create-replicated replicated_nvme default host nvme
```

### Change CRUSH rule for a pool ("move pool")

```
$ ceph osd pool set <poolname> crush_rule <rule_name>
```

This can be used to move a pool from e.g. HDD to SSD or NVME class
or anything else that the new CRUSH rule specifies.

## Advanced topics

### Configure and create LVM devices for ceph-ansible using OSISM

For more advanced OSD layout requirements leave out the `devices` key
and instead use `lvm_volumes`.

Details for this can be found on the official [ceph-ansible OSD Scenario](https://docs.ceph.com/projects/ceph-ansible/en/latest/osds/scenarios.html) documentation.

In order to aid in creating the `lvm_volumes` config entries and provision the LVM devices for them,
OSISM has the two playbooks `configure-lvm-devices` and `create-lvm-devices` available.

Their usage is as follows:

1. For each Ceph storage node edit the file `inventory/host_vars/<nodename>.yml`
   add a configuration like the following to it:

   ```
   ceph_osd_db_wal_devices_buffer_space_percent: 10
   # optional percentage of VGs to leave free,
   # defaults to false
   # Can be helpful for SSD performance of some older SSD models
   # or to extend lifetime of SSDs in general

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
   $ osism apply facts
   ```

3. After the configuration has been pulled and facts updated,
   you can run the LVM configuration playbook:

   ```
   $ osism apply ceph-configure-lvm-volumes [-l INVENTORY HOST PATTERN]
   ```

   This will generate a new configuration file for each node in `/tmp` 
   on the first manager node named `<nodename>-ceph-lvm-configuration.yml`.

4. Take the generated configuration file from `/tmp` and **replace the previously generated configuration** for each node.

5. Push the updated configuration **again** to your configuration repository and re-run:

   ```
   $ osism apply configuration
   $ osism apply facts
   ```

6. Finally you can let OSISM create the LVM devices for you, because
   `ceph-ansible` will not do that. To do that you simply run:

   ```
   $ osism apply ceph-create-lvm-devices [-l INVENTORY HOST PATTERN]
   ```

7. Deploy OSDs with ceph-ansible

   When everything has finished and is ready to be deployed,
   you can run:

   ```
   $ osism apply ceph-osds [-l INVENTORY HOST PATTERN]
   ```

   This should then have `ceph-ansible` create new OSDs on the node.

### Validating Ceph using OSISM playbooks

For Ceph, special playbooks were added to validate the deployment status of
the OSD, MON and MGR services. The commands for use are `osism validate ceph-osds`,
`osism validate ceph-mons`, and `osism validate ceph-mgrs`.

These playbooks will validate that the deployed Ceph environment matches 
the configuration and is overall in a healthy state. The playbooks will 
generate report files in JSON format on the first manager node in `/opt/reports/validator`.

### Shutdown a Ceph cluster

In order to fully shutdown a Ceph cluster safely, you first do the following steps:

:::warning

Take GOOD NOTES of the unit names and OSD IDs running on each node.
You will need them to restart the cluster later.

:::

1. Stop the workload that is using the cluster

   This will vary depending on your environment and is not covered here.

2. Pause/Stop operations on the cluster by setting flags

   ```
   $ ceph osd set noout
   $ ceph osd set nobackfill
   $ ceph osd set norecover
   $ ceph osd set norebalance
   $ ceph osd set nodown
   $ ceph osd set pause
   ```
3. Stop and disable the ``radosgw`` services on all nodes (on each rgw node) (if RGW is used)

   Get the name of the unit (globs not supported for disable) and
   make a note of the unit name for that node:

   ```
   # systemctl | grep ceph-radosgw
   ```

   Then disable and stop the unit:
   ```
   # systemctl disable --now ceph-radosgw@<name>.service
   ```

4. Stop all CephFS file systems (if CephFS is used)

   List all Ceph file systems

   ```
   $ ceph fs ls
   ```

   For each CephFS do:

   ```
   $ ceph fs <file system name> down true
   ```

5. After that disable and stop all ``ceph-mds`` services on all nodes (do this on each node)

   Get the name of the unit (globs not supported for disable) and
   make a note of the unit name for that node:

   ```
   # systemctl | grep ceph-mds
   ``` 

   ```
   # systemctl disable --now ceph-mds@<unit>.service
   ```

6. Stop and disable the ``ceph-mgr`` services on all nodes (do this on each node)

   Get the name of the unit (globs not supported for disable) and
   make a note of the unit name for that node:

   ```
   # systemctl | grep ceph-mgr
   ```

   ```
   # systemctl disable --now ceph-mgr@<unit>.service
   ```

7. Stop and disable the ``ceph-osd`` services on all nodes (do this on each node)

   Get the names of the units (globs not supported for disable) and
   make a note of the unit names for that node (best to save it to a file):

   ```
   # systemctl | grep ceph-osd
   ```

   For each OSD unit execute:

   ```
   # systemctl disable ceph-osd@<osd-id>.service
   ```

   Stop all OSDs at once:

   ```
   # systemctl stop ceph-osd\*.service
   ```

8. Finally stop the ``ceph-mon`` services on all nodes (do this on each node)

   Get the name of the unit (globs not supported for disable) and
   make a note of the unit name for that node:

   ```
   # systemctl | grep ceph-mon
   ```

   ```
   # systemctl disable --now ceph-mon@<unit>.service
   ```

### Restart a Ceph cluster after manual shutdown

:::warning

You will need the notes taken during shutdown of the unit names.
It **can** be done without, but then it'll be way more work finding out the names.

:::

In order to restart a Ceph cluster after performing a manual shutdown like described
in the section above, you do the following:

1. Enable & start the ``ceph-mon`` services on all nodes (do this on each node)

   ```
   # systemctl enable --now ceph-mon@<unit-name>.service
   ```

2. Enable & start the ``ceph-osd`` services on all nodes (do this on each node)

   For each Ceph OSD on that node do:

   ```
   # systemctl enable --now ceph-osd@<osd-id>.service
   ```

   Depending on the number of OSDs on that node it can take a while.

3. Enable & start the ``ceph-mgr`` services on all nodes (do this on each node)

   ```
   # systemctl enable --now ceph-mgr@<unit-name>.service
   ```

4. Check the status of your cluster and wait for all OSDs to come online

   You can watch the status periodically by running:

   ```
   $ watch ceph -s
   ```

   You should wait until all OSDs are up + in again, before removing flags.

5. Remove flags to unpause operations

   ```
   $ ceph osd unset pause
   $ ceph osd unset nodown
   $ ceph osd unset noout
   $ ceph osd unset nobackfill
   $ ceph osd unset norecover
   $ ceph osd unset norebalance
   ```

6. Wait for cluster to resume operations

   See step #4 of this SOP.
   Now you wait until the cluster seems "happy enough" to accept clients.
   (i.e. rebalancing finished etc.)
   Maybe it will complain about MDS being down, but that's normal for now.

7. Enable & start the ``ceph-mds`` services on each node (if CephFS is used)

   ```
   # systemctl enable --now ceph-mds@<unit>.service
   ```

8. Start CephFS file systems again

   List all Ceph file systems

   ```
   $ ceph fs ls
   ```

   For each CephFS do:

   ```
   $ ceph fs <file system name> down false
   ```

9. Enable & start the ``radosgw`` services on each node (if RGW is used)

   ```
   # systemctl enable --now ceph-radosgw@<name>.service
   ```

## Where and how to get further help

Join the **#ceph** IRC channel on **irc.oftc.net**, state the problem with as many details as possible
including information about what steps have already been taken to solve the problem
also provide information from the command output from the "60 seconds cluster overview" above
through a pastebin or a similar service. In order for people to be able
to help, details and some patience are important.
