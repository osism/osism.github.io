"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3189],{6788:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=r(5893),i=r(1151);r(4866),r(5162);const o={sidebar_label:"Ceph via Rook (technical preview)",sidebar_position:51},s="Ceph via Rook (technical preview)",a={id:"guides/deploy-guide/services/rook",title:"Ceph via Rook (technical preview)",description:"This is a technical preview and not recommended for production use yet.",source:"@site/docs/guides/deploy-guide/services/rook.md",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/rook",permalink:"/docs/guides/deploy-guide/services/rook",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/rook.md",tags:[],version:"current",sidebarPosition:51,frontMatter:{sidebar_label:"Ceph via Rook (technical preview)",sidebar_position:51},sidebar:"tutorialSidebar",previous:{title:"Ceph",permalink:"/docs/guides/deploy-guide/services/ceph"},next:{title:"OpenStack",permalink:"/docs/guides/deploy-guide/services/openstack"}},l={},c=[{value:"RGW service",id:"rgw-service",level:2},{value:"Cleanup",id:"cleanup",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"ceph-via-rook-technical-preview",children:"Ceph via Rook (technical preview)"})}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsx)(n.p,{children:"This is a technical preview and not recommended for production use yet."})}),"\n",(0,t.jsxs)(n.p,{children:["In OSISM it is also possible to integrate and use existing Ceph clusters. It\nis not necessary to deploy Ceph with OSISM. If Ceph is deployed with OSISM, it\nshould be noted that OSISM does not claim to provide all possible features of Ceph.\nCeph provided with OSISM is intended to provide the storage for Glance, Nova, Cinder\nand Manila. In a specific way that has been implemented by OSISM for years. It\nshould be checked in advance whether the way in OSISM the Ceph deployment and the\nprovided features are sufficient. If this is not the case, it is recommended to\ndeploy Ceph in a different way directly and independently of OSISM. For possible\nopen source projects, please refer to\n",(0,t.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/cephadm/index.html",children:"cephadm"})," and\n",(0,t.jsx)(n.a,{href:"https://rook.io",children:"Rook"}),"."]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Deploy services."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["When using rook, all services are deployed via a single helm chart and at the same time. This could be altered by passing custom CRDs. See ",(0,t.jsx)(n.a,{href:"../../configuration-guide/rook",children:"Rook Configuration Guide"}),"."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Install ",(0,t.jsx)(n.a,{href:"/docs/guides/deploy-guide/services/kubernetes",children:"Kubernetes Cluster"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Deploy ",(0,t.jsx)(n.a,{href:"https://rook.io/docs/rook/latest/Helm-Charts/operator-chart/",children:"Rook Operator Helm Chart"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply rook-operator\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Deploy complete Rook Ceph Cluster"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply rook\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Copy ceph keyrings to kolla directories (if deploying OpenStack)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply rook-fetch-keys\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.ol,{start:"2",children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Get ceph keyrings. This places the necessary keys in ",(0,t.jsx)(n.code,{children:"/opt/configuration"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply rook-fetch-keys\n"})}),"\n",(0,t.jsx)(n.p,{children:"After run, these keys must be permanently added to the configuration repository\nvia Git."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring\nenvironments/kolla/files/overlays/gnocchi/ceph.client.gnocchi.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.nova.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder-backup.keyring\nenvironments/kolla/files/overlays/cinder/cinder-volume/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/manila/ceph.client.manila.keyring\nenvironments/kolla/files/overlays/glance/ceph.client.glance.keyring\n"})}),"\n",(0,t.jsxs)(n.p,{children:["You can also overwrite the ",(0,t.jsx)(n.code,{children:"rook_cephclients"})," parameter to skip\nthese keys."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_cephclients: {}\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"A Ceph client (a wrapper on the manager for entering the rook toolbox) can be deployed."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply cephclient\n"})}),"\n",(0,t.jsxs)(n.p,{children:["You have to make sure the correct ",(0,t.jsx)(n.a,{href:"/docs/guides/configuration-guide/rook#client",children:"Configuration Options for the Rook Ceph Client Wrapper"})," are net."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["After getting the Ceph Keyrings, the ",(0,t.jsx)(n.a,{href:"/docs/guides/deploy-guide/services/openstack",children:"OpenStack Deployment"})," can optionally be done."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"rgw-service",children:"RGW service"}),"\n",(0,t.jsxs)(n.p,{children:["Deployment of the Ceph RGW Service is enabled by default in rook. This is done by creating a default ",(0,t.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Object-Storage/ceph-object-store-crd/",children:"CephObjectStore CRD"}),". How the Ceph RGW service can be deployed and integrated into OpenStack is described here."]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["OpenStack integration between Keystone/Swift and Rook is currently missing upstream in Rook. Please have a look at ",(0,t.jsx)(n.a,{href:"https://github.com/orgs/SovereignCloudStack/projects/18/views/1?layout=board&pane=issue&itemId=63889060",children:"#1027"})," to get the current status of the integration in OSISM."]})}),"\n",(0,t.jsx)(n.h2,{id:"cleanup",children:"Cleanup"}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsx)(n.p,{children:"This will permanently delete all your data in the Ceph Cluster. Be sure you know what you are doing before proceeding."})}),"\n",(0,t.jsxs)(n.p,{children:["If you want to cleanup/delete the whole cluster, you can do that by enabling ",(0,t.jsx)(n.code,{children:"rook_cleanup"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_cleanup: true\n"})}),"\n",(0,t.jsxs)(n.p,{children:["And running the ",(0,t.jsx)(n.code,{children:"rook-cleanup"})," role."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply rook-cleanup\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},5162:(e,n,r)=>{r.d(n,{Z:()=>s});r(7294);var t=r(6905);const i={tabItem:"tabItem_Ymn6"};var o=r(5893);function s(e){let{children:n,hidden:r,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,t.Z)(i.tabItem,s),hidden:r,children:n})}},4866:(e,n,r)=>{r.d(n,{Z:()=>j});var t=r(7294),i=r(6905),o=r(2466),s=r(6550),a=r(469),l=r(1980),c=r(7392),d=r(812);function u(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:i}}=e;return{value:n,label:r,attributes:t,default:i}}))}(r);return function(e){const n=(0,c.lx)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function p(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const i=(0,s.k6)(),o=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,l._X)(o),(0,t.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(i.location.search);n.set(o,e),i.replace({...i.location,search:n.toString()})}),[o,i])]}function f(e){const{defaultValue:n,queryString:r=!1,groupId:i}=e,o=h(e),[s,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:o}))),[c,u]=m({queryString:r,groupId:i}),[f,v]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,o]=(0,d.Nk)(r);return[i,(0,t.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:i}),g=(()=>{const e=c??f;return p({value:e,tabValues:o})?e:null})();(0,a.Z)((()=>{g&&l(g)}),[g]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),v(e)}),[u,v,o]),tabValues:o}}var v=r(2389);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=r(5893);function b(e){let{className:n,block:r,selectedValue:t,selectValue:s,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),d=e=>{const n=e.currentTarget,r=l.indexOf(n),i=a[r].value;i!==t&&(c(n),s(i))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;n=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;n=l[r]??l[l.length-1];break}}n?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":r},n),children:a.map((e=>{let{value:n,label:r,attributes:o}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:u,onClick:d,...o,className:(0,i.Z)("tabs__item",g.tabItem,o?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function k(e){let{lazy:n,children:r,selectedValue:o}=e;const s=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===o));return e?(0,t.cloneElement)(e,{className:(0,i.Z)("margin-top--md",e.props.className)}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function x(e){const n=f(e);return(0,y.jsxs)("div",{className:(0,i.Z)("tabs-container",g.tabList),children:[(0,y.jsx)(b,{...n,...e}),(0,y.jsx)(k,{...n,...e})]})}function j(e){const n=(0,v.Z)();return(0,y.jsx)(x,{...e,children:u(e.children)},String(n))}},1151:(e,n,r)=>{r.d(n,{Z:()=>a,a:()=>s});var t=r(7294);const i={},o=t.createContext(i);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);