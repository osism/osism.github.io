"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4022],{8981:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>n,metadata:()=>r,toc:()=>c});var i=s(5893),l=s(1151);const n={sidebar_label:"Developer Guide"},o="Developer Guide",r={id:"guides/other-guides/developer-guide/index",title:"Developer Guide",description:"How to add a new service",source:"@site/docs/guides/other-guides/developer-guide/index.md",sourceDirName:"guides/other-guides/developer-guide",slug:"/guides/other-guides/developer-guide/",permalink:"/de/docs/guides/other-guides/developer-guide/",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/other-guides/developer-guide/index.md",tags:[],version:"current",frontMatter:{sidebar_label:"Developer Guide"},sidebar:"tutorialSidebar",previous:{title:"Contributor Guide",permalink:"/de/docs/guides/other-guides/contributor-guide"},next:{title:"Releases",permalink:"/de/docs/guides/other-guides/developer-guide/releases"}},d={},c=[{value:"How to add a new service",id:"how-to-add-a-new-service",level:2},{value:"How to add a new container image",id:"how-to-add-a-new-container-image",level:2},{value:"How service deployment works",id:"how-service-deployment-works",level:2},{value:"Docker",id:"docker",level:3},{value:"Kubernetes",id:"kubernetes",level:3}];function a(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"developer-guide",children:"Developer Guide"}),"\n",(0,i.jsx)(t.h2,{id:"how-to-add-a-new-service",children:"How to add a new service"}),"\n",(0,i.jsxs)(t.p,{children:["If you want to add a new service to OSISM, this is done via an Ansible role and (most often)\na container image. The following steps are necessary and are demonstrated using the example\nof ",(0,i.jsx)(t.code,{children:"osism.services.cgit"}),"."]}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Description"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Example"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add the Ansible role in one of the Ansible collection repositories"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/ansible-collection-services/pull/578/files",children:"https://github.com/osism/ansible-collection-services/pull/578/files"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add the Ansible playbook"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/ansible-playbooks/pull/215/files",children:"https://github.com/osism/ansible-playbooks/pull/215/files"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add the Ansible inventory group"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/cfg-generics/pull/225/files",children:"https://github.com/osism/cfg-generics/pull/225/files"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add the used container image(s) to the release repository"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/release/pull/278/files",children:"https://github.com/osism/release/pull/278/files"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add the container images(s) to osism-ansible container image"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/container-image-osism-ansible/pull/215/files",children:"https://github.com/osism/container-image-osism-ansible/pull/215/files"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add the container image registry/registries and host(s) to the defaults repository"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/defaults/pull/54/files",children:"https://github.com/osism/defaults/pull/54/files"})})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"Add a sample deployment to the testbed"}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.a,{href:"https://github.com/osism/testbed/pull/1043/files",children:"https://github.com/osism/testbed/pull/1043/files"})})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"how-to-add-a-new-container-image",children:"How to add a new container image"}),"\n",(0,i.jsxs)(t.p,{children:["If required, add a new container image in the ",(0,i.jsx)(t.a,{href:"https://github.com/osism/container-images",children:"osism/container-images"}),"\nrepository. The example here is from the ",(0,i.jsx)(t.code,{children:"osism.services.keycloak"})," role: ",(0,i.jsx)(t.a,{href:"https://github.com/osism/container-images/pull/34/files",children:"https://github.com/osism/container-images/pull/34/files"}),"."]}),"\n",(0,i.jsx)(t.p,{children:"Whenever possible, upstream container images should be used. If only minor customizations are necessary,\nalways work with overlay container images based on upstream container images."}),"\n",(0,i.jsx)(t.h2,{id:"how-service-deployment-works",children:"How service deployment works"}),"\n",(0,i.jsx)(t.h3,{id:"docker",children:"Docker"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Service deployment with Docker",src:s(4902).Z+"",width:"281",height:"892"})}),"\n",(0,i.jsx)(t.h3,{id:"kubernetes",children:"Kubernetes"}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Service deployment with Kubernetes",src:s(6231).Z+"",width:"281",height:"902"})})]})}function h(e={}){const{wrapper:t}={...(0,l.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},4902:(e,t,s)=>{s.d(t,{Z:()=>i});const i=s.p+"assets/images/service-with-docker.drawio-21d9ff770c727c43ab477f857b5017e2.png"},6231:(e,t,s)=>{s.d(t,{Z:()=>i});const i=s.p+"assets/images/service-with-kubernetes.drawio-9500d1fb61ca22792d8277f9f06e58ce.png"},1151:(e,t,s)=>{s.d(t,{Z:()=>r,a:()=>o});var i=s(7294);const l={},n=i.createContext(l);function o(e){const t=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),i.createElement(n.Provider,{value:t},e.children)}}}]);