---
sidebar_label: Provisioning
sidebar_position: 10
---

# Provisioning of bare-metal nodes

For the initial deployment of the management plane and the control plane of OSISM,
the nodes must be pre-provisioned with Ubuntu 22.04. Currently, only Ubuntu 22.04 is supported
by OSISM.

Data plane nodes can be automatically provisioned after the initial deployment and
do not need to be pre-provisioned.

It is recommended not to install the initial nodes of the management plane and the
control plane manually. An ISO image is provided for this purpose which automatically
provisions a node. The ISO images are available for download in the
[osism/node-image](https://github.com/osism/node-image) repository.

There are different variants of the ISO image. The variants differ in the disc layout.
The available variants are described in the README file of the [osism/node-image](https://github.com/osism/node-image)
repository.

## Manual provisioning

If none of the provided variants is suitable, this section describes the manual
installation with the help of the Ubuntu 22.04 live ISO image. The manual installation
is possible without network connectivity.

* Download the latest ISO image for Ubuntu 22.04 from [releases.ubuntu.com](https://www.releases.ubuntu.com/22.04/).
  * Use the `ubuntu-22.04.1-live-server-amd64.iso` image.
  * The version number may be different, always use the latest available version of 22.04 LTS.
* Choose `English` as language.
* Choose `Install Ubuntu Server`.
* Choose `English as language` (again).
* Choose your location (e.g. `Germany`).
* Choose `en_US.UTF-8` as locale.
* Choose the keyboard layout from a list, use `English (US)`.
* Choose and configure the primary network interface.
  * Depending on the environment, the network may not work at this point. Then select any interface
    and then select `Do not configure the network at this time` in the next step.
* Set the hostname.
  * The hostname is e.g. `node` and not a FQDN like `node.systems.osism.xyz`.
* Set `osism` as full name for the new user.
* Set `osism` as the username for the account.
  * The later used operator user `dragon` is created during the bootstrap and **should not be created** during the installation
  * The account is only needed initially and can be deleted after completion of the bootstrap.
* Set a password for the account.
* Choose `Manual` as partitioning method and execute the partitioning according to company specifications
  * The use of a UEFI is recommended
  * The use of a RAID is recommended. We prefer the use of software RAIDs to make us less dependent on hardware.
    But there is nothing against using hardware RAIDs.
  * The use of a LVM2 is recommended. `system` is recommended as the name for the volume group.
  * Dedicated disks may be provided for `/var/lib/docker` on the controller nodes. In this case, do not
    use an LV for `/var/lib/docker` but the devices provided for it.
  * Do not configure devices that are not required for the operating system.
  * The use of own file systems for the following mountpoints is recommended. The size of the partitions/LVs
    is minimal. Depending on the node type, the partitions/LVs should be made larger.
    * `/` (10 GByte, logical volume `root`)
    * `/home` (2 GByte, logical volume `home`)
    * `/tmp` (5 GByte, logical volume `tmp`)
    * `/var/lib/ceph` (50 GByte, logical volume `ceph`) (optional for storage nodes)
    * `/var/lib/docker` (30 GByte, logical volume `docker`, do not set the `nosuid` flag on `/var/lib/docker`)
      * When using XFS as the file system for `/var/lib/docker`, note the following: Running on XFS without `d_type` support
        causes Docker to skip the attempt to use the `overlay` or `overlay2` driver.
      * 100 GB should be used on a control node at the beginning.
      * `/var/lib/docker` must be extended later during operation depending on the node type. You do this
        in operation when you can see how many logs etc. are generated.
    * `/var/log/audit` (1 GByte, logical volume `audit`)
    * `/var` (10 GByte, logical volume `var`)
    * `swap` (8 GByte, logical volume `swap`)
* Choose `No automatic updates`.
* Choose `OpenSSH server` as software to install.
  * **Do not install any other software component.** Everything you need will be installed later by OSISM.
    In particular, it is not necessary to install a desktop environment.
* After completion, restart the system.
