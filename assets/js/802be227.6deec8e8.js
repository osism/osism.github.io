"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9276],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>g});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},f="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),f=l(r),p=i,g=f["".concat(c,".").concat(p)]||f[p]||d[p]||o;return r?n.createElement(g,s(s({ref:t},u),{},{components:r})):n.createElement(g,s({ref:t},u))}));function g(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,s=new Array(o);s[0]=p;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a[f]="string"==typeof e?e:i,s[1]=a;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},3807:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var n=r(7462),i=(r(7294),r(3905));const o={sidebar_label:"Self-signed certificates",sidebar_position:100},s="Self-signed certificates",a={unversionedId:"guides/configuration-guides/self-signed-certificates",id:"guides/configuration-guides/self-signed-certificates",title:"Self-signed certificates",description:"OpenStack",source:"@site/docs/guides/configuration-guides/self-signed-certificates.md",sourceDirName:"guides/configuration-guides",slug:"/guides/configuration-guides/self-signed-certificates",permalink:"/docs/guides/configuration-guides/self-signed-certificates",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guides/self-signed-certificates.md",tags:[],version:"current",sidebarPosition:100,frontMatter:{sidebar_label:"Self-signed certificates",sidebar_position:100},sidebar:"tutorialSidebar",previous:{title:"Keystone",permalink:"/docs/guides/configuration-guides/openstack/keystone"},next:{title:"Operations Guides",permalink:"/docs/guides/operations-guide/"}},c={},l=[{value:"OpenStack",id:"openstack",level:2},{value:"Horizon",id:"horizon",level:3}],u={toc:l},f="wrapper";function d(e){let{components:t,...r}=e;return(0,i.kt)(f,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"self-signed-certificates"},"Self-signed certificates"),(0,i.kt)("h2",{id:"openstack"},"OpenStack"),(0,i.kt)("h3",{id:"horizon"},"Horizon"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:'title="environments/kolla/files/overlays/horizon/custom_local_settings"',title:'"environments/kolla/files/overlays/horizon/custom_local_settings"'},"OPENSTACK_SSL_NO_VERIFY = True\n")))}d.isMDXComponent=!0}}]);