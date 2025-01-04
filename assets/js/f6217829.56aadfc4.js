"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8890],{1815:(e,i,o)=>{o.r(i),o.d(i,{assets:()=>d,contentTitle:()=>t,default:()=>g,frontMatter:()=>c,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"guides/configuration-guide/services/docker","title":"Docker","description":"With the osism.services.docker role, it is possible to manage Docker.","source":"@site/docs/guides/configuration-guide/services/docker.md","sourceDirName":"guides/configuration-guide/services","slug":"/guides/configuration-guide/services/docker","permalink":"/docs/guides/configuration-guide/services/docker","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/services/docker.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"Docker"},"sidebar":"tutorialSidebar","previous":{"title":"Chrony","permalink":"/docs/guides/configuration-guide/services/chrony"},"next":{"title":"Tuned","permalink":"/docs/guides/configuration-guide/services/tuned"}}');var n=o(4848),s=o(8453);const c={sidebar_label:"Docker"},t="Docker",d={},l=[{value:"Configure logging drivers",id:"configure-logging-drivers",level:2}];function a(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"docker",children:"Docker"})}),"\n",(0,n.jsxs)(i.p,{children:["With the ",(0,n.jsx)(i.code,{children:"osism.services.docker"})," role, it is possible to manage Docker."]}),"\n",(0,n.jsx)(i.h2,{id:"configure-logging-drivers",children:"Configure logging drivers"}),"\n",(0,n.jsxs)(i.p,{children:["Docker documentation: ",(0,n.jsx)(i.a,{href:"https://docs.docker.com/config/containers/logging/configure/",children:"https://docs.docker.com/config/containers/logging/configure/"})]}),"\n",(0,n.jsx)(i.p,{children:"The role currently supports the following parameters with their respective defaults."}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-yaml",children:'docker_log_driver: "json-file"\ndocker_log_level: info\ndocker_log_opts:\n  max-size: 10m\n  max-file: 3\n'})}),"\n",(0,n.jsxs)(i.p,{children:["The log driver to be used can be configured with ",(0,n.jsx)(i.code,{children:"docker_log_driver"}),". By default,\n",(0,n.jsx)(i.a,{href:"https://docs.docker.com/config/containers/logging/json-file/",children:"json-file"})," is used.\nThe log driver writes all logs of a container to a JSON file\nin ",(0,n.jsx)(i.code,{children:"/var/lib/docker/containers"}),". All supported log drivers can be found in the\n",(0,n.jsx)(i.a,{href:"https://docs.docker.com/config/containers/logging/configure/#supported-logging-drivers",children:"Docker documentation"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["The log level can be configured via ",(0,n.jsx)(i.code,{children:"docker_log_level"}),"."]}),"\n",(0,n.jsxs)(i.p,{children:["Parameters for the log driver used can be set with the ",(0,n.jsx)(i.code,{children:"docker_log_opts"})," dictionary.\nBy default, the maximum size of a JSON file is set to 10 MByte with ",(0,n.jsx)(i.code,{children:"max-size: 10m"}),".\nIf it contains more, the file is rotated."]}),"\n",(0,n.jsxs)(i.p,{children:["Furthermore, ",(0,n.jsx)(i.code,{children:"max-file: 3"})," specifies that up to 3 files should be available."]}),"\n",(0,n.jsx)(i.p,{children:"Existing containers don't use the new logging configuration automatically."})]})}function g(e={}){const{wrapper:i}={...(0,s.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},8453:(e,i,o)=>{o.d(i,{R:()=>c,x:()=>t});var r=o(6540);const n={},s=r.createContext(n);function c(e){const i=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function t(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:c(e.components),r.createElement(s.Provider,{value:i},e.children)}}}]);