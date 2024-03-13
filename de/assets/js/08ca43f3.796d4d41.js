"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5655],{9524:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var o=s(5893),i=s(1151);const t={sidebar_label:"Ceph",sidebar_position:50},r="Ceph",a={id:"guides/operations-guide/ceph",title:"Ceph",description:"Where to find docs",source:"@site/docs/guides/operations-guide/ceph.md",sourceDirName:"guides/operations-guide",slug:"/guides/operations-guide/ceph",permalink:"/de/docs/guides/operations-guide/ceph",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/ceph.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_label:"Ceph",sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Task",permalink:"/de/docs/guides/operations-guide/manager/task"},next:{title:"OpenStack",permalink:"/de/docs/guides/operations-guide/openstack/"}},l={},d=[{value:"Where to find docs",id:"where-to-find-docs",level:2},{value:"Advice on Ceph releases",id:"advice-on-ceph-releases",level:2},{value:"General maintenance",id:"general-maintenance",level:2},{value:"60 seconds cluster overview",id:"60-seconds-cluster-overview",level:3},{value:"Mute/Unmute a health warning",id:"muteunmute-a-health-warning",level:3},{value:"Disable/Enable (deep-)scrubbing",id:"disableenable-deep-scrubbing",level:3},{value:"Reboot a single node",id:"reboot-a-single-node",level:3},{value:"Gathering information about block devices",id:"gathering-information-about-block-devices",level:2},{value:"Enumerate typical storage devices and LVM",id:"enumerate-typical-storage-devices-and-lvm",level:3},{value:"SMART data for SATA/SAS and NVME devices",id:"smart-data-for-satasas-and-nvme-devices",level:3},{value:"Check format of a NVME device",id:"check-format-of-a-nvme-device",level:3},{value:"Format a NVME device to a different LBA format using nvme-cli",id:"format-a-nvme-device-to-a-different-lba-format-using-nvme-cli",level:3},{value:"Secure Erase a NVME drive using nvme-cli",id:"secure-erase-a-nvme-drive-using-nvme-cli",level:3},{value:"Secure Erase a SATA/SAS drive using hdparm",id:"secure-erase-a-satasas-drive-using-hdparm",level:3},{value:"OSD maintenance tasks",id:"osd-maintenance-tasks",level:2},{value:"Locate a specific OSD in the cluster",id:"locate-a-specific-osd-in-the-cluster",level:3},{value:"Get OSD metadata (global and single OSD)",id:"get-osd-metadata-global-and-single-osd",level:3},{value:"Add a new OSD",id:"add-a-new-osd",level:3},{value:"Remove a OSD",id:"remove-a-osd",level:3},{value:"Replace a defect OSD",id:"replace-a-defect-osd",level:3},{value:"Remove a single OSD node",id:"remove-a-single-osd-node",level:3},{value:"Remove an OSD (removing it completely, not reprovisioning it again) without double rebalance",id:"remove-an-osd-removing-it-completely-not-reprovisioning-it-again-without-double-rebalance",level:3},{value:"Remove an OSD (temporarily e.g. when replacing a broken disk)",id:"remove-an-osd-temporarily-eg-when-replacing-a-broken-disk",level:3},{value:"Disable backfills/recovery completely",id:"disable-backfillsrecovery-completely",level:3},{value:"Rebalance OSDs",id:"rebalance-osds",level:3},{value:"Placement Group maintenance",id:"placement-group-maintenance",level:2},{value:"Dump placement groups",id:"dump-placement-groups",level:3},{value:"Query a PG about its status",id:"query-a-pg-about-its-status",level:3},{value:"Start (deep-)scrubbing of a placement group",id:"start-deep-scrubbing-of-a-placement-group",level:3},{value:"HEALTH_WARN - Large omap objects found...",id:"health_warn---large-omap-objects-found",level:3},{value:"Instruct a PG to repair in case of scrub errors (inconsistent PG)",id:"instruct-a-pg-to-repair-in-case-of-scrub-errors-inconsistent-pg",level:3},{value:"RADOS Pool maintenance",id:"rados-pool-maintenance",level:2},{value:"Get pools and their configuration",id:"get-pools-and-their-configuration",level:3},{value:"Dump all CRUSH rules",id:"dump-all-crush-rules",level:3},{value:"Get autoscaler status",id:"get-autoscaler-status",level:3},{value:"Create a replicated pool",id:"create-a-replicated-pool",level:3},{value:"Enabling an application on a pool",id:"enabling-an-application-on-a-pool",level:3},{value:"Delete a pool",id:"delete-a-pool",level:3},{value:"Set number of PGs for a pool",id:"set-number-of-pgs-for-a-pool",level:3},{value:"Create CRUSH rules for different storage classes",id:"create-crush-rules-for-different-storage-classes",level:3},{value:"Change CRUSH rule for a pool (&quot;move pool&quot;)",id:"change-crush-rule-for-a-pool-move-pool",level:3},{value:"Advanced topics",id:"advanced-topics",level:2},{value:"Validating Ceph using OSISM playbooks",id:"validating-ceph-using-osism-playbooks",level:3},{value:"Shutdown a Ceph cluster",id:"shutdown-a-ceph-cluster",level:3},{value:"Restart a Ceph cluster after manual shutdown",id:"restart-a-ceph-cluster-after-manual-shutdown",level:3},{value:"Performance benchmark",id:"performance-benchmark",level:2},{value:"Where and how to get further help",id:"where-and-how-to-get-further-help",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"ceph",children:"Ceph"}),"\n",(0,o.jsx)(n.h2,{id:"where-to-find-docs",children:"Where to find docs"}),"\n",(0,o.jsxs)(n.p,{children:["The official Ceph documentation is located on ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/latest",children:"https://docs.ceph.com/en/latest"})]}),"\n",(0,o.jsxs)(n.p,{children:["It is ",(0,o.jsx)(n.strong,{children:"strongly advised"})," to use the documentation for the version being used."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Pacific - ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/pacific",children:"https://docs.ceph.com/en/pacific"})]}),"\n",(0,o.jsxs)(n.li,{children:["Quincy - ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/quincy",children:"https://docs.ceph.com/en/quincy"})]}),"\n",(0,o.jsxs)(n.li,{children:["Reef - ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/reef",children:"https://docs.ceph.com/en/reef"})]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["ceph-ansible documentation is located on ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/projects/ceph-ansible/en/latest/",children:"https://docs.ceph.com/projects/ceph-ansible/en/latest/"})]}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.p,{children:["Do not take information in the documentation at face value.\nEspecially when it comes to advanced/rarely used/very new features it is ",(0,o.jsx)(n.strong,{children:"strongly advised"}),"\nto test any claims made in the documentation about any particular feature."]}),(0,o.jsx)(n.p,{children:"Never assume that things will work as written without actually testing it on a test setup\nas close to your real workload scenario as possible."})]}),"\n",(0,o.jsx)(n.h2,{id:"advice-on-ceph-releases",children:"Advice on Ceph releases"}),"\n",(0,o.jsxs)(n.p,{children:["The current Ceph releases and their support status can be found on ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/releases/",children:"https://docs.ceph.com/en/latest/releases/"})]}),"\n",(0,o.jsxs)(n.p,{children:["When a new Ceph stable version is released you are ",(0,o.jsx)(n.strong,{children:"strongly advised"}),"\nto not roll it out on any production cluster whatsoever.\nEven though its listed as \"stable\" it doesn't mean that this is actually true.\nEspecially avoid using .0 releases on anything remotely production\nunless you really, really now what you're doing and can live with a possible catastrophic failure."]}),"\n",(0,o.jsxs)(n.p,{children:["Be ",(0,o.jsx)(n.strong,{children:"very"})," conservative about what version you run on production systems."]}),"\n",(0,o.jsx)(n.p,{children:"Shiny new features aren't worth the risk of total or partial data loss/corruption."}),"\n",(0,o.jsx)(n.h2,{id:"general-maintenance",children:"General maintenance"}),"\n",(0,o.jsx)(n.h3,{id:"60-seconds-cluster-overview",children:"60 seconds cluster overview"}),"\n",(0,o.jsx)(n.p,{children:"The following commands can be used to quickly check the status of Ceph:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph -s # Print overall cluster status\n$ ceph health detail # Print detailed health information\n$ ceph osd tree # Display current OSD tree\n$ ceph df # Cluster storage usage by pool and storage class\n$ ceph osd pool ls detail # List pools with detailed configuration\n$ ceph osd df {plain|tree} {class e.g. hdd|ssd} # Get usage stats for OSDs\n$ ceph -w # Watch Ceph health messages sequentially\n$ ceph versions # List daemon versions running in the cluster\n"})}),"\n",(0,o.jsx)(n.p,{children:"Also you can run the following on each node running ceph-daemons,\nto provide further debug information about the environment:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# lscpu\n# cat /proc/cpuinfo # if lscpu isn't available\n# free -g\n# ip l\n# ethtool <device> # for each network adapter\n"})}),"\n",(0,o.jsx)(n.h3,{id:"muteunmute-a-health-warning",children:"Mute/Unmute a health warning"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph health mute <what> <duration>\n$ ceph health unmute <what>\n"})}),"\n",(0,o.jsx)(n.h3,{id:"disableenable-deep-scrubbing",children:"Disable/Enable (deep-)scrubbing"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd set noscrub\n$ ceph osd set nodeep-scrub\n$ ceph osd unset noscrub\n$ ceph osd unset nodeep-scrub\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"Use this sparingly only in emergency situations.\nSetting these flags will cause a HEALTH_WARN status,\nincrease risk of data corruption and also the risk of generating\na HEALTH_WARN due to PGs not being (deep-)scrubbed in time."})}),"\n",(0,o.jsx)(n.h3,{id:"reboot-a-single-node",children:"Reboot a single node"}),"\n",(0,o.jsxs)(n.p,{children:["The traditional way of doing this is by setting the ",(0,o.jsx)(n.code,{children:"noout"})," flag,\ndo the appropriate maintenance work and after the node is back online\nunset the flag like so:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ceph osd set noout\n"})}),"\n",(0,o.jsx)(n.p,{children:"After maintenance is done and host is back up:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ceph osd unset noout\n"})}),"\n",(0,o.jsx)(n.p,{children:"On versions Luminous or above you can set the flag individually for single\nOSDs or entire CRUSH buckets, which can be a safer option in case of prolonged\nmaintenance periods."}),"\n",(0,o.jsx)(n.p,{children:"Add noout for a OSD:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ceph osd add-noout osd.<ID>\n"})}),"\n",(0,o.jsx)(n.p,{children:"Remove noout for a OSD:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ceph osd rm-noout osd.<ID>\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Add noout for CRUSH bucket (e.g. host name as seen in ",(0,o.jsx)(n.code,{children:"ceph osd tree"}),"):"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ceph osd set-group noout <crush-bucket-name>\n"})}),"\n",(0,o.jsx)(n.p,{children:"Remove noout for CRUSH bucket:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"ceph osd unset-group noout <crush-bucket-name>\n"})}),"\n",(0,o.jsx)(n.h2,{id:"gathering-information-about-block-devices",children:"Gathering information about block devices"}),"\n",(0,o.jsx)(n.h3,{id:"enumerate-typical-storage-devices-and-lvm",children:"Enumerate typical storage devices and LVM"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# lsblk\n# lsblk -S\n# lsscsi\n# nvme list\n# pvs\n# vgs\n# lvs\n"})}),"\n",(0,o.jsx)(n.h3,{id:"smart-data-for-satasas-and-nvme-devices",children:"SMART data for SATA/SAS and NVME devices"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# smartctl -a /dev/sdX\n# nvme smart-log /dev/nvmeXnY\n"})}),"\n",(0,o.jsx)(n.h3,{id:"check-format-of-a-nvme-device",children:"Check format of a NVME device"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# nvme id-ns -H /dev/nvmeXnY\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:'Check the last lines named "LBA Format".\nIt will show which formats are supported,\nwhich format is in use and which format offers the best performance\naccording to the vendor.'})}),"\n",(0,o.jsx)(n.h3,{id:"format-a-nvme-device-to-a-different-lba-format-using-nvme-cli",children:"Format a NVME device to a different LBA format using nvme-cli"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"This will destroy all data on the device!"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# nvme format --lbaf=<id> /dev/nvmeXnY\n"})}),"\n",(0,o.jsx)(n.h3,{id:"secure-erase-a-nvme-drive-using-nvme-cli",children:"Secure Erase a NVME drive using nvme-cli"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"This will destroy all data on the device!"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# nvme format -s2 /dev/nvmeXnY\n# blkdiscard /dev/nvmeXnY\n# nvme format -s1 /dev/nvmeXnY\n"})}),"\n",(0,o.jsx)(n.h3,{id:"secure-erase-a-satasas-drive-using-hdparm",children:"Secure Erase a SATA/SAS drive using hdparm"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"This will destroy all data on the device!"})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Gather device info:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# hdparm -I /dev/sdX\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Check that the output says ",(0,o.jsx)(n.strong,{children:'"not frozen"'})," and ",(0,o.jsx)(n.strong,{children:'"not locked"'}),",\nalso it should list support for enhanced erase and list time estimates\nfor ",(0,o.jsx)(n.strong,{children:"SECURITY ERASE UNIT"})," and/or ",(0,o.jsx)(n.strong,{children:"ENHANCED SECURITY ERASE UNIT"})]}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Set a master password for the disk (required, will be automatically removed after wipe)"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# hdparm --user-master wipeit --security-set-pass wipeit /dev/sdX\n# hdparm -I /dev/sdX\n"})}),"\n",(0,o.jsxs)(n.p,{children:['Check that "Security level" is now ',(0,o.jsx)(n.strong,{children:'"high"'})," and master password is now\n",(0,o.jsx)(n.strong,{children:'"enabled"'})," instead of ",(0,o.jsx)(n.strong,{children:'"not enabled"'})," before"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Wipe the device"}),"\n",(0,o.jsx)(n.p,{children:"If device supports enhanced security erase (better), use the following:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# hdparm --user-master wipeit --security-erase-enhanced wipeit /dev/sdX\n"})}),"\n",(0,o.jsx)(n.p,{children:"If not, use standard security erase:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# hdparm --user-master wipeit --security-erase wipeit /dev/sdX\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:['On some systems the system firmware might "freeze" the device,\nwhich makes it impossible to issue a secure erase or reformat the device.\nIn that case it might be necessary to either "unfreeze" the drive or\nto install the drive in another system where it can be unfrozen.\nAlso make sure that the device is ',(0,o.jsx)(n.em,{children:"actually"})," wiped. Its recommended to\nat least perform a blanking pass on HDDs with a tool like nwipe."]})}),"\n",(0,o.jsx)(n.h2,{id:"osd-maintenance-tasks",children:"OSD maintenance tasks"}),"\n",(0,o.jsx)(n.h3,{id:"locate-a-specific-osd-in-the-cluster",children:"Locate a specific OSD in the cluster"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd find osd.<ID>\n"})}),"\n",(0,o.jsx)(n.h3,{id:"get-osd-metadata-global-and-single-osd",children:"Get OSD metadata (global and single OSD)"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd metadata\n$ ceph osd metadata osd.<ID>\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"Interesting fields:\nosd_objectstore, rotational, hostname, devices, device_ids, device_paths,\nbluefs_db_rotational, bluefs_wal_rotational,\nbluefs_dedicated_db, bluefs_dedicated_wal,\nbluestore_bdev_rotational"})}),"\n",(0,o.jsx)(n.h3,{id:"add-a-new-osd",children:"Add a new OSD"}),"\n",(0,o.jsx)(n.h3,{id:"remove-a-osd",children:"Remove a OSD"}),"\n",(0,o.jsx)(n.h3,{id:"replace-a-defect-osd",children:"Replace a defect OSD"}),"\n",(0,o.jsx)(n.h3,{id:"remove-a-single-osd-node",children:"Remove a single OSD node"}),"\n",(0,o.jsx)(n.h3,{id:"remove-an-osd-removing-it-completely-not-reprovisioning-it-again-without-double-rebalance",children:"Remove an OSD (removing it completely, not reprovisioning it again) without double rebalance"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd crush reweight osd.<ID> 0.0\n... Wait for rebalance to complete, then mark it OUT:\n$ ceph osd out osd.<ID>\n# systemctl stop ceph-osd@<ID>\n# systemctl disable ceph-osd@<ID>\n$ ceph osd purge osd.<ID> --yes-i-really-mean-it\n"})}),"\n",(0,o.jsx)(n.h3,{id:"remove-an-osd-temporarily-eg-when-replacing-a-broken-disk",children:"Remove an OSD (temporarily e.g. when replacing a broken disk)"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd out osd.<ID>\n# systemctl stop ceph-osd@<ID>\n# systemctl disable ceph-osd@<ID>\n"})}),"\n",(0,o.jsx)(n.h3,{id:"disable-backfillsrecovery-completely",children:"Disable backfills/recovery completely"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"Use only in emergency situations!"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd set nobackfill\n$ ceph osd set norecovery\n$ ceph osd set norebalance\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Unset the flags with ",(0,o.jsx)(n.code,{children:"ceph osd unset <flag>"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"rebalance-osds",children:"Rebalance OSDs"}),"\n",(0,o.jsx)(n.h2,{id:"placement-group-maintenance",children:"Placement Group maintenance"}),"\n",(0,o.jsx)(n.h3,{id:"dump-placement-groups",children:"Dump placement groups"}),"\n",(0,o.jsx)(n.p,{children:"Usually only useful when parsing it, so here are two ways to get the data:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph pg dump\n$ ceph pg dump --format=json-pretty\n"})}),"\n",(0,o.jsx)(n.h3,{id:"query-a-pg-about-its-status",children:"Query a PG about its status"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph pg <pgid> query\n"})}),"\n",(0,o.jsx)(n.h3,{id:"start-deep-scrubbing-of-a-placement-group",children:"Start (deep-)scrubbing of a placement group"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph pg scrub <pgid>\n$ ceph pg deep-scrub <pgid>\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"Instructing a PG to (deep-)scrub does not mean that it will do so immediately,\nit can take some time for the scrub to start."})}),"\n",(0,o.jsx)(n.h3,{id:"health_warn---large-omap-objects-found",children:"HEALTH_WARN - Large omap objects found..."}),"\n",(0,o.jsx)(n.p,{children:"Finding PGs which have large OMAP objects:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# ceph pg dump --format=json | jq '.pg_map.pg_stats[] |\nselect(.stat_sum.num_large_omap_objects != 0) |\n(.pgid, .stat_sum.num_large_omap_objects, .up, .acting)'\n"})}),"\n",(0,o.jsxs)(n.p,{children:["(Remove the line breaks between the single quotes or ",(0,o.jsx)(n.code,{children:"jq"})," might act weird!)"]}),"\n",(0,o.jsxs)(n.p,{children:["This will dump all PG IDs with large OMAP objects and their up/acting OSDs.\nYou then can grep the logs of these OSDs for ",(0,o.jsx)(n.strong,{children:'"Large omap object"'}),"\nto find the actual objects causing the health warning."]}),"\n",(0,o.jsx)(n.p,{children:"Also the PG ID before the dot is equal to the pool ID it belongs to."}),"\n",(0,o.jsx)(n.p,{children:"In case the logs have been rotated, instruct those OSDs to do a deep-scrub\nand watch the logs for the message to appear."}),"\n",(0,o.jsx)(n.p,{children:"From there you can investigate the issue further,\nmostly it'll be due to the index of a RGW bucket getting too big due to too many objects,\nthus resharding that bucket's index will be necessary."}),"\n",(0,o.jsx)(n.h3,{id:"instruct-a-pg-to-repair-in-case-of-scrub-errors-inconsistent-pg",children:"Instruct a PG to repair in case of scrub errors (inconsistent PG)"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph pg repair <pgid>\n"})}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.p,{children:["Recovery might not start immediately and might take some time.\nYou can query the status of the recovery through ",(0,o.jsx)(n.code,{children:"ceph pg <pgid> query"}),".\nBe sure to read the Ceph manual about this topic ",(0,o.jsx)(n.em,{children:"thoroughly"}),":"]}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/operations/pg-repair/",children:"https://docs.ceph.com/en/latest/rados/operations/pg-repair/"})})]}),"\n",(0,o.jsx)(n.h2,{id:"rados-pool-maintenance",children:"RADOS Pool maintenance"}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsx)(n.p,{children:"Read the RADOS pool operations documentation in detail before playing around with pools.\nEspecially when considering making changes to the CRUSH map.\nWrong decisions there can lead to data loss or other catastrophic failures."}),(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/operations/pools/",children:"https://docs.ceph.com/en/latest/rados/operations/pools/"})})]}),"\n",(0,o.jsx)(n.h3,{id:"get-pools-and-their-configuration",children:"Get pools and their configuration"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool ls detail\n"})}),"\n",(0,o.jsx)(n.h3,{id:"dump-all-crush-rules",children:"Dump all CRUSH rules"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd crush rule dump\n"})}),"\n",(0,o.jsx)(n.h3,{id:"get-autoscaler-status",children:"Get autoscaler status"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool autoscale-status\n"})}),"\n",(0,o.jsx)(n.h3,{id:"create-a-replicated-pool",children:"Create a replicated pool"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool create <pool_name> <pg_num> <pgp_num> replicated [<crush_rule_name>]\n"})}),"\n",(0,o.jsx)(n.h3,{id:"enabling-an-application-on-a-pool",children:"Enabling an application on a pool"}),"\n",(0,o.jsx)(n.p,{children:"Required, otherwise a health warning will be raised after some time."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool application enable <pool_name> <application_name> # Syntax\n$ ceph osd pool application enable cinder rbd # Example\n"})}),"\n",(0,o.jsx)(n.p,{children:"Typical application names are: rbd, rgw, cephfs"}),"\n",(0,o.jsx)(n.h3,{id:"delete-a-pool",children:"Delete a pool"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"This will delete all data in that pool. There is no undo/undelete."})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool delete <pool_name> <pool_name> --yes-i-really-really-mean-it\n"})}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsxs)(n.p,{children:["In order to be able to delete pools, it has to be enabled on the monitors\nby setting the ",(0,o.jsx)(n.code,{children:"mon_allow_pool_delete"})," flag to true. Default is false."]}),(0,o.jsxs)(n.p,{children:["See: ",(0,o.jsx)(n.a,{href:"https://docs.ceph.com/en/latest/rados/configuration/mon-config-ref",children:"https://docs.ceph.com/en/latest/rados/configuration/mon-config-ref"})]})]}),"\n",(0,o.jsx)(n.h3,{id:"set-number-of-pgs-for-a-pool",children:"Set number of PGs for a pool"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool set <poolname> pg_num <num_pgs>\n"})}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsx)(n.p,{children:"Num PGs must be a power of two! Be careful about changing number of PGs.\nChanging pg_num to a new value will gradually increase pgp_num on newer versions of Ceph."}),(0,o.jsx)(n.p,{children:"In older versions one also has to set pgp_num manually, either in increments or in one big leap."})]}),"\n",(0,o.jsx)(n.h3,{id:"create-crush-rules-for-different-storage-classes",children:"Create CRUSH rules for different storage classes"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd crush rule create-replicated replicated_hdd default host hdd\n$ ceph osd crush rule create-replicated replicated_ssd default host ssd\n$ ceph osd crush rule create-replicated replicated_nvme default host nvme\n"})}),"\n",(0,o.jsx)(n.h3,{id:"change-crush-rule-for-a-pool-move-pool",children:'Change CRUSH rule for a pool ("move pool")'}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd pool set <poolname> crush_rule <rule_name>\n"})}),"\n",(0,o.jsx)(n.p,{children:"This can be used to move a pool from e.g. HDD to SSD or NVME class\nor anything else that the new CRUSH rule specifies."}),"\n",(0,o.jsx)(n.h2,{id:"advanced-topics",children:"Advanced topics"}),"\n",(0,o.jsx)(n.h3,{id:"validating-ceph-using-osism-playbooks",children:"Validating Ceph using OSISM playbooks"}),"\n",(0,o.jsxs)(n.p,{children:["For Ceph, special playbooks were added to validate the deployment status of\nthe OSD, MON and MGR services. The commands for use are ",(0,o.jsx)(n.code,{children:"osism validate ceph-osds"}),",\n",(0,o.jsx)(n.code,{children:"osism validate ceph-mons"}),", and ",(0,o.jsx)(n.code,{children:"osism validate ceph-mgrs"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["These playbooks will validate that the deployed Ceph environment matches\nthe configuration and is overall in a healthy state. The playbooks will\ngenerate report files in JSON format on the first manager node in ",(0,o.jsx)(n.code,{children:"/opt/reports/validator"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"shutdown-a-ceph-cluster",children:"Shutdown a Ceph cluster"}),"\n",(0,o.jsx)(n.p,{children:"In order to fully shutdown a Ceph cluster safely, you first do the following steps:"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsx)(n.p,{children:"Take GOOD NOTES of the unit names and OSD IDs running on each node.\nYou will need them to restart the cluster later."})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Stop the workload that is using the cluster"}),"\n",(0,o.jsx)(n.p,{children:"This will vary depending on your environment and is not covered here."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Pause/Stop operations on the cluster by setting flags"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd set noout\n$ ceph osd set nobackfill\n$ ceph osd set norecover\n$ ceph osd set norebalance\n$ ceph osd set nodown\n$ ceph osd set pause\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Stop and disable the ",(0,o.jsx)(n.code,{children:"radosgw"})," services on all nodes (on each rgw node) (if RGW is used)"]}),"\n",(0,o.jsx)(n.p,{children:"Get the name of the unit (globs not supported for disable) and\nmake a note of the unit name for that node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl | grep ceph-radosgw\n"})}),"\n",(0,o.jsx)(n.p,{children:"Then disable and stop the unit:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl disable --now ceph-radosgw@<name>.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Stop all CephFS file systems (if CephFS is used)"}),"\n",(0,o.jsx)(n.p,{children:"List all Ceph file systems"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph fs ls\n"})}),"\n",(0,o.jsx)(n.p,{children:"For each CephFS do:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph fs <file system name> down true\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["After that disable and stop all ",(0,o.jsx)(n.code,{children:"ceph-mds"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.p,{children:"Get the name of the unit (globs not supported for disable) and\nmake a note of the unit name for that node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl | grep ceph-mds\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl disable --now ceph-mds@<unit>.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Stop and disable the ",(0,o.jsx)(n.code,{children:"ceph-mgr"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.p,{children:"Get the name of the unit (globs not supported for disable) and\nmake a note of the unit name for that node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl | grep ceph-mgr\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl disable --now ceph-mgr@<unit>.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Stop and disable the ",(0,o.jsx)(n.code,{children:"ceph-osd"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.p,{children:"Get the names of the units (globs not supported for disable) and\nmake a note of the unit names for that node (best to save it to a file):"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl | grep ceph-osd\n"})}),"\n",(0,o.jsx)(n.p,{children:"For each OSD unit execute:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl disable ceph-osd@<osd-id>.service\n"})}),"\n",(0,o.jsx)(n.p,{children:"Stop all OSDs at once:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl stop ceph-osd\\*.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Finally stop the ",(0,o.jsx)(n.code,{children:"ceph-mon"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.p,{children:"Get the name of the unit (globs not supported for disable) and\nmake a note of the unit name for that node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl | grep ceph-mon\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl disable --now ceph-mon@<unit>.service\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"restart-a-ceph-cluster-after-manual-shutdown",children:"Restart a Ceph cluster after manual shutdown"}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsxs)(n.p,{children:["You will need the notes taken during shutdown of the unit names.\nIt ",(0,o.jsx)(n.strong,{children:"can"})," be done without, but then it'll be way more work finding out the names."]})}),"\n",(0,o.jsx)(n.p,{children:"In order to restart a Ceph cluster after performing a manual shutdown like described\nin the section above, you do the following:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Enable & start the ",(0,o.jsx)(n.code,{children:"ceph-mon"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl enable --now ceph-mon@<unit-name>.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Enable & start the ",(0,o.jsx)(n.code,{children:"ceph-osd"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.p,{children:"For each Ceph OSD on that node do:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl enable --now ceph-osd@<osd-id>.service\n"})}),"\n",(0,o.jsx)(n.p,{children:"Depending on the number of OSDs on that node it can take a while."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Enable & start the ",(0,o.jsx)(n.code,{children:"ceph-mgr"})," services on all nodes (do this on each node)"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl enable --now ceph-mgr@<unit-name>.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Check the status of your cluster and wait for all OSDs to come online"}),"\n",(0,o.jsx)(n.p,{children:"You can watch the status periodically by running:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ watch ceph -s\n"})}),"\n",(0,o.jsx)(n.p,{children:"You should wait until all OSDs are up + in again, before removing flags."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Remove flags to unpause operations"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph osd unset pause\n$ ceph osd unset nodown\n$ ceph osd unset noout\n$ ceph osd unset nobackfill\n$ ceph osd unset norecover\n$ ceph osd unset norebalance\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Wait for cluster to resume operations"}),"\n",(0,o.jsx)(n.p,{children:'See step #4 of this SOP.\nNow you wait until the cluster seems "happy enough" to accept clients.\n(i.e. rebalancing finished etc.)\nMaybe it will complain about MDS being down, but that\'s normal for now.'}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Enable & start the ",(0,o.jsx)(n.code,{children:"ceph-mds"})," services on each node (if CephFS is used)"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl enable --now ceph-mds@<unit>.service\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Start CephFS file systems again"}),"\n",(0,o.jsx)(n.p,{children:"List all Ceph file systems"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph fs ls\n"})}),"\n",(0,o.jsx)(n.p,{children:"For each CephFS do:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ ceph fs <file system name> down false\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Enable & start the ",(0,o.jsx)(n.code,{children:"radosgw"})," services on each node (if RGW is used)"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# systemctl enable --now ceph-radosgw@<name>.service\n"})}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"performance-benchmark",children:"Performance benchmark"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"# apt-get install -y fio\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:'#!/usr/bin/env bash\n\nBENCH_DEVICE="$2"\nDATE=$(date +%s)\nIOENGINE="libaio"\nLOGPATH="$1"\nSIZE=1G\n\nmkdir -p $LOGPATH\n\nfor RW in "write" "randwrite" "read" "randread"\ndo\n  for BS in "4K" "64K" "1M" "4M" "16M" "64M"\n  do\n    (\n    echo "==== $RW - $BS - DIRECT ===="\n    echo 3 > /proc/sys/vm/drop_caches\n    fio --rw=$RW --ioengine=${IOENGINE} --size=$SIZE --bs=$BS --direct=1 --runtime=60 --time_based --name=bench --filename=$BENCH_DEVICE --output=$LOGPATH/$RW.${BS}-direct-$(basename $BENCH_DEVICE).$DATE.log.json --output-format=json\n    sync\n    echo 3 > /proc/sys/vm/drop_caches\n    echo "==== $RW - $BS - DIRECT IODEPTH 32  ===="\n    fio --rw=$RW --ioengine=${IOENGINE} --size=$SIZE --bs=$BS --iodepth=32 --direct=1 --runtime=60 --time_based --name=bench --filename=$BENCH_DEVICE --output=$LOGPATH/$RW.${BS}-direct-iod32-$(basename $BENCH_DEVICE).$DATE.log.json --output-format=json\n    sync\n    ) | tee $LOGPATH/$RW.$BS-$(basename $BENCH_DEVICE).$DATE.log\n    echo\n  done\ndone\n'})}),"\n",(0,o.jsx)(n.h2,{id:"where-and-how-to-get-further-help",children:"Where and how to get further help"}),"\n",(0,o.jsxs)(n.p,{children:["Join the ",(0,o.jsx)(n.strong,{children:"#ceph"})," IRC channel on ",(0,o.jsx)(n.strong,{children:"irc.oftc.net"}),', state the problem with as many details as possible\nincluding information about what steps have already been taken to solve the problem\nalso provide information from the command output from the "60 seconds cluster overview" above\nthrough a pastebin or a similar service. In order for people to be able\nto help, details and some patience are important.']})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>r});var o=s(7294);const i={},t=o.createContext(i);function r(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);