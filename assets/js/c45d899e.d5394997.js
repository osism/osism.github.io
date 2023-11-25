"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2018],{528:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var t=i(5893),o=i(3905);const r={sidebar_label:"Seed",sidebar_position:10},s="Seed",a={id:"guides/deploy-guide/seed",title:"Seed",description:"The seed node is used once for the initial bootstrap of the manager node. It is sufficient",source:"@site/docs/guides/deploy-guide/seed.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/seed",permalink:"/docs/guides/deploy-guide/seed",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/seed.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Seed",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Deploy Guide",permalink:"/docs/guides/deploy-guide/"},next:{title:"Manager",permalink:"/docs/guides/deploy-guide/manager"}},c={},d=[{value:"Install required packages",id:"install-required-packages",level:2},{value:"Get a copy of the configuration repository",id:"get-a-copy-of-the-configuration-repository",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.ah)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"seed",children:"Seed"}),"\n",(0,t.jsx)(n.p,{children:"The seed node is used once for the initial bootstrap of the manager node. It is sufficient\nto use the local workstation. It doesn't have to be a dedicated system. The seed node is\nno longer needed in the further process. The seed node must be able to reach the manager\nnode via SSH."}),"\n",(0,t.jsx)(n.p,{children:"The use of Linux on the seed node is recommended. Other operating systems should also\nwork without problems."}),"\n",(0,t.jsx)(n.h2,{id:"install-required-packages",children:"Install required packages"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"sudo apt-get install git python3-pip python3-virtualenv sshpass\n"})}),"\n",(0,t.jsx)(n.h2,{id:"get-a-copy-of-the-configuration-repository",children:"Get a copy of the configuration repository"}),"\n",(0,t.jsx)(n.p,{children:"Each environment managed with OSISM is based on a configuration repository. This was\npreviously created with Cookiecutter and the cfg-cookiecutter repository."}),"\n",(0,t.jsx)(n.p,{children:"A configuration repository is stored on a Git server (e.g. GitHub, Gitlab, ...). The\nconfiguration repository is individual for each environment and is therefore not provided\nby us."}),"\n",(0,t.jsxs)(n.p,{children:["The configuration repository to be used must be available on the seed node. In the following\nexample, replace ",(0,t.jsx)(n.code,{children:"YOUR_ORG"})," and ",(0,t.jsx)(n.code,{children:"YOUR_NEW_CONFIGURATION_REPOSITORY"})," accordingly."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"git clone ssh://git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git\n"})}),"\n",(0,t.jsx)(n.p,{children:"Examples:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The repository is located in the ",(0,t.jsx)(n.code,{children:"regiocloud"})," organisation on GitHub, has the name\nconfiguration and can be accessed via SSH: ",(0,t.jsx)(n.code,{children:"ssh://git@github.com:regiocloud/configuration.git"})]}),"\n",(0,t.jsxs)(n.li,{children:["The repository is located in the ",(0,t.jsx)(n.code,{children:"regiocloud"})," organisation on Gitlab, has the name configuration\nand can be accessed via SSH: ",(0,t.jsx)(n.code,{children:"ssh://git@gitlab.com:regiocloud/configuration.git"})]}),"\n",(0,t.jsxs)(n.li,{children:["The repository is located in the ",(0,t.jsx)(n.code,{children:"regiocloud"})," organisation on an internal Gitlab, has the name\nconfiguration and can be accessed via SSH: ",(0,t.jsx)(n.code,{children:"ssh://git@git.services.osism.tech:regiocloud/configuration.git"})]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"If necessary, the configuration SSH key can be used for the initial transfer of the repository."}),"\n",(0,t.jsxs)(n.p,{children:["For this, the following content is added in ",(0,t.jsx)(n.code,{children:"~/.ssh/config"})," and the SSH privte key is stored in\n",(0,t.jsx)(n.code,{children:"~/.ssh/id_rsa.configuration"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Host github.com\n  HostName github.com\n  User git\n  Port 22\n  IdentityFile ~/.ssh/id_rsa.configuration\n"})})]})}function u(e={}){const{wrapper:n}={...(0,o.ah)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},3905:(e,n,i)=>{i.d(n,{ah:()=>d});var t=i(7294);function o(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function r(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,t)}return i}function s(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?r(Object(i),!0).forEach((function(n){o(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function a(e,n){if(null==e)return{};var i,t,o=function(e,n){if(null==e)return{};var i,t,o={},r=Object.keys(e);for(t=0;t<r.length;t++)i=r[t],n.indexOf(i)>=0||(o[i]=e[i]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)i=r[t],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(o[i]=e[i])}return o}var c=t.createContext({}),d=function(e){var n=t.useContext(c),i=n;return e&&(i="function"==typeof e?e(n):s(s({},n),e)),i},l={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var i=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),h=d(i),p=o,g=h["".concat(c,".").concat(p)]||h[p]||l[p]||r;return i?t.createElement(g,s(s({ref:n},u),{},{components:i})):t.createElement(g,s({ref:n},u))}));u.displayName="MDXCreateElement"}}]);