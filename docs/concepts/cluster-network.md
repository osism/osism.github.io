---
sidebar_label: Cluster Network
sidebar_position: 26
---

# Cluster network

We recommend building OSISM CloudPods upon a fully L3 network design utilizing
BGP unnumbered host-based routing. This concept requires all involved switches
to fully support
Multi-Protocol BGP unnumbered (
[RFC 5549](https://datatracker.ietf.org/doc/html/rfc5549),
[RFC 4861](https://datatracker.ietf.org/doc/html/rfc4861),
[RFC 4291](https://datatracker.ietf.org/doc/html/rfc4291)
).
On top of this L3 underlay, we recommend using OpenStack OVN to provide SDN for
the IaaS layer. The details of these concepts and how they are employed to
provide the network fabric for a CloudPod are outlined below.

## Concept overview

![BGP_unnumbered](./images/bgp-unnumbered.drawio.svg)

This diagram shows a simple example of one compute and one control node, with
each two interfaces, connected to a switch with SONiC on it.
[Each node runs FRR](#host-based-routing)
([Free Range Routing](https://frrouting.org/)) and establishes direct
[BGP sessions across the IPv6 link-local connections](#bgp-unnumbered)
to the FRR running in the control-plane of the switch. All three have one /32
network configured on their loopback0 interface and announce it to their BGP
neighbors. Additionally, the switch also redistributes the routes from connected
nodes. The switch itself receives the routes to both of the /32 networks of the
nodes and redistributes them. Both nodes receive the route to the 10.10.20.11/32
network on the switch and the route to the /32 network on the respective other
node. Since there are two links between each node and the switch, all routes
have two possible paths, which are used via [ECMP](#ecmp). All of those IPv4
routes use the IPv6 link-local address of the far side of the connected
interface as nexthop. This is only possible if [MP-BGP](#multi-protocol-bgp) is
supported and enabled. On some switches/routers this needs to be specifically
enabled before such IPv4 via IPv6 routes can be accepted.

:::info

It is possible to exclude the network provisioning of the underlay from the
tasks of the OSISM framework and build a fully functional CloudPod on an
existing network architecture. OpenStack OVN itself only requires L3
connectivity between all hosts and is not dependent on our recommended L3
underlay design with BGP unnumbered host-based routing. The management and
design of such network architectures are out of scope in this document.

:::

## Concepts

### BGP unnumbered

Building upon the concept of BGP (Border Gateway Protocol) itself, BGP
unnumbered utilizes IPv6 link-local addresses to establish BGP sessions between
two directly connected peers.  Instead of explicitly configuring an IPv4 (or
IPv6) address as neighbor address
for a BGP router, the automatically assigned IPv6 link-local addresses on each
interface are used to establish a connection to the directly connected BGP
router on the other side. In most BGP configurations, this can be done by just
enabling IPv6 on an interface and specifying the neighbor as connected via this
interface. An example and more detailed description of how this configuration
can be built on SONiC switches can be found
[in this STORDIS blog post](https://stordis.com/bgp-unnumbered-in-enterprise-sonic/)

### Host-based routing

The concept of host-based routing is independent from the chosen routing
technology but is most commonly used in combination with OSPF or BGP to
dynamically connect networks on each host to the switch network fabric. In
contrast to classical network topologies, where hosts statically get assigned a
certain number of IPs to send and receive traffic, here each server actively
participates in the routing domain and announces the networks it hosts.
Typically this is done by running a routing daemon like FRR directly on each
server and peering with the connected switches (which in this case also become
routers). In addition to that, each router (server or switch) usually gets
assigned at least one IPv4 network, which it announces via OSPF or BGP. To be
able to reach each router directly, usually at least one /32 IPv4 or /128 IPv6
network is configured on a dummy or loopback interface and announced via the
chosen routing protocol across the L3 fabric.

### Multi-protocol BGP

Since most software components are still built and rely on IPv4 networking,
utilizing IPv6 technologies like BGP unnumbered usually requires the
[MP-BGP (Multi-Protocol BGP)](https://datatracker.ietf.org/doc/html/rfc5549)
extension to provide the needed network connectivity. Without it, a BGP session
established over an IPv6 link would only be allowed to route IPv6 traffic. With
MP-BGP, it is possible to also advertise and route IPv4 networks across IPv6 BGP
sessions. For the case of host-based routing, this means an IPv4 /32 address can
be configured on the loopback interface of a server and advertised across an
otherwise purely IPv6 fabric, making services on the server reachable via IPv4.

### ECMP

Equal Cost Multi Path (ECMP) routing is a concept where multiple possible paths
between two network endpoints exist and are chosen without any default
precedence. In combination with BGP, ECMP provides a reliable and automatic way
of failover, as long as a sufficient number of paths between two network
elements exist. In combination with BGP unnumbered host-based routing and
multiple physical connections from each server to the switch fabric, ECMP
provides redundancy, high availability, and traffic distribution across the
available links for the connection to each host.

### BFD

While BGP (and other routing protocols) usually rely on the exchange of routing
information and in-band traffic to monitor the functionality of any given
session, Bidirectional Forwarding Detection (BFD) provides sub-second failure
detection of links. While BGP relies on the session keepalive messages to detect
if any given peering is failing, BFD continuously sends out-of-band UDP packets
to monitor the link to the connected routers itself. Although this is not
strictly needed, it provides a much faster network convergence in case of a link
failure than just BGP itself.

## CloudPod networking (underlay)

Within an OSISM CloudPod, we assign each server and switch one /32 IPv4 network
on a dedicated loopback0 interface. All servers run FRR as a routing daemon. If
SONiC switches are used, they also run FRR, but generally all switches that
support MP-BGP unnumbered can be used here to build the fabric. This /32 network
is announced via BGP unnumbered across all connected links. Each router (switch)
in the network fabric additionally redistributes the routes to all connected
networks to all peers. To provide redundancy, we recommend connecting each
server to at least two different switches. In the case of a leaf-spine
architecture, each leaf should also be connected to at least two spines. The
number of required additional interconnects between switches depends on the
exact topology and bandwidth requirements. At least one switch (typically a
spine) should be connected to an external router providing outward connectivity
to the internet. For redundancy, at least two such uplinks should exist from the
network fabric. The external router should announce a default route to the
connected switch, which will be distributed across the fabric to all connected
servers to provide outward connectivity.

## OpenStack networking (overlay)

OVN is used to provide Software Defined Networking (SDN) for OpenStack. Building
on top of the MP-BGP unnumbered host-based routing underlay, OVN uses Geneve as
network encapsulation for the overlay. Although other L3 encapsulations like
VXLAN are supported, Geneve is currently the default one used by OpenStack
Neutron and therefore our recommendation.

:::info

Traditional L2 network segmentations like VLAN cannot be used in combination
with the described L3 fabric unless they are additionally encapsulated and
transported via L3.

:::

OpenStack Neutron utilizes OVN. OVN itself uses OvS flows and bridges to build
Geneve tunnels between the /32 networks on the loopback0 interfaces of each
compute and network node in the cluster across the fabric. OpenStack project
networks are isolated via dedicated Geneve VNIs for each network, effectively
providing L3 separation between those.

## Further reading

- [Basic SONiC configuration](https://stordis.com/basic-configuration-and-management-of-sonic-devices/)
- [BGP configuration in SONiC](https://stordis.com/deploying-bgp-underlay-in-enterprise-sonic/)
- [BGP configuration in FRR](https://docs.frrouting.org/en/latest/bgp.html)
