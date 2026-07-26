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

## DNS resolution for instances (OVN)

Neutron resolves the DNS servers it hands to instances in this order, using the
first one that is set:

1. the subnet's own `dns_nameservers`
2. the `dns_servers` option in the `[ovn]` section
3. the DNS resolvers of the host running `neutron-server`

The options are described in the
[Neutron admin guide](https://docs.openstack.org/neutron/latest/admin/config-dns-res.html).
Setting `dns_nameservers` per subnet is the recommended approach and takes
precedence over everything below it.

Note that the third step is not a useful fallback on an OSISM deployment. The
`osism.commons.resolvconf` role points `/etc/resolv.conf` at the
`systemd-resolved` stub (`127.0.0.53`) and configures the real upstream
resolvers in `resolved.conf` instead. Neutron does not filter loopback
addresses out of that file, and the containers run in the host network
namespace, so `127.0.0.53` is what gets advertised to instances — where it
resolves nothing. Instances on a subnet without `dns_nameservers` then have no
working DNS at all, including internal name resolution.

If your deployment has subnets without their own `dns_nameservers`, set the
resolvers explicitly in `environments/kolla/files/overlays/neutron/ml2_conf.ini`:

```ini
[ovn]
dns_servers = 192.0.2.53,192.0.2.54
```

Any resolver reachable from the provider network works. Note that
`neutron_dnsmasq_dns_servers`, which defaults to public resolvers, only applies
to the ML2/OVS DHCP agent and has no effect on an OVN deployment.
