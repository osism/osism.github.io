"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8730],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var d=n.createContext({}),l=function(e){var t=n.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(d.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,d=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(r),y=i,f=p["".concat(d,".").concat(y)]||p[y]||c[y]||o;return r?n.createElement(f,a(a({ref:t},u),{},{components:r})):n.createElement(f,a({ref:t},u))}));function f(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=y;var s={};for(var d in t)hasOwnProperty.call(t,d)&&(s[d]=t[d]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},9307:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(7462),i=(r(7294),r(3905));const o={sidebar_label:"Deploy Guide",sidebar_position:10},a="Deploy Guide",s={unversionedId:"guides/deploy-guide/index",id:"guides/deploy-guide/index",title:"Deploy Guide",description:"\ud83d\udca1 The Deploy Guide describe how to deploy individual nodes and services.",source:"@site/docs/guides/deploy-guide/index.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/",permalink:"/docs/guides/deploy-guide/",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/index.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Deploy Guide",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Guides",permalink:"/docs/guides/"},next:{title:"Seed",permalink:"/docs/guides/deploy-guide/seed"}},d={},l=[],u={toc:l},p="wrapper";function c(e){let{components:t,...r}=e;return(0,i.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"deploy-guide"},"Deploy Guide"),(0,i.kt)("p",null,"\ud83d\udca1 The Deploy Guide describe how to deploy individual nodes and services."),(0,i.kt)("p",null,"A classification is made for services. For example, all infrastructure services\nsuch as RabbitMQ or MariaDB are covered in the Infrastructure Guide."),(0,i.kt)("p",null,"The Manager Node is treated specially because it must be treated differently when\nbuilding a new machine."),(0,i.kt)("p",null,"Before deploying services to nodes, they must all be bootstrapped. This is covered\nin the Bootstrap Guide."),(0,i.kt)("p",null,"The guide always assume that a node is already initially accessible via SSH and only\nneeds to be bootstrapped and integrated into the machine. Deploying bare-metal nodes\nwith an operating system is not part of the Deploy Guides and is covered in the\nAdvanced Guides."),(0,i.kt)("p",null,"In the examples, the pull of images (if supported by a role) is always run first. While\nthis is optional, it is recommended to speed up the execution of the deploy action in\nthe second step. This significantly reduces the times required for the restart from a\nservice."))}c.isMDXComponent=!0}}]);