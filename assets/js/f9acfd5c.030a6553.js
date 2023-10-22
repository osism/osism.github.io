"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4418],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=s(n),m=o,y=u["".concat(p,".").concat(m)]||u[m]||d[m]||a;return n?r.createElement(y,i(i({ref:t},c),{},{components:n})):r.createElement(y,i({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5851:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_label:"OpenStack",sidebar_position:30},i="OpenStack",l={unversionedId:"guides/deploy-guide/openstack",id:"guides/deploy-guide/openstack",title:"OpenStack",description:"Common issues with deploying OpenStack services are documented in the",source:"@site/docs/guides/deploy-guide/openstack.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/openstack",permalink:"/docs/guides/deploy-guide/openstack",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/openstack.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_label:"OpenStack",sidebar_position:30},sidebar:"tutorialSidebar",previous:{title:"Ceph",permalink:"/docs/guides/deploy-guide/ceph"},next:{title:"Logging & Monitoring",permalink:"/docs/guides/deploy-guide/logging-monitoring"}},p={},s=[{value:"Keystone",id:"keystone",level:2},{value:"Glance",id:"glance",level:2},{value:"Designate",id:"designate",level:2},{value:"Placement",id:"placement",level:2},{value:"Cinder",id:"cinder",level:2},{value:"Neutron",id:"neutron",level:2},{value:"Nova",id:"nova",level:2},{value:"Octavia",id:"octavia",level:2},{value:"Horizon",id:"horizon",level:2}],c={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"openstack"},"OpenStack"),(0,o.kt)("p",null,"Common issues with deploying OpenStack services are documented in the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/guides/troubleshooting-guides/openstack"},"OpenStack Troubleshooting Guide"),"."),(0,o.kt)("h2",{id:"keystone"},"Keystone"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull keystone\nosism apply keystone\n")),(0,o.kt)("h2",{id:"glance"},"Glance"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull glance\nosism apply glance\n")),(0,o.kt)("h2",{id:"designate"},"Designate"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull designate\nosism apply designate\n")),(0,o.kt)("h2",{id:"placement"},"Placement"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull placement\nosism apply placement\n")),(0,o.kt)("h2",{id:"cinder"},"Cinder"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull cinder\nosism apply cinder\n")),(0,o.kt)("h2",{id:"neutron"},"Neutron"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull neutron\nosism apply neutron\n")),(0,o.kt)("h2",{id:"nova"},"Nova"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull nova\nosism apply nova\n")),(0,o.kt)("h2",{id:"octavia"},"Octavia"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull octavia\nosism apply octavia\n")),(0,o.kt)("h2",{id:"horizon"},"Horizon"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"osism apply -a pull horizon\nosism apply horizon\n")))}d.isMDXComponent=!0}}]);