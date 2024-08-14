"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9183],{7868:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var n=t(5893),r=t(1151);const i={sidebar_label:"Task"},o="Task",a={id:"guides/operations-guide/manager/task",title:"Task",description:"List",source:"@site/docs/guides/operations-guide/manager/task.md",sourceDirName:"guides/operations-guide/manager",slug:"/guides/operations-guide/manager/task",permalink:"/docs/guides/operations-guide/manager/task",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/manager/task.md",tags:[],version:"current",frontMatter:{sidebar_label:"Task"},sidebar:"tutorialSidebar",previous:{title:"Logging",permalink:"/docs/guides/operations-guide/manager/log"},next:{title:"Ceph",permalink:"/docs/guides/operations-guide/ceph"}},d={},c=[{value:"List",id:"list",level:2},{value:"Broker reset",id:"broker-reset",level:2}];function l(e){const s={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"task",children:"Task"})}),"\n",(0,n.jsx)(s.h2,{id:"list",children:"List"}),"\n",(0,n.jsxs)(s.p,{children:["All running or scheduled tasks can be listed with ",(0,n.jsx)(s.code,{children:"osism task list"}),"."]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"+----------------------+--------------------------------------+-------------------------+----------+----------------------------+-----------------------------------------------+\n| Worker               | ID                                   | Name                    | Status   | Start time                 | Arguments                                     |\n|----------------------+--------------------------------------+-------------------------+----------+----------------------------+-----------------------------------------------|\n| celery@kolla-ansible | 8a553e69-c532-4ba0-a5d4-08a983bde692 | osism.tasks.kolla.run   | ACTIVE   | 2023-09-27 17:55:54.252250 | ['kolla', 'common', ['-e kolla_action=pull']] |\n| celery@osism-ansible | dba72dd5-1885-408f-9262-e0ded111a007 | osism.tasks.ansible.run | ACTIVE   | 2023-09-27 18:00:31.215879 | ['generic', 'facts', []]                      |\n+----------------------+--------------------------------------+-------------------------+----------+----------------------------+-----------------------------------------------+\n"})}),"\n",(0,n.jsx)(s.h2,{id:"broker-reset",children:"Broker reset"}),"\n",(0,n.jsx)(s.p,{children:"Sometimes tasks get stuck. Due to the internal locks it is then not possible to re-execute\nplays with the same name. Also it is currently not possible to cancel already running tasks\n(is on the todo list). The only way to unblock the situation is to stop the manager service\nand start it again."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"cd /opt/manager\ndocker compose down\ndocker compose up -d\n"})}),"\n",(0,n.jsx)(s.p,{children:"In earlier versions of OSISM, the Redis service was not stateless. In these cases, it is\nnecessary to delete the Redis service volume before restarting the manager service."}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{children:"docker volume rm manager_redis\n"})})]})}function u(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>o});var n=t(7294);const r={},i=n.createContext(r);function o(e){const s=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(i.Provider,{value:s},e.children)}}}]);