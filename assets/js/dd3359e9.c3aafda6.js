"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[4134],{6570:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var t=r(5893),s=r(1151),a=r(4866),i=r(5162);const o={sidebar_label:"Manager",sidebar_position:10},l="Manager",c={id:"guides/upgrade-guide/manager",title:"Manager",description:"Always read the release notes first to learn what has changed and what",source:"@site/docs/guides/upgrade-guide/manager.mdx",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/manager",permalink:"/docs/guides/upgrade-guide/manager",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/manager.mdx",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Manager",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Upgrade Guide",permalink:"/docs/guides/upgrade-guide/"},next:{title:"Network",permalink:"/docs/guides/upgrade-guide/network"}},d={},u=[];function h(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"manager",children:"Manager"}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsxs)(n.p,{children:["Always read the ",(0,t.jsx)(n.a,{href:"../../release-notes/",children:"release notes"})," first to learn what has changed and what\nadjustments are necessary. Read the release notes even if you are only updating from e.g. 7.0.2 to 7.0.5."]})}),"\n",(0,t.jsx)(n.p,{children:"The update of a manager service with a stable release of OSISM is described here.\nIn the example, OSISM release 7.0.5 is used."}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Change the OSISM release in the configuration repository."}),"\n",(0,t.jsx)(n.p,{children:"1.1. Set the new OSISM version in the configuration repository."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'MANAGER_VERSION=7.0.5\nsed -i -e "s/manager_version: .*/manager_version: ${MANAGER_VERSION}/g" environments/manager/configuration.yml\n'})}),"\n",(0,t.jsxs)(n.p,{children:["1.2. If ",(0,t.jsx)(n.code,{children:"openstack_version"})," or ",(0,t.jsx)(n.code,{children:"ceph_version"})," are set in ",(0,t.jsx)(n.code,{children:"environments/manager/configuration.yml"}),"\n(or anywhere else), they must be removed. If these are set, the stable release is not used for\nthese components."]}),"\n",(0,t.jsx)(n.p,{children:"1.3. Sync the image versions and files in the configuration repository."}),"\n",(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(i.Z,{value:"osism-7",label:"OSISM >= 7.0.0",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"make sync\n"})})}),(0,t.jsxs)(i.Z,{value:"osism-6",label:"OSISM < 7.0.0",children:[(0,t.jsxs)(n.p,{children:["If Gilt is not installed via the ",(0,t.jsx)(n.code,{children:"requirements.txt"})," of the manager environment it is\nimportant to use a version smaller v2. The v2 of Gilt is not yet usable."]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"gilt overlay  # you have to do this 2x, this is not a copy & paste error\ngilt overlay\n"})}),(0,t.jsxs)(n.p,{children:["Optionally, this is normally not necessary, it is possible to reference a specific tag of the\n",(0,t.jsx)(n.a,{href:"https://github.com/osism/cfg-generics",children:"osism/cfg-generics"})," repository. To do this, first\ncheck which version of osism/cfg-generics is used in a particular release. The version is\ndefined in ",(0,t.jsx)(n.code,{children:"generics_version"})," in the ",(0,t.jsx)(n.code,{children:"base.yml"})," file in the ",(0,t.jsx)(n.code,{children:"osism/release"})," repository. For OSISM 6.0.0,\nfor example, this is version ",(0,t.jsx)(n.a,{href:"https://github.com/osism/release/blob/main/6.0.0/base.yml#L6",children:"v0.20230919.0"}),".\nThis version is then added to the file ",(0,t.jsx)(n.code,{children:"gilt.yml"})," in the configuration repository instead of\n",(0,t.jsx)(n.code,{children:"main"})," at ",(0,t.jsx)(n.code,{children:"version"}),". This change must be made again after each execution of ",(0,t.jsx)(n.code,{children:"gilt overlay"})," as\nit is overwritten by the call of ",(0,t.jsx)(n.code,{children:"gilt overlay"}),". This cannot be realized differently in the\ncurrent implementation of ",(0,t.jsx)(n.a,{href:"https://github.com/retr0h/gilt",children:"Gilt"}),"."]})]})]}),"\n",(0,t.jsx)(n.p,{children:"1.4. Commit and push all changes in the configuration repository. Since everyone here has their own\nworkflows for changes to the configuration repository, only a generic example for Git."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'git commit -a -s -m "manager: use OSISM version 7.0.5"\ngit push\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Update the configuration repository on the manager node."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply configuration\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Update the manager service on the manager node."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism update manager\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["If Ansible Vault was used to encrypt ",(0,t.jsx)(n.code,{children:"environments/manager/secrets.yml"}),", the parameter\n",(0,t.jsx)(n.code,{children:"--ask-vault-pass"})," is also appended. From OSISM >= 7.0.5 this is no longer necessary."]}),"\n",(0,t.jsxs)(n.li,{children:["If ",(0,t.jsx)(n.code,{children:"osism update manager"})," does not work yet, use ",(0,t.jsx)(n.code,{children:"osism-update-manager"})," instead."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Refresh the facts cache."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply facts\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["If Traefik is used on the manager node (",(0,t.jsx)(n.code,{children:"traefik_enable: true"})," in ",(0,t.jsx)(n.code,{children:"environments/infrastructure/configuration.yml"}),")\nthen Traefik should also be upgraded."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply traefik\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Finally, the Ansible vault password must be made known again."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism set vault password\n"})}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},5162:(e,n,r)=>{r.d(n,{Z:()=>i});r(7294);var t=r(6905);const s={tabItem:"tabItem_Ymn6"};var a=r(5893);function i(e){let{children:n,hidden:r,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,t.Z)(s.tabItem,i),hidden:r,children:n})}},4866:(e,n,r)=>{r.d(n,{Z:()=>w});var t=r(7294),s=r(6905),a=r(2466),i=r(6550),o=r(469),l=r(1980),c=r(7392),d=r(12);function u(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:s}}=e;return{value:n,label:r,attributes:t,default:s}}))}(r);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function p(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const s=(0,i.k6)(),a=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,l._X)(a),(0,t.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(s.location.search);n.set(a,e),s.replace({...s.location,search:n.toString()})}),[a,s])]}function f(e){const{defaultValue:n,queryString:r=!1,groupId:s}=e,a=h(e),[i,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[c,u]=m({queryString:r,groupId:s}),[f,g]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,a]=(0,d.Nk)(r);return[s,(0,t.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:s}),x=(()=>{const e=c??f;return p({value:e,tabValues:a})?e:null})();(0,o.Z)((()=>{x&&l(x)}),[x]);return{selectedValue:i,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),g(e)}),[u,g,a]),tabValues:a}}var g=r(2389);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=r(5893);function v(e){let{className:n,block:r,selectedValue:t,selectValue:i,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),d=e=>{const n=e.currentTarget,r=l.indexOf(n),s=o[r].value;s!==t&&(c(n),i(s))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;n=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;n=l[r]??l[l.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":r},n),children:o.map((e=>{let{value:n,label:r,attributes:a}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:u,onClick:d,...a,className:(0,s.Z)("tabs__item",x.tabItem,a?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function j(e){let{lazy:n,children:r,selectedValue:s}=e;const a=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function y(e){const n=f(e);return(0,b.jsxs)("div",{className:(0,s.Z)("tabs-container",x.tabList),children:[(0,b.jsx)(v,{...n,...e}),(0,b.jsx)(j,{...n,...e})]})}function w(e){const n=(0,g.Z)();return(0,b.jsx)(y,{...e,children:u(e.children)},String(n))}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>i});var t=r(7294);const s={},a=t.createContext(s);function i(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);