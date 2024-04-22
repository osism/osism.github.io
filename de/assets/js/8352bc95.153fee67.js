"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3980],{2417:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>l});var d=s(5893),i=s(1151);const c={sidebar_label:"Ceph",sidebar_position:40},a="Ceph",r={id:"guides/configuration-guide/ceph",title:"Ceph",description:"Unique Identifier",source:"@site/docs/guides/configuration-guide/ceph.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/ceph",permalink:"/de/docs/guides/configuration-guide/ceph",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/ceph.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Ceph",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Services",permalink:"/de/docs/guides/configuration-guide/services/"},next:{title:"OpenStack",permalink:"/de/docs/guides/configuration-guide/openstack/"}},o={},l=[{value:"Unique Identifier",id:"unique-identifier",level:2},{value:"Client",id:"client",level:2},{value:"Swappiness",id:"swappiness",level:2},{value:"RGW service",id:"rgw-service",level:2},{value:"Extra pools",id:"extra-pools",level:2},{value:"LVM devices",id:"lvm-devices",level:2},{value:"Full examples",id:"full-examples",level:3},{value:"Use of dedicated DB devices",id:"use-of-dedicated-db-devices",level:4},{value:"Use of partitions",id:"use-of-partitions",level:4},{value:"Dashboard",id:"dashboard",level:2}];function t(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{id:"ceph",children:"Ceph"}),"\n",(0,d.jsx)(n.h2,{id:"unique-identifier",children:"Unique Identifier"}),"\n",(0,d.jsxs)(n.p,{children:["The File System ID is a unique identifier for the cluster.\nThe identifier is set via the parameter ",(0,d.jsx)(n.code,{children:"fsid"})," in ",(0,d.jsx)(n.code,{children:"environments/ceph/configuration.yml"}),"\nand must be unique. It can be generated with ",(0,d.jsx)(n.code,{children:"uuidgen"}),"."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',children:"fsid: c2120a4a-669c-4769-a32c-b7e9d7b848f4\n"})}),"\n",(0,d.jsx)(n.h2,{id:"client",children:"Client"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"client.admin"})," keyring is placed in the file ",(0,d.jsx)(n.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring"}),"."]}),"\n",(0,d.jsx)(n.h2,{id:"swappiness",children:"Swappiness"}),"\n",(0,d.jsxs)(n.p,{children:["The swappiness is set via the ",(0,d.jsx)(n.code,{children:"os_tuning_params"})," dictionary. The dictionary can\nonly be completely overwritten via an entry in the file ",(0,d.jsx)(n.code,{children:"environments/ceph/configuration.yml"}),"."]}),"\n",(0,d.jsx)(n.p,{children:"By default, the dictionary looks like this:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:'os_tuning_params:\n  - { name: fs.file-max, value: 26234859 }\n  - { name: vm.zone_reclaim_mode, value: 0 }\n  - { name: vm.swappiness, value: 10 }\n  - { name: vm.min_free_kbytes, value: "{{ vm_min_free_kbytes }}" }\n'})}),"\n",(0,d.jsxs)(n.p,{children:["The sysctl paremeters are written to the file ",(0,d.jsx)(n.code,{children:"/etc/sysctl.d/ceph-tuning.conf"}),"\non the storage nodes."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"# cat /etc/sysctl.d/ceph-tuning.conf\nfs.aio-max-nr=1048576\nfs.file-max=26234859\nvm.zone_reclaim_mode=0\nvm.swappiness=10\nvm.min_free_kbytes=4194303\n"})}),"\n",(0,d.jsx)(n.h2,{id:"rgw-service",children:"RGW service"}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["Add following configuration in ",(0,d.jsx)(n.code,{children:"environments/ceph/configuration.yml"})]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',children:'ceph_conf_overrides:\n  "client.rgw.{{ hostvars[inventory_hostname][\'ansible_hostname\'] }}.rgw0":\n    "rgw content length compat": "true"\n    "rgw enable apis": "swift, s3, admin"\n    "rgw keystone accepted roles": "member, admin"\n    "rgw keystone accepted admin roles": "admin"\n    "rgw keystone admin domain": "default"\n    "rgw keystone admin password": "{{ ceph_rgw_keystone_password }}"\n    "rgw keystone admin project": "service"\n    "rgw keystone admin tenant": "service"\n    "rgw keystone admin user": "ceph_rgw"\n    "rgw keystone api version": "3"\n    "rgw keystone url": "https://api-int.testbed.osism.xyz:5000"\n    "rgw keystone verify ssl": "false"\n    "rgw keystone implicit tenants": "true"\n    "rgw s3 auth use keystone": "true"\n    "rgw swift account in url": "true"\n    "rgw swift versioning enabled": "true"\n'})}),"\n",(0,d.jsxs)(n.p,{children:["If the ",(0,d.jsx)(n.code,{children:"ceph_conf_overrides"})," parameter already exists in ",(0,d.jsx)(n.code,{children:"environments/ceph/configuration.yml"}),",\nexpand it and do not overwrite it."]}),"\n",(0,d.jsx)(n.p,{children:"If self-signed SSL certificates are used, two additional parameters must be set."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',children:' "rgw keystone verify ssl": "false"\n "rgw verify ssl": "false"\n'})}),"\n",(0,d.jsxs)(n.p,{children:["For all possible configuration parameters visit the\n",(0,d.jsx)(n.a,{href:"https://docs.ceph.com/en/quincy/radosgw/config-ref/",children:"Ceph configuration reference"}),"."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["Add the ",(0,d.jsx)(n.code,{children:"ceph_rgw_keystone_password"})," from ",(0,d.jsx)(n.code,{children:"environments/kolla/secrets.yml"})," to\n",(0,d.jsx)(n.code,{children:"environments/ceph/secrets.yml"}),"."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["Add following configuration in ",(0,d.jsx)(n.code,{children:"environments/kolla/configuration.yml"})]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:"enable_ceph_rgw: true\nenable_ceph_rgw_keystone: true\n\nceph_rgw_swift_compatibility: false\nceph_rgw_swift_account_in_url: true\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["On the nodes on which the RGW service is to be deployed, ",(0,d.jsx)(n.code,{children:"radowsgw_interface"})," ",(0,d.jsx)(n.strong,{children:"or"}),"\n",(0,d.jsx)(n.code,{children:"radosgw_address"})," must be set in the host vars for the nodes in the inventory.\nIf ",(0,d.jsx)(n.code,{children:"radowsgw_interface"})," is used, the first IPv4 address on this interface is used."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:"title=inventory/host_vars/testbed-node-0.testbed.osism.xyz/vars.yml",children:"##########################################################\n# ceph\n\nradosgw_address: 192.168.16.10\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["The nodes on which the RGW service is to be deployed can be defined in inventory group\n",(0,d.jsx)(n.code,{children:"ceph-rgw"}),". By default, the RGW services are deployed on the Ceph control nodes.."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-ini",metastring:'title="inventory/20-roles"',children:"[ceph-rgw:children]\nceph-control\n"})}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h2,{id:"extra-pools",children:"Extra pools"}),"\n",(0,d.jsxs)(n.p,{children:["Extra pools can be defined via the ",(0,d.jsx)(n.code,{children:"openstack_pools_extra"})," parameter."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/group_vars/generic/ceph.yml"',children:'openstack_cinder_extra001_pool:\n  name: extra001\n  pg_num: "{{ openstack_pool_default_pg_num }}"\n  pgp_num: "{{ openstack_pool_default_pg_num }}"\n  rule_name: "replicated_rule"\n  min_size: "{{ openstack_pool_default_min_size }}"\n  application: "rbd"\n\nopenstack_pools_extra:\n  - "{{ openstack_cinder_extra001_pool }}"\n'})}),"\n",(0,d.jsxs)(n.p,{children:["If more than one Ceph cluster is managed with one manager, do not place the\nparameters in ",(0,d.jsx)(n.code,{children:"inventory/group_vars/generic"})," but in a corresponding directory."]}),"\n",(0,d.jsxs)(n.p,{children:["If, for example, the inventory group of the Ceph cluster on which the additional\npools are to be created is ",(0,d.jsx)(n.code,{children:"ceph.rbd"}),", then the parameters would be stored in\n",(0,d.jsx)(n.code,{children:"inventory/group_vars/ceph.rbd.yml"})," accordingly."]}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{style:{textAlign:"left"},children:"Parameter"}),(0,d.jsx)(n.th,{style:{textAlign:"left"},children:"Default value"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{style:{textAlign:"left"},children:(0,d.jsx)(n.code,{children:"openstack_pool_default_pg_num"})}),(0,d.jsx)(n.td,{style:{textAlign:"left"},children:"64"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{style:{textAlign:"left"},children:(0,d.jsx)(n.code,{children:"openstack_pool_default_min_size"})}),(0,d.jsx)(n.td,{style:{textAlign:"left"},children:"0"})]})]})]}),"\n",(0,d.jsx)(n.h2,{id:"lvm-devices",children:"LVM devices"}),"\n",(0,d.jsxs)(n.p,{children:["For more advanced OSD layout requirements leave out the ",(0,d.jsx)(n.code,{children:"devices"})," key\nand instead use ",(0,d.jsx)(n.code,{children:"lvm_volumes"}),". Details for this can be found on the\n",(0,d.jsx)(n.a,{href:"https://docs.ceph.com/projects/ceph-ansible/en/latest/osds/scenarios.html",children:"OSD Scenario"})," documentation."]}),"\n",(0,d.jsxs)(n.p,{children:["In order to aid in creating the ",(0,d.jsx)(n.code,{children:"lvm_volumes"})," config entries and provision the LVM devices for them,\nOSISM has the two playbooks ",(0,d.jsx)(n.code,{children:"ceph-configure-lvm-volumes"})," and ",(0,d.jsx)(n.code,{children:"ceph-create-lvm-devices"})," available."]}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["For each Ceph storage node edit the file ",(0,d.jsx)(n.code,{children:"inventory/host_vars/<nodename>.yml"}),"\nadd a configuration like the following to it. Ensure that no ",(0,d.jsx)(n.code,{children:"devices"})," parameter\nis present in the file."]}),"\n",(0,d.jsxs)(n.ol,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Parameters"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["With the optional parmaeter ",(0,d.jsx)(n.code,{children:"ceph_osd_db_wal_devices_buffer_space_percent"})," it is possible to\nset the percentage of VGs to leave free. The parameter is not set by default. Can be helpful\nfor SSD performance of some older SSD models or to extend lifetime of SSDs in general."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_db_wal_devices_buffer_space_percent: 10\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["It is possible to configure the devices to be used with the parameters ",(0,d.jsx)(n.code,{children:"ceph_osd_devices"}),",\n",(0,d.jsx)(n.code,{children:"ceph_db_devices"}),", ",(0,d.jsx)(n.code,{children:"ceph_wal_devices"}),", and ",(0,d.jsx)(n.code,{children:"ceph_db_wal_devices"}),". This is described below."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["It is always possible to use device names such as ",(0,d.jsx)(n.code,{children:"sda"})," or device IDs such as\n",(0,d.jsx)(n.code,{children:"disk/by-id/wwn-<something>"})," or ",(0,d.jsx)(n.code,{children:"disk/by-id/nvme-eui.<something>"}),". ",(0,d.jsx)(n.code,{children:"/dev/"})," is not\nprefixed and is added automatically."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"db_size"})," parameter is optional and defaults to ",(0,d.jsx)(n.code,{children:"(VG size - buffer space (if enabled)) / num_osds"}),"."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"wal_size"})," parameter is optional and defaults to ",(0,d.jsx)(n.code,{children:"2 GB"}),"."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"num_osds"})," parameter specifies the maximum number of OSDs that can be assigned to a WAL device or DB device."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["The optional parameter ",(0,d.jsx)(n.code,{children:"wal_pv"})," can be used to set the device that is to be used as the WAL device."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["The optional parameter ",(0,d.jsx)(n.code,{children:"db_pv"})," can be used to set the device that is to be used as the DB device."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"OSD only"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"sda"})," device will be used as an OSD device without WAL and DB device."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n  sda:\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"OSD + DB device"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"nvme0n1"})," device will be used as an DB device. It is possible to use this DB device for up to 6 OSDs. Each\nOSD is provided with 30 GB."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_db_devices:\n  nvme0n1:\n    num_osds: 6\n    db_size: 30 GB\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"sda"})," device will be used as an OSD device with ",(0,d.jsx)(n.code,{children:"nvme0n1"})," as DB device."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n   sda:\n     db_pv: nvme0n1\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"OSD + WAL device"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"nvme0n1"})," device will be used as an WAL device. It is possible to use this WAL device for up to 6 OSDs. Each\nOSD is provided with 2 GB."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_wal_devices:\n  nvme0n1:\n    num_osds: 6\n    wal_size: 2 GB\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"sda"})," device will be used as an OSD device with ",(0,d.jsx)(n.code,{children:"nvme0n1"})," as WAL device."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n   sda:\n     wal_pv: nvme0n1\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"OSD + DB device + WAL device (same device for DB + WAL)"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"nvme0n1"})," device will be used as an DB device and a WAL device. It is possible to use those devices for up\nto 6 OSDs."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_db_wal_devices:\n  nvme0n1:\n    num_osds: 6\n    db_size: 30 GB\n    wal_size: 2 GB\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"sda"})," device will be used as an OSD device with ",(0,d.jsx)(n.code,{children:"nvme0n1"})," as DB device and ",(0,d.jsx)(n.code,{children:"nvme0n1"})," as WAL device."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n   sda:\n     db_pv: nvme0n1\n     wal_pv: nvme0n1\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"OSD + DB device + WAL device (different device for DB + WAL)"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"nvme0n1"})," device will be used as an DB device. It is possible to use this DB device for up to 6 OSDs. Each\nOSD is provided with 30 GB."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_db_devices:\n  nvme0n1:\n    num_osds: 6\n    db_size: 30 GB\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"nvme1n1"})," device will be used as an WAL device. It is possible to use this WAL device for up to 6 OSDs. Each\nOSD is provided with 2 GB."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_wal_devices:\n  nvme1n1:\n    num_osds: 6\n    wal_size: 2 GB\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"sda"})," device will be used as an OSD device with ",(0,d.jsx)(n.code,{children:"nvme0n1"})," as DB device and ",(0,d.jsx)(n.code,{children:"nvme1n1"})," as WAL device."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n   sda:\n     db_pv: nvme0n1\n     wal_pv: nvme1n1\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Push the configuration to your configuration repository and after that do the following"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ osism apply configuration\n$ osism reconciler sync\n$ osism apply facts\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"After the configuration has been pulled and facts updated,\nyou can run the LVM configuration playbook:"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ osism apply ceph-configure-lvm-volumes\n"})}),"\n",(0,d.jsxs)(n.p,{children:["This will generate a new configuration file for each node in ",(0,d.jsx)(n.code,{children:"/tmp"}),"\non the first manager node named ",(0,d.jsx)(n.code,{children:"<nodename>-ceph-lvm-configuration.yml"}),"."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["Take the generated configuration file from ",(0,d.jsx)(n.code,{children:"/tmp"})," and ",(0,d.jsx)(n.strong,{children:"replace the previously\nconfiguration"})," for each node."]}),"\n",(0,d.jsxs)(n.p,{children:["In this example, the following content was in the host vars file before\n",(0,d.jsx)(n.code,{children:"osism apply ceph-configure-lvm-volumes"})," was called."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n  sdb:\n  sdc:\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The following content has now been generated in the file in the ",(0,d.jsx)(n.code,{children:"/tmp"})," directory by running\n",(0,d.jsx)(n.code,{children:"osism apply ceph-configure-lvm-volumes"}),"."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n  sdb:\n    osd_lvm_uuid: 196aad32-7cc4-5350-8a45-1b03f50fc9bb\n  sdc:\n    osd_lvm_uuid: c6df96be-1264-5815-9cb2-da5eb453a6de\nlvm_volumes:\n- data: osd-block-196aad32-7cc4-5350-8a45-1b03f50fc9bb\n  data_vg: ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb\n- data: osd-block-c6df96be-1264-5815-9cb2-da5eb453a6de\n  data_vg: ceph-c6df96be-1264-5815-9cb2-da5eb453a6de\n"})}),"\n",(0,d.jsxs)(n.p,{children:["This content from the file in the ",(0,d.jsx)(n.code,{children:"/tmp"})," directory is added in the host vars file.\nThe previous ",(0,d.jsx)(n.code,{children:"ceph_osd_devices"})," is replaced with the new content."]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["Push the updated configuration ",(0,d.jsx)(n.strong,{children:"again"})," to your configuration repository and re-run:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ osism apply configuration\n$ osism reconciler sync\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"Finally create the LVM devices."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ osism apply ceph-create-lvm-devices\n"})}),"\n",(0,d.jsx)(n.p,{children:"These PVs, VGs and LVs are created using the example from step 4."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ sudo pvs\n  PV         VG                                        Fmt  Attr PSize   PFree\n  /dev/sdb   ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb lvm2 a--  <20.00g    0\n  /dev/sdc   ceph-c6df96be-1264-5815-9cb2-da5eb453a6de lvm2 a--  <20.00g    0\n\n$ sudo vgs\n  VG                                        #PV #LV #SN Attr   VSize   VFree\n  ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb   1   1   0 wz--n- <20.00g    0\n  ceph-c6df96be-1264-5815-9cb2-da5eb453a6de   1   1   0 wz--n- <20.00g    0\n\n$ sudo lvs\n  LV                                             VG                                        Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert\n  osd-block-196aad32-7cc4-5350-8a45-1b03f50fc9bb ceph-196aad32-7cc4-5350-8a45-1b03f50fc9bb -wi-a----- <20.00g\n  osd-block-c6df96be-1264-5815-9cb2-da5eb453a6de ceph-c6df96be-1264-5815-9cb2-da5eb453a6de -wi-a----- <20.00g\n"})}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsxs)(n.p,{children:["Everything is now ready for the deployment of the OSDs.\nDetails on deploying Ceph in the ",(0,d.jsx)(n.a,{href:"../deploy-guide/services/ceph",children:"Ceph deploy guide"}),"."]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"full-examples",children:"Full examples"}),"\n",(0,d.jsx)(n.h4,{id:"use-of-dedicated-db-devices",children:"Use of dedicated DB devices"}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"ceph_osd_devices"})," and ",(0,d.jsx)(n.code,{children:"ceph_db_devices"})," parameters with the following content are initially added\nin the host vars of the node. Devices ",(0,d.jsx)(n.code,{children:"/dev/sda"})," and ",(0,d.jsx)(n.code,{children:"/dev/sdb"})," are used as OSD devices. The device ",(0,d.jsx)(n.code,{children:"/dev/sdd"}),"\nis used as a DB device for up to 2 OSDs. For each OSD that uses ",(0,d.jsx)(n.code,{children:"/dev/sdd"})," as DB device, an LV volume of\n(in this case) 5 GByte is created Please note that at least 30 GByte must be used for a DB device in production."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_db_devices:\n  sdd:\n    num_osds: 2\n    db_size: 5 GB\n\nceph_osd_devices:\n  sdb:\n    db_pv: sdd\n  sdc:\n    db_pv: sdd\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Then generate the required LVM2 device configuration with the ",(0,d.jsx)(n.code,{children:"ceph-configure-lvm-volumes"})," play."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"osism apply facts\nosism reconciler sync\nosism apply ceph-configure-lvm-volumes\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Check the ",(0,d.jsx)(n.code,{children:"/tmp"})," directory on the manager node for files like ",(0,d.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz-ceph-lvm-configuration.yml"}),".\nAdd this content to the host vars of the correspondingnode. The existing ",(0,d.jsx)(n.code,{children:"ceph_osd_devices"})," parameter is replaced."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"---\n#\n# This is Ceph LVM configuration for testbed-node-0.testbed.osism.xyz\n# generated by ceph-configure-lvm-volumes playbook.\n#\nceph_db_devices:\n  sdd:\n    db_size: 5 GB\n    num_osds: 2\n    vg_name: ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb\nceph_osd_devices:\n  sdb:\n    db_pv: sdd\n    osd_lvm_uuid: 75960289-2e0e-525d-8bb5-dd8552531ef5\n  sdc:\n    db_pv: sdd\n    osd_lvm_uuid: ce2c2cb6-f911-52dd-b57f-4476bf7afe9f\nlvm_volumes:\n- data: osd-block-75960289-2e0e-525d-8bb5-dd8552531ef5\n  data_vg: ceph-75960289-2e0e-525d-8bb5-dd8552531ef5\n  db: osd-db-75960289-2e0e-525d-8bb5-dd8552531ef5\n  db_vg: ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb\n- data: osd-block-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f\n  data_vg: ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f\n  db: osd-db-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f\n  db_vg: ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Finally, create the necessary PVs, VGs and LVs. The parameter ",(0,d.jsx)(n.code,{children:"-e ignore_db_too_small=true"})," is only set\nhere in the example because we use less than 30 GByte for the size of the DB LV."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"osism reconciler sync\nosism apply ceph-create-lvm-devices -e ignore_db_too_small=true\n"})}),"\n",(0,d.jsx)(n.p,{children:"You can check the PVs, VGs, and LVs on the node."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ sudo pvs\n  PV         VG                                           Fmt  Attr PSize   PFree\n  /dev/sdb   ceph-75960289-2e0e-525d-8bb5-dd8552531ef5    lvm2 a--  <20.00g      0\n  /dev/sdc   ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f    lvm2 a--  <20.00g      0\n  /dev/sdd   ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb lvm2 a--  <20.00g <10.00g\n\n$ sudo vgs\n  VG                                           #PV #LV #SN Attr   VSize   VFree\n  ceph-75960289-2e0e-525d-8bb5-dd8552531ef5      1   1   0 wz--n- <20.00g      0\n  ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f      1   1   0 wz--n- <20.00g      0\n  ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb   1   2   0 wz--n- <20.00g <10.00g\n\n$ sudo lvs\n  LV                                             VG                                           Attr       LSize   [...]\n  osd-block-75960289-2e0e-525d-8bb5-dd8552531ef5 ceph-75960289-2e0e-525d-8bb5-dd8552531ef5    -wi-a----- <20.00g\n  osd-block-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f ceph-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f    -wi-a----- <20.00g\n  osd-db-75960289-2e0e-525d-8bb5-dd8552531ef5    ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb -wi-a-----   5.00g\n  osd-db-ce2c2cb6-f911-52dd-b57f-4476bf7afe9f    ceph-db-eb7522b1-41cf-522e-8d7e-2a4a82a879bb -wi-a-----   5.00g\n"})}),"\n",(0,d.jsx)(n.h4,{id:"use-of-partitions",children:"Use of partitions"}),"\n",(0,d.jsx)(n.p,{children:"The use of partitions presented in this example is not recommended for use in production but only for POCs."}),"\n",(0,d.jsxs)(n.p,{children:["First create partitions that should be used for Ceph. In this example we use a block device ",(0,d.jsx)(n.code,{children:"/dev/sdb"}),"\nwith four partitions that will be used for Ceph OSDs."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ sudo fdisk -l /dev/sdb\nDisk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors\nDisk model: QEMU HARDDISK\nUnits: sectors of 1 * 512 = 512 bytes\nSector size (logical/physical): 512 bytes / 512 bytes\nI/O size (minimum/optimal): 512 bytes / 512 bytes\nDisklabel type: gpt\nDisk identifier: 709B8C6C-51E1-4644-9ED4-0604607FCCEE\n\nDevice        Start      End  Sectors Size Type\n/dev/sdb1      2048 10487807 10485760   5G Linux filesystem\n/dev/sdb2  10487808 20973567 10485760   5G Linux filesystem\n/dev/sdb3  20973568 31459327 10485760   5G Linux filesystem\n/dev/sdb4  31459328 41943006 10483679   5G Linux filesystem\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The ",(0,d.jsx)(n.code,{children:"ceph_osd_devices"})," parameter with the following content is initially added in the host vars of the node.\nThe partitions ",(0,d.jsx)(n.code,{children:"/dev/sda1"}),", ",(0,d.jsx)(n.code,{children:"/dev/sdb1"}),", ",(0,d.jsx)(n.code,{children:"/dev/sdc1"})," and ",(0,d.jsx)(n.code,{children:"/dev/sdd1"}),", are to be used as OSD."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"ceph_osd_devices:\n  sdb1:\n  sdb2:\n  sdb3:\n  sdb4:\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Then generate the required LVM2 device configuration with the ",(0,d.jsx)(n.code,{children:"ceph-configure-lvm-volumes"})," play."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"osism apply facts\nosism reconciler sync\nosism apply ceph-configure-lvm-volumes\n"})}),"\n",(0,d.jsxs)(n.p,{children:["Check the ",(0,d.jsx)(n.code,{children:"/tmp"})," directory on the manager node for files like ",(0,d.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz-ceph-lvm-configuration.yml"}),".\nAdd this content to the host vars of the correspondingnode. The existing ",(0,d.jsx)(n.code,{children:"ceph_osd_devices"})," parameter is replaced."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",children:"---\n#\n# This is Ceph LVM configuration for testbed-node-0.testbed.osism.xyz\n# generated by ceph-configure-lvm-volumes playbook.\n#\nceph_osd_devices:\n  sdb1:\n    osd_lvm_uuid: 9e8799ae-c716-5212-8833-49f153ffbcef\n  sdb2:\n    osd_lvm_uuid: 8518d3a2-3194-5764-b55a-c51222b9b576\n  sdb3:\n    osd_lvm_uuid: a0da232a-e5b8-5823-8c42-8fb231442edc\n  sdb4:\n    osd_lvm_uuid: 56f7b5bc-82b0-5626-90a5-adf6078ceba6\nlvm_volumes:\n- data: osd-block-9e8799ae-c716-5212-8833-49f153ffbcef\n  data_vg: ceph-9e8799ae-c716-5212-8833-49f153ffbcef\n- data: osd-block-8518d3a2-3194-5764-b55a-c51222b9b576\n  data_vg: ceph-8518d3a2-3194-5764-b55a-c51222b9b576\n- data: osd-block-a0da232a-e5b8-5823-8c42-8fb231442edc\n  data_vg: ceph-a0da232a-e5b8-5823-8c42-8fb231442edc\n- data: osd-block-56f7b5bc-82b0-5626-90a5-adf6078ceba6\n  data_vg: ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6\n"})}),"\n",(0,d.jsx)(n.p,{children:"Finally, create the necessary PVs, VGs and LVs."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"osism reconciler sync\nosism apply ceph-create-lvm-devices\n"})}),"\n",(0,d.jsx)(n.p,{children:"You can check the PVs, VGs, and LVs on the node."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ sudo pvs\n  PV         VG                                        Fmt  Attr PSize  PFree\n  /dev/sdb1  ceph-9e8799ae-c716-5212-8833-49f153ffbcef lvm2 a--  <5.00g    0\n  /dev/sdb2  ceph-8518d3a2-3194-5764-b55a-c51222b9b576 lvm2 a--  <5.00g    0\n  /dev/sdb3  ceph-a0da232a-e5b8-5823-8c42-8fb231442edc lvm2 a--  <5.00g    0\n  /dev/sdb4  ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6 lvm2 a--  <5.00g    0\n\n$ sudo vgs\n  VG                                        #PV #LV #SN Attr   VSize  VFree\n  ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6   1   1   0 wz--n- <5.00g    0\n  ceph-8518d3a2-3194-5764-b55a-c51222b9b576   1   1   0 wz--n- <5.00g    0\n  ceph-9e8799ae-c716-5212-8833-49f153ffbcef   1   1   0 wz--n- <5.00g    0\n  ceph-a0da232a-e5b8-5823-8c42-8fb231442edc   1   1   0 wz--n- <5.00g    0\n\n$ sudo lvs\n  LV                                             VG                                        Attr       LSize  [...]\n  osd-block-56f7b5bc-82b0-5626-90a5-adf6078ceba6 ceph-56f7b5bc-82b0-5626-90a5-adf6078ceba6 -wi-a----- <5.00g\n  osd-block-8518d3a2-3194-5764-b55a-c51222b9b576 ceph-8518d3a2-3194-5764-b55a-c51222b9b576 -wi-a----- <5.00g\n  osd-block-9e8799ae-c716-5212-8833-49f153ffbcef ceph-9e8799ae-c716-5212-8833-49f153ffbcef -wi-a----- <5.00g\n  osd-block-a0da232a-e5b8-5823-8c42-8fb231442edc ceph-a0da232a-e5b8-5823-8c42-8fb231442edc -wi-a----- <5.00g\n"})}),"\n",(0,d.jsx)(n.h2,{id:"dashboard",children:"Dashboard"}),"\n",(0,d.jsxs)(n.p,{children:["Password for the admin user of the Ceph dashboard is set via ",(0,d.jsx)(n.code,{children:"ceph_dashboard_password"}),"."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/secrets.yml"',children:"ceph_dashboard_password: password\n"})}),"\n",(0,d.jsx)(n.p,{children:"User name of the admin user, port and listen IP address can be set via additional parameters."}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/configuration.yml"',children:"ceph_dashboard_addr: 0.0.0.0\nceph_dashboard_port: 7000\nceph_dashboard_username: admin\n"})}),"\n",(0,d.jsxs)(n.p,{children:["The Ceph dashboard is bootstrapped with the ",(0,d.jsx)(n.code,{children:"ceph-bootstrap-dashboard"})," play."]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{children:"$ osism apply ceph-bootstrap-dashboard\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(t,{...e})}):t(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var d=s(7294);const i={},c=d.createContext(i);function a(e){const n=d.useContext(c);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),d.createElement(c.Provider,{value:n},e.children)}}}]);