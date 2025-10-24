---
sidebar_label: Migration from VMware ESXi
---

# Migration from VMware ESXi

This guide is an example of how to perform a manual migration from a VMware ESXi host to OpenStack.
Migration to OpenStack always depends very much on the use case. It is not possible to document an
approach or to write a tool that works for all use cases. This guide shows one possible way. There are many ways to
perform a migration. A migration must always be carefully prepared and tested in advance.

At this point, we would also like to point out the open source project
[cloudbase/coriolis](https://github.com/cloudbase/coriolis) from Cloudbase. There are also commercial
providers that perform migration from VMware ESXi to OpenStack. One of the offerings is
[Hystax Acura Live Cloud Migration](https://hystax.com/cloud-migration/).
[Migratekit](https://github.com/vexxhost/migratekit) from Vexxhost is another option for migrating VMWare to OpenStack.

A good overview and comparison of VMWare resources and their OpenStack counterparts is available [here](https://www.openstack.org/vmware-migration-to-openstack).


## Scenario

* Source: ESXi 7.0 host
* Destination: OpenStack
* a security group (`web_ssh`) is already available at the destination
* a Linux converter host is installed and ready, we also have root access to it
* an IPv4 address (`10.50.40.230`) will be given manually out of a preconfigured network
* we migrate one host with a kernel newer then 2.6.25 with two scsi harddrives attached and one networkcard
* destination openstack using Libvirt/KVM as virtualization
* the converter host has access to ESXi and the OpenStack environment over IP network

## Requirements

* VMware credentials
  * SSH enabled on ESXi host
  * access to the webinterface of the ESXi host
* OpenStack credentials

* Linux packages installed on the converter, in this case it is an Ubuntu 22.04

  ```sh
  apt-get install qemu-utils python3-openstackclient
  ```

* twice the space of the largest vmdk disc image on the converter or nfs access to the image files with enough storage

## Prechecks

Check the `/etc/fstab` file of your VMware ESXi host you want to move. See how all the discs or partitions are mounted.
If they are all mounted by LVM or UUID you do not need to change anything.

```txt title="cat /etc/fstab"
/dev/mapper/vg00-lvroot /               ext4    errors=remount-ro 0       1
/dev/mapper/vg00-lvboot /boot           ext2    defaults        0       2
/dev/mapper/vg00-lvhome /home           ext4    defaults        0       2
/dev/mapper/vg00-lvvar /var             ext4    defaults        0       2
/dev/mapper/vg00-lvswap none            swap    sw              0       0
/dev/mapper/vgdata-lvsrv /srv           ext4    defaults        0       2
```

If they are mounted like `/dev/sda` it is better to change the `/etc/fstab` to UUID mounting using `blkid`.

Replace these entries with `UUID=filesystems_uuid` and add the rest of the line same as with the devicenames.

Example:

```txt title="example devicename fstab"
/dev/sda1 /boot     ext2  defaults          0       2
/dev/sda2 /         ext4  errors=remount-ro 0       1
```

Change it to something like this:

```txt title="example uuid fstab"
UUID=574c96bf-f2cb-49b8-9196-232a24047f94 /boot     ext2  defaults          0       2
UUID=93cc3b34-36c3-422e-b7a6-c80439e8f431 /         ext4  errors=remount-ro 0       1
```

:::caution

When creating a new server, OpenStack uses `/dev/vd*` or `/dev/sd*` as devices for volumes.
Using UUID/LVM mounts will ensure that the kernel will find your devices while booting.
Using old device names may lead to the boot sequence to get stuck, due to missing devices.

:::

Also check your NIC interface configuration as the devicenames can change to a new devicename.

This depends on the udev or systemd setup of your specific system.

It needs to be changed to either DHCP if you want to use floating IPs or static IP of the new network.

## Migration

:::note

Shutdown the host in VMware as the movement is only possible while the host is offline.
Otherwise you will get corrupted disc files.

:::

You can use either the webinterface or SSH to identify and copy the `*.vmdk` files of your VMware ESXi host.

While using the web interface you need to locate the datastore and the directory where the disc files are
located and start downloading all vmdk files. You will always get files files for a disc, a smaller and a
larger one, both are required.

When using SSh, please also copy both vmdk files for the disc to the converter host. Start looking up your
files under `/vmfs/volumes/`.

### How to copy vmdk images

Example SSH copy and path of all vmdk files to the converter host using the scp command for our testing-host:

```bash
scp user@vmhost:/vmfs/volumes/datastore1/testing-host/*.vmdk .
```

After copying is finished, we find several vmdk files in our directory.
We copied two disc images:

```console
testing-host-disc0-flat.vmdk testing-host-disc1.vmdk
testing-host-disc0.vmdk      testing-host-disc1-flat.vmdk
```

### How to convert vmdk to raw

:::note

Now convert those vmdk files into raw images with the following flags:

```console
-p show progress (optional)
-f Input Format
-O Output Format
```

Raw files are required to import images into OpenStack.

:::

```bash
qemu-img convert -p -f vmdk -O raw testing-host-disc0.vmdk testing-host-disc0.raw
```

Repeat this step for each disc image you need to convert.

### Edit the raw Images (optional)

:::note

This step is completely optional and you should have some Linux knowledge to do this.

:::

After converting the images of a Linux host, you now have the possibility to edit some settings offline before importing the images into OpenStack.

By mounting the raw image files you can edit the configuration files to, e.g.:
- disable mountpoints at the fstab, like nfs server
- change the ip config of the networkcard to dhcp or fixed ip
- adjust resolv.conf
- adjust routing

On Ubuntu you can use losetup to mount the raw image as a loopdevice to mount it somewhere you have access to.

```bash
losetup -f -P testing-host-disc0.raw
losetup -l

mount /dev/loop0p1 /mnt/test/
# or
lvscan # and mount the lvm volume
```

### How to import Images

First of all you need your OpenStack credentials, having them in an `my-project-openrc.sh` file and source them to your shell.

The openstack cli client is now able to connect to the cloud environment and do all the following steps.

To get your credentials please check with your OpenStack provider.

If you want to preserve the `/dev/sd*` device names of the mountpoints, you must inject the new image and add some properties while uploading it into the OpenStack environment or add them later on to the images with Horizon web interface or openstack cli client.

```bash
openstack image create --progress --property hw_disk_bus=scsi --property hw_scsi_model=virtio-scsi --property hw_watchdog_action=reset --disk-format raw --private --file testing-host-disc0.raw  testing-host-image-disc0
```

```console
openstack image list
+--------------------------------------+------------------------------+--------+
| ID                                   | Name                         | Status |
+--------------------------------------+------------------------------+--------+
| 2a12b545-5d09-4ca1-9a76-b57f8d2489be | testing-host-disc0           | active |
| b34744f7-6ef6-4282-a001-08a06812e381 | testing-host-disc1           | active |
+--------------------------------------+------------------------------+--------+
```

### How to create your server

The previously imported images need to be copied to a volume so the server is also able to evict to other hosts in the cluster,
so lets create and start our server in OpenStack.

Select one flavor for the host, in this case `SCS-8V-16`, which means 8 Virtual CPUs and 16GB of RAM, get a list of all your available flavors by executing
`openstack flavor list` and select the best matching one.

As the images are 20GB, you tell openstack that you need a boot volume with a size of 20 and a block-device for the additional device also with a size of 20GB.

In this guide there is already a security group which fits our needs, if not, create one or you will not be able to communicate with your new host.

```console
openstack security group list
+--------------------------------------+-----------------+------------------------------+----------------------------------+------+
| ID                                   | Name            | Description                  | Project                          | Tags |
+--------------------------------------+-----------------+------------------------------+----------------------------------+------+
| 4fd1d060-bf1d-4f5a-8e80-fde975d41f5f | default         | Default security group       | c9aa53cc3c654692b14a8f81a88cfa2f | []   |
| 73967e73-e8d5-4318-b621-a06e7496fec3 | web_ssh         | Webserver security group     | c9aa53cc3c654692b14a8f81a88cfa2f | []   |
+--------------------------------------+-----------------+------------------------------+----------------------------------+------+
```

The `web_ssh` group will be attached to the server.

Now you need to tell which network you want to deploy your host on, optionally including a fixed IPv4 address.

You can repeat the `--nic` for additional nics in your server, in this guide it's the my_corp_net.

```console
openstack network list
+--------------------------------------+-------------------+--------------------------------------+
| ID                                   | Name              | Subnets                              |
+--------------------------------------+-------------------+--------------------------------------+
| 9688192e-11dd-4618-a18c-99d3267f630a | my_corp_net       | 0d502fdb-be73-457a-8678-79eb6088a9a1 |
| 98842b77-c070-4532-a2a9-99d588c4e947 | internet          | 2dfc3916-972f-44d1-afdb-6f89488ef3a4 |
| c846238a-b00a-4c73-87e3-3614d94f46fd | my_other_corp_net | b8210b4e-5d91-425a-b05c-ca5d4bf8329a |
+--------------------------------------+-------------------+--------------------------------------+
```

As last parameter, you give the server name of your migrated system.

As we are starting an already configured system we do not need to inject SSH keys or passwords as they should already be present on the host.

```bash
openstack server create --flavor SCS-8V-16 \
 --image 2a12b545-5d09-4ca1-9a76-b57f8d2489be --boot-from-volume 20 \
 --security-group 73967e73-e8d5-4318-b621-a06e7496fec3 \
 --nic net-id=9688192e-11dd-4618-a18c-99d3267f630a,v4-fixed-ip=10.50.40.230 \
 --block-device uuid=b34744f7-6ef6-4282-a001-08a06812e381,source_type=image,destination_type=volume,volume_size=20 \
 --os-compute-api-version 2.90 testing-host
```

### Show your new server

```console
openstack server list
+--------------------------------------+------------------+---------+----------------------------------+--------------------------+-----------+
| ID                                   | Name             | Status  | Networks                         | Image                    | Flavor    |
+--------------------------------------+------------------+---------+----------------------------------+--------------------------+-----------+
| 71a8b930-4212-434a-8891-afdeeb1802dc | testing-host     | ACTIVE  | my_network=10.50.40.230          | N/A (booted from volume) | SCS-8V-16 |
+--------------------------------------+------------------+---------+----------------------------------+--------------------------+-----------+
```
To see the attached volumes and their mountpoints:

```console
openstack server volume list 71a8b930-4212-434a-8891-afdeeb1802dc
+----------+--------------------------------------+--------------------------------------+------+------------------------+--------------------------------------+--------------------------------------+
| Device   | Server ID                            | Volume ID                            | Tag  | Delete On Termination? | Attachment ID                        | BlockDeviceMapping UUID              |
+----------+--------------------------------------+--------------------------------------+------+------------------------+--------------------------------------+--------------------------------------+
| /dev/sda | 71a8b930-4212-434a-8891-afdeeb1802dc | 71902b03-48ea-483c-a6a3-6c47b9d8537b | None | False                  | 3cd241ff-5296-4bb1-9ba0-d743cb8c8f31 | 2d08e835-156f-4f71-8c95-7ff828230b8e |
| /dev/sdb | 71a8b930-4212-434a-8891-afdeeb1802dc | 15a835a3-5149-49a8-8e2b-a81ef8097c35 | None | False                  | 9deeb06b-718b-49d4-84a4-87dabc34ba56 | 04483f95-0333-4b37-92e6-db604e4ddc7c |
+----------+--------------------------------------+--------------------------------------+------+------------------------+--------------------------------------+--------------------------------------+
```

### How to access the VNC console

To get the VNC URL for console login use:

```console
openstack console url show 71a8b930-4212-434a-8891-afdeeb1802dc
+----------+-------------------------------------------------------------------------------------------+
| Field    | Value                                                                                     |
+----------+-------------------------------------------------------------------------------------------+
| protocol | vnc                                                                                       |
| type     | novnc                                                                                     |
| url      | https://vnc.your.cloud/vnc_lite.html?path=%3Ftoken%3Db9b6920d-e533-4728-8132-a5a0adfc24e5 |
+----------+-------------------------------------------------------------------------------------------+
```

This will print out the VNC URL for the videoconsole connection to your host.

Now the server will boot and be available.

Maybe you need to tweak the network setup if it is still not accessible.
To do this, you could use the VNC console of the OpenStack host:

Login and then setup the network card if you have not already done that before host had been shutdown.

You now can remove the imported images, as they are no longer required - except you want to generate
another host with the same images.


## Last words

In this little guide, we only can give a sneak peak of what you need to do with a simple VMware ESXi host.
More complex setups needs consulting, planning and testing as there a several scenarios out there which
cannot be handled like this.
Especially if you have terabytes of data to move or graphics- or AIcards in you VMware ESXi hosts.
