---
sidebar_label: Ceph
---

# Ceph

## Where to find docs

The official Ceph documentation is located on https://docs.ceph.com/en/latest/rados/troubleshooting/

It is **strongly advised** to use the documentation for the version being used.

* Pacific - https://docs.ceph.com/en/pacific/rados/troubleshooting/
* Quincy - https://docs.ceph.com/en/quincy/rados/troubleshooting/
* Reef - https://docs.ceph.com/en/reef/rados/troubleshooting/

## Critical medium error

The block device `sdf` has errors. You can see this in the kernel ring buffer, for example.

```console
$ sudo dmesg
[...]
[14062414.575715] sd 14:0:5:0: [sdf] tag#2120 FAILED Result: hostbyte=DID_OK driverbyte=DRIVER_OK cmd_age=1s
[14062414.575722] sd 14:0:5:0: [sdf] tag#2120 Sense Key : Medium Error [current] [descriptor]
[14062414.575725] sd 14:0:5:0: [sdf] tag#2120 Add. Sense: Unrecovered read error
[14062414.575728] sd 14:0:5:0: [sdf] tag#2120 CDB: Read(16) 88 00 00 00 00 01 09 7c d9 50 00 00 00 80 00 00
[14062414.575730] critical medium error, dev sdf, sector 4454144360 op 0x0:(READ) flags 0x0 phys_seg 13 prio class 2
```

It may also be displayed in the health details of Ceph.

```console
$ ceph -s
[...]
    health: HEALTH_WARN
            Too many repaired reads on 1 OSDs
[...]

$ ceph health detail
HEALTH_WARN Too many repaired reads on 1 OSDs
[WRN] OSD_TOO_MANY_REPAIRS: Too many repaired reads on 1 OSDs
    osd.17 had 13 reads repaire
```

In this case the block device `sdf` is in the storage node `sto1001`. The OSD assigned
to this block device can be determined.

```console
$ ceph device ls | grep 'sto1001:sdf'
SEAGATE_ST16000NM004J_ZR604ZDZ0000C210PWE9  sto1001:sdf      osd.17
```

If you only know the OSD ID, you can also determine the associated block device and the storage node.

```console
$ ceph device ls | grep osd.17
[...]
SEAGATE_ST16000NM004J_ZR604ZDZ0000C210PWE9  sto1001:sdf      osd.17
```

The broken OSD can be removed from the Ceph cluster. The Ceph cluster is then rebalanced.
This can take some time and cause a high level of activity on the Ceph cluster.

```console
$ ceph osd out osd.17
marked out osd.17.
```

On the storage node disable the OSD service for the OSD.

```bash
sudo systemctl stop ceph-osd@17.service
```

## OSD not created: has bluestore signature

`osism apply cephadm-osds` does not create an OSD on one or more devices because
ceph-volume refuses them. Depending on the Ceph image, the task that adds the
OSDs fails with the message below, or it passes and the play fails later in the
task that waits for the OSDs, naming only the host. In that case the message is
only in the cephadm log:

```console
$ ceph log last 200 info cephadm | grep 'bluestore signature'
[...] RuntimeError: Device /dev/ceph-<uuid>/osd-block-<uuid> has bluestore signature.
```

The disk held a BlueStore OSD before, and copies of its label survived. Since
Ceph 19.2.1, BlueStore writes its label at 0, 1, 10, 100 and 1000 GiB of the OSD
device, and since Ceph 20.2.3 ceph-volume refuses a device that carries any of
them. Removing the partition table and the LVM metadata (`wipefs`, `sgdisk -Z`,
or a metadata-only erase when the node is installed) leaves the copies from 1 GiB
on. The LV that `create-lvm-devices` creates on the same disk starts where the
old one did, so the old copies reappear inside it.

First make sure that the old data is not needed. The label names the OSD it
belonged to; the copy at 1 GiB is read like this:

```console
$ sudo dd if=/dev/ceph-<uuid>/osd-block-<uuid> bs=4096 skip=262144 count=1 status=none | head -c 60
bluestore block device 2cda3f7c-1cd4-4fbb-8b40-c66d835f3df0
$ ceph osd dump | grep 2cda3f7c-1cd4-4fbb-8b40-c66d835f3df0
```

If `ceph osd dump` lists the UUID, the disk belongs to an OSD of the running
cluster. Do not zap it; check the device configuration instead.

Otherwise zap the LV on the storage node. This removes the labels and the LV's
Ceph tags and keeps the LV, so `create-lvm-devices` does not have to run again.

```bash
sudo cephadm ceph-volume -- lvm zap /dev/ceph-<uuid>/osd-block-<uuid>
```

Then run `cephadm-osds` again.

```bash
osism apply cephadm-osds
```

To zap the whole disk from the manager instead, use `ceph orch device zap`. It
also removes the VG and the PV, so the LVM devices have to be created again
before the OSDs.

```bash
ceph orch device zap <host> /dev/sdX --force
osism apply create-lvm-devices
osism apply cephadm-osds
```
