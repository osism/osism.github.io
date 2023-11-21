"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9246],{3905:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>g});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=n.createContext({}),s=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},u=function(e){var r=s(e.components);return n.createElement(p.Provider,{value:r},e.children)},l="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),l=s(t),f=o,g=l["".concat(p,".").concat(f)]||l[f]||d[f]||i;return t?n.createElement(g,a(a({ref:r},u),{},{components:t})):n.createElement(g,a({ref:r},u))}));function g(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=f;var c={};for(var p in r)hasOwnProperty.call(r,p)&&(c[p]=r[p]);c.originalType=e,c[l]="string"==typeof e?e:o,a[1]=c;for(var s=2;s<i;s++)a[s]=t[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},7002:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var n=t(7462),o=(t(7294),t(3905));const i={sidebar_label:"Proxy",sidebar_position:99},a="Proxy",c={unversionedId:"guides/configuration-guide/proxy",id:"guides/configuration-guide/proxy",title:"Proxy",description:"",source:"@site/docs/guides/configuration-guide/proxy.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/proxy",permalink:"/docs/guides/configuration-guide/proxy",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/proxy.md",tags:[],version:"current",sidebarPosition:99,frontMatter:{sidebar_label:"Proxy",sidebar_position:99},sidebar:"tutorialSidebar",previous:{title:"Keystone",permalink:"/docs/guides/configuration-guide/openstack/keystone"},next:{title:"Self-signed certificates",permalink:"/docs/guides/configuration-guide/self-signed-certificates"}},p={},s=[],u={toc:s},l="wrapper";function d(e){let{components:r,...t}=e;return(0,o.kt)(l,(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"proxy"},"Proxy"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'##########################################################\n# proxy\n\ndocker_configure_proxy: true\ndocker_proxy_http: "http://{{ groups[\'manager\'][0] }}:3128"\ndocker_proxy_https: "{{ docker_proxy_http }}"\n\nproxy_proxies:\n  http: "http://{{ groups[\'manager\'][0] }}:3128"\n  https: "http://{{ groups[\'manager\'][0] }}:3128"\n')))}d.isMDXComponent=!0}}]);