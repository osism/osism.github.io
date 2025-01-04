"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[502],{8603:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>l,default:()=>a,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"guides/deploy-guide/services/kubernetes","title":"Kubernetes","description":"As of OSISM 7, it is possible to create a Kubernetes cluster on all nodes.","source":"@site/docs/guides/deploy-guide/services/kubernetes.md","sourceDirName":"guides/deploy-guide/services","slug":"/guides/deploy-guide/services/kubernetes","permalink":"/docs/guides/deploy-guide/services/kubernetes","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/kubernetes.md","tags":[],"version":"current","sidebarPosition":12,"frontMatter":{"sidebar_label":"Kubernetes","sidebar_position":12},"sidebar":"tutorialSidebar","previous":{"title":"Infrastructure","permalink":"/docs/guides/deploy-guide/services/infrastructure"},"next":{"title":"Network","permalink":"/docs/guides/deploy-guide/services/network"}}');var i=n(4848),r=n(8453);const o={sidebar_label:"Kubernetes",sidebar_position:12},l="Kubernetes",d={},c=[{value:"Cluster API",id:"cluster-api",level:2}];function u(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"kubernetes",children:"Kubernetes"})}),"\n",(0,i.jsx)(s.admonition,{type:"info",children:(0,i.jsx)(s.p,{children:"As of OSISM 7, it is possible to create a Kubernetes cluster on all nodes.\nAt the moment, this is still optional. In the future, it will be necessary\nto deploy this Kubernetes cluster."})}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Deploy the ",(0,i.jsx)(s.a,{href:"https://k3s.io",children:"K3s"})," cluster."]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"osism apply kubernetes\n"})}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Deploy the ",(0,i.jsx)(s.a,{href:"https://github.com/kubernetes/dashboard",children:"Kubernetes dashboard"}),":"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"osism apply kubernetes-dashboard\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"cluster-api",children:"Cluster API"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Deploy the ",(0,i.jsx)(s.a,{href:"https://cluster-api.sigs.k8s.io",children:"Cluster API"})," management cluster on the K3s cluster:"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"osism apply clusterapi\n"})}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Add the ",(0,i.jsx)(s.code,{children:"kubeconfig"})," file to the configuration repository (required later by OpenStack\nMagnum Service):"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{children:"osism apply copy-kubeconfig\n"})}),"\n"]}),"\n"]})]})}function a(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>l});var t=n(6540);const i={},r=t.createContext(i);function o(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);