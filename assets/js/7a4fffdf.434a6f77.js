"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1172],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2545:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_label:"Introduction",sidebar_position:1},a="Introduction",s={unversionedId:"intro/index",id:"intro/index",title:"Introduction",description:"This documentation is currently under construction and is not yet complete.",source:"@site/docs/intro/index.md",sourceDirName:"intro",slug:"/intro/",permalink:"/docs/intro/",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/intro/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_label:"Introduction",sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Architecture",permalink:"/docs/intro/architecture"}},l={},c=[{value:"OSISM Bare-metal",id:"osism-bare-metal",level:2},{value:"OSISM Ceph",id:"osism-ceph",level:2},{value:"OSISM Kubernetes",id:"osism-kubernetes",level:2},{value:"OSISM Kubernetes as a Service",id:"osism-kubernetes-as-a-service",level:2},{value:"OSISM Logging, Monitoring &amp; Telemetry",id:"osism-logging-monitoring--telemetry",level:2},{value:"OSISM OpenStack",id:"osism-openstack",level:2},{value:"OSISM SONiC",id:"osism-sonic",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...i}=e;return(0,o.kt)(p,(0,r.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"introduction"},"Introduction"),(0,o.kt)("admonition",{type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"This documentation is currently under construction and is not yet complete.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"OSISM landing",src:n(7957).Z,width:"561",height:"531"})),(0,o.kt)("p",null,"OSISM is developing a solution for the holistic management of sustainable, sovereign\nsoftware-defined cloud infrastructures."),(0,o.kt)("p",null,"OSISM is used by the ",(0,o.kt)("a",{parentName:"p",href:"https://scs.community/"},"Sovereign Cloud Stack")," (SCS) to manage\nthe core infrastructure services."),(0,o.kt)("p",null,"As the basis for ",(0,o.kt)("a",{parentName:"p",href:"https://www.plusserver.com/produkte/pluscloud-open"},"pluscloud open")," from\nthe German-based cloud service provider ",(0,o.kt)("a",{parentName:"p",href:"https://www.plusserver.com"},"PlusServer")," in Cologne,\nOSISM is an integral part of one of the first ",(0,o.kt)("a",{parentName:"p",href:"https://www.gaia-x.eu"},"Gaia-X")," compatible hosters."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.wavecon.de/de/"},"Wavecon"),", owned by ",(0,o.kt)("a",{parentName:"p",href:"https://www.noris.de"},"noris network AG"),",\nalso relies on OSISM to set up and operate a completely open, standardised sovereign public\ncloud: the ",(0,o.kt)("a",{parentName:"p",href:"https://www.noris.de/wavestack-cloud"},"Wavestack"),"."),(0,o.kt)("p",null,"We enable fast, easy and consistent management and provisioning of compute, storage and\nnetwork resources to run cloud-native applications."),(0,o.kt)("p",null,"Our solution provides a solid and stable base for the deployment, operation and lifecycle\nmanagement of on-premise cloud infrastructures, for public cloud data centres and, at the edge,\nfor distributed systems. OSISM is also suitable for building supercomputers and HPC\nenvironments."),(0,o.kt)("h2",{id:"osism-bare-metal"},"OSISM Bare-metal"),(0,o.kt)("h2",{id:"osism-ceph"},"OSISM Ceph"),(0,o.kt)("h2",{id:"osism-kubernetes"},"OSISM Kubernetes"),(0,o.kt)("h2",{id:"osism-kubernetes-as-a-service"},"OSISM Kubernetes as a Service"),(0,o.kt)("h2",{id:"osism-logging-monitoring--telemetry"},"OSISM Logging, Monitoring & Telemetry"),(0,o.kt)("h2",{id:"osism-openstack"},"OSISM OpenStack"),(0,o.kt)("h2",{id:"osism-sonic"},"OSISM SONiC"))}d.isMDXComponent=!0},7957:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/landing.drawio-525fefcb45ec71dacb578d183d886082.png"}}]);