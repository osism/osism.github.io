---
slug: 2024-01-16-use-of-the-container-shell
title: Use of the container shell
authors: [berendt]
tags: [OSISM, Machine Room]
---
With the OSISM CLI it is possible to enter a shell on a container running on a node.

This is useful, for example, to view running instances that are managed via Libvirt.

In this example, the command `virsh list` is executed in the `nova_libvirt` container
running on the `com1069` node.

```
$ osism console com1069/nova_libvirt
(nova-libvirt)[root@com1069 /]# virsh list
 Id    Name                State
------------------------------------
 190   instance-001b2492   running

(nova-libvirt)[root@com1069 /]#
```
