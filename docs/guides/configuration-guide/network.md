---
sidebar_label: Network
sidebar_position: 98
---

# Network

## IPv6 fabric underlay

Example configuration for a node. The configuration is stored in the `host_vars` file for the node in `inventory`
directory in the configuration repository.

```yaml
##########################################################
# ansible

ansible_host: 10.10.42.10
```

```yaml
##########################################################
# generic

internal_interface: dummy0
```

```yaml
##########################################################
# network

network_type: netplan
network_dummy_interfaces:
  - dummy0
network_ethernets:
  enp99s0f0np0:
    mtu: 9100
  enp99s0f1np1:
    mtu: 9100
  dummy0:
    addresses:
      - 10.10.42.10/32
      - 2001:db8::10:10:42:10/128
```

```yaml
##########################################################
# frr

frr_local_as: 4210042010
frr_loopback_v4: 10.10.42.10
frr_loopback_v6: 2001:db8::10:10:42:10
frr_uplinks:
  - interface: enp99s0f0np0
    remote_as: 65401
  - interface: enp99s0f1np1
    remote_as: 65402
```

```yaml
##########################################################
# kolla

network_interface: "{{ internal_interface }}"
```
