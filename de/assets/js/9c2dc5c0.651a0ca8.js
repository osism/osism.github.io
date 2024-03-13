"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5846],{916:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>t});var s=i(5893),r=i(1151);const o={sidebar_label:"Ceph",sidebar_position:50},c="Ceph",l={id:"guides/deploy-guide/services/ceph",title:"Ceph",description:"Before starting the Ceph deployment, the configuration and creation of the necessary LVM2",source:"@site/docs/guides/deploy-guide/services/ceph.md",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/ceph",permalink:"/de/docs/guides/deploy-guide/services/ceph",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/ceph.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_label:"Ceph",sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Logging & Monitoring",permalink:"/de/docs/guides/deploy-guide/services/logging-monitoring"},next:{title:"OpenStack",permalink:"/de/docs/guides/deploy-guide/services/openstack"}},d={},t=[{value:"RGW service",id:"rgw-service",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"ceph",children:"Ceph"}),"\n",(0,s.jsxs)(n.p,{children:["Before starting the Ceph deployment, the configuration and creation of the necessary LVM2\nvolumes must be completed. The steps that are required for this can be found in the\n",(0,s.jsx)(n.a,{href:"../../configuration-guide/ceph#lvm-devices",children:"Ceph Configuration Guide"}),"."]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Deploy base services."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-mons\nosism apply ceph-mgrs\nosism apply ceph-osds\nosism apply ceph-crash\n"})}),"\n",(0,s.jsx)(n.p,{children:"It's all done here step by step. It is also possible to do this in a single step:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-base\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Get ceph keys. This places the necessary keys in ",(0,s.jsx)(n.code,{children:"/opt/configuration"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply copy-ceph-keys\n"})}),"\n",(0,s.jsx)(n.p,{children:"After run, these keys must be permanently added to the configuration repository\nvia Git."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring\nenvironments/kolla/files/overlays/gnocchi/ceph.client.gnocchi.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/nova/ceph.client.nova.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder-backup.keyring\nenvironments/kolla/files/overlays/cinder/cinder-volume/ceph.client.cinder.keyring\nenvironments/kolla/files/overlays/manila/ceph.client.manila.keyring\nenvironments/kolla/files/overlays/glance/ceph.client.glance.keyring\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If the ",(0,s.jsx)(n.code,{children:"osism apply copy-ceph-keys"})," fails and the keys are not found in the ",(0,s.jsx)(n.code,{children:"/share"}),"\ndirectory, this can be solved with ",(0,s.jsx)(n.code,{children:"osism apply ceph-fetch-keys"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"After the Ceph keys have been persisted in the configuration repository, the Ceph\nclient can be deployed."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply cephclient\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Enable and prepare the use of the Ceph dashboard."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-bootstrap-dashboard\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"rgw-service",children:"RGW service"}),"\n",(0,s.jsx)(n.p,{children:"Deployment of the Ceph RGW Service is optional. How the Ceph RGW service can be deployed\nand integrated into OpenStack is described here."}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["If an initial deployment is performed and Ceph RGW is not added to an existing deployment,\nsteps 4 and 5 are ",(0,s.jsx)(n.strong,{children:"not"})," required. Step 3 is then performed ",(0,s.jsx)(n.strong,{children:"later"})," after the OpenStack\nKeystone service has been deployed."]})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"./../../configuration-guide/ceph#rgw-service",children:"Configure the RGW service"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"ceph-rgws"})," to deploy the Ceph RGW services."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply ceph-rgws\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"kolla-ceph-rgw"})," to add the OpenStack endpoint."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply kolla-ceph-rgw\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"loadbalancer"})," to add the HAProxy backend and frontend."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply loadbalancer\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Apply role ",(0,s.jsx)(n.code,{children:"horizon"})," to enable the Swift dashboard."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply horizon\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>c});var s=i(7294);const r={},o=s.createContext(r);function c(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);