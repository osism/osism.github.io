---
sidebar_label: Network
sidebar_position: 15
---

# Network

## Open vSwitch

```
osism apply -a pull openvswitch
osism apply -a upgrade openvswitch
```

## OVN

Before the upgrade of OVN, the upgrade of Open vSwitch must already have been done.

```
osism apply -a pull ovn
osism apply -a upgrade ovn
```
