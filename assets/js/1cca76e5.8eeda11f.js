"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2874],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>g});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(t),d=a,g=m["".concat(p,".").concat(d)]||m[d]||u[d]||i;return t?r.createElement(g,o(o({ref:n},c),{},{components:t})):r.createElement(g,o({ref:n},c))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[m]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1695:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=t(7462),a=(t(7294),t(3905));const i={sidebar_label:"Ceph",sidebar_position:10},o="Ceph",l={unversionedId:"guides/configuration-guides/ceph",id:"guides/configuration-guides/ceph",title:"Ceph",description:"Unique Identifier",source:"@site/docs/guides/configuration-guides/ceph.md",sourceDirName:"guides/configuration-guides",slug:"/guides/configuration-guides/ceph",permalink:"/docs/guides/configuration-guides/ceph",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guides/ceph.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Ceph",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Manager",permalink:"/docs/guides/configuration-guides/manager"},next:{title:"OpenStack",permalink:"/docs/guides/configuration-guides/openstack/"}},p={},s=[{value:"Unique Identifier",id:"unique-identifier",level:2},{value:"Client",id:"client",level:2},{value:"Swappiness",id:"swappiness",level:2},{value:"RGW service",id:"rgw-service",level:2},{value:"Extra pools",id:"extra-pools",level:2}],c={toc:s},m="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"ceph"},"Ceph"),(0,a.kt)("h2",{id:"unique-identifier"},"Unique Identifier"),(0,a.kt)("p",null,"The File System ID is a unique identifier for the cluster.\nThe identifier is set via the parameter ",(0,a.kt)("inlineCode",{parentName:"p"},"fsid")," in ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/ceph/configuration.yml"),"\nand must be unique. It can be generated with ",(0,a.kt)("inlineCode",{parentName:"p"},"uuidgen"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',title:'"environments/ceph/configuration.yml"'},"fsid: c2120a4a-669c-4769-a32c-b7e9d7b848f4\n")),(0,a.kt)("h2",{id:"client"},"Client"),(0,a.kt)("p",null,"In order to use the Ceph client on the manager node, the IP addresses of the Ceph\nmonitor services, usually they run on the Ceph control plane, are added in\n",(0,a.kt)("inlineCode",{parentName:"p"},"environments/infrastructure/configuration.yml")," first."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="environments/infrastructure/configuration.yml"',title:'"environments/infrastructure/configuration.yml"'},"##########################\n# cephclient\n\ncephclient_mons:\n  - 192.168.16.10\n  - 192.168.16.11\n  - 192.168.16.12\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"client.admin")," keyring is placed in the file ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/infrastructure/files/ceph/ceph.client.admin.keyring"),"."),(0,a.kt)("h2",{id:"swappiness"},"Swappiness"),(0,a.kt)("p",null,"The swappiness is set via the ",(0,a.kt)("inlineCode",{parentName:"p"},"os_tuning_params")," dictionary. The dictionary can\nonly be completely overwritten via an entry in the file ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/ceph/configuration.yml"),"."),(0,a.kt)("p",null,"By default, the dictionary looks like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'os_tuning_params:\n  - { name: fs.file-max, value: 26234859 }\n  - { name: vm.zone_reclaim_mode, value: 0 }\n  - { name: vm.swappiness, value: 10 }\n  - { name: vm.min_free_kbytes, value: "{{ vm_min_free_kbytes }}" }\n')),(0,a.kt)("p",null,"The sysctl paremeters are written to the file ",(0,a.kt)("inlineCode",{parentName:"p"},"/etc/sysctl.d/ceph-tuning.conf"),"\non the storage nodes."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"# cat /etc/sysctl.d/ceph-tuning.conf\nfs.aio-max-nr=1048576\nfs.file-max=26234859\nvm.zone_reclaim_mode=0\nvm.swappiness=10\nvm.min_free_kbytes=4194303\n")),(0,a.kt)("h2",{id:"rgw-service"},"RGW service"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Add following configuration in ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/ceph/configuration.yml")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'ceph_conf_overrides:\n  "client.rgw.{{ hostvars[inventory_hostname][\'ansible_hostname\'] }}.rgw0":\n    "rgw content length compat": "true"\n    "rgw enable apis": "swift, s3, admin"\n    "rgw keystone accepted roles": "member, admin"\n    "rgw keystone accepted admin roles": "admin"\n    "rgw keystone admin domain": "default"\n    "rgw keystone admin password": "{{ ceph_rgw_keystone_password }}"\n    "rgw keystone admin project": "service"\n    "rgw keystone admin tenant": "service"\n    "rgw keystone admin user": "ceph_rgw"\n    "rgw keystone api version": "3"\n    "rgw keystone url": "https://api-int.testbed.osism.xyz:5000"\n    "rgw keystone verify ssl": "false"\n    "rgw keystone implicit tenants": "true"\n    "rgw s3 auth use keystone": "true"\n    "rgw swift account in url": "true"\n    "rgw swift versioning enabled": "true"\n')),(0,a.kt)("p",{parentName:"li"},"If the ",(0,a.kt)("inlineCode",{parentName:"p"},"ceph_conf_overrides")," parameter already exists in ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/ceph/configuration.yml"),",\nexpand it and do not overwrite it."),(0,a.kt)("p",{parentName:"li"},"If self-signed SSL certificates are used, two additional parameters must be set."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},' "rgw keystone verify ssl": "false"\n "rgw verify ssl": "false"\n')),(0,a.kt)("p",{parentName:"li"},"For all possible configuration parameters visit the\n",(0,a.kt)("a",{parentName:"p",href:"https://docs.ceph.com/en/quincy/radosgw/config-ref/"},"Ceph configuration reference"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Add the ",(0,a.kt)("inlineCode",{parentName:"p"},"ceph_rgw_keystone_password")," from ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/kolla/secrets.yml")," to\n",(0,a.kt)("inlineCode",{parentName:"p"},"environments/ceph/secrets.yml"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Add following configuration in ",(0,a.kt)("inlineCode",{parentName:"p"},"environments/kolla/configuration.yml")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"enable_ceph_rgw: true\nenable_ceph_rgw_keystone: true\n\nceph_rgw_swift_compatibility: false\nceph_rgw_swift_account_in_url: true\n\nceph_rgw_hosts:\n  - host: testbed-node-0\n    ip: 192.168.16.10\n    port: 8081\n  - host: testbed-node-1\n    ip: 192.168.16.11\n    port: 8081\n  - host: testbed-node-2\n    ip: 192.168.16.12\n    port: 8081\n")))),(0,a.kt)("h2",{id:"extra-pools"},"Extra pools"),(0,a.kt)("p",null,"Extra pools can be defined via the ",(0,a.kt)("inlineCode",{parentName:"p"},"openstack_pools_extra")," parameter."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="inventory/group_vars/generic/ceph.yml"',title:'"inventory/group_vars/generic/ceph.yml"'},'openstack_cinder_extra001_pool:\n  name: extra001\n  pg_num: "{{ openstack_pool_default_pg_num }}"\n  pgp_num: "{{ openstack_pool_default_pg_num }}"\n  rule_name: "replicated_rule"\n  min_size: "{{ openstack_pool_default_min_size }}"\n  application: "rbd"\n\nopenstack_pools_extra:\n  - "{{ openstack_cinder_extra001_pool }}"\n')),(0,a.kt)("p",null,"If more than one Ceph cluster is managed with one manager, do not place the\nparameters in ",(0,a.kt)("inlineCode",{parentName:"p"},"inventory/group_vars/generic")," but in a corresponding directory."),(0,a.kt)("p",null,"If, for example, the inventory group of the Ceph cluster on which the additional\npools are to be created is ",(0,a.kt)("inlineCode",{parentName:"p"},"ceph.rbd"),", then the parameters would be stored in\n",(0,a.kt)("inlineCode",{parentName:"p"},"inventory/group_vars/ceph.rbd.yml")," accordingly."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,a.kt)("th",{parentName:"tr",align:null},"Default value"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"openstack_pool_default_pg_num"),(0,a.kt)("td",{parentName:"tr",align:null},"64")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"openstack_pool_default_min_size"),(0,a.kt)("td",{parentName:"tr",align:null},"0")))))}u.isMDXComponent=!0}}]);