"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1223],{5751:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var o=t(5893),s=t(1151);const r={slug:"2024-01-14-use-of-the-clustershell",title:"Use of the ClusterShell",authors:["berendt"],tags:["OSISM","Machine Room"]},l=void 0,a={permalink:"/de/blog/2024-01-14-use-of-the-clustershell",source:"@site/blog/2024-01-14-use-of-the-clustershell.md",title:"Use of the ClusterShell",description:"ClusterShell is an",date:"2024-01-14T00:00:00.000Z",tags:[{inline:!0,label:"OSISM",permalink:"/de/blog/tags/osism"},{inline:!0,label:"Machine Room",permalink:"/de/blog/tags/machine-room"}],readingTime:.805,hasTruncateMarker:!1,authors:[{name:"Christian Berendt",title:"Founder of OSISM",url:"https://github.com/berendt",imageURL:"https://github.com/berendt.png",key:"berendt"}],frontMatter:{slug:"2024-01-14-use-of-the-clustershell",title:"Use of the ClusterShell",authors:["berendt"],tags:["OSISM","Machine Room"]},unlisted:!1,prevItem:{title:"Use of the container shell",permalink:"/de/blog/2024-01-16-use-of-the-container-shell"},nextItem:{title:"Restart of a container on a specific node",permalink:"/de/blog/2024-01-12-restart-of-a-container-on-a-specific-node"}},i={authorsImageUrls:[void 0]},c=[];function u(e){const n={a:"a",code:"code",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://clustershell.readthedocs.io/en/latest/intro.html",children:"ClusterShell"})," is an\nevent-driven open source Python framework, designed to run local or distant commands\nin parallel on server farms or on large Linux clusters. We learned to use it by chance\nduring a large HPC project with the team there and learned to like it."]}),"\n",(0,o.jsxs)(n.p,{children:["ClusterShell can be used in a rudimentary way via the ",(0,o.jsx)(n.code,{children:"console"})," command of the OSISM CLI.\nThe Ansible inventory groups are available as node groups. These are automatically\ngenerated and updated by the inventory reconciler."]}),"\n",(0,o.jsxs)(n.p,{children:["In this example, the command ",(0,o.jsx)(n.code,{children:"uname -v"})," is executed on all nodes in the node group\n",(0,o.jsx)(n.code,{children:"housing1047"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism console --type clush housing1047\nEnter 'quit' to leave this interactive mode\nWorking with nodes: com[1047-1050]\nclush> uname -v\ncom1049: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\ncom1050: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\ncom1047: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\ncom1048: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2\nclush>\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>l});var o=t(7294);const s={},r=o.createContext(s);function l(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);