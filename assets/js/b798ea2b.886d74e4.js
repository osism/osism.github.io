"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4744],{2407:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=i(5893),t=i(1151);const o={sidebar_label:"Apply"},s="Apply",l={id:"guides/operations-guide/manager/apply",title:"Apply",description:"Applies are there to roll out Ansible Plays.  These are executed as background activity via a queuing system so that, for example, the loss of an SSH connection does not result in the execution being aborted.",source:"@site/docs/guides/operations-guide/manager/apply.md",sourceDirName:"guides/operations-guide/manager",slug:"/guides/operations-guide/manager/apply",permalink:"/docs/guides/operations-guide/manager/apply",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/manager/apply.md",tags:[],version:"current",frontMatter:{sidebar_label:"Apply"},sidebar:"tutorialSidebar",previous:{title:"Manager",permalink:"/docs/guides/operations-guide/manager/"},next:{title:"Console",permalink:"/docs/guides/operations-guide/manager/console"}},r={},c=[{value:"List all available plays",id:"list-all-available-plays",level:2},{value:"Apply a role",id:"apply-a-role",level:2},{value:"Use of custom plays and roles",id:"use-of-custom-plays-and-roles",level:2},{value:"Example play with roles: Manage the infrastructure of the SCS testing environment",id:"example-play-with-roles-manage-the-infrastructure-of-the-scs-testing-environment",level:3},{value:"Example play: Wiping partitions",id:"example-play-wiping-partitions",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"apply",children:"Apply"})}),"\n",(0,a.jsxs)(n.p,{children:["Applies are there to roll out Ansible Plays.  These are executed as background activity via a queuing system so that, for example, the loss of an SSH connection does not result in the execution being aborted.\nIn this case, the logs can also be analyzed ",(0,a.jsx)(n.a,{href:"./log",children:"retrospectively"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"list-all-available-plays",children:"List all available plays"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"$ osism apply\n2023-09-30 10:09:25 | INFO     | No role given for execution. The roles listed in the table can be used.\n+------------------------------------------------------------------+----------------+\n| Role                                                             | Environment    |\n|------------------------------------------------------------------+----------------|\n| aodh                                                             | kolla          |\n| barbican                                                         | kolla          |\n| bifrost                                                          | kolla          |\n| bifrost-keypair                                                  | kolla          |\n| ceilometer                                                       | kolla          |\n| certificates                                                     | generic        |\n| cinder                                                           | kolla          |\n| cloudkitty                                                       | kolla          |\n| collectd                                                         | kolla          |\n| common                                                           | kolla          |\n| designate                                                        | kolla          |\n| elasticsearch                                                    | kolla          |\n| etcd                                                             | kolla          |\n| glance                                                           | kolla          |\n| gnocchi                                                          | kolla          |\n| grafana                                                          | kolla          |\n| heat                                                             | kolla          |\n| horizon                                                          | kolla          |\n| ironic                                                           | kolla          |\n| iscsi                                                            | kolla          |\n...\n"})}),"\n",(0,a.jsx)(n.h2,{id:"apply-a-role",children:"Apply a role"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"$ osism apply operator -l node01\n2024-06-14 09:33:10 | INFO     | Task f94a2e6f-d199-421c-b7b7-743db4661305 (operator) was prepared for execution.\n2024-06-14 09:33:10 | INFO     | It takes a moment until task f94a2e6f-d199-421c-b7b7-743db4661305 (operator) has been started and output is visible here.\n\nPLAY [Make ssh pipelining working] *********************************************\n\nTASK [Do not require tty for all users] ****************************************\nok: [node01]\n\n...\n...\n\nPLAY RECAP *********************************************************************\n2024-06-14 09:34:14 | INFO     | Play has been completed. There may now be a delay until all logs have been written.\n2024-06-14 09:34:14 | INFO     | Please wait and do not abort execution.\nnode01          : ok=11   changed=0    unreachable=0    failed=0    skipped=5    rescued=0    ignored=0\n"})}),"\n",(0,a.jsx)(n.h2,{id:"use-of-custom-plays-and-roles",children:"Use of custom plays and roles"}),"\n",(0,a.jsx)(n.p,{children:"Custom plays and roles can be used in all environments of the configuration repository to add\nlogic which should also be part of the configuration repository."}),"\n",(0,a.jsxs)(n.admonition,{type:"info",children:[(0,a.jsx)(n.p,{children:"It seems to us to be a good idea to minimize the amount of such special solutions, as extensive in-house solutions can potentially result in unexpected interactions or\nadditional testing-, integration and maintenance work."}),(0,a.jsx)(n.p,{children:"We would also like to make a clear recommendation that, if possible, missing functions should be resolved by contributing to OSISM."})]}),"\n",(0,a.jsx)(n.p,{children:"Some facts about custom plays and roles:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Plays must be stored under the following naming scheme so that they can be executed with the OSISM command.\n",(0,a.jsx)(n.code,{children:"environments/<environment>/playbook-<the name of the play>.yml"})]}),"\n",(0,a.jsxs)(n.li,{children:['Without specifying a particular environment the "custom" environment is used.',"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"# executes: environments/custom/playbook-setup-serial-device.yml\nosism apply setup-serial-device\n"})}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["Specifying a play of a environment:","\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"# executes environments/deph/playbook-wipe-parititons.yml\nosism apply -e ceph wipe-parititons\n"})}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["Custom roles that are used for a specific environment must be stored under the following path so that they can be found by plays.\n",(0,a.jsx)(n.code,{children:"environments/<environment>/roles/<role>/"})]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"example-play-with-roles-manage-the-infrastructure-of-the-scs-testing-environment",children:"Example play with roles: Manage the infrastructure of the SCS testing environment"}),"\n",(0,a.jsx)(n.p,{children:"The SCS hardware landscape testing environment provides a selection of custom roles which are used\nto manage some infrastructural aspects of this testing environment."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Instructions ",(0,a.jsx)(n.a,{href:"https://github.com/SovereignCloudStack/hardware-landscape/blob/main/documentation/System_Deployment.md",children:"how to use"})," the custom code"]}),"\n",(0,a.jsxs)(n.li,{children:["The custom  ",(0,a.jsx)(n.a,{href:"https://github.com/SovereignCloudStack/hardware-landscape/tree/main/environments/custom",children:"playsi and roles"})]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"example-play-wiping-partitions",children:"Example play: Wiping partitions"}),"\n",(0,a.jsx)(n.p,{children:"For example, this is a play to prepare all devices to be used for Ceph on a Ceph\nresource node."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["It is saved in the configuration repository in the file ",(0,a.jsx)(n.code,{children:"environments/ceph/playbook-wipe-partitions.yml"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:["It is run with ",(0,a.jsx)(n.code,{children:"osism apply -e ceph wipe-parititons"}),"."]}),"\n"]}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsx)(n.p,{children:"Just to be on the safe side: The following example can be useful, but it can also cause a lot of damage. Be warned!"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/ceph/playbook-wipe-partitions.yml',children:'---\n- name: Wipe partitions\n  hosts: ceph-resource\n  gather_facts: false\n\n  tasks:\n    - name: Find all logical devices with prefix ceph\n      ansible.builtin.find:\n        paths: /dev/mapper\n        recurse: false\n        file_type: link\n        patterns: "ceph*"\n      register: result\n\n    - name: Remove all ceph related logical devices\n      become: true\n      ansible.builtin.command: "dmsetup remove {{ item.path }}"\n      loop: "{{ result.files }}"\n      changed_when: true\n\n    - name: Wipe partitions with wipefs\n      become: true\n      ansible.builtin.command: "wipefs --all {{ item }}"\n      changed_when: true\n      loop: "{{ ansible_local.testbed_ceph_devices_all }}"\n\n    - name: Overwrite first 32M with zeros\n      become: true\n      ansible.builtin.command: "dd if=/dev/zero of={{ item }} bs=1M count=32 oflag=direct,dsync"\n      changed_when: true\n      loop: "{{ ansible_local.testbed_ceph_devices_all }}"\n'})})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>s});var a=i(7294);const t={},o=a.createContext(t);function s(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);