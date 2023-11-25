"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3394],{8093:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=n(5893),i=n(3905);const o={sidebar_label:"Infrastructure",sidebar_position:10},s="Infrastructure",a={id:"guides/deploy-guide/services/infrastructure",title:"Infrastructure",description:"Common issues with deploying infrastructure services required by OpenStack",source:"@site/docs/guides/deploy-guide/services/infrastructure.md",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/infrastructure",permalink:"/docs/guides/deploy-guide/services/infrastructure",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/infrastructure.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Infrastructure",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Services",permalink:"/docs/guides/deploy-guide/services/"},next:{title:"Network",permalink:"/docs/guides/deploy-guide/services/network"}},l={},c=[{value:"Cron, Fluentd &amp; Kolla Toolbox",id:"cron-fluentd--kolla-toolbox",level:2},{value:"Loadbalancer",id:"loadbalancer",level:2},{value:"Redis",id:"redis",level:2},{value:"Memcached",id:"memcached",level:2},{value:"RabbitMQ",id:"rabbitmq",level:2},{value:"MariaDB",id:"mariadb",level:2}];function d(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.ah)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"infrastructure",children:"Infrastructure"}),"\n",(0,t.jsxs)(r.p,{children:["Common issues with deploying infrastructure services required by OpenStack\nare documented in the ",(0,t.jsx)(r.a,{href:"../../troubleshooting-guide/openstack",children:"OpenStack Troubleshooting Guide"}),"."]}),"\n",(0,t.jsx)(r.h2,{id:"cron-fluentd--kolla-toolbox",children:"Cron, Fluentd & Kolla Toolbox"}),"\n",(0,t.jsxs)(r.p,{children:["The common role of Kolla is used to manage the services ",(0,t.jsx)(r.code,{children:"cron"}),", ",(0,t.jsx)(r.code,{children:"fluentd"}),"\nand ",(0,t.jsx)(r.code,{children:"kolla-toolbox"}),"."]}),"\n",(0,t.jsxs)(r.p,{children:["It is important to do this deployment before any other deployements in the Kolla\nenvironment, as parts of the other deployments depend on the ",(0,t.jsx)(r.code,{children:"kolla-toolbox"}),"\nservice."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"osism apply -a pull common\nosism apply common\n"})}),"\n",(0,t.jsx)(r.h2,{id:"loadbalancer",children:"Loadbalancer"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"osism apply -a pull loadbalancer\nosism apply loadbalancer\n"})}),"\n",(0,t.jsx)(r.h2,{id:"redis",children:"Redis"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"osism apply -a pull redis\nosism apply redis\n"})}),"\n",(0,t.jsx)(r.h2,{id:"memcached",children:"Memcached"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"osism apply -a pull memcached\nosism apply memcached\n"})}),"\n",(0,t.jsx)(r.h2,{id:"rabbitmq",children:"RabbitMQ"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"osism apply -a pull rabbitmq\nosism apply rabbitmq\n"})}),"\n",(0,t.jsx)(r.h2,{id:"mariadb",children:"MariaDB"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{children:"osism apply -a pull mariadb\nosism apply mariadb\n"})})]})}function u(e={}){const{wrapper:r}={...(0,i.ah)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},3905:(e,r,n)=>{n.d(r,{ah:()=>c});var t=n(7294);function i(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){i(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function a(e,r){if(null==e)return{};var n,t,i=function(e,r){if(null==e)return{};var n,t,i={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(i[n]=e[n]);return i}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=t.createContext({}),c=function(e){var r=t.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):s(s({},r),e)),n},d={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},u=t.forwardRef((function(e,r){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,h=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return n?t.createElement(h,s(s({ref:r},u),{},{components:n})):t.createElement(h,s({ref:r},u))}));u.displayName="MDXCreateElement"}}]);