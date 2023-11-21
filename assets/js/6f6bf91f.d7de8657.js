"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9654],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),b=o,f=p["".concat(l,".").concat(b)]||p[b]||d[b]||a;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=b;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},8081:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_label:"OpenStack",sidebar_position:40},i="OpenStack",s={unversionedId:"guides/troubleshooting-guide/openstack",id:"guides/troubleshooting-guide/openstack",title:"OpenStack",description:"Database creation fails",source:"@site/docs/guides/troubleshooting-guide/openstack.md",sourceDirName:"guides/troubleshooting-guide",slug:"/guides/troubleshooting-guide/openstack",permalink:"/docs/guides/troubleshooting-guide/openstack",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/troubleshooting-guide/openstack.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"OpenStack",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Manager",permalink:"/docs/guides/troubleshooting-guide/manager"},next:{title:"Advanced Guides",permalink:"/docs/advanced-guides/"}},l={},c=[{value:"Database creation fails",id:"database-creation-fails",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"openstack"},"OpenStack"),(0,o.kt)("h2",{id:"database-creation-fails"},"Database creation fails"),(0,o.kt)("p",null,"Problem:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"TASK [keystone : Creating keystone database] ***********************************\nfatal: [testbed-node-0]: FAILED! => changed=false\n  action: mysql_db\n  msg: 'unable to find /var/lib/ansible/.my.cnf. Exception message: (2003, \"Can''t connect to MySQL server on ''api-int.local'' ([Errno 111] Connection refused)\")'\n")),(0,o.kt)("p",null,"Solution:"),(0,o.kt)("p",null,"Restart the ",(0,o.kt)("inlineCode",{parentName:"p"},"kolla_toolbox")," container. in this case on the node ",(0,o.kt)("inlineCode",{parentName:"p"},"testbed-node-0"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ osism console testbed-node-0/\ntestbed-node-0>>> restart kolla_toolbox\nkolla_toolbox\ntestbed-node-0>>>\n")))}d.isMDXComponent=!0}}]);