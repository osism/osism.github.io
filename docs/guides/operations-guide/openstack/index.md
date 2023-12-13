---
sidebar_label: OpenStack
sidebar_position: 60
---

# OpenStack

## Add a new compute node

```
osism apply operator -u osism -l NODE
osism apply bootstrap -l NODE
osism apply common -l NODE
osism apply openvswitch -l NODE
osism apply ovn -l NODE
osism apply prometheus -l NODE
osism apply ceilometer -l NODE
osism apply neutron -l NODE
osism apply nova -l NODE
```

If Scaphandre is used:

```
osism apply scaphandre -l NODE
```
