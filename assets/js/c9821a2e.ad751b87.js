"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9246],{1530:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var t=o(5893),i=o(1151);const r={sidebar_label:"Proxy",sidebar_position:15},s="Proxy",a={id:"guides/configuration-guide/proxy",title:"Proxy",description:"In the following examples, it is assumed that the Squid proxy integrated by OSISM",source:"@site/docs/guides/configuration-guide/proxy.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/proxy",permalink:"/docs/guides/configuration-guide/proxy",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/proxy.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_label:"Proxy",sidebar_position:15},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/docs/guides/configuration-guide/network"},next:{title:"Loadbalancer",permalink:"/docs/guides/configuration-guide/loadbalancer"}},d={},c=[{value:"Docker",id:"docker",level:2},{value:"APT",id:"apt",level:2},{value:"Kolla",id:"kolla",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"proxy",children:"Proxy"}),"\n",(0,t.jsx)(n.p,{children:"In the following examples, it is assumed that the Squid proxy integrated by OSISM\nis used on the first manager node. Any other proxy accessible from the nodes can\nalso be used here."}),"\n",(0,t.jsx)(n.p,{children:"The Squid service can be deployed on the first manager. This is useful if no proxy\ncan be used in the environment. The first manager node is then used by all other nodes\nas a pass-through node. Please note that this is not a caching proxy or even an air gap.\nThis is also possible with OSISM, but not with the help of the Squid service."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply squid\n"})}),"\n",(0,t.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,t.jsx)(n.p,{children:"This allows Docker images to be pulled via a proxy."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:'##########################################################\n# proxy\n\ndocker_configure_proxy: true\ndocker_proxy_http: "http://{{ groups[\'manager\'][0] }}:3128"\ndocker_proxy_https: "{{ docker_proxy_http }}"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"apt",children:"APT"}),"\n",(0,t.jsx)(n.p,{children:"This allows APT packages to be downloaded via a proxy."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"##########################################################\n# proxy\n\nproxy_proxies:\n  http: \"http://{{ groups['manager'][0] }}:3128\"\n  https: \"http://{{ groups['manager'][0] }}:3128\"\n"})}),"\n",(0,t.jsx)(n.h2,{id:"kolla",children:"Kolla"}),"\n",(0,t.jsx)(n.p,{children:"Proxy settings for containers such as magnum that need internet access."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'##########################################################\n# proxy\n\ncontainer_http_proxy: "http://{{ groups[\'manager\'][0] }}:3128"\ncontainer_https_proxy: "http://{{ groups[\'manager\'][0] }}:3128"\ncontainer_no_proxy: "localhost,127.0.0.1"\n'})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>s});var t=o(7294);const i={},r=t.createContext(i);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);