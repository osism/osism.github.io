# Running on a virtual machine

## KVM

### Nested virtualization

You likely want to run virtual machines on top of your Cloud in a Box.
The host machine has to support and enabled nested virtualization.

To enable nested virtualization the CPU configuration of the VM has to be `host-passthrough` or `host-model`

* [Enabling nested virtualization in Fedora](https://docs.fedoraproject.org/en-US/quick-docs/using-nested-virtualization-in-kvm/)

The linked guide can be used in other distributions as well.

### Disk space saving

When using Cloud in a Box in a VM, you can utilize the qcow2 disk image or similar technology to save space.
In that case, the base installation requires just around 70 GB instead of a full 1 TB.
(*The drive still needs to be made with a capacity of at least 1TB; however, the actual disk space usage is lower.*)

Also in case you want to experiment a bit more and "hack around" using the manual installation
you can make disk snapshots when turned off after the Ubuntu installs, `bootstrap.sh` and `deploy.sh` to speed up your
progress.

If you use qemu, you can use following command to do snapshots.

```bash
sudo virsh snapshot-create-as --domain cib bootstrap "run of bootstrap.sh" --disk-only --diskspec sda,snapshot=external,file=/var/lib/libvirt/images/ub2022_cib_boostrap.qcow2 --atomic
```

### QEMU guest agent

When running inside QEMU, it may be worth it to install the QEMU guest agent.

```bash
sudo apt -y install qemu-guest-agent
sudo systemctl enable qemu-guest-agent
sudo systemctl start qemu-guest-agent
```
