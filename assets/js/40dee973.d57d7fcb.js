"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7383],{2149:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var s=o(5893),t=o(1151);const i={sidebar_label:"Nova"},a="Nova",r={id:"guides/configuration-guide/openstack/nova",title:"Nova",description:"* Nova admin guide",source:"@site/docs/guides/configuration-guide/openstack/nova.md",sourceDirName:"guides/configuration-guide/openstack",slug:"/guides/configuration-guide/openstack/nova",permalink:"/docs/guides/configuration-guide/openstack/nova",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/openstack/nova.md",tags:[],version:"current",frontMatter:{sidebar_label:"Nova"},sidebar:"tutorialSidebar",previous:{title:"Neutron",permalink:"/docs/guides/configuration-guide/openstack/neutron"},next:{title:"Octavia",permalink:"/docs/guides/configuration-guide/openstack/octavia"}},d={},c=[{value:"Nested virtualisation",id:"nested-virtualisation",level:2},{value:"AMD",id:"amd",level:3},{value:"Intel",id:"intel",level:3},{value:"Reserve compute node resources",id:"reserve-compute-node-resources",level:2},{value:"Host memory",id:"host-memory",level:3},{value:"Host CPUs",id:"host-cpus",level:3},{value:"Dedicated cores for instances",id:"dedicated-cores-for-instances",level:2},{value:"Add NUMA topology filter to nova scheduler",id:"add-numa-topology-filter-to-nova-scheduler",level:3},{value:"Specify CPU cores to be used as dedicated cores",id:"specify-cpu-cores-to-be-used-as-dedicated-cores",level:3},{value:"Create flavors or images backed by dedicated cores",id:"create-flavors-or-images-backed-by-dedicated-cores",level:3},{value:"Mixing dedicated and shared cores on a compute node",id:"mixing-dedicated-and-shared-cores-on-a-compute-node",level:3},{value:"Mixing dedicated and shared cores in a nova instance",id:"mixing-dedicated-and-shared-cores-in-a-nova-instance",level:3},{value:"Creating images with special CPU requirements",id:"creating-images-with-special-cpu-requirements",level:3},{value:"Back instance memory by hugepages",id:"back-instance-memory-by-hugepages",level:2},{value:"Local SSD storage",id:"local-ssd-storage",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"nova",children:"Nova"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/admin/index.html",children:"Nova admin guide"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/index.html",children:"Nova configuration guide"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html",children:"Nova configuration reference"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"nested-virtualisation",children:"Nested virtualisation"}),"\n",(0,s.jsx)(n.h3,{id:"amd",children:"AMD"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'echo "options kvm-amd nested=y" | sudo tee /etc/modprobe.d/kvm-nested-virtualization.conf\nsudo modprobe -r kvm_amd\nsudo modprobe kvm_amd\ncat /sys/module/kvm_amd/parameters/nested\nY\ndocker restart nova_libvirt\n'})}),"\n",(0,s.jsx)(n.h3,{id:"intel",children:"Intel"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'echo "options kvm-intel nested=y" | sudo tee /etc/modprobe.d/kvm-nested-virtualization.conf\nsudo modprobe -r kvm_intel\nsudo modprobe kvm_intel\ncat /sys/module/kvm_intel/parameters/nested\nY\ndocker restart nova_libvirt\n'})}),"\n",(0,s.jsx)(n.h2,{id:"reserve-compute-node-resources",children:"Reserve compute node resources"}),"\n",(0,s.jsx)(n.p,{children:"How many resources you want to reserve on a compute node depends very much on which additional\nservices are running on the compute node."}),"\n",(0,s.jsx)(n.h3,{id:"host-memory",children:"Host memory"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_host_memory_mb",children:"https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_host_memory_mb"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/nova-compute.conf"',children:"[DEFAULT]\nreserved_host_memory_mb = 32768\n"})}),"\n",(0,s.jsx)(n.h3,{id:"host-cpus",children:"Host CPUs"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_host_cpus",children:"https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_host_cpus"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/nova-compute.conf"',children:"[DEFAULT]\nreserved_host_cpus = 4\n"})}),"\n",(0,s.jsx)(n.h2,{id:"dedicated-cores-for-instances",children:"Dedicated cores for instances"}),"\n",(0,s.jsxs)(n.p,{children:["This section will describe how to use dedicated cores for nova instances. There are a few configuration options involved, so please refer to ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/admin/cpu-topologies.html",children:"the upstream documentation"})," for a full overview of possible combinations and results."]}),"\n",(0,s.jsx)(n.h3,{id:"add-numa-topology-filter-to-nova-scheduler",children:"Add NUMA topology filter to nova scheduler"}),"\n",(0,s.jsxs)(n.p,{children:["Add the ",(0,s.jsx)(n.code,{children:"NUMATopologyFilter"})," to the list of enabled nova filters.\nThe filter makes the nova scheduler ",(0,s.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Non-uniform_memory_access",children:"NUMA"})," aware, so that the instance will have pinned cores from the same NUMA node.\nGet the list of currently enabled filters or use the list of ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#filter_scheduler.enabled_filters",children:"default filters"})," and add the ",(0,s.jsx)(n.code,{children:"NUMATopologyFilter"})," in the nova-scheduler config, e.g.:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/nova-scheduler.conf"',children:"[filter_scheduler]\nenabled_filters = ComputeFilter,ComputeCapabilitiesFilter,ImagePropertiesFilter,ServerGroupAntiAffinityFilter,ServerGroupAffinityFilter,NUMATopologyFilter\n"})}),"\n",(0,s.jsx)(n.p,{children:"Apply the configuration using the osism CLI on the manager"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply nova\n"})}),"\n",(0,s.jsx)(n.h3,{id:"specify-cpu-cores-to-be-used-as-dedicated-cores",children:"Specify CPU cores to be used as dedicated cores"}),"\n",(0,s.jsxs)(n.p,{children:["The nova compute service needs to be aware of which CPU threads should be used as dedicated cores on each hypervisor. The config option ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#compute.cpu_dedicated_set",children:"cpu_dedicated_set"})," is used to do that. It takes a comma-separated list of CPU threads, ranges or threads to exclude.\nBefore deciding on the set of dedicated cores assess the number of services and their required CPU load to exclude the required number of threads from the list.\nThe following example will leave thread 0 and 1 for the compute node and use ansible facts to extend the range to the other available threads:"]}),"\n",(0,s.jsxs)(n.p,{children:["Warning: Do ",(0,s.jsx)(n.strong,{children:"not"})," use ",(0,s.jsx)(n.code,{children:"ansible_processor_*"})," facts if you intend to use ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#libvirt.cpu_power_management_strategy",children:"cpu_power_management_strategy=cpu_state"})," as offline cores will not be shown and subsequent applies will result in a wrong range"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/nova-compute.conf"',children:"[compute]\ncpu_dedicated_set=2-{{ ansible_facts['processor_nproc'] - 1 }}\n"})}),"\n",(0,s.jsx)(n.p,{children:"You may use node specific configuration to override the dedicated set for specific compute nodes, e.g.:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/$INVENTORY_HOSTNAME/nova-compute.conf"',children:"[compute]\ncpu_dedicated_set=4-12,^8,15\n"})}),"\n",(0,s.jsx)(n.p,{children:"Apply the configuration using the osism CLI on the manager"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply nova\n"})}),"\n",(0,s.jsx)(n.h3,{id:"create-flavors-or-images-backed-by-dedicated-cores",children:"Create flavors or images backed by dedicated cores"}),"\n",(0,s.jsxs)(n.p,{children:["To make the configured dedicated cores available to users, create flavors with property ",(0,s.jsx)(n.code,{children:"hw:cpu_policy=dedicated"}),", so that the given ",(0,s.jsx)(n.code,{children:"vcpus"})," will be pinned to the threads in the dedicated set specified on the compute node, e.g.:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack flavor create --ram 4096 --disk 10 --vcpus 2 --property hw:cpu_policy=dedicated $FLAVOR_NAME \n"})}),"\n",(0,s.jsxs)(n.p,{children:["Note that this configuration will pin the qemu emulator threads to the instances CPUs. This will be fine for most workloads, but might not be sufficient for real-time or latency sensitive workloads like loadbalancers. If you get reports of ",(0,s.jsx)(n.a,{href:"https://docs.kernel.org/filesystems/proc.html#miscellaneous-kernel-statistics-in-proc-stat",children:"CPU steal"})," on an instance with dedicated cores or know that you need this, you may pin the emulator threads to another dedicated core by setting the property ",(0,s.jsx)(n.code,{children:"hw:emulator_threads_policy=isolate"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack flavor set --property hw:emulator_threads_policy=isolate $FLAVOR_NAME \n"})}),"\n",(0,s.jsx)(n.h3,{id:"mixing-dedicated-and-shared-cores-on-a-compute-node",children:"Mixing dedicated and shared cores on a compute node"}),"\n",(0,s.jsxs)(n.p,{children:["You may also mix dedicated and shared cores on a single compute node by adding cores to the ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#compute.cpu_shared_set",children:"shared CPU set"}),", e.g."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/nova-compute.conf"',children:"[compute]\ncpu_shared_set=4-12,^8,15\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This will allow nova to schedule instances with floating cores on this set of CPU cores.\nWhen a shared CPU set is specified setting the property ",(0,s.jsx)(n.code,{children:"hw:emulator_threads_policy=share"})," will pin the emulator threads to this set of cores."]}),"\n",(0,s.jsx)(n.h3,{id:"mixing-dedicated-and-shared-cores-in-a-nova-instance",children:"Mixing dedicated and shared cores in a nova instance"}),"\n",(0,s.jsxs)(n.p,{children:["It is possible to create instances with a mixed set of dedicated and shared CPU cores. Set the property ",(0,s.jsx)(n.code,{children:"hw:cpu_policy=mixed"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack flavor set --property hw:cpu_policy=mixed $MIXED_FLAVOR_NAME \n"})}),"\n",(0,s.jsxs)(n.p,{children:["and specify a mask for the instance cores which are to be pinned with property ",(0,s.jsxs)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/extra-specs.html#hw:cpu_dedicated_mask",children:["hw",":cpu_dedicated_mask"]}),". E.g.:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack flavor set --property hw:cpu_dedicated_mask=0-1 $MIXED_FLAVOR_NAME \n"})}),"\n",(0,s.jsx)(n.p,{children:"to pin instance cores 0 and 1."}),"\n",(0,s.jsx)(n.h3,{id:"creating-images-with-special-cpu-requirements",children:"Creating images with special CPU requirements"}),"\n",(0,s.jsx)(n.p,{children:"All properties used in this section may also be set on images to indicate that instances should use the specified mixed or dedicated cores or isolated emulator threads. Note however that properties set on flavors take precedence."}),"\n",(0,s.jsx)(n.h2,{id:"back-instance-memory-by-hugepages",children:"Back instance memory by hugepages"}),"\n",(0,s.jsxs)(n.p,{children:["Qemu/KVM can make use of hugepages, which reduces the required number of TLB entries for the instances memory. Thus it will reduce the number TLB misses, which will result in faster memory access inside the instance.\nAs with ",(0,s.jsx)(n.a,{href:"#dedicated-cores-for-instances",children:"dedicated cores"})," usage will enable NUMA topologies and require the ",(0,s.jsx)(n.a,{href:"#add-numa-topology-filter-to-nova-scheduler",children:"NUMA topology filter to be added to the nova-scheduler's enabled filters"}),".\nSince allocating hugepages requires contiguous regions of memory it is advisable to do so at boot time, by ",(0,s.jsx)(n.a,{href:"https://docs.kernel.org/admin-guide/mm/hugetlbpage.html",children:"specifying the required size and number of hugepages on the kernel cmdline"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["If you have configured dedicated cores, make sure to configure a matching hugepage reservation by NUMA node.\nE.g. assuming a compute node with two NUMA nodes of 32GB where some cores and 8GB of 4k memory pages on the first NUMA node are reserved for the hypervisor services, while the rest should be used as hugepage-backed instance memory, the following cmdline could be used: ",(0,s.jsx)(n.code,{children:"default_hugepagesz=1G transparent_hugepage=never hugepagesz=1G hugepages=0:24,1:32"}),"\nThis would set a default hugepage size of 1GB, turn off ",(0,s.jsx)(n.a,{href:"https://docs.kernel.org/admin-guide/mm/transhuge.html",children:"transparent hugepages"}),", and reserve 24 1GB hugepages on NUMA node 0 and 32 1GB hugepages on NUMA node 1.\nTo set this via osism for a group of hosts defined in the inventory create or add to the file with the following content:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/group_vars/INVENTORY_GROUP_NAME.yml"',children:"---\ngrub__configuration:\n  - name: cmdline_linux\n    value:\n      - default_hugepagesz=1G\n      - transparent_hugepage=never\n      - hugepagesz=1G\n      - hugepages=0:24,1:32\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Of course the same configuration may also be set by host using ",(0,s.jsx)(n.code,{children:"host_vars"})," in ",(0,s.jsx)(n.code,{children:"inventory/host_vars/INVENTORY_HOST_NAME.yml"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Sync the variables with the inventory by running"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism sync inventory\n"})}),"\n",(0,s.jsx)(n.p,{children:"and apply the configuration with"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"osism apply grub\n"})}),"\n",(0,s.jsxs)(n.p,{children:["After rebooting the nodes the hugepages will be allocated. You may check this by, e.g. looking at the corresponding values in ",(0,s.jsx)(n.code,{children:"/proc/meminfo"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"grep Huge /proc/meminfo\nAnonHugePages:         0 kB\nShmemHugePages:        0 kB\nFileHugePages:         0 kB\nHugePages_Total:      24\nHugePages_Free:       24\nHugePages_Rsvd:        0\nHugePages_Surp:        0\nHugepagesize:    1048576 kB\nHugetlb:        25165824 kB\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If you require hugepages for services on the compute node, make sure to configure nova to reserve them for the host by setting ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/configuration/config.html#DEFAULT.reserved_huge_pages",children:"DEFAULT.reserved_huge_pages"})," accordingly."]}),"\n",(0,s.jsxs)(n.p,{children:["To back an instance's memory by hugepages add the property ",(0,s.jsx)(n.code,{children:"hw:mem_page_size=large"})," to a flavor and create the instance from it, e.g.:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"openstack flavor set --property hw:mem_page_size=large $FLAVOR_NAME\n"})}),"\n",(0,s.jsx)(n.h2,{id:"local-ssd-storage",children:"Local SSD storage"}),"\n",(0,s.jsxs)(n.p,{children:["In this example, a local SSD is provided for use on compute node ",(0,s.jsx)(n.code,{children:"testbed-node-0"}),".\nBy default, Nova accesses the local storage on a file basis."]}),"\n",(0,s.jsxs)(n.p,{children:["It is also possible to work with logical volumes instead. However, this is not\nrecommended or supported by OSISM. More details in the\n",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/nova/latest/admin/configuration/index.html",children:"Nova Configuration Guide"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["On the compute node, the local SSD to be used is formatted with a file system of\nyour choice and mounted to ",(0,s.jsx)(n.code,{children:"/var/lib/nova"}),". When using more than one local SSD, a\nsoftware RAID 1 should be used It is recommended to automate the creation of the\nfile system and the creation of the mount point with a custom playbook."]}),"\n",(0,s.jsxs)(n.p,{children:["A ",(0,s.jsx)(n.code,{children:"nova.conf"})," configuration file is created as an overlay file for the compute node\n",(0,s.jsx)(n.code,{children:"testbed-node-0"}),". The name of the directory must match the name of the host in the\ninventory. If the compute node has a file with the name ",(0,s.jsx)(n.code,{children:"testbed-node-0.yml"})," in the\n",(0,s.jsx)(n.code,{children:"host_vars"})," directory in the inventory, then the name of the directory\nin the overlays is ",(0,s.jsx)(n.code,{children:"testbed-node-0"})," accordingly. If the file name there were\n",(0,s.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz.yml"})," then the name of the directory would be\n",(0,s.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="environments/kolla/files/overlays/nova/testbed-node-0/nova.conf"',children:"[libvirt]\nimages_type = raw\n\n[glance]\nenable_rbd_download = true\n"})}),"\n",(0,s.jsxs)(n.p,{children:["As Ceph is still used as the storage backend for Glance and Cinder, the image type is\nset to ",(0,s.jsx)(n.code,{children:"raw"}),". To allow to download and cache images from Ceph via rbd rather than the\nGlance API via http  ",(0,s.jsx)(n.code,{children:"enable_rbd_download"})," is set to ",(0,s.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Parameters must also be added in the inventory. This differs depending on the OSISM\nversion used."}),"\n",(0,s.jsx)(n.p,{children:"Up to OSISM 6 it looks like this:"}),"\n",(0,s.jsxs)(n.p,{children:["In the inventory, the parameter ",(0,s.jsx)(n.code,{children:"nova_instance_datadir_volume"}),"\nis added in the section for the ",(0,s.jsx)(n.code,{children:"kolla"})," environment."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/host_vars/testbed-node-0.yml"',children:"##########################################################\n# kolla\n\nnova_instance_datadir_volume: /var/lib/nova\n"})}),"\n",(0,s.jsx)(n.p,{children:"Starting with OSISM 7, it looks like this:"}),"\n",(0,s.jsxs)(n.p,{children:["In the inventory, the parameters ",(0,s.jsx)(n.code,{children:"nova_instance_datadir_volume"})," and ",(0,s.jsx)(n.code,{children:"nova_backend"}),",\nare added in the section for the ",(0,s.jsx)(n.code,{children:"kolla"})," environment."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/host_vars/testbed-node-0.yml"',children:"##########################################################\n# kolla\n\nnova_instance_datadir_volume: /var/lib/nova\nnova_backend: default\n"})}),"\n",(0,s.jsx)(n.p,{children:"It is currently not possible to completely deactivate the Ceph integration with Nova.\nSo if you have all compute nodes with local storage, you still have to do the Ceph\nintegration for Nova itself and convert each compute node specifically to local storage.\nIf this is not done, errors will occur when deploying Nova."})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>r,a:()=>a});var s=o(7294);const t={},i=s.createContext(t);function a(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);