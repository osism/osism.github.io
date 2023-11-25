"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1336],{7964:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var s=n(5893),r=n(3905);const t={sidebar_label:"Scripts",sidebar_position:20},o="Scripts",c={id:"guides/other-guides/developer-guide/scripts",title:"Scripts",description:"Scripts are included in container images to simplify",source:"@site/docs/guides/other-guides/developer-guide/scripts.md",sourceDirName:"guides/other-guides/developer-guide",slug:"/guides/other-guides/developer-guide/scripts",permalink:"/docs/guides/other-guides/developer-guide/scripts",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/other-guides/developer-guide/scripts.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Scripts",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Releases",permalink:"/docs/guides/other-guides/developer-guide/releases"},next:{title:"Zuul Ci",permalink:"/docs/guides/other-guides/developer-guide/zuul-ci"}},a={},l=[{value:"change-osism.sh",id:"change-osismsh",level:2},{value:"change.sh",id:"changesh",level:2}];function d(e){const i={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.ah)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"scripts",children:"Scripts"}),"\n",(0,s.jsx)(i.p,{children:"Scripts are included in container images to simplify\ndevelopment work and to enable testing and hotfixes in running\nenvironments.\nWhat scripts are available and how to use them is described in\nthis section."}),"\n",(0,s.jsx)(i.h2,{id:"change-osismsh",children:"change-osism.sh"}),"\n",(0,s.jsxs)(i.p,{children:["With the ",(0,s.jsx)(i.code,{children:"change-osism.sh"})," script it is possible to bring the\n",(0,s.jsx)(i.a,{href:"https://pypi.org/project/osism/",children:"Python package osism"})," to a\ndevelopment state from the\n",(0,s.jsx)(i.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"}),"\nrepository."]}),"\n",(0,s.jsxs)(i.p,{children:["Here, the script is used in the running inventory reconciler\nservice to install the branch ",(0,s.jsx)(i.code,{children:"main"})," of\n",(0,s.jsx)(i.a,{href:"https://github.com/osism/python-osism",children:"osism/python-osism"}),".\nInstead of ",(0,s.jsx)(i.code,{children:"main"}),", any branch can be used."]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{children:"docker exec -u root -it manager-inventory_reconciler-1 /change-osism.sh main\n"})}),"\n",(0,s.jsx)(i.p,{children:"It is important to restart the container afterwards."}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{children:"docker restart manager-inventory_reconciler-1\n"})}),"\n",(0,s.jsx)(i.p,{children:"The script is included in the following container images:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsx)(i.li,{children:"osism/ceph-ansible (used by the service ceph-ansible)"}),"\n",(0,s.jsx)(i.li,{children:"osism/inventory-reconciler (used by the service manager-inventory_reconciler-1)"}),"\n",(0,s.jsx)(i.li,{children:"osism/kolla-ansible (used by the service kolla-ansible)"}),"\n",(0,s.jsx)(i.li,{children:"osism/osism-ansible (used by the service osism-ansible)"}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"changesh",children:"change.sh"}),"\n",(0,s.jsxs)(i.p,{children:["The ",(0,s.jsx)(i.code,{children:"change.sh"})," script is used to bring the main core of an image\nto a certain state."]}),"\n",(0,s.jsxs)(i.p,{children:["In all containers that use the ",(0,s.jsx)(i.a,{href:"https://quay.io/repository/osism/osism",children:"osism image"}),",\nsuch as ",(0,s.jsx)(i.code,{children:"osismclient"}),", the behavior of this script is identical to the behavior of\n",(0,s.jsx)(i.code,{children:"change-osism.sh"})," script as described before."]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{children:"docker exec -u root -it osismclient /change.sh main\n"})})]})}function h(e={}){const{wrapper:i}={...(0,r.ah)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},3905:(e,i,n)=>{n.d(i,{ah:()=>l});var s=n(7294);function r(e,i,n){return i in e?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,e}function t(e,i){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);i&&(s=s.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),n.push.apply(n,s)}return n}function o(e){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?t(Object(n),!0).forEach((function(i){r(e,i,n[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):t(Object(n)).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))}))}return e}function c(e,i){if(null==e)return{};var n,s,r=function(e,i){if(null==e)return{};var n,s,r={},t=Object.keys(e);for(s=0;s<t.length;s++)n=t[s],i.indexOf(n)>=0||(r[n]=e[n]);return r}(e,i);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);for(s=0;s<t.length;s++)n=t[s],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var a=s.createContext({}),l=function(e){var i=s.useContext(a),n=i;return e&&(n="function"==typeof e?e(i):o(o({},i),e)),n},d={inlineCode:"code",wrapper:function(e){var i=e.children;return s.createElement(s.Fragment,{},i)}},h=s.forwardRef((function(e,i){var n=e.components,r=e.mdxType,t=e.originalType,a=e.parentName,h=c(e,["components","mdxType","originalType","parentName"]),p=l(n),u=r,m=p["".concat(a,".").concat(u)]||p[u]||d[u]||t;return n?s.createElement(m,o(o({ref:i},h),{},{components:n})):s.createElement(m,o({ref:i},h))}));h.displayName="MDXCreateElement"}}]);