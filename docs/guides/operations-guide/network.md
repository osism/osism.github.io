---
sidebar_label: Network
---

# Network

## Modifying the network configuration

While the network layout of a production environment is mostly static,
sometimes it is necessary to make changes. There is however no guarantee that
the transition from one network configuration state to the next does not cause
interruptions to existing network flows. E.g. even very short down/up cycles of
interfaces may cause additional disturbances to SDN networks in upper layers,
which are not reconciled immediately or never at all.
Therefore it is required to move any existing payload when modifying the
network configuration of compute nodes. You may use the `osism` command
to achieve this, e.g.:

```bash
osism manage compute migrate $COMPUTE_NODE
```

Applying the network change is then limited to the empty compute node, e.g.:

```bash
osism apply network --limit $COMPUTE_NODE
```

While it is possible to make the changes effective immediately by appending
`--extra-vars network_allow_service_restart=true` to the command above, it is
recommended to make changes effective through restart of the node. The reason
for this is that some changes, like e.g. removal of an interface from
configuration, will not necessarily lead to it being removed, but just to it
being unmanaged. A reboot will ensure that only the actually defined network
configuration will be set up. You may use `osism` to reboot the node and wait
for it to come back up:

```bash
osism apply reboot --limit $COMPUTE_NODE --extra-vars reboot_wait=true --extra-vars ireallymeanit=yes
```

## Internal components

OpenStack, OVN, and Open vSwitch all really like UUIDs.

```console
$ openstack --os-cloud admin image list -f yaml
- ID: d64f0b9d-0ea1-40b0-b879-b98e46fc7bcf
  Name: Cirros 0.6.0
  Status: active
- ID: ee842bc5-dd29-4de5-a5db-1c9be759fe85
  Name: Cirros 0.6.1
  Status: active
- ID: cd28d95c-bd12-4e1e-8155-b9bf5ecbcb2f
  Name: Cirros 0.6.2
  Status: active
```

These UUIDs are great for uniqueness, but 36-character strings are terrible
for readability. Statistically, just the first few characters are enough for
uniqueness in small environments, so let’s define a helper to make things more
readable:

```bash
abbrev() { a='[0-9a-fA-F]' b=$a$a c=$b$b; sed "s/$b-$c-$c-$c-$c$c$c//g"; }
```

You can use this as a filter to abbreviate UUIDs. For example, use it to abbreviate
the above image list:

```console
$ openstack --os-cloud admin image list -f yaml | abbrev
- ID: d64f0b
  Name: Cirros 0.6.0
  Status: active
- ID: ee842b
  Name: Cirros 0.6.1
  Status: active
- ID: cd28d9
  Name: Cirros 0.6.2
  Status: active
```

Source: https://docs.ovn.org/en/stable/tutorials/ovn-openstack.html#shortening-uuids

## Open vSwitch (OVS)

* https://gist.github.com/djoreilly/c5ea44663c133b246dd9d42b921f7646

Open vSwitch on a network node with external network `vxlan0` and integration
with the Octavia service via `ohm0`.

```console
$ docker exec -it openvswitch_vswitchd ovs-vsctl show
2e6227aa-33f1-4762-8831-ab678ce7272d
    Bridge br-int
        fail_mode: secure
        datapath_type: system
        Port ovn-testbe-0
            Interface ovn-testbe-0
                type: geneve
                options: {csum="true", key=flow, remote_ip="192.168.16.12"}
        Port br-int
            Interface br-int
                type: internal
        Port ovn-testbe-1
            Interface ovn-testbe-1
                type: geneve
                options: {csum="true", key=flow, remote_ip="192.168.16.11"}
        Port tap8fe7d09b-90
            Interface tap8fe7d09b-90
        Port ohm0
            Interface ohm0
                type: internal
    Bridge br-ex
        Port vxlan0
            Interface vxlan0
        Port br-ex
            Interface br-ex
                type: internal
```

## Open Virtual Network (OVN)

* https://docs.ovn.org/en/stable/tutorials/ovn-openstack.html

Get OVN NB and OVN SB connection information from the `/etc/kolla/neutron-server/ml2_conf.ini`
file.

```bash
ovn_nb_connection=$(sudo grep -P -o -e "(?<=^ovn_nb_connection = ).*" "/etc/kolla/neutron-server/ml2_conf.ini")
ovn_sb_connection=$(sudo grep -P -o -e "(?<=^ovn_sb_connection = ).*" "/etc/kolla/neutron-server/ml2_conf.ini")
```

The following examples are from a fresh [osism/testbed](https://github.com/osism/testbed)
deployment with no payload running yet.

OVN NB DB entries:

```console
$ docker exec ovn_northd ovn-nbctl --db "$ovn_nb_connection" show | abbrev
switch b5139b (neutron-8fe7d0) (aka lb-mgmt-net)
    port 45a49e
        type: localport
        addresses: ["fa:16:3e:fa:99:ea 10.1.0.2"]
    port 4d39a5 (aka octavia-listen-port-testbed-node-2)
        addresses: ["fa:16:3e:dc:11:e4 10.1.0.45"]
    port 8df1b7 (aka octavia-listen-port-testbed-node-0)
        addresses: ["fa:16:3e:4d:63:a9 10.1.0.43"]
    port ddb6aa (aka octavia-listen-port-testbed-node-1)
        addresses: ["fa:16:3e:67:f3:3d 10.1.0.40"]
```

OVN SB DB entries:

```console
$ docker exec ovn_northd ovn-sbctl --db "$ovn_sb_connection" show | abbrev
Chassis testbed-node-0
    hostname: testbed-node-0
    Encap geneve
        ip: "192.168.16.10"
        options: {csum="true"}
    Port_Binding "8df1b7"
Chassis testbed-node-2
    hostname: testbed-node-2
    Encap geneve
        ip: "192.168.16.12"
        options: {csum="true"}
    Port_Binding "4d39a5"
Chassis testbed-node-1
    hostname: testbed-node-1
    Encap geneve
        ip: "192.168.16.11"
        options: {csum="true"}
    Port_Binding "ddb6aa
```

OVN NB status:

```console
$ docker exec ovn_nb_db ovs-appctl -t /var/run/ovn/ovnnb_db.ctl cluster/status OVN_Northbound | abbrev
6d15
Name: OVN_Northbound
Cluster ID: f5eb (f5ebd8)
Server ID: 6d15 (6d159e)
Address: tcp:192.168.16.10:6643
Status: cluster member
Role: follower
Term: 5
Leader: 87d6
Vote: 87d6

Last Election started 41049332 ms ago, reason: timeout
Election timer: 1000
Log: [2, 54]
Entries not yet committed: 0
Entries not yet applied: 0
Connections: ->21d7 ->87d6 <-87d6 <-21d7
Disconnections: 6
Servers:
    6d15 (6d15 at tcp:192.168.16.10:6643) (self)
    87d6 (87d6 at tcp:192.168.16.11:6643) last msg 266 ms ago
    21d7 (21d7 at tcp:192.168.16.12:6643) last msg 41048563 ms ago
```

OVN SB status:

```console
$ docker exec ovn_sb_db ovs-appctl -t /var/run/ovn/ovnsb_db.ctl cluster/status OVN_Southbound | abbrev
be29
Name: OVN_Southbound
Cluster ID: bd0c (bd0c26)
Server ID: be29 (be2932)
Address: tcp:192.168.16.10:6644
Status: cluster member
Role: follower
Term: 6
Leader: dfdf
Vote: unknown

Last Election started 41063820 ms ago, reason: timeout
Election timer: 1000
Log: [2, 62]
Entries not yet committed: 0
Entries not yet applied: 0
Connections: ->dfdf ->085c <-dfdf <-085c
Disconnections: 7
Servers:
    be29 (be29 at tcp:192.168.16.10:6644) (self)
    dfdf (dfdf at tcp:192.168.16.11:6644) last msg 146 ms ago
    085c (085c at tcp:192.168.16.12:6644) last msg 41063293 ms ago
```

### L3 high availability

Router L3 high availability is built natively into OVN and does not require any actions from neutron. OVN routers are shown as "HA" in neutron, with the flag being immutable.

Nodes providing connection to external networks do have the `ovn-cms-options` key in their `Open_vSwitch` tables `external_ids` column set to `enable-chassis-as-gw`. This is done automatically in `osism` for all hosts in inventory group `ovn-controller-network`, which defaults to include all network nodes.
You can check this on any particular node by running

```bash
docker exec openvswitch_vswitchd ovs-vsctl get Open_vSwitch . external_ids:ovn-cms-options
```

All nodes with the `ovn-cms-options=enable-chassis-as-gw` property take part in active/passive router gateway high availability.
Gateway chassis will monitor other gateway chassis and compute node chassis, while compute node chassis will monitor all gateway chassis, but not each other.
Monitoring is done using [Bidirectional Forwarding Detection (BFD)](https://datatracker.ietf.org/doc/html/rfc5880) over the geneve tunnels established between each chassis.
Failures detected this way are

* Disconnection of the gateway chassis from the network used for tunneling:
  The BFD signal will be disrupted, since it it being send over the tunnel network. It is therefore advisable to not use a different physical network as tunnel network.
* Stop/Crash of `openvswitch_vswitchd`:
  The daemon is the source of the BFD signal.
* Graceful termination of ovn-controller
  The OVN controller will unregister the chassis on being gracefully stopped.
  Note, that sending SIGTERM does not initiate graceful shutdown of this service.

Note that there is no detection of failures in the external network connectivity of a gateway chassis and subsequently no failover in this case!

For each router created in neutron a `Logical_Router` object is created in the OVN northd DB. The list can be retrieved by connecting to one of the hosts running `ovn-northd`

```console
docker exec ovn_northd ovn-nbctl --db $ovn_nb_connection list Logical_Router
_uuid               : f0ea6a95-d4bd-40e0-9efd-6da197825981
copp                : []
enabled             : true
external_ids        : {"neutron:availability_zone_hints"="", "neutron:revision_number"="5", "neutron:router_name"=test}
load_balancer       : []
load_balancer_group : []
name                : neutron-e9133cdd-7c31-4f67-8aac-a32384ce7939
nat                 : [960ebe78-3f75-4f6e-bab4-c19522407d20, 982dc2bc-4536-4912-90fb-2aca7ba358c3]
options             : {always_learn_from_arp_request="false", dynamic_neigh_routers="true", mac_binding_age_threshold="0"}
policies            : []
ports               : [bc73e085-ea33-45a9-89cf-78f81625d172, edff2d86-3bdb-4396-a307-d7bfc69ac2d0]
static_routes       : [fa183064-0953-4c93-880a-78b049a8846f]
```

The `ovn_nb_connection` is retrieved from the neutron ML2 configuration in the same as [described above](#open-virtual-network-ovn).

Finding the routers external gateway port directly may be achieved by searching the OVN's `Logical_Router_Port` table for logical router ports having the `neutron:is_ext_gw=True` and `neutron:router_name=$Router_ID` in their `external_ids` column, where `$ROUTER_ID` is the ID of the router in neutron, which may also be found as part of the `name` in the OVN `Logical_Router` above.

```console
ROUTER_ID="e9133cdd-7c31-4f67-8aac-a32384ce7939"
docker exec ovn_northd ovn-nbctl --db $ovn_nb_connection find Logical_Router_Port external_ids:\"neutron:is_ext_gw\"=True external_ids:\"neutron:router_name\"=$ROUTER_ID
_uuid               : bc73e085-ea33-45a9-89cf-78f81625d172
enabled             : []
external_ids        : {"neutron:is_ext_gw"=True, "neutron:network_name"=neutron-b7cb8fa6-10ee-4470-9212-95bb30390cc6, "neutron:revision_number"="322", "neutron:router_name"="e9133cdd-7c31-4f67-8aac-a32384ce7939", "neutron:subnet_ids"="9095ecb9-e32b-4ed7-8fdf-d9dd8bdaf50b"}
gateway_chassis     : [06ce2cd0-b901-47c1-8bbd-889e16b1ae0f, cdf5423d-be53-44d4-b9cb-7df4138832b0, fadc4891-66ef-4478-b56c-66bf11cfff08]
ha_chassis_group    : []
ipv6_prefix         : []
ipv6_ra_configs     : {}
mac                 : "fa:16:3e:78:8c:d7"
name                : lrp-429c0111-ba3b-4641-b4ac-3fad8749e592
networks            : ["192.168.112.179/20"]
options             : {}
peer                : []
status              : {hosting-chassis=testbed-node-1}
```

The `gateway_chassis` field in the output above shows the chassis currently involved providing high availability for the port and the `status` field shows the currently active chassis as the value of the `hosting-chassis` key.
At most five gateway chassis are used even if more nodes with external connectivity are available to keep BFD complexity low.
To look at the gateway chassis names and their priorities the bare list of gateway chassis from the command above may used to retrieve them specifically

```console
docker exec ovn_northd ovn-nbctl --db=tcp:127.0.0.1:6641 --columns chassis_name,priority list Gateway_Chassis \
  $(docker exec ovn_northd ovn-nbctl --db=tcp:127.0.0.1:6641 --bare --columns gateway_chassis find Logical_Router_Port external_ids:\"neutron:is_ext_gw\"=True external_ids:\"neutron:router_name\"=$ROUTER_ID)
chassis_name        : testbed-node-2
priority            : 2

chassis_name        : testbed-node-0
priority            : 1

chassis_name        : testbed-node-1
priority            : 3
```

#### Testing OVN router L3 high availability

* In a test installation create a test environment
* Find the router ID and query the `hosting-chassis` as described above
* Run a network test through the router, e.g. by pinging the external gateway
* Connect to the hosting chassis and cause a failover by triggering one of the detected failures above
* Observe change of the hosting-chassis as described above
* Evaluate packet-loss in the network test

During testing of the first two detected failures listed above (loss of tunnel network connectivity and stop of `openvswitch_vswitchd`) loss of a couple of ICMP echo replies was observed occasionally, while fallback consistently resulted in loss of multiple ICMP echo replies.
During tests of graceful shutdown of `ovn-controller` no loss of ICMP replies was observed. Additionally no fallback occurred, but logical router port priorities were adapted instead, thus giving a seamless networking experience even during shutdown of network nodes.

#### References
https://docs.openstack.org/neutron/latest/admin/ovn/refarch/refarch.html
https://docs.openstack.org/neutron/latest/admin/ovn/routing.html#l3ha-support
https://docs.openstack.org/neutron/latest/admin/ovn/l3_scheduler.html
https://docs.ovn.org/en/latest/topics/high-availability.html
