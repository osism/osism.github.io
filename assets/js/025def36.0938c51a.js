"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2854],{3905:(t,e,n)=>{n.d(e,{Zo:()=>p,kt:()=>g});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},l=Object.keys(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var s=r.createContext({}),m=function(t){var e=r.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},p=function(t){var e=m(t.components);return r.createElement(s.Provider,{value:e},t.children)},u="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,l=t.originalType,s=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),u=m(n),d=a,g=u["".concat(s,".").concat(d)]||u[d]||c[d]||l;return n?r.createElement(g,i(i({ref:e},p),{},{components:n})):r.createElement(g,i({ref:e},p))}));function g(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[u]="string"==typeof t?t:a,i[1]=o;for(var m=2;m<l;m++)i[m]=n[m];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4337:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const l={sidebar_label:"Sysctl"},i="Sysctl",o={unversionedId:"guides/configuration-guides/commons/sysctl",id:"guides/configuration-guides/commons/sysctl",title:"Sysctl",description:"With the osism.commons.sysctl role, it is possible to manage the attributes of the kernel",source:"@site/docs/guides/configuration-guides/commons/sysctl.md",sourceDirName:"guides/configuration-guides/commons",slug:"/guides/configuration-guides/commons/sysctl",permalink:"/docs/guides/configuration-guides/commons/sysctl",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guides/commons/sysctl.md",tags:[],version:"current",frontMatter:{sidebar_label:"Sysctl"},sidebar:"tutorialSidebar",previous:{title:"SSH Config",permalink:"/docs/guides/configuration-guides/commons/sshconfig"},next:{title:"Timezone",permalink:"/docs/guides/configuration-guides/commons/timezone"}},s={},m=[],p={toc:m},u="wrapper";function c(t){let{components:e,...n}=t;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"sysctl"},"Sysctl"),(0,a.kt)("p",null,"With the ",(0,a.kt)("inlineCode",{parentName:"p"},"osism.commons.sysctl")," role, it is possible to manage the attributes of the kernel\nvia ",(0,a.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Sysctl"},"sysctl")," on a node."),(0,a.kt)("p",null,"The following defaults are set via the parameter ",(0,a.kt)("inlineCode",{parentName:"p"},"sysctl_defaults"),"."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Group")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Attribute")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Default")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"elasticsearch"),(0,a.kt)("td",{parentName:"tr",align:null},"vm.max_map_count"),(0,a.kt)("td",{parentName:"tr",align:null},"262144")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_keepalive_time"),(0,a.kt)("td",{parentName:"tr",align:null},"6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_keepalive_intvl"),(0,a.kt)("td",{parentName:"tr",align:null},"3")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_keepalive_probes"),(0,a.kt)("td",{parentName:"tr",align:null},"3")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.core.wmem_max"),(0,a.kt)("td",{parentName:"tr",align:null},"16777216")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.core.rmem_max"),(0,a.kt)("td",{parentName:"tr",align:null},"16777216")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_fin_timeout"),(0,a.kt)("td",{parentName:"tr",align:null},"20")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_tw_reuse"),(0,a.kt)("td",{parentName:"tr",align:null},"1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.core.somaxconn"),(0,a.kt)("td",{parentName:"tr",align:null},"4096")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_syncookies"),(0,a.kt)("td",{parentName:"tr",align:null},"0")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"rabbitmq"),(0,a.kt)("td",{parentName:"tr",align:null},"net.ipv4.tcp_max_syn_backlog"),(0,a.kt)("td",{parentName:"tr",align:null},"8192")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"generic"),(0,a.kt)("td",{parentName:"tr",align:null},"vm.swappiness"),(0,a.kt)("td",{parentName:"tr",align:null},"1")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"compute"),(0,a.kt)("td",{parentName:"tr",align:null},"net.netfilter.nf_conntrack_max"),(0,a.kt)("td",{parentName:"tr",align:null},"1048576")))),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"sysctl_extra")," parameter can be used to set your own parameters or overwrite existing\nparameters in the defaults."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",256:!0,className:"language-yaml",metastring:'title="Set attribute fs.inotify.max_user_instances to 256 for all nodes in group generic"',title:'"Set',attribute:!0,"fs.inotify.max_user_instances":!0,to:!0,for:!0,all:!0,nodes:!0,in:!0,group:!0,'generic"':!0},"sysctl_extra:\n  generic:\n    - name: fs.inotify.max_user_instances\n      value: 256\n")))}c.isMDXComponent=!0}}]);