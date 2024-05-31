"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1628],{2630:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>a,frontMatter:()=>r,metadata:()=>d,toc:()=>c});var o=i(5893),s=i(1151);const r={sidebar_label:"Logging & Monitoring",sidebar_position:40},t="Logging & Monitoring",d={id:"guides/deploy-guide/services/logging-monitoring",title:"Logging & Monitoring",description:"Common issues with deploying logging & monitoring services provided by Kolla",source:"@site/docs/guides/deploy-guide/services/logging-monitoring.md",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/logging-monitoring",permalink:"/de/docs/guides/deploy-guide/services/logging-monitoring",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/logging-monitoring.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Logging & Monitoring",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/de/docs/guides/deploy-guide/services/network"},next:{title:"Ceph",permalink:"/de/docs/guides/deploy-guide/services/ceph"}},l={},c=[];function g(e){const n={a:"a",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"logging--monitoring",children:"Logging & Monitoring"}),"\n",(0,o.jsxs)(n.p,{children:["Common issues with deploying logging & monitoring services provided by Kolla\nare documented in the ",(0,o.jsx)(n.a,{href:"../../troubleshooting-guide/openstack",children:"OpenStack Troubleshooting Guide"}),"."]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"OpenSearch"}),"\n",(0,o.jsxs)(n.p,{children:["OpenSearch dashboards is also deployed with the ",(0,o.jsx)(n.code,{children:"opensearch"})," role."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply -a pull opensearch\nosism apply opensearch\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Prometheus"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply -a pull prometheus\nosism apply prometheus\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Grafana"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply -a pull grafana\nosism apply grafana\n"})}),"\n"]}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(g,{...e})}):g(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>t});var o=i(7294);const s={},r=o.createContext(s);function t(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);