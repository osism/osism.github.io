"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4118],{4110:(e,s,i)=>{i.r(s),i.d(s,{assets:()=>d,contentTitle:()=>o,default:()=>l,frontMatter:()=>t,metadata:()=>c,toc:()=>a});var n=i(5893),r=i(1151);const t={sidebar_label:"Services"},o="Services",c={id:"guides/configuration-guide/commons/services",title:"Services",description:"With the osism.commons.services role, it is possible to manage services on a node",source:"@site/docs/guides/configuration-guide/commons/services.md",sourceDirName:"guides/configuration-guide/commons",slug:"/guides/configuration-guide/commons/services",permalink:"/de/docs/guides/configuration-guide/commons/services",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/commons/services.md",tags:[],version:"current",frontMatter:{sidebar_label:"Services"},sidebar:"tutorialSidebar",previous:{title:"Resolvconf",permalink:"/de/docs/guides/configuration-guide/commons/resolvconf"},next:{title:"SSH Config",permalink:"/de/docs/guides/configuration-guide/commons/sshconfig"}},d={},a=[{value:"Start and enable required services",id:"start-and-enable-required-services",level:2},{value:"Note on services that should be deactivated",id:"note-on-services-that-should-be-deactivated",level:2}];function u(e){const s={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"services",children:"Services"})}),"\n",(0,n.jsxs)(s.p,{children:["With the ",(0,n.jsx)(s.code,{children:"osism.commons.services"})," role, it is possible to manage services on a node\nin a general form. This allows you to either activate any services or indicate that\nspecific services are running and should be deactivated."]}),"\n",(0,n.jsx)(s.h2,{id:"start-and-enable-required-services",children:"Start and enable required services"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'services_required_default:\n  - cron\nservices_required_extra: []\nservices_required: "{{ services_required_default + services_required_extra }}"\n'})}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"services_required"})," should not be overwritten. Use ",(0,n.jsx)(s.code,{children:"services_required_extra"})," to add extra services."]})}),"\n",(0,n.jsx)(s.h2,{id:"note-on-services-that-should-be-deactivated",children:"Note on services that should be deactivated"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-yaml",children:'services_warning_default:\n  - nscd\nservices_warning_extra: []\nservices_warning: "{{ services_warning_default + services_warning_extra }}"\n'})}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"services_warning"})," should not be overwritten. Use ",(0,n.jsx)(s.code,{children:"services_warning_extra"})," to add extra services."]})})]})}function l(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},1151:(e,s,i)=>{i.d(s,{Z:()=>c,a:()=>o});var n=i(7294);const r={},t=n.createContext(r);function o(e){const s=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(t.Provider,{value:s},e.children)}}}]);