"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1195],{9073:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>d,toc:()=>a});var o=s(5893),t=s(1151);const i={sidebar_label:"Console"},l="Console",d={id:"guides/operations-guide/manager/console",title:"Console",description:"A console command is available in the OSISM CLI. This allows specific parts of the",source:"@site/docs/guides/operations-guide/manager/console.md",sourceDirName:"guides/operations-guide/manager",slug:"/guides/operations-guide/manager/console",permalink:"/de/docs/guides/operations-guide/manager/console",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/manager/console.md",tags:[],version:"current",frontMatter:{sidebar_label:"Console"},sidebar:"tutorialSidebar",previous:{title:"Apply",permalink:"/de/docs/guides/operations-guide/manager/apply"},next:{title:"Get",permalink:"/de/docs/guides/operations-guide/manager/get"}},r={},a=[{value:"Ansible",id:"ansible",level:2},{value:"Clush",id:"clush",level:2},{value:"Container",id:"container",level:2},{value:"SSH",id:"ssh",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"console",children:"Console"}),"\n",(0,o.jsxs)(n.p,{children:["A ",(0,o.jsx)(n.code,{children:"console"})," command is available in the OSISM CLI. This allows specific parts of the\nenvironment to be operated interactively."]}),"\n",(0,o.jsx)(n.h2,{id:"ansible",children:"Ansible"}),"\n",(0,o.jsxs)(n.p,{children:["Used tool: ",(0,o.jsx)(n.a,{href:"https://docs.ansible.com/ansible/latest/cli/ansible-console.html",children:"ansible-console"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism console --type ansible testbed-node-0\nWelcome to the ansible console. Type help or ? to list commands.\n\ndragon@testbed-node-0 (1)[f:5]$ !uptime\ntestbed-node-0 | CHANGED | rc=0 >>\n 18:14:15 up 80 days, 33 min,  0 users,  load average: 4.00, 3.07, 2.67\ndragon@testbed-node-0 (1)[f:5]$\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Shortcut: ",(0,o.jsx)(n.code,{children:"osism console .testbed-node-0"})]}),"\n",(0,o.jsx)(n.h2,{id:"clush",children:"Clush"}),"\n",(0,o.jsxs)(n.p,{children:["Used tool: ",(0,o.jsx)(n.a,{href:"https://clustershell.readthedocs.io",children:"ClusterShell"})]}),"\n",(0,o.jsx)(n.p,{children:"The same groups as defined in the Ansible Inventory can be used."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism console --type clush control\nEnter 'quit' to leave this interactive mode\nWorking with nodes: testbed-node-[0-2]\nclush>\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Shortcut: ",(0,o.jsx)(n.code,{children:"osism console :control"})]}),"\n",(0,o.jsx)(n.h2,{id:"container",children:"Container"}),"\n",(0,o.jsxs)(n.p,{children:["Used tool: ",(0,o.jsx)(n.a,{href:"https://python-prompt-toolkit.readthedocs.io/en/master/index.html",children:"Python Prompt Toolkit"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism console --type container testbed-node-0/fluentd\n(fluentd)[td-agent@testbed-node-0 /]$ ps ax\n    PID TTY      STAT   TIME COMMAND\n      1 ?        Ss     0:00 dumb-init --single-child -- kolla_start\n      7 ?        Sl    24:28 /opt/td-agent/bin/ruby /usr/sbin/td-agent -o /var/log/kolla/fluentd/fluent\n     25 ?        Sl   3519:55 /opt/td-agent/bin/ruby -Eascii-8bit:ascii-8bit /usr/sbin/td-agent -o /var\n    238 pts/0    Ss     0:00 bash\n    247 pts/0    R+     0:00 ps ax\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Shortcut: ",(0,o.jsx)(n.code,{children:"osism console testbed-node-0/fluentd"})]}),"\n",(0,o.jsx)(n.h2,{id:"ssh",children:"SSH"}),"\n",(0,o.jsxs)(n.p,{children:["Used tool: ",(0,o.jsx)(n.a,{href:"https://www.openssh.com",children:"OpenSSH"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"$ osism console --type ssh testbed-node-0\nYou have new mail.\nLast login: Wed Sep 27 18:15:39 2023 from 192.168.16.5\ndragon@testbed-node-0:~$ uptime\n 18:16:25 up 80 days, 35 min,  1 user,  load average: 2.85, 3.04, 2.71\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Shortcut: ",(0,o.jsx)(n.code,{children:"osism console testbed-node-0"})]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>d,a:()=>l});var o=s(7294);const t={},i=o.createContext(t);function l(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);