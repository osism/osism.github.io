"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8321],{1698:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"guides/operations-guide/network","title":"Network","description":"OpenStack, OVN, and Open vSwitch all really like UUIDs.","source":"@site/docs/guides/operations-guide/network.md","sourceDirName":"guides/operations-guide","slug":"/guides/operations-guide/network","permalink":"/de/docs/guides/operations-guide/network","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/network.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"Network"},"sidebar":"tutorialSidebar","previous":{"title":"Infrastructure","permalink":"/de/docs/guides/operations-guide/infrastructure"},"next":{"title":"OpenStack","permalink":"/de/docs/guides/operations-guide/openstack/"}}');var o=t(4848),i=t(8453);const r={sidebar_label:"Network"},a="Network",c={},d=[{value:"Open vSwitch (OVS)",id:"open-vswitch-ovs",level:2},{value:"Open Virtual Network (OVN)",id:"open-virtual-network-ovn",level:2},{value:"L3 high availability",id:"l3-high-availability",level:3},{value:"Testing OVN router L3 high availability",id:"testing-ovn-router-l3-high-availability",level:4},{value:"References",id:"references",level:4}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"network",children:"Network"})}),"\n",(0,o.jsx)(n.p,{children:"OpenStack, OVN, and Open vSwitch all really like UUIDs."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ openstack --os-cloud admin image list -f yaml\n- ID: d64f0b9d-0ea1-40b0-b879-b98e46fc7bcf\n  Name: Cirros 0.6.0\n  Status: active\n- ID: ee842bc5-dd29-4de5-a5db-1c9be759fe85\n  Name: Cirros 0.6.1\n  Status: active\n- ID: cd28d95c-bd12-4e1e-8155-b9bf5ecbcb2f\n  Name: Cirros 0.6.2\n  Status: active\n"})}),"\n",(0,o.jsx)(n.p,{children:"These UUIDs are great for uniqueness, but 36-character strings are terrible\nfor readability. Statistically, just the first few characters are enough for\nuniqueness in small environments, so let\u2019s define a helper to make things more\nreadable:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"abbrev() { a='[0-9a-fA-F]' b=$a$a c=$b$b; sed \"s/$b-$c-$c-$c-$c$c$c//g\"; }\n"})}),"\n",(0,o.jsx)(n.p,{children:"You can use this as a filter to abbreviate UUIDs. For example, use it to abbreviate\nthe above image list:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ openstack --os-cloud admin image list -f yaml | abbrev\n- ID: d64f0b\n  Name: Cirros 0.6.0\n  Status: active\n- ID: ee842b\n  Name: Cirros 0.6.1\n  Status: active\n- ID: cd28d9\n  Name: Cirros 0.6.2\n  Status: active\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Source: ",(0,o.jsx)(n.a,{href:"https://docs.ovn.org/en/stable/tutorials/ovn-openstack.html#shortening-uuids",children:"https://docs.ovn.org/en/stable/tutorials/ovn-openstack.html#shortening-uuids"})]}),"\n",(0,o.jsx)(n.h2,{id:"open-vswitch-ovs",children:"Open vSwitch (OVS)"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://gist.github.com/djoreilly/c5ea44663c133b246dd9d42b921f7646",children:"https://gist.github.com/djoreilly/c5ea44663c133b246dd9d42b921f7646"})}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Open vSwitch on a network node with external network ",(0,o.jsx)(n.code,{children:"vxlan0"})," and integration\nwith the Octavia service via ",(0,o.jsx)(n.code,{children:"ohm0"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'$ docker exec -it openvswitch_vswitchd ovs-vsctl show\n2e6227aa-33f1-4762-8831-ab678ce7272d\n    Bridge br-int\n        fail_mode: secure\n        datapath_type: system\n        Port ovn-testbe-0\n            Interface ovn-testbe-0\n                type: geneve\n                options: {csum="true", key=flow, remote_ip="192.168.16.12"}\n        Port br-int\n            Interface br-int\n                type: internal\n        Port ovn-testbe-1\n            Interface ovn-testbe-1\n                type: geneve\n                options: {csum="true", key=flow, remote_ip="192.168.16.11"}\n        Port tap8fe7d09b-90\n            Interface tap8fe7d09b-90\n        Port ohm0\n            Interface ohm0\n                type: internal\n    Bridge br-ex\n        Port vxlan0\n            Interface vxlan0\n        Port br-ex\n            Interface br-ex\n                type: internal\n'})}),"\n",(0,o.jsx)(n.h2,{id:"open-virtual-network-ovn",children:"Open Virtual Network (OVN)"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.ovn.org/en/stable/tutorials/ovn-openstack.html",children:"https://docs.ovn.org/en/stable/tutorials/ovn-openstack.html"})}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Get OVN NB and OVN SB connection information from the ",(0,o.jsx)(n.code,{children:"/etc/kolla/neutron-server/ml2_conf.ini"}),"\nfile."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'ovn_nb_connection=$(sudo grep -P -o -e "(?<=^ovn_nb_connection = ).*" "/etc/kolla/neutron-server/ml2_conf.ini")\novn_sb_connection=$(sudo grep -P -o -e "(?<=^ovn_sb_connection = ).*" "/etc/kolla/neutron-server/ml2_conf.ini")\n'})}),"\n",(0,o.jsxs)(n.p,{children:["The following examples are from a fresh ",(0,o.jsx)(n.a,{href:"https://github.com/osism/testbed",children:"osism/testbed"}),"\ndeployment with no payload running yet."]}),"\n",(0,o.jsx)(n.p,{children:"OVN NB DB entries:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'$ docker exec ovn_northd ovn-nbctl --db "$ovn_nb_connection" show | abbrev\nswitch b5139b (neutron-8fe7d0) (aka lb-mgmt-net)\n    port 45a49e\n        type: localport\n        addresses: ["fa:16:3e:fa:99:ea 10.1.0.2"]\n    port 4d39a5 (aka octavia-listen-port-testbed-node-2)\n        addresses: ["fa:16:3e:dc:11:e4 10.1.0.45"]\n    port 8df1b7 (aka octavia-listen-port-testbed-node-0)\n        addresses: ["fa:16:3e:4d:63:a9 10.1.0.43"]\n    port ddb6aa (aka octavia-listen-port-testbed-node-1)\n        addresses: ["fa:16:3e:67:f3:3d 10.1.0.40"]\n'})}),"\n",(0,o.jsx)(n.p,{children:"OVN SB DB entries:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'$ docker exec ovn_northd ovn-sbctl --db "$ovn_sb_connection" show | abbrev\nChassis testbed-node-0\n    hostname: testbed-node-0\n    Encap geneve\n        ip: "192.168.16.10"\n        options: {csum="true"}\n    Port_Binding "8df1b7"\nChassis testbed-node-2\n    hostname: testbed-node-2\n    Encap geneve\n        ip: "192.168.16.12"\n        options: {csum="true"}\n    Port_Binding "4d39a5"\nChassis testbed-node-1\n    hostname: testbed-node-1\n    Encap geneve\n        ip: "192.168.16.11"\n        options: {csum="true"}\n    Port_Binding "ddb6aa\n'})}),"\n",(0,o.jsx)(n.p,{children:"OVN NB status:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ docker exec ovn_nb_db ovs-appctl -t /var/run/ovn/ovnnb_db.ctl cluster/status OVN_Northbound | abbrev\n6d15\nName: OVN_Northbound\nCluster ID: f5eb (f5ebd8)\nServer ID: 6d15 (6d159e)\nAddress: tcp:192.168.16.10:6643\nStatus: cluster member\nRole: follower\nTerm: 5\nLeader: 87d6\nVote: 87d6\n\nLast Election started 41049332 ms ago, reason: timeout\nElection timer: 1000\nLog: [2, 54]\nEntries not yet committed: 0\nEntries not yet applied: 0\nConnections: ->21d7 ->87d6 <-87d6 <-21d7\nDisconnections: 6\nServers:\n    6d15 (6d15 at tcp:192.168.16.10:6643) (self)\n    87d6 (87d6 at tcp:192.168.16.11:6643) last msg 266 ms ago\n    21d7 (21d7 at tcp:192.168.16.12:6643) last msg 41048563 ms ago\n"})}),"\n",(0,o.jsx)(n.p,{children:"OVN SB status:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ docker exec ovn_sb_db ovs-appctl -t /var/run/ovn/ovnsb_db.ctl cluster/status OVN_Southbound | abbrev\nbe29\nName: OVN_Southbound\nCluster ID: bd0c (bd0c26)\nServer ID: be29 (be2932)\nAddress: tcp:192.168.16.10:6644\nStatus: cluster member\nRole: follower\nTerm: 6\nLeader: dfdf\nVote: unknown\n\nLast Election started 41063820 ms ago, reason: timeout\nElection timer: 1000\nLog: [2, 62]\nEntries not yet committed: 0\nEntries not yet applied: 0\nConnections: ->dfdf ->085c <-dfdf <-085c\nDisconnections: 7\nServers:\n    be29 (be29 at tcp:192.168.16.10:6644) (self)\n    dfdf (dfdf at tcp:192.168.16.11:6644) last msg 146 ms ago\n    085c (085c at tcp:192.168.16.12:6644) last msg 41063293 ms ago\n"})}),"\n",(0,o.jsx)(n.h3,{id:"l3-high-availability",children:"L3 high availability"}),"\n",(0,o.jsx)(n.p,{children:'Router L3 high availability is built natively into OVN and does not require any actions from neutron. OVN routers are shown as "HA" in neutron, with the flag being immutable.'}),"\n",(0,o.jsxs)(n.p,{children:["Nodes providing connection to external networks do have the ",(0,o.jsx)(n.code,{children:"ovn-cms-options"})," key in their ",(0,o.jsx)(n.code,{children:"Open_vSwitch"})," tables ",(0,o.jsx)(n.code,{children:"external_ids"})," column set to ",(0,o.jsx)(n.code,{children:"enable-chassis-as-gw"}),". This is done automatically in ",(0,o.jsx)(n.code,{children:"osism"})," for all hosts in inventory group ",(0,o.jsx)(n.code,{children:"ovn-controller-network"}),", which defaults to include all network nodes.\nYou can check this on any particular node by running"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker exec openvswitch_vswitchd ovs-vsctl get Open_vSwitch . external_ids:ovn-cms-options\n"})}),"\n",(0,o.jsxs)(n.p,{children:["All nodes with the ",(0,o.jsx)(n.code,{children:"ovn-cms-options=enable-chassis-as-gw"})," property take part in active/passive router gateway high availability.\nGateway chassis will monitor other gateway chassis and compute node chassis, while compute node chassis will monitor all gateway chassis, but not each other.\nMonitoring is done using ",(0,o.jsx)(n.a,{href:"https://datatracker.ietf.org/doc/html/rfc5880",children:"Bidirectional Forwarding Detection (BFD)"})," over the geneve tunnels established between each chassis.\nFailures detected this way are"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Disconnection of the gateway chassis from the network used for tunneling:\nThe BFD signal will be disrupted, since it it being send over the tunnel network. It is therfore advisable to not use a different physical network as tunnel network."}),"\n",(0,o.jsxs)(n.li,{children:["Stop/Crash of ",(0,o.jsx)(n.code,{children:"openvswitch_vswitchd"}),":\nThe daemon is the source of the BFD signal."]}),"\n",(0,o.jsx)(n.li,{children:"Graceful termination of ovn-controller\nThe OVN controller will unregister the chassis on being gracefully stopped.\nNote, that sending SIGTERM does not initiate graceful shutdown of this service."}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Note that there is no detection of failures in the external network connectivity of a gateway chassis and subsequently no failover in this case!"}),"\n",(0,o.jsxs)(n.p,{children:["For each router created in neutron a ",(0,o.jsx)(n.code,{children:"Logical_Router"})," object is created in the OVN northd DB. The list can be retrived by connecting to one of the hosts running ",(0,o.jsx)(n.code,{children:"ovn-northd"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'docker exec ovn_northd ovn-nbctl --db $ovn_nb_connection list Logical_Router\n_uuid               : f0ea6a95-d4bd-40e0-9efd-6da197825981\ncopp                : []\nenabled             : true\nexternal_ids        : {"neutron:availability_zone_hints"="", "neutron:revision_number"="5", "neutron:router_name"=test}\nload_balancer       : []\nload_balancer_group : []\nname                : neutron-e9133cdd-7c31-4f67-8aac-a32384ce7939\nnat                 : [960ebe78-3f75-4f6e-bab4-c19522407d20, 982dc2bc-4536-4912-90fb-2aca7ba358c3]\noptions             : {always_learn_from_arp_request="false", dynamic_neigh_routers="true", mac_binding_age_threshold="0"}\npolicies            : []\nports               : [bc73e085-ea33-45a9-89cf-78f81625d172, edff2d86-3bdb-4396-a307-d7bfc69ac2d0]\nstatic_routes       : [fa183064-0953-4c93-880a-78b049a8846f]\n'})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"ovn_nb_connection"})," is retrieved from the neutron ML2 configuration in the same as ",(0,o.jsx)(n.a,{href:"#open-virtual-network-ovn",children:"described above"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Finding the routers external gateway port directly may be achieved by searching the OVN's ",(0,o.jsx)(n.code,{children:"Logical_Router_Port"})," table for logical router ports having the ",(0,o.jsx)(n.code,{children:"neutron:is_ext_gw=True"})," and ",(0,o.jsx)(n.code,{children:"neutron:router_name=$Router_ID"})," in their ",(0,o.jsx)(n.code,{children:"external_ids"})," column, where ",(0,o.jsx)(n.code,{children:"$ROUTER_ID"})," is the ID of the router in neutron, which may also be found as part of the ",(0,o.jsx)(n.code,{children:"name"})," in the OVN ",(0,o.jsx)(n.code,{children:"Logical_Router"})," above."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'ROUTER_ID="e9133cdd-7c31-4f67-8aac-a32384ce7939"\ndocker exec ovn_northd ovn-nbctl --db $ovn_nb_connection find Logical_Router_Port external_ids:\\"neutron:is_ext_gw\\"=True external_ids:\\"neutron:router_name\\"=$ROUTER_ID\n_uuid               : bc73e085-ea33-45a9-89cf-78f81625d172\nenabled             : []\nexternal_ids        : {"neutron:is_ext_gw"=True, "neutron:network_name"=neutron-b7cb8fa6-10ee-4470-9212-95bb30390cc6, "neutron:revision_number"="322", "neutron:router_name"="e9133cdd-7c31-4f67-8aac-a32384ce7939", "neutron:subnet_ids"="9095ecb9-e32b-4ed7-8fdf-d9dd8bdaf50b"}\ngateway_chassis     : [06ce2cd0-b901-47c1-8bbd-889e16b1ae0f, cdf5423d-be53-44d4-b9cb-7df4138832b0, fadc4891-66ef-4478-b56c-66bf11cfff08]\nha_chassis_group    : []\nipv6_prefix         : []\nipv6_ra_configs     : {}\nmac                 : "fa:16:3e:78:8c:d7"\nname                : lrp-429c0111-ba3b-4641-b4ac-3fad8749e592\nnetworks            : ["192.168.112.179/20"]\noptions             : {}\npeer                : []\nstatus              : {hosting-chassis=testbed-node-1}\n'})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"gateway_chassis"})," field in the output above shows the chassis currently involved providing high availability for the port and the ",(0,o.jsx)(n.code,{children:"status"})," field shows the currently active chassis as the value of the ",(0,o.jsx)(n.code,{children:"hosting-chassis"})," key.\nAt most five gateway chassis are used even if more nodes with external connectivity are available to keep BFD complexity low.\nTo look at the gateway chassis names and their priorities the bare list of gateway chassis from the command above may used to retrieve them specifically"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'docker exec ovn_northd ovn-nbctl --db=tcp:127.0.0.1:6641 --columns chassis_name,priority list Gateway_Chassis \\\n  $(docker exec ovn_northd ovn-nbctl --db=tcp:127.0.0.1:6641 --bare --columns gateway_chassis find Logical_Router_Port external_ids:\\"neutron:is_ext_gw\\"=True external_ids:\\"neutron:router_name\\"=$ROUTER_ID)\nchassis_name        : testbed-node-2\npriority            : 2\n\nchassis_name        : testbed-node-0\npriority            : 1\n\nchassis_name        : testbed-node-1\npriority            : 3\n'})}),"\n",(0,o.jsx)(n.h4,{id:"testing-ovn-router-l3-high-availability",children:"Testing OVN router L3 high availability"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"In a test installation create a test environment"}),"\n",(0,o.jsxs)(n.li,{children:["Find the router ID and query the ",(0,o.jsx)(n.code,{children:"hosting-chassis"})," as described above"]}),"\n",(0,o.jsx)(n.li,{children:"Run a network test through the router, e.g. by pinging the external gateway"}),"\n",(0,o.jsx)(n.li,{children:"Connect to the hosting chassis and cause a failover by triggering one of the detected failures above"}),"\n",(0,o.jsx)(n.li,{children:"Observe change of the hosting-chassis as described above"}),"\n",(0,o.jsx)(n.li,{children:"Evaluate packet-loss in the network test"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["During testing of the first two detected failures listed above (loss of tunnel network connectivity and stop of ",(0,o.jsx)(n.code,{children:"openvswitch_vswitchd"}),") loss of a couple of ICMP echo replies was observed occasionally, while failback consistently resulted in loss of multiple ICMP echo replies.\nDuring tests of graceful shutdown of ",(0,o.jsx)(n.code,{children:"ovn-controller"})," no loss of ICMP replies was observed. Additionally no failback occured, but logical router port priorities were adapted instead, thus giving a seamless networking experience even during shutdown of network nodes."]}),"\n",(0,o.jsx)(n.h4,{id:"references",children:"References"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://docs.openstack.org/neutron/latest/admin/ovn/refarch/refarch.html",children:"https://docs.openstack.org/neutron/latest/admin/ovn/refarch/refarch.html"}),"\n",(0,o.jsx)(n.a,{href:"https://docs.openstack.org/neutron/latest/admin/ovn/routing.html#l3ha-support",children:"https://docs.openstack.org/neutron/latest/admin/ovn/routing.html#l3ha-support"}),"\n",(0,o.jsx)(n.a,{href:"https://docs.openstack.org/neutron/latest/admin/ovn/l3_scheduler.html",children:"https://docs.openstack.org/neutron/latest/admin/ovn/l3_scheduler.html"}),"\n",(0,o.jsx)(n.a,{href:"https://docs.ovn.org/en/latest/topics/high-availability.html",children:"https://docs.ovn.org/en/latest/topics/high-availability.html"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var s=t(6540);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);