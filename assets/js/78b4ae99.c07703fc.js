"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2681],{3112:(e,o,a)=>{a.r(o),a.d(o,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var t=a(5893),n=a(1151);const s={sidebar_label:"Octavia"},i="Octavia",r={id:"guides/operations-guide/openstack/octavia",title:"Octavia",description:"Cleanup of amphorae missing from the DB",source:"@site/docs/guides/operations-guide/openstack/octavia.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/octavia",permalink:"/docs/guides/operations-guide/openstack/octavia",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/octavia.md",tags:[],version:"current",frontMatter:{sidebar_label:"Octavia"},sidebar:"tutorialSidebar",previous:{title:"Nova",permalink:"/docs/guides/operations-guide/openstack/nova"},next:{title:"Ceph via Rook (technical preview)",permalink:"/docs/guides/operations-guide/rook"}},c={},l=[{value:"Cleanup of amphorae missing from the DB",id:"cleanup-of-amphorae-missing-from-the-db",level:2},{value:"SSH access to amphorae",id:"ssh-access-to-amphorae",level:2}];function d(e){const o={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,n.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h1,{id:"octavia",children:"Octavia"}),"\n",(0,t.jsx)(o.h2,{id:"cleanup-of-amphorae-missing-from-the-db",children:"Cleanup of amphorae missing from the DB"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-none",metastring:'title="/var/log/kolla/octavia/octavia-health-manager.log"',children:"2023-10-25 16:43:52.547 22 WARNING octavia.amphorae.drivers.health.heartbeat_udp [-]\nThe amphora 2a33a889-4f9a-4340-84a5-e58a7a8af17e with IP 10.1.0.79 is missing from the\nDB, so it cannot be automatically deleted (the compute_id is unknown). An operator must\nmanually delete it from the compute service.\n"})}),"\n",(0,t.jsx)(o.h2,{id:"ssh-access-to-amphorae",children:"SSH access to amphorae"}),"\n",(0,t.jsxs)(o.ol,{children:["\n",(0,t.jsxs)(o.li,{children:["\n",(0,t.jsxs)(o.p,{children:["Get the local IP address (",(0,t.jsx)(o.code,{children:"lb_network_ip"}),") of the amphora you want to access via\n",(0,t.jsx)(o.code,{children:"openstack --os-cloud admin loadbalancer amphora list"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(o.li,{children:["\n",(0,t.jsx)(o.p,{children:"Connect to one of the nodes that you use for Octavia. Normally the control-\nor network nodes."}),"\n"]}),"\n",(0,t.jsxs)(o.li,{children:["\n",(0,t.jsxs)(o.p,{children:["You can now use SSH to access the amphora. The use of sudo is required here because\nyou cannot access ",(0,t.jsx)(o.code,{children:"/etc/kolla/octavia-worker/octavia_ssh_key"})," with the operator user\naccount. Replace ",(0,t.jsx)(o.code,{children:"lb_network_ip"})," with the local IP address of the amphora."]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{children:"sudo ssh -i /etc/kolla/octavia-worker/octavia_ssh_key ubuntu@lb_network_ip\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:o}={...(0,n.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,o,a)=>{a.d(o,{Z:()=>r,a:()=>i});var t=a(7294);const n={},s=t.createContext(n);function i(e){const o=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function r(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),t.createElement(s.Provider,{value:o},e.children)}}}]);