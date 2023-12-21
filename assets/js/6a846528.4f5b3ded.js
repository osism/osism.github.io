"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8567],{3055:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>c,metadata:()=>i,toc:()=>r});var s=o(5893),t=o(1151);const c={sidebar_label:"Nova"},a="Nova",i={id:"guides/operations-guide/openstack/nova",title:"Nova",description:"Disable & enable a compute service",source:"@site/docs/guides/operations-guide/openstack/nova.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/nova",permalink:"/docs/guides/operations-guide/openstack/nova",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/nova.md",tags:[],version:"current",frontMatter:{sidebar_label:"Nova"},sidebar:"tutorialSidebar",previous:{title:"Cinder",permalink:"/docs/guides/operations-guide/openstack/cinder"},next:{title:"Octavia",permalink:"/docs/guides/operations-guide/openstack/octavia"}},d={},r=[{value:"Disable &amp; enable a compute service",id:"disable--enable-a-compute-service",level:2},{value:"Force down &amp; up a compute service",id:"force-down--up-a-compute-service",level:2},{value:"Remove a compute service",id:"remove-a-compute-service",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"nova",children:"Nova"}),"\n",(0,s.jsx)(n.h2,{id:"disable--enable-a-compute-service",children:"Disable & enable a compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service set --disable --description MAINTENANCE testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --long\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | MAINTENANCE                                        | False       |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service set --enable testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | enabled  | up    | 2023-12-14T14:22:54.000000 |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+\n"})}),"\n",(0,s.jsx)(n.h2,{id:"force-down--up-a-compute-service",children:"Force down & up a compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --down testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --long\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | down  | 2023-12-14T14:21:47.000000 | None                                               | True        |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin --os-compute-api-version 2.12 compute service set --up testbed-node-0 nova-compute\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack --os-cloud admin compute service list --long\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| ID                                   | Binary         | Host            | Zone     | Status   | State | Updated At                 | Disabled Reason                                    | Forced Down |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n| b77c5aeb-91c0-4972-84ea-7c8bd5a49fdd | nova-compute   | testbed-node-0  | nova     | disabled | up    | 2023-12-14T14:20:24.000000 | None                                               | False       |\n+--------------------------------------+----------------+-----------------+----------+----------+-------+----------------------------+----------------------------------------------------+-------------+\n"})}),"\n",(0,s.jsx)(n.h2,{id:"remove-a-compute-service",children:"Remove a compute service"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Live migrate all instances running on the compute node\nwith the help of the ",(0,s.jsx)(n.a,{href:"./day2-operations/resource-manager#live-migration",children:"OpenStack Resource Manager"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Evacuate all instances on the compute node\nwith the help of the ",(0,s.jsx)(n.a,{href:"./day2-operations/resource-manager#evacutation",children:"OpenStack Resource Manager"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Ensure that no more instances are running on the compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ps ax | grep qemu\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Stop all OpenStack Nova services on the compute node"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"systemctl stop kolla-nova_ssh-container.service\nsystemctl stop kolla-nova_libvirt-container.service\nsystemctl stop kolla-nova_compute-container.service\n\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Delete the compute service"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ openstack --os-cloud admin compute service list\n+--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+\n| ID                                   | Binary         | Host    | Zone     | Status   | State | Updated At                 |\n+--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+\n| f161d739-21de-4cb0-a5d3-d21cff652697 | nova-scheduler | manager | internal | enabled  | up    | 2023-12-21T11:52:59.000000 |\n| 646d16db-acd9-486c-bd16-8fe2c13bf198 | nova-conductor | manager | internal | enabled  | up    | 2023-12-21T11:53:04.000000 |\n| 90345eb5-cf2f-47ef-becc-758ee36fb132 | nova-compute   | manager | nova     | disabled | down  | 2023-12-21T11:53:00.000000 |\n+--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+\n$ openstack --os-cloud admin compute service delete 90345eb5-cf2f-47ef-becc-758ee36fb132\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>i,a:()=>a});var s=o(7294);const t={},c=s.createContext(t);function a(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);