"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9377],{2488:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>a});var r=i(5893),t=i(1151);const s={sidebar_label:"Configuration repository",sidebar_position:10},o="Configuration Repository",d={id:"guides/configuration-guide/configuration-repository",title:"Configuration Repository",description:"The configuration required for OSISM is stored in a single Git monorepo, the configuration repository.",source:"@site/docs/guides/configuration-guide/configuration-repository.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/configuration-repository",permalink:"/docs/guides/configuration-guide/configuration-repository",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/configuration-repository.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Configuration repository",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Configuration Guide",permalink:"/docs/guides/configuration-guide/"},next:{title:"Inventory",permalink:"/docs/guides/configuration-guide/inventory"}},c={},a=[{value:"Configuration repository layout",id:"configuration-repository-layout",level:2},{value:"Creating a new configuration repository",id:"creating-a-new-configuration-repository",level:2},{value:"Git repository",id:"git-repository",level:3},{value:"Creation",id:"creation",level:3},{value:"Use of a stable release",id:"use-of-a-stable-release",level:3},{value:"Make commit",id:"make-commit",level:3},{value:"Post-processing",id:"post-processing",level:3},{value:"Notes",id:"notes",level:3},{value:"Parameters",id:"parameters",level:3},{value:"Preparing a new configuration repository",id:"preparing-a-new-configuration-repository",level:2},{value:"Manager environment",id:"manager-environment",level:3},{value:"Inventory",id:"inventory",level:3}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"configuration-repository",children:"Configuration Repository"}),"\n",(0,r.jsx)(n.p,{children:"The configuration required for OSISM is stored in a single Git monorepo, the configuration repository."}),"\n",(0,r.jsx)(n.h2,{id:"configuration-repository-layout",children:"Configuration repository layout"}),"\n",(0,r.jsx)(n.p,{children:"A configuration repository is always composed of the same basic layout."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:"environments"})," directory"]})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:"inventory"})," directory"]})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:"netbox"})," directory (optional)"]})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:"requirements.txt"})," file"]})}),"\n",(0,r.jsxs)(n.p,{children:["In the ",(0,r.jsx)(n.code,{children:"requirements.txt"})," the necessary dependencies are listed to be able to execute Gilt."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:"gilt.yml"})," file"]})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://gilt.readthedocs.io",children:"Gilt"})," is a Git layering tool. We use Gilt to maintain the image versions,\nAnsible configuration and scripts within the ",(0,r.jsx)(n.code,{children:"environments/manager"})," directory."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.a,{href:"https://github.com/osism/cfg-generics/blob/main/gilt.yml",children:"current gilt.yml"})," file is always\nlocated in the ",(0,r.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository."]}),"\n",(0,r.jsx)(n.p,{children:"To use Gilt the dependencies are installed first."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"pip3 install -r requirements.txt\n"})}),"\n",(0,r.jsxs)(n.p,{children:["After that you can update the manager environment in ",(0,r.jsx)(n.code,{children:"environments/manager"}),". Since the ",(0,r.jsx)(n.code,{children:"gilt.yml"}),"\nitself is updated with Gilt it is always important to run the command twice."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"gilt overlay\ngilt overlay\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"creating-a-new-configuration-repository",children:"Creating a new configuration repository"}),"\n",(0,r.jsxs)(n.p,{children:["The initial content for this repository is generated using the\n",(0,r.jsx)(n.a,{href:"https://github.com/osism/cfg-cookiecutter",children:"cookiecutter"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"git-repository",children:"Git repository"}),"\n",(0,r.jsxs)(n.p,{children:["The content generated by the cookiecutter in the ",(0,r.jsx)(n.code,{children:"output/configuration"})," directory is\ncommitted to a new Git repository. By default, it is assumed that the configuration\nrepository is stored on GitHub. This can also be GitLab or an internal Git service\nas well."]}),"\n",(0,r.jsxs)(n.p,{children:["Host and path to the Git repository are specified via the ",(0,r.jsx)(n.code,{children:"git_"})," parameters: The\n",(0,r.jsx)(n.code,{children:"git_"})," parameters do not specify the path to the cookiecutter to use."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"  [8/20] git_host (github.com):\n  [9/20] git_port (22):\n  [10/20] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY): regiocloud/configuration\n  [11/20] git_username (git):\n  [12/20] git_version (main):\n"})}),"\n",(0,r.jsxs)(n.p,{children:["In this case, the generated configuration in the ",(0,r.jsx)(n.code,{children:"output/configuration"})," directory is\nstored on GitHub in the ",(0,r.jsx)(n.code,{children:"regiocloud/configuration"})," repository."]}),"\n",(0,r.jsx)(n.h3,{id:"creation",children:"Creation"}),"\n",(0,r.jsxs)(n.p,{children:["In this example a new configuration repository is created with the defaults. The latest versions of\nOSISM are used. The use of a stable release is described in the section\n",(0,r.jsx)(n.a,{href:"#use-of-a-stable-release",children:"Use of a stable release"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The directory ",(0,r.jsx)(n.code,{children:"output"})," is created and used as output volume."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"mkdir output\n"})}),"\n",(0,r.jsx)(n.p,{children:"The cookiecutter is executed within a container. Docker must be usable on the system\non which the cookiecutter is to be used. It should also work with podman."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"docker run --rm -v $(pwd)/output:/output -it quay.io/osism/cookiecutter\n[1/20] with_ceph (1):\n[2/20] ceph_network_backend (192.168.80.0/20):\n[3/20] ceph_network_frontend (192.168.64.0/20):\n[4/20] ceph_version (quincy):\n[5/20] domain (osism.xyz):\n[6/20] fqdn_external (api.osism.xyz):\n[7/20] fqdn_internal (api-int.osism.xyz):\n[8/20] git_host (github.com):\n[9/20] git_port (22):\n[10/20] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY):\n[11/20] git_username (git):\n[12/20] git_version (main):\n[13/20] ip_external (192.168.96.9):\n[14/20] ip_internal (192.168.32.9):\n[15/20] manager_version (latest):\n[16/20] name_server (149.112.112.112):\n[17/20] ntp_server (de.pool.ntp.org):\n[18/20] openstack_version (2023.1):\n[19/20] project_name (configuration):\n[...]\n"})}),"\n",(0,r.jsx)(n.p,{children:"Since we run the cookiecutter inside a container, the user rights are not correct\nafterwards and have to be changed."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo chown -R $USER: output/\n"})}),"\n",(0,r.jsx)(n.h3,{id:"use-of-a-stable-release",children:"Use of a stable release"}),"\n",(0,r.jsxs)(n.p,{children:["When you want to use a stable release this is done via the parameter ",(0,r.jsx)(n.code,{children:"manager_version"}),".\nBy default, this is always set to ",(0,r.jsx)(n.code,{children:"latest"}),". If, for example, the stable release ",(0,r.jsx)(n.code,{children:"6.0.0"}),"\nis to be used, the value for this parameter is set to ",(0,r.jsx)(n.code,{children:"6.0.0"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The current stable release is listed at ",(0,r.jsx)(n.a,{href:"https://release.osism.tech/",children:"release.osism.tech"}),".\nAlways check there in advance and do not copy the stable release used here as an example."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"manager_version [latest]: 6.0.0\n"})}),"\n",(0,r.jsxs)(n.p,{children:["If the ",(0,r.jsx)(n.code,{children:"manager_version"})," parameter is set to a stable release then it is no longer necessary\nto set the ",(0,r.jsx)(n.code,{children:"ceph_version"})," and ",(0,r.jsx)(n.code,{children:"openstack_version"})," parameters. These are then no longer needed\nand are ignored. The used versions result from the ",(0,r.jsx)(n.code,{children:"manager_version"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"make-commit",children:"Make commit"}),"\n",(0,r.jsx)(n.p,{children:"The content is now committed to the previously created Git repository."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'$ git clone git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cp -r output/configuration/* output/configuration/.gitignore YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cd YOUR_NEW_CONFIGURATION_REPOSITORY\n$ git add .gitignore *\n$ git commit -m "Initial commit"\n$ git push\n'})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"secrets"})," directory is not stored in the Git repository. Its contents can be\nstored in a suitable location."]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"secrets"})," directory contains an SSH key pair which is used as a deploy key to\nmake the configuration repository available on the manager node later. Write access\nis not required. The public SSH key is stored in the file ",(0,r.jsx)(n.code,{children:"secrets/id_rsa.configuration.pub"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["How to add a deploy key on GitHub is documented in\n",(0,r.jsx)(n.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys",children:"Managing deploy keys"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"post-processing",children:"Post-processing"}),"\n",(0,r.jsxs)(n.p,{children:["The configuration repository that is initially created with the Cookiecutter is not directly usable.\nFor example, the inventory needs to be built. All further information can be found in the\n",(0,r.jsx)(n.a,{href:"./",children:"Configuration Guide"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"notes",children:"Notes"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["The password for Ansible Vault encrypted files, ist stored at ",(0,r.jsx)(n.code,{children:"secrets/vaultpass"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["The password of the generated Keepass file is ",(0,r.jsx)(n.code,{children:"password"}),". This has to be changed."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,r.jsxs)("table",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Parameter"}),(0,r.jsx)("th",{children:"Description"}),(0,r.jsx)("th",{children:"Default"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"ceph_network_backend"})}),(0,r.jsx)("td",{children:"Address range for ceph's backend network"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"192.168.80.0/20"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"ceph_network_frontend"})}),(0,r.jsx)("td",{children:"Address range for ceph's frontend network"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"192.168.64.0/20"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"ceph_version"})}),(0,r.jsxs)("td",{children:["The version of Ceph. When using a stable OSISM release (",(0,r.jsx)("code",{children:"manager_version != latest"}),"), this value is ignored."]}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"quincy"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"domain"})}),(0,r.jsx)("td",{children:"The domain used by hostnames"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"osism.xyz"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"fqdn_external"})}),(0,r.jsx)("td",{children:"External API FQDN"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"api.osism.xyz"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"fqdn_internal"})}),(0,r.jsx)("td",{children:"Internal API FQDN"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"api-int.osism.xyz"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"git_host"})}),(0,r.jsx)("td",{children:"Address of the used Git server"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"github.com"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"git_port"})}),(0,r.jsx)("td",{children:"Port of the used Git server"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"22"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"git_repository"})}),(0,r.jsx)("td",{children:"Path to the git configuration repository"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"git_username"})}),(0,r.jsx)("td",{children:"Username of the git repository"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"git"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"git_version"})}),(0,r.jsx)("td",{children:"Git branch name"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"main"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"ip_external"})}),(0,r.jsxs)("td",{children:["The external IP address of the API (resolves to ",(0,r.jsx)("code",{children:"fqdn_external"}),")"]}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"192.168.96.9"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"ip_internal"})}),(0,r.jsxs)("td",{children:["The internal IP address of the API (resolves to ",(0,r.jsx)("code",{children:"fqdn_internal"}),")"]}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"192.168.32.9"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"manager_version"})}),(0,r.jsxs)("td",{children:["The version of OSISM. An overview of available OSISM releases can be found on ",(0,r.jsx)("a",{href:"https://release.osism.tech",children:"release.osism.tech"}),"."]}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"latest"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"name_server"})}),(0,r.jsx)("td",{children:"Nameserver. Only one nameserver is set here because the query of multiple values in Cooiecutter is weird. Add more nameservers afterwards."}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"149.112.112.112"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"ntp_server"})}),(0,r.jsx)("td",{children:"NTP server. Only one NTP server is set here because the query of multiple values in Cooiecutter is weird. Add more NTP servers afterwards."}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"de.pool.ntp.org"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"openstack_version"})}),(0,r.jsxs)("td",{children:["The version of OpenStack. When using a stable OSISM release (",(0,r.jsx)("code",{children:"manager_version != latest"}),"), this value is ignored."]}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"2023.1"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"project_name"})}),(0,r.jsx)("td",{children:"Name of the configuration repository directory"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"configuration"})})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"with_ceph"})}),(0,r.jsx)("td",{children:"1 to use Ceph, 0 to not use Ceph"}),(0,r.jsx)("td",{children:(0,r.jsx)("code",{children:"1"})})]})]}),"\n",(0,r.jsx)(n.h2,{id:"preparing-a-new-configuration-repository",children:"Preparing a new configuration repository"}),"\n",(0,r.jsx)(n.h3,{id:"manager-environment",children:"Manager environment"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-none",metastring:'title="environments/manager/hosts"',children:"[manager]\nmanager01\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/host_vars/manager01.yml"',children:'---\n##########################################################\n# ansible\n\nansible_host: 192.168.16.5\n\n##########################################################\n# generic\n\ninternal_interface: eno1\n\n##########################################################\n# network\n\nnetwork_type: netplan\nnetwork_ethernets:\n  eno1:\n    addresses:\n      - "192.168.16.10/20"\n    gateway4: "192.168.16.1"\n    mtu: 1500\n'})}),"\n",(0,r.jsx)(n.h3,{id:"inventory",children:"Inventory"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-none",metastring:'title="inventory/20-roles"',children:'##########################################################\n# roles\n\n# NOTE: If netbox is not used, nothing needs to be changed here. In\n#       this case this inventory is used as before. The hosts are\n#       then managed here as normal.\n#\n#       If netbox is used this file is only used to store the hosts\n#       for the initial import into the netbox.\n#\n#       After the initial import of the inventory in the netbox,\n#       the groups in this file can be emptied. The systems are\n#       then assigned to their roles via tags in the netbox.\n\n# The "all" group is not used in OSISM. Therefore it is important\n# that all nodes are explicitly listed here.\n[generic]\nnode01\n\n# Nodes that act as manager (sometimes called deployment node)\n# are included in this group.\n[manager]\nmanager01\n\n# Nodes which are intended for monitoring services belong to\n# this group\n[monitoring]\n\n# Nodes that serve as controllers, so things like scheduler,\n# API or database run there, of the environment.\n[control]\n\n# Virtual systems managed by OpenStack Nova are placed on\n# nodes in this group.\n[compute]\n\n# Network resources managed by OpenStack Neutron, such as\n# L3 routers, are placed on these nodes. This group has nothing\n# to do with the general network configuration.\n[network]\n\n# Nodes that serve as controllers for Ceph, so things like the\n# Ceph Monitor service run here.\n[ceph-control]\n\n# The storage available in these systems is provided in the\n# form of OSDs for Ceph.\n[ceph-resource]\n\n# NOTE: These empty groups are only necessary if netbox is used. After\n#       the initial import of the hosts these groups can be commented\n#       out. The groups above with the initial hosts can be commented.\n#\n# [generic]\n#\n# [manager]\n#\n# [monitoring]\n#\n# [control]\n#\n# [compute]\n#\n# [network]\n#\n# [ceph-control]\n#\n# [ceph-resource]\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/host_vars/node01.yml"',children:'---\n##########################################################\n# ansible\n\n# NOTE: Address where the node can be reached via SSH.\nansible_host: 192.168.16.10\n\n##########################################################\n# generic\n\ninternal_interface: eno1\n\n# NOTE: The address of the internal interface.\ninternal_address: 192.168.16.10\n\n##########################################################\n# netdata\n\nnetdata_host_type: client\n\n# NOTE: Uncomment this when this node should be a Netdata server.\n\n# netdata_host_type: server\n\n##########################################################\n# network\n\n# NOTE: This is the initial management interface. Further interfaces\n#       must be added.\n\nnetwork_type: netplan\nnetwork_ethernets:\n  eno1:\n    addresses:\n      - "192.168.16.10/20"\n    gateway4: "192.168.16.1"\n    mtu: 1500\n\n##########################################################\n# kolla\n\nnetwork_interface: eno1\n\n# api_interface:\n# bifrost_network_interface:\n# dns_interface:\n# kolla_external_vip_interface:\n# migration_interface:\n# neutron_external_interface:\n# octavia_network_interface:\n# storage_interface:\n# tunnel_interface:\n\n##########################################################\n# ceph\n\n# NOTE: Uncomment this when this node is a part of the Ceph cluster.\n\n# monitor_address:\n# radosgw_address:\n\n# monitor_interface:\n# radosgw_interface:\n\n# NOTE: Uncomment this when this node should be a OSD node.\n\n# devices:\n#   - /dev/sdb\n#   - /dev/sdc\n#   - /dev/sdd\n#   - /dev/sde\n'})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>o});var r=i(7294);const t={},s=r.createContext(t);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);