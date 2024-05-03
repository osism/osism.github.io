"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[366],{2052:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>t,metadata:()=>r,toc:()=>l});var a=i(5893),s=i(1151);const t={sidebar_label:"OpenStack",sidebar_position:40},o="OpenStack",r={id:"guides/upgrade-guide/openstack",title:"OpenStack",description:"When upgrade the different OpenStack services, all containers must be",source:"@site/docs/guides/upgrade-guide/openstack.md",sourceDirName:"guides/upgrade-guide",slug:"/guides/upgrade-guide/openstack",permalink:"/de/docs/guides/upgrade-guide/openstack",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/upgrade-guide/openstack.md",tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_label:"OpenStack",sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"Logging & Monitoring",permalink:"/de/docs/guides/upgrade-guide/logging-monitoring"},next:{title:"Configuration Guide",permalink:"/de/docs/guides/configuration-guide/"}},d={},l=[{value:"Keystone",id:"keystone",level:2},{value:"Glance",id:"glance",level:2},{value:"Designate",id:"designate",level:2},{value:"Placement",id:"placement",level:2},{value:"Cinder",id:"cinder",level:2},{value:"Neutron",id:"neutron",level:2},{value:"Nova",id:"nova",level:2},{value:"Octavia",id:"octavia",level:2},{value:"Amphora image update",id:"amphora-image-update",level:3},{value:"Amphora rotation",id:"amphora-rotation",level:3},{value:"Horizon",id:"horizon",level:2},{value:"OpenStack client",id:"openstack-client",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"openstack",children:"OpenStack"}),"\n",(0,a.jsx)(n.admonition,{type:"info",children:(0,a.jsx)(n.p,{children:"When upgrade the different OpenStack services, all containers must be\nrestarted. When restarting the API services, there is a short downtime\nof the APIs. This downtime is usually less than 1 minute."})}),"\n",(0,a.jsx)(n.h2,{id:"keystone",children:"Keystone"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull keystone\nosism apply -a upgrade keystone\n"})}),"\n",(0,a.jsx)(n.h2,{id:"glance",children:"Glance"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull glance\nosism apply -a upgrade glance\n"})}),"\n",(0,a.jsx)(n.h2,{id:"designate",children:"Designate"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull designate\nosism apply -a upgrade designate\n"})}),"\n",(0,a.jsx)(n.h2,{id:"placement",children:"Placement"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull placement\nosism apply -a upgrade placement\n"})}),"\n",(0,a.jsx)(n.h2,{id:"cinder",children:"Cinder"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull cinder\nosism apply -a upgrade cinder\n"})}),"\n",(0,a.jsx)(n.h2,{id:"neutron",children:"Neutron"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull neutron\nosism apply -a upgrade neutron\n"})}),"\n",(0,a.jsx)(n.h2,{id:"nova",children:"Nova"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull nova\nosism apply -a upgrade nova\n"})}),"\n",(0,a.jsx)(n.h2,{id:"octavia",children:"Octavia"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull octavia\nosism apply -a upgrade octavia\n"})}),"\n",(0,a.jsx)(n.h3,{id:"amphora-image-update",children:"Amphora image update"}),"\n",(0,a.jsx)(n.p,{children:"This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,\nthis step is not necessary."}),"\n",(0,a.jsxs)(n.p,{children:["We provide regularly updated images for Octavia in\n",(0,a.jsx)(n.a,{href:"https://github.com/osism/openstack-octavia-amphora-image",children:"osism/openstack-octavia/amphora-image"}),".\nThe OSISM CLI can be used to upload the correct image depending on the OpenStack release\nused."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism manage image octavia\n"})}),"\n",(0,a.jsx)(n.h3,{id:"amphora-rotation",children:"Amphora rotation"}),"\n",(0,a.jsx)(n.p,{children:"This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,\nthis step is not necessary."}),"\n",(0,a.jsx)(n.h2,{id:"horizon",children:"Horizon"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply -a pull horizon\nosism apply -a upgrade horizon\n"})}),"\n",(0,a.jsx)(n.h2,{id:"openstack-client",children:"OpenStack client"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"osism apply openstackclient\n"})})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>o});var a=i(7294);const s={},t=a.createContext(s);function o(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),a.createElement(t.Provider,{value:n},e.children)}}}]);