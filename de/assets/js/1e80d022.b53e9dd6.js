"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3713],{6703:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>d,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>t});var i=n(5893),a=n(1151);const s={sidebar_label:"Infrastructure",sidebar_position:30},d="Infrastructure",o={id:"guides/upgrade-guide/infrastructure",title:"Infrastructure",description:"Kubernetes",source:"@site/docs/guides/upgrade-guide/infrastructure.md",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/infrastructure",permalink:"/de/docs/guides/upgrade-guide/infrastructure",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/infrastructure.md",tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_label:"Infrastructure",sidebar_position:30},sidebar:"tutorialSidebar",previous:{title:"Docker",permalink:"/de/docs/guides/upgrade-guide/docker"},next:{title:"Logging & Monitoring",permalink:"/de/docs/guides/upgrade-guide/logging-monitoring"}},l={},t=[{value:"Kubernetes",id:"kubernetes",level:2},{value:"Cron, Fluentd &amp; Kolla Toolbox",id:"cron-fluentd--kolla-toolbox",level:2},{value:"Loadbalancer",id:"loadbalancer",level:2},{value:"Redis",id:"redis",level:2},{value:"Memcached",id:"memcached",level:2},{value:"RabbitMQ",id:"rabbitmq",level:2},{value:"MariaDB",id:"mariadb",level:2}];function c(e){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h1,{id:"infrastructure",children:"Infrastructure"}),"\n",(0,i.jsx)(r.h2,{id:"kubernetes",children:"Kubernetes"}),"\n",(0,i.jsx)(r.h2,{id:"cron-fluentd--kolla-toolbox",children:"Cron, Fluentd & Kolla Toolbox"}),"\n",(0,i.jsxs)(r.p,{children:["The common role of Kolla is used to manage the services ",(0,i.jsx)(r.code,{children:"cron"}),", ",(0,i.jsx)(r.code,{children:"fluentd"}),"\nand ",(0,i.jsx)(r.code,{children:"kolla-toolbox"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["It is important to do this upgrade before any other upgrades in the Kolla\nenvironment, as parts of the other upgrades depend on the ",(0,i.jsx)(r.code,{children:"kolla-toolbox"}),"\nservice."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"osism apply -a pull common\nosism apply -a upgrade common\n"})}),"\n",(0,i.jsx)(r.h2,{id:"loadbalancer",children:"Loadbalancer"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"osism apply -a pull loadbalancer\nosism apply -a upgrade loadbalancer\n"})}),"\n",(0,i.jsx)(r.h2,{id:"redis",children:"Redis"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"osism apply -a pull redis\nosism apply -a upgrade redis\n"})}),"\n",(0,i.jsx)(r.h2,{id:"memcached",children:"Memcached"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"osism apply -a pull memcached\nosism apply -a upgrade memcached\n"})}),"\n",(0,i.jsx)(r.h2,{id:"rabbitmq",children:"RabbitMQ"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"osism apply -a pull rabbitmq\nosism apply -a upgrade rabbitmq\n"})}),"\n",(0,i.jsx)(r.h2,{id:"mariadb",children:"MariaDB"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{children:"osism apply -a pull mariadb\nosism apply -a upgrade mariadb\n"})})]})}function u(e={}){const{wrapper:r}={...(0,a.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>o,a:()=>d});var i=n(7294);const a={},s=i.createContext(a);function d(e){const r=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:d(e.components),i.createElement(s.Provider,{value:r},e.children)}}}]);