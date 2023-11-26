"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1943],{9236:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>a,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var r=s(5893),o=s(1151);const i={sidebar_label:"Manager",sidebar_position:20},t="Manager",d={id:"guides/deploy-guide/manager",title:"Manager",description:"Change into the configuration/environments/manager directory of the configuration repository.",source:"@site/docs/guides/deploy-guide/manager.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/manager",permalink:"/docs/guides/deploy-guide/manager",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/manager.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Manager",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Seed",permalink:"/docs/guides/deploy-guide/seed"},next:{title:"Provisioning",permalink:"/docs/guides/deploy-guide/provisioning"}},l={},c=[{value:"Create operator user",id:"create-operator-user",level:2},{value:"Apply the network configuration",id:"apply-the-network-configuration",level:2},{value:"Bootstrap",id:"bootstrap",level:2},{value:"Deploy",id:"deploy",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"manager",children:"Manager"}),"\n",(0,r.jsxs)(n.p,{children:["Change into the ",(0,r.jsx)(n.code,{children:"configuration/environments/manager"})," directory of the configuration repository.\non the seed node."]}),"\n",(0,r.jsxs)(n.p,{children:["The deployment of the seed node is documented in the ",(0,r.jsx)(n.a,{href:"../deploy-guide/seed",children:"Deploy Guide for the seed node"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"cd configuration/environments/manager\n"})}),"\n",(0,r.jsx)(n.h2,{id:"create-operator-user",children:"Create operator user"}),"\n",(0,r.jsxs)(n.p,{children:["The operator user is created on each node. It is used as a service account for OSISM. All\ncontainers run with this user. Ansible also uses this user to access the nodes. Commands\non the manager node need to be run as this user. The name of the operator user is always ",(0,r.jsx)(n.code,{children:"dragon"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["With ",(0,r.jsx)(n.code,{children:"ANSIBLE_USER"})," the existing user account is set after the provsioning of the management\nnode. When using the ",(0,r.jsx)(n.a,{href:"https://github.com/osism/node-image",children:"osism/node-image"})," the user is ",(0,r.jsx)(n.code,{children:"osism"}),"\nand the password of this user is ",(0,r.jsx)(n.code,{children:"password"}),". If you install Ubuntu manually the user usually\nis ",(0,r.jsx)(n.code,{children:"ubuntu"}),". If you want to use any other user here, that's no problem. It is important that\nthis user has sudo rights. The password according to what you have set yourself."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_BECOME_ASK_PASS=True \\\nANSIBLE_ASK_VAULT_PASS=True \\\nANSIBLE_ASK_PASS=True \\\nANSIBLE_USER=osism \\\n./run.sh operator\n"})}),"\n",(0,r.jsxs)(n.p,{children:["When the ",(0,r.jsx)(n.code,{children:"./run.sh operator"})," is executed, the following prompts are displayed."]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Prompt"}),(0,r.jsx)(n.th,{children:"Value"}),(0,r.jsx)(n.th,{children:"Comment"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"SSH password:"})}),(0,r.jsxs)(n.td,{children:["Password so that the ",(0,r.jsx)(n.code,{children:"ANSIBLE_USER"})," can login"]}),(0,r.jsxs)(n.td,{children:["Enabled by ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_PASS"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"BECOME password[defaults to SSH password]:"})}),(0,r.jsxs)(n.td,{children:["Password so that the ",(0,r.jsx)(n.code,{children:"ANSIBLE_USER"})," can use ",(0,r.jsx)(n.code,{children:"sudo"})]}),(0,r.jsxs)(n.td,{children:["Enabled by ",(0,r.jsx)(n.code,{children:"ANSIBLE_BECOME_ASK_PASS"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"Vault password:"})}),(0,r.jsxs)(n.td,{children:["Value of ",(0,r.jsx)(n.code,{children:"secrets/vaultpass"})]}),(0,r.jsxs)(n.td,{children:["Enabled by ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_VAULT_PASS"})]})]})]})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If a password is required to login to the manager node, ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_PASS=True"})," must be set."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If an SSH key is required to login to the manager node, the key has to be added on the manager\nnode to ",(0,r.jsx)(n.code,{children:"~/.ssh/authorized_keys"})," in the home directory of the user specified as ",(0,r.jsx)(n.code,{children:"ANSIBLE_USER"})," first."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If the error ",(0,r.jsx)(n.code,{children:"ERROR! Attempting to decrypt but no vault secrets found"})," occurs, ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_VAULT_PASS=True"}),"\nhas to be set."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If the error ",(0,r.jsx)(n.code,{children:"/bin/sh: 1: /usr/bin/python: not found occurs"}),", Python has to be installed first on\nthe manager node:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_USER=osism ./run.sh python3\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If you receive the following error message ",(0,r.jsx)(n.code,{children:"ssh: Too many authentication failures"})," set\n",(0,r.jsx)(n.code,{children:"ANSIBLE_SSH_ARGS"})," environment variable to use only the operator ssh key for authentication."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'export ANSIBLE_SSH_ARGS="-o IdentitiesOnly=yes"\n'})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The warning message ",(0,r.jsx)(n.code,{children:"[WARNING]: running playbook inside collection osism.manager"})," can be ignored"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"If Ansible Vault is used, let Ansible ask for the Vault password:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"export ANSIBLE_ASK_VAULT_PASS=True\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Details on all parameters can be found in\n",(0,r.jsx)(n.a,{href:"https://docs.ansible.com/ansible/latest/reference_appendices/config.html",children:"Ansible Configuration Settings"}),"\nin the Ansible documentation."]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Environment variable"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_PASS"})}),(0,r.jsx)(n.td,{children:"Boolean"}),(0,r.jsx)(n.td,{children:"This controls whether an Ansible playbook should prompt for a login password. If using SSH keys for authentication, you probably do not need to change this setting."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_VAULT_PASS"})}),(0,r.jsx)(n.td,{children:"Boolean"}),(0,r.jsx)(n.td,{children:"This controls whether an Ansible playbook should prompt for a vault password."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_BECOME_ASK_PASS"})}),(0,r.jsx)(n.td,{children:"Boolean"}),(0,r.jsx)(n.td,{children:"Toggle to prompt for privilege escalation password."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_SSH_ARGS"})}),(0,r.jsx)(n.td,{children:"String"}),(0,r.jsx)(n.td,{children:"If set, this will override the Ansible default ssh arguments."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"ANSIBLE_USER"})}),(0,r.jsx)(n.td,{children:"String"}),(0,r.jsx)(n.td,{children:"The user Ansible \u2018logs in\u2019 as."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["To verify the creation of the operator user, use the private key file ",(0,r.jsx)(n.code,{children:"id_rsa.operator"}),". Make"]}),(0,r.jsx)(n.td,{}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["sure you purge all keys from ssh-agent identity cache using ",(0,r.jsx)(n.code,{children:"ssh-add -D"}),". You can print the list"]}),(0,r.jsx)(n.td,{}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsxs)(n.td,{children:["using ",(0,r.jsx)(n.code,{children:"ssh-add -l"}),". The list should be empty."]}),(0,r.jsx)(n.td,{}),(0,r.jsx)(n.td,{})]})]})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"ssh-add -D\nssh -o IdentitiesOnly=yes -i id_rsa.operator dragon@testbed-manager\n"})}),"\n",(0,r.jsx)(n.h2,{id:"apply-the-network-configuration",children:"Apply the network configuration"}),"\n",(0,r.jsxs)(n.p,{children:["Most of the parameters required for Ansible (",(0,r.jsx)(n.code,{children:"ANSIBLE_BECOME_ASK_PASS"}),", ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_PASS"}),", ",(0,r.jsx)(n.code,{children:"ANSIBLE_USER"}),", ...)\nin the previous step are no longer necessary. If Ansible Vault is used, however, ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_VAULT_PASS"}),"\nmust still be set."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"export ANSIBLE_ASK_VAULT_PASS=True\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To prevent recurring installation of Ansible Collections, ",(0,r.jsx)(n.code,{children:"export INSTALL_ANSIBLE_ROLES=False"})," can be set."]}),"\n",(0,r.jsx)(n.p,{children:"The network configuration, already present on a node should be backuped before this step.\nThen you can deploy the network configuration with the network role."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh network\n"})}),"\n",(0,r.jsx)(n.p,{children:"Upon completion of the network configurtion, a node reboot should be performed to ensure the configuration\nis functional and reboot safe. Since network services are not restarted automatically, later changes to the\nnetwork configuration are not effective without a manual apply of the network configuration or reboot of the\nnodes."}),"\n",(0,r.jsx)(n.h2,{id:"bootstrap",children:"Bootstrap"}),"\n",(0,r.jsxs)(n.p,{children:["Most of the parameters required for Ansible (",(0,r.jsx)(n.code,{children:"ANSIBLE_BECOME_ASK_PASS"}),", ",(0,r.jsx)(n.code,{children:"ANSIBLE_ASK_PASS"}),", ",(0,r.jsx)(n.code,{children:"ANSIBLE_USER"}),", ...)\nin the previous step are no longer necessary."]}),"\n",(0,r.jsxs)(n.p,{children:["If Ansible Vault is used, however, ",(0,r.jsx)(n.code,{children:"export ANSIBLE_ASK_VAULT_PASS=True"})," must still be set."]}),"\n",(0,r.jsxs)(n.p,{children:["To prevent recurring installation of Ansible Collections, ",(0,r.jsx)(n.code,{children:"export INSTALL_ANSIBLE_ROLES=False"})," can be set.\nThis is recommended."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Bootstrap the manager node."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh bootstrap\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Reboot the manager node."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh reboot\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"deploy",children:"Deploy"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Transfer the configuration repository."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh configuration\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Deploy the Traefik service. This is optional and only necessary if the Traefik service is to be used."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh traefik\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Deploy the Netbox service. This is optional and only necessary if the Netbox service is to be used."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh netbox\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Deploy the manager service."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"./run.sh manager\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Finally, the Ansible Vault password is made known on the manager node."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism set vault password\nAnsible Vault password: ********\n"})}),"\n",(0,r.jsx)(n.p,{children:"Ready. The manager is now prepared and you can continue with the bootstrap of the other nodes.\nThe seed node used until here is no longer necessary."})]})}function a(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>d,a:()=>t});var r=s(7294);const o={},i=r.createContext(o);function t(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:t(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);