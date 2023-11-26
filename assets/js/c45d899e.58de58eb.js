"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2018],{528:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>c});var o=n(5893),t=n(1151);const s={sidebar_label:"Seed",sidebar_position:10},r="Seed",d={id:"guides/deploy-guide/seed",title:"Seed",description:"The seed node is used once for the initial bootstrap of the manager node. It is sufficient",source:"@site/docs/guides/deploy-guide/seed.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/seed",permalink:"/docs/guides/deploy-guide/seed",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/seed.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Seed",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Deploy Guide",permalink:"/docs/guides/deploy-guide/"},next:{title:"Manager",permalink:"/docs/guides/deploy-guide/manager"}},a={},c=[{value:"Install required packages",id:"install-required-packages",level:2},{value:"Get a copy of the configuration repository",id:"get-a-copy-of-the-configuration-repository",level:2}];function l(e){const i={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.h1,{id:"seed",children:"Seed"}),"\n",(0,o.jsx)(i.p,{children:"The seed node is used once for the initial bootstrap of the manager node. It is sufficient\nto use the local workstation. It doesn't have to be a dedicated system. The seed node is\nno longer needed in the further process. The seed node must be able to reach the manager\nnode via SSH."}),"\n",(0,o.jsx)(i.p,{children:"The use of Linux on the seed node is recommended. Other operating systems should also\nwork without problems."}),"\n",(0,o.jsx)(i.h2,{id:"install-required-packages",children:"Install required packages"}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"sudo apt-get install git python3-pip python3-virtualenv sshpass\n"})}),"\n",(0,o.jsx)(i.h2,{id:"get-a-copy-of-the-configuration-repository",children:"Get a copy of the configuration repository"}),"\n",(0,o.jsx)(i.p,{children:"Each environment managed with OSISM is based on a configuration repository. This was\npreviously created with Cookiecutter and the cfg-cookiecutter repository."}),"\n",(0,o.jsx)(i.p,{children:"A configuration repository is stored on a Git server (e.g. GitHub, Gitlab, ...). The\nconfiguration repository is individual for each environment and is therefore not provided\nby us."}),"\n",(0,o.jsxs)(i.p,{children:["The configuration repository to be used must be available on the seed node. In the following\nexample, replace ",(0,o.jsx)(i.code,{children:"YOUR_ORG"})," and ",(0,o.jsx)(i.code,{children:"YOUR_NEW_CONFIGURATION_REPOSITORY"})," accordingly."]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"git clone ssh://git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git\n"})}),"\n",(0,o.jsx)(i.p,{children:"Examples:"}),"\n",(0,o.jsxs)(i.ul,{children:["\n",(0,o.jsxs)(i.li,{children:["The repository is located in the ",(0,o.jsx)(i.code,{children:"regiocloud"})," organisation on GitHub, has the name\nconfiguration and can be accessed via SSH: ",(0,o.jsx)(i.code,{children:"ssh://git@github.com:regiocloud/configuration.git"})]}),"\n",(0,o.jsxs)(i.li,{children:["The repository is located in the ",(0,o.jsx)(i.code,{children:"regiocloud"})," organisation on Gitlab, has the name configuration\nand can be accessed via SSH: ",(0,o.jsx)(i.code,{children:"ssh://git@gitlab.com:regiocloud/configuration.git"})]}),"\n",(0,o.jsxs)(i.li,{children:["The repository is located in the ",(0,o.jsx)(i.code,{children:"regiocloud"})," organisation on an internal Gitlab, has the name\nconfiguration and can be accessed via SSH: ",(0,o.jsx)(i.code,{children:"ssh://git@git.services.osism.tech:regiocloud/configuration.git"})]}),"\n"]}),"\n",(0,o.jsx)(i.p,{children:"If necessary, the configuration SSH key can be used for the initial transfer of the repository."}),"\n",(0,o.jsxs)(i.p,{children:["For this, the following content is added in ",(0,o.jsx)(i.code,{children:"~/.ssh/config"})," and the SSH privte key is stored in\n",(0,o.jsx)(i.code,{children:"~/.ssh/id_rsa.configuration"}),"."]}),"\n",(0,o.jsx)(i.pre,{children:(0,o.jsx)(i.code,{children:"Host github.com\n  HostName github.com\n  User git\n  Port 22\n  IdentityFile ~/.ssh/id_rsa.configuration\n"})})]})}function h(e={}){const{wrapper:i}={...(0,t.a)(),...e.components};return i?(0,o.jsx)(i,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,i,n)=>{n.d(i,{Z:()=>d,a:()=>r});var o=n(7294);const t={},s=o.createContext(t);function r(e){const i=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),o.createElement(s.Provider,{value:i},e.children)}}}]);