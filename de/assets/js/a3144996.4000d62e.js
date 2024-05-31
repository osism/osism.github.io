"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2221],{955:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>r,metadata:()=>a,toc:()=>u});var i=t(5893),o=t(1151);const r={sidebar_label:"Neutron"},s="Neutron",a={id:"guides/configuration-guide/openstack/neutron",title:"Neutron",description:"* Neutron admin guide",source:"@site/docs/guides/configuration-guide/openstack/neutron.md",sourceDirName:"guides/configuration-guide/openstack",slug:"/guides/configuration-guide/openstack/neutron",permalink:"/de/docs/guides/configuration-guide/openstack/neutron",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/openstack/neutron.md",tags:[],version:"current",frontMatter:{sidebar_label:"Neutron"},sidebar:"tutorialSidebar",previous:{title:"Manila",permalink:"/de/docs/guides/configuration-guide/openstack/manila"},next:{title:"Nova",permalink:"/de/docs/guides/configuration-guide/openstack/nova"}},c={},u=[{value:"MTU Considerations",id:"mtu-considerations",level:2}];function d(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,o.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"neutron",children:"Neutron"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron/latest/admin/index.html",children:"Neutron admin guide"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron/latest/configuration/index.html",children:"Neutron configuration guide"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron/latest/configuration/config.html",children:"Neutron configuration reference"})}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Neutron-Dynamic-Routing:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron-dynamic-routing/latest/admin/index.html",children:"Neutron-Dynamic-Routing admin guide"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron-dynamic-routing/latest/configuration/index.html",children:"Neutron-Dynamic-Routing configuration guide"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron-dynamic-routing/latest/configuration/bgp_dragent.html",children:"Neutron-Dynamic-Routing configuration reference"})}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Neutron-VPNaaS:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron-vpnaas/latest/admin/index.html",children:"Neutron-VPNaaS admin guide"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron-vpnaas/latest/configuration/index.html",children:"Neutron-VPNaaS configuration guide"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"mtu-considerations",children:"MTU Considerations"}),"\n",(0,i.jsx)(e.p,{children:"Neutron uses the MTU of the underlying physical network to calculate the MTU for virtual network\ncomponents including instance network interfaces. By default, it assumes a standard 1500-byte MTU\nfor the underlying physical network."}),"\n",(0,i.jsx)(e.p,{children:"Neutron only references the underlying physical network MTU. Changing the underlying physical network\ndevice MTU requires configuration of physical network devices such as switches and routers."}),"\n",(0,i.jsxs)(e.p,{children:["The configuration is described in the ",(0,i.jsx)(e.a,{href:"https://docs.openstack.org/neutron/latest/admin/config-mtu.html",children:"Neutron admin guide"}),".\nThe configuration files are placed under ",(0,i.jsx)(e.code,{children:"environments/kolla/files/overlays/neutron/ml2_conf.ini"}),"\nand ",(0,i.jsx)(e.code,{children:"environments/kolla/files/overlays/neutron.conf"}),"."]})]})}function l(n={}){const{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},1151:(n,e,t)=>{t.d(e,{Z:()=>a,a:()=>s});var i=t(7294);const o={},r=i.createContext(o);function s(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:s(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);