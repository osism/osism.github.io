"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6838],{3330:(e,s,o)=>{o.r(s),o.d(s,{assets:()=>c,contentTitle:()=>t,default:()=>a,frontMatter:()=>d,metadata:()=>i,toc:()=>h});var n=o(5893),r=o(1151);const d={sidebar_label:"Ceph"},t="Ceph",i={id:"guides/troubleshooting-guide/ceph",title:"Ceph",description:"Where to find docs",source:"@site/docs/guides/troubleshooting-guide/ceph.md",sourceDirName:"guides/troubleshooting-guide",slug:"/guides/troubleshooting-guide/ceph",permalink:"/de/docs/guides/troubleshooting-guide/ceph",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/troubleshooting-guide/ceph.md",tags:[],version:"current",frontMatter:{sidebar_label:"Ceph"},sidebar:"tutorialSidebar",previous:{title:"OpenStack",permalink:"/de/docs/guides/troubleshooting-guide/openstack"},next:{title:"User Guide",permalink:"/de/docs/guides/user-guide/"}},c={},h=[{value:"Where to find docs",id:"where-to-find-docs",level:2},{value:"Critical medium error",id:"critical-medium-error",level:2}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"ceph",children:"Ceph"})}),"\n",(0,n.jsx)(s.h2,{id:"where-to-find-docs",children:"Where to find docs"}),"\n",(0,n.jsxs)(s.p,{children:["The official Ceph documentation is located on ",(0,n.jsx)(s.a,{href:"https://docs.ceph.com/en/latest/rados/troubleshooting/",children:"https://docs.ceph.com/en/latest/rados/troubleshooting/"})]}),"\n",(0,n.jsxs)(s.p,{children:["It is ",(0,n.jsx)(s.strong,{children:"strongly advised"})," to use the documentation for the version being used."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Pacific - ",(0,n.jsx)(s.a,{href:"https://docs.ceph.com/en/pacific/rados/troubleshooting/",children:"https://docs.ceph.com/en/pacific/rados/troubleshooting/"})]}),"\n",(0,n.jsxs)(s.li,{children:["Quincy - ",(0,n.jsx)(s.a,{href:"https://docs.ceph.com/en/quincy/rados/troubleshooting/",children:"https://docs.ceph.com/en/quincy/rados/troubleshooting/"})]}),"\n",(0,n.jsxs)(s.li,{children:["Reef - ",(0,n.jsx)(s.a,{href:"https://docs.ceph.com/en/reef/rados/troubleshooting/",children:"https://docs.ceph.com/en/reef/rados/troubleshooting/"})]}),"\n"]}),"\n",(0,n.jsx)(s.h2,{id:"critical-medium-error",children:"Critical medium error"}),"\n",(0,n.jsxs)(s.p,{children:["The block device ",(0,n.jsx)(s.code,{children:"sdf"})," has errors. You can see this in the kernel ring buffer, for example."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"$ sudo dmesg\n[...]\n[14062414.575715] sd 14:0:5:0: [sdf] tag#2120 FAILED Result: hostbyte=DID_OK driverbyte=DRIVER_OK cmd_age=1s\n[14062414.575722] sd 14:0:5:0: [sdf] tag#2120 Sense Key : Medium Error [current] [descriptor]\n[14062414.575725] sd 14:0:5:0: [sdf] tag#2120 Add. Sense: Unrecovered read error\n[14062414.575728] sd 14:0:5:0: [sdf] tag#2120 CDB: Read(16) 88 00 00 00 00 01 09 7c d9 50 00 00 00 80 00 00\n[14062414.575730] critical medium error, dev sdf, sector 4454144360 op 0x0:(READ) flags 0x0 phys_seg 13 prio class 2\n"})}),"\n",(0,n.jsx)(s.p,{children:"It may also be displayed in the health details of Ceph."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"$ ceph -s\n[...]\n    health: HEALTH_WARN\n            Too many repaired reads on 1 OSDs\n[...]\n\n$ ceph health detail\nHEALTH_WARN Too many repaired reads on 1 OSDs\n[WRN] OSD_TOO_MANY_REPAIRS: Too many repaired reads on 1 OSDs\n    osd.17 had 13 reads repaire\n"})}),"\n",(0,n.jsxs)(s.p,{children:["In this case the block device ",(0,n.jsx)(s.code,{children:"sdf"})," is in the storage node ",(0,n.jsx)(s.code,{children:"sto1001"}),". The OSD assigned\nto this block device can be determined."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"$ ceph device ls | grep 'sto1001:sdf'\nSEAGATE_ST16000NM004J_ZR604ZDZ0000C210PWE9  sto1001:sdf      osd.17\n"})}),"\n",(0,n.jsx)(s.p,{children:"If you only know the OSD ID, you can also determine the associated block device and the storage node."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"$ ceph device ls | grep osd.17\n[...]\nSEAGATE_ST16000NM004J_ZR604ZDZ0000C210PWE9  sto1001:sdf      osd.17\n"})}),"\n",(0,n.jsx)(s.p,{children:"The broken OSD can be removed from the Ceph cluster. The Ceph cluster is then rebalanced.\nThis can take some time and cause a high level of activity on the Ceph cluster."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"$ ceph osd out osd.17\nmarked out osd.17.\n"})}),"\n",(0,n.jsx)(s.p,{children:"On the storage node disable the OSD service for the OSD."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"$ sudo systemctl stop ceph-osd@17.service\n"})})]})}function a(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,s,o)=>{o.d(s,{Z:()=>i,a:()=>t});var n=o(7294);const r={},d=n.createContext(r);function t(e){const s=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),n.createElement(d.Provider,{value:s},e.children)}}}]);