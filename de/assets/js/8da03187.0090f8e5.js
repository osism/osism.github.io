"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3394],{7309:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>p,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var r=s(5893),i=s(1151);const o={sidebar_label:"Infrastructure",sidebar_position:10},t="Infrastructure",d={id:"guides/deploy-guide/services/infrastructure",title:"Infrastructure",description:"Common issues with deploying infrastructure services required by OpenStack",source:"@site/docs/guides/deploy-guide/services/infrastructure.md",sourceDirName:"guides/deploy-guide/services",slug:"/guides/deploy-guide/services/infrastructure",permalink:"/de/docs/guides/deploy-guide/services/infrastructure",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/services/infrastructure.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Infrastructure",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Services",permalink:"/de/docs/guides/deploy-guide/services/"},next:{title:"Kubernetes",permalink:"/de/docs/guides/deploy-guide/services/kubernetes"}},l={},c=[];function a(e){const n={a:"a",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"infrastructure",children:"Infrastructure"}),"\n",(0,r.jsxs)(n.p,{children:["Common issues with deploying infrastructure services required by OpenStack\nare documented in the ",(0,r.jsx)(n.a,{href:"../../troubleshooting-guide/openstack",children:"OpenStack Troubleshooting Guide"}),"."]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Optional: In order to reduce the active observation time for the deployment of the components,\nthe container images for the following services can be downloaded in advance with the argument ",(0,r.jsx)(n.code,{children:"-a pull"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -a pull common\nosism apply -a pull loadbalancer\nosism apply -a pull redis\nosism apply -a pull memcached\nosism apply -a pull rabbitmq\nosism apply -a pull mariadb\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Cron, Fluentd & Kolla Toolbox"}),"\n",(0,r.jsxs)(n.p,{children:["The common role of Kolla is used to manage the services ",(0,r.jsx)(n.code,{children:"cron"}),", ",(0,r.jsx)(n.code,{children:"fluentd"}),"\nand ",(0,r.jsx)(n.code,{children:"kolla-toolbox"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["It is important to do this deployment before any other deployements in the Kolla\nenvironment, as parts of the other deployments depend on the ",(0,r.jsx)(n.code,{children:"kolla-toolbox"}),"\nservice."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply common\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Loadbalancer"}),"\n",(0,r.jsxs)(n.p,{children:["Have a look to the ",(0,r.jsx)(n.a,{href:"/de/docs/guides/configuration-guide/loadbalancer",children:"loadbalancer documentation"})," and configure it before deploying the service."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply loadbalancer\n"})}),"\n",(0,r.jsx)(n.p,{children:"It is important to do this deployment before any other deployements in the Kolla\nenvironment, as parts of the other deployments depend on the loadbalancer\nservice."}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Redis"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply redis\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Memcached"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply memcached\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"RabbitMQ"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply rabbitmq\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"MariaDB"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply mariadb\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>d,a:()=>t});var r=s(7294);const i={},o=r.createContext(i);function t(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);