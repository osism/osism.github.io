"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7720],{2003:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var n=r(5893),s=r(3905);const i={sidebar_label:"Sysctl"},c="Sysctl",d={id:"guides/configuration-guide/commons/sysctl",title:"Sysctl",description:"With the osism.commons.sysctl role, it is possible to manage the attributes of the kernel",source:"@site/docs/guides/configuration-guide/commons/sysctl.md",sourceDirName:"guides/configuration-guide/commons",slug:"/guides/configuration-guide/commons/sysctl",permalink:"/docs/guides/configuration-guide/commons/sysctl",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/commons/sysctl.md",tags:[],version:"current",frontMatter:{sidebar_label:"Sysctl"},sidebar:"tutorialSidebar",previous:{title:"SSH Config",permalink:"/docs/guides/configuration-guide/commons/sshconfig"},next:{title:"Timezone",permalink:"/docs/guides/configuration-guide/commons/timezone"}},o={},l=[];function a(e){const t={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.ah)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"sysctl",children:"Sysctl"}),"\n",(0,n.jsxs)(t.p,{children:["With the ",(0,n.jsx)(t.code,{children:"osism.commons.sysctl"})," role, it is possible to manage the attributes of the kernel\nvia ",(0,n.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Sysctl",children:"sysctl"})," on a node."]}),"\n",(0,n.jsxs)(t.p,{children:["The following defaults are set via the parameter ",(0,n.jsx)(t.code,{children:"sysctl_defaults"}),"."]}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:(0,n.jsx)(t.strong,{children:"Group"})}),(0,n.jsx)(t.th,{children:(0,n.jsx)(t.strong,{children:"Attribute"})}),(0,n.jsx)(t.th,{children:(0,n.jsx)(t.strong,{children:"Default"})})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"elasticsearch"}),(0,n.jsx)(t.td,{children:"vm.max_map_count"}),(0,n.jsx)(t.td,{children:"262144"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_keepalive_time"}),(0,n.jsx)(t.td,{children:"6"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_keepalive_intvl"}),(0,n.jsx)(t.td,{children:"3"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_keepalive_probes"}),(0,n.jsx)(t.td,{children:"3"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.core.wmem_max"}),(0,n.jsx)(t.td,{children:"16777216"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.core.rmem_max"}),(0,n.jsx)(t.td,{children:"16777216"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_fin_timeout"}),(0,n.jsx)(t.td,{children:"20"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_tw_reuse"}),(0,n.jsx)(t.td,{children:"1"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.core.somaxconn"}),(0,n.jsx)(t.td,{children:"4096"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_syncookies"}),(0,n.jsx)(t.td,{children:"0"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"rabbitmq"}),(0,n.jsx)(t.td,{children:"net.ipv4.tcp_max_syn_backlog"}),(0,n.jsx)(t.td,{children:"8192"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"generic"}),(0,n.jsx)(t.td,{children:"vm.swappiness"}),(0,n.jsx)(t.td,{children:"1"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"compute"}),(0,n.jsx)(t.td,{children:"net.netfilter.nf_conntrack_max"}),(0,n.jsx)(t.td,{children:"1048576"})]})]})]}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"sysctl_extra"})," parameter can be used to set your own parameters or overwrite existing\nparameters in the defaults."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-yaml",metastring:'title="Set attribute fs.inotify.max_user_instances to 256 for all nodes in group generic"',children:"sysctl_extra:\n  generic:\n    - name: fs.inotify.max_user_instances\n      value: 256\n"})})]})}function h(e={}){const{wrapper:t}={...(0,s.ah)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}},3905:(e,t,r)=>{r.d(t,{ah:()=>l});var n=r(7294);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var o=n.createContext({}),l=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},a={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,i=e.originalType,o=e.parentName,h=d(e,["components","mdxType","originalType","parentName"]),m=l(r),u=s,x=m["".concat(o,".").concat(u)]||m[u]||a[u]||i;return r?n.createElement(x,c(c({ref:t},h),{},{components:r})):n.createElement(x,c({ref:t},h))}));h.displayName="MDXCreateElement"}}]);