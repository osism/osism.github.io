"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8081],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var m=r.createContext({}),s=function(e){var t=r.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(m.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,m=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=o,g=u["".concat(m,".").concat(d)]||u[d]||p[d]||i;return n?r.createElement(g,a(a({ref:t},c),{},{components:n})):r.createElement(g,a({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var m in t)hasOwnProperty.call(t,m)&&(l[m]=t[m]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var s=2;s<i;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1447:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_label:"Timezone"},a="Timezone",l={unversionedId:"guides/configuration-guides/commons/timezone",id:"guides/configuration-guides/commons/timezone",title:"Timezone",description:"With the osism.commons.timezone role, it is possible to manage the used timezone on a node.",source:"@site/docs/guides/configuration-guides/commons/timezone.md",sourceDirName:"guides/configuration-guides/commons",slug:"/guides/configuration-guides/commons/timezone",permalink:"/docs/guides/configuration-guides/commons/timezone",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guides/commons/timezone.md",tags:[],version:"current",frontMatter:{sidebar_label:"Timezone"},sidebar:"tutorialSidebar",previous:{title:"SSH Config",permalink:"/docs/guides/configuration-guides/commons/sshconfig"},next:{title:"Ceph",permalink:"/docs/guides/configuration-guides/ceph"}},m={},s=[],c={toc:s},u="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"timezone"},"Timezone"),(0,o.kt)("p",null,"With the ",(0,o.kt)("inlineCode",{parentName:"p"},"osism.commons.timezone")," role, it is possible to manage the used timezone on a node."),(0,o.kt)("p",null,"This role is just a wrapper for the ",(0,o.kt)("a",{parentName:"p",href:"https://docs.ansible.com/ansible/latest/collections/community/general/timezone_module.html"},"community.general.timezone"),"\nmodule. The role also installs the ",(0,o.kt)("inlineCode",{parentName:"p"},"tzdata")," package."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"th"},"Parameter")),(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"th"},"Default")),(0,o.kt)("th",{parentName:"tr",align:null},(0,o.kt)("strong",{parentName:"th"},"Description")))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"timezone_hwclock")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"UTC")),(0,o.kt)("td",{parentName:"tr",align:null},"Whether the hardware clock is in UTC or in local timezone.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"timezone_name")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"UTC")),(0,o.kt)("td",{parentName:"tr",align:null},"Name of the timezone for the system clock.")))))}p.isMDXComponent=!0}}]);