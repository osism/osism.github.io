"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9654],{8902:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var o=n(5893),s=n(1151);const i={sidebar_label:"OpenStack",sidebar_position:40},a="OpenStack",r={id:"guides/troubleshooting-guide/openstack",title:"OpenStack",description:"Database creation fails",source:"@site/docs/guides/troubleshooting-guide/openstack.md",sourceDirName:"guides/troubleshooting-guide",slug:"/guides/troubleshooting-guide/openstack",permalink:"/de/docs/guides/troubleshooting-guide/openstack",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/troubleshooting-guide/openstack.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"OpenStack",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Manager",permalink:"/de/docs/guides/troubleshooting-guide/manager"},next:{title:"User Guide",permalink:"/de/docs/guides/user-guide/"}},d={},c=[{value:"Database creation fails",id:"database-creation-fails",level:2}];function l(e){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"openstack",children:"OpenStack"}),"\n",(0,o.jsx)(t.h2,{id:"database-creation-fails",children:"Database creation fails"}),"\n",(0,o.jsx)(t.p,{children:"Problem:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:"TASK [keystone : Creating keystone database] ***********************************\nfatal: [testbed-node-0]: FAILED! => changed=false\n  action: mysql_db\n  msg: 'unable to find /var/lib/ansible/.my.cnf. Exception message: (2003, \"Can''t connect to MySQL server on ''api-int.local'' ([Errno 111] Connection refused)\")'\n"})}),"\n",(0,o.jsx)(t.p,{children:"Solution:"}),"\n",(0,o.jsxs)(t.p,{children:["Restart the ",(0,o.jsx)(t.code,{children:"kolla_toolbox"})," container. in this case on the node ",(0,o.jsx)(t.code,{children:"testbed-node-0"}),"."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{children:"$ osism console testbed-node-0/\ntestbed-node-0>>> restart kolla_toolbox\nkolla_toolbox\ntestbed-node-0>>>\n"})})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>a});var o=n(7294);const s={},i=o.createContext(s);function a(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);