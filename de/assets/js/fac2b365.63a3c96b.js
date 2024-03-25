"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9377],{2488:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var i=t(5893),s=t(1151);const r={sidebar_label:"Configuration repository",sidebar_position:10},o="Configuration Repository",l={id:"guides/configuration-guide/configuration-repository",title:"Configuration Repository",description:"The configuration required for OSISM is stored in a single Git monorepo, the configuration repository.",source:"@site/docs/guides/configuration-guide/configuration-repository.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/configuration-repository",permalink:"/de/docs/guides/configuration-guide/configuration-repository",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/configuration-repository.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Configuration repository",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Configuration Guide",permalink:"/de/docs/guides/configuration-guide/"},next:{title:"Inventory",permalink:"/de/docs/guides/configuration-guide/inventory"}},d={},c=[{value:"Configuration repository layout",id:"configuration-repository-layout",level:2},{value:"Creating a new configuration repository",id:"creating-a-new-configuration-repository",level:2},{value:"Git repository",id:"git-repository",level:3},{value:"Creation",id:"creation",level:3},{value:"Use of latest",id:"use-of-latest",level:3},{value:"Make commit",id:"make-commit",level:3},{value:"Post-processing",id:"post-processing",level:3},{value:"Notes",id:"notes",level:3},{value:"Parameters",id:"parameters",level:3},{value:"Preparing a new configuration repository",id:"preparing-a-new-configuration-repository",level:2},{value:"Manager environment",id:"manager-environment",level:3},{value:"Inventory",id:"inventory",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"configuration-repository",children:"Configuration Repository"}),"\n",(0,i.jsx)(n.p,{children:"The configuration required for OSISM is stored in a single Git monorepo, the configuration repository."}),"\n",(0,i.jsx)(n.h2,{id:"configuration-repository-layout",children:"Configuration repository layout"}),"\n",(0,i.jsx)(n.p,{children:"A configuration repository is always composed of the same basic layout."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(n.code,{children:"environments"})," directory"]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(n.code,{children:"inventory"})," directory"]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(n.code,{children:"netbox"})," directory (optional)"]})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(n.code,{children:"requirements.txt"})," file"]})}),"\n",(0,i.jsxs)(n.p,{children:["In the ",(0,i.jsx)(n.code,{children:"requirements.txt"})," the necessary dependencies are listed to be able to execute Gilt."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:[(0,i.jsx)(n.code,{children:"gilt.yml"})," file"]})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://gilt.readthedocs.io",children:"Gilt"})," is a Git layering tool. We use Gilt to maintain the image versions,\nAnsible configuration and scripts within the ",(0,i.jsx)(n.code,{children:"environments/manager"})," directory."]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics/blob/main/gilt.yml",children:"current gilt.yml"})," file is always\nlocated in the ",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository."]}),"\n",(0,i.jsxs)(n.p,{children:["To use Gilt the dependencies are installed first. If Gilt is not installed via the ",(0,i.jsx)(n.code,{children:"requirements.txt"})," it\nis important to use a version smaller v2. The v2 of Gilt is not yet usable."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"pip3 install -r requirements.txt\n"})}),"\n",(0,i.jsxs)(n.p,{children:["After that you can update the manager environment in ",(0,i.jsx)(n.code,{children:"environments/manager"}),". Since the ",(0,i.jsx)(n.code,{children:"gilt.yml"}),"\nitself is updated with Gilt it is always important to run the command twice."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"gilt overlay\ngilt overlay\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"creating-a-new-configuration-repository",children:"Creating a new configuration repository"}),"\n",(0,i.jsxs)(n.p,{children:["The initial content for this repository is generated using the\n",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-cookiecutter",children:"cookiecutter"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"The configuration repository will not be created on the future manager node. It is created on a local\nworkstation. If the local workstation cannot be used for this purpose, a dedicated virtual system can\nbe used. It is important for the further process that no packages are installed manually on the manager.\nEspecially not Docker."}),"\n",(0,i.jsx)(n.h3,{id:"git-repository",children:"Git repository"}),"\n",(0,i.jsxs)(n.p,{children:["The content generated by the cookiecutter in the ",(0,i.jsx)(n.code,{children:"output/configuration"})," directory is\ncommitted to a new Git repository. By default, it is assumed that the configuration\nrepository is stored on GitHub. This can also be GitLab or an internal Git service\nas well."]}),"\n",(0,i.jsxs)(n.p,{children:["Host and path to the Git repository are specified via the ",(0,i.jsx)(n.code,{children:"git_"})," parameters: The\n",(0,i.jsx)(n.code,{children:"git_"})," parameters do not specify the path to the cookiecutter to use."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"  [8/21] git_host (github.com):\n  [9/21] git_port (22):\n  [10/21] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY): regiocloud/configuration\n  [11/21] git_username (git):\n  [12/21] git_version (main):\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In this case, the generated configuration in the ",(0,i.jsx)(n.code,{children:"output/configuration"})," directory is\nstored on GitHub in the ",(0,i.jsx)(n.code,{children:"regiocloud/configuration"})," repository."]}),"\n",(0,i.jsx)(n.h3,{id:"creation",children:"Creation"}),"\n",(0,i.jsxs)(n.p,{children:["In this example a new configuration repository is created with the defaults. The current stable\nversion of OSISM is used. The use of latest is described in the section\n",(0,i.jsx)(n.a,{href:"#use-of-latest",children:"Use of latest"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["The directory ",(0,i.jsx)(n.code,{children:"output"})," is created and used as output volume."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"mkdir output\n"})}),"\n",(0,i.jsx)(n.p,{children:"The cookiecutter is executed within a container. Docker must be usable on the system\non which the cookiecutter is to be used. It should also work with podman."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'docker run \\\n  -e TARGET_UID="$(id -u)" \\\n  -e TARGET_GID="$(id -g)" \\\n  -v $(pwd)/output:/output \\\n  --rm -it quay.io/osism/cookiecutter\n[1/21] with_ceph (1):\n[2/21] with_keycloak (0):\n[3/21] ceph_network_backend (192.168.80.0/20):\n[4/21] ceph_network_frontend (192.168.64.0/20):\n[5/21] ceph_version (quincy):\n[6/21] domain (osism.xyz):\n[7/21] fqdn_external (api.osism.xyz):\n[8/21] fqdn_internal (api-int.osism.xyz):\n[9/21] git_host (github.com):\n[10/21] git_port (22):\n[11/21] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY):\n[12/21] git_username (git):\n[13/21] git_version (main):\n[14/21] ip_external (192.168.96.9):\n[15/21] ip_internal (192.168.32.9):\n[16/21] manager_version (6.0.2):\n[17/21] name_server (149.112.112.112):\n[18/21] ntp_server (de.pool.ntp.org):\n[19/21] openstack_version (2023.1):\n[20/21] project_name (configuration):\n[...]\n'})}),"\n",(0,i.jsx)(n.h3,{id:"use-of-latest",children:"Use of latest"}),"\n",(0,i.jsxs)(n.p,{children:["When you want to use latest this is done via the parameter ",(0,i.jsx)(n.code,{children:"manager_version"}),".\nBy default, this is always set to the current stable version."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"manager_version [6.0.2]: latest\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.code,{children:"manager_version"})," parameter is set to ",(0,i.jsx)(n.code,{children:"latest"})," it is also possible to explicitly\nset the ",(0,i.jsx)(n.code,{children:"openstack_version"})," and the ",(0,i.jsx)(n.code,{children:"ceph_version"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"make-commit",children:"Make commit"}),"\n",(0,i.jsxs)(n.p,{children:["The content is now committed to the previously created Git repository.\nHow to add a deploy key on GitHub is documented in\n",(0,i.jsx)(n.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys",children:"Managing deploy keys"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'$ git clone git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cp -r output/configuration/* output/configuration/.gitignore YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cd YOUR_NEW_CONFIGURATION_REPOSITORY\n$ git add .gitignore *\n$ git commit -m "Initial commit"\n$ git push\n'})}),"\n",(0,i.jsxs)(n.admonition,{type:"warning",children:[(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"secrets"})," directory is not stored in the Git repository. Its contents can be\nstored in a suitable location."]}),(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"secrets"})," directory contains an SSH key pair which is used as a deploy key to\nmake the configuration repository available on the manager node later. Write access\nis not required. The public SSH key is stored in the file ",(0,i.jsx)(n.code,{children:"secrets/id_rsa.configuration.pub"}),"."]})]}),"\n",(0,i.jsx)(n.h3,{id:"post-processing",children:"Post-processing"}),"\n",(0,i.jsxs)(n.p,{children:["The configuration repository that is initially created with the Cookiecutter is not directly usable.\nFor example, the inventory needs to be built. All further information can be found in the\n",(0,i.jsx)(n.a,{href:"./",children:"Configuration Guide"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"notes",children:"Notes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The password for Ansible Vault encrypted files, ist stored at ",(0,i.jsx)(n.code,{children:"secrets/vaultpass"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["The password of the generated Keepass file is ",(0,i.jsx)(n.code,{children:"password"}),". This has to be changed."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Parameter"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Description"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Default"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ceph_network_backend"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Address range for ceph's backend network"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.80.0/20"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ceph_network_frontend"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Address range for ceph's frontend network"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.64.0/20"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ceph_version"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The version of Ceph. When using a stable OSISM release (",(0,i.jsx)(n.code,{children:"manager_version != latest"}),"), this value is ignored"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"quincy"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"domain"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"The domain used by hostnames"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"osism.xyz"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"fqdn_external"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"External API FQDN"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"api.osism.xyz"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"fqdn_internal"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Internal API FQDN"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"api-int.osism.xyz"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_host"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Address of the used Git server"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"github.com"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_port"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Port of the used Git server"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"22"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_repository"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Path to the git configuration repository"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"YOUR_ORG/YOUR_CONFIGURATION_REPOSITORY"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_username"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Username of the git repository"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_version"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Git branch name"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"main"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ip_external"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The external IP address of the API (resolves to ",(0,i.jsx)(n.code,{children:"fqdn_external"}),")"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.96.9"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ip_internal"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The internal IP address of the API (resolves to ",(0,i.jsx)(n.code,{children:"fqdn_internal"}),")"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.32.9"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"manager_version"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The version of OSISM. An overview of available OSISM releases can be found on ",(0,i.jsx)(n.a,{href:"https://release.osism.tech",children:"release.osism.tech"})]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"7.0.0"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"name_server"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Nameserver. Only one nameserver is set here because the query of multiple values in Cooiecutter is weird. Add more nameservers afterwards."}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"149.112.112.112"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ntp_server"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"NTP server. Only one NTP server is set here because the query of multiple values in Cooiecutter is weird. Add more NTP servers afterwards."}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"de.pool.ntp.org"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"openstack_version"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The version of OpenStack. When using a stable OSISM release (",(0,i.jsx)(n.code,{children:"manager_version != latest"}),"), this value is ignored"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"2023.2"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"project_name"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Name of the configuration repository directory"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"configuration"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"with_ceph"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"1"})," to use Ceph, ",(0,i.jsx)(n.code,{children:"0"})," to not use Ceph"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"1"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"with_keycloak"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"1"})," to prepare Keycloak integration , ",(0,i.jsx)(n.code,{children:"0"})," to not prepare Keycloak integration"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"0"})})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"preparing-a-new-configuration-repository",children:"Preparing a new configuration repository"}),"\n",(0,i.jsx)(n.h3,{id:"manager-environment",children:"Manager environment"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-none",metastring:'title="environments/manager/hosts"',children:"[manager]\nmanager01\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/host_vars/manager01.yml"',children:'---\n##########################################################\n# ansible\n\nansible_host: 192.168.16.5\n\n##########################################################\n# generic\n\ninternal_interface: eno1\n\n##########################################################\n# network\n\nnetwork_type: netplan\nnetwork_ethernets:\n  eno1:\n    addresses:\n      - "192.168.16.10/20"\n    gateway4: "192.168.16.1"\n    mtu: 1500\n'})}),"\n",(0,i.jsx)(n.h3,{id:"inventory",children:"Inventory"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-none",metastring:'title="inventory/20-roles"',children:'##########################################################\n# roles\n\n# NOTE: If netbox is not used, nothing needs to be changed here. In\n#       this case this inventory is used as before. The hosts are\n#       then managed here as normal.\n#\n#       If netbox is used this file is only used to store the hosts\n#       for the initial import into the netbox.\n#\n#       After the initial import of the inventory in the netbox,\n#       the groups in this file can be emptied. The systems are\n#       then assigned to their roles via tags in the netbox.\n\n# The "all" group is not used in OSISM. Therefore it is important\n# that all nodes are explicitly listed here.\n[generic]\nnode01\n\n# Nodes that act as manager (sometimes called deployment node)\n# are included in this group.\n[manager]\nmanager01\n\n# Nodes which are intended for monitoring services belong to\n# this group\n[monitoring]\n\n# Nodes that serve as controllers, so things like scheduler,\n# API or database run there, of the environment.\n[control]\n\n# Virtual systems managed by OpenStack Nova are placed on\n# nodes in this group.\n[compute]\n\n# Network resources managed by OpenStack Neutron, such as\n# L3 routers, are placed on these nodes. This group has nothing\n# to do with the general network configuration.\n[network]\n\n# Nodes that serve as controllers for Ceph, so things like the\n# Ceph Monitor service run here.\n[ceph-control]\n\n# The storage available in these systems is provided in the\n# form of OSDs for Ceph.\n[ceph-resource]\n\n# NOTE: These empty groups are only necessary if netbox is used. After\n#       the initial import of the hosts these groups can be commented\n#       out. The groups above with the initial hosts can be commented.\n#\n# [generic]\n#\n# [manager]\n#\n# [monitoring]\n#\n# [control]\n#\n# [compute]\n#\n# [network]\n#\n# [ceph-control]\n#\n# [ceph-resource]\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/host_vars/node01.yml"',children:'---\n##########################################################\n# ansible\n\n# NOTE: Address where the node can be reached via SSH.\nansible_host: 192.168.16.10\n\n##########################################################\n# generic\n\ninternal_interface: eno1\n\n# NOTE: The address of the internal interface.\ninternal_address: 192.168.16.10\n\n##########################################################\n# netdata\n\nnetdata_host_type: client\n\n# NOTE: Uncomment this when this node should be a Netdata server.\n\n# netdata_host_type: server\n\n##########################################################\n# network\n\n# NOTE: This is the initial management interface. Further interfaces\n#       must be added.\n\nnetwork_type: netplan\nnetwork_ethernets:\n  eno1:\n    addresses:\n      - "192.168.16.10/20"\n    gateway4: "192.168.16.1"\n    mtu: 1500\n\n##########################################################\n# kolla\n\nnetwork_interface: eno1\n\n# api_interface:\n# bifrost_network_interface:\n# dns_interface:\n# kolla_external_vip_interface:\n# migration_interface:\n# neutron_external_interface:\n# octavia_network_interface:\n# storage_interface:\n# tunnel_interface:\n\n##########################################################\n# ceph\n\n# NOTE: Uncomment this when this node is a part of the Ceph cluster.\n\n# monitor_address:\n# radosgw_address:\n\n# monitor_interface:\n# radosgw_interface:\n\n# NOTE: Uncomment this when this node should be a OSD node.\n\n# devices:\n#   - /dev/sdb\n#   - /dev/sdc\n#   - /dev/sdd\n#   - /dev/sde\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>o});var i=t(7294);const s={},r=i.createContext(s);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);