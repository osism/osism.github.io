---
sidebar_label: Network
sidebar_position: 6
---

# Network

The osism.commons.network role is used for the netwok configuration.
[Netplan](https://netplan.io) is used by default. It is also possible to use the
old `/etc/interfaces` file.

## Netplan

```yaml title="Since OSISM 6.1.0, the default network type is a netplan and no longer needs to be set explicitly"
network_type: netplan
```

The configuration is written to `/etc/netplan/01-osism.yaml` by default. Can be changed
via the `network_netplan_path` and `network_netplan_file` parameters. The file permissions
are `0600` by default (cane be changed via the `network_netplan_permissions` parameter).
By default, all other files in `/etc/netplan` are removed. If you do not want this, you
can set `network_netplan_remove_unmanaged_files` to `false`. It is also possible to explicitly
list individual files that should not be deleted in `network_netplan_managed_files_extra`.

An existing `/etc/intefaces` file is replaced with a placeholder file. It is not possible
to use `/etc/interfaces` and Netplan in parallel.

```yaml title="This template is used as the base for the configuration"
# This file describes the network interfaces available on your system
# For more information, see netplan(5).
---
network:
  version: {{ network_version }}
  renderer: {{ network_renderer }}

  bonds:
    {{ network_bonds|to_nice_yaml(indent=4)|indent(4) }}

  bridges:
    {{ network_bridges|to_nice_yaml(indent=4)|indent(4) }}

  ethernets:
    {{ network_ethernets|to_nice_yaml(indent=4)|indent(4) }}

  tunnels:
    {{ network_tunnels|to_nice_yaml(indent=4)|indent(4) }}

  vlans:
    {{ network_vlans|to_nice_yaml(indent=4)|indent(4) }}
```

The parameters listed in the following table can be used in the template.

**Parameter**     | **Default** | **Description**
------------------|-------------|------------------
network_version   | `2`         | Defines what version of the configuration format is used. The only value supported at the moment is 2. 
network_renderer  | `networkd`  | Defines what network configuration tool will be used to set up your configuration. Valid values are networkd and NetworkManager.
network_bonds     | `{}`        | https://netplan.readthedocs.io/en/stable/netplan-yaml/#properties-for-device-type-bonds
network_bridges   | `{}`        | https://netplan.readthedocs.io/en/stable/netplan-yaml/#properties-for-device-type-bridges
network_ethernets | `{}`        | https://netplan.readthedocs.io/en/stable/netplan-yaml/#properties-for-device-type-ethernets
network_tunnels   | `{}`        | https://netplan.readthedocs.io/en/stable/netplan-yaml/#properties-for-device-type-tunnels
network_vlans     | `{}`        | https://netplan.readthedocs.io/en/stable/netplan-yaml/#properties-for-device-type-vlans

Changes to the configuration are currently not applied utomatically. This is done on
purpose to enable a manual check in advance. Changes to the network configuration can
be applied either by rebooting or by executing `netplan apply`.

```
$ osism console --type clush all
Enter 'quit' to leave this interactive mode
Working with nodes: testbed-manager.testbed.osism.xyz,testbed-node-[0-2].testbed.osism.xyz
clush> sudo netplan apply
```

### Example

The Netplan documentation contains a large number of example configurations. The following
example shows the use of [How to create VLANs](https://netplan.readthedocs.io/en/stable/examples/#how-to-create-vlans) with the osism.commons.network role.

```yaml
network_ethernets:
  mainif:
    match:
      macaddress: "de:ad:be:ef:ca:fe"
    set-name: mainif
    addresses: [ "10.3.0.5/23" ]
    nameservers:
      addresses: [ "8.8.8.8", "8.8.4.4" ]
      search: [ example.com ]
    routes:
      - to: default
        via: 10.3.0.1

network_vlans:
  vlan15:
    id: 15
    link: mainif
    addresses: [ "10.3.99.5/24" ]
  vlan10:
    id: 10
    link: mainif
    addresses: [ "10.3.98.5/24" ]
    nameservers:
      addresses: [ "127.0.0.1" ]
      search: [ domain1.example.com, domain2.example.com ]
```

### Dispatcher scripts

### Dummy interfaces

Dummy devices are created with the help of
[systemd.netdev](https://www.freedesktop.org/software/systemd/man/latest/systemd.netdev.html)
and can then be used as a normal netowrk device in the Netplan configuration.

```yaml
network_dummy_interfaces:
  - dummy0
```

The MTU is set to 9000 by default and can be set via `network_dummy_interface_mtu`.

## `/etc/interfaces`

```yaml title="If /etc/interfaces is to be used, the network_type must be explicitly set in environments/configuration.yml"
network_type: interfaces
```
