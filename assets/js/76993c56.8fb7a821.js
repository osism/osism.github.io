"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1965],{5971:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>m,frontMatter:()=>l,metadata:()=>t,toc:()=>h});const t=JSON.parse('{"id":"guides/configuration-guide/manager","title":"Manager","description":"Stable release","source":"@site/docs/guides/configuration-guide/manager.mdx","sourceDirName":"guides/configuration-guide","slug":"/guides/configuration-guide/manager","permalink":"/docs/guides/configuration-guide/manager","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/manager.mdx","tags":[],"version":"current","sidebarPosition":15,"frontMatter":{"sidebar_label":"Manager","sidebar_position":15},"sidebar":"tutorialSidebar","previous":{"title":"Inventory","permalink":"/docs/guides/configuration-guide/inventory"},"next":{"title":"Network","permalink":"/docs/guides/configuration-guide/network"}}');var i=r(4848),a=r(8453),s=r(5537),o=r(9329);const l={sidebar_label:"Manager",sidebar_position:15},c="Manager",d={},h=[{value:"Stable release",id:"stable-release",level:2},{value:"Working with Git branches",id:"working-with-git-branches",level:2},{value:"OpenSearch integration",id:"opensearch-integration",level:2},{value:"OpenStack broker integration",id:"openstack-broker-integration",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"manager",children:"Manager"})}),"\n",(0,i.jsx)(n.h2,{id:"stable-release",children:"Stable release"}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsxs)(n.p,{children:["Always read the ",(0,i.jsx)(n.a,{href:"https://osism.tech/docs/release-notes/",children:"release notes"})," first to learn what has changed and what\nadjustments are necessary. Read the release notes even if you are only updating from e.g. 7.0.2 to 7.0.5."]})}),"\n",(0,i.jsx)(n.p,{children:"In the example, OSISM release 7.0.5 is used."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Set the new manager version in the configuration repository."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'MANAGER_VERSION="7.0.5"\nsed -i "~s,^manager_version:.*\\$,manager_version: ${MANAGER_VERSION}," environments/manager/configuration.yml\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["If ",(0,i.jsx)(n.code,{children:"openstack_version"})," or ",(0,i.jsx)(n.code,{children:"ceph_version"})," are set in ",(0,i.jsx)(n.code,{children:"environments/manager/configuration.yml"}),"\n(or anywhere else), they must be removed. If these are set, the stable release is not used for\nthese components."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Sync the image versions in the configuration repository."}),"\n",(0,i.jsxs)(s.A,{children:[(0,i.jsx)(o.A,{value:"osism-7",label:"OSISM >= 7.0.0",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"make sync\n"})})}),(0,i.jsxs)(o.A,{value:"osism-6",label:"OSISM < 7.0.0",children:[(0,i.jsxs)(n.p,{children:["If Gilt is not installed via the ",(0,i.jsx)(n.code,{children:"requirements.txt"})," of the manager environment it is\nimportant to use a version smaller v2. The v2 of Gilt is not yet usable."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"python3 -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt\n  gilt overlay && gilt overlay\n"})}),(0,i.jsxs)(n.p,{children:["Optionally, this is normally not necessary, it is possible to reference a specific tag of the\n",(0,i.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository. To do this, first\ncheck which version of osism/cfg-generics is used in a particular release. The version is\ndefined in ",(0,i.jsx)(n.code,{children:"generics_version"})," in the ",(0,i.jsx)(n.code,{children:"base.yml"})," file in the ",(0,i.jsx)(n.code,{children:"osism/release"})," repository. For OSISM 6.0.0,\nfor example, this is version ",(0,i.jsx)(n.a,{href:"https://github.com/osism/release/blob/main/6.0.0/base.yml#L6",children:"v0.20230919.0"}),".\nThis version is then added to the file ",(0,i.jsx)(n.code,{children:"gilt.yml"})," in the configuration repository instead of\n",(0,i.jsx)(n.code,{children:"main"})," at ",(0,i.jsx)(n.code,{children:"version"}),". This change must be made again after each execution of ",(0,i.jsx)(n.code,{children:"gilt overlay"})," as\nit is overwritten by the call of ",(0,i.jsx)(n.code,{children:"gilt overlay"}),". This cannot be realized differently in the\ncurrent implementation of ",(0,i.jsx)(n.a,{href:"https://github.com/retr0h/gilt",children:"Gilt"}),"."]})]})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Commit and push changes in the configuration repository. Since everyone here has their own\nworkflows for changes to the configuration repository, only a generic example for Git."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'git commit -a -s -m "manager: use OSISM version ${MANAGER_VERSION?}"\ngit push\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"working-with-git-branches",children:"Working with Git branches"}),"\n",(0,i.jsxs)(n.p,{children:["For example, for compliance and security reasons, many organizations prefer to prepare changes to\nproduction systems on dedicated Git branches, roll them out to the production environment\nusing the 4-eyes control principle and then finally transfer them to the ",(0,i.jsx)(n.code,{children:"main"})," branch through a\nreview and release process."]}),"\n",(0,i.jsxs)(n.p,{children:["A typical scenario is the ",(0,i.jsx)(n.a,{href:"/docs/guides/upgrade-guide/manager",children:"Manager Upgrade"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"OSISM offers the option of using specific Git branches on the manager."}),"\n",(0,i.jsx)(n.p,{children:"The Git branch can be changed in the following way:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Create a branch"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"git checkout -b YOUR-BRANCH-FOR-CHANGE-XYZ\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Set the branch name of your deployment branch with the variable ",(0,i.jsx)(n.code,{children:"configuration_git_version"})," in ",(0,i.jsx)(n.code,{children:"configuration.yml"}),".\nThis needs always to be changed on the manager node later if you merge the current branch to another target branch."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'BRANCH="$(git rev-parse --abbrev-ref HEAD)"\nsed -i "~s,^configuration_git_version:.*\\$,configuration_git_version: ${BRANCH}," environments/manager/configuration.yml\ngit commit -m "Starting to work on #<issue-id>" -s environments/manager/configuration.yml\ngit push\n'})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Login to the manager and activate the branch\n(not needed when performing a initial manager install)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd /opt/configuration\ngit fetch\ngit checkout YOUR-BRANCH-FOR-CHANGE-XYZ\nosism apply configuration\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"Recommended:"})," Rebuild inventories and update facts\n(On changing branches there are oft potential changes in the inventory structure)"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"osism reconciler sync\nosism apply facts\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Start your work on the topic and perfom a final review when the topic is complete"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"opensearch-integration",children:"OpenSearch integration"}),"\n",(0,i.jsxs)(n.p,{children:["With the command ",(0,i.jsx)(n.code,{children:"osism log opensearch"})," it is possible to send SQL queries\nto the OpenSearch service. For the command to be functional, the OpenSearch\nintegration must be activated in the manager environment and the OpenSearch\naddress and port must be set."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/configuration.yml"',children:"manager_opensearch_enable: true\nmanager_opensearch_address: api-int.testbed.osism.xyz\nmanager_opensearch_port: 9200\nmanager_opensearch_protocol: https\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The integration can also be enabled later. ",(0,i.jsx)(n.code,{children:"osism update manager"})," is then\nexecuted after the configuration has been changed."]}),"\n",(0,i.jsx)(n.h2,{id:"openstack-broker-integration",children:"OpenStack broker integration"}),"\n",(0,i.jsxs)(n.p,{children:["If the Baremetal Service Integration in OSISM is used, the OpenStack Broker integration is\nrequired. The integration itself is activated by setting the parameter ",(0,i.jsx)(n.code,{children:"enable_listener"})," to ",(0,i.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["The hosts in the ",(0,i.jsx)(n.code,{children:"manager_listener_broker_hosts"})," list are the control nodes of OpenStack.\nThe user is set via ",(0,i.jsx)(n.code,{children:"manager_listener_broker_username"}),". On OpenStack's RabbitMQ broker, the user ",(0,i.jsx)(n.code,{children:"openstack"}),"\nis present by default."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/configuration.yml"',children:'enable_listener: true\nmanager_listener_broker_hosts:\n  - 192.168.16.10\n  - 192.168.16.11\n  - 192.168.16.12\nmanager_listener_broker_username: openstack\nmanager_listener_broker_uri: "{% for host in manager_listener_broker_hosts %}amqp://{{ manager_listener_broker_username }}:{{ manager_listener_broker_password }}@{{ host }}:5672/{% if not loop.last %};{% endif %}{% endfor %}"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["The password used when using the ",(0,i.jsx)(n.code,{children:"openstack"})," user is ",(0,i.jsx)(n.code,{children:"rabbitmq_password"})," from ",(0,i.jsx)(n.code,{children:"environments/kolla/secrets.yml"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/secrets.yml"',children:"manager_listener_broker_password: RABBITMQ_PASSWORD\n"})})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},9329:(e,n,r)=>{r.d(n,{A:()=>s});r(6540);var t=r(8215);const i={tabItem:"tabItem_Ymn6"};var a=r(4848);function s(e){let{children:n,hidden:r,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,t.A)(i.tabItem,s),hidden:r,children:n})}},5537:(e,n,r)=>{r.d(n,{A:()=>_});var t=r(6540),i=r(8215),a=r(5627),s=r(6347),o=r(372),l=r(604),c=r(1861),d=r(8749);function h(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:i}}=e;return{value:n,label:r,attributes:t,default:i}}))}(r);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function m(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:r}=e;const i=(0,s.W6)(),a=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,l.aZ)(a),(0,t.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(i.location.search);n.set(a,e),i.replace({...i.location,search:n.toString()})}),[a,i])]}function p(e){const{defaultValue:n,queryString:r=!1,groupId:i}=e,a=u(e),[s,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[c,h]=g({queryString:r,groupId:i}),[p,f]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,a]=(0,d.Dv)(r);return[i,(0,t.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:i}),b=(()=>{const e=c??p;return m({value:e,tabValues:a})?e:null})();(0,o.A)((()=>{b&&l(b)}),[b]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),h(e),f(e)}),[h,f,a]),tabValues:a}}var f=r(9136);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=r(4848);function v(e){let{className:n,block:r,selectedValue:t,selectValue:s,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),d=e=>{const n=e.currentTarget,r=l.indexOf(n),i=o[r].value;i!==t&&(c(n),s(i))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;n=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;n=l[r]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":r},n),children:o.map((e=>{let{value:n,label:r,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>{l.push(e)},onKeyDown:h,onClick:d,...a,className:(0,i.A)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function j(e){let{lazy:n,children:r,selectedValue:a}=e;const s=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===a));return e?(0,t.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function y(e){const n=p(e);return(0,x.jsxs)("div",{className:(0,i.A)("tabs-container",b.tabList),children:[(0,x.jsx)(v,{...n,...e}),(0,x.jsx)(j,{...n,...e})]})}function _(e){const n=(0,f.A)();return(0,x.jsx)(y,{...e,children:h(e.children)},String(n))}},8453:(e,n,r)=>{r.d(n,{R:()=>s,x:()=>o});var t=r(6540);const i={},a=t.createContext(i);function s(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);