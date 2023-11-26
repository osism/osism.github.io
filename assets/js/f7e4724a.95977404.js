"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[5826],{2583:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>t,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var o=n(5893),i=n(1151);const r={sidebar_label:"Bootstrap",sidebar_position:40},t="Bootstrap",l={id:"guides/deploy-guide/bootstrap",title:"Bootstrap",description:"Before the nodes can be bootstrapped, they must all have already been provisioned.",source:"@site/docs/guides/deploy-guide/bootstrap.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/bootstrap",permalink:"/docs/guides/deploy-guide/bootstrap",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/bootstrap.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Bootstrap",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Provisioning",permalink:"/docs/guides/deploy-guide/provisioning"},next:{title:"Services",permalink:"/docs/guides/deploy-guide/services/"}},a={},d=[];function c(e){const s={a:"a",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.h1,{id:"bootstrap",children:"Bootstrap"}),"\n",(0,o.jsxs)(s.p,{children:["Before the nodes can be bootstrapped, they must all have already been provisioned.\nThe guide for this can be found in the section\n",(0,o.jsx)(s.a,{href:"./provisioning",children:"Provisioning of management and control plane nodes"})]}),"\n",(0,o.jsx)(s.p,{children:"The following steps are applied to bootstrap all nodes. After the completion of the bootstrap,\nthe nodes are already ready for use."}),"\n",(0,o.jsxs)(s.ol,{children:["\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Create operator user."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply operator -u osism\n"})}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["When using the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/node-image",children:"osism/node-image"})," the user is ",(0,o.jsx)(s.code,{children:"osism"}),"\nand the password of this user is ",(0,o.jsx)(s.code,{children:"password"}),". If you install Ubuntu manually the user usually\nis ",(0,o.jsx)(s.code,{children:"ubuntu"}),". If you want to use any other user here, that's no problem. It is important that\nthis user has sudo rights. The password according to what you have set yourself."]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["The operator public SSH key has to be added in advance on all nodes to ",(0,o.jsx)(s.code,{children:"authorized_keys"})," file\nof the user specified with ",(0,o.jsx)(s.code,{children:"-u"}),". This key is stored as ",(0,o.jsx)(s.code,{children:"operator_public_key"})," in the file\n",(0,o.jsx)(s.code,{children:"environments/configuration.yml"}),"."]}),"\n",(0,o.jsxs)(s.p,{children:["Alternatively (not recommended), the password can be stored in plain text in a file ",(0,o.jsx)(s.code,{children:"/opt/configuration/secrets/conn_password"}),".\nThe parameter ",(0,o.jsx)(s.code,{children:"--conn-pass-file /opt/configuration/secrets/conn_password"})," must then also be specified:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply operator -u osism \\\n  --conn-pass-file /opt/configuration/secrets/conn_password\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["It is important that this user has sudo rights with ",(0,o.jsx)(s.code,{children:"NOPASSWD"}),"."]}),"\n",(0,o.jsxs)(s.p,{children:["Alternatively (not recommended), the password can be stored in plain text in a file ",(0,o.jsx)(s.code,{children:"/opt/configuration/secrets/become_password"}),".\nThe parameter ",(0,o.jsx)(s.code,{children:"--become-pass-file /opt/configuration/secrets/become_password"})," must then also be specified:"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply operator -u osism \\\n  --become-pass-file /opt/configuration/secrets/become_password\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"If a password is required for both sudo and login, use both arguments at the same time."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply operator -u osism \\\n  --become-pass-file /opt/configuration/secrets/become_password \\\n  --conn-pass-file /opt/configuration/secrets/conn_password\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsxs)(s.p,{children:["When using the ",(0,o.jsx)(s.a,{href:"https://github.com/osism/node-image",children:"osism/node-image"})," the user is ",(0,o.jsx)(s.code,{children:"osism"})," and the password of this\nuser is ",(0,o.jsx)(s.code,{children:"password"}),". If you install Ubuntu manually the user usually is ",(0,o.jsx)(s.code,{children:"ubuntu"}),". The password according to what you\nhave set yourself"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Proxy deployment (optional). This is only necessary if you use the proxy on the manager to enable external access to\nthe nodes."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply squid\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Proxy configuration (optional). This is only necessary if you use the proxy on the manager to enable external access to\nthe nodes."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply proxy\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Network configuration. It is recommended to backup the existing network configuration."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply network\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Reboot (optional). The reboot at this point is recommended to ensure that the network configuration is working."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply reboot -l 'all:!manager' -e ireallymeanit=yes\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Check if all systems are reachable (you probably have to do this several times until all systems are accessible)."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply ping\n"})}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"System is currently rebooting and is not yet accessible via network."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:'fatal: [net003]: UNREACHABLE! => {"changed": false, "msg": "Connection timed\nout.", "unreachable": true}``\n'})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"System has already been rebooted and is not accessible via the network."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:'fatal: [net003]: UNREACHABLE! => {"changed": false, "msg": "EOF on stream;\nlast 100 lines received:\\nssh: connect to host 10.15.0.33 port 22: No route\nto host\\r", "unreachable": true}\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Refresh facts."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply facts\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Bootstrap."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply bootstrap\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Reboot (non-optional). Since the kernel version often changes after the initial bootstrap,\nthe reboot should always be performed."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply reboot -l 'all:!manager' -e ireallymeanit=yes\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Prepare the SSH configuration of the manager node."}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply sshconfig\n"})}),"\n"]}),"\n",(0,o.jsxs)(s.li,{children:["\n",(0,o.jsx)(s.p,{children:"Make all SSH public keys known."}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply known-hosts\n"})}),"\n",(0,o.jsxs)(s.ol,{start:"11",children:["\n",(0,o.jsx)(s.li,{children:"Check again if all systems are reachable (you probably have to do this several times until all systems are accessible)."}),"\n"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{children:"osism apply ping\n"})}),"\n",(0,o.jsx)(s.p,{children:"Ready. All nodes are now bootstrapped and available to deploy services."})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>l,a:()=>t});var o=n(7294);const i={},r=o.createContext(i);function t(e){const s=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),o.createElement(r.Provider,{value:s},e.children)}}}]);