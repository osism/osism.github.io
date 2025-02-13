"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[6933],{2963:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"cloud-in-a-box/running-on-a-virtual-machine","title":"Running on a virtual machine","description":"KVM","source":"@site/docs/cloud-in-a-box/running-on-a-virtual-machine.md","sourceDirName":"cloud-in-a-box","slug":"/cloud-in-a-box/running-on-a-virtual-machine","permalink":"/de/docs/cloud-in-a-box/running-on-a-virtual-machine","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/cloud-in-a-box/running-on-a-virtual-machine.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Cloud in a Box","permalink":"/de/docs/cloud-in-a-box/"},"next":{"title":"Testbed","permalink":"/de/docs/testbed"}}');var t=i(4848),l=i(8453);const a={},r="Running on a virtual machine",o={},d=[{value:"KVM",id:"kvm",level:2},{value:"Nested virtualization",id:"nested-virtualization",level:3},{value:"EFI",id:"efi",level:3},{value:"SCSI",id:"scsi",level:3},{value:"Disk space saving",id:"disk-space-saving",level:3},{value:"QEMU guest agent",id:"qemu-guest-agent",level:3},{value:"VMware vSphere/ESXi",id:"vmware-vsphereesxi",level:2},{value:"Guest OS:",id:"guest-os",level:3},{value:"Hardware:",id:"hardware",level:3},{value:"VirtualBox",id:"virtualbox",level:2},{value:"General:",id:"general",level:3},{value:"System:",id:"system",level:3},{value:"Storage:",id:"storage",level:3}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"running-on-a-virtual-machine",children:"Running on a virtual machine"})}),"\n",(0,t.jsx)(n.h2,{id:"kvm",children:"KVM"}),"\n",(0,t.jsx)(n.h3,{id:"nested-virtualization",children:"Nested virtualization"}),"\n",(0,t.jsx)(n.p,{children:"You likely want to run virtual machines on top of your Cloud in a Box.\nThe host machine has to support and enabled nested virtualization."}),"\n",(0,t.jsxs)(n.p,{children:["To enable nested virtualization the CPU configuration of the VM has to be ",(0,t.jsx)(n.code,{children:"host-passthrough"})," or ",(0,t.jsx)(n.code,{children:"host-model"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://docs.fedoraproject.org/en-US/quick-docs/using-nested-virtualization-in-kvm/",children:"Enabling nested virtualization in Fedora"})}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"The linked guide can be used in other distributions as well."}),"\n",(0,t.jsx)(n.h3,{id:"efi",children:"EFI"}),"\n",(0,t.jsx)(n.p,{children:"Chose an EFI firmware instead of classical BIOS to ensure the booting from the disk with the GPT\npartition table works."}),"\n",(0,t.jsx)(n.h3,{id:"scsi",children:"SCSI"}),"\n",(0,t.jsxs)(n.p,{children:["Use the ",(0,t.jsx)(n.code,{children:"-1.iso"})," variant that installs to a SCSI disk ",(0,t.jsx)(n.code,{children:"/dev/sda"})," and chose the virtio-scsi controller\nin the VM configuration. In a libvirt configuration file, this will look like this (this bus number of\ncourse depends on the other virtual PCI devices):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xml",children:"    <controller type='scsi' index='0' model='virtio-scsi'>\n      <address type='pci' domain='0x0000' bus='0x07' slot='0x00' function='0x0'/>\n    </controller>\n"})}),"\n",(0,t.jsx)(n.h3,{id:"disk-space-saving",children:"Disk space saving"}),"\n",(0,t.jsxs)(n.p,{children:["When using Cloud in a Box in a VM, you can utilize the qcow2 disk image or similar technology to save space.\nIn that case, the base installation requires just around 70 GB instead of a full 1 TB.\n(",(0,t.jsx)(n.em,{children:"The drive still needs to be made with a capacity of at least 1TB; however, the actual disk space usage is lower."}),")"]}),"\n",(0,t.jsxs)(n.p,{children:['Also in case you want to experiment a bit more and "hack around" using the manual installation\nyou can make disk snapshots when turned off after the Ubuntu installs, ',(0,t.jsx)(n.code,{children:"bootstrap.sh"})," and ",(0,t.jsx)(n.code,{children:"deploy.sh"})," to speed up your\nprogress."]}),"\n",(0,t.jsx)(n.p,{children:"If you use qemu, you can use following command to do snapshots."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'sudo virsh snapshot-create-as --domain cib bootstrap "run of bootstrap.sh" --disk-only --diskspec sda,snapshot=external,file=/var/lib/libvirt/images/ub2022_cib_boostrap.qcow2 --atomic\n'})}),"\n",(0,t.jsx)(n.h3,{id:"qemu-guest-agent",children:"QEMU guest agent"}),"\n",(0,t.jsx)(n.p,{children:"When running inside QEMU, it may be worth it to install the QEMU guest agent."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo apt -y install qemu-guest-agent\nsudo systemctl enable qemu-guest-agent\nsudo systemctl start qemu-guest-agent\n"})}),"\n",(0,t.jsx)(n.h2,{id:"vmware-vsphereesxi",children:"VMware vSphere/ESXi"}),"\n",(0,t.jsx)(n.p,{children:"When running Cloud in a Box on a VMware vSphere/ESXi virtual machine, you can use the below specs to configure the virtual machine:"}),"\n",(0,t.jsx)(n.h3,{id:"guest-os",children:"Guest OS:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Compatibility set to current running vSphere/ESXi version"}),"\n",(0,t.jsx)(n.li,{children:'Guest OS family set to "Linux"'}),"\n",(0,t.jsx)(n.li,{children:'Guest OS version set to "Ubuntu Linux (64-bit)"'}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"hardware",children:"Hardware:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"32GB RAM"}),"\n",(0,t.jsx)(n.li,{children:"8 vCores"}),"\n",(0,t.jsx)(n.li,{children:"SCSI Controller 0 set to LSI Logic Parallel"}),"\n",(0,t.jsx)(n.li,{children:"SCSI Disk with 500GB"}),"\n",(0,t.jsx)(n.li,{children:"CDROM/DVD drive mounted with ubuntu-autoinstall-cloud-in-a-box-1.iso image"}),"\n",(0,t.jsx)(n.li,{children:'Firmware set to "EFI" (VM Options > Boot Options > Firmware > choose EFI)'}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"This configuration has been successfully tested with VMware ESXi 7.0 U1."}),"\n",(0,t.jsx)(n.h2,{id:"virtualbox",children:"VirtualBox"}),"\n",(0,t.jsx)(n.p,{children:"When running Cloud in a Box on a VirtualBox, you can use the the blow specs for configure the virtual machine:"}),"\n",(0,t.jsx)(n.h3,{id:"general",children:"General:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Type Linux"}),"\n",(0,t.jsx)(n.li,{children:"Version Ubuntu (64-bit)"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"system",children:"System:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"32GB RAM"}),"\n",(0,t.jsx)(n.li,{children:"8 Processors"}),"\n",(0,t.jsx)(n.li,{children:"Enable PAE/NX"}),"\n",(0,t.jsx)(n.li,{children:"Enable Nested VT-x/AMD-v"}),"\n",(0,t.jsx)(n.li,{children:"Extended Feature: Enable EFI (special OSes only)"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"storage",children:"Storage:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Controller: SATA"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Type AHCI"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Use Host I/O Cache"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Disc Size 600 GB"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Controller: IDE"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Optical Drive: IDE Secondary Device"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Live CD/DVD"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Insert the ubuntu-autoinstall-cloud-in-a-box-1.iso image"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Boot Order:  Set Optical as first boot device"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"This configuration has been successfully tested with VirtualBox 6.1.50 using an Ubuntu 22.04 Host with HWE Kernel 6.5.0\nThe more CPU, RAM and Disc the better, as this is the bare minimum for a basic installation."})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var s=i(6540);const t={},l=s.createContext(t);function a(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);