---
sidebar_label: Network
sidebar_position: 15
---

# Network

1. Open vSwitch (OVS)

   ```
   osism apply -a pull openvswitch
   osism apply openvswitch
   ```

2. Open Virtual Network (OVN)

   In `environments/kolla/configuration.yml` the parameter `neutron_plugin_agent` is set to
   `ovn`. The parameter is set to `ovn` by default in the Cookiecutter and is the OSISM default.

   ```yaml title="environments/kolla/configuration.yml"
   # neutron
   neutron_plugin_agent: "ovn"
   ```

   Before the deployment of OVN, the deployment of Open vSwitch must already have been done.

   ```
   osism apply -a pull ovn
   osism apply ovn
   ```
