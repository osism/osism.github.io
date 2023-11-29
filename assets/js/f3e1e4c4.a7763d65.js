"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1336],{7964:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>l,contentTitle:()=>t,default:()=>a,frontMatter:()=>o,metadata:()=>c,toc:()=>h});var n=i(5893),r=i(1151);const o={sidebar_label:"Scripts",sidebar_position:20},t="Scripts",c={id:"guides/other-guides/developer-guide/scripts",title:"Scripts",description:"Scripts are included in container images to simplify development work and to enable",source:"@site/docs/guides/other-guides/developer-guide/scripts.md",sourceDirName:"guides/other-guides/developer-guide",slug:"/guides/other-guides/developer-guide/scripts",permalink:"/docs/guides/other-guides/developer-guide/scripts",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/other-guides/developer-guide/scripts.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Scripts",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Releases",permalink:"/docs/guides/other-guides/developer-guide/releases"},next:{title:"Zuul Ci",permalink:"/docs/guides/other-guides/developer-guide/zuul-ci"}},l={},h=[{value:"change-osism.sh",id:"change-osismsh",level:2},{value:"Inventory Reconciler",id:"inventory-reconciler",level:2},{value:"osism-ansible",id:"osism-ansible",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.h1,{id:"scripts",children:"Scripts"}),"\n",(0,n.jsx)(s.p,{children:"Scripts are included in container images to simplify development work and to enable\ntesting and hotfixes in running environments. What scripts are available and how to\nuse them is described in this chapter."}),"\n",(0,n.jsx)(s.h2,{id:"change-osismsh",children:"change-osism.sh"}),"\n",(0,n.jsxs)(s.p,{children:["With the ",(0,n.jsx)(s.code,{children:"change-osism.sh"})," script it is possible to bring the\n",(0,n.jsx)(s.a,{href:"https://pypi.org/project/osism/",children:"Python package osism"})," to a\ndevelopment state from the\n",(0,n.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"}),"\nrepository."]}),"\n",(0,n.jsxs)(s.p,{children:["Here, the script is used in the running inventory reconciler\nservice to install the branch ",(0,n.jsx)(s.code,{children:"main"})," of\n",(0,n.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"}),".\nInstead of ",(0,n.jsx)(s.code,{children:"main"}),", any branch can be used."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"docker exec -u root -it manager-inventory_reconciler-1 /change-osism.sh main\n"})}),"\n",(0,n.jsx)(s.p,{children:"It is important to restart the container afterwards."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"docker restart manager-inventory_reconciler-1\n"})}),"\n",(0,n.jsx)(s.p,{children:"The script is included in the following container images:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://github.com/osism/container-image-ceph-ansible",children:"osism/ceph-ansible"})," used by the service ",(0,n.jsx)(s.code,{children:"ceph-ansible"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://github.com/osism/container-image-inventory-reconciler",children:"osism/inventory-reconciler"})," used by the service ",(0,n.jsx)(s.code,{children:"manager-inventory_reconciler-1"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://github.com/osism/container-image-kolla-ansible",children:"osism/kolla-ansible"})," used by the service ",(0,n.jsx)(s.code,{children:"kolla-ansible"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://github.com/osism/container-image-osism-ansible",children:"osism/osism-ansible"})," used by the service ",(0,n.jsx)(s.code,{children:"osism-ansible"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"})," osed by the service ",(0,n.jsx)(s.code,{children:"osismclient"})]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"inventory-reconciler",children:"Inventory Reconciler"}),"\n",(0,n.jsx)(s.p,{children:"The container image of the inventory eeconciler contains a few more scripts."}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"change-generics.sh"})," for the ",(0,n.jsx)(s.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"change-defaults.sh"})," for the ",(0,n.jsx)(s.a,{href:"https://github.com/osism/defaults",children:"osism/defaults"})," repository"]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"change-release.sh"})," for the ",(0,n.jsx)(s.a,{href:"https://github.com/osism/release",children:"osism/release"})," repository"]}),"\n"]}),"\n",(0,n.jsx)(s.p,{children:"It is important to restart the container afterwards."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"docker restart manager-inventory_reconciler-1\n"})}),"\n",(0,n.jsx)(s.h2,{id:"osism-ansible",children:"osism-ansible"}),"\n",(0,n.jsx)(s.p,{children:"The osism-ansible container image contains a few more scripts."}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"change.sh"})," for the ",(0,n.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-services",children:"osism/ansible-collection-services"}),", ",(0,n.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-commons",children:"osism/ansible-collection-commons"}),", and ",(0,n.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-validations",children:"osism/ansible-collection-validations"})," repositories"]}),"\n",(0,n.jsxs)(s.p,{children:["In this example, the ",(0,n.jsx)(s.code,{children:"main"})," branch of ",(0,n.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-services",children:"osism/ansible-collection-services"})," is used."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"docker exec -u root -it osism-ansible /change.sh services main\n"})}),"\n"]}),"\n",(0,n.jsxs)(s.li,{children:["\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"change-playbooks.sh"})," for the ",(0,n.jsx)(s.a,{href:"https://github.com/osism/ansible-playbooks",children:"osism/ansible-playbooks"})," repository"]}),"\n"]}),"\n"]})]})}function a(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},1151:(e,s,i)=>{i.d(s,{Z:()=>c,a:()=>t});var n=i(7294);const r={},o=n.createContext(r);function t(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);