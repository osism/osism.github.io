"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7153],{6758:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"guides/operations-guide/package-upgrades","title":"Package Upgrades","description":"Compute Nodes","source":"@site/docs/guides/operations-guide/package-upgrades.md","sourceDirName":"guides/operations-guide","slug":"/guides/operations-guide/package-upgrades","permalink":"/docs/guides/operations-guide/package-upgrades","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/package-upgrades.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"Package Upgrades"},"sidebar":"tutorialSidebar","previous":{"title":"Octavia","permalink":"/docs/guides/operations-guide/openstack/octavia"},"next":{"title":"Troubleshooting Guide","permalink":"/docs/guides/troubleshooting-guide/"}}');var o=s(4848),t=s(8453);const r={sidebar_label:"Package Upgrades"},a="Package Upgrades",d={},c=[{value:"Compute Nodes",id:"compute-nodes",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"package-upgrades",children:"Package Upgrades"})}),"\n",(0,o.jsx)(n.h2,{id:"compute-nodes",children:"Compute Nodes"}),"\n",(0,o.jsx)(n.p,{children:"Set HOST environment to be used in subsequent commands to the compute node which is going to be updated"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'HOST=""\n'})}),"\n",(0,o.jsx)(n.p,{children:"Disable compute host, so that no new instances are scheduled to it and instance state remains unchanged"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism manage compute disable $HOST\n"})}),"\n",(0,o.jsx)(n.p,{children:"Live-migrate all instances to other compute nodes"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism manage compute migrate --yes $HOST\n"})}),"\n",(0,o.jsx)(n.p,{children:"List remaining nodes in non-live-migratable state"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism manage compute list $HOST\n"})}),"\n",(0,o.jsx)(n.p,{children:"Move shut off nodes to other nodes"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"INTERACTIVE=false openstack server list --all-projects --status SHUTOFF --host $HOST -f value -c ID | while read -r ID; do openstack server migrate $ID; done\n"})}),"\n",(0,o.jsx)(n.p,{children:"Show migrations"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack server migration list --host $HOST --changes-since 2025-04-15\n"})}),"\n",(0,o.jsx)(n.p,{children:"and confirm resize for all finished migrations individually"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack server resize confirm #SERVER\n"})}),"\n",(0,o.jsx)(n.p,{children:"Check for remaining nodes in unmigratables states"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism manage compute list $HOST\n"})}),"\n",(0,o.jsx)(n.p,{children:"Apply package upgrades"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply upgrade-packages -e ireallymeanit=yes --limit $HOST\n"})}),"\n",(0,o.jsx)(n.p,{children:"Optionally reboot the node"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply reboot -e ireallymeanit=yes -e reboot_wait=yes --limit $HOST\n"})}),"\n",(0,o.jsx)(n.p,{children:"Re-enable the compute node"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism manage compute enable $HOST\n"})})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var i=s(6540);const o={},t=i.createContext(o);function r(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);