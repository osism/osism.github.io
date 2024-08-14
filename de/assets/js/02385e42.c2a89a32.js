"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7147],{9723:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=n(5893),i=n(1151);const o={sidebar_label:"Get"},r="Get",a={id:"guides/operations-guide/manager/get",title:"Get",description:"A get command is available in the OSISM CLI. This allows to gather specific information.",source:"@site/docs/guides/operations-guide/manager/get.md",sourceDirName:"guides/operations-guide/manager",slug:"/guides/operations-guide/manager/get",permalink:"/de/docs/guides/operations-guide/manager/get",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/manager/get.md",tags:[],version:"current",frontMatter:{sidebar_label:"Get"},sidebar:"tutorialSidebar",previous:{title:"Console",permalink:"/de/docs/guides/operations-guide/manager/console"},next:{title:"Logging",permalink:"/de/docs/guides/operations-guide/manager/log"}},d={},c=[{value:"Hosts",id:"hosts",level:2},{value:"Host variables",id:"host-variables",level:2},{value:"Host facts",id:"host-facts",level:2}];function l(e){const s={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"get",children:"Get"})}),"\n",(0,t.jsxs)(s.p,{children:["A ",(0,t.jsx)(s.code,{children:"get"})," command is available in the OSISM CLI. This allows to gather specific information."]}),"\n",(0,t.jsx)(s.h2,{id:"hosts",children:"Hosts"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Get all hosts defined in the inventory"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"$ osism get hosts\n+-----------------------------------+\n| Host                              |\n|-----------------------------------|\n| testbed-manager.testbed.osism.xyz |\n| testbed-node-0.testbed.osism.xyz  |\n| testbed-node-1.testbed.osism.xyz  |\n| testbed-node-2.testbed.osism.xyz  |\n+-----------------------------------+\n"})}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Get all hosts defined in the inventory that are member of a specific inventory group"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"$ osism get hosts -l manager\n+-----------------------------------+\n| Host                              |\n|-----------------------------------|\n| testbed-manager.testbed.osism.xyz |\n+-----------------------------------+\n\n$ osism get hosts -l control\n+----------------------------------+\n| Host                             |\n|----------------------------------|\n| testbed-node-0.testbed.osism.xyz |\n| testbed-node-1.testbed.osism.xyz |\n| testbed-node-2.testbed.osism.xyz |\n+----------------------------------+\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"host-variables",children:"Host variables"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Get all host vars of a specific node"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"osism get hostvars testbed-manager.testbed.osism.xyz\n"})}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Get a specific host var of a specific node"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"$ osism get hostvars testbed-manager.testbed.osism.xyz ansible_host\n+-----------------------------------+--------------+----------------+\n| Host                              | Variable     | Value          |\n+===================================+==============+================+\n| testbed-manager.testbed.osism.xyz | ansible_host | '192.168.16.5' |\n+-----------------------------------+--------------+----------------+\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"host-facts",children:"Host facts"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Get all facts of a specific node"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"osism get facts testbed-manager.testbed.osism.xyz\n"})}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsx)(s.p,{children:"Get a specific fact of a specific node"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"$ osism get facts testbed-manager.testbed.osism.xyz ansible_architecture\n+-----------------------------------+----------------------+----------+\n| Host                              | Fact                 | Value    |\n+===================================+======================+==========+\n| testbed-manager.testbed.osism.xyz | ansible_architecture | 'x86_64' |\n+-----------------------------------+----------------------+----------+\n"})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>a,a:()=>r});var t=n(7294);const i={},o=t.createContext(i);function r(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);