"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4931],{3905:(e,n,r)=>{r.d(n,{Zo:()=>l,kt:()=>b});var t=r(7294);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function d(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function a(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=t.createContext({}),s=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):d(d({},n),e)),r},l=function(e){var n=s(e.components);return t.createElement(c.Provider,{value:n},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),u=s(r),m=o,b=u["".concat(c,".").concat(m)]||u[m]||p[m]||i;return r?t.createElement(b,d(d({ref:n},l),{},{components:r})):t.createElement(b,d({ref:n},l))}));function b(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,d=new Array(i);d[0]=m;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a[u]="string"==typeof e?e:o,d[1]=a;for(var s=2;s<i;s++)d[s]=r[s];return t.createElement.apply(null,d)}return t.createElement.apply(null,r)}m.displayName="MDXCreateElement"},9385:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>s});var t=r(7462),o=(r(7294),r(3905));const i={sidebar_label:"Cinder",sidebar_position:20},d="Cinder",a={unversionedId:"guides/operations-guide/openstack/cinder",id:"guides/operations-guide/openstack/cinder",title:"Cinder",description:"Remove service",source:"@site/docs/guides/operations-guide/openstack/cinder.md",sourceDirName:"guides/operations-guide/openstack",slug:"/guides/operations-guide/openstack/cinder",permalink:"/docs/guides/operations-guide/openstack/cinder",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/cinder.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Cinder",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"OpenStack",permalink:"/docs/guides/operations-guide/openstack/"},next:{title:"Image Manager",permalink:"/docs/guides/operations-guide/openstack/image-manager"}},c={},s=[{value:"Remove service",id:"remove-service",level:2}],l={toc:s},u="wrapper";function p(e){let{components:n,...r}=e;return(0,o.kt)(u,(0,t.Z)({},l,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"cinder"},"Cinder"),(0,o.kt)("h2",{id:"remove-service"},"Remove service"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ openstack --os-cloud admin volume service list\n+------------------+-----------------------------------+----------+---------+-------+----------------------------+\n| Binary           | Host                              | Zone     | Status  | State | Updated At                 |\n+------------------+-----------------------------------+----------+---------+-------+----------------------------+\n| cinder-scheduler | testbed-node-0                    | internal | enabled | up    | 2023-10-01T08:53:14.000000 |\n| cinder-scheduler | testbed-node-1                    | internal | enabled | up    | 2023-10-01T08:53:15.000000 |\n| cinder-scheduler | testbed-node-2                    | internal | enabled | up    | 2023-10-01T08:53:15.000000 |\n| cinder-volume    | testbed-node-0@rbd-1              | nova     | enabled | down  | 2023-09-30T18:50:05.000000 |\n| cinder-volume    | testbed-node-2@rbd-1              | nova     | enabled | down  | 2023-09-30T18:50:05.000000 |\n| cinder-volume    | testbed-node-1@rbd-1              | nova     | enabled | down  | 2023-09-30T18:50:08.000000 |\n+------------------+-----------------------------------+----------+---------+-------+----------------------------+\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ docker exec -it cinder_api cinder-manage service remove cinder-volume testbed-node-0@rbd-1\nService cinder-volume on host testbed-node-0@rbd-1 removed.\n$ docker exec -it cinder_api cinder-manage service remove cinder-volume testbed-node-1@rbd-1\nService cinder-volume on host testbed-node-1@rbd-1 removed.\n$ docker exec -it cinder_api cinder-manage service remove cinder-volume testbed-node-2@rbd-1\nService cinder-volume on host testbed-node-2@rbd-1 removed.\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"dragon@mgr001:~$ openstack --os-cloud admin volume service list\n+------------------+-----------------------------------+----------+---------+-------+----------------------------+\n| Binary           | Host                              | Zone     | Status  | State | Updated At                 |\n+------------------+-----------------------------------+----------+---------+-------+----------------------------+\n| cinder-scheduler | testbed-node-0                    | internal | enabled | up    | 2023-10-01T08:56:24.000000 |\n| cinder-scheduler | testbed-node-1                    | internal | enabled | up    | 2023-10-01T08:56:25.000000 |\n| cinder-scheduler | testbed-node-2                    | internal | enabled | up    | 2023-10-01T08:56:25.000000 |\n+------------------+-----------------------------------+----------+---------+-------+----------------------------+\n")))}p.isMDXComponent=!0}}]);