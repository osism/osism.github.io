"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1574],{1257:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var i=s(5893),t=s(1151);const o={sidebar_label:"Operations Guide",sidebar_position:30},a="Operations Guide",r={id:"guides/operations-guide/index",title:"Operations Guide",description:"Change Node states",source:"@site/docs/guides/operations-guide/index.md",sourceDirName:"guides/operations-guide",slug:"/guides/operations-guide/",permalink:"/docs/guides/operations-guide/",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/index.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_label:"Operations Guide",sidebar_position:30},sidebar:"tutorialSidebar",previous:{title:"Tuned",permalink:"/docs/guides/configuration-guide/services/tuned"},next:{title:"Manager",permalink:"/docs/guides/operations-guide/manager/"}},d={},l=[{value:"Change Node states",id:"change-node-states",level:2},{value:"Maintenance",id:"maintenance",level:3},{value:"Bootstrap",id:"bootstrap",level:3},{value:"Use of custom plays",id:"use-of-custom-plays",level:2},{value:"Manage services",id:"manage-services",level:2},{value:"Manage containers",id:"manage-containers",level:2},{value:"Reboot nodes",id:"reboot-nodes",level:2},{value:"Working with the OOB Board via IPMI",id:"working-with-the-oob-board-via-ipmi",level:2},{value:"Display the IP address",id:"display-the-ip-address",level:3}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"operations-guide",children:"Operations Guide"}),"\n",(0,i.jsx)(n.h2,{id:"change-node-states",children:"Change Node states"}),"\n",(0,i.jsx)(n.p,{children:"A node can be in different states. Depending on the state, different actions\nare possible or are triggered."}),"\n",(0,i.jsx)(n.p,{children:"The individual states of a node can be retrieved via Ansible Facts and local\nfiles on the node itself."}),"\n",(0,i.jsx)(n.h3,{id:"maintenance",children:"Maintenance"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism set maintenance NODE\nosism noset maintenance NODE\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Ansible fact: ",(0,i.jsx)(n.code,{children:"ansible_local.osism.maintenance"})]}),"\n",(0,i.jsxs)(n.li,{children:["State file: ",(0,i.jsx)(n.code,{children:"/etc/osism/maintenance"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"bootstrap",children:"Bootstrap"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism set bootstrap NODE\nosism noset bootstrap NODE\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Ansible fact: ",(0,i.jsx)(n.code,{children:"ansible_local.osism.bootstrap"})]}),"\n",(0,i.jsxs)(n.li,{children:["State file: ",(0,i.jsx)(n.code,{children:"/etc/osism/bootstrap"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"use-of-custom-plays",children:"Use of custom plays"}),"\n",(0,i.jsx)(n.p,{children:"Custom Plays can be used in all environments in the configuration repository."}),"\n",(0,i.jsxs)(n.p,{children:["For example, this is a play to prepare all devices to be used for Ceph on a Ceph\nresource node. It is saved in the configuration repository in the file\n",(0,i.jsx)(n.code,{children:"environments/ceph/playbook-wipe-partitions.yml"}),". It is run with\n",(0,i.jsx)(n.code,{children:"osism apply -e ceph wipe-parititons"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/playbook-wipe-partitions.yml',children:'---\n- name: Wipe partitions\n  hosts: ceph-resource\n  gather_facts: false\n\n  tasks:\n    - name: Wipe partitions\n      become: true\n      ansible.builtin.shell: |\n        wipefs --all "{{ item }}"\n        dd if=/dev/zero of="{{ item }}" bs=1 count=4096\n      changed_when: false\n      with_items: "{{ devices }}"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"manage-services",children:"Manage services"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply manage-service \\\n  -e service_name=rsysloc \\\n  -e service_state=restarted\n"})}),"\n",(0,i.jsx)(n.h2,{id:"manage-containers",children:"Manage containers"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply manage-container \\\n  -e container_name=nova_compute \\\n  -e container_action=restart\n"})}),"\n",(0,i.jsx)(n.h2,{id:"reboot-nodes",children:"Reboot nodes"}),"\n",(0,i.jsx)(n.p,{children:"When using reboot play, the node is rebooted directly. It is not ensured in\nadvance that there is no more payload on the node and no services etc. are\ndisabled."}),"\n",(0,i.jsxs)(n.p,{children:["Reboot node ",(0,i.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz"})," and wait until the reboot has\nbeen completed and the system is accessible again."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply reboot \\\n  -e reboot_wait=True \\\n  -e ireallymeanit=yes \\\n  -l testbed-node-0.testbed.osism.xyz\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Reboot node ",(0,i.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz"})," and do not wait for the reboot\nto complete."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply reboot \\\n  -e ireallymeanit=yes \\\n  -l testbed-node-0.testbed.osism.xyz\n"})}),"\n",(0,i.jsx)(n.h2,{id:"working-with-the-oob-board-via-ipmi",children:"Working with the OOB Board via IPMI"}),"\n",(0,i.jsx)(n.h3,{id:"display-the-ip-address",children:"Display the IP address"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"$ sudo ipmitool lan print | grep 'IP Address'\nIP Address Source       : DHCP Address\nIP Address              : 10.10.0.100\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var i=s(7294);const t={},o=i.createContext(t);function a(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);