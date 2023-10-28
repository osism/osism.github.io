"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4035],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,g=c["".concat(l,".").concat(m)]||c[m]||d[m]||i;return n?a.createElement(g,o(o({ref:t},u),{},{components:n})):a.createElement(g,o({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[c]="string"==typeof e?e:r,o[1]=p;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3097:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_label:"OpenStack",sidebar_position:40},o="OpenStack",p={unversionedId:"guides/upgrade-guides/openstack",id:"guides/upgrade-guides/openstack",title:"OpenStack",description:"Keystone",source:"@site/docs/guides/upgrade-guides/openstack.md",sourceDirName:"guides/upgrade-guides",slug:"/guides/upgrade-guides/openstack",permalink:"/docs/guides/upgrade-guides/openstack",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guides/openstack.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"OpenStack",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Logging & Monitoring",permalink:"/docs/guides/upgrade-guides/logging-monitoring"},next:{title:"Configuration Guides",permalink:"/docs/guides/configuration-guides/"}},l={},s=[{value:"Keystone",id:"keystone",level:2},{value:"Glance",id:"glance",level:2},{value:"Designate",id:"designate",level:2},{value:"Placement",id:"placement",level:2},{value:"Cinder",id:"cinder",level:2},{value:"Neutron",id:"neutron",level:2},{value:"Nova",id:"nova",level:2},{value:"Octavia",id:"octavia",level:2},{value:"Amphora image update",id:"amphora-image-update",level:3},{value:"Amphora rotation",id:"amphora-rotation",level:3},{value:"Horizon",id:"horizon",level:2},{value:"OpenStack client",id:"openstack-client",level:2}],u={toc:s},c="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"openstack"},"OpenStack"),(0,r.kt)("h2",{id:"keystone"},"Keystone"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull keystone\nosism apply -a upgrade keystone\n")),(0,r.kt)("h2",{id:"glance"},"Glance"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull glance\nosism apply -a rolling-upgrade glance\n")),(0,r.kt)("h2",{id:"designate"},"Designate"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull designate\nosism apply -a upgrade designate\n")),(0,r.kt)("h2",{id:"placement"},"Placement"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull placement\nosism apply -a upgrade placement\n")),(0,r.kt)("h2",{id:"cinder"},"Cinder"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull cinder\nosism apply -a upgrade cinder\n")),(0,r.kt)("h2",{id:"neutron"},"Neutron"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull neutron\nosism apply -a rolling-upgrade neutron\n")),(0,r.kt)("h2",{id:"nova"},"Nova"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull nova\nosism apply -a rolling-upgrade nova\n")),(0,r.kt)("h2",{id:"octavia"},"Octavia"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull octavia\nosism apply -a upgrade octavia\n")),(0,r.kt)("h3",{id:"amphora-image-update"},"Amphora image update"),(0,r.kt)("p",null,"This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,\nthis step is not necessary."),(0,r.kt)("h3",{id:"amphora-rotation"},"Amphora rotation"),(0,r.kt)("p",null,"This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,\nthis step is not necessary."),(0,r.kt)("h2",{id:"horizon"},"Horizon"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply -a pull horizon\nosism apply -a upgrade horizon\n")),(0,r.kt)("h2",{id:"openstack-client"},"OpenStack client"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"osism apply openstackclient\n")))}d.isMDXComponent=!0}}]);