"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8019],{3905:(e,r,t)=>{t.d(r,{Zo:()=>s,kt:()=>f});var n=t(7294);function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,i=function(e,r){if(null==e)return{};var t,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(i[t]=e[t]);return i}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=n.createContext({}),u=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},s=function(e){var r=u(e.components);return n.createElement(c.Provider,{value:r},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},g=n.forwardRef((function(e,r){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),l=u(t),g=i,f=l["".concat(c,".").concat(g)]||l[g]||d[g]||o;return t?n.createElement(f,a(a({ref:r},s),{},{components:t})):n.createElement(f,a({ref:r},s))}));function f(e,r){var t=arguments,i=r&&r.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=g;var p={};for(var c in r)hasOwnProperty.call(r,c)&&(p[c]=r[c]);p.originalType=e,p[l]="string"==typeof e?e:i,a[1]=p;for(var u=2;u<o;u++)a[u]=t[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}g.displayName="MDXCreateElement"},3896:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>u});var n=t(7462),i=(t(7294),t(3905));const o={sidebar_label:"Ceph",sidebar_position:20},a="Ceph",p={unversionedId:"guides/upgrade-guide/ceph",id:"guides/upgrade-guide/ceph",title:"Ceph",description:"",source:"@site/docs/guides/upgrade-guide/ceph.md",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/ceph",permalink:"/docs/guides/upgrade-guide/ceph",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/ceph.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Ceph",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/docs/guides/upgrade-guide/network"},next:{title:"Docker",permalink:"/docs/guides/upgrade-guide/docker"}},c={},u=[],s={toc:u},l="wrapper";function d(e){let{components:r,...t}=e;return(0,i.kt)(l,(0,n.Z)({},s,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"ceph"},"Ceph"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"osism apply ceph-rolling_update -e ireallymeanit=yes\nosism apply cephclient\n")))}d.isMDXComponent=!0}}]);