"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4329],{2625:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var r=t(5893),i=t(1151);const o={sidebar_label:"Network",sidebar_position:15},s="Network",d={id:"guides/upgrade-guide/network",title:"Network",description:"1. Open vSwitch (OVS)",source:"@site/docs/guides/upgrade-guide/network.md",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/network",permalink:"/de/docs/guides/upgrade-guide/network",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/network.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_label:"Network",sidebar_position:15},sidebar:"tutorialSidebar",previous:{title:"Manager",permalink:"/de/docs/guides/upgrade-guide/manager"},next:{title:"Ceph",permalink:"/de/docs/guides/upgrade-guide/ceph"}},a={},c=[];function l(e){const n={code:"code",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"network",children:"Network"})}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Open vSwitch (OVS)"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -a pull openvswitch\nosism apply -a upgrade openvswitch\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Open Virtual Network (OVN)"}),"\n",(0,r.jsxs)(n.p,{children:["In ",(0,r.jsx)(n.code,{children:"environments/kolla/configuration.yml"})," the parameter ",(0,r.jsx)(n.code,{children:"neutron_plugin_agent"})," is set to\n",(0,r.jsx)(n.code,{children:"ovn"}),". The parameter is set to ",(0,r.jsx)(n.code,{children:"ovn"})," by default in the Cookiecutter and is the OSISM default."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'# neutron\nneutron_plugin_agent: "ovn"\n'})}),"\n",(0,r.jsx)(n.p,{children:"Before the upgrade of OVN, the upgrade of Open vSwitch must already have been done."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -a pull ovn\nosism apply -a upgrade ovn\n"})}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>s});var r=t(7294);const i={},o=r.createContext(i);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);