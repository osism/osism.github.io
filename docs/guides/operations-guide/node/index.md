---
sidebar_label: Node
---

# Node

## Change node states

A node can be in different states. Depending on the state, different actions
are possible or are triggered.

The individual states of a node can be retrieved via Ansible Facts and local
files on the node itself.

### Maintenance

```
osism set maintenance NODE
osism noset maintenance NODE
```

* Ansible fact: `ansible_local.osism.maintenance`
* State file: `/etc/osism/maintenance`

### Bootstrap

```
osism set bootstrap NODE
osism noset bootstrap NODE
```

* Ansible fact: `ansible_local.osism.bootstrap`
* State file: `/etc/osism/bootstrap`

## Manage services

```
osism apply manage-service \
  -e service_name=rsyslog \
  -e service_state=restarted
```

## Manage containers

```
osism apply manage-container \
  -e container_name=nova_compute \
  -e container_action=restart
```

## Reboot nodes

When using reboot play, the node is rebooted directly. It is not ensured in
advance that there is no more payload on the node and no services etc. are
disabled.

Reboot node `testbed-node-0.testbed.osism.xyz` and wait until the reboot has
been completed and the system is accessible again.

```
osism apply reboot \
  -e reboot_wait=True \
  -e ireallymeanit=yes \
  -l testbed-node-0.testbed.osism.xyz
```

Reboot node `testbed-node-0.testbed.osism.xyz` and do not wait for the reboot
to complete.

```
osism apply reboot \
  -e ireallymeanit=yes \
  -l testbed-node-0.testbed.osism.xyz
```

## Working with the OOB Board via IPMI

### Display the IP address

```
$ sudo ipmitool lan print | grep 'IP Address'
IP Address Source       : DHCP Address
IP Address              : 10.10.0.100
```
