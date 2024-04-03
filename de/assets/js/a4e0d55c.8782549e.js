"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8317],{7338:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var o=t(5893),s=t(1151);const i={slug:"2024-01-16-use-of-the-container-shell",title:"Use of the container shell",authors:["berendt"],tags:["OSISM","Machine Room"]},r=void 0,a={permalink:"/de/blog/2024-01-16-use-of-the-container-shell",source:"@site/blog/2024-01-16-use-of-the-container-shell.md",title:"Use of the container shell",description:"With the OSISM CLI it is possible to enter a shell on a container running on a node.",date:"2024-01-16T00:00:00.000Z",tags:[{label:"OSISM",permalink:"/de/blog/tags/osism"},{label:"Machine Room",permalink:"/de/blog/tags/machine-room"}],readingTime:.345,hasTruncateMarker:!1,authors:[{name:"Christian Berendt",title:"Founder of OSISM",url:"https://github.com/berendt",imageURL:"https://github.com/berendt.png",key:"berendt"}],frontMatter:{slug:"2024-01-16-use-of-the-container-shell",title:"Use of the container shell",authors:["berendt"],tags:["OSISM","Machine Room"]},unlisted:!1,prevItem:{title:"Switch to OpenTofu",permalink:"/de/blog/2024-01-16-switch-to-opentofu"},nextItem:{title:"Use of the ClusterShell",permalink:"/de/blog/2024-01-14-use-of-the-clustershell"}},l={authorsImageUrls:[void 0]},c=[];function h(e){const n={code:"code",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"With the OSISM CLI it is possible to enter a shell on a container running on a node."}),"\n",(0,o.jsx)(n.p,{children:"This is useful, for example, to view running instances that are managed via Libvirt."}),"\n",(0,o.jsxs)(n.p,{children:["In this example, the command ",(0,o.jsx)(n.code,{children:"virsh list"})," is executed in the ",(0,o.jsx)(n.code,{children:"nova_libvirt"})," container\nrunning on the ",(0,o.jsx)(n.code,{children:"com1069"})," node."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism console com1069/nova_libvirt\n(nova-libvirt)[root@com1069 /]# virsh list\n Id    Name                State\n------------------------------------\n 190   instance-001b2492   running\n\n(nova-libvirt)[root@com1069 /]#\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>r});var o=t(7294);const s={},i=o.createContext(s);function r(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);