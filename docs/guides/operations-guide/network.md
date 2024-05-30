---
sidebar_label: Network
---

# Network

OpenStack, OVN, and Open vSwitch all really like UUIDs.

```
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

```
abbrev() { a='[0-9a-fA-F]' b=$a$a c=$b$b; sed "s/$b-$c-$c-$c-$c$c$c//g"; }
```

You can use this as a filter to abbreviate UUIDs. For example, use it to abbreviate
the above image list:

```
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

```
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

```
ovn_nb_connection=$(sudo grep -P -o -e "(?<=^ovn_nb_connection = ).*" "/etc/kolla/neutron-server/ml2_conf.ini")
ovn_sb_connection=$(sudo grep -P -o -e "(?<=^ovn_sb_connection = ).*" "/etc/kolla/neutron-server/ml2_conf.ini")
```

The following examples are from a fresh [osism/testbed](https://github.com/osism/testbed)
deployment with no payload running yet.

OVN NB DB entries:

```
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

```
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

```
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

```
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
