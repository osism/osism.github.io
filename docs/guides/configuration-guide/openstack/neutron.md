---
sidebar_label: Neutron
---

# Neutron

* [Neutron admin guide](https://docs.openstack.org/neutron/latest/admin/index.html)
* [Neutron configuration guide](https://docs.openstack.org/neutron/latest/configuration/index.html)
* [Neutron configuration reference](https://docs.openstack.org/neutron/latest/configuration/config.html)

Neutron-Dynamic-Routing:

* [Neutron-Dynamic-Routing admin guide](https://docs.openstack.org/neutron-dynamic-routing/latest/admin/index.html)
* [Neutron-Dynamic-Routing configuration guide](https://docs.openstack.org/neutron-dynamic-routing/latest/configuration/index.html)
* [Neutron-Dynamic-Routing configuration reference](https://docs.openstack.org/neutron-dynamic-routing/latest/configuration/bgp_dragent.html)

Neutron-VPNaaS:

* [Neutron-VPNaaS admin guide](https://docs.openstack.org/neutron-vpnaas/latest/admin/index.html)
* [Neutron-VPNaaS configuration guide](https://docs.openstack.org/neutron-vpnaas/latest/configuration/index.html)

## MTU Considerations

Neutron uses the MTU of the underlying physical network to calculate the MTU for virtual network
components including instance network interfaces. By default, it assumes a standard 1500-byte MTU
for the underlying physical network.

Neutron only references the underlying physical network MTU. Changing the underlying physical network
device MTU requires configuration of physical network devices such as switches and routers.

The configuration is described in the [Neutron admin guide](https://docs.openstack.org/neutron/latest/admin/config-mtu.html).
The configuration files are placed under `environments/kolla/files/overlays/neutron/ml2_conf.ini`
and `environments/kolla/files/overlays/neutron.conf`.
