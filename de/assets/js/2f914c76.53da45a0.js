"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1734],{9220:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>l});var i=r(5893),s=r(1151);const t={sidebar_label:"Manager",sidebar_position:15},a="Manager",o={id:"guides/configuration-guide/manager",title:"Manager",description:"Stable release",source:"@site/docs/guides/configuration-guide/manager.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/manager",permalink:"/de/docs/guides/configuration-guide/manager",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/manager.md",tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_label:"Manager",sidebar_position:15},sidebar:"tutorialSidebar",previous:{title:"Inventory",permalink:"/de/docs/guides/configuration-guide/inventory"},next:{title:"Network",permalink:"/de/docs/guides/configuration-guide/network"}},c={},l=[{value:"Stable release",id:"stable-release",level:2},{value:"OpenSearch integration",id:"opensearch-integration",level:2},{value:"OpenStack broker integration",id:"openstack-broker-integration",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"manager",children:"Manager"}),"\n",(0,i.jsx)(n.h2,{id:"stable-release",children:"Stable release"}),"\n",(0,i.jsxs)(n.p,{children:["It is recommended to use a stable release of OSISM. All available releases are listed in the\n",(0,i.jsx)(n.a,{href:"https://osism.tech/docs/release-notes/",children:"release notes"}),". Always check there in advance and do\nnot copy the stable release used here as an example."]}),"\n",(0,i.jsx)(n.p,{children:"In the example, OSISM release 6.0.0 is used."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Set the new manager version in the configuration repository."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'MANAGER_VERSION=6.0.0\nsed -i -e "s/manager_version: .*/manager_version: ${MANAGER_VERSION}/g" environments/manager/configuration.yml\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"openstack_version"})," or ",(0,i.jsx)(n.code,{children:"ceph_version"})," are set in ",(0,i.jsx)(n.code,{children:"environments/manager/configuration.yml"}),"\n(or anywhere else), they must be removed. If these are set, the stable release is not used for\nthese components."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Sync the image versions in the configuration repository. It is important to do this so\nthat the correct versions are available in ",(0,i.jsx)(n.code,{children:"environments/manager/images.yml"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"gilt overlay  # you have to do this 2x\ngilt overlay\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Optionally, this is normally not necessary, it is possible to reference a specific tag of the\n",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository. To do this, first\ncheck which version of osism/cfg-generics is used in a particular release. The version is\ndefined in ",(0,i.jsx)(n.code,{children:"generics_version"})," in the ",(0,i.jsx)(n.code,{children:"base.yml"})," file in the ",(0,i.jsx)(n.code,{children:"osism/release"})," repository. For OSISM 6.0.0,\nfor example, this is version ",(0,i.jsx)(n.a,{href:"https://github.com/osism/release/blob/main/6.0.0/base.yml#L6",children:"v0.20230919.0"}),".\nThis version is then added to the file ",(0,i.jsx)(n.code,{children:"gilt.yml"})," in the configuration repository instead of\n",(0,i.jsx)(n.code,{children:"main"})," at ",(0,i.jsx)(n.code,{children:"version"}),". This change must be made again after each execution of ",(0,i.jsx)(n.code,{children:"gilt overlay"})," as\nit is overwritten by the call of ",(0,i.jsx)(n.code,{children:"gilt overlay"}),". This cannot be realized differently in the\ncurrent implementation of ",(0,i.jsx)(n.a,{href:"https://github.com/retr0h/gilt",children:"Gilt"}),"."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Commit and push changes in the configuration repository. Since everyone here has their own\nworkflows for changes to the configuration repository, only a generic example for Git."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'git commit -a -s -m "manager: use OSISM version 6.0.0"\ngit push\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"opensearch-integration",children:"OpenSearch integration"}),"\n",(0,i.jsxs)(n.p,{children:["With the command ",(0,i.jsx)(n.code,{children:"osism log opensearch"})," it is possible to send SQL queries\nto the OpenSearch service. For the command to be functional, the OpenSearch\nintegration must be activated in the manager environment and the OpenSearch\naddress and port must be set."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/configuration.yml"',children:"manager_opensearch_enable: true\nmanager_opensearch_address: api-int.testbed.osism.xyz\nmanager_opensearch_port: 9200\nmanager_opensearch_protocol: https\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The integration can also be enabled later. ",(0,i.jsx)(n.code,{children:"osism update manager"})," is then\nexecuted after the configuration has been changed."]}),"\n",(0,i.jsx)(n.h2,{id:"openstack-broker-integration",children:"OpenStack broker integration"}),"\n",(0,i.jsxs)(n.p,{children:["If the Baremetal Service Integration in OSISM is used, the OpenStack Broker integration is\nrequired. The integration itself is activated by setting the parameter ",(0,i.jsx)(n.code,{children:"enable_listener"})," to ",(0,i.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["The hosts in the ",(0,i.jsx)(n.code,{children:"manager_listener_broker_hosts"})," list are the control nodes of OpenStack.\nThe user is set via ",(0,i.jsx)(n.code,{children:"manager_listener_broker_username"}),". On OpenStack's RabbitMQ broker, the user ",(0,i.jsx)(n.code,{children:"openstack"}),"\nis present by default."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/configuration.yml"',children:'enable_listener: true\nmanager_listener_broker_hosts:\n  - 192.168.16.10\n  - 192.168.16.11\n  - 192.168.16.12\nmanager_listener_broker_username: openstack\nmanager_listener_broker_uri: "{% for host in manager_listener_broker_hosts %}amqp://{{ manager_listener_broker_username }}:{{ manager_listener_broker_password }}@{{ host }}:5672/{% if not loop.last %};{% endif %}{% endfor %}"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The password used when using the ",(0,i.jsx)(n.code,{children:"openstack"})," user is ",(0,i.jsx)(n.code,{children:"rabbitmq_password"})," from ",(0,i.jsx)(n.code,{children:"environments/kolla/secrets.yml"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/secrets.yml"',children:"manager_listener_broker_password: RABBITMQ_PASSWORD\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>a});var i=r(7294);const s={},t=i.createContext(s);function a(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);