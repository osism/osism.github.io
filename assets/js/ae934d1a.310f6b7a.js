"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1943],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(n),c=a,h=d["".concat(p,".").concat(c)]||d[c]||m[c]||o;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=c;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[d]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9226:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_label:"Manager",sidebar_position:20},i="Manager",s={unversionedId:"guides/deploy-guide/manager",id:"guides/deploy-guide/manager",title:"Manager",description:"Change into the configuration/environments/manager directory of the configuration repository.",source:"@site/docs/guides/deploy-guide/manager.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/manager",permalink:"/docs/guides/deploy-guide/manager",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/manager.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Manager",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Seed",permalink:"/docs/guides/deploy-guide/seed"},next:{title:"Provisioning",permalink:"/docs/guides/deploy-guide/provisioning"}},p={},l=[{value:"Create operator user",id:"create-operator-user",level:2},{value:"Apply the network configuration",id:"apply-the-network-configuration",level:2},{value:"Bootstrap",id:"bootstrap",level:2},{value:"Deploy",id:"deploy",level:2}],u={toc:l},d="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"manager"},"Manager"),(0,a.kt)("p",null,"Change into the ",(0,a.kt)("inlineCode",{parentName:"p"},"configuration/environments/manager")," directory of the configuration repository.\non the seed node."),(0,a.kt)("p",null,"The deployment of the seed node is documented in the ",(0,a.kt)("a",{parentName:"p",href:"../deploy-guide/seed"},"Deploy Guide for the seed node"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cd configuration/environments/manager\n")),(0,a.kt)("h2",{id:"create-operator-user"},"Create operator user"),(0,a.kt)("p",null,"The operator user is created on each node. It is used as a service account for OSISM. All\ncontainers run with this user. Ansible also uses this user to access the nodes. Commands\non the manager node need to be run as this user. The name of the operator user is always ",(0,a.kt)("inlineCode",{parentName:"p"},"dragon"),"."),(0,a.kt)("p",null,"With ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_USER")," the existing user account is set after the provsioning of the management\nnode. When using the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/osism/node-image"},"osism/node-image")," the user is ",(0,a.kt)("inlineCode",{parentName:"p"},"osism"),"\nand the password of this user is ",(0,a.kt)("inlineCode",{parentName:"p"},"password"),". If you install Ubuntu manually the user usually is ",(0,a.kt)("inlineCode",{parentName:"p"},"ubuntu"),".\nThe password according to what you have set yourself."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"ANSIBLE_BECOME_ASK_PASS=True \\\nANSIBLE_ASK_VAULT_PASS=True \\\nANSIBLE_ASK_PASS=True \\\nANSIBLE_USER=osism \\\n./run.sh operator\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Details on all parameters can be found in\n",(0,a.kt)("a",{parentName:"p",href:"https://docs.ansible.com/ansible/latest/reference_appendices/config.html"},"Ansible Configuration Settings"),"\nin the Ansible documentation.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If a password is required to login to the manager node, ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_ASK_PASS=True")," must be set.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If an SSH key is required to login to the manager node, the key has to be added on the manager\nnode to ",(0,a.kt)("inlineCode",{parentName:"p"},"~/.ssh/authorized_keys")," in the home directory of the user specified as ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_USER")," first.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If the error ",(0,a.kt)("inlineCode",{parentName:"p"},"ERROR! Attempting to decrypt but no vault secrets found")," occurs, ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_ASK_VAULT_PASS=True"),"\nhas to be set.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If the error ",(0,a.kt)("inlineCode",{parentName:"p"},"/bin/sh: 1: /usr/bin/python: not found occurs"),", Python has to be installed first on\nthe manager node:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"ANSIBLE_USER=osism ./run.sh python3\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"To verify the creation of the operator user, use the private key file ",(0,a.kt)("inlineCode",{parentName:"p"},"id_rsa.operator"),". Make\nsure you purge all keys from ssh-agent identity cache using ",(0,a.kt)("inlineCode",{parentName:"p"},"ssh-add -D"),". You can print the list\nusing ",(0,a.kt)("inlineCode",{parentName:"p"},"ssh-add -l"),". The list should be empty."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"ssh-add -D\nssh -o IdentitiesOnly=yes -i id_rsa.operator dragon@testbed-manager\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If you receive the following error message ",(0,a.kt)("inlineCode",{parentName:"p"},"ssh: Too many authentication failures")," set\n",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_SSH_ARGS")," environment variable to use only the operator ssh key for authentication."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},'export ANSIBLE_SSH_ARGS="-o IdentitiesOnly=yes"\n'))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The warning message ",(0,a.kt)("inlineCode",{parentName:"p"},"[WARNING]: running playbook inside collection osism.manager")," can be ignored")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If Ansible Vault is used, let Ansible ask for the Vault password:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"export ANSIBLE_ASK_VAULT_PASS=True\n")))),(0,a.kt)("h2",{id:"apply-the-network-configuration"},"Apply the network configuration"),(0,a.kt)("p",null,"Most of the parameters required for Ansible (",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_BECOME_ASK_PASS"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_ASK_PASS"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_USER"),", ...)\nin the previous step are no longer necessary. If Ansible Vault is used, however, ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_ASK_VAULT_PASS"),"\nmust still be set."),(0,a.kt)("p",null,"To prevent recurring installation of Ansible Collections, ",(0,a.kt)("inlineCode",{parentName:"p"},"export INSTALL_ANSIBLE_ROLES=False")," can be set."),(0,a.kt)("p",null,"The network configuration, already present on a node should be backuped before this step.\nThen you can deploy the network configuration with the network role."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"./run.sh network\n")),(0,a.kt)("p",null,"Upon completion of the network configurtion, a node reboot should be performed to ensure the configuration\nis functional and reboot safe. Since network services are not restarted automatically, later changes to the\nnetwork configuration are not effective without a manual apply of the network configuration or reboot of the\nnodes."),(0,a.kt)("h2",{id:"bootstrap"},"Bootstrap"),(0,a.kt)("p",null,"Most of the parameters required for Ansible (",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_BECOME_ASK_PASS"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_ASK_PASS"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_USER"),", ...)\nin the previous step are no longer necessary. If Ansible Vault is used, however, ",(0,a.kt)("inlineCode",{parentName:"p"},"ANSIBLE_ASK_VAULT_PASS"),"\nmust still be set."),(0,a.kt)("p",null,"To prevent recurring installation of Ansible Collections, ",(0,a.kt)("inlineCode",{parentName:"p"},"export INSTALL_ANSIBLE_ROLES=False")," can be set."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Bootstrap the manager node."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"./run.sh bootstrap\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Reboot the manager node."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"./run.sh reboot\n")))),(0,a.kt)("h2",{id:"deploy"},"Deploy"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Transfer the configuration repository."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"./run.sh configuration\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Deploy the Traefik service. This is optional and only necessary if the Traefik service is to be used."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"./run.sh traefik\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Deploy the Netbox service. This is optional and only necessary if the Netbox service is to be used."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"./run.sh netbox\n"))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Deploy the manager service."),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"./run.sh manager\n")))),(0,a.kt)("p",null,"Ready. The manager is now prepared and you can continue with the bootstrap of the other nodes.\nThe seed node used until here is no longer necessary."))}m.isMDXComponent=!0}}]);