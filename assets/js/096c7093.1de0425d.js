"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5834],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>u});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=d(n),g=a,u=p["".concat(l,".").concat(g)]||p[g]||c[g]||i;return n?r.createElement(u,o(o({ref:t},m),{},{components:n})):r.createElement(u,o({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,o[1]=s;for(var d=2;d<i;d++)o[d]=n[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9247:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_label:"SSH Config"},o="SSH Config",s={unversionedId:"guides/configuration-guide/commons/sshconfig",id:"guides/configuration-guide/commons/sshconfig",title:"SSH Config",description:"With the osism.commons.sshconfig role, it is possible to manage a SSH config",source:"@site/docs/guides/configuration-guide/commons/sshconfig.md",sourceDirName:"guides/configuration-guide/commons",slug:"/guides/configuration-guide/commons/sshconfig",permalink:"/docs/guides/configuration-guide/commons/sshconfig",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/commons/sshconfig.md",tags:[],version:"current",frontMatter:{sidebar_label:"SSH Config"},sidebar:"tutorialSidebar",previous:{title:"Services",permalink:"/docs/guides/configuration-guide/commons/services"},next:{title:"Sysctl",permalink:"/docs/guides/configuration-guide/commons/sysctl"}},l={},d=[{value:"Example",id:"example",level:2},{value:"Defaults",id:"defaults",level:2}],m={toc:d},p="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"ssh-config"},"SSH Config"),(0,a.kt)("p",null,"With the ",(0,a.kt)("inlineCode",{parentName:"p"},"osism.commons.sshconfig")," role, it is possible to manage a SSH config\nfile in the home directory of the operator user."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"In the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/osism/testbed"},"testbed"),"\nthe ",(0,a.kt)("inlineCode",{parentName:"p"},"/home/dragon/.ssh/config")," file is created on the manager node ",(0,a.kt)("inlineCode",{parentName:"p"},"testbed-manager"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-none",metastring:'title="Example for an assembled /home/dragon/.ssh/config file"',title:'"Example',for:!0,an:!0,assembled:!0,"/home/dragon/.ssh/config":!0,'file"':!0},"Host testbed-manager\n  HostName testbed-manager.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n\n####################\nHost testbed-node-0\n  HostName testbed-node-0.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n\n####################\nHost testbed-node-1\n  HostName testbed-node-1.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n\n####################\nHost testbed-node-2\n  HostName testbed-node-2.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n")),(0,a.kt)("h2",{id:"defaults"},"Defaults"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Parameter")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Default")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_groupname")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"all")),(0,a.kt)("td",{parentName:"tr",align:null},"All nodes in this group are included.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_order")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"20")),(0,a.kt)("td",{parentName:"tr",align:null},"The ",(0,a.kt)("inlineCode",{parentName:"td"},".ssh/config.d")," directory is used to prepare the ",(0,a.kt)("inlineCode",{parentName:"td"},".ssh/config")," file. You can add your own files in this directory. Everything with a filename prefix smaller than ",(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_order")," is placed at the beginning of the assembled ",(0,a.kt)("inlineCode",{parentName:"td"},".ssh/config")," file. Anything with a filename prefix greater than ",(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_order")," goes at the end.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_port")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"22")),(0,a.kt)("td",{parentName:"tr",align:null},"The SSH port.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_private_key_file")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"/opt/ansible/secrets/id_rsa.operator")),(0,a.kt)("td",{parentName:"tr",align:null},"The identity file to use. The file itself must already exist there. The file is created by the ",(0,a.kt)("inlineCode",{parentName:"td"},"osism.services.manager")," role.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"sshconfig_user")),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},'"{{ operator_user }}"')),(0,a.kt)("td",{parentName:"tr",align:null},"The user in which home directory the ",(0,a.kt)("inlineCode",{parentName:"td"},".ssh/config")," file will be generated.")))))}c.isMDXComponent=!0}}]);