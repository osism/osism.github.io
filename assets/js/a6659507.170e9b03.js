"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9498],{8862:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>t,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var s=o(5893),i=o(1151);const r={sidebar_label:"OpenStack"},t="OpenStack",c={id:"guides/operations-guide/openstack/index",title:"OpenStack",description:"Reboot a compute node",source:"@site/docs/guides/operations-guide/openstack/index.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/",permalink:"/docs/guides/operations-guide/openstack/",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/index.md",tags:[],version:"current",frontMatter:{sidebar_label:"OpenStack"},sidebar:"tutorialSidebar",previous:{title:"Infrastructure",permalink:"/docs/guides/operations-guide/infrastructure"},next:{title:"Day-2 Operations",permalink:"/docs/guides/operations-guide/openstack/day2-operations/"}},a={},d=[{value:"Reboot a compute node",id:"reboot-a-compute-node",level:2},{value:"Add a new compute node",id:"add-a-new-compute-node",level:2},{value:"Remove a compute node",id:"remove-a-compute-node",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"openstack",children:"OpenStack"}),"\n",(0,s.jsx)(n.h2,{id:"reboot-a-compute-node",children:"Reboot a compute node"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Live migrate all instances running on the compute node\nwith the help of the ",(0,s.jsx)(n.a,{href:"./day2-operations/resource-manager#live-migration",children:"OpenStack Resource Manager"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Ensure that no more instances are running on the compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ps ax | grep qemu\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Reboot the compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply reboot -l NODE -e ireallymeanit=yes\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Re-enable the compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'openstack --os-cloud admin compute service set --enable --disable-reason "" NODE nova-compute\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Check compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --host NODE --service nova-compute\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"add-a-new-compute-node",children:"Add a new compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply operator -u osism -l NODE\nosism apply bootstrap -l NODE\n"})}),"\n",(0,s.jsx)(n.p,{children:"If FRR is used:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply frr -l NODE\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply common -l NODE\nosism apply openvswitch -l NODE\nosism apply ovn -l NODE\nosism apply prometheus -l NODE\nosism apply prometheus -l control\nosism apply ceilometer -l NODE\nosism apply neutron -l NODE\nosism apply nova -l NODE\n"})}),"\n",(0,s.jsx)(n.p,{children:"If Scaphandre is used:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply scaphandre -l NODE\n"})}),"\n",(0,s.jsx)(n.p,{children:"If Netdata is used:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply netdata -l NODE\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Refresh the ",(0,s.jsx)(n.code,{children:"/etc/hosts"})," file:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply hosts\n"})}),"\n",(0,s.jsx)(n.p,{children:"Refresh the SSH client configuration file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply sshconfig\n"})}),"\n",(0,s.jsx)(n.p,{children:"Add compute node to the known hosts file:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply known-hosts\n"})}),"\n",(0,s.jsx)(n.p,{children:"Containers that run on a compute node. Versions may differ."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'$ docker ps\nCONTAINER ID   IMAGE                                                      COMMAND                  CREATED         STATUS                   PORTS                         NAMES\n559e5176695c   quay.io/osism/nova-compute:27.1.1.20230919                 "dumb-init --single-\u2026"   5 minutes ago   Up 5 minutes (healthy)                                 nova_compute\n31248d71ab7d   quay.io/osism/nova-libvirt:8.0.0.20230919                  "dumb-init --single-\u2026"   6 minutes ago   Up 6 minutes (healthy)                                 nova_libvirt\n9292030d706c   quay.io/osism/nova-ssh:27.1.1.20230919                     "dumb-init --single-\u2026"   6 minutes ago   Up 6 minutes (healthy)                                 nova_ssh\nfda4b6fb30c8   quay.io/osism/neutron-metadata-agent:22.0.3.20230919       "dumb-init --single-\u2026"   2 hours ago     Up 2 hours (healthy)                                   neutron_ovn_metadata_agent\n0e3ec450b668   quay.io/osism/ceilometer-compute:20.0.1.20230919           "dumb-init --single-\u2026"   6 hours ago     Up 6 hours (healthy)                                   ceilometer_compute\n25ff9702e0e5   quay.io/osism/prometheus-libvirt-exporter:6.0.0.20230919   "dumb-init --single-\u2026"   6 hours ago     Up 6 hours                                             prometheus_libvirt_exporter\n1bff2e29923b   quay.io/osism/prometheus-cadvisor:0.45.0.20230919          "dumb-init --single-\u2026"   6 hours ago     Up 6 hours                                             prometheus_cadvisor\n602832daf237   quay.io/osism/prometheus-node-exporter:1.4.0.20230919      "dumb-init --single-\u2026"   6 hours ago     Up 6 hours                                             prometheus_node_exporter\nd4de2f32cdf8   quay.io/osism/ovn-controller:23.6.1.20230919               "dumb-init --single-\u2026"   6 hours ago     Up 6 hours                                             ovn_controller\n3bf43ae5a94f   quay.io/osism/openvswitch-vswitchd:3.1.2.20230919          "dumb-init --single-\u2026"   7 hours ago     Up 7 hours (healthy)                                   openvswitch_vswitchd\nebc048b02ab2   quay.io/osism/openvswitch-db-server:3.1.2.20230919         "dumb-init --single-\u2026"   7 hours ago     Up 7 hours (healthy)                                   openvswitch_db\n4f33dfa66c14   hubblo/scaphandre:0.5.0                                    "scaphandre promethe\u2026"   7 hours ago     Up 7 hours               10.10.129.64:9155->8080/tcp   scaphandre\n9b1f6342dc60   quay.io/osism/cron:3.0.20230919                            "dumb-init --single-\u2026"   7 hours ago     Up 7 hours                                             cron\n718aecaddde1   quay.io/osism/kolla-toolbox:16.1.1.20230919                "dumb-init --single-\u2026"   7 hours ago     Up 7 hours                                             kolla_toolbox\nf6f9422c1853   quay.io/osism/fluentd:4.5.1.20230919                       "dumb-init --single-\u2026"   7 hours ago     Up 7 hours                                             fluentd\n'})}),"\n",(0,s.jsx)(n.h2,{id:"remove-a-compute-node",children:"Remove a compute node"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["In the configuration repository remove the compute node everywhere. Then update the configuration repository on the manager\nwith ",(0,s.jsx)(n.code,{children:"osism apply configuration"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Live migrate all instances running on the compute node\nwith the help of the ",(0,s.jsx)(n.a,{href:"./day2-operations/resource-manager#live-migration",children:"OpenStack Resource Manager"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Evacuate all instances on the compute node\nwith the help of the ",(0,s.jsx)(n.a,{href:"./day2-operations/resource-manager#evacutation",children:"OpenStack Resource Manager"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Ensure that no more instances are running on the compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ps ax | grep qemu\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Stop all OpenStack Nova services on the compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"systemctl stop kolla-nova_ssh-container.service\nsystemctl stop kolla-nova_libvirt-container.service\nsystemctl stop kolla-nova_compute-container.service\n\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Delete the compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ openstack --os-cloud admin compute service list\n+--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+\n| ID                                   | Binary         | Host    | Zone     | Status   | State | Updated At                 |\n+--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+\n| f161d739-21de-4cb0-a5d3-d21cff652697 | nova-scheduler | manager | internal | enabled  | up    | 2023-12-21T11:52:59.000000 |\n| 646d16db-acd9-486c-bd16-8fe2c13bf198 | nova-conductor | manager | internal | enabled  | up    | 2023-12-21T11:53:04.000000 |\n| 90345eb5-cf2f-47ef-becc-758ee36fb132 | nova-compute   | manager | nova     | disabled | down  | 2023-12-21T11:53:00.000000 |\n+--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ openstack --os-cloud admin compute service delete 90345eb5-cf2f-47ef-becc-758ee36fb132\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Refresh the facts"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply facts\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Refresh the ",(0,s.jsx)(n.code,{children:"/etc/hosts"})," file"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply hosts\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Refresh the SSH client configuration file"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply sshconfig\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Remove compute node from Prometheus monitoring"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply prometheus -l monitoring\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>c,a:()=>t});var s=o(7294);const i={},r=s.createContext(i);function t(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);