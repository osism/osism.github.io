"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6737],{3905:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>f});var n=t(7294);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=n.createContext({}),c=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=c(e.components);return n.createElement(s.Provider,{value:r},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},g=n.forwardRef((function(e,r){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),l=c(t),g=i,f=l["".concat(s,".").concat(g)]||l[g]||d[g]||o;return t?n.createElement(f,a(a({ref:r},u),{},{components:t})):n.createElement(f,a({ref:r},u))}));function f(e,r){var t=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=g;var p={};for(var s in r)hasOwnProperty.call(r,s)&&(p[s]=r[s]);p.originalType=e,p[l]="string"==typeof e?e:i,a[1]=p;for(var c=2;c<o;c++)a[c]=t[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}g.displayName="MDXCreateElement"},8899:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var n=t(7462),i=(t(7294),t(3905));const o={sidebar_label:"Ceph",sidebar_position:20},a="Ceph",p={unversionedId:"guides/upgrade-guides/ceph",id:"guides/upgrade-guides/ceph",title:"Ceph",description:"",source:"@site/docs/guides/upgrade-guides/ceph.md",sourceDirName:"guides/upgrade-guides",slug:"/guides/upgrade-guides/ceph",permalink:"/docs/guides/upgrade-guides/ceph",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guides/ceph.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Ceph",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/docs/guides/upgrade-guides/network"},next:{title:"Docker",permalink:"/docs/guides/upgrade-guides/docker"}},s={},c=[],u={toc:c},l="wrapper";function d(e){let{components:r,...t}=e;return(0,i.kt)(l,(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"ceph"},"Ceph"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"osism apply ceph-rolling_update -e ireallymeanit=yes\nosism apply cephclient\n")))}d.isMDXComponent=!0}}]);