"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3177],{8665:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var s=o(5893),i=o(1151);const r={sidebar_label:"Ceph via Rook (technical preview)"},t="Ceph via Rook (technical preview)",a={id:"guides/operations-guide/rook",title:"Ceph via Rook (technical preview)",description:"This is a technical preview and not recommended for production use yet.",source:"@site/docs/guides/operations-guide/rook.md",sourceDirName:"guides/operations-guide",slug:"/guides/operations-guide/rook",permalink:"/de/docs/guides/operations-guide/rook",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/rook.md",tags:[],version:"current",frontMatter:{sidebar_label:"Ceph via Rook (technical preview)"},sidebar:"tutorialSidebar",previous:{title:"Octavia",permalink:"/de/docs/guides/operations-guide/openstack/octavia"},next:{title:"Troubleshooting Guide",permalink:"/de/docs/guides/troubleshooting-guide/"}},l={},d=[{value:"Where to find docs",id:"where-to-find-docs",level:2},{value:"Advice on Ceph releases",id:"advice-on-ceph-releases",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Updating",id:"updating",level:2},{value:"Rook Upgrades",id:"rook-upgrades",level:3},{value:"Ceph Upgrades",id:"ceph-upgrades",level:3},{value:"General maintenance",id:"general-maintenance",level:2},{value:"60 seconds cluster overview",id:"60-seconds-cluster-overview",level:3},{value:"Mute/Unmute a health warning",id:"muteunmute-a-health-warning",level:3},{value:"Disable/Enable (deep-)scrubbing",id:"disableenable-deep-scrubbing",level:3},{value:"Reboot a single node",id:"reboot-a-single-node",level:3},{value:"Gathering information about block devices",id:"gathering-information-about-block-devices",level:2},{value:"Enumerate typical storage devices and LVM",id:"enumerate-typical-storage-devices-and-lvm",level:3},{value:"SMART data for SATA/SAS and NVME devices",id:"smart-data-for-satasas-and-nvme-devices",level:3},{value:"Check format of a NVME device",id:"check-format-of-a-nvme-device",level:3},{value:"Format a NVME device to a different LBA format using nvme-cli",id:"format-a-nvme-device-to-a-different-lba-format-using-nvme-cli",level:3},{value:"Secure Erase a NVME drive using nvme-cli",id:"secure-erase-a-nvme-drive-using-nvme-cli",level:3},{value:"Secure Erase a SATA/SAS drive using hdparm",id:"secure-erase-a-satasas-drive-using-hdparm",level:3},{value:"OSD maintenance tasks",id:"osd-maintenance-tasks",level:2},{value:"Disable backfills/recovery completely",id:"disable-backfillsrecovery-completely",level:3},{value:"Rebalance OSDs",id:"rebalance-osds",level:3},{value:"Placement Group maintenance",id:"placement-group-maintenance",level:2},{value:"Dump placement groups",id:"dump-placement-groups",level:3},{value:"Query a PG about its status",id:"query-a-pg-about-its-status",level:3},{value:"Start (deep-)scrubbing of a placement group",id:"start-deep-scrubbing-of-a-placement-group",level:3},{value:"HEALTH_WARN - Large omap objects found...",id:"health_warn---large-omap-objects-found",level:3},{value:"Instruct a PG to repair in case of scrub errors (inconsistent PG)",id:"instruct-a-pg-to-repair-in-case-of-scrub-errors-inconsistent-pg",level:3},{value:"RADOS Pool maintenance",id:"rados-pool-maintenance",level:2},{value:"Get pools and their configuration",id:"get-pools-and-their-configuration",level:3},{value:"Dump all CRUSH rules",id:"dump-all-crush-rules",level:3},{value:"Get autoscaler status",id:"get-autoscaler-status",level:3},{value:"Create a replicated pool",id:"create-a-replicated-pool",level:3},{value:"Enabling an application on a pool",id:"enabling-an-application-on-a-pool",level:3},{value:"Delete a pool",id:"delete-a-pool",level:3},{value:"Set number of PGs for a pool",id:"set-number-of-pgs-for-a-pool",level:3},{value:"Create CRUSH rules for different storage classes",id:"create-crush-rules-for-different-storage-classes",level:3},{value:"Change CRUSH rule for a pool (&quot;move pool&quot;)",id:"change-crush-rule-for-a-pool-move-pool",level:3},{value:"Advanced topics",id:"advanced-topics",level:2},{value:"Performance benchmark",id:"performance-benchmark",level:2},{value:"Where and how to get further help",id:"where-and-how-to-get-further-help",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"ceph-via-rook-technical-preview",children:"Ceph via Rook (technical preview)"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This is a technical preview and not recommended for production use yet."})}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This whole document has to be reworkded with more rook like handling. Do not take it for granted yet."})}),"\n",(0,s.jsx)(n.h2,{id:"where-to-find-docs",children:"Where to find docs"}),"\n",(0,s.jsxs)(n.p,{children:["The official Rook documentation starts here ",(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Getting-Started/intro/",children:"https://rook.io/docs/rook/latest-release/Getting-Started/intro/"})]}),"\n",(0,s.jsx)(n.p,{children:"Some sections to point out are:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Troubleshooting/common-issues/",children:"Rook Common Issues Documentation"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Troubleshooting/ceph-common-issues/",children:"Rook Ceph Common Issues Documentation"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The official Ceph documentation is located on ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/operations/",children:"https://docs.ceph.com/en/latest/rados/operations/"})]}),"\n",(0,s.jsxs)(n.p,{children:["It is ",(0,s.jsx)(n.strong,{children:"strongly advised"})," to use the documentation for the version being used."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Quincy - ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/quincy/rados/operations/",children:"https://docs.ceph.com/en/quincy/rados/operations/"})]}),"\n",(0,s.jsxs)(n.li,{children:["Reef - ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/reef/rados/operations/",children:"https://docs.ceph.com/en/reef/rados/operations/"})]}),"\n"]}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:["Do not take information in the documentation at face value.\nEspecially when it comes to advanced/rarely used/very new features it is ",(0,s.jsx)(n.strong,{children:"strongly advised"}),"\nto test any claims made in the documentation about any particular feature."]}),(0,s.jsx)(n.p,{children:"Never assume that things will work as written without actually testing it on a test setup\nas close to your real workload scenario as possible."})]}),"\n",(0,s.jsx)(n.h2,{id:"advice-on-ceph-releases",children:"Advice on Ceph releases"}),"\n",(0,s.jsxs)(n.p,{children:["The current Ceph releases and their support status can be found on ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/releases/",children:"https://docs.ceph.com/en/latest/releases/"})]}),"\n",(0,s.jsxs)(n.p,{children:["When a new Ceph stable version is released you are ",(0,s.jsx)(n.strong,{children:"strongly advised"}),"\nto not roll it out on any production cluster whatsoever.\nEven though its listed as \"stable\" it doesn't mean that this is actually true.\nEspecially avoid using .0 releases on anything remotely production\nunless you really, really now what you're doing and can live with a possible catastrophic failure."]}),"\n",(0,s.jsxs)(n.p,{children:["Be ",(0,s.jsx)(n.strong,{children:"very"})," conservative about what version you run on production systems."]}),"\n",(0,s.jsx)(n.p,{children:"Shiny new features aren't worth the risk of total or partial data loss/corruption."}),"\n",(0,s.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,s.jsxs)(n.p,{children:["Please have a look at the ",(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Troubleshooting/ceph-toolbox/",children:"Rook Troubleshooting documentation"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["The Rook toolbox is available via the ",(0,s.jsx)(n.code,{children:"ceph"})," command on the manager node, after you deployed the wrapper via ",(0,s.jsx)(n.code,{children:"osism apply cephclient"}),". You have to make sure the correct ",(0,s.jsx)(n.a,{href:"/de/docs/guides/configuration-guide/rook#client",children:"Configuration Options for the Rook Ceph Client Wrapper"})," are net."]}),"\n",(0,s.jsx)(n.h2,{id:"updating",children:"Updating"}),"\n",(0,s.jsx)(n.h3,{id:"rook-upgrades",children:"Rook Upgrades"}),"\n",(0,s.jsxs)(n.p,{children:["Please have a look at the ",(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Upgrade/rook-upgrade/",children:"Rook Upgrades documentation"}),". Take note of update instructions specific to your version."]}),"\n",(0,s.jsxs)(n.p,{children:["Usually you can simply update by bumping the ",(0,s.jsx)(n.code,{children:"rook_operator_image_tag"})," ansible variable and applying ",(0,s.jsx)(n.code,{children:"osism apply rook-operator"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"ceph-upgrades",children:"Ceph Upgrades"}),"\n",(0,s.jsxs)(n.p,{children:["Please have a look at the ",(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Upgrade/ceph-upgrade/",children:"Rook Ceph Upgrades documentation"}),". Take note of update instructions specific to your version."]}),"\n",(0,s.jsxs)(n.p,{children:["Usually you can simply update by bumping the ",(0,s.jsx)(n.code,{children:"rook_ceph_image_tag"})," ansible variable and applying ",(0,s.jsx)(n.code,{children:"osism apply rook"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"general-maintenance",children:"General maintenance"}),"\n",(0,s.jsx)(n.h3,{id:"60-seconds-cluster-overview",children:"60 seconds cluster overview"}),"\n",(0,s.jsx)(n.p,{children:"The following commands can be used to quickly check the status of Ceph:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Print overall cluster status"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph -s\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Print detailed health information"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph health detail\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Display current OSD tree"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd tree\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Cluster storage usage by pool and storage class"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph df\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"List pools with detailed configuration"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd pool ls detail\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Get usage stats for OSDs"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd df {plain|tree} {class e.g. hdd|ssd}\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Watch Ceph health messages sequentially"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph -w\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"List daemon versions running in the cluster"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph versions\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Also you can run the following on each node running ceph-daemons,\nto provide further debug information about the environment:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# lscpu\n# cat /proc/cpuinfo # if lscpu isn't available\n# free -g\n# ip l\n# ethtool <device> # for each network adapter\n"})}),"\n",(0,s.jsx)(n.h3,{id:"muteunmute-a-health-warning",children:"Mute/Unmute a health warning"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph health mute <what> <duration>\n$ ceph health unmute <what>\n"})}),"\n",(0,s.jsx)(n.h3,{id:"disableenable-deep-scrubbing",children:"Disable/Enable (deep-)scrubbing"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd set noscrub\n$ ceph osd set nodeep-scrub\n$ ceph osd unset noscrub\n$ ceph osd unset nodeep-scrub\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"Use this sparingly only in emergency situations.\nSetting these flags will cause a HEALTH_WARN status,\nincrease risk of data corruption and also the risk of generating\na HEALTH_WARN due to PGs not being (deep-)scrubbed in time."})}),"\n",(0,s.jsx)(n.h3,{id:"reboot-a-single-node",children:"Reboot a single node"}),"\n",(0,s.jsxs)(n.p,{children:["The traditional way of doing this is by setting the ",(0,s.jsx)(n.code,{children:"noout"})," flag,\ndo the appropriate maintenance work and after the node is back online\nunset the flag like so:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd set noout\n"})}),"\n",(0,s.jsx)(n.p,{children:"After maintenance is done and host is back up:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd unset noout\n"})}),"\n",(0,s.jsx)(n.p,{children:"On versions Luminous or above you can set the flag individually for single\nOSDs or entire CRUSH buckets, which can be a safer option in case of prolonged\nmaintenance periods."}),"\n",(0,s.jsx)(n.p,{children:"Add noout for a OSD:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd add-noout osd.<ID>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Remove noout for a OSD:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd rm-noout osd.<ID>\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Add noout for CRUSH bucket (e.g. host name as seen in ",(0,s.jsx)(n.code,{children:"ceph osd tree"}),"):"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd set-group noout <crush-bucket-name>\n"})}),"\n",(0,s.jsx)(n.p,{children:"Remove noout for CRUSH bucket:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ceph osd unset-group noout <crush-bucket-name>\n"})}),"\n",(0,s.jsx)(n.h2,{id:"gathering-information-about-block-devices",children:"Gathering information about block devices"}),"\n",(0,s.jsx)(n.h3,{id:"enumerate-typical-storage-devices-and-lvm",children:"Enumerate typical storage devices and LVM"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# lsblk\n# lsblk -S\n# lsscsi\n# nvme list\n# pvs\n# vgs\n# lvs\n"})}),"\n",(0,s.jsx)(n.h3,{id:"smart-data-for-satasas-and-nvme-devices",children:"SMART data for SATA/SAS and NVME devices"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# smartctl -a /dev/sdX\n# nvme smart-log /dev/nvmeXnY\n"})}),"\n",(0,s.jsx)(n.h3,{id:"check-format-of-a-nvme-device",children:"Check format of a NVME device"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# nvme id-ns -H /dev/nvmeXnY\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:'Check the last lines named "LBA Format".\nIt will show which formats are supported,\nwhich format is in use and which format offers the best performance\naccording to the vendor.'})}),"\n",(0,s.jsx)(n.h3,{id:"format-a-nvme-device-to-a-different-lba-format-using-nvme-cli",children:"Format a NVME device to a different LBA format using nvme-cli"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This will destroy all data on the device!"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# nvme format --lbaf=<id> /dev/nvmeXnY\n"})}),"\n",(0,s.jsx)(n.h3,{id:"secure-erase-a-nvme-drive-using-nvme-cli",children:"Secure Erase a NVME drive using nvme-cli"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This will destroy all data on the device!"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# nvme format -s2 /dev/nvmeXnY\n# blkdiscard /dev/nvmeXnY\n# nvme format -s1 /dev/nvmeXnY\n"})}),"\n",(0,s.jsx)(n.h3,{id:"secure-erase-a-satasas-drive-using-hdparm",children:"Secure Erase a SATA/SAS drive using hdparm"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This will destroy all data on the device!"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Gather device info:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# hdparm -I /dev/sdX\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Check that the output says ",(0,s.jsx)(n.strong,{children:'"not frozen"'})," and ",(0,s.jsx)(n.strong,{children:'"not locked"'}),",\nalso it should list support for enhanced erase and list time estimates\nfor ",(0,s.jsx)(n.strong,{children:"SECURITY ERASE UNIT"})," and/or ",(0,s.jsx)(n.strong,{children:"ENHANCED SECURITY ERASE UNIT"})]}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Set a master password for the disk (required, will be automatically removed after wipe)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# hdparm --user-master wipeit --security-set-pass wipeit /dev/sdX\n# hdparm -I /dev/sdX\n"})}),"\n",(0,s.jsxs)(n.p,{children:['Check that "Security level" is now ',(0,s.jsx)(n.strong,{children:'"high"'})," and master password is now\n",(0,s.jsx)(n.strong,{children:'"enabled"'})," instead of ",(0,s.jsx)(n.strong,{children:'"not enabled"'})," before"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Wipe the device"}),"\n",(0,s.jsx)(n.p,{children:"If device supports enhanced security erase (better), use the following:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# hdparm --user-master wipeit --security-erase-enhanced wipeit /dev/sdX\n"})}),"\n",(0,s.jsx)(n.p,{children:"If not, use standard security erase:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# hdparm --user-master wipeit --security-erase wipeit /dev/sdX\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:['On some systems the system firmware might "freeze" the device,\nwhich makes it impossible to issue a secure erase or reformat the device.\nIn that case it might be necessary to either "unfreeze" the drive or\nto install the drive in another system where it can be unfrozen.\nAlso make sure that the device is ',(0,s.jsx)(n.em,{children:"actually"})," wiped. Its recommended to\nat least perform a blanking pass on HDDs with a tool like nwipe."]})}),"\n",(0,s.jsx)(n.h2,{id:"osd-maintenance-tasks",children:"OSD maintenance tasks"}),"\n",(0,s.jsxs)(n.p,{children:["Please have a look at the ",(0,s.jsx)(n.a,{href:"https://rook.io/docs/rook/latest-release/Storage-Configuration/Advanced/ceph-osd-mgmt/.",children:"Rook Ceph OSD Management documentation"})]}),"\n",(0,s.jsx)(n.h3,{id:"disable-backfillsrecovery-completely",children:"Disable backfills/recovery completely"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"Use only in emergency situations!"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd set nobackfill\n$ ceph osd set norecovery\n$ ceph osd set norebalance\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Unset the flags with ",(0,s.jsx)(n.code,{children:"ceph osd unset <flag>"}),"."]}),"\n",(0,s.jsx)(n.h3,{id:"rebalance-osds",children:"Rebalance OSDs"}),"\n",(0,s.jsx)(n.h2,{id:"placement-group-maintenance",children:"Placement Group maintenance"}),"\n",(0,s.jsx)(n.h3,{id:"dump-placement-groups",children:"Dump placement groups"}),"\n",(0,s.jsx)(n.p,{children:"Usually only useful when parsing it, so here are two ways to get the data:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph pg dump\n$ ceph pg dump --format=json-pretty\n"})}),"\n",(0,s.jsx)(n.h3,{id:"query-a-pg-about-its-status",children:"Query a PG about its status"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph pg <pgid> query\n"})}),"\n",(0,s.jsx)(n.h3,{id:"start-deep-scrubbing-of-a-placement-group",children:"Start (deep-)scrubbing of a placement group"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph pg scrub <pgid>\n$ ceph pg deep-scrub <pgid>\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"Instructing a PG to (deep-)scrub does not mean that it will do so immediately,\nit can take some time for the scrub to start."})}),"\n",(0,s.jsx)(n.h3,{id:"health_warn---large-omap-objects-found",children:"HEALTH_WARN - Large omap objects found..."}),"\n",(0,s.jsx)(n.p,{children:"Finding PGs which have large OMAP objects:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# ceph pg dump --format=json | jq '.pg_map.pg_stats[] |\nselect(.stat_sum.num_large_omap_objects != 0) |\n(.pgid, .stat_sum.num_large_omap_objects, .up, .acting)'\n"})}),"\n",(0,s.jsxs)(n.p,{children:["(Remove the line breaks between the single quotes or ",(0,s.jsx)(n.code,{children:"jq"})," might act weird!)"]}),"\n",(0,s.jsxs)(n.p,{children:["This will dump all PG IDs with large OMAP objects and their up/acting OSDs.\nYou then can grep the logs of these OSDs for ",(0,s.jsx)(n.strong,{children:'"Large omap object"'}),"\nto find the actual objects causing the health warning."]}),"\n",(0,s.jsx)(n.p,{children:"Also the PG ID before the dot is equal to the pool ID it belongs to."}),"\n",(0,s.jsx)(n.p,{children:"In case the logs have been rotated, instruct those OSDs to do a deep-scrub\nand watch the logs for the message to appear."}),"\n",(0,s.jsx)(n.p,{children:"From there you can investigate the issue further,\nmostly it'll be due to the index of a RGW bucket getting too big due to too many objects,\nthus resharding that bucket's index will be necessary."}),"\n",(0,s.jsx)(n.h3,{id:"instruct-a-pg-to-repair-in-case-of-scrub-errors-inconsistent-pg",children:"Instruct a PG to repair in case of scrub errors (inconsistent PG)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph pg repair <pgid>\n"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:["Recovery might not start immediately and might take some time.\nYou can query the status of the recovery through ",(0,s.jsx)(n.code,{children:"ceph pg <pgid> query"}),".\nBe sure to read the Ceph manual about this topic ",(0,s.jsx)(n.em,{children:"thoroughly"}),":"]}),(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/troubleshooting/troubleshooting-pg/",children:"https://docs.ceph.com/en/latest/rados/troubleshooting/troubleshooting-pg/"})})]}),"\n",(0,s.jsx)(n.h2,{id:"rados-pool-maintenance",children:"RADOS Pool maintenance"}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsx)(n.p,{children:"Read the RADOS pool operations documentation in detail before playing around with pools.\nEspecially when considering making changes to the CRUSH map.\nWrong decisions there can lead to data loss or other catastrophic failures."}),(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/operations/pools/",children:"https://docs.ceph.com/en/latest/rados/operations/pools/"})})]}),"\n",(0,s.jsx)(n.h3,{id:"get-pools-and-their-configuration",children:"Get pools and their configuration"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd pool ls detail\n"})}),"\n",(0,s.jsx)(n.h3,{id:"dump-all-crush-rules",children:"Dump all CRUSH rules"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd crush rule dump\n"})}),"\n",(0,s.jsx)(n.h3,{id:"get-autoscaler-status",children:"Get autoscaler status"}),"\n",(0,s.jsx)(n.p,{children:"Autoscaler is enabled by default in a Rook Ceph cluster."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd pool autoscale-status\n"})}),"\n",(0,s.jsx)(n.h3,{id:"create-a-replicated-pool",children:"Create a replicated pool"}),"\n",(0,s.jsxs)(n.p,{children:["This should be done by updating your ",(0,s.jsx)(n.code,{children:"values.yml"})," file via the variables in ",(0,s.jsx)(n.a,{href:"/de/docs/guides/configuration-guide/rook#extra-pool--cephblockpool-crd",children:"Rook Extra pools - CephBlockPoolC CRD"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"It also can be done by hand but Rook will not know about the pool in this case."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd pool create <pool_name> <pg_num> <pgp_num> replicated [<crush_rule_name>]\n"})}),"\n",(0,s.jsx)(n.h3,{id:"enabling-an-application-on-a-pool",children:"Enabling an application on a pool"}),"\n",(0,s.jsx)(n.p,{children:"Required, otherwise a health warning will be raised after some time."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd pool application enable <pool_name> <application_name> # Syntax\n$ ceph osd pool application enable cinder rbd # Example\n"})}),"\n",(0,s.jsx)(n.p,{children:"Typical application names are: rbd, rgw, cephfs"}),"\n",(0,s.jsx)(n.h3,{id:"delete-a-pool",children:"Delete a pool"}),"\n",(0,s.jsxs)(n.p,{children:["This should be done by updating your ",(0,s.jsx)(n.code,{children:"values.yml"})," file via the variables in ",(0,s.jsx)(n.a,{href:"/de/docs/guides/configuration-guide/rook#extra-pool--cephblockpool-crd",children:"Rook Extra pools - CephBlockPoolC CRD"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"It also can be done by hand but Rook will not know about the pool in this case."}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This will delete all data in that pool. There is no undo/undelete."})}),"\n",(0,s.jsx)(n.h3,{id:"set-number-of-pgs-for-a-pool",children:"Set number of PGs for a pool"}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"PG autoscaling is enabled by default in Rook managed Ceph Clusters."})}),"\n",(0,s.jsx)(n.p,{children:"If no autoscaling of PGs is used, it is very important to adapt the PGs per pool to the\nreal world when operating a Ceph cluster. If, for example, OSDs are exchanged, added, new\nnodes are added, etc., the number of PGs must also be taken into account."}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/operations/pgcalc/",children:"PG Calc Tool"})," can be used\nto calculate a reasonable number of PGs per pool depending on all ODSs and pools."]}),"\n",(0,s.jsxs)(n.p,{children:["Further information on placement groups can be found in the\n",(0,s.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/operations/placement-groups/",children:"Ceph documentation"}),".\nYou should definitely read ",(0,s.jsx)(n.em,{children:"FACTORS RELEVANT TO SPECIFYING PG_NUM"})," and ",(0,s.jsx)(n.em,{children:"CHOOSING THE NUMBER OF PGS"}),"\nthere."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd pool set <poolname> pg_num <num_pgs>\n"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsx)(n.p,{children:"Num PGs must be a power of two! Be careful about changing number of PGs.\nChanging pg_num to a new value will gradually increase pgp_num on newer versions of Ceph."}),(0,s.jsx)(n.p,{children:"In older versions one also has to set pgp_num manually, either in increments or in one big leap."})]}),"\n",(0,s.jsx)(n.h3,{id:"create-crush-rules-for-different-storage-classes",children:"Create CRUSH rules for different storage classes"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd crush rule create-replicated replicated_hdd default host hdd\n$ ceph osd crush rule create-replicated replicated_ssd default host ssd\n$ ceph osd crush rule create-replicated replicated_nvme default host nvme\n"})}),"\n",(0,s.jsx)(n.h3,{id:"change-crush-rule-for-a-pool-move-pool",children:'Change CRUSH rule for a pool ("move pool")'}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ ceph osd pool set <poolname> crush_rule <rule_name>\n"})}),"\n",(0,s.jsx)(n.p,{children:"This can be used to move a pool from e.g. HDD to SSD or NVME class\nor anything else that the new CRUSH rule specifies."}),"\n",(0,s.jsx)(n.h2,{id:"advanced-topics",children:"Advanced topics"}),"\n",(0,s.jsx)(n.h2,{id:"performance-benchmark",children:"Performance benchmark"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"# apt-get install -y fio\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'#!/usr/bin/env bash\n\nBENCH_DEVICE="$2"\nDATE=$(date +%s)\nIOENGINE="libaio"\nLOGPATH="$1"\nSIZE=1G\n\nmkdir -p $LOGPATH\n\nfor RW in "write" "randwrite" "read" "randread"\ndo\n  for BS in "4K" "64K" "1M" "4M" "16M" "64M"\n  do\n    (\n    echo "==== $RW - $BS - DIRECT ===="\n    echo 3 > /proc/sys/vm/drop_caches\n    fio --rw=$RW --ioengine=${IOENGINE} --size=$SIZE --bs=$BS --direct=1 --runtime=60 --time_based --name=bench --filename=$BENCH_DEVICE --output=$LOGPATH/$RW.${BS}-direct-$(basename $BENCH_DEVICE).$DATE.log.json --output-format=json\n    sync\n    echo 3 > /proc/sys/vm/drop_caches\n    echo "==== $RW - $BS - DIRECT IODEPTH 32  ===="\n    fio --rw=$RW --ioengine=${IOENGINE} --size=$SIZE --bs=$BS --iodepth=32 --direct=1 --runtime=60 --time_based --name=bench --filename=$BENCH_DEVICE --output=$LOGPATH/$RW.${BS}-direct-iod32-$(basename $BENCH_DEVICE).$DATE.log.json --output-format=json\n    sync\n    ) | tee $LOGPATH/$RW.$BS-$(basename $BENCH_DEVICE).$DATE.log\n    echo\n  done\ndone\n'})}),"\n",(0,s.jsx)(n.h2,{id:"where-and-how-to-get-further-help",children:"Where and how to get further help"}),"\n",(0,s.jsxs)(n.p,{children:["Join the ",(0,s.jsx)(n.strong,{children:"#ceph"})," IRC channel on ",(0,s.jsx)(n.strong,{children:"irc.oftc.net"}),', state the problem with as many details as possible\nincluding information about what steps have already been taken to solve the problem\nalso provide information from the command output from the "60 seconds cluster overview" above\nthrough a pastebin or a similar service. In order for people to be able\nto help, details and some patience are important.']})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>t});var s=o(7294);const i={},r=s.createContext(i);function t(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);