"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9377],{2488:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var i=t(5893),r=t(1151);const s={sidebar_label:"Configuration repository",sidebar_position:10},o="Configuration Repository",l={id:"guides/configuration-guide/configuration-repository",title:"Configuration Repository",description:"The configuration required for an OSISM managed cluster is stored in a single Git",source:"@site/docs/guides/configuration-guide/configuration-repository.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/configuration-repository",permalink:"/docs/guides/configuration-guide/configuration-repository",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/configuration-repository.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Configuration repository",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Configuration Guide",permalink:"/docs/guides/configuration-guide/"},next:{title:"Inventory",permalink:"/docs/guides/configuration-guide/inventory"}},d={},c=[{value:"Creating a new configuration repository",id:"creating-a-new-configuration-repository",level:2},{value:"Step 1: Preparation",id:"step-1-preparation",level:3},{value:"Step 2: Run Cookiecutter",id:"step-2-run-cookiecutter",level:3},{value:"Step 3: Upload the new configuration to the remote git repository",id:"step-3-upload-the-new-configuration-to-the-remote-git-repository",level:3},{value:"Step 4: Post-processing of the generated configuration",id:"step-4-post-processing-of-the-generated-configuration",level:3},{value:"Parameter reference",id:"parameter-reference",level:2},{value:"Using latest",id:"using-latest",level:3},{value:"Configuration repository layout",id:"configuration-repository-layout",level:2},{value:"Preparing a new configuration repository",id:"preparing-a-new-configuration-repository",level:2},{value:"Manager environment",id:"manager-environment",level:3},{value:"Inventory",id:"inventory",level:3},{value:"Roles",id:"roles",level:4},{value:"Host vars",id:"host-vars",level:3},{value:"DNS servers",id:"dns-servers",level:3},{value:"NTP servers",id:"ntp-servers",level:3},{value:"SSL certificates",id:"ssl-certificates",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"configuration-repository",children:"Configuration Repository"}),"\n",(0,i.jsx)(n.p,{children:"The configuration required for an OSISM managed cluster is stored in a single Git\nmonorepo, the configuration repository."}),"\n",(0,i.jsx)(n.h2,{id:"creating-a-new-configuration-repository",children:"Creating a new configuration repository"}),"\n",(0,i.jsxs)(n.p,{children:["The initial content for this configuration repository is generated using the\n",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-cookiecutter",children:"Cookiecutter"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Cookiecutter generates a simple initial configuration for your new cluster by prompting\nyou for the basic details of the new cluster."}),"\n",(0,i.jsxs)(n.p,{children:["The configuration repository is not created on the future Manager node. It is created on a\nlocal workstation. If the local workstation cannot be used for this purpose, a dedicated\nvirtual system can be used. For more information on this topic, refer to the\n",(0,i.jsx)(n.a,{href:"/docs/guides/deploy-guide/seed",children:"Seed Deploy Guide"}),".."]}),"\n",(0,i.jsx)(n.h3,{id:"step-1-preparation",children:"Step 1: Preparation"}),"\n",(0,i.jsxs)(n.p,{children:["First decide where to store your Git repository The content generated by the cookiecutter in\nthe ",(0,i.jsx)(n.code,{children:"output/configuration"})," directory is committed to a new Git repository. By default, the\nconfiguration repository is assumed to be on GitHub. This can also be GitLab or an internal\nGit service as well."]}),"\n",(0,i.jsxs)(n.p,{children:["Host and path to the Git repository are specified by the ",(0,i.jsx)(n.code,{children:"git_"})," parameters. These are\nrequested in step 2. The ",(0,i.jsx)(n.code,{children:"git_"})," parameters do not specify the path to the cookiecutter\nto use."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"  [8/20] git_host (github.com):\n  [9/20] git_port (22):\n  [10/20] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY): regiocloud/configuration\n  [11/20] git_username (git):\n  [12/20] git_version (main):\n"})}),"\n",(0,i.jsxs)(n.p,{children:["In this case, the generated configuration in the ",(0,i.jsx)(n.code,{children:"output/configuration"})," directory is\nstored on GitHub in the ",(0,i.jsx)(n.code,{children:"regiocloud/configuration"})," repository."]}),"\n",(0,i.jsxs)(n.p,{children:["See the ",(0,i.jsx)(n.a,{href:"#parameter-reference",children:"parameter reference"})," for more details. The parameters\nlisted there will be queried during the execution of Cookiecutter."]}),"\n",(0,i.jsx)(n.h3,{id:"step-2-run-cookiecutter",children:"Step 2: Run Cookiecutter"}),"\n",(0,i.jsxs)(n.p,{children:["In this example a new configuration repository is created with the default settings. The latest stable\nversion of OSISM is used. The use of latest is described in the section ",(0,i.jsx)(n.a,{href:"#using-latest",children:"Using latest"}),"."]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["The directory ",(0,i.jsx)(n.code,{children:"output"})," is created and used as output volume. It is only necessary to create the empty\ndirectory."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"mkdir output\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["The Cookiecutter runs inside a container. ",(0,i.jsx)(n.a,{href:"https://docs.docker.com/engine/install/",children:"Docker must be usable on the system"}),"\nwhere the Cookiecutter will be used. It should also work with Podman."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'docker run \\\n  -e TARGET_UID="$(id -u)" \\\n  -e TARGET_GID="$(id -g)" \\\n  -v $(pwd)/output:/output \\\n  --rm -it quay.io/osism/cookiecutter\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["A few parameters are requested. The parameters are documented in detail in the ",(0,i.jsx)(n.a,{href:"#parameters-reference",children:"Parameters reference"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[1/19] with_ceph (1):\n[2/19] with_keycloak (0):\n[3/19] ceph_network(192.168.64.0/19):\n[4/19] ceph_version (quincy):\n[5/19] domain (osism.xyz):\n[6/19] fqdn_external (api.osism.xyz):\n[7/19] fqdn_internal (api-int.osism.xyz):\n[8/19] git_host (github.com):\n[9/19] git_port (22):\n[10/19] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY):\n[11/19] git_username (git):\n[12/19] git_version (main):\n[13/19] ip_external (192.168.96.9):\n[14/19] ip_internal (192.168.32.9):\n[15/19] manager_version (7.0.4):\n[16/19] name_server (149.112.112.112):\n[17/19] ntp_server (de.pool.ntp.org):\n[18/19] openstack_version (2023.2):\n[19/19] project_name (configuration):\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"step-3-upload-the-new-configuration-to-the-remote-git-repository",children:"Step 3: Upload the new configuration to the remote git repository"}),"\n",(0,i.jsxs)(n.p,{children:["Add the initial configuration state to the repository. How to add a deploy key on GitHub is documented in\n",(0,i.jsx)(n.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys",children:"Managing deploy keys"}),".\nRead permissions are sufficient."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'$ git clone git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cp -r output/configuration/{*,.gitignore} YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cd YOUR_NEW_CONFIGURATION_REPOSITORY\n$ git add -A .\n$ git commit -m "Initial commit after bootstrap"\n$ git push\n'})}),"\n",(0,i.jsx)(n.p,{children:"The content is now committed to the Git repository that was created earlier in the process."}),"\n",(0,i.jsxs)(n.admonition,{type:"warning",children:[(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"secrets"})," directory is not stored in the Git repository. Its contents can be\nstored in a trusted location."]}),(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"secrets"})," directory contains an SSH key pair which is used as the deploy key to\nmake the configuration repository available on the manager node later. Write access\nis not required. The public SSH key is stored in the ",(0,i.jsx)(n.code,{children:"secrets/id_rsa.configuration.pub"})," file."]})]}),"\n",(0,i.jsx)(n.h3,{id:"step-4-post-processing-of-the-generated-configuration",children:"Step 4: Post-processing of the generated configuration"}),"\n",(0,i.jsxs)(n.p,{children:["The configuration repository that is initially created with the Cookiecutter is not immediately usable.\nFor example, the inventory needs to be built. All other information can be found in the\n",(0,i.jsx)(n.a,{href:"../configuration-guide/",children:"Configuration Guide"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["The password for Ansible Vault encrypted files, is stored in ",(0,i.jsx)(n.code,{children:"secrets/vaultpass"}),".\nThe password of the generated Keepass file is ",(0,i.jsx)(n.code,{children:"password"}),". This should be changed when using the Keepass file."]}),"\n",(0,i.jsx)(n.p,{children:"Use git to version all your configuration changes."}),"\n",(0,i.jsx)(n.h2,{id:"parameter-reference",children:"Parameter reference"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Parameter"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Description"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Default"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ceph_network"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Address range for Ceph's network"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.64.0/20"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ceph_version"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The version of Ceph. When using a stable OSISM release (",(0,i.jsx)(n.code,{children:"manager_version != latest"}),"), this value is ignored"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"quincy"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"domain"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"The domain used by hostnames"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"osism.xyz"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"fqdn_external"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"External API FQDN"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"api.osism.xyz"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"fqdn_internal"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Internal API FQDN"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"api-int.osism.xyz"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_host"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Address of the used Git server"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"github.com"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_port"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Port of the used Git server"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"22"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_repository"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Path to the git configuration repository"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"YOUR_ORG/YOUR_CONFIGURATION_REPOSITORY"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_username"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Username of the git repository"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"git_version"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Git branch name"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"main"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ip_external"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The external IP address of the API (resolves to ",(0,i.jsx)(n.code,{children:"fqdn_external"}),")"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.96.9"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ip_internal"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The internal IP address of the API (resolves to ",(0,i.jsx)(n.code,{children:"fqdn_internal"}),")"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"192.168.32.9"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"manager_version"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The version of OSISM. An overview of available OSISM releases can be found on ",(0,i.jsx)(n.a,{href:"https://release.osism.tech",children:"release.osism.tech"})]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"7.0.4"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"name_server"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Nameserver. Only one nameserver is set here because the query of multiple values in Cookiecutter is weird. Add more nameservers afterward."}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"149.112.112.112"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"ntp_server"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"NTP server. Only one NTP server is set here because the query of multiple values in Cookiecutter is weird. Add more NTP servers afterward."}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"de.pool.ntp.org"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"openstack_version"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["The version of OpenStack. When using a stable OSISM release (",(0,i.jsx)(n.code,{children:"manager_version != latest"}),"), this value is ignored"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"2023.2"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"project_name"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Name of the configuration repository directory"}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"configuration"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"with_ceph"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"1"})," to use Ceph, ",(0,i.jsx)(n.code,{children:"0"})," to not use Ceph"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"1"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"with_keycloak"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"1"})," to prepare Keycloak integration , ",(0,i.jsx)(n.code,{children:"0"})," to not prepare Keycloak integration"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"0"})})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"using-latest",children:"Using latest"}),"\n",(0,i.jsxs)(n.p,{children:["If you want to use the latest version, this is done using the ",(0,i.jsx)(n.code,{children:"manager_version"})," parameter. By default,\nthis is always set to the latest stable version."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"manager_version [7.0.0]: latest\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If the ",(0,i.jsx)(n.code,{children:"manager_version"})," parameter is set to ",(0,i.jsx)(n.code,{children:"latest"})," it is also possible to explicitly\nset the ",(0,i.jsx)(n.code,{children:"openstack_version"})," and the ",(0,i.jsx)(n.code,{children:"ceph_version"})," explicitly.."]}),"\n",(0,i.jsx)(n.h2,{id:"configuration-repository-layout",children:"Configuration repository layout"}),"\n",(0,i.jsxs)(n.p,{children:["A configuration repository always has the same basic layout. This section describes\nthe content available in a configuration repository. In the section\n",(0,i.jsx)(n.a,{href:"#creating-a-new-configuration-repository",children:"Creating a new configuration repository"})," is the creation\nof a new configuration repository documented."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"environments"})," directory"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"inventory"})," directory"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"netbox"})," directory (optional)"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"requirements.txt"})," file"]}),"\n",(0,i.jsxs)(n.p,{children:["In the ",(0,i.jsx)(n.code,{children:"requirements.txt"})," the necessary dependencies are listed to be able to execute Gilt."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"gilt.yml"})," file"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://gilt.readthedocs.io",children:"Gilt"})," is a Git layering tool. We use Gilt to maintain the image versions,\nAnsible configuration and scripts within the ",(0,i.jsx)(n.code,{children:"environments/manager"})," directory."]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics/blob/main/gilt.yml",children:"current gilt.yml"})," file is always\nlocated in the ",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Makefile"})," file"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"preparing-a-new-configuration-repository",children:"Preparing a new configuration repository"}),"\n",(0,i.jsx)(n.h3,{id:"manager-environment",children:"Manager environment"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-none",metastring:'title="environments/manager/hosts"',children:"[manager]\nmanager01\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/host_vars/manager01.yml"',children:'---\n##########################################################\n# ansible\n\nansible_host: 192.168.16.5\n\n##########################################################\n# generic\n\ninternal_interface: eno1\n\n##########################################################\n# network\n\nnetwork_type: netplan\nnetwork_ethernets:\n  eno1:\n    addresses:\n      - "192.168.16.10/20"\n    gateway4: "192.168.16.1"\n    mtu: 1500\n'})}),"\n",(0,i.jsx)(n.h3,{id:"inventory",children:"Inventory"}),"\n",(0,i.jsx)(n.h4,{id:"roles",children:"Roles"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-none",metastring:'title="inventory/20-roles"',children:'##########################################################\n# roles\n\n# NOTE: If netbox is not used, nothing needs to be changed here. In\n#       this case this inventory is used as before. The hosts are\n#       then managed here as normal.\n#\n#       If netbox is used this file is only used to store the hosts\n#       for the initial import into the netbox.\n#\n#       After the initial import of the inventory in the netbox,\n#       the groups in this file can be emptied. The systems are\n#       then assigned to their roles via tags in the netbox.\n\n# The "all" group is not used in OSISM. Therefore it is important\n# that all nodes are explicitly listed here.\n[generic]\nnode01\n\n# Nodes that act as manager (sometimes called deployment node)\n# are included in this group.\n[manager]\nnode01\n\n# Nodes which are intended for monitoring services belong to\n# this group\n[monitoring]\n\n# Nodes that serve as controllers, so things like scheduler,\n# API or database run there, of the environment.\n[control]\n\n# Virtual systems managed by OpenStack Nova are placed on\n# nodes in this group.\n[compute]\n\n# Network resources managed by OpenStack Neutron, such as\n# L3 routers, are placed on these nodes. This group has nothing\n# to do with the general network configuration.\n[network]\n\n# Nodes that serve as controllers for Ceph, so things like the\n# Ceph Monitor service run here.\n[ceph-control]\n\n# The storage available in these systems is provided in the\n# form of OSDs for Ceph.\n[ceph-resource]\n\n[ceph-rgw:children]\nceph-control\n\n# NOTE: These empty groups are only necessary if netbox is used. After\n#       the initial import of the hosts these groups can be commented\n#       out. The groups above with the initial hosts can be commented.\n#\n# [generic]\n#\n# [manager]\n#\n# [monitoring]\n#\n# [control]\n#\n# [compute]\n#\n# [network]\n#\n# [ceph-control]\n#\n# [ceph-resource]\n'})}),"\n",(0,i.jsx)(n.h3,{id:"host-vars",children:"Host vars"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="inventory/host_vars/node01.yml"',children:'---\n##########################################################\n# ansible\n\n# NOTE: Address where the node can be reached via SSH.\nansible_host: 192.168.16.10\n\n##########################################################\n# generic\n\ninternal_interface: eno1\n\n# NOTE: The address of the internal interface.\ninternal_address: 192.168.16.10\n\n##########################################################\n# netdata\n\nnetdata_host_type: client\n\n# NOTE: Uncomment this when this node should be a Netdata server.\n\n# netdata_host_type: server\n\n##########################################################\n# network\n\n# NOTE: This is the initial management interface. Further interfaces can be added.\n# DOCS: https://osism.tech/docs/guides/configuration-guide/network\n\nnetwork_ethernets:\n  eno1:\n    addresses:\n      - "192.168.16.10/20"\n    gateway4: "192.168.16.1"\n    mtu: 1500\n\n##########################################################\n# kolla\n\nnetwork_interface: eno1\n\n# api_interface:\n# bifrost_network_interface:\n# dns_interface:\n# kolla_external_vip_interface:\n# migration_interface:\n# neutron_external_interface:\n# octavia_network_interface:\n# storage_interface:\n# tunnel_interface:\n\n##########################################################\n# ceph\n\n# NOTE: Uncomment this when this node is a part of the Ceph cluster.\n\n# monitor_address:\n# radosgw_address:\n\n# NOTE: Uncomment this when this node should be a OSD node.\n# DOCS: https://osism.tech/docs/guides/configuration-guide/ceph#lvm-devices\n\n# ceph_osd_devices:\n#   sdb:\n#   sdc:\n#   sdd:\n#   sde:\n'})}),"\n",(0,i.jsx)(n.h3,{id:"dns-servers",children:"DNS servers"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"resolvconf_nameserver:\n  - 8.8.8.8\n  - 9.9.9.9\n"})}),"\n",(0,i.jsx)(n.h3,{id:"ntp-servers",children:"NTP servers"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"chrony_servers:\n  - 1.de.pool.ntp.org\n  - 2.de.pool.ntp.org\n  - 3.de.pool.ntp.org\n  - 4.de.pool.ntp.org\n"})}),"\n",(0,i.jsx)(n.h3,{id:"ssl-certificates",children:"SSL certificates"})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>o});var i=t(7294);const r={},s=i.createContext(r);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);