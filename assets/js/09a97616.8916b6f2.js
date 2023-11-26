"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8367],{333:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>g});var r=i(5893),o=i(1151);const s={sidebar_label:"Logging & Monitoring",sidebar_position:40},t="Logging & Monitoring",a={id:"guides/upgrade-guide/logging-monitoring",title:"Logging & Monitoring",description:"OpenSearch",source:"@site/docs/guides/upgrade-guide/logging-monitoring.md",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/logging-monitoring",permalink:"/docs/guides/upgrade-guide/logging-monitoring",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/logging-monitoring.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Logging & Monitoring",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Infrastructure",permalink:"/docs/guides/upgrade-guide/infrastructure"},next:{title:"OpenStack",permalink:"/docs/guides/upgrade-guide/openstack"}},d={},g=[{value:"OpenSearch",id:"opensearch",level:2},{value:"Prometheus",id:"prometheus",level:2},{value:"Grafana",id:"grafana",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"logging--monitoring",children:"Logging & Monitoring"}),"\n",(0,r.jsx)(n.h2,{id:"opensearch",children:"OpenSearch"}),"\n",(0,r.jsxs)(n.p,{children:["OpenSearch dashboards is also upgraded with the ",(0,r.jsx)(n.code,{children:"opensearch"})," role."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -a pull opensearch\nosism apply -a upgrade opensearch\n"})}),"\n",(0,r.jsx)(n.h2,{id:"prometheus",children:"Prometheus"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -a pull prometheus\nosism apply prometheus\n"})}),"\n",(0,r.jsx)(n.h2,{id:"grafana",children:"Grafana"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -a pull grafana\nosism apply -a upgrade grafana\n"})})]})}function p(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>t});var r=i(7294);const o={},s=r.createContext(o);function t(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);