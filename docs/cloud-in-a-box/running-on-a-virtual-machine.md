# Running on a virtual machine

## KVM

### Nested virtualization

You likely want to run virtual machines on top of your Cloud in a Box.
The host machine has to support and enabled nested virtualization.

To enable nested virtualization the CPU configuration of the VM has to be `host-passthrough` or `host-model`

* [Enabling nested virtualization in Fedora](https://docs.fedoraproject.org/en-US/quick-docs/using-nested-virtualization-in-kvm/)

The linked guide can be used in other distributions as well.

### EFI

Chose an EFI firmware instead of classical BIOS to ensure the booting from the disk with the GPT
partition table works.

### SCSI

Use the `-1.iso` variant that installs to a SCSI disk `/dev/sda` and chose the virtio-scsi controller
in the VM configuration. In a libvirt configuration file, this will look like this (this bus number of
course depends on the other virtual PCI devices):

```xml
    <controller type='scsi' index='0' model='virtio-scsi'>
      <address type='pci' domain='0x0000' bus='0x07' slot='0x00' function='0x0'/>
    </controller>
```

### Disk space saving

When using Cloud in a Box in a VM, you can utilize the qcow2 disk image or similar technology to save space.
In that case, the base installation requires just around 70 GB instead of a full 1 TB.
(*The drive still needs to be made with a capacity of at least 1TB; however, the actual disk space usage is lower.*)

Also in case you want to experiment a bit more and "hack around" using the manual installation
you can make disk snapshots when turned off after the Ubuntu installs, `bootstrap.sh` and `deploy.sh` to speed up your
progress.

If you use qemu, you can use following command to do snapshots.

```bash
sudo virsh snapshot-create-as --domain cib bootstrap "run of bootstrap.sh" --disk-only --diskspec sda,snapshot=external,file=/var/lib/libvirt/images/ub2022_cib_bootstrap.qcow2 --atomic
```

### QEMU guest agent

When running inside QEMU, it may be worth it to install the QEMU guest agent.

```bash
sudo apt -y install qemu-guest-agent
sudo systemctl enable qemu-guest-agent
sudo systemctl start qemu-guest-agent
```

## VMware vSphere/ESXi

When running Cloud in a Box on a VMware vSphere/ESXi virtual machine, you can use the below specs to configure the virtual machine:

### Guest OS:

* Compatibility set to current running vSphere/ESXi version
* Guest OS family set to "Linux"
* Guest OS version set to "Ubuntu Linux (64-bit)"


### Hardware:

* 32GB RAM
* 8 vCores
* SCSI Controller 0 set to LSI Logic Parallel
* SCSI Disk with 500GB
* CDROM/DVD drive mounted with ubuntu-autoinstall-cloud-in-a-box-1.iso image
* Firmware set to "EFI" (VM Options > Boot Options > Firmware > choose EFI)

This configuration has been successfully tested with VMware ESXi 7.0 U1.


## VirtualBox

When running Cloud in a Box on a VirtualBox, you can use the the blow specs for configure the virtual machine:

### General:

* Type Linux
* Version Ubuntu (64-bit)

### System:

* 32GB RAM
* 8 Processors
* Enable PAE/NX
* Enable Nested VT-x/AMD-v
* Extended Feature: Enable EFI (special OSes only)

### Storage:

* Controller: SATA
* Type AHCI
* Use Host I/O Cache
* Disc Size 600 GB

* Controller: IDE
* Optical Drive: IDE Secondary Device
* Live CD/DVD
* Insert the ubuntu-autoinstall-cloud-in-a-box-1.iso image

* Boot Order:  Set Optical as first boot device

This configuration has been successfully tested with VirtualBox 6.1.50 using an Ubuntu 22.04 Host with HWE Kernel 6.5.0
The more CPU, RAM and Disc the better, as this is the bare minimum for a basic installation.

