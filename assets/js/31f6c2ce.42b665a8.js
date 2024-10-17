"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1296],{1888:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var r=a(5893),s=a(1151);const l={sidebar_label:"Infrastructure"},i="Infrastructure",o={id:"guides/operations-guide/infrastructure",title:"Infrastructure",description:"Loadbalancer",source:"@site/docs/guides/operations-guide/infrastructure.md",sourceDirName:"guides/operations-guide",slug:"/guides/operations-guide/infrastructure",permalink:"/docs/guides/operations-guide/infrastructure",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/infrastructure.md",tags:[],version:"current",frontMatter:{sidebar_label:"Infrastructure"},sidebar:"tutorialSidebar",previous:{title:"Ceph",permalink:"/docs/guides/operations-guide/ceph"},next:{title:"Network",permalink:"/docs/guides/operations-guide/network"}},c={},d=[{value:"Loadbalancer",id:"loadbalancer",level:2},{value:"MariaDB",id:"mariadb",level:2},{value:"Backup",id:"backup",level:3},{value:"Restore",id:"restore",level:3},{value:"Recovery",id:"recovery",level:3},{value:"Open Search",id:"open-search",level:2},{value:"Get all indices",id:"get-all-indices",level:3},{value:"Delete an index",id:"delete-an-index",level:3}];function t(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"infrastructure",children:"Infrastructure"})}),"\n",(0,r.jsx)(n.h2,{id:"loadbalancer",children:"Loadbalancer"}),"\n",(0,r.jsxs)(n.p,{children:["For the ",(0,r.jsx)(n.code,{children:"manage-loadbalancer"})," play to work, the internal control socket\nof the HAProxy service must be set to admin level. As of OSISM 7.0.6 this\nis the default. Before this, the parameter ",(0,r.jsx)(n.code,{children:"haproxy_socket_level_admin"})," must\nbe added to the configuration repository and then a reconfigure\n(",(0,r.jsx)(n.code,{children:"osism apply -a reconfigure loadbalancer"}),") must be done for the loadbalancer\nservice."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'haproxy_socket_level_admin: "yes"\n'})}),"\n",(0,r.jsx)(n.p,{children:"You can check in the HAProxy configuration whether the control socket is\nconfigured correctly."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",metastring:'title="/etc/kolla/haproxy/haproxy.cfg"',children:"global\n    [...]\n    stats socket /var/lib/kolla/haproxy/haproxy.sock group kolla mode 660 level admin\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Disable the host ",(0,r.jsx)(n.code,{children:"testbed-node-0"})," in all backends of the service ",(0,r.jsx)(n.code,{children:"keystone "})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply manage-loadbalancer \\\n  -e manage_loadbalancer_action=disable \\\n  -e manage_loadbalancer_service=keystone \\\n  -e manage_loadbalancer_host=testbed-node-0\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Enable the host ",(0,r.jsx)(n.code,{children:"testbed-node-0"})," in all backends of the service ",(0,r.jsx)(n.code,{children:"keystone "})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply manage-loadbalancer \\\n  -e manage_loadbalancer_action=enable \\\n  -e manage_loadbalancer_service=keystone \\\n  -e manage_loadbalancer_host=testbed-node-0\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Disable the host ",(0,r.jsx)(n.code,{children:"testbed-node-0"})," in all backends"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply manage-loadbalancer \\\n  -e manage_loadbalancer_action=disable \\\n  -e manage_loadbalancer_service=all \\\n  -e manage_loadbalancer_host=testbed-node-0\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Enable the host ",(0,r.jsx)(n.code,{children:"testbed-node-0"})," in all backends"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply manage-loadbalancer \\\n  -e manage_loadbalancer_action=enable \\\n  -e manage_loadbalancer_service=all \\\n  -e manage_loadbalancer_host=testbed-node-0\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"mariadb",children:"MariaDB"}),"\n",(0,r.jsx)(n.h3,{id:"backup",children:"Backup"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://mariadb.com/kb/en/mariabackup-overview/",children:"Mariabackup"})," is used to create backups\nof MariaDB. For more details about backups, you can use the offical\n",(0,r.jsx)(n.a,{href:"https://docs.openstack.org/kolla-ansible/latest/admin/mariadb-backup-and-restore.html",children:"kolla-ansible"})," documentation."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a full backup"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply mariadb_backup\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Create a incremental backup (supported as of OSISM 7.0.6)"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply mariadb_backup -e mariadb_backup_type=incremental\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Accessing created backups"}),"\n",(0,r.jsxs)(n.p,{children:["There is a Docker volume ",(0,r.jsx)(n.code,{children:"mariadb_backup"})," on the 1st control node. The backups\nare stored in this volume.\n(see also /var/lib/docker/volumes/mariadb_backup/)"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"$ docker run --rm -v mariadb_backup:/backup -it ubuntu:22.04 bash -c 'ls -la /backup'\ntotal 9728\ndrwxr-xr-x 2 42434 42434    4096 Jun  3 18:46 .\ndrwxr-xr-x 1 root  root     4096 Jun  3 18:47 ..\n-rw-r--r-- 1 42434 42434 4530618 Jun  3 18:46 incremental-18-mysqlbackup-03-06-2024-1717440409.qp.xbc.xbs.gz\n-rw-r--r-- 1 42434 42434      11 Jun  3 18:45 last_full_date\n-rw-r--r-- 1 42434 42434 5411763 Jun  3 18:45 mysqlbackup-03-06-2024-1717440342.qp.xbc.xbs.gz\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Currently there is no offical scheduling and houskeeping (disk space) for mariadb backups.\nYou can create a simple cronjob on the manager or use your enterprise backup software."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"cat /etc/cron.d/mariadb_backup <<'EOF'\n0 7 * * * dragon osism apply mariadb_backup |logger -t mariadb_backup\nEOF\n"})}),"\n",(0,r.jsx)(n.h3,{id:"restore",children:"Restore"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Stop all MariaDb Instances"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply -s stop maria\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Follow the ",(0,r.jsx)(n.a,{href:"https://docs.openstack.org/kolla-ansible/latest/admin/mariadb-backup-and-restore.html#restoring-backups",children:"restore procedure described in the kolla-ansible manual"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Execute the recovery procedure with the node name where you executed the recovery"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply mariadb_recovery -e mariadb_recover_inventory_name=THE_NAME_OF_THE_RESTORE_NODE\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"recovery",children:"Recovery"}),"\n",(0,r.jsx)(n.p,{children:"If you stopped your mariadb galera cluster completly, you can use the following procedure\nto start a recovery."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"osism apply mariadb_recovery\n"})}),"\n",(0,r.jsx)(n.h2,{id:"open-search",children:"Open Search"}),"\n",(0,r.jsx)(n.h3,{id:"get-all-indices",children:"Get all indices"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"$ curl https://api-int.testbed.osism.xyz:9200/_cat/indices?v\nhealth status index                          uuid                   pri rep docs.count docs.deleted store.size pri.store.size\ngreen  open   flog-2024.04.17                1rCP3NpUQSS5wmulCn6Y5g   1   1    1657832            0        1gb        654.4mb\ngreen  open   .opensearch-observability      UnS2gFb-QhC8oIefL3C52Q   1   2          0            0       624b           208b\ngreen  open   .plugins-ml-config             hMdzW6ooRMGZ_0OGcdNSgA   1   1          1            0      7.8kb          3.9kb\ngreen  open   .opendistro-job-scheduler-lock fa_Io8bJQ8qfGII4DypxFg   1   1          1            3     51.1kb         35.1kb\ngreen  open   .kibana_1                      v-aJ6ioSQsOwHQn_NNbeOg   1   1          0            0       416b           208b\n"})}),"\n",(0,r.jsx)(n.h3,{id:"delete-an-index",children:"Delete an index"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:'$ curl -X DELETE https://api-int.testbed.osism.xyz:9200/flog-2024.04.17\n{"acknowledged":true}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(t,{...e})}):t(e)}},1151:(e,n,a)=>{a.d(n,{Z:()=>o,a:()=>i});var r=a(7294);const s={},l=r.createContext(s);function i(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);