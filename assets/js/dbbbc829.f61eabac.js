"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2191],{5176:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>d,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"guides/upgrade-guide/network","title":"Network","description":"1. Open vSwitch (OVS)","source":"@site/docs/guides/upgrade-guide/network.md","sourceDirName":"guides/upgrade-guide","slug":"/guides/upgrade-guide/network","permalink":"/docs/guides/upgrade-guide/network","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/network.md","tags":[],"version":"current","sidebarPosition":15,"frontMatter":{"sidebar_label":"Network","sidebar_position":15},"sidebar":"tutorialSidebar","previous":{"title":"Manager","permalink":"/docs/guides/upgrade-guide/manager"},"next":{"title":"Ceph","permalink":"/docs/guides/upgrade-guide/ceph"}}');var i=t(4848),s=t(8453);const o={sidebar_label:"Network",sidebar_position:15},d="Network",a={},c=[];function l(e){const n={code:"code",h1:"h1",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"network",children:"Network"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Open vSwitch (OVS)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply -a pull openvswitch\nosism apply -a upgrade openvswitch\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Open Virtual Network (OVN)"}),"\n",(0,i.jsxs)(n.p,{children:["In ",(0,i.jsx)(n.code,{children:"environments/kolla/configuration.yml"})," the parameter ",(0,i.jsx)(n.code,{children:"neutron_plugin_agent"})," is set to\n",(0,i.jsx)(n.code,{children:"ovn"}),". The parameter is set to ",(0,i.jsx)(n.code,{children:"ovn"})," by default in the Cookiecutter and is the OSISM default."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'# neutron\nneutron_plugin_agent: "ovn"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Before the upgrade of OVN, the upgrade of Open vSwitch must already have been done."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply -a pull ovn\nosism apply -a upgrade ovn\n"})}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>d});var r=t(6540);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);