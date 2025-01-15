"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[448],{7907:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>h,contentTitle:()=>c,default:()=>d,frontMatter:()=>t,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"guides/developer-guide/scripts","title":"Scripts","description":"Scripts are included in container images to simplify development work and to enable","source":"@site/docs/guides/developer-guide/scripts.md","sourceDirName":"guides/developer-guide","slug":"/guides/developer-guide/scripts","permalink":"/de/docs/guides/developer-guide/scripts","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/developer-guide/scripts.md","tags":[],"version":"current","sidebarPosition":20,"frontMatter":{"sidebar_label":"Scripts","sidebar_position":20},"sidebar":"tutorialSidebar","previous":{"title":"Releases","permalink":"/de/docs/guides/developer-guide/releases"},"next":{"title":"Style Guide","permalink":"/de/docs/guides/developer-guide/style-guide"}}');var o=i(4848),r=i(8453);const t={sidebar_label:"Scripts",sidebar_position:20},c="Scripts",h={},l=[];function a(e){const s={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.header,{children:(0,o.jsx)(s.h1,{id:"scripts",children:"Scripts"})}),"\n",(0,o.jsx)(s.p,{children:"Scripts are included in container images to simplify development work and to enable\ntesting and hotfixes in running environments. What scripts are available and how to\nuse them is described in this chapter."}),"\n",(0,o.jsxs)(s.p,{children:["The ",(0,o.jsx)(s.code,{children:"change.sh"})," script may be used to update repositories to development branches. Different\ntargets may be passed as a first parameter and existing branch names as a second. The availability\nof targets depends on the container it is run in."]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["For the ",(0,o.jsx)(s.code,{children:"osismclient"})," container"]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh osism <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"})," repository"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["For the ",(0,o.jsx)(s.code,{children:"inventory-reonciler"})," container"]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh osism <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh generics <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh defaults <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/defaults",children:"osism/defaults"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh release <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/release",children:"osism/release"})," repository"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["For the ",(0,o.jsx)(s.code,{children:"osism-ansible"})," container"]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh osism <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh playbooks <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/ansible-playbooks",children:"osism/ansible-playbooks"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh [services|commons|validations] <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-services",children:"osism/ansible-collection-services"}),", ",(0,o.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-commons",children:"osism/ansible-collection-commons"}),", and ",(0,o.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-validations",children:"osism/ansible-collection-validations"})," repositories"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["For the ",(0,o.jsx)(s.code,{children:"ceph-ansible"})," container"]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh osism <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh operations <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/kolla-operations",children:"osism/kolla-operations"})," repository"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["For the ",(0,o.jsx)(s.code,{children:"kolla-ansible"})," container"]}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh osism <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh operations <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/kolla-operations",children:"osism/kolla-operations"})," repository"]}),"\n",(0,o.jsxs)(s.li,{children:[(0,o.jsx)(s.code,{children:"/change.sh kolla-ansible <git branch>"})," for the ",(0,o.jsx)(s.a,{href:"https://opendev.org/openstack/kolla-ansible",children:"openstack/kolla-ansible"})," repository"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.p,{children:["In this example, the ",(0,o.jsx)(s.code,{children:"main"})," branch of ",(0,o.jsx)(s.a,{href:"https://github.com/osism/ansible-collection-services",children:"osism/ansible-collection-services"}),"\nis used in the ",(0,o.jsx)(s.code,{children:"osism-ansible"})," container."]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"docker exec -u root -it osism-ansible /change.sh services main\n"})}),"\n",(0,o.jsx)(s.p,{children:"The respective container should always be restarted after a change."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"docker restart osism-ansible\n"})}),"\n",(0,o.jsx)(s.p,{children:"If something has been changed in the defaults and is to be tested, this must be\nchanged in the inventory reconciler service. Regardless of which of the Ansible services\nthe customised defaults are intended for."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"docker exec -u root -it manager-inventory_reconciler-1 /change.sh defaults main\ndocker restart manager-inventory_reconciler-1\n"})})]})}function d(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(a,{...e})}):a(e)}},8453:(e,s,i)=>{i.d(s,{R:()=>t,x:()=>c});var n=i(6540);const o={},r=n.createContext(o);function t(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);