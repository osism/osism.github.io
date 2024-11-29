"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7981],{731:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>d,toc:()=>l});var i=n(5893),t=n(1151);const s={sidebar_label:"Rookify (technical preview)",sidebar_position:40},r="Rookify (Technical Preview)",d={id:"guides/troubleshooting-guide/rookify",title:"Rookify (Technical Preview)",description:"Rookify is developed to migrate from Ceph-Ansible to Rook in place and without downtime.",source:"@site/docs/guides/troubleshooting-guide/rookify.md",sourceDirName:"guides/troubleshooting-guide",slug:"/guides/troubleshooting-guide/rookify",permalink:"/docs/guides/troubleshooting-guide/rookify",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/troubleshooting-guide/rookify.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Rookify (technical preview)",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"OpenStack",permalink:"/docs/guides/troubleshooting-guide/openstack"},next:{title:"Ceph",permalink:"/docs/guides/troubleshooting-guide/ceph"}},c={},l=[{value:"SSH Issues",id:"ssh-issues",level:2},{value:"Frozen State",id:"frozen-state",level:2}];function a(e){const o={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.header,{children:(0,i.jsx)(o.h1,{id:"rookify-technical-preview",children:"Rookify (Technical Preview)"})}),"\n",(0,i.jsx)(o.admonition,{type:"warning",children:(0,i.jsxs)(o.p,{children:["Rookify is developed to migrate from Ceph-Ansible to Rook ",(0,i.jsx)(o.em,{children:"in place"})," and ",(0,i.jsx)(o.em,{children:"without downtime"}),".\nNevertheless, it is ",(0,i.jsx)(o.strong,{children:"strongly advised"})," to test Rookify in a controlled environment first, such as the ",(0,i.jsx)(o.a,{href:"https://github.com/osism/testbed",children:"OSISM testbed"}),". Additionally ensure that precautionary backups are made and all other necessary safety measures are in place."]})}),"\n",(0,i.jsxs)(o.p,{children:["For a condensed summary of the information covered here, refer to the ",(0,i.jsx)(o.a,{href:"https://github.com/SovereignCloudStack/rookify",children:"Rookify GitHub repository"}),"."]}),"\n",(0,i.jsx)(o.h2,{id:"ssh-issues",children:"SSH Issues"}),"\n",(0,i.jsx)(o.p,{children:(0,i.jsx)(o.strong,{children:'"Failed to load private key"'})}),"\n",(0,i.jsxs)(o.ul,{children:["\n",(0,i.jsxs)(o.li,{children:["Ensure the ",(0,i.jsx)(o.code,{children:"id-rsa"}),' keys are "clean" and do not contain unexpected strings like "<<EOF".']}),"\n",(0,i.jsxs)(o.li,{children:["Clean the keys manually, or use the following command to reformat the keyfile: ",(0,i.jsx)(o.code,{children:'ssh-keygen -p -N "" -f ssh.key'}),"."]}),"\n"]}),"\n",(0,i.jsx)(o.p,{children:(0,i.jsx)(o.strong,{children:'"Too many authentications error"'})}),"\n",(0,i.jsxs)(o.ul,{children:["\n",(0,i.jsx)(o.li,{children:"This can occur if too many keys are loaded by the ssh-agent."}),"\n",(0,i.jsxs)(o.li,{children:["Disable the ssh-agent on your machine. You can do this manually or by allowing ",(0,i.jsx)(o.code,{children:"direnv"})," to use ",(0,i.jsx)(o.code,{children:".envrc"})," with the command ",(0,i.jsx)(o.code,{children:"direnv allow"}),". To install ",(0,i.jsx)(o.code,{children:"direnv"})," on your machine refer to ",(0,i.jsx)(o.a,{href:"https://direnv.net/docs/installation.html",children:"Direnv's documentation"})]}),"\n"]}),"\n",(0,i.jsx)(o.h2,{id:"frozen-state",children:"Frozen State"}),"\n",(0,i.jsxs)(o.ul,{children:["\n",(0,i.jsx)(o.li,{children:"If the Rookify process freezes, check your connections."}),"\n",(0,i.jsxs)(o.li,{children:["In the OSISM testbed, ensure the VPN connection is active. For help to setup the VPN connection for the Testbed refer to ",(0,i.jsx)(o.a,{href:"https://osism.tech/docs/guides/other-guides/testbed/#vpn-access",children:"OSISM's documentation for testbed setup"}),"."]}),"\n"]})]})}function h(e={}){const{wrapper:o}={...(0,t.a)(),...e.components};return o?(0,i.jsx)(o,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},1151:(e,o,n)=>{n.d(o,{Z:()=>d,a:()=>r});var i=n(7294);const t={},s=i.createContext(t);function r(e){const o=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function d(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:o},e.children)}}}]);