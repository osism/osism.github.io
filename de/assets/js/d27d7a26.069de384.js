"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9540],{5660:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var o=t(5893),s=t(1151);const i={sidebar_label:"Migrate from VMware ESXi to OpenStack"},r="Migrate from VMware ESXi to OpenStack",a={id:"guides/user-guide/migration-vmware-esxi",title:"Migrate from VMware ESXi to OpenStack",description:"This guide is an example of how to perform a manual migration from a VMware ESXi host to OpenStack.",source:"@site/docs/guides/user-guide/migration-vmware-esxi.md",sourceDirName:"guides/user-guide",slug:"/guides/user-guide/migration-vmware-esxi",permalink:"/de/docs/guides/user-guide/migration-vmware-esxi",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/user-guide/migration-vmware-esxi.md",tags:[],version:"current",frontMatter:{sidebar_label:"Migrate from VMware ESXi to OpenStack"},sidebar:"tutorialSidebar",previous:{title:"User Guide",permalink:"/de/docs/guides/user-guide/"},next:{title:"OpenStack",permalink:"/de/docs/guides/user-guide/openstack/"}},c={},d=[{value:"Scenario",id:"scenario",level:2},{value:"Requirements",id:"requirements",level:2},{value:"Prechecks",id:"prechecks",level:2},{value:"Migration",id:"migration",level:2},{value:"How to copy vmdk images",id:"how-to-copy-vmdk-images",level:3},{value:"How to convert vmdk to raw",id:"how-to-convert-vmdk-to-raw",level:3},{value:"Edit the raw Images (optional)",id:"edit-the-raw-images-optional",level:3},{value:"How to import Images",id:"how-to-import-images",level:3},{value:"How to create your server",id:"how-to-create-your-server",level:3},{value:"Show your new server",id:"show-your-new-server",level:3},{value:"How to access the VNC console",id:"how-to-access-the-vnc-console",level:3},{value:"Last words",id:"last-words",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"migrate-from-vmware-esxi-to-openstack",children:"Migrate from VMware ESXi to OpenStack"})}),"\n",(0,o.jsx)(n.p,{children:"This guide is an example of how to perform a manual migration from a VMware ESXi host to OpenStack.\nMigration to OpenStack always depends very much on the use case. It is not possible to document an\napproach or to write a tool that works for all use cases. This guide shows one possible way. There are many ways to\nperform a migration. A migration must always be carefully prepared and tested in advance."}),"\n",(0,o.jsxs)(n.p,{children:["At this point, we would also like to point out the open source project\n",(0,o.jsx)(n.a,{href:"https://github.com/cloudbase/coriolis",children:"cloudbase/coriolis"})," from Cloudbase. There are also commercial\nproviders that perform migration from VMware ESXi to OpenStack. One of the offerings is\n",(0,o.jsx)(n.a,{href:"https://hystax.com/cloud-migration/",children:"Hystax Acura Live Cloud Migration"}),".\n",(0,o.jsx)(n.a,{href:"https://github.com/vexxhost/migratekit",children:"Migratekit"})," from Vexxhost is another option for migrating VMWare to OpenStack."]}),"\n",(0,o.jsxs)(n.p,{children:["A good overview and comparison of VMWare resources and their OpenStack counterparts is available ",(0,o.jsx)(n.a,{href:"https://www.openstack.org/vmware-migration-to-openstack",children:"here"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"scenario",children:"Scenario"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Source: ESXi 7.0 host"}),"\n",(0,o.jsx)(n.li,{children:"Destination: OpenStack"}),"\n",(0,o.jsxs)(n.li,{children:["a security group (",(0,o.jsx)(n.code,{children:"web_ssh"}),") is already available at the destination"]}),"\n",(0,o.jsx)(n.li,{children:"a Linux converter host is installed and ready, we also have root access to it"}),"\n",(0,o.jsxs)(n.li,{children:["an IPv4 address (",(0,o.jsx)(n.code,{children:"10.50.40.230"}),") will be given manually out of a preconfigured network"]}),"\n",(0,o.jsx)(n.li,{children:"we migrate one host with a kernel newer then 2.6.25 with two scsi harddrives attached and one networkcard"}),"\n",(0,o.jsx)(n.li,{children:"destination openstack using Libvirt/KVM as virtualisation"}),"\n",(0,o.jsx)(n.li,{children:"the converter host has access to ESXi and the OpenStack environment over IP network"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"VMware credentials"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"SSH enabled on ESXi host"}),"\n",(0,o.jsx)(n.li,{children:"access to the webinterface of the ESXi host"}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"OpenStack credentials"}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Linux packages installed on the coverter, in this case it is an Ubuntu 22.04"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"apt-get install qemu-utils python3-openstackclient\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"twice the space of the largest vmdk disc image on the converter or nfs access to the image files with enough storage"}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"prechecks",children:"Prechecks"}),"\n",(0,o.jsxs)(n.p,{children:["Check the ",(0,o.jsx)(n.code,{children:"/etc/fstab"})," file of your VMware ESXi host you want to move. See how all the discs or paritions are mounted.\nIf they are all mounted by LVM or UUID you do not need to change anything."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-txt",metastring:'title="cat /etc/fstab"',children:"/dev/mapper/vg00-lvroot /               ext4    errors=remount-ro 0       1\n/dev/mapper/vg00-lvboot /boot           ext2    defaults        0       2\n/dev/mapper/vg00-lvhome /home           ext4    defaults        0       2\n/dev/mapper/vg00-lvvar /var             ext4    defaults        0       2\n/dev/mapper/vg00-lvswap none            swap    sw              0       0\n/dev/mapper/vgdata-lvsrv /srv           ext4    defaults        0       2\n"})}),"\n",(0,o.jsxs)(n.p,{children:["If they are mounted like ",(0,o.jsx)(n.code,{children:"/dev/sda"})," it is better to change the ",(0,o.jsx)(n.code,{children:"/etc/fstab"})," to UUID mounting using ",(0,o.jsx)(n.code,{children:"blkid"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Replace these entries with ",(0,o.jsx)(n.code,{children:"UUID=filesystems_uuid"})," and add the rest of the line same as with the devicenames."]}),"\n",(0,o.jsx)(n.p,{children:"Example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-txt",metastring:'title="example devicename fstab"',children:"/dev/sda1 /boot     ext2  defaults          0       2\n/dev/sda2 /         ext4  errors=remount-ro 0       1\n"})}),"\n",(0,o.jsx)(n.p,{children:"Change it to something like this:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-txt",metastring:'title="example uuid fstab"',children:"UUID=574c96bf-f2cb-49b8-9196-232a24047f94 /boot     ext2  defaults          0       2\nUUID=93cc3b34-36c3-422e-b7a6-c80439e8f431 /         ext4  errors=remount-ro 0       1\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"caution",children:(0,o.jsxs)(n.p,{children:["When creating a new server, OpenStack uses ",(0,o.jsx)(n.code,{children:"/dev/vd*"})," or ",(0,o.jsx)(n.code,{children:"/dev/sd*"})," as devices for volumes.\nUsing UUID/LVM mounts will ensure that the kernel will find your devices while booting.\nUsing old device names may lead to the boot sequence to get stuck, due to missing devices."]})}),"\n",(0,o.jsx)(n.p,{children:"Also check your NIC interface configuration as the devicenames can change to a new devicename."}),"\n",(0,o.jsx)(n.p,{children:"This depends on the udev or systemd setup of your specific system."}),"\n",(0,o.jsx)(n.p,{children:"It needs to be changed to either DCHP if you want to use floating IPs or static IP of the new network."}),"\n",(0,o.jsx)(n.h2,{id:"migration",children:"Migration"}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"Shutdown the host in VMware as the movement is only possible while the host is offline.\nOtherwise you will get corrupted disc files."})}),"\n",(0,o.jsxs)(n.p,{children:["You can use either the webinterface or SSH to identify and copy the ",(0,o.jsx)(n.code,{children:"*.vmdk"})," files of your VMware ESXi host."]}),"\n",(0,o.jsx)(n.p,{children:"While using the web interface you need to locate the datastore and the directoy where the disc files are\nlocated and start downloading all vmdk files. You will always get files files for a disc, a smaller and a\nlarger one, both are required."}),"\n",(0,o.jsxs)(n.p,{children:["When using SSh, please also copy both vmdk files for the disc to the converter host. Start looking up your\nfiles under ",(0,o.jsx)(n.code,{children:"/vmfs/volumes/"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"how-to-copy-vmdk-images",children:"How to copy vmdk images"}),"\n",(0,o.jsx)(n.p,{children:"Example SSH copy and path of all vmdk files to the converter host using the scp command for our testing-host:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"scp user@vmhost:/vmfs/volumes/datastore1/testing-host/*.vmdk .\n"})}),"\n",(0,o.jsx)(n.p,{children:"After copying is finished, we find several vmdk files in our directory.\nWe copied two disc images:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"testing-host-disc0-flat.vmdk testing-host-disc1.vmdk\ntesting-host-disc0.vmdk      testing-host-disc1-flat.vmdk\n"})}),"\n",(0,o.jsx)(n.h3,{id:"how-to-convert-vmdk-to-raw",children:"How to convert vmdk to raw"}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsx)(n.p,{children:"Now convert those vmdk files into raw images with the following flags:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"-p show progress (optional)\n-f Input Format\n-O Output Format\n"})}),(0,o.jsx)(n.p,{children:"Raw files are required to import images into OpenStack."})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"qemu-img convert -p -f vmdk -O raw testing-host-disc0.vmdk testing-host-disc0.raw\n"})}),"\n",(0,o.jsx)(n.p,{children:"Repeat this step for each disc image you need to convert."}),"\n",(0,o.jsx)(n.h3,{id:"edit-the-raw-images-optional",children:"Edit the raw Images (optional)"}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"This step is completely optional and you should have some Linux knowledge to do this."})}),"\n",(0,o.jsx)(n.p,{children:"After converting the images of a Linux host, you now have the possibilty to edit some settings offline before importing the images into OpenStack."}),"\n",(0,o.jsx)(n.p,{children:"By mounting the raw image files you can edit the configuration files to, e.g.:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"disable mountpoints at the fstab, like nfs server"}),"\n",(0,o.jsx)(n.li,{children:"change the ip config of the networkcard to dhcp or fixed ip"}),"\n",(0,o.jsx)(n.li,{children:"adjust resolv.conf"}),"\n",(0,o.jsx)(n.li,{children:"adjust routing"}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"On Ubuntu you can use losetup to mount the raw image as a loopdevice to mount it somewhere you have access to."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-txt",metastring:"example of mounting and raw image",children:"losetup -f -P testing-host-disc0.raw\nlosetup -l\n\nmount /dev/loop0p1 /mnt/test/\nor\nlvscan and mount the lvm volume\n"})}),"\n",(0,o.jsx)(n.h3,{id:"how-to-import-images",children:"How to import Images"}),"\n",(0,o.jsxs)(n.p,{children:["First of all you need your OpenStack credentials, having them in an ",(0,o.jsx)(n.code,{children:"my-project-openrc.sh"})," file and source them to your shell."]}),"\n",(0,o.jsx)(n.p,{children:"The openstack cli client is now able to connect to the cloud environment and do all the following steps."}),"\n",(0,o.jsx)(n.p,{children:"To get your credentials please check with your OpenStack provider."}),"\n",(0,o.jsxs)(n.p,{children:["If you want to preserve the ",(0,o.jsx)(n.code,{children:"/dev/sd*"})," device names of the mountpoints, you must inject the new image and add some properties while uploading it into the OpenStack environment or add them later on to the images with Horzion web interface or openstack cli client."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack image create --progress --property hw_disk_bus=scsi --property hw_scsi_model=virtio-scsi --property hw_watchdog_action=reset --disk-format raw --private --file testing-host-disc0.raw  testing-host-image-disc0\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack image list\n+--------------------------------------+------------------------------+--------+\n| ID                                   | Name                         | Status |\n+--------------------------------------+------------------------------+--------+\n| 2a12b545-5d09-4ca1-9a76-b57f8d2489be | testing-host-disc0           | active |\n| b34744f7-6ef6-4282-a001-08a06812e381 | testing-host-disc1           | active |\n+--------------------------------------+------------------------------+--------+\n"})}),"\n",(0,o.jsx)(n.h3,{id:"how-to-create-your-server",children:"How to create your server"}),"\n",(0,o.jsx)(n.p,{children:"The previously imported images need to be copied to a volume so the server is also able to evict to other hosts in the cluster,\nso lets create and start our server in OpenStack."}),"\n",(0,o.jsxs)(n.p,{children:["Select one flavor for the host, in this case ",(0,o.jsx)(n.code,{children:"SCS-8V-16"}),", which means 8 Virtual CPUs and 16GB of RAM, get a list of all your available flavors by executing\n",(0,o.jsx)(n.code,{children:"openstack flavor list"})," and select the best matching one."]}),"\n",(0,o.jsx)(n.p,{children:"As the images are 20GB, you tell openstack that you need a boot volume with a size of 20 and a block-device for the additional device also with a size of 20GB."}),"\n",(0,o.jsx)(n.p,{children:"In this guide there is already a security group which fits our needs, if not, create one or you will not be able to communicate with your new host."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack security group list\n+--------------------------------------+-----------------+------------------------------+----------------------------------+------+\n| ID                                   | Name            | Description                  | Project                          | Tags |\n+--------------------------------------+-----------------+------------------------------+----------------------------------+------+\n| 4fd1d060-bf1d-4f5a-8e80-fde975d41f5f | default         | Default security group       | c9aa53cc3c654692b14a8f81a88cfa2f | []   |\n| 73967e73-e8d5-4318-b621-a06e7496fec3 | web_ssh         | Webserver security group     | c9aa53cc3c654692b14a8f81a88cfa2f | []   |\n+--------------------------------------+-----------------+------------------------------+----------------------------------+------+\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The ",(0,o.jsx)(n.code,{children:"web_ssh"})," group will be attached to the server."]}),"\n",(0,o.jsx)(n.p,{children:"Now you need to tell which network you want to deploy your host on, optionally including a fixed IPv4 address."}),"\n",(0,o.jsxs)(n.p,{children:["You can repeat the ",(0,o.jsx)(n.code,{children:"--nic"})," for additional nics in your server, in this guide it's the my_corp_net."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack network list\n+--------------------------------------+-------------------+--------------------------------------+\n| ID                                   | Name              | Subnets                              |\n+--------------------------------------+-------------------+--------------------------------------+\n| 9688192e-11dd-4618-a18c-99d3267f630a | my_corp_net       | 0d502fdb-be73-457a-8678-79eb6088a9a1 |\n| 98842b77-c070-4532-a2a9-99d588c4e947 | internet          | 2dfc3916-972f-44d1-afdb-6f89488ef3a4 |\n| c846238a-b00a-4c73-87e3-3614d94f46fd | my_other_corp_net | b8210b4e-5d91-425a-b05c-ca5d4bf8329a |\n+--------------------------------------+-------------------+--------------------------------------+\n"})}),"\n",(0,o.jsx)(n.p,{children:"As last parameter, you give the server name of your migrated system."}),"\n",(0,o.jsx)(n.p,{children:"As we are starting an already configured system we do not need to inject SSH keys or passwords as they should already be present on the host."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack server create --flavor SCS-8V-16 \\\n --image 2a12b545-5d09-4ca1-9a76-b57f8d2489be --boot-from-volume 20 \\\n --security-group 73967e73-e8d5-4318-b621-a06e7496fec3 \\\n --nic net-id=9688192e-11dd-4618-a18c-99d3267f630a,v4-fixed-ip=10.50.40.230 \\\n --block-device uuid=b34744f7-6ef6-4282-a001-08a06812e381,source_type=image,destination_type=volume,volume_size=20 \\\n --os-compute-api-version 2.90 testing-host\n"})}),"\n",(0,o.jsx)(n.h3,{id:"show-your-new-server",children:"Show your new server"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack server list\n+--------------------------------------+------------------+---------+----------------------------------+--------------------------+-----------+\n| ID                                   | Name             | Status  | Networks                         | Image                    | Flavor    |\n+--------------------------------------+------------------+---------+----------------------------------+--------------------------+-----------+\n| 71a8b930-4212-434a-8891-afdeeb1802dc | testing-host     | ACTIVE  | my_network=10.50.40.230          | N/A (booted from volume) | SCS-8V-16 |\n+--------------------------------------+------------------+---------+----------------------------------+--------------------------+-----------+\n"})}),"\n",(0,o.jsx)(n.p,{children:"To see the attached volumes and their mountpoints:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack server volume list 71a8b930-4212-434a-8891-afdeeb1802dc\n+----------+--------------------------------------+--------------------------------------+------+------------------------+--------------------------------------+--------------------------------------+\n| Device   | Server ID                            | Volume ID                            | Tag  | Delete On Termination? | Attachment ID                        | BlockDeviceMapping UUID              |\n+----------+--------------------------------------+--------------------------------------+------+------------------------+--------------------------------------+--------------------------------------+\n| /dev/sda | 71a8b930-4212-434a-8891-afdeeb1802dc | 71902b03-48ea-483c-a6a3-6c47b9d8537b | None | False                  | 3cd241ff-5296-4bb1-9ba0-d743cb8c8f31 | 2d08e835-156f-4f71-8c95-7ff828230b8e |\n| /dev/sdb | 71a8b930-4212-434a-8891-afdeeb1802dc | 15a835a3-5149-49a8-8e2b-a81ef8097c35 | None | False                  | 9deeb06b-718b-49d4-84a4-87dabc34ba56 | 04483f95-0333-4b37-92e6-db604e4ddc7c |\n+----------+--------------------------------------+--------------------------------------+------+------------------------+--------------------------------------+--------------------------------------+\n"})}),"\n",(0,o.jsx)(n.h3,{id:"how-to-access-the-vnc-console",children:"How to access the VNC console"}),"\n",(0,o.jsx)(n.p,{children:"To get the VNC URL for console login use:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"openstack console url show 71a8b930-4212-434a-8891-afdeeb1802dc\n+----------+-------------------------------------------------------------------------------------------+\n| Field    | Value                                                                                     |\n+----------+-------------------------------------------------------------------------------------------+\n| protocol | vnc                                                                                       |\n| type     | novnc                                                                                     |\n| url      | https://vnc.your.cloud/vnc_lite.html?path=%3Ftoken%3Db9b6920d-e533-4728-8132-a5a0adfc24e5 |\n+----------+-------------------------------------------------------------------------------------------+\n"})}),"\n",(0,o.jsx)(n.p,{children:"This will print out the VNC URL for the videoconsole connection to your host."}),"\n",(0,o.jsx)(n.p,{children:"Now the server will boot and be available."}),"\n",(0,o.jsx)(n.p,{children:"Maybe you need to tweak the network setup if it is still not accessible.\nTo do this, you could use the VNC console of the OpenStack host:"}),"\n",(0,o.jsx)(n.p,{children:"Login and then setup the network card if you have not already done that before host had been shutdown."}),"\n",(0,o.jsx)(n.p,{children:"You now can remove the imported images, as they are no longer required - except you want to generate\nanother host with the same images."}),"\n",(0,o.jsx)(n.h2,{id:"last-words",children:"Last words"}),"\n",(0,o.jsx)(n.p,{children:"In this little guide, we only can give a sneak peak of what you need to do with a simple VMware ESXi host.\nMore complex setups needs consulting, planning and testing as there a several scenarios out there which\ncannot be handled like this.\nEspecially if you have terrabytes of data to move or graphics- or AIcards in you VMware ESXi hosts."})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>r});var o=t(7294);const s={},i=o.createContext(s);function r(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);