"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5378],{5956:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>h});var s=r(5893),i=r(1151),t=r(4866),l=r(5162);const o={sidebar_label:"Ceph",sidebar_position:50},c="Ceph",a={id:"guides/deploy-guide/services/ceph",title:"Ceph",description:"Before starting the Ceph deployment, the configuration and creation of the necessary LVM2",source:"@site/docs/guides/deploy-guide/services/ceph.mdx",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/ceph",permalink:"/de/docs/guides/deploy-guide/services/ceph",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/ceph.mdx",tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_label:"Ceph",sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Logging & Monitoring",permalink:"/de/docs/guides/deploy-guide/services/logging-monitoring"},next:{title:"OpenStack",permalink:"/de/docs/guides/deploy-guide/services/openstack"}},d={},h=[{value:"RGW service",id:"rgw-service",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"ceph",children:"Ceph"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsxs)(n.p,{children:["Before starting the Ceph deployment, the configuration and creation of the necessary LVM2\nvolumes must be completed. The steps that are required for this can be found in the\n",(0,s.jsx)(n.a,{href:"../../configuration-guide/ceph#lvm-devices",children:"Ceph Configuration Guide"}),"."]})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Deploy services."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Deploy ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/quincy/man/8/ceph-mon/",children:"ceph-mon"})," services"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-mons\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Deploy ceph-mgr services"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-mgrs\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Deploy ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/quincy/man/8/ceph-osd/",children:"ceph-osd"})," services"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-osds\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Generate pools and keys. This step is only necessary for OSISM >= 7.0.0."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-pools\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Deploy ceph-crash services"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-crash\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsx)(n.p,{children:"It's all done step by step here. It is also possible to do this in a single step.\nThis speeds up the entire process and avoids unnecessary restarts of individual\nservices."}),(0,s.jsxs)(t.Z,{children:[(0,s.jsxs)(l.Z,{value:"osism-7",label:"OSISM >= 7.0.0",children:[(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph\n"})}),(0,s.jsx)(n.p,{children:"Generate pools and keys."}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-pools\n"})})]}),(0,s.jsx)(l.Z,{value:"osism-6",label:"OSISM < 7.0.0",children:(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-base\n"})})})]})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Get ceph keys. This places the necessary keys in ",(0,s.jsx)(n.code,{children:"/opt/configuration"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply copy-ceph-keys\n"})}),"\n",(0,s.jsx)(n.p,{children:"After run, these keys must be permanently added to the configuration repository\nvia Git."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring\nenvironments/kolla/files/overlays/gnocchi/ceph.client.gnocchi.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.nova.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder-backup.keyring\nenvironments/kolla/files/overlays/cinder/cinder-volume/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/manila/ceph.client.manila.keyring\nenvironments/kolla/files/overlays/glance/ceph.client.glance.keyring\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"osism apply copy-ceph-keys"})," fails because the keys are not found in the ",(0,s.jsx)(n.code,{children:"/share"}),"\ndirectory, this can be ignored. The keys of the predefined keys (e.g. for Manila) were\nthen not created as they are not used. If you only use Ceph and do not need the predefined\nkeys for OpenStack at all, you can also overwrite the ",(0,s.jsx)(n.code,{children:"ceph_kolla_keys"})," parameter to skip\nthese keys."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',children:"ceph_kolla_keys: []\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"After the Ceph keys have been persisted in the configuration repository, the Ceph\nclient can be deployed."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply cephclient\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Enable and prepare the use of the Ceph dashboard."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-bootstrap-dashboard\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"rgw-service",children:"RGW service"}),"\n",(0,s.jsx)(n.p,{children:"Deployment of the Ceph RGW Service is optional. How the Ceph RGW service can be deployed\nand integrated into OpenStack is described here."}),"\n",(0,s.jsxs)(n.admonition,{type:"info",children:[(0,s.jsxs)(n.p,{children:["If an initial deployment is performed and Ceph RGW is not added to an existing deployment,\nsteps 4 and 5 are ",(0,s.jsx)(n.strong,{children:"not"})," required."]}),(0,s.jsxs)(n.p,{children:["Step 3 is then performed ",(0,s.jsx)(n.strong,{children:"later after"})," the OpenStack Keystone service has been deployed."]})]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"./../../configuration-guide/ceph#rgw-service",children:"Configure the RGW service"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"ceph-rgws"})," to deploy the Ceph RGW services."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-rgws\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"kolla-ceph-rgw"})," to add the OpenStack endpoint."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply kolla-ceph-rgw\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"loadbalancer"})," to add the HAProxy backend and frontend."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply loadbalancer\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"horizon"})," to enable the Swift dashboard."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply horizon\n"})}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},5162:(e,n,r)=>{r.d(n,{Z:()=>l});r(7294);var s=r(6905);const i={tabItem:"tabItem_Ymn6"};var t=r(5893);function l(e){let{children:n,hidden:r,className:l}=e;return(0,t.jsx)("div",{role:"tabpanel",className:(0,s.Z)(i.tabItem,l),hidden:r,children:n})}},4866:(e,n,r)=>{r.d(n,{Z:()=>k});var s=r(7294),i=r(6905),t=r(2466),l=r(6550),o=r(469),c=r(1980),a=r(7392),d=r(12);function h(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:r}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:r,attributes:s,default:i}}=e;return{value:n,label:r,attributes:s,default:i}}))}(r);return function(e){const n=(0,a.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function u(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const i=(0,l.k6)(),t=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,c._X)(t),(0,s.useCallback)((e=>{if(!t)return;const n=new URLSearchParams(i.location.search);n.set(t,e),i.replace({...i.location,search:n.toString()})}),[t,i])]}function y(e){const{defaultValue:n,queryString:r=!1,groupId:i}=e,t=p(e),[l,c]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!u({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=r.find((e=>e.default))??r[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:t}))),[a,h]=m({queryString:r,groupId:i}),[y,f]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,t]=(0,d.Nk)(r);return[i,(0,s.useCallback)((e=>{r&&t.set(e)}),[r,t])]}({groupId:i}),x=(()=>{const e=a??y;return u({value:e,tabValues:t})?e:null})();(0,o.Z)((()=>{x&&c(x)}),[x]);return{selectedValue:l,selectValue:(0,s.useCallback)((e=>{if(!u({value:e,tabValues:t}))throw new Error(`Can't select invalid tab value=${e}`);c(e),h(e),f(e)}),[h,f,t]),tabValues:t}}var f=r(2389);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=r(5893);function g(e){let{className:n,block:r,selectedValue:s,selectValue:l,tabValues:o}=e;const c=[],{blockElementScrollPositionUntilNextRender:a}=(0,t.o5)(),d=e=>{const n=e.currentTarget,r=c.indexOf(n),i=o[r].value;i!==s&&(a(n),l(i))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=c.indexOf(e.currentTarget)+1;n=c[r]??c[0];break}case"ArrowLeft":{const r=c.indexOf(e.currentTarget)-1;n=c[r]??c[c.length-1];break}}n?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":r},n),children:o.map((e=>{let{value:n,label:r,attributes:t}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>c.push(e),onKeyDown:h,onClick:d,...t,className:(0,i.Z)("tabs__item",x.tabItem,t?.className,{"tabs__item--active":s===n}),children:r??n},n)}))})}function v(e){let{lazy:n,children:r,selectedValue:i}=e;const t=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=t.find((e=>e.props.value===i));return e?(0,s.cloneElement)(e,{className:"margin-top--md"}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:t.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function b(e){const n=y(e);return(0,j.jsxs)("div",{className:(0,i.Z)("tabs-container",x.tabList),children:[(0,j.jsx)(g,{...e,...n}),(0,j.jsx)(v,{...e,...n})]})}function k(e){const n=(0,f.Z)();return(0,j.jsx)(b,{...e,children:h(e.children)},String(n))}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>l});var s=r(7294);const i={},t=s.createContext(i);function l(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);