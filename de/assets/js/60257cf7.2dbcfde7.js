"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[833],{2759:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>a});var s=t(5893),i=t(1151);const l={sidebar_label:"Cloud in a Box Guide"},o="Cloud in a Box - CiaB",r={id:"guides/other-guides/cloud-in-a-box/index",title:"Cloud in a Box - CiaB",description:"\ud83d\udca1 Cloud in a Box (CiaB) is a minimalistic installation of the latest stable OSISM release with only services which are needed to",source:"@site/docs/guides/other-guides/cloud-in-a-box/index.md",sourceDirName:"guides/other-guides/cloud-in-a-box",slug:"/guides/other-guides/cloud-in-a-box/",permalink:"/de/docs/guides/other-guides/cloud-in-a-box/",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/other-guides/cloud-in-a-box/index.md",tags:[],version:"current",frontMatter:{sidebar_label:"Cloud in a Box Guide"},sidebar:"tutorialSidebar",previous:{title:"Other Guides",permalink:"/de/docs/guides/other-guides/"},next:{title:"Running on a virtual machine",permalink:"/de/docs/guides/other-guides/cloud-in-a-box/running-on-a-virtual-machine"}},d={},a=[{value:"Requirements",id:"requirements",level:2},{value:"Types",id:"types",level:2},{value:"Installation",id:"installation",level:2},{value:"Automated installation (recommended)",id:"automated-installation-recommended",level:3},{value:"Manual installation",id:"manual-installation",level:3},{value:"Usage",id:"usage",level:2},{value:"Wireguard VPN service access",id:"wireguard-vpn-service-access",level:3},{value:"Webinterfaces",id:"webinterfaces",level:3},{value:"Command-line interfaces",id:"command-line-interfaces",level:3},{value:"Import of additional images",id:"import-of-additional-images",level:3},{value:"Upgrade",id:"upgrade",level:3},{value:"Customisations",id:"customisations",level:2},{value:"Use of 2nd NIC for external network",id:"use-of-2nd-nic-for-external-network",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Development",id:"development",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"cloud-in-a-box---ciab",children:"Cloud in a Box - CiaB"})}),"\n",(0,s.jsx)(n.p,{children:"\ud83d\udca1 Cloud in a Box (CiaB) is a minimalistic installation of the latest stable OSISM release with only services which are needed to\nmake it work with Kubernetes. It is intended for use as a development\nsystem on bare-metal or for use in edge environments."}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsxs)(n.p,{children:["At the moment the secrets are stored in plain text in the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box",children:"osism/cloud-in-a-box"}),"\nrepository and are not secure. Do not use for public accessible systems. In the future, the secrets will be generated automatically."]})}),"\n",(0,s.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,s.jsx)(n.p,{children:"The system to be used as Cloud in a Box must fulfill these minimum requirements."}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Type of resource"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Amount"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Note"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"CPU"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"at least 1 socket with 4 cores"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"More is better here. This is the minimum where you can't use much payload (LBaaS, VMs). The use of Kubernetes with Cluster API is not possible with this minimum size."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"RAM"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"at least 32 GByte"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"More is better here. In principle, it also works with 8 GByte, but then no payload (LBaaS, VMs) can be used. Kubernetes with Cluster API cannot be used then."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Storage"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"at least 1 TByte"}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:["Has to be available as ",(0,s.jsx)(n.code,{children:"/dev/sda"})," or ",(0,s.jsx)(n.code,{children:"/dev/nvme0n1"}),". Less than 1 TByte is also possible, the smaller the less storage is available for use in Ceph."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Network"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"at least 1 network interface (DHCP and internet access)"}),(0,s.jsxs)(n.td,{style:{textAlign:"left"},children:["An optional ",(0,s.jsx)(n.a,{href:"#use-of-2nd-nic-for-external-network",children:"2nd network interface can be used for external connectivity"}),"."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"USB stick"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"at least 2 GByte"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Installation media for Cloud in a Box bootstrapping"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"types",children:"Types"}),"\n",(0,s.jsx)(n.p,{children:"There are two types of Cloud in a Box."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.strong,{children:"sandbox"})," type is intended for developers and demonstrations. A full OSISM installation\nis one there which also includes Ceph and OpenSearch, for example. In the course of the\ninstallation, necessary images, networks, etc. are also created."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.strong,{children:"edge"})," type is intended to be deployed as an appliance to provide an edge cloud on a\nsingle node. Compared to the sandbox, certain services are not provided there or are\nimplemented differently. For example, OpenSearch is not deployed because the logs are\ndelivered to a central location. The storage backend will also be implemented differently there\nin the future instead of Ceph."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.h3,{id:"automated-installation-recommended",children:"Automated installation (recommended)"}),"\n",(0,s.jsxs)(n.p,{children:["The images currently download and install the\n",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box",children:"latest state of the installation scripts"}),",\ntherefore it is mandatory to update the installation media at least when the underlying Ubuntu operating\nsystem release changes. The installation of older releases is currently not supported."]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Download one of the Cloud in a Box images of type sandbox"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://swift.services.a.regiocloud.tech/swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/osism-node-image/ubuntu-autoinstall-cloud-in-a-box-1.iso",children:"ubuntu-autoinstall-cloud-in-a-box-1.iso"})," (with first block device as ",(0,s.jsx)(n.code,{children:"/dev/sda"}),")"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://swift.services.a.regiocloud.tech/swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/osism-node-image/ubuntu-autoinstall-cloud-in-a-box-2.iso",children:"ubuntu-autoinstall-cloud-in-a-box-2.iso"})," (with first block device as ",(0,s.jsx)(n.code,{children:"/dev/nvme0n1"}),")"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Use a tool like ",(0,s.jsx)(n.a,{href:"https://etcher.balena.io",children:"balenaEtcher"})," or ",(0,s.jsx)(n.code,{children:"dd"})," to create a bootable USB stick with the Cloud\nin a Box image."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Boot from the USB stick. Make sure that the boot from USB is activated in the BIOS."}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"When booting from this USB stick, all data on the hard disks will be destroyed\nwithout confirmation."})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The installation of the operating system (Ubuntu 22.04) will start and take a few minutes. After that the system\nwill shutdown."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The first start of the system"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Remove the USB storage device\n(The USB stick is only needed again if the Cloud in a Box system is to be fully reinstalled.)"}),"\n",(0,s.jsx)(n.li,{children:"Connect the first network interface to an ethernet interface that provides access to the internet via DHCP configuration"}),"\n",(0,s.jsx)(n.li,{children:"Boot the system from the internal hard disk device"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"The deployment will start. This takes some time and the system will shutdown when the\ndeployment is finished. This takes roughly an hour, possibly longer depending on the\nhardware and internet connection."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Start the system again. System is ready for use, by default DHCP is tried on the first network device."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Login via SSH. Use the user ",(0,s.jsx)(n.code,{children:"dragon"})," with the password ",(0,s.jsx)(n.code,{children:"password"}),".\n(You can obtain the ip address by inspecting the logs of your dhcp server or from the ",(0,s.jsx)(n.em,{children:"issue text"})," of the virtual consoles of the system)"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"ssh dragon@IP_FROM_YOUR_SERVER\npasswd\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"CiaB Issue Text",src:t(9028).Z+"",width:"420",height:"109"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"manual-installation",children:"Manual installation"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Follow the ",(0,s.jsx)(n.a,{href:"../../deploy-guide/provisioning",children:"provisioning guide"}),",\nskip the part about disk layout and do it this way:"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Disk layout",src:t(6247).Z+"",width:"1033",height:"769"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Create a 1 GByte ext4 partition mounted in ",(0,s.jsx)(n.code,{children:"/boot"})]}),"\n",(0,s.jsx)(n.li,{children:"Create a 8 GByte swap partition"}),"\n",(0,s.jsx)(n.li,{children:"Create a 120 GByte unformatted partition"}),"\n",(0,s.jsxs)(n.li,{children:["Use a ",(0,s.jsx)(n.code,{children:"Create volume group (LVM)"})," to create a volume group called ",(0,s.jsx)(n.code,{children:"system"})," with the size of\n120 GByte on the partition 4 you just created"]}),"\n",(0,s.jsxs)(n.li,{children:["Create a logical volume by selecting the ",(0,s.jsx)(n.code,{children:"Free Space"})," option under ",(0,s.jsx)(n.code,{children:"system"})," LVM. This volume\nshould be mounted in ",(0,s.jsx)(n.code,{children:"/"})," and have size of 100 GByte"]}),"\n",(0,s.jsx)(n.li,{children:"Create a partition with the size of the rest of the drive's space"}),"\n",(0,s.jsxs)(n.li,{children:["Create a new LVM volume group on partition 5 called ",(0,s.jsx)(n.code,{children:"osd-vg"})," (will be used for Ceph)"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"After the Ubuntu installation, the system will be rebooted"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Log into the machine via console to get its IP address and then use SSH to connect to the machine"}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Clone the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box",children:"osism/cloud-in-a-box"})," repository into ",(0,s.jsx)(n.code,{children:"/opt/cloud-in-a-box"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo git clone https://github.com/osism/cloud-in-a-box /opt/cloud-in-a-box\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Disable conflicting services from the default Ubuntu installation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo /opt/cloud-in-a-box/cleanup.sh\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Install upgrades"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo apt update\nsudo apt upgrade\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Run the ",(0,s.jsx)(n.code,{children:"bootstrap.sh"})," script with the required ",(0,s.jsx)(n.a,{href:"#types",children:"type"})," (use of ",(0,s.jsx)(n.code,{children:"sandbox"})," is recommended)"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo /opt/cloud-in-a-box/bootstrap.sh sandbox\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Run the ",(0,s.jsx)(n.code,{children:"deploy.sh"})," script with the same type as in step 8 to deploy services like Ceph and OpenStack"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo /opt/cloud-in-a-box/deploy.sh sandbox\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Shutdown the system"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo shutdown -h now\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Start the system again. System is ready for use, by default DHCP is tried on the first network device."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Login via SSH. Use the user ",(0,s.jsx)(n.code,{children:"dragon"})," with the password ",(0,s.jsx)(n.code,{children:"password"}),".\n(You can obtain the ip address by inspecting the logs of your dhcp server or from the ",(0,s.jsx)(n.em,{children:"issue text"})," of the virtual consoles of the system)"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"ssh dragon@IP_FROM_YOUR_SERVER\npasswd\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"CiaB Issue Text",src:t(9028).Z+"",width:"420",height:"109"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["The scripts are not idempotent yet. In case there is any fail during ",(0,s.jsx)(n.code,{children:"bootstrap.sh"})," or ",(0,s.jsx)(n.code,{children:"deploy.sh"})," you have to\nstart over with fresh installation."]})}),"\n",(0,s.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(n.h3,{id:"wireguard-vpn-service-access",children:"Wireguard VPN service access"}),"\n",(0,s.jsxs)(n.p,{children:["Copy the ",(0,s.jsx)(n.code,{children:"/home/dragon/wireguard-client.conf"})," file from Cloud in a Box to your workstation. This is necessary\nfor using the web endpoints on your workstation. Rename the wireguard config file to something\nlike ",(0,s.jsx)(n.code,{children:"cloud-in-a-box.conf"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"If you want to connect to the Cloud in a Box system from multiple clients, change the client IP\naddress in the config file to be different on each client."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"scp dragon@IP_FROM_YOUR_SERVER:/home/dragon/wireguard-client.conf $HOME/cloud-in-a-box.conf\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Install wireguard on your workstation, if you have not done this before. For instructions how to do\nit on your workstation, please have a look on the documentation of your used distribution. The\nwireguard documentation you will find ",(0,s.jsx)(n.a,{href:"https://www.wireguard.com",children:"here"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Start the wireguard tunnel."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"sudo wg-quick up $HOME/cloud-in-a-box.conf\n"})}),"\n",(0,s.jsx)(n.h3,{id:"webinterfaces",children:"Webinterfaces"}),"\n",(0,s.jsx)(n.p,{children:"If you want to access the services please choose the URL from the following list:"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"URL"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Username"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Password"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Note"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"ARA"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://ara.services.in-a-box.cloud",children:"https://ara.services.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"ara"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Ceph"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"http://manager.systems.in-a-box.cloud:7000",children:"http://manager.systems.in-a-box.cloud:7000"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"admin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Flower"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://flower.services.in-a-box.cloud",children:"https://flower.services.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"-"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"-"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Grafana"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud:3000",children:"https://api.in-a-box.cloud:3000"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"admin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"HAProxy"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"http://manager.systems.in-a-box.cloud:1984",children:"http://manager.systems.in-a-box.cloud:1984"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"openstack"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Homer"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://homer.services.in-a-box.cloud",children:"https://homer.services.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"-"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"-"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Horizon - admin project"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud",children:"https://api.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"admin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"domain: default"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Horizon - test project"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud",children:"https://api.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"test"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"test"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"domain: test"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Netbox"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://netbox.services.in-a-box.cloud",children:"https://netbox.services.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"admin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Netdata"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"http://manager.systems.in-a-box.cloud:19999",children:"http://manager.systems.in-a-box.cloud:19999"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"-"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"-"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"OpenSearch Dashboards"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud:5601",children:"https://api.in-a-box.cloud:5601"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"opensearch"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"PhpMyAdmin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://phpmyadmin.services.in-a-box.cloud",children:"https://phpmyadmin.services.in-a-box.cloud"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"root"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Starting with OSISM 7, root_shard_0 is used as the user name"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"RabbitMQ"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud:15672",children:"https://api.in-a-box.cloud:15672"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"openstack"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Skyline - admin project"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud:9999",children:"https://api.in-a-box.cloud:9999"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"admin"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"password"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"Skyline - test project"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.a,{href:"https://api.in-a-box.cloud:9999",children:"https://api.in-a-box.cloud:9999"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"test"}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"test"}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]})]})]}),"\n",(0,s.jsx)(n.h3,{id:"command-line-interfaces",children:"Command-line interfaces"}),"\n",(0,s.jsx)(n.p,{children:"Login to Cloud in a Box as described in step 8 of the installation chapter."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Select one of the preconfigured environments:","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"system"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"admin"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"test"})}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Set the environment by exporting the environment variable: ",(0,s.jsx)(n.code,{children:"OS_CLOUD"}),":","\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"export OS_CLOUD=admin\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["Use ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/newton/user-guide/cli.html",children:"OpenStack CLI"})," via the command ",(0,s.jsx)(n.code,{children:"openstack"}),".","\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"openstack availability zone list\nopenstack image list\nopenstack server list # After installation there are no servers\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"import-of-additional-images",children:"Import of additional images"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"https://github.com/osism/openstack-image-manager/",children:"OpenStack Image Manager"})," is used to manage images.\nIn the example, the ",(0,s.jsx)(n.code,{children:"Garden Linux"})," image is imported."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"osism manage images --cloud=admin --filter 'Garden Linux'\n"})}),"\n",(0,s.jsxs)(n.p,{children:["All available images can be found in the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/openstack-image-manager/tree/main/etc/images",children:"osism/openstack-image-manager"})," repository."]}),"\n",(0,s.jsx)(n.h3,{id:"upgrade",children:"Upgrade"}),"\n",(0,s.jsx)(n.p,{children:"It is best to execute the commands within a screen session, it takes some time. Please note\nthat you cannot update the Ceph deployment at the moment. This will be enabled in the future."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"osism apply configuration\n/opt/configuration/upgrade.sh\ndocker system prune -a\n"})}),"\n",(0,s.jsx)(n.h2,{id:"customisations",children:"Customisations"}),"\n",(0,s.jsx)(n.h3,{id:"use-of-2nd-nic-for-external-network",children:"Use of 2nd NIC for external network"}),"\n",(0,s.jsx)(n.p,{children:"In the default configuration, the Cloud in a Box is built in such a way that an internal\nVLAN101 is used as an simulated external network and this is made usable via the 1st network\ninterface using masquerading. This makes it possible for instances running on the Cloud\nin a Box to reach the internet. The disadvantage of this is that the instances themselves\ncan only be reached via floating IP addresses from the Cloud in a Box system itself or\nvia the Wireguard tunnel. Especially in edge environments, however, one would usually like\nto have this differently and the instances should be directly accessible via the local\nnetwork."}),"\n",(0,s.jsx)(n.p,{children:"To make this work, first identify the name of a 2nd network card to be used."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"dragon@manager:~$ sudo lshw -class network -short\nH/W path          Device          Class          Description\n============================================================\n/0/100/2.2/0      eno7            network        Ethernet Connection X552 10 GbE SFP+\n/0/100/2.2/0.1    eno8            network        Ethernet Connection X552 10 GbE SFP+\n/0/100/1c/0       eno1            network        I210 Gigabit Network Connection\n/0/100/1c.1/0     eno2            network        I210 Gigabit Network Connection\n/0/100/1c.4/0     eno3            network        I350 Gigabit Network Connection\n/0/100/1c.4/0.1   eno4            network        I350 Gigabit Network Connection\n/0/100/1c.4/0.2   eno5            network        I350 Gigabit Network Connection\n/0/100/1c.4/0.3   eno6            network        I350 Gigabit Network Connection\n"})}),"\n",(0,s.jsxs)(n.p,{children:["In the following we use ",(0,s.jsx)(n.code,{children:"eno7"}),". Activate the device manually with  ",(0,s.jsx)(n.code,{children:"sudo ip link set up dev eno7"}),".\nThen check that a link is actually present."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"dragon@manager:~$ ethtool eno7\nSettings for eno7:\n\tSupported ports: [ FIBRE ]\n\tSupported link modes:   10000baseT/Full\n[...]\n\tLink detected: yes\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now this device is made permanently known in the network configuration. Select the MTU\naccordingly. For 1 GBit rather ",(0,s.jsx)(n.code,{children:"1500"})," than ",(0,s.jsx)(n.code,{children:"9100"}),". The 2nd network interface should be\nconfigured without IP configuration (neither static nor DHCP)."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"/opt/configuration/inventory/group_vars/generic/network.yml"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"/opt/configuration/environments/manager/group_vars/manager.yml"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"network_ethernets:\n  eno1:\n    dhcp4: true\n  eno7:\n    mtu: 9100\n"})}),"\n",(0,s.jsx)(n.p,{children:"Then, this change is deployed and applied."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"osism apply network\nsudo netplan apply\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now the configuration for Neutron and OVN is prepared. ",(0,s.jsx)(n.code,{children:"network_workload_interface"}),"\nis expanded by the 2nd network interface. The order is not random, first ",(0,s.jsx)(n.code,{children:"vlan101"}),"\nthen ",(0,s.jsx)(n.code,{children:"eno7"}),". ",(0,s.jsx)(n.code,{children:"neutron_bridge_name"})," is added."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"/opt/configuration/inventory/group_vars/generic/network.yml"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"/opt/configuration/environments/manager/group_vars/manager.yml"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'network_workload_interface: "vlan101,eno7"\nneutron_bridge_name: "br-ex,br-add"\n'})}),"\n",(0,s.jsx)(n.p,{children:"Then, this change is deployed."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"osism reconciler sync\nosism apply openvswitch\nosism apply ovn\nosism apply neutron\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now segments and/or subnets can be configured. In this case, ",(0,s.jsx)(n.code,{children:"eno7"})," is configured as an\nuntagged port on the remote side."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"/opt/configuration/environments/openstack/playbook-additional-public-network.yml"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"- name: Create additional public network\n  hosts: localhost\n  connection: local\n\n  tasks:\n    - name: Create additional public network\n      openstack.cloud.network:\n        cloud: admin\n        state: present\n        name: public-add\n        external: true\n        provider_network_type: flat\n        provider_physical_network: physnet2\n\n    - name: Create additional public subnet\n      openstack.cloud.subnet:\n        cloud: admin\n        state: present\n        name: subnet-public-add\n        network_name: public-add\n        cidr: 192.168.23.0/24\n        enable_dhcp: false\n        allocation_pool_start: 192.168.23.100\n        allocation_pool_end: 192.168.23.200\n        gateway_ip: 192.168.23.1\n        dns_nameservers:\n          - 8.8.8.8\n          - 9.9.9.9\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The additional public network can now be made known with\n",(0,s.jsx)(n.code,{children:"osism apply -e openstack additional-public-network"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["There is now a 2nd floating IP address pool with the name ",(0,s.jsx)(n.code,{children:"public-add"}),"\navailable for use. If instances are to be started directly in this network,\n",(0,s.jsx)(n.code,{children:"enable_dhcp: true"})," must be set. In this case, it should be clarified in\nadvance with the provider of the external network whether the use of DHCP\nis permitted there."]}),"\n",(0,s.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Broken disk setup",src:t(8284).Z+"",width:"2020",height:"1194"})}),"\n",(0,s.jsxs)(n.p,{children:["This error means that your disk setup is broken. Use ",(0,s.jsx)(n.code,{children:"cfdisk"})," and delete all partitions on\nthe system on which you want to install the Cloud in a Box image."]}),"\n",(0,s.jsxs)(n.p,{children:["With ",(0,s.jsx)(n.code,{children:"lsblk"})," you can verify if the partitions are empty."]}),"\n",(0,s.jsx)(n.h2,{id:"development",children:"Development"}),"\n",(0,s.jsx)(n.p,{children:"For the further development of the scripts and the mechanisms of the Cloud in a Box,\nyou need to know the following."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The operating system is brought onto the node via ",(0,s.jsx)(n.a,{href:"https://github.com/osism/node-image",children:"an automatic Ubuntu installation"}),"\nthat uses ",(0,s.jsx)(n.a,{href:"https://cloud-init.io",children:"cloud-init"})]}),"\n",(0,s.jsxs)(n.li,{children:["The installation starts the script ",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box/blob/main/init.sh",children:"init.sh"})," which performs\nan initial clone of the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box",children:"osism/cloud-in-a-box"})," repository and a checkout of\nthe ",(0,s.jsx)(n.code,{children:"main"})," branch. It also executes the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box/blob/main/deploy.sh",children:"deploy.sh"})," and\n",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box/blob/main/bootstrap.sh",children:"bootstrap.sh"})," scripts."]}),"\n",(0,s.jsxs)(n.li,{children:["The installation persists the kernel parameters of the initial boot to the file ",(0,s.jsx)(n.code,{children:"/etc/.initial-kernel-commandline"})]}),"\n",(0,s.jsxs)(n.li,{children:["The status and activities of the deployment are logged in ",(0,s.jsx)(n.code,{children:"/var/log/install-cloud-in-a-box.log"}),". For proper colors use ",(0,s.jsx)(n.code,{children:"less -r"}),".\nSearch for ",(0,s.jsx)(n.code,{children:"OVERALL STATUS"})," to find the result of the specific installation steps."]}),"\n",(0,s.jsxs)(n.li,{children:["Branch and location of the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/cloud-in-a-box",children:"osism/cloud-in-a-box"})," repository can be overriden\nby setting the kernel parameters ",(0,s.jsx)(n.code,{children:"ciab_repo_url"})," (a public repository address without authentication) and ",(0,s.jsx)(n.code,{children:"ciab_branch"}),"\n(a name of a branch, use only ASCII chars, ",(0,s.jsx)(n.code,{children:"-"}),", and ",(0,s.jsx)(n.code,{children:"_"}),")."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},6247:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/disk-layout-db64866af60ef6d2c41245db78dd15d1.png"},9028:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/issue-6cc9ac7387e0589d625dded707510641.png"},8284:(e,n,t)=>{t.d(n,{Z:()=>s});const s=t.p+"assets/images/screenshot1-c880f78ba33fc0577dce811dc2e42724.png"},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>o});var s=t(7294);const i={},l=s.createContext(i);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);