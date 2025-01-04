"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3290],{369:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>d,default:()=>a,frontMatter:()=>r,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"guides/configuration-guide/commons/sshconfig","title":"SSH Config","description":"With the osism.commons.sshconfig role, it is possible to manage a SSH config","source":"@site/docs/guides/configuration-guide/commons/sshconfig.md","sourceDirName":"guides/configuration-guide/commons","slug":"/guides/configuration-guide/commons/sshconfig","permalink":"/docs/guides/configuration-guide/commons/sshconfig","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/commons/sshconfig.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"SSH Config"},"sidebar":"tutorialSidebar","previous":{"title":"Services","permalink":"/docs/guides/configuration-guide/commons/services"},"next":{"title":"Sysctl","permalink":"/docs/guides/configuration-guide/commons/sysctl"}}');var i=s(4848),o=s(8453);const r={sidebar_label:"SSH Config"},d="SSH Config",l={},c=[{value:"Extra config",id:"extra-config",level:2},{value:"Example",id:"example",level:2},{value:"Defaults",id:"defaults",level:2}];function h(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"ssh-config",children:"SSH Config"})}),"\n",(0,i.jsxs)(t.p,{children:["With the ",(0,i.jsx)(t.code,{children:"osism.commons.sshconfig"})," role, it is possible to manage a SSH config\nfile in the home directory of the operator user."]}),"\n",(0,i.jsx)(t.h2,{id:"extra-config",children:"Extra config"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"sshconfig_extra"})," parameter can be used to add any other SSH configuration to the ",(0,i.jsx)(t.code,{children:".ssh/config"})," file."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-yaml",children:"sshconfig_extra: |\n  Host github.com\n\t  ProxyCommand nc -X connect -x <web-proxy-hostname-or-ip>:<web-proxy-port>> ssh.github.com 443\n"})}),"\n",(0,i.jsx)(t.h2,{id:"example",children:"Example"}),"\n",(0,i.jsxs)(t.p,{children:["In the ",(0,i.jsx)(t.a,{href:"https://github.com/osism/testbed",children:"testbed"}),"\nthe ",(0,i.jsx)(t.code,{children:"/home/dragon/.ssh/config"})," file is created on the manager node ",(0,i.jsx)(t.code,{children:"testbed-manager"}),"."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-none",metastring:'title="Example for an assembled /home/dragon/.ssh/config file"',children:"Host testbed-manager\n  HostName testbed-manager.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n\n####################\nHost testbed-node-0\n  HostName testbed-node-0.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n\n####################\nHost testbed-node-1\n  HostName testbed-node-1.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n\n####################\nHost testbed-node-2\n  HostName testbed-node-2.testbed.osism.xyz\n  User dragon\n  Port 22\n  IdentityFile /opt/ansible/secrets/id_rsa.operator\n"})}),"\n",(0,i.jsx)(t.h2,{id:"defaults",children:"Defaults"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Parameter"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Default"}),(0,i.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"sshconfig_groupname"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"all"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"All nodes in this group are included."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"sshconfig_order"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"20"})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:["The ",(0,i.jsx)(t.code,{children:".ssh/config.d"})," directory is used to prepare the ",(0,i.jsx)(t.code,{children:".ssh/config"})," file. You can add your own files in this directory. Everything with a filename prefix smaller than ",(0,i.jsx)(t.code,{children:"sshconfig_order"})," is placed at the beginning of the assembled ",(0,i.jsx)(t.code,{children:".ssh/config"})," file. Anything with a filename prefix greater than ",(0,i.jsx)(t.code,{children:"sshconfig_order"})," goes at the end."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"sshconfig_port"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"22"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:"The SSH port."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"sshconfig_private_key_file"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"/opt/ansible/secrets/id_rsa.operator"})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:["The identity file to use. The file itself must already exist there. The file is created by the ",(0,i.jsx)(t.code,{children:"osism.services.manager"})," role."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"sshconfig_user"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:'"{{ operator_user }}"'})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:["The user in which home directory the ",(0,i.jsx)(t.code,{children:".ssh/config"})," file will be generated."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:"sshconfig_extra"})}),(0,i.jsx)(t.td,{style:{textAlign:"left"},children:(0,i.jsx)(t.code,{children:'""'})}),(0,i.jsxs)(t.td,{style:{textAlign:"left"},children:["Add additional SSH configuration to the end of the ",(0,i.jsx)(t.code,{children:".ssh/config"})," file."]})]})]})]})]})}function a(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>d});var n=s(6540);const i={},o=n.createContext(i);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);