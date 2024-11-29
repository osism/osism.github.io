---
sidebar_label: Network
sidebar_position: 15
---

# Network

Two options are available for installing the Openstack network.

* Open Virtual Network with Open vSwitch:
  * the default, recommended
  * configuration value `ovn`
* Open vSwitch:
  * configuration value `openvswitch`

The selected option is configured in the following file:
```yaml title="environments/kolla/configuration.yml"
# neutron
neutron_plugin_agent: "ovn"
```

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
