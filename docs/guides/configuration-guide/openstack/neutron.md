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

## DNS Resolution for Instances (OVN)

Neutron resolves the DNS servers it hands to instances in this order, using the
first level that is not empty:

1. the subnet's own `dns_nameservers`
2. the `dns_servers` option in the `[ovn]` section
3. the DNS resolvers of the host running `neutron-server`, read from its
   `/etc/resolv.conf`

Levels 2 and 3 are filtered by the IP version of the subnet, level 1 is used as
it is.

The options are described in the
[Neutron admin guide](https://docs.openstack.org/neutron/latest/admin/config-dns-res.html).
Setting `dns_nameservers` per subnet is the recommended approach and takes
precedence over everything below it.

:::warning

The third level is not a usable fallback on an OSISM deployment. The
`osism.commons.resolvconf` role points `/etc/resolv.conf` at the
`systemd-resolved` stub (`127.0.0.53`) and configures the real upstream
resolvers in `resolved.conf` instead. Neutron only checks that the entries in
`/etc/resolv.conf` are syntactically valid addresses, it does not filter
loopback addresses, and the containers run in the host network namespace. So
`127.0.0.53` is what gets advertised to instances, where it resolves nothing.

Instances on a subnet without `dns_nameservers` then have no working DNS at
all, including internal name resolution, and nothing in the logs points at it.
For IPv4, Neutron warns only when it finds no resolver at all, and the loopback
stub is a syntactically valid address, so there is nothing for it to warn about.
The DHCPv6 path omits the option without warning either way.

:::

### Setting the resolvers for the whole deployment

If your deployment has subnets without their own `dns_nameservers`, set the
resolvers explicitly in `environments/kolla/files/overlays/neutron/ml2_conf.ini`:

```ini
[ovn]
dns_servers = 192.0.2.53,192.0.2.54
```

Only the keys shown above belong in the file, see
[Customization of the service configurations](./index.md#customization-of-the-service-configurations).

Apply the change with `osism apply neutron`. The resolvers have to be reachable
from the instances.

:::note

Restarting `neutron-server` does not rewrite the DHCP options of subnets that
already exist. Neutron reconciles them at startup only if `[ovn]
neutron_sync_mode` is set to `repair`, and the default is `log`. Subnets created
after the change get the new resolvers, existing subnets keep the old ones until
the subnet is updated.

The update has to change something. Setting an attribute to the value it already
has is not enough: the client then sends no request at all and still exits
successfully, so nothing happens and nothing reports it. Changing the
description does work, so note the previous one down and put it back rather than
leaving it overwritten:

```console
openstack subnet show SUBNET -f value -c description
openstack subnet set --description "refresh dhcp options" SUBNET
openstack subnet set --description "PREVIOUS DESCRIPTION" SUBNET
```

Instances then pick up the new resolvers with their next DHCP lease.

:::

`dns_servers` is a single list for both IP versions and is filtered per subnet.
On a dual-stack deployment, list an IPv6 resolver as well. Otherwise IPv6
subnets fall through to the host resolvers, and as the `systemd-resolved` stub
is IPv4-only, they end up with no DNS server in the DHCPv6 reply at all.

To announce no resolver at all instead of a broken one, set `dns_servers` to the
any address, `0.0.0.0` for IPv4 and `::` for IPv6. This only takes effect if it
is the only entry remaining for that IP version, so use `0.0.0.0,::` to cover
both. Neutron then omits the DNS option from the DHCP reply entirely.

Note that `neutron_dnsmasq_dns_servers`, which defaults to public resolvers,
only applies to the ML2/OVS DHCP agent and has no effect on an OVN deployment.
