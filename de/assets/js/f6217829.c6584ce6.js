"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6882],{9860:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>d,contentTitle:()=>c,default:()=>g,frontMatter:()=>s,metadata:()=>t,toc:()=>l});var r=o(5893),n=o(1151);const s={sidebar_label:"Docker"},c="Docker",t={id:"guides/configuration-guide/services/docker",title:"Docker",description:"With the osism.services.docker role, it is possible to manage Docker.",source:"@site/docs/guides/configuration-guide/services/docker.md",sourceDirName:"guides/configuration-guide/services",slug:"/guides/configuration-guide/services/docker",permalink:"/de/docs/guides/configuration-guide/services/docker",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/services/docker.md",tags:[],version:"current",frontMatter:{sidebar_label:"Docker"},sidebar:"tutorialSidebar",previous:{title:"Services",permalink:"/de/docs/guides/configuration-guide/services/"},next:{title:"Ceph",permalink:"/de/docs/guides/configuration-guide/ceph"}},d={},l=[{value:"Configure logging drivers",id:"configure-logging-drivers",level:2}];function a(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{id:"docker",children:"Docker"}),"\n",(0,r.jsxs)(i.p,{children:["With the ",(0,r.jsx)(i.code,{children:"osism.services.docker"})," role, it is possible to manage Docker."]}),"\n",(0,r.jsx)(i.h2,{id:"configure-logging-drivers",children:"Configure logging drivers"}),"\n",(0,r.jsxs)(i.p,{children:["Docker documentation: ",(0,r.jsx)(i.a,{href:"https://docs.docker.com/config/containers/logging/configure/",children:"https://docs.docker.com/config/containers/logging/configure/"})]}),"\n",(0,r.jsx)(i.p,{children:"The role currently supports the following parameters with their respective defaults."}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-yaml",children:'docker_log_driver: "json-file"\ndocker_log_level: info\ndocker_log_opts:\n  max-size: 10m\n  max-file: 3\n'})}),"\n",(0,r.jsxs)(i.p,{children:["The log driver to be used can be configured with ",(0,r.jsx)(i.code,{children:"docker_log_driver"}),". By default,\n",(0,r.jsx)(i.code,{children:"json-file"})," is used. The log driver writes all logs of a container to a JSON file\nin ",(0,r.jsx)(i.code,{children:"/var/lib/docker/containers"}),". All supported log drivers can be found in the\n",(0,r.jsx)(i.a,{href:"https://docs.docker.com/config/containers/logging/configure/#supported-logging-drivers",children:"Docker documentation"}),"."]}),"\n",(0,r.jsxs)(i.p,{children:["The log level can be configured via ",(0,r.jsx)(i.code,{children:"docker_log_level"}),"."]}),"\n",(0,r.jsxs)(i.p,{children:["Parameters for the log driver used can be set with the ",(0,r.jsx)(i.code,{children:"docker_log_opts"})," dictionary.\nBy default, the maximum size of a JSON file is set to 10 MByte with ",(0,r.jsx)(i.code,{children:"max-size: 10m"}),".\nIf it contains more, the file is rotated."]}),"\n",(0,r.jsxs)(i.p,{children:["Furthermore, ",(0,r.jsx)(i.code,{children:"max-file: 3"})," specifies that up to 3 files should be available."]})]})}function g(e={}){const{wrapper:i}={...(0,n.a)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1151:(e,i,o)=>{o.d(i,{Z:()=>t,a:()=>c});var r=o(7294);const n={},s=r.createContext(n);function c(e){const i=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function t(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),r.createElement(s.Provider,{value:i},e.children)}}}]);