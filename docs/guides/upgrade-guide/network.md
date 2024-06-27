---
sidebar_label: Network
sidebar_position: 15
---

# Network

1. Open vSwitch (OVS)

   ```
   osism apply -a pull openvswitch
   osism apply -a upgrade openvswitch
   ```

2. Open Virtual Network (OVN)

   In `environments/kolla/configuration.yml` the parameter `neutron_plugin_agent` is set to
   `ovn` if OVN is used as a network plugin. The parameter is set to `ovn` by default in the
   Cookiecutter.

   ```yaml title="environments/kolla/configuration.yml"
   # neutron
   neutron_plugin_agent: "ovn"
   ```

   Otherwise the network plugin is set to `openvswitch`.
   If the `neutron_plugin_agent` is set to `openvswitch`, this step does not need to be done.

   Before the upgrade of OVN, the upgrade of Open vSwitch must already have been done.

   ```
   osism apply -a pull ovn
   osism apply -a upgrade ovn
   ```
