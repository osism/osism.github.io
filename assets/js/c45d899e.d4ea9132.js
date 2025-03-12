"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5686],{8453:(e,i,o)=>{o.d(i,{R:()=>r,x:()=>d});var n=o(6540);const t={},s=n.createContext(t);function r(e){const i=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),n.createElement(s.Provider,{value:i},e.children)}},9757:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>a,contentTitle:()=>d,default:()=>h,frontMatter:()=>r,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"guides/deploy-guide/seed","title":"Seed","description":"The prerequisite for the deployment of a cluster is a configuration repository.","source":"@site/docs/guides/deploy-guide/seed.md","sourceDirName":"guides/deploy-guide","slug":"/guides/deploy-guide/seed","permalink":"/docs/guides/deploy-guide/seed","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/seed.md","tags":[],"version":"current","sidebarPosition":10,"frontMatter":{"sidebar_label":"Seed","sidebar_position":10},"sidebar":"tutorialSidebar","previous":{"title":"Deploy Guide","permalink":"/docs/guides/deploy-guide/"},"next":{"title":"Manager","permalink":"/docs/guides/deploy-guide/manager"}}');var t=o(4848),s=o(8453);const r={sidebar_label:"Seed",sidebar_position:10},d="Seed",a={},c=[{value:"Install required packages",id:"install-required-packages",level:2},{value:"Get a copy of the configuration repository",id:"get-a-copy-of-the-configuration-repository",level:2}];function l(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.header,{children:(0,t.jsx)(i.h1,{id:"seed",children:"Seed"})}),"\n",(0,t.jsx)(i.admonition,{type:"info",children:(0,t.jsxs)(i.p,{children:["The prerequisite for the deployment of a cluster is a configuration repository.\nWhat a configuration repository is and how it is created is described in the\n",(0,t.jsx)(i.a,{href:"/docs/guides/configuration-guide/configuration-repository#creating-a-new-configuration-repository",children:"Configuration Guide"}),"."]})}),"\n",(0,t.jsx)(i.p,{children:"The seed node is used once for the initial bootstrap of the manager node. The seed node can\nalso be used to initially create and prepare the configuration repository. The seed node is\nnot the manager node itself. It is sufficient to use the local workstation. It doesn't have\nto be a dedicated system. The seed node is no longer needed in the further process. The seed\nnode must be able to reach the manager node via SSH. It is important for the further process\nthat no packages are installed manually on the manager. Especially not Docker."}),"\n",(0,t.jsx)(i.p,{children:"The use of Linux on the seed node is recommended. Other operating systems should also\nwork without problems. It is assumed in this documentation that Ubuntu 22.04 is used on\nthe seed node."}),"\n",(0,t.jsx)(i.h2,{id:"install-required-packages",children:"Install required packages"}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"sudo apt-get install git python3-pip python3-virtualenv sshpass libssh-dev\n"})}),"\n",(0,t.jsx)(i.h2,{id:"get-a-copy-of-the-configuration-repository",children:"Get a copy of the configuration repository"}),"\n",(0,t.jsxs)(i.p,{children:["Each environment managed with OSISM is based on a configuration repository. This was\npreviously created with Cookiecutter and the ",(0,t.jsx)(i.a,{href:"https://github.com/osism/cfg-cookiecutter",children:"osism/cfg-cookiecutter"}),"\nrepository."]}),"\n",(0,t.jsxs)(i.p,{children:["The creation of the configuration repository is covered in chapter\n",(0,t.jsx)(i.a,{href:"/docs/guides/configuration-guide/configuration-repository#creating-a-new-configuration-repository",children:"Creation of a configuration repository"}),"\nof the ",(0,t.jsx)(i.a,{href:"/docs/guides/configuration-guide/",children:"Configuration Guide"}),"."]}),"\n",(0,t.jsx)(i.p,{children:"A configuration repository is stored on a Git server (e.g. GitHub, Gitlab, ...). The\nconfiguration repository is individual for each environment and is therefore not provided\nby us."}),"\n",(0,t.jsxs)(i.p,{children:["The configuration repository to be used must be available on the seed node. In the following\nexample, replace ",(0,t.jsx)(i.code,{children:"YOUR_ORG"})," and ",(0,t.jsx)(i.code,{children:"YOUR_NEW_CONFIGURATION_REPOSITORY"})," accordingly."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"git clone ssh://git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git\n"})}),"\n",(0,t.jsx)(i.p,{children:"Examples:"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsxs)(i.li,{children:["The repository is located in the ",(0,t.jsx)(i.code,{children:"regiocloud"})," organisation on GitHub, has the name\nconfiguration and can be accessed via SSH: ",(0,t.jsx)(i.code,{children:"ssh://git@github.com:regiocloud/configuration.git"})]}),"\n",(0,t.jsxs)(i.li,{children:["The repository is located in the ",(0,t.jsx)(i.code,{children:"regiocloud"})," organisation on Gitlab, has the name configuration\nand can be accessed via SSH: ",(0,t.jsx)(i.code,{children:"ssh://git@gitlab.com:regiocloud/configuration.git"})]}),"\n",(0,t.jsxs)(i.li,{children:["The repository is located in the ",(0,t.jsx)(i.code,{children:"regiocloud"})," organisation on an internal Gitlab, has the name\nconfiguration and can be accessed via SSH: ",(0,t.jsx)(i.code,{children:"ssh://git@git.services.osism.tech:regiocloud/configuration.git"})]}),"\n"]}),"\n",(0,t.jsx)(i.p,{children:"If necessary, the configuration SSH key can be used for the initial transfer of the repository."}),"\n",(0,t.jsxs)(i.p,{children:["For this, the following content is added in ",(0,t.jsx)(i.code,{children:"~/.ssh/config"})," and the SSH privte key is stored in\n",(0,t.jsx)(i.code,{children:"~/.ssh/id_rsa.configuration"}),"."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{children:"Host github.com\n  HostName github.com\n  User git\n  Port 22\n  IdentityFile ~/.ssh/id_rsa.configuration\n"})})]})}function h(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}}}]);