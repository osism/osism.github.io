"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1391],{7898:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>r,default:()=>u,frontMatter:()=>c,metadata:()=>a,toc:()=>l});var t=n(5893),s=n(1151);const c={sidebar_label:"Self-signed certificates",sidebar_position:20},r="Self-signed certificates",a={id:"guides/configuration-guide/self-signed-certificates",title:"Self-signed certificates",description:"The use of self-signed certificates with a custom CA is possible. However, a few",source:"@site/docs/guides/configuration-guide/self-signed-certificates.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/self-signed-certificates",permalink:"/docs/guides/configuration-guide/self-signed-certificates",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/self-signed-certificates.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Self-signed certificates",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Loadbalancer",permalink:"/docs/guides/configuration-guide/loadbalancer"},next:{title:"Ceph",permalink:"/docs/guides/configuration-guide/ceph"}},o={},l=[];function d(e){const i={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h1,{id:"self-signed-certificates",children:"Self-signed certificates"}),"\n",(0,t.jsx)(i.p,{children:"The use of self-signed certificates with a custom CA is possible. However, a few\nadditional parameters are then required in the configuration so that the custom CA\nis known everywhere and the self-signed certificates are accepted as valid."}),"\n",(0,t.jsxs)(i.ol,{children:["\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.p,{children:"Import custom CA"}),"\n",(0,t.jsxs)(i.p,{children:["Any custom CA can be added via the ",(0,t.jsx)(i.code,{children:"certificates_ca"})," parameter.\nThe import on the nodes is done via ",(0,t.jsx)(i.code,{children:"osism apply certificates"}),".\nThis is already done in the bootstrap of the nodes."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"certificates_ca:\n  - name: custom.crt\n    certificate: |\n      -----BEGIN CERTIFICATE-----\n      [...]\n      -----END CERTIFICATE-----\n"})}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.p,{children:"Manager service"}),"\n",(0,t.jsxs)(i.p,{children:["The local environment variable ",(0,t.jsx)(i.code,{children:"REQUESTS_CA_BUNDLE"})," must be set explicitly so that\nthe manager service knows the custom CA in all necessary places."]}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",metastring:'title="environments/manager/configuration.yml"',children:"manager_environment_extra:\n  REQUESTS_CA_BUNDLE: /etc/ssl/certs/ca-certificates.crt\n"})}),"\n"]}),"\n",(0,t.jsxs)(i.li,{children:["\n",(0,t.jsx)(i.p,{children:"Use in OpenStack"}),"\n",(0,t.jsxs)(i.p,{children:["The custom CA must also be copied into the OpenStack containers. To do this, the custom\nCA is first added in a file in the ",(0,t.jsx)(i.code,{children:"environments/kolla/certificates/ca"})," of the configuration\nrepository.  It makes sense to use the same filename like in step 1."]}),"\n",(0,t.jsx)(i.p,{children:"The import of the custom CA must then be explicitly enabled."}),"\n",(0,t.jsx)(i.pre,{children:(0,t.jsx)(i.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'kolla_copy_ca_into_containers: "yes"\nopenstack_cacert: /etc/ssl/certs/ca-certificates.crt\n'})}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,s.a)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,i,n)=>{n.d(i,{Z:()=>a,a:()=>r});var t=n(7294);const s={},c=t.createContext(s);function r(e){const i=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(c.Provider,{value:i},e.children)}}}]);