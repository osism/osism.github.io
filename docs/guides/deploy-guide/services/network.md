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

## OVN

In `environments/kolla/configuration.yml` the parameter `neutron_plugin_agent` is set to
`ovn` if OVN is used as a network plugin. Otherwise the network plugin is set to `openvswitch`.

```yaml title="environments/kolla/configuration.yml"
# neutron
neutron_plugin_agent: "ovn"
neutron_ovn_availability_zones: [ nova ]
```

The deployment of the Open vSwitch service is non-optional.
Before the deployment of OVN, the deployment of Open vSwitch must already have been done.

```
osism apply -a pull ovn
osism apply ovn
```
