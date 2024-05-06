"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8567],{3055:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>r,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var s=o(5893),t=o(1151);const a={sidebar_label:"Nova"},d="Nova",i={id:"guides/operations-guide/openstack/nova",title:"Nova",description:"Get all servers on a node",source:"@site/docs/guides/operations-guide/openstack/nova.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/nova",permalink:"/docs/guides/operations-guide/openstack/nova",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/nova.md",tags:[],version:"current",frontMatter:{sidebar_label:"Nova"},sidebar:"tutorialSidebar",previous:{title:"Neutron",permalink:"/docs/guides/operations-guide/openstack/neutron"},next:{title:"Octavia",permalink:"/docs/guides/operations-guide/openstack/octavia"}},r={},c=[{value:"Get all servers on a node",id:"get-all-servers-on-a-node",level:2},{value:"Stop all servers running on a node",id:"stop-all-servers-running-on-a-node",level:2},{value:"Disable &amp; enable a compute service",id:"disable--enable-a-compute-service",level:2},{value:"Force down &amp; up a compute service",id:"force-down--up-a-compute-service",level:2},{value:"Huge pages",id:"huge-pages",level:2},{value:"Quality of Service (QoS)",id:"quality-of-service-qos",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"nova",children:"Nova"}),"\n",(0,s.jsx)(n.h2,{id:"get-all-servers-on-a-node",children:"Get all servers on a node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin server list --all-projects --host testbed-node-0\n"})}),"\n",(0,s.jsx)(n.h2,{id:"stop-all-servers-running-on-a-node",children:"Stop all servers running on a node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"for server in $(openstack --os-cloud admin server list --all-projects --host testbed-node-0 --vm-state active -f value -c ID | tr -d '\\r'); do\n    echo stopping server $server\n    openstack --os-cloud admin server stop $server\n    sleep 2\ndone\n"})}),"\n",(0,s.jsx)(n.h2,{id:"disable--enable-a-compute-service",children:"Disable & enable a compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service set --disable --description MAINTENANCE testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --long\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | MAINTENANCE                                        | False       |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service set --enable testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | enabled  | up    | 2023-12-14T14:22:54.000000 |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+\n"})}),"\n",(0,s.jsx)(n.h2,{id:"force-down--up-a-compute-service",children:"Force down & up a compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --down testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --long\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | down  | 2023-12-14T14:21:47.000000 | None                                               | True        |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --up testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --long\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | None                                               | False       |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.h2,{id:"huge-pages",children:"Huge pages"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ grep Huge /proc/meminfo\nAnonHugePages:         0 kB\nShmemHugePages:        0 kB\nFileHugePages:         0 kB\nHugePages_Total:       0\nHugePages_Free:        0\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:       2048 kB\nHugetlb:               0 kB\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ sudo sudo hugeadm --pool-list\nlibhugetlbfs: ERROR: Line too long when parsing mounts\n      Size  Minimum  Current  Maximum  Default\n   2097152        0        0        0        *\n1073741824        0        0        0\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'/etc/default/grub\nGRUB_CMDLINE_LINUX="default_hugepagesz=1G hugepagesz=1G hugepages=512 transparent_hugepage=never"\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"update-grub\nreboot\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ grep Huge /proc/meminfo\nAnonHugePages:         0 kB\nShmemHugePages:        0 kB\nFileHugePages:         0 kB\nHugePages_Total:     512\nHugePages_Free:      512\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:    1048576 kB\nHugetlb:        536870912 kB\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ sudo hugeadm --pool-list\nlibhugetlbfs: ERROR: Line too long when parsing mounts\n      Size  Minimum  Current  Maximum  Default\n   2097152        0        0        0        *\n1073741824      512      512      512\n"})}),"\n",(0,s.jsx)(n.h2,{id:"quality-of-service-qos",children:"Quality of Service (QoS)"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/admin/resource-limits.html",children:"https://docs.openstack.org/nova/latest/admin/resource-limits.html"})}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>i,a:()=>d});var s=o(7294);const t={},a=s.createContext(t);function d(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);