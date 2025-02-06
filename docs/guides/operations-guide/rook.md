---
sidebar_label: Ceph via Rook (technical preview)
---

# Ceph via Rook (technical preview)

:::warning

This is a technical preview and not recommended for production use yet. This whole
document has to be reworkded with more rook like handling. Do not take it for
granted yet.

:::

## Where to find docs

The official Rook documentation starts here https://rook.io/docs/rook/latest-release/Getting-Started/intro/

Some sections to point out are:
  - [Rook Common Issues Documentation](https://rook.io/docs/rook/latest-release/Troubleshooting/common-issues/)
  - [Rook Ceph Common Issues Documentation](https://rook.io/docs/rook/latest-release/Troubleshooting/ceph-common-issues/)

The official Ceph documentation is located on https://docs.ceph.com/en/latest/rados/operations/

It is **strongly advised** to use the documentation for the version being used.

* Quincy - https://docs.ceph.com/en/quincy/rados/operations/
* Reef - https://docs.ceph.com/en/reef/rados/operations/

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

## Troubleshooting

Please have a look at the [Rook Troubleshooting documentation](https://rook.io/docs/rook/latest-release/Troubleshooting/ceph-toolbox/).

The Rook toolbox is available via the `ceph` command on the manager node, after you deployed the wrapper via `osism apply cephclient`. You have to make sure the correct [Configuration Options for the Rook Ceph Client Wrapper](../configuration-guide/ceph/rook.md#client) are net.

## Monitoring

### Dashboard

* https://rook.io/docs/rook/latest/Storage-Configuration/Monitoring/ceph-dashboard/

The password is stored in the secret `rook-ceph-dashboard-password`.

```
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

## Updating

### Rook Upgrades

Please have a look at the [Rook Upgrades documentation](https://rook.io/docs/rook/latest-release/Upgrade/rook-upgrade/). Take note of update instructions specific to your version.

Usually you can simply update by bumping the `rook_operator_image_tag` ansible variable and applying `osism apply rook-operator`.

### Ceph Upgrades

Please have a look at the [Rook Ceph Upgrades documentation](https://rook.io/docs/rook/latest-release/Upgrade/ceph-upgrade/). Take note of update instructions specific to your version.

Usually you can simply update by bumping the `rook_ceph_image_tag` ansible variable and applying `osism apply rook`.

## General maintenance

### 60 seconds cluster overview

The following commands can be used to quickly check the status of Ceph:

* Print overall cluster status

  ```
  ceph -s
  ```

* Print detailed health information

  ```
  ceph health detail
  ```

* Display current OSD tree

  ```
  ceph osd tree
  ```

* Cluster storage usage by pool and storage class

  ```
  ceph df
  ```

* List pools with detailed configuration

  ```
  ceph osd pool ls detail
  ```

* Get usage stats for OSDs

  ```
  ceph osd df {plain|tree} {class e.g. hdd|ssd}
  ```

* Watch Ceph health messages sequentially

  ```
  ceph -w
  ```

* List daemon versions running in the cluster

  ```
  ceph versions
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

Please have a look at the [Rook Ceph OSD Management documentation](https://rook.io/docs/rook/latest-release/Storage-Configuration/Advanced/ceph-osd-mgmt/.)

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

https://docs.ceph.com/en/latest/rados/troubleshooting/troubleshooting-pg/

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

Autoscaler is enabled by default in a Rook Ceph cluster.

```
$ ceph osd pool autoscale-status
```

### Create a replicated pool

This should be done by updating your `values.yml` file via the variables in [Rook Extra pools - CephBlockPoolC CRD](../configuration-guide/ceph/rook.md#extra-pool--cephblockpool-crd).

It also can be done by hand but Rook will not know about the pool in this case.

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

This should be done by updating your `values.yml` file via the variables in [Rook Extra pools - CephBlockPoolC CRD](../configuration-guide/ceph/rook.md#extra-pool--cephblockpool-crd).

It also can be done by hand but Rook will not know about the pool in this case.

:::warning

This will delete all data in that pool. There is no undo/undelete.

:::

### Set number of PGs for a pool

:::note

PG autoscaling is enabled by default in Rook managed Ceph Clusters.

:::

If no autoscaling of PGs is used, it is very important to adapt the PGs per pool to the
real world when operating a Ceph cluster. If, for example, OSDs are exchanged, added, new
nodes are added, etc., the number of PGs must also be taken into account.

The [PG Calc Tool](https://docs.ceph.com/en/latest/rados/operations/pgcalc/) can be used
to calculate a reasonable number of PGs per pool depending on all ODSs and pools.

Further information on placement groups can be found in the
[Ceph documentation](https://docs.ceph.com/en/latest/rados/operations/placement-groups/).
You should definitely read *FACTORS RELEVANT TO SPECIFYING PG_NUM* and *CHOOSING THE NUMBER OF PGS*
there.

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

## Change node labels

In case you decided to move workloads to different nodes and changed the inventory groups e.g. like this:

  ```ini title="inventory/20-roles"
  [rook-mds:children]
  ceph-control

  [rook-mgr:children]
  ceph-control

  [rook-mon:children]
  ceph-control

  [rook-osd:children]
  ceph-resource

  [rook-rgw:children]
  ceph-control
  ```

You can apply the changes running:

  ```bash
  osism apply rook-change-labels
  ```

This will remove all labels and apply the changed inventory groups as labels. After those steps are done it will trigger the rescheduling of the components so they get deployed on the adjusted nodes.

## Advanced topics

## Performance benchmark

```
# apt-get install -y fio
```

```
#!/usr/bin/env bash

BENCH_DEVICE="$2"
DATE=$(date +%s)
IOENGINE="libaio"
LOGPATH="$1"
SIZE=1G

mkdir -p $LOGPATH

for RW in "write" "randwrite" "read" "randread"
do
  for BS in "4K" "64K" "1M" "4M" "16M" "64M"
  do
    (
    echo "==== $RW - $BS - DIRECT ===="
    echo 3 > /proc/sys/vm/drop_caches
    fio --rw=$RW --ioengine=${IOENGINE} --size=$SIZE --bs=$BS --direct=1 --runtime=60 --time_based --name=bench --filename=$BENCH_DEVICE --output=$LOGPATH/$RW.${BS}-direct-$(basename $BENCH_DEVICE).$DATE.log.json --output-format=json
    sync
    echo 3 > /proc/sys/vm/drop_caches
    echo "==== $RW - $BS - DIRECT IODEPTH 32  ===="
    fio --rw=$RW --ioengine=${IOENGINE} --size=$SIZE --bs=$BS --iodepth=32 --direct=1 --runtime=60 --time_based --name=bench --filename=$BENCH_DEVICE --output=$LOGPATH/$RW.${BS}-direct-iod32-$(basename $BENCH_DEVICE).$DATE.log.json --output-format=json
    sync
    ) | tee $LOGPATH/$RW.$BS-$(basename $BENCH_DEVICE).$DATE.log
    echo
  done
done
```

## Where and how to get further help

Join the **#ceph** IRC channel on **irc.oftc.net**, state the problem with as many details as possible
including information about what steps have already been taken to solve the problem
also provide information from the command output from the "60 seconds cluster overview" above
through a pastebin or a similar service. In order for people to be able
to help, details and some patience are important.
