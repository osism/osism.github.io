"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4983],{1342:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var s=i(5893),r=i(1151);const t={sidebar_label:"Manager",sidebar_position:10},o="Manager",a={id:"guides/upgrade-guide/manager",title:"Manager",description:"Always read the release notes first to learn what has changed and what",source:"@site/docs/guides/upgrade-guide/manager.md",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/manager",permalink:"/docs/guides/upgrade-guide/manager",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/manager.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Manager",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Upgrade Guide",permalink:"/docs/guides/upgrade-guide/"},next:{title:"Network",permalink:"/docs/guides/upgrade-guide/network"}},d={},c=[];function l(e){const n={a:"a",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"manager",children:"Manager"}),"\n",(0,s.jsx)(n.p,{children:"Always read the release notes first to learn what has changed and what\nadjustments are necessary"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Update the OSISM release in use in the configuration repository."}),"\n",(0,s.jsx)(n.p,{children:"1.1. Set the new manager version in the configuration repository."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"yq -i '.manager_version = \"6.0.0\"' environments/manager/configuration.yml\n"})}),"\n",(0,s.jsxs)(n.p,{children:["1.2. If ",(0,s.jsx)(n.code,{children:"openstack_version"})," or ",(0,s.jsx)(n.code,{children:"ceph_version"})," are set in ",(0,s.jsx)(n.code,{children:"environments/manager/configuration.yml"}),"\n(or anywhere else), they must be removed. If these are set, the stable release is not used for\nthese components."]}),"\n",(0,s.jsxs)(n.p,{children:["1.3. Sync the image versions in the configuration repository. It is important to do this so\nthat the correct versions are available in ",(0,s.jsx)(n.code,{children:"environments/manager/images.yml"}),". If Gilt is\nnot installed via the ",(0,s.jsx)(n.code,{children:"requirements.txt"})," of the manager environment it is important to\nuse a version smaller v2. The v2 of Gilt is not yet usable."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"gilt overlay  # you have to do this 2x\ngilt overlay\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Optionally, this is normally not necessary, it is possible to reference a specific tag of the\n",(0,s.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository. To do this, first\ncheck which version of osism/cfg-generics is used in a particular release. The version is\ndefined in ",(0,s.jsx)(n.code,{children:"generics_version"})," in the ",(0,s.jsx)(n.code,{children:"base.yml"})," file in the ",(0,s.jsx)(n.code,{children:"osism/release"})," repository. For OSISM 6.0.0,\nfor example, this is version ",(0,s.jsx)(n.a,{href:"https://github.com/osism/release/blob/main/6.0.0/base.yml#L6",children:"v0.20230919.0"}),".\nThis version is then added to the file ",(0,s.jsx)(n.code,{children:"gilt.yml"})," in the configuration repository instead of\n",(0,s.jsx)(n.code,{children:"main"})," at ",(0,s.jsx)(n.code,{children:"version"}),". This change must be made again after each execution of ",(0,s.jsx)(n.code,{children:"gilt overlay"})," as\nit is overwritten by the call of ",(0,s.jsx)(n.code,{children:"gilt overlay"}),". This cannot be realized differently in the\ncurrent implementation of ",(0,s.jsx)(n.a,{href:"https://github.com/retr0h/gilt",children:"Gilt"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"1.4. Commit and push changes in the configuration repository. Since everyone here has their own\nworkflows for changes to the configuration repository, only a generic example for Git."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'git commit -a -s -m "manager: use OSISM version 6.0.0"\ngit push\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Update the configuration repository on the manager."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply configuration\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Update the manager services on the manager."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism update manager\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["If Ansible Vault was used to encrypt ",(0,s.jsx)(n.code,{children:"environments/manager/secrets.yml"}),", the parameter\n",(0,s.jsx)(n.code,{children:"--ask-vault-pass"})," is also appended."]}),"\n",(0,s.jsxs)(n.li,{children:["If ",(0,s.jsx)(n.code,{children:"osism update manager"})," does not work yet, use ",(0,s.jsx)(n.code,{children:"osism-update-manager"})," instead."]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Refresh the facts cache."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply facts\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["If Traefik is used on the management plane (",(0,s.jsx)(n.code,{children:"traefik_enable: true"})," in ",(0,s.jsx)(n.code,{children:"environments/infrastructure/configuration.yml"}),")\nthen Traefik should also be upgraded directly."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply traefik\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Finally, the Ansible vault password must be made known again."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism set vault password\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>o});var s=i(7294);const r={},t=s.createContext(r);function o(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);