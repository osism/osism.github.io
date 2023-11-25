"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3188],{4525:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var t=n(5893),i=n(3905);const a={sidebar_label:"Packages"},s="Packages",c={id:"guides/configuration-guide/commons/packages",title:"Packages",description:"With the osism.commons.packages role, it is possible to add packages on a node",source:"@site/docs/guides/configuration-guide/commons/packages.md",sourceDirName:"guides/configuration-guide/commons",slug:"/guides/configuration-guide/commons/packages",permalink:"/docs/guides/configuration-guide/commons/packages",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/commons/packages.md",tags:[],version:"current",frontMatter:{sidebar_label:"Packages"},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/docs/guides/configuration-guide/commons/network"},next:{title:"Services",permalink:"/docs/guides/configuration-guide/commons/services"}},o={},d=[{value:"Distribution specific packages",id:"distribution-specific-packages",level:2},{value:"Debian",id:"debian",level:3},{value:"Upgrade of packages",id:"upgrade-of-packages",level:2}];function u(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.ah)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"packages",children:"Packages"}),"\n",(0,t.jsxs)(r.p,{children:["With the ",(0,t.jsx)(r.code,{children:"osism.commons.packages"})," role, it is possible to add packages on a node\nin a general form."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:'required_packages_default:\n  - ethtool\n  - jq\n  - rsyslog\n\nrequired_packages_extra: []\nrequired_packages: "{{ required_packages_default + required_packages_extra + required_packages_distribution }}"\n'})}),"\n",(0,t.jsx)(r.h2,{id:"distribution-specific-packages",children:"Distribution specific packages"}),"\n",(0,t.jsx)(r.h3,{id:"debian",children:"Debian"}),"\n",(0,t.jsxs)(r.p,{children:["With Debian, the packages listed in ",(0,t.jsx)(r.code,{children:"required_packages_distribution"})," are installed by default."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"required_packages_distribution:\n  - debsums\n  - selinux-utils\n  - ssh\n"})}),"\n",(0,t.jsxs)(r.p,{children:["The ",(0,t.jsx)(r.code,{children:"apt_cache_valid_time"})," parameter can be used to set the ",(0,t.jsx)(r.code,{children:"cache_valid_time"})," paremter\nof the ",(0,t.jsx)(r.code,{children:"ansible.builtin.apt"})," module. The module updates the apt cache if it is older than\nthe ",(0,t.jsx)(r.code,{children:"cache_valid_time"}),". The parameter is set in seconds and defaults to ",(0,t.jsx)(r.code,{children:"3600"}),"."]}),"\n",(0,t.jsx)(r.h2,{id:"upgrade-of-packages",children:"Upgrade of packages"}),"\n",(0,t.jsxs)(r.p,{children:["The ",(0,t.jsx)(r.code,{children:"upgrade_packages"})," parameter can be used to configure the upgrade of packages.\nThe parameter is set to ",(0,t.jsx)(r.code,{children:"true"})," by default."]})]})}function p(e={}){const{wrapper:r}={...(0,i.ah)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},3905:(e,r,n)=>{n.d(r,{ah:()=>d});var t=n(7294);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function c(e,r){if(null==e)return{};var n,t,i=function(e,r){if(null==e)return{};var n,t,i={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(i[n]=e[n]);return i}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=t.createContext({}),d=function(e){var r=t.useContext(o),n=r;return e&&(n="function"==typeof e?e(r):s(s({},r),e)),n},u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},p=t.forwardRef((function(e,r){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=d(n),g=i,h=l["".concat(o,".").concat(g)]||l[g]||u[g]||a;return n?t.createElement(h,s(s({ref:r},p),{},{components:n})):t.createElement(h,s({ref:r},p))}));p.displayName="MDXCreateElement"}}]);