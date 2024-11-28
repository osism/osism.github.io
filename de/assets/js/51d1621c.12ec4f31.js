"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3189],{6788:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var o=r(5893),t=r(1151);r(4866),r(5162);const s={sidebar_label:"Ceph via Rook (technical preview)",sidebar_position:51},i="Ceph via Rook (technical preview)",l={id:"guides/deploy-guide/services/rook",title:"Ceph via Rook (technical preview)",description:"This is a technical preview and not recommended for production use yet.",source:"@site/docs/guides/deploy-guide/services/rook.md",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/rook",permalink:"/de/docs/guides/deploy-guide/services/rook",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/rook.md",tags:[],version:"current",sidebarPosition:51,frontMatter:{sidebar_label:"Ceph via Rook (technical preview)",sidebar_position:51},sidebar:"tutorialSidebar",previous:{title:"Ceph",permalink:"/de/docs/guides/deploy-guide/services/ceph"},next:{title:"OpenStack",permalink:"/de/docs/guides/deploy-guide/services/openstack"}},a={},c=[{value:"RGW service",id:"rgw-service",level:2},{value:"Change node labels",id:"change-node-labels",level:2},{value:"Cleanup",id:"cleanup",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"ceph-via-rook-technical-preview",children:"Ceph via Rook (technical preview)"})}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"This is a technical preview and not recommended for production use yet."})}),"\n",(0,o.jsxs)(n.p,{children:["In OSISM it is also possible to integrate and use existing Ceph clusters. It\nis not necessary to deploy Ceph with OSISM. If Ceph is deployed with OSISM, it\nshould be noted that OSISM does not claim to provide all possible features of Ceph.\nCeph provided with OSISM is intended to provide the storage for Glance, Nova, Cinder\nand Manila. In a specific way that has been implemented by OSISM for years. It\nshould be checked in advance whether the way in OSISM the Ceph deployment and the\nprovided features are sufficient. If this is not the case, it is recommended to\ndeploy Ceph in a different way directly and independently of OSISM. For possible\nopen source projects, please refer to\n",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/cephadm/index.html",children:"cephadm"})," and\n",(0,o.jsx)(n.a,{href:"https://rook.io",children:"Rook"}),"."]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Deploy services."}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["When using rook, all services are deployed via a single helm chart and at the same time. This could be altered by passing custom CRDs. See ",(0,o.jsx)(n.a,{href:"../../configuration-guide/rook",children:"Rook Configuration Guide"}),"."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Install ",(0,o.jsx)(n.a,{href:"/de/docs/guides/deploy-guide/services/kubernetes",children:"Kubernetes Cluster"})]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Deploy ",(0,o.jsx)(n.a,{href:"https://rook.io/docs/rook/latest/Helm-Charts/operator-chart/",children:"Rook Operator Helm Chart"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply rook-operator\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Deploy complete Rook Ceph Cluster"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply rook\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Copy ceph keyrings to kolla directories (if deploying OpenStack)"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply rook-fetch-keys\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Get ceph keyrings. This places the necessary keys in ",(0,o.jsx)(n.code,{children:"/opt/configuration"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply rook-fetch-keys\n"})}),"\n",(0,o.jsx)(n.p,{children:"After run, these keys must be permanently added to the configuration repository\nvia Git."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring\nenvironments/kolla/files/overlays/gnocchi/ceph.client.gnocchi.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.nova.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder-backup.keyring\nenvironments/kolla/files/overlays/cinder/cinder-volume/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/manila/ceph.client.manila.keyring\nenvironments/kolla/files/overlays/glance/ceph.client.glance.keyring\n"})}),"\n",(0,o.jsxs)(n.p,{children:["You can also overwrite the ",(0,o.jsx)(n.code,{children:"rook_cephclients"})," parameter to skip\nthese keys."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_cephclients: {}\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"A Ceph client (a wrapper on the manager for entering the rook toolbox) can be deployed."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply cephclient\n"})}),"\n",(0,o.jsxs)(n.p,{children:["You have to make sure the correct ",(0,o.jsx)(n.a,{href:"/de/docs/guides/configuration-guide/rook#client",children:"Configuration Options for the Rook Ceph Client Wrapper"})," are net."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["After getting the Ceph Keyrings, the ",(0,o.jsx)(n.a,{href:"/de/docs/guides/deploy-guide/services/openstack",children:"OpenStack Deployment"})," can optionally be done."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"rgw-service",children:"RGW service"}),"\n",(0,o.jsxs)(n.p,{children:["Deployment of the Ceph RGW Service is enabled by default in rook. This is done by creating a default ",(0,o.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Object-Storage/ceph-object-store-crd/",children:"CephObjectStore CRD"}),". How the Ceph RGW service can be deployed and integrated into OpenStack is described here."]}),"\n",(0,o.jsxs)(n.p,{children:["In the ",(0,o.jsx)(n.code,{children:"environments/rook/configuration.yml"})," file you have to adapt accordingly to your environment at least like shown below:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_cephconfig:\n  client.rgw.rgw.a:\n    rgw_keystone_verify_ssl: "false"\n    rgw_verify_ssl: "false"\n## keystone\nrook_cephobjectstore_keystone_acceptedRoles:\n  - admin\n  - member\nrook_cephobjectstore_keystone_implicitTenants: "true"\nrook_cephobjectstore_keystone_url: "https://api-int.testbed.osism.xyz:5000"\nrook_cephobjectstore_swift_urlPrefix: "swift"\n## keystone user\nrook_cephobjectstore_keystone_auth_type: "password"\nrook_cephobjectstore_keystone_project_domain_name: "Default"\nrook_cephobjectstore_keystone_project_name: "service"\nrook_cephobjectstore_keystone_user_domain_name: "Default"\nrook_cephobjectstore_keystone_username: "ceph_rgw"\n'})}),"\n",(0,o.jsxs)(n.p,{children:["As well as in the ",(0,o.jsx)(n.code,{children:"environments/rook/secrets.yml"})," file:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/rook/secrets.yml"',children:"rook_cephobjectstore_keystone_passwor: supersecretpassword\n"})}),"\n",(0,o.jsx)(n.h2,{id:"change-node-labels",children:"Change node labels"}),"\n",(0,o.jsx)(n.p,{children:"In case you decided to move workloads to different nodes and changed the inventory groups e.g. like this:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ini",metastring:'title="inventory/20-roles"',children:"[rook-mds:children]\nceph-control\n\n[rook-mgr:children]\nceph-control\n\n[rook-mon:children]\nceph-control\n\n[rook-osd:children]\nceph-resource\n\n[rook-rgw:children]\nceph-control\n"})}),"\n",(0,o.jsx)(n.p,{children:"You can apply the changes running:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"osism apply rook-change-labels\n"})}),"\n",(0,o.jsx)(n.p,{children:"This will remove all labels and apply the changed inventory groups as labels. After those steps are done it will trigger the rescheduling of the components so they get deployed on the adjusted nodes."}),"\n",(0,o.jsx)(n.h2,{id:"cleanup",children:"Cleanup"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"This will permanently delete all your data in the Ceph Cluster. Be sure you know what you are doing before proceeding."})}),"\n",(0,o.jsxs)(n.p,{children:["If you want to cleanup/delete the whole cluster, you can do that by enabling ",(0,o.jsx)(n.code,{children:"rook_cleanup"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_cleanup: true\n"})}),"\n",(0,o.jsxs)(n.p,{children:["And running the ",(0,o.jsx)(n.code,{children:"rook-cleanup"})," role."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"osism apply rook-cleanup\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},5162:(e,n,r)=>{r.d(n,{Z:()=>i});r(7294);var o=r(6905);const t={tabItem:"tabItem_Ymn6"};var s=r(5893);function i(e){let{children:n,hidden:r,className:i}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,o.Z)(t.tabItem,i),hidden:r,children:n})}},4866:(e,n,r)=>{r.d(n,{Z:()=>x});var o=r(7294),t=r(6905),s=r(2466),i=r(6550),l=r(469),a=r(1980),c=r(7392),d=r(812);function h(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:r}=e;return(0,o.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:r,attributes:o,default:t}}=e;return{value:n,label:r,attributes:o,default:t}}))}(r);return function(e){const n=(0,c.lx)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function p(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const t=(0,i.k6)(),s=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,a._X)(s),(0,o.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(t.location.search);n.set(s,e),t.replace({...t.location,search:n.toString()})}),[s,t])]}function g(e){const{defaultValue:n,queryString:r=!1,groupId:t}=e,s=u(e),[i,a]=(0,o.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const o=r.find((e=>e.default))??r[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:n,tabValues:s}))),[c,h]=m({queryString:r,groupId:t}),[g,y]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[t,s]=(0,d.Nk)(r);return[t,(0,o.useCallback)((e=>{r&&s.set(e)}),[r,s])]}({groupId:t}),f=(()=>{const e=c??g;return p({value:e,tabValues:s})?e:null})();(0,l.Z)((()=>{f&&a(f)}),[f]);return{selectedValue:i,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);a(e),h(e),y(e)}),[h,y,s]),tabValues:s}}var y=r(2389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var k=r(5893);function v(e){let{className:n,block:r,selectedValue:o,selectValue:i,tabValues:l}=e;const a=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.o5)(),d=e=>{const n=e.currentTarget,r=a.indexOf(n),t=l[r].value;t!==o&&(c(n),i(t))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=a.indexOf(e.currentTarget)+1;n=a[r]??a[0];break}case"ArrowLeft":{const r=a.indexOf(e.currentTarget)-1;n=a[r]??a[a.length-1];break}}n?.focus()};return(0,k.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,t.Z)("tabs",{"tabs--block":r},n),children:l.map((e=>{let{value:n,label:r,attributes:s}=e;return(0,k.jsx)("li",{role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,ref:e=>a.push(e),onKeyDown:h,onClick:d,...s,className:(0,t.Z)("tabs__item",f.tabItem,s?.className,{"tabs__item--active":o===n}),children:r??n},n)}))})}function b(e){let{lazy:n,children:r,selectedValue:s}=e;const i=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=i.find((e=>e.props.value===s));return e?(0,o.cloneElement)(e,{className:(0,t.Z)("margin-top--md",e.props.className)}):null}return(0,k.jsx)("div",{className:"margin-top--md",children:i.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function j(e){const n=g(e);return(0,k.jsxs)("div",{className:(0,t.Z)("tabs-container",f.tabList),children:[(0,k.jsx)(v,{...n,...e}),(0,k.jsx)(b,{...n,...e})]})}function x(e){const n=(0,y.Z)();return(0,k.jsx)(j,{...e,children:h(e.children)},String(n))}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>i});var o=r(7294);const t={},s=o.createContext(t);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);