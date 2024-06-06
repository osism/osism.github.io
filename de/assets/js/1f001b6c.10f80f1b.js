"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6881],{6961:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var t=n(5893),s=n(1151);const r={sidebar_label:"Hardware Bill of Materials",sidebar_position:50},a="Hardware Bill of Materials",i={id:"guides/concept-guide/hardware-bom",title:"Hardware Bill of Materials",description:"Control nodes",source:"@site/docs/guides/concept-guide/hardware-bom.md",sourceDirName:"guides/concept-guide",slug:"/guides/concept-guide/hardware-bom",permalink:"/de/docs/guides/concept-guide/hardware-bom",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/concept-guide/hardware-bom.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_label:"Hardware Bill of Materials",sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Use cases",permalink:"/de/docs/guides/concept-guide/use-cases"},next:{title:"Deploy Guide",permalink:"/de/docs/guides/deploy-guide/"}},d={},l=[{value:"Control nodes",id:"control-nodes",level:2},{value:"Compute nodes",id:"compute-nodes",level:2},{value:"Storage nodes",id:"storage-nodes",level:2},{value:"Network nodes",id:"network-nodes",level:2},{value:"Manager nodes",id:"manager-nodes",level:2},{value:"Switches",id:"switches",level:2}];function c(e){const o={h1:"h1",h2:"h2",p:"p",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h1,{id:"hardware-bill-of-materials",children:"Hardware Bill of Materials"}),"\n",(0,t.jsx)(o.h2,{id:"control-nodes",children:"Control nodes"}),"\n",(0,t.jsx)(o.p,{children:"A control node is responsible for running all or most of the OpenStack\nservices that manage API services and their associated runtimes. These\nnodes are essential for users to interact with the cluster and maintain\nits managed state."}),"\n",(0,t.jsx)(o.p,{children:"However, control nodes typically do not run user virtual machines. It is\ntherefore advisable to replicate the control nodes to ensure high availability\nand fault tolerance. A good starting point for achieving RAFT quorum is to have\nthree control nodes."}),"\n",(0,t.jsx)(o.h2,{id:"compute-nodes",children:"Compute nodes"}),"\n",(0,t.jsx)(o.p,{children:"Compute nodes are dedicated to running users' virtual machines. They do not\nhost API services, storage daemons or network routers, other than the basic\nnetwork infrastructure required to connect virtual machines."}),"\n",(0,t.jsx)(o.h2,{id:"storage-nodes",children:"Storage nodes"}),"\n",(0,t.jsx)(o.p,{children:"A dedicated storage node runs only storage daemons. This can be necessary in larger\ndeployments to protect the storage daemons from  ressource starvation through user\nworkloads."}),"\n",(0,t.jsx)(o.h2,{id:"network-nodes",children:"Network nodes"}),"\n",(0,t.jsx)(o.p,{children:"A dedicated storage node runs only storage daemons. This setup is essential in\nlarger deployments to protect the storage daemons from resource starvation\ncaused by user workloads."}),"\n",(0,t.jsx)(o.h2,{id:"manager-nodes",children:"Manager nodes"}),"\n",(0,t.jsx)(o.p,{children:"The manager node, also known as the deploy node or deployment node, is designated\nto manage the deployment process of all services. It is often also utilized to host\ncomponents of the monitoring services. It serves as the operator's entry point into\nthe cluster for operations."}),"\n",(0,t.jsx)(o.h2,{id:"switches",children:"Switches"})]})}function u(e={}){const{wrapper:o}={...(0,s.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,o,n)=>{n.d(o,{Z:()=>i,a:()=>a});var t=n(7294);const s={},r=t.createContext(s);function a(e){const o=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(r.Provider,{value:o},e.children)}}}]);