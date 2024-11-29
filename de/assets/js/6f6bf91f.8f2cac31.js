"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9654],{9192:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var i=t(5893),r=t(1151);const o={sidebar_label:"OpenStack",sidebar_position:40},s="OpenStack",c={id:"guides/troubleshooting-guide/openstack",title:"OpenStack",description:"Database creation fails",source:"@site/docs/guides/troubleshooting-guide/openstack.md",sourceDirName:"guides/troubleshooting-guide",slug:"/guides/troubleshooting-guide/openstack",permalink:"/de/docs/guides/troubleshooting-guide/openstack",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/troubleshooting-guide/openstack.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"OpenStack",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Manager",permalink:"/de/docs/guides/troubleshooting-guide/manager"},next:{title:"Rookify (technical preview)",permalink:"/de/docs/guides/troubleshooting-guide/rookify"}},a={},l=[{value:"Database creation fails",id:"database-creation-fails",level:2},{value:"Ceph connections not working",id:"ceph-connections-not-working",level:2},{value:"Cinder volume create failure",id:"cinder-volume-create-failure",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"openstack",children:"OpenStack"})}),"\n",(0,i.jsx)(n.h2,{id:"database-creation-fails",children:"Database creation fails"}),"\n",(0,i.jsx)(n.p,{children:"Problem:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"TASK [keystone : Creating keystone database] ***********************************\nfatal: [testbed-node-0]: FAILED! => changed=false\n  action: mysql_db\n  msg: 'unable to find /var/lib/ansible/.my.cnf. Exception message: (2003, \"Can''t connect to MySQL server on ''api-int.local'' ([Errno 111] Connection refused)\")'\n"})}),"\n",(0,i.jsx)(n.p,{children:"Solution:"}),"\n",(0,i.jsxs)(n.p,{children:["Restart the ",(0,i.jsx)(n.code,{children:"kolla_toolbox"})," container. in this case on the node ",(0,i.jsx)(n.code,{children:"testbed-node-0"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"$ osism console testbed-node-0/\ntestbed-node-0>>> restart kolla_toolbox\nkolla_toolbox\ntestbed-node-0>>>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"ceph-connections-not-working",children:"Ceph connections not working"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Problem: ",(0,i.jsx)(n.code,{children:"auth: error parsing file"})," or ",(0,i.jsx)(n.code,{children:"auth: failed to load"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"$ docker exec -ti nova_compute ceph -k /etc/ceph/ceph.client.nova.keyring -n client.nova -s\n2024-06-28T06:43:05.660+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input\n2024-06-28T06:43:05.660+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error\n2024-06-28T06:43:05.664+0000 7d5df526b640 -1 monclient: keyring not found\n[errno 5] RADOS I/O error (error connecting to the cluster)\n"})}),"\n",(0,i.jsx)(n.p,{children:"Solution:"}),"\n",(0,i.jsx)(n.p,{children:"Check your Ceph keyfiles. Probably a missing newline at the EOF."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"cinder-volume-create-failure",children:"Cinder volume create failure"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Problem: Volume creation is stuck after creation of the database object with no host assigned."}),"\n",(0,i.jsx)(n.p,{children:"Solution:"}),"\n",(0,i.jsx)(n.p,{children:"Database objects are created by the api service for valid request while the host is assigned by the scheduler."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Check the scheduler logs for errors"}),"\n",(0,i.jsxs)(n.li,{children:["If there is nothing wrong with the scheduler itself, check the communication between the services via oslo.messaging\nUsually this is done via rabbitmq:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Check cluster status on every node for status, alarms and network partitions","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"docker exec rabbitmq rabbitmqctl cluster_status\n"})}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"Check rabbitmq logs for errors"}),"\n",(0,i.jsxs)(n.li,{children:["Check rabbitmq queues for errors or accumulated messages","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"docker exec rabbitmq rabbitmqctl list_queues name type state consumers messages | grep -E '^cinder'\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["If everything seems fine check network connectivity to rule out network issues","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism validate kolla-connectivity\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["If networking is fine then as a last resort a reset of rabbitmq may be considered\nBeware that this will destroy rabbitmq state which may result in inconsitent resource states","\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism apply rabbitmq-reset-state\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>s});var i=t(7294);const r={},o=i.createContext(r);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);