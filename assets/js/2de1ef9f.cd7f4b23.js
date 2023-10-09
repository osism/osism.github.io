"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[184],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>g});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=u(t),f=i,g=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return t?r.createElement(g,a(a({ref:n},l),{},{components:t})):r.createElement(g,a({ref:n},l))}));function g(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=f;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s[d]="string"==typeof e?e:i,a[1]=s;for(var u=2;u<o;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},3053:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=t(7462),i=(t(7294),t(3905));const o={sidebar_label:"Inventory",sidebar_position:4},a="Inventory",s={unversionedId:"guides/configuration-guides/inventory",id:"guides/configuration-guides/inventory",title:"Inventory",description:"The inventory used for the environment is located in the inventory directory.",source:"@site/docs/guides/configuration-guides/inventory.md",sourceDirName:"guides/configuration-guides",slug:"/guides/configuration-guides/inventory",permalink:"/docs/guides/configuration-guides/inventory",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guides/inventory.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_label:"Inventory",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Configuration Guides",permalink:"/docs/guides/configuration-guides/"},next:{title:"Manager",permalink:"/docs/guides/configuration-guides/manager"}},c={},u=[{value:"Manager",id:"manager",level:2}],l={toc:u},d="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"inventory"},"Inventory"),(0,i.kt)("p",null,"The inventory used for the environment is located in the ",(0,i.kt)("inlineCode",{parentName:"p"},"inventory")," directory."),(0,i.kt)("h2",{id:"manager"},"Manager"),(0,i.kt)("p",null,"The manager has his own inventory which is used exclusively for the seed phase of the manager.\nIt is located in the directory ",(0,i.kt)("inlineCode",{parentName:"p"},"environments/manager"),". There is a ",(0,i.kt)("inlineCode",{parentName:"p"},"hosts")," file with only the\nmanager node in it."))}p.isMDXComponent=!0}}]);