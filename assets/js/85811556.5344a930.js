"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2649],{6492:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var a=t(5893),n=t(3905);const o={sidebar_label:"Resource Manager",sidebar_position:52},i="Resource Manager",c={id:"guides/operations-guide/openstack/resource-manager",title:"Resource Manager",description:"Octavia",source:"@site/docs/guides/operations-guide/openstack/resource-manager.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/resource-manager",permalink:"/docs/guides/operations-guide/openstack/resource-manager",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/resource-manager.md",tags:[],version:"current",sidebarPosition:52,frontMatter:{sidebar_label:"Resource Manager",sidebar_position:52},sidebar:"tutorialSidebar",previous:{title:"Flavor Manager",permalink:"/docs/guides/operations-guide/openstack/flavor-manager"},next:{title:"Project Manager",permalink:"/docs/guides/operations-guide/openstack/project-manager"}},s={},p=[{value:"Octavia",id:"octavia",level:2},{value:"Amphora rotation",id:"amphora-rotation",level:3}];function d(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,n.ah)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.h1,{id:"resource-manager",children:"Resource Manager"}),"\n",(0,a.jsx)(r.h2,{id:"octavia",children:"Octavia"}),"\n",(0,a.jsx)(r.h3,{id:"amphora-rotation",children:"Amphora rotation"}),"\n",(0,a.jsx)(r.p,{children:"Rotation of amphorae older than 30 days."}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{children:"$ python3 src/amphora.py --rotate\n2023-10-12 21:00:38 | INFO     | Amphora 95a07c43-c0f9-44d2-bde8-a989e52427fa is older than 30 days\n2023-10-12 21:00:38 | INFO     | Amphora 95a07c43-c0f9-44d2-bde8-a989e52427fa of loadbalancer 9008d3d7-f593-4bc3-941c-a740c178148d is rotated by a loadbalancer failover\n"})})]})}function u(e={}){const{wrapper:r}={...(0,n.ah)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},3905:(e,r,t)=>{t.d(r,{ah:()=>p});var a=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=a.createContext({}),p=function(e){var r=a.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},d={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),l=p(t),m=n,g=l["".concat(s,".").concat(m)]||l[m]||d[m]||o;return t?a.createElement(g,i(i({ref:r},u),{},{components:t})):a.createElement(g,i({ref:r},u))}));u.displayName="MDXCreateElement"}}]);