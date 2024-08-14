"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[3216],{675:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var o=i(5893),t=i(1151);const a={sidebar_label:"Horizon"},s="Horizon",r={id:"guides/configuration-guide/openstack/horizon",title:"Horizon",description:"* Horizon admin guide",source:"@site/docs/guides/configuration-guide/openstack/horizon.md",sourceDirName:"guides/configuration-guide/openstack",slug:"/guides/configuration-guide/openstack/horizon",permalink:"/docs/guides/configuration-guide/openstack/horizon",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/openstack/horizon.md",tags:[],version:"current",frontMatter:{sidebar_label:"Horizon"},sidebar:"tutorialSidebar",previous:{title:"Heat",permalink:"/docs/guides/configuration-guide/openstack/heat"},next:{title:"Ironic",permalink:"/docs/guides/configuration-guide/openstack/ironic"}},l={},c=[{value:"Problems uploading machine images larger than 1 GiB",id:"problems-uploading-machine-images-larger-than-1-gib",level:2},{value:"Make clouds.yml file downloadable as an alternative to the RC file",id:"make-cloudsyml-file-downloadable-as-an-alternative-to-the-rc-file",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"horizon",children:"Horizon"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.openstack.org/horizon/latest/admin/index.html",children:"Horizon admin guide"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.openstack.org/horizon/latest/configuration/index.html",children:"Horizon configuration guide"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.openstack.org/horizon/latest/configuration/settings.html",children:"Horizon configuration reference"})}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"problems-uploading-machine-images-larger-than-1-gib",children:"Problems uploading machine images larger than 1 GiB"}),"\n",(0,o.jsxs)(n.p,{children:["By default, the ",(0,o.jsx)(n.code,{children:"LimitRequestBody"})," is set to ",(0,o.jsx)(n.code,{children:"1073741824"})," (1 GiB).\nThis is a security feature (",(0,o.jsx)(n.a,{href:"https://access.redhat.com/security/cve/CVE-2022-29404",children:"CVE-2022-29404"}),")\nand not a bug. Further details in the\n",(0,o.jsx)(n.a,{href:"https://access.redhat.com/articles/6975397",children:"A new default for the LimitRequestBody directive in httpd configuration"}),"\narticle in the RedHat knowledgebase."]}),"\n",(0,o.jsxs)(n.p,{children:["This limit can be increased via the parameter ",(0,o.jsx)(n.code,{children:"horizon_httpd_limitrequestbody"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:"horizon_httpd_limitrequestbody: 2147483648  # 2 GiB\n"})}),"\n",(0,o.jsx)(n.h2,{id:"make-cloudsyml-file-downloadable-as-an-alternative-to-the-rc-file",children:"Make clouds.yml file downloadable as an alternative to the RC file"}),"\n",(0,o.jsxs)(n.p,{children:["By default, only the ",(0,o.jsx)(n.code,{children:"openrc"})," file is offered for download in Horizon. It makes sense to also add the\n",(0,o.jsx)(n.code,{children:"clouds.yaml"})," as a download. To do this, the menu is customised in the ",(0,o.jsx)(n.code,{children:"custom_local_settings"}),". The\nchange can be deployed with ",(0,o.jsx)(n.code,{children:"osism apply -a reconfigure horizon"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/files/overlays/horizon/custom_local_settings"',children:"SHOW_KEYSTONE_V2_RC = False\nUSER_MENU_LINKS = [\n  {'name': _('OpenStack clouds.yml File'),\n   'icon_classes': ['fa-download', ],\n   'url': 'horizon:project:api_access:clouds.yaml',\n   'external': False,\n   },\n  {'name': _('OpenStack RC File v3'),\n   'icon_classes': ['fa-download', ],\n   'url': 'horizon:project:api_access:openrc',\n   'external': False,\n   }\n]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>s});var o=i(7294);const t={},a=o.createContext(t);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);