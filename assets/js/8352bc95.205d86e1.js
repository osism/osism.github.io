"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3980],{2417:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>l});var i=r(5893),t=r(3905);const s={sidebar_label:"Ceph",sidebar_position:40},o="Ceph",c={id:"guides/configuration-guide/ceph",title:"Ceph",description:"Unique Identifier",source:"@site/docs/guides/configuration-guide/ceph.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/ceph",permalink:"/docs/guides/configuration-guide/ceph",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/ceph.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Ceph",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Services",permalink:"/docs/guides/configuration-guide/services/"},next:{title:"OpenStack",permalink:"/docs/guides/configuration-guide/openstack/"}},a={},l=[{value:"Unique Identifier",id:"unique-identifier",level:2},{value:"Client",id:"client",level:2},{value:"Swappiness",id:"swappiness",level:2},{value:"RGW service",id:"rgw-service",level:2},{value:"Extra pools",id:"extra-pools",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.ah)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"ceph",children:"Ceph"}),"\n",(0,i.jsx)(n.h2,{id:"unique-identifier",children:"Unique Identifier"}),"\n",(0,i.jsxs)(n.p,{children:["The File System ID is a unique identifier for the cluster.\nThe identifier is set via the parameter ",(0,i.jsx)(n.code,{children:"fsid"})," in ",(0,i.jsx)(n.code,{children:"environments/ceph/configuration.yml"}),"\nand must be unique. It can be generated with ",(0,i.jsx)(n.code,{children:"uuidgen"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',children:"fsid: c2120a4a-669c-4769-a32c-b7e9d7b848f4\n"})}),"\n",(0,i.jsx)(n.h2,{id:"client",children:"Client"}),"\n",(0,i.jsxs)(n.p,{children:["In order to use the Ceph client on the manager node, the IP addresses of the Ceph\nmonitor services, usually they run on the Ceph control plane, are added in\n",(0,i.jsx)(n.code,{children:"environments/infrastructure/configuration.yml"})," first."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/infrastructure/configuration.yml"',children:"##########################\n# cephclient\n\ncephclient_mons:\n  - 192.168.16.10\n  - 192.168.16.11\n  - 192.168.16.12\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"client.admin"})," keyring is placed in the file ",(0,i.jsx)(n.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"swappiness",children:"Swappiness"}),"\n",(0,i.jsxs)(n.p,{children:["The swappiness is set via the ",(0,i.jsx)(n.code,{children:"os_tuning_params"})," dictionary. The dictionary can\nonly be completely overwritten via an entry in the file ",(0,i.jsx)(n.code,{children:"environments/ceph/configuration.yml"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"By default, the dictionary looks like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'os_tuning_params:\n  - { name: fs.file-max, value: 26234859 }\n  - { name: vm.zone_reclaim_mode, value: 0 }\n  - { name: vm.swappiness, value: 10 }\n  - { name: vm.min_free_kbytes, value: "{{ vm_min_free_kbytes }}" }\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The sysctl paremeters are written to the file ",(0,i.jsx)(n.code,{children:"/etc/sysctl.d/ceph-tuning.conf"}),"\non the storage nodes."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"# cat /etc/sysctl.d/ceph-tuning.conf\nfs.aio-max-nr=1048576\nfs.file-max=26234859\nvm.zone_reclaim_mode=0\nvm.swappiness=10\nvm.min_free_kbytes=4194303\n"})}),"\n",(0,i.jsx)(n.h2,{id:"rgw-service",children:"RGW service"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add following configuration in ",(0,i.jsx)(n.code,{children:"environments/ceph/configuration.yml"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'ceph_conf_overrides:\n  "client.rgw.{{ hostvars[inventory_hostname][\'ansible_hostname\'] }}.rgw0":\n    "rgw content length compat": "true"\n    "rgw enable apis": "swift, s3, admin"\n    "rgw keystone accepted roles": "member, admin"\n    "rgw keystone accepted admin roles": "admin"\n    "rgw keystone admin domain": "default"\n    "rgw keystone admin password": "{{ ceph_rgw_keystone_password }}"\n    "rgw keystone admin project": "service"\n    "rgw keystone admin tenant": "service"\n    "rgw keystone admin user": "ceph_rgw"\n    "rgw keystone api version": "3"\n    "rgw keystone url": "https://api-int.testbed.osism.xyz:5000"\n    "rgw keystone verify ssl": "false"\n    "rgw keystone implicit tenants": "true"\n    "rgw s3 auth use keystone": "true"\n    "rgw swift account in url": "true"\n    "rgw swift versioning enabled": "true"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.code,{children:"ceph_conf_overrides"})," parameter already exists in ",(0,i.jsx)(n.code,{children:"environments/ceph/configuration.yml"}),",\nexpand it and do not overwrite it."]}),"\n",(0,i.jsx)(n.p,{children:"If self-signed SSL certificates are used, two additional parameters must be set."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:' "rgw keystone verify ssl": "false"\n "rgw verify ssl": "false"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["For all possible configuration parameters visit the\n",(0,i.jsx)(n.a,{href:"https://docs.ceph.com/en/quincy/radosgw/config-ref/",children:"Ceph configuration reference"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add the ",(0,i.jsx)(n.code,{children:"ceph_rgw_keystone_password"})," from ",(0,i.jsx)(n.code,{children:"environments/kolla/secrets.yml"})," to\n",(0,i.jsx)(n.code,{children:"environments/ceph/secrets.yml"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Add following configuration in ",(0,i.jsx)(n.code,{children:"environments/kolla/configuration.yml"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"enable_ceph_rgw: true\nenable_ceph_rgw_keystone: true\n\nceph_rgw_swift_compatibility: false\nceph_rgw_swift_account_in_url: true\n\nceph_rgw_hosts:\n  - host: testbed-node-0\n    ip: 192.168.16.10\n    port: 8081\n  - host: testbed-node-1\n    ip: 192.168.16.11\n    port: 8081\n  - host: testbed-node-2\n    ip: 192.168.16.12\n    port: 8081\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"extra-pools",children:"Extra pools"}),"\n",(0,i.jsxs)(n.p,{children:["Extra pools can be defined via the ",(0,i.jsx)(n.code,{children:"openstack_pools_extra"})," parameter."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/group_vars/generic/ceph.yml"',children:'openstack_cinder_extra001_pool:\n  name: extra001\n  pg_num: "{{ openstack_pool_default_pg_num }}"\n  pgp_num: "{{ openstack_pool_default_pg_num }}"\n  rule_name: "replicated_rule"\n  min_size: "{{ openstack_pool_default_min_size }}"\n  application: "rbd"\n\nopenstack_pools_extra:\n  - "{{ openstack_cinder_extra001_pool }}"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["If more than one Ceph cluster is managed with one manager, do not place the\nparameters in ",(0,i.jsx)(n.code,{children:"inventory/group_vars/generic"})," but in a corresponding directory."]}),"\n",(0,i.jsxs)(n.p,{children:["If, for example, the inventory group of the Ceph cluster on which the additional\npools are to be created is ",(0,i.jsx)(n.code,{children:"ceph.rbd"}),", then the parameters would be stored in\n",(0,i.jsx)(n.code,{children:"inventory/group_vars/ceph.rbd.yml"})," accordingly."]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Parameter"}),(0,i.jsx)(n.th,{children:"Default value"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"openstack_pool_default_pg_num"}),(0,i.jsx)(n.td,{children:"64"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"openstack_pool_default_min_size"}),(0,i.jsx)(n.td,{children:"0"})]})]})]})]})}function p(e={}){const{wrapper:n}={...(0,t.ah)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},3905:(e,n,r)=>{r.d(n,{ah:()=>l});var i=r(7294);function t(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function s(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?s(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function c(e,n){if(null==e)return{};var r,i,t=function(e,n){if(null==e)return{};var r,i,t={},s=Object.keys(e);for(i=0;i<s.length;i++)r=s[i],n.indexOf(r)>=0||(t[r]=e[r]);return t}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)r=s[i],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var a=i.createContext({}),l=function(e){var n=i.useContext(a),r=n;return e&&(r="function"==typeof e?e(n):o(o({},n),e)),r},d={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},p=i.forwardRef((function(e,n){var r=e.components,t=e.mdxType,s=e.originalType,a=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),h=l(r),u=t,m=h["".concat(a,".").concat(u)]||h[u]||d[u]||s;return r?i.createElement(m,o(o({ref:n},p),{},{components:r})):i.createElement(m,o({ref:n},p))}));p.displayName="MDXCreateElement"}}]);