"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[8962],{2211:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var o=r(5893),t=r(1151);r(4866),r(5162);const i={sidebar_label:"Rookify (technical preview)",sidebar_position:51},l="Deploy Rookify: Migrate to Rook from Ceph-Ansible (Technical Preview)",s={id:"guides/deploy-guide/rookify",title:"Deploy Rookify: Migrate to Rook from Ceph-Ansible (Technical Preview)",description:"Rookify is developed to migrate from Ceph-Ansible to Rook in place and without downtime.",source:"@site/docs/guides/deploy-guide/rookify.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/rookify",permalink:"/de/docs/guides/deploy-guide/rookify",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/rookify.md",tags:[],version:"current",sidebarPosition:51,frontMatter:{sidebar_label:"Rookify (technical preview)",sidebar_position:51},sidebar:"tutorialSidebar",previous:{title:"Bootstrap",permalink:"/de/docs/guides/deploy-guide/bootstrap"},next:{title:"Services",permalink:"/de/docs/guides/deploy-guide/services/"}},a={},c=[{value:"Prerequisites &amp; Requirements",id:"prerequisites--requirements",level:2},{value:"Manual Installation",id:"manual-installation",level:2},{value:"Download or Clone the Repository",id:"download-or-clone-the-repository",level:3},{value:"Install and Run Locally (without Docker)",id:"install-and-run-locally-without-docker",level:3},{value:"Install and Run from within a Container",id:"install-and-run-from-within-a-container",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"deploy-rookify-migrate-to-rook-from-ceph-ansible-technical-preview",children:"Deploy Rookify: Migrate to Rook from Ceph-Ansible (Technical Preview)"})}),"\n",(0,o.jsx)(n.admonition,{type:"warning",children:(0,o.jsxs)(n.p,{children:["Rookify is developed to migrate from Ceph-Ansible to Rook ",(0,o.jsx)(n.em,{children:"in place"})," and ",(0,o.jsx)(n.em,{children:"without downtime"}),".\nNevertheless, it is ",(0,o.jsx)(n.strong,{children:"strongly advised"})," to test Rookify in a controlled environment first, such as the ",(0,o.jsx)(n.a,{href:"https://github.com/osism/testbed",children:"OSISM testbed"}),". Additionally ensure that precautionary backups are made and all other necessary safety measures are in place."]})}),"\n",(0,o.jsx)(n.p,{children:'It is currently recommended to install Rookify on your local machine and connect through VPNs to the target system (the one where Ceph-Ansible needs to be "rookified" \ud83d\ude09).'}),"\n",(0,o.jsxs)(n.p,{children:["Rookify operates ",(0,o.jsx)(n.code,{children:"in place"}),", meaning no parallel nodes are required. As noted earlier, Rookify is developed to migrate from Ceph-Ansible to Rook ",(0,o.jsx)(n.em,{children:"in place"})," and ",(0,o.jsx)(n.em,{children:"without downtime"}),", but given the complexity of infrastructure, precautionary backups and safety measures are highly recommended."]}),"\n",(0,o.jsxs)(n.p,{children:["For a condensed summary of the information covered here, refer to the ",(0,o.jsx)(n.a,{href:"https://github.com/SovereignCloudStack/rookify",children:"Rookify GitHub repository"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"prerequisites--requirements",children:"Prerequisites & Requirements"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"A functioning Ceph cluster deployed using traditional methods."}),"\n",(0,o.jsx)(n.li,{children:"Access to a Kubernetes cluster with sufficient resources to host the migrated Ceph cluster."}),"\n",(0,o.jsx)(n.li,{children:"Kubernetes nodes must be deployed on at least the OSD nodes."}),"\n",(0,o.jsx)(n.li,{children:"Monitor and OSD daemons should stay in place. Former to ensure that the Ceph endpoints do not change during migration, the later ones to have access to the underlying hardware."}),"\n",(0,o.jsx)(n.li,{children:"Rook operator version 1.13 or higher installed on the Kubernetes cluster."}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"radoslib"})," version 2.0.0 installed."]}),"\n",(0,o.jsxs)(n.li,{children:["For a ",(0,o.jsx)(n.em,{children:"dockerized setup"}),", ",(0,o.jsx)(n.code,{children:"docker"})," and ",(0,o.jsx)(n.code,{children:"docker compose"})," are required."]}),"\n",(0,o.jsxs)(n.li,{children:["In order to use the Makefile, ",(0,o.jsx)(n.code,{children:"GNU make"})," is required."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"manual-installation",children:"Manual Installation"}),"\n",(0,o.jsx)(n.h3,{id:"download-or-clone-the-repository",children:"Download or Clone the Repository"}),"\n",(0,o.jsxs)(n.p,{children:["Clone or download Rookify from the ",(0,o.jsx)(n.a,{href:"https://github.com/SovereignCloudStack/rookify",children:"repository"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"install-and-run-locally-without-docker",children:"Install and Run Locally (without Docker)"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Navigate to the tool directory:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"cd rookify\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["To install Rookify locally, Python's ",(0,o.jsx)(n.code,{children:"virtualenv"})," will be used (Note: This will install ",(0,o.jsx)(n.code,{children:"pre-commit"})," in your local user user context):"]}),"\n"]}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsxs)(n.p,{children:["Checkout the included options in the ",(0,o.jsx)(n.code,{children:"Makefile"})," by typing ",(0,o.jsx)(n.code,{children:"make"}),"."]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"make setup\n"})}),"\n",(0,o.jsxs)(n.p,{children:["This command also verifies if the required Python library ",(0,o.jsx)(n.code,{children:"radoslib"})," is installed. Ensure it is available on your Linux distribution."]}),"\n",(0,o.jsx)(n.admonition,{type:"tip",children:(0,o.jsxs)(n.p,{children:["Before running Rookify, check all available options by using ",(0,o.jsx)(n.code,{children:"rookify --help"}),"."]})}),"\n",(0,o.jsxs)(n.p,{children:["To run Rookify you can either run it directly from within Python's ",(0,o.jsx)(n.code,{children:"virtualenv"})," or with help of the Makefile:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# directly\n./.venv/bin/rookify --help\n# using make\nmake run-local-rookify\n"})}),"\n",(0,o.jsx)(n.h3,{id:"install-and-run-from-within-a-container",children:"Install and Run from within a Container"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Navigate to the tool directory:"}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["To install Rookify in a container, you can use either Podman or Docker (Note: In both cases, Python\u2019s ",(0,o.jsx)(n.code,{children:"radoslib"})," library must be installed locally):"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"make check-radoslib\nmake up\n"})}),"\n",(0,o.jsxs)(n.p,{children:["This command uses ",(0,o.jsx)(n.code,{children:"docker compose"}),", so ensure it is installed as well."]}),"\n",(0,o.jsxs)(n.p,{children:["To run Rookify, you can either enter the container and run it from there or use ",(0,o.jsx)(n.code,{children:"make run-rookify"}),"."]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["Before running rookify, it's useful to check all options by using ",(0,o.jsx)(n.code,{children:"rookify --help"}),"."]})})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},5162:(e,n,r)=>{r.d(n,{Z:()=>l});r(7294);var o=r(6905);const t={tabItem:"tabItem_Ymn6"};var i=r(5893);function l(e){let{children:n,hidden:r,className:l}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,o.Z)(t.tabItem,l),hidden:r,children:n})}},4866:(e,n,r)=>{r.d(n,{Z:()=>j});var o=r(7294),t=r(6905),i=r(2466),l=r(6550),s=r(469),a=r(1980),c=r(7392),d=r(812);function u(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:r}=e;return(0,o.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:r,attributes:o,default:t}}=e;return{value:n,label:r,attributes:o,default:t}}))}(r);return function(e){const n=(0,c.lx)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function p(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const t=(0,l.k6)(),i=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,a._X)(i),(0,o.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(t.location.search);n.set(i,e),t.replace({...t.location,search:n.toString()})}),[i,t])]}function f(e){const{defaultValue:n,queryString:r=!1,groupId:t}=e,i=h(e),[l,a]=(0,o.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const o=r.find((e=>e.default))??r[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:n,tabValues:i}))),[c,u]=m({queryString:r,groupId:t}),[f,y]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[t,i]=(0,d.Nk)(r);return[t,(0,o.useCallback)((e=>{r&&i.set(e)}),[r,i])]}({groupId:t}),b=(()=>{const e=c??f;return p({value:e,tabValues:i})?e:null})();(0,s.Z)((()=>{b&&a(b)}),[b]);return{selectedValue:l,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);a(e),u(e),y(e)}),[u,y,i]),tabValues:i}}var y=r(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=r(5893);function g(e){let{className:n,block:r,selectedValue:o,selectValue:l,tabValues:s}=e;const a=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.o5)(),d=e=>{const n=e.currentTarget,r=a.indexOf(n),t=s[r].value;t!==o&&(c(n),l(t))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=a.indexOf(e.currentTarget)+1;n=a[r]??a[0];break}case"ArrowLeft":{const r=a.indexOf(e.currentTarget)-1;n=a[r]??a[a.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,t.Z)("tabs",{"tabs--block":r},n),children:s.map((e=>{let{value:n,label:r,attributes:i}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,ref:e=>a.push(e),onKeyDown:u,onClick:d,...i,className:(0,t.Z)("tabs__item",b.tabItem,i?.className,{"tabs__item--active":o===n}),children:r??n},n)}))})}function k(e){let{lazy:n,children:r,selectedValue:i}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===i));return e?(0,o.cloneElement)(e,{className:(0,t.Z)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function v(e){const n=f(e);return(0,x.jsxs)("div",{className:(0,t.Z)("tabs-container",b.tabList),children:[(0,x.jsx)(g,{...n,...e}),(0,x.jsx)(k,{...n,...e})]})}function j(e){const n=(0,y.Z)();return(0,x.jsx)(v,{...e,children:u(e.children)},String(n))}},1151:(e,n,r)=>{r.d(n,{Z:()=>s,a:()=>l});var o=r(7294);const t={},i=o.createContext(t);function l(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);