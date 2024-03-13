"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4032],{8713:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>i,toc:()=>d});var o=t(5893),a=t(1151);const s={slug:"2024-01-12-restart-of-a-container-on-a-specific-node",title:"Restart of a container on a specific node",authors:["berendt"],tags:["OSISM","Machine Room"]},r=void 0,i={permalink:"/de/blog/2024-01-12-restart-of-a-container-on-a-specific-node",source:"@site/blog/2024-01-12-restart-of-a-container-on-a-specific-node.md",title:"Restart of a container on a specific node",description:"We not only develop OSISM, we also use it to operate our own cloud",date:"2024-01-12T00:00:00.000Z",formattedDate:"12. Januar 2024",tags:[{label:"OSISM",permalink:"/de/blog/tags/osism"},{label:"Machine Room",permalink:"/de/blog/tags/machine-room"}],readingTime:1.53,hasTruncateMarker:!1,authors:[{name:"Christian Berendt",title:"Founder of OSISM",url:"https://github.com/berendt",imageURL:"https://github.com/berendt.png",key:"berendt"}],frontMatter:{slug:"2024-01-12-restart-of-a-container-on-a-specific-node",title:"Restart of a container on a specific node",authors:["berendt"],tags:["OSISM","Machine Room"]},unlisted:!1,prevItem:{title:"Use of the ClusterShell",permalink:"/de/blog/2024-01-14-use-of-the-clustershell"},nextItem:{title:"Kubernetes Service Deployments",permalink:"/de/blog/2024-01-11-kubernetes-service-deployment"}},c={authorsImageUrls:[void 0]},d=[];function l(e){const n={a:"a",code:"code",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["We not only develop OSISM, we also use it to operate our own cloud\ninfrastructure, the REGIO.cloud. When operating REGIO.cloud, we often\ncome across tasks in our day-to-day business that we can already solve\nwith the help of OSISM. If not, we ",(0,o.jsx)(n.a,{href:"https://github.com/osism/issues/issues",children:"open an issue"}),"\nfor the task and build it in so that we can solve it directly in OSISM in the future."]}),"\n",(0,o.jsxs)(n.p,{children:["In blog posts with the tag ",(0,o.jsx)(n.a,{href:"https://osism.github.io/blog/tags/machine-room",children:"Machine Room"}),",\nwe will now write about such tasks and how we were able to solve them with OSISM."]}),"\n",(0,o.jsxs)(n.p,{children:["Yesterday we had a hiccup in our RabbitMQ cluster. This has caused problems\nwith the attachment of volumes to instances during the night. After analyzing the\nproblem, it was decided that only a restart of the ",(0,o.jsx)(n.code,{children:"nova_compute"})," containers,\nwhich provide the Nova Compute Service, would solve the problem. With the play\n",(0,o.jsx)(n.code,{children:"manage-container"})," it is possible to run an action, e.g. ",(0,o.jsx)(n.code,{children:"restart"}),", of a specific\ncontainer."]}),"\n",(0,o.jsxs)(n.p,{children:["As we have our compute nodes in housings, we have also mapped them in the inventory\nin ",(0,o.jsx)(n.code,{children:"inventory/10-custom"})," and can now use those groups to restart all Nova Compute\nservices one by one."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism apply manage-container \\\n    -e container_action=restart \\\n    -e container_name=nova_compute \\\n    -l housing1047\n2024-01-12 08:28:55 | INFO     | Task was prepared for execution. It takes a moment until the task has been started and output is visible here.\n\nPLAY [Manage container] ********************************************************\n\nTASK [Manage container] ********************************************************\nchanged: [com1047]\n\nPLAY [Manage container] ********************************************************\n\nTASK [Manage container] ********************************************************\nchanged: [com1048]\n\nPLAY [Manage container] ********************************************************\n\nTASK [Manage container] ********************************************************\nchanged: [com1049]\n\nPLAY [Manage container] ********************************************************\n\nTASK [Manage container] ********************************************************\nchanged: [com1050]\n\nPLAY RECAP *********************************************************************\ncom1047                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\ncom1048                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\ncom1049                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\ncom1050                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0\n"})})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>r});var o=t(7294);const a={},s=o.createContext(a);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);