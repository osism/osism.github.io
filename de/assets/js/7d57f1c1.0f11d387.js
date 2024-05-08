"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4557],{7301:(e,s,o)=>{o.r(s),o.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>l,frontMatter:()=>n,metadata:()=>r,toc:()=>g});var t=o(5893),a=o(1151);const n={sidebar_label:"Playbooks",sidebar_position:40},i="Playbooks",r={id:"guides/operations-guide/openstack/day2-operations/playbooks",title:"Playbooks",description:"Host aggregates",source:"@site/docs/guides/operations-guide/openstack/day2-operations/playbooks.md",sourceDirName:"guides/operations-guide/openstack/day2-operations",slug:"/guides/operations-guide/openstack/day2-operations/playbooks",permalink:"/de/docs/guides/operations-guide/openstack/day2-operations/playbooks",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/operations-guide/openstack/day2-operations/playbooks.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"Playbooks",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Best Practises",permalink:"/de/docs/guides/operations-guide/openstack/day2-operations/best-practises/"},next:{title:"Image Manager",permalink:"/de/docs/guides/operations-guide/openstack/day2-operations/image-manager/"}},d={},g=[{value:"Host aggregates",id:"host-aggregates",level:2}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"playbooks",children:"Playbooks"}),"\n",(0,t.jsx)(s.h2,{id:"host-aggregates",children:"Host aggregates"}),"\n",(0,t.jsxs)(s.p,{children:["Host aggregates can be managed with the playbook. The playbook is used with\n",(0,t.jsx)(s.code,{children:"osism apply -e openstack host-aggregates"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:["Further arguments for host aggregates can be found in the\n",(0,t.jsx)(s.a,{href:"https://docs.ansible.com/ansible/latest/collections/openstack/cloud/host_aggregate_module.html",children:"documentation for the openstack.cloud.host_aggregate"})," Ansible module."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-yaml",metastring:'title="environments/openstack/playbook-host-aggregates.yml"',children:'---\n- name: Manage host aggregates\n  hosts: localhost\n  connection: local\n\n  vars:\n    host_aggregates:\n      - name: aggregate1\n        hosts:\n          - host1\n          - host2\n          - host3\n\n  tasks:\n    - name: Create host aggregate\n      openstack.cloud.host_aggregate:\n        cloud: admin\n        state: present\n        name: "{{ item.name }}"\n        hosts: "{{ item.hosts }}"\n      loop: "{{ host_aggregates }}"\n'})})]})}function l(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,s,o)=>{o.d(s,{Z:()=>r,a:()=>i});var t=o(7294);const a={},n=t.createContext(a);function i(e){const s=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(n.Provider,{value:s},e.children)}}}]);