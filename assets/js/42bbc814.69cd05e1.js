"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8730],{475:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>d,toc:()=>l});var s=n(5893),t=n(1151);const r={sidebar_label:"Deploy Guide",sidebar_position:10},o="Deploy Guide",d={id:"guides/deploy-guide/index",title:"Deploy Guide",description:"\ud83d\udca1 The Deploy Guide describe how to provision, bootstrap and deploy nodes and services.",source:"@site/docs/guides/deploy-guide/index.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/",permalink:"/docs/guides/deploy-guide/",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/index.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Deploy Guide",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Concept Guide",permalink:"/docs/guides/concept-guide/"},next:{title:"Provisioning",permalink:"/docs/guides/deploy-guide/provisioning"}},a={},l=[{value:"Getting started",id:"getting-started",level:2}];function c(e){const i={a:"a",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"deploy-guide",children:"Deploy Guide"}),"\n",(0,s.jsx)(i.p,{children:"\ud83d\udca1 The Deploy Guide describe how to provision, bootstrap and deploy nodes and services."}),"\n",(0,s.jsxs)(i.p,{children:["A classification is made for services. For example, all infrastructure services\nsuch as RabbitMQ or MariaDB are covered in the ",(0,s.jsx)(i.a,{href:"./services/infrastructure",children:"infrastructure section"}),"\nof the ",(0,s.jsx)(i.a,{href:"./services",children:"services chapter"}),"."]}),"\n",(0,s.jsxs)(i.p,{children:["The guide always assume that a node is already initially accessible via SSH and only\nneeds to be bootstrapped and integrated into the environment. Deploying bare-metal nodes\nwith an operating system is documented in the ",(0,s.jsx)(i.a,{href:"./provisioning",children:"provisioning chapter"}),"."]}),"\n",(0,s.jsxs)(i.p,{children:["The manager node is handled in a ",(0,s.jsx)(i.a,{href:"./manager",children:"separate chapter"})," because it must be handled\ndifferently when building a new environment."]}),"\n",(0,s.jsxs)(i.p,{children:["Before deploying services to nodes, they must all be bootstrapped. This is covered\nin the ",(0,s.jsx)(i.a,{href:"./bootstrap",children:"bootstrap chapter"}),"."]}),"\n",(0,s.jsx)(i.p,{children:"In the examples, the pull of images (if supported by a role) is always run first. While\nthis is optional, it is recommended to speed up the execution of the deploy action in\nthe second step. This significantly reduces the times required for the restart from a\nservice."}),"\n",(0,s.jsx)(i.h2,{id:"getting-started",children:"Getting started"}),"\n",(0,s.jsx)(i.p,{children:"OSISM is deployed in a series of successive phases. The phases are documented in this guide."}),"\n",(0,s.jsxs)(i.ol,{children:["\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"../configuration-guide/configuration-repository#creating-a-new-configuration-repository",children:"Creation of a configuration repository"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"./seed",children:"Preparation of the seed node"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"./manager",children:"Preparation of the manager node"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"./provisioning",children:"Provisioning of the bare-metal nodes"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"./bootstrap",children:"Bootstrap of the bare-metal nodes"})}),"\n",(0,s.jsx)(i.li,{children:(0,s.jsx)(i.a,{href:"./services",children:"Deployment of the services"})}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,t.a)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,i,n)=>{n.d(i,{Z:()=>d,a:()=>o});var s=n(7294);const t={},r=s.createContext(t);function o(e){const i=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:i},e.children)}}}]);