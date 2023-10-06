---
sidebar_label: Network
sidebar_position: 15
---

# Network

## Open vSwitch

```
osism apply -a pull openvswitch
osism apply openvswitch
```

## OVN (if used)

Before the deployment of OVN, the deployment of Open vSwitch must already have been done.

```
osism apply -a pull ovn
osism apply ovn
```
