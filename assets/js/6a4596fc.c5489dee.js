"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[7958],{3491:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var t=i(5893),s=i(1151);const a={sidebar_label:"Loadbalancer",sidebar_position:20},l="Loadbalancer",r={id:"guides/configuration-guide/loadbalancer",title:"Loadbalancer",description:"IP addresses & FQDNs",source:"@site/docs/guides/configuration-guide/loadbalancer.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/loadbalancer",permalink:"/docs/guides/configuration-guide/loadbalancer",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/loadbalancer.md",tags:[],version:"current",sidebarPosition:20,frontMatter:{sidebar_label:"Loadbalancer",sidebar_position:20},sidebar:"tutorialSidebar",previous:{title:"Proxy",permalink:"/docs/guides/configuration-guide/proxy"},next:{title:"Ceph",permalink:"/docs/guides/configuration-guide/ceph"}},o={},c=[{value:"IP addresses &amp; FQDNs",id:"ip-addresses--fqdns",level:2},{value:"TLS certificates",id:"tls-certificates",level:2},{value:"Generating TLS certificates with Let\u2019s Encrypt",id:"generating-tls-certificates-with-lets-encrypt",level:2},{value:"Self-signed certificates",id:"self-signed-certificates",level:2},{value:"Second Loadbalancer",id:"second-loadbalancer",level:2},{value:"ProxySQL",id:"proxysql",level:2}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"loadbalancer",children:"Loadbalancer"}),"\n",(0,t.jsx)(n.h2,{id:"ip-addresses--fqdns",children:"IP addresses & FQDNs"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:"kolla_internal_vip_address: 192.168.16.9\nkolla_external_vip_address: 192.168.16.254\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:"kolla_internal_fqdn: api-int.testbed.osism.xyz\nkolla_external_fqdn: api.testbed.osism.xyz\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"hosts_additional_entries:\n  api-int.testbed.osism.xyz: 192.168.16.9\n  api.testbed.osism.xyz: 192.168.16.254\n"})}),"\n",(0,t.jsx)(n.h2,{id:"tls-certificates",children:"TLS certificates"}),"\n",(0,t.jsx)(n.p,{children:"To enable external TLS encryption:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'kolla_enable_tls_external: "yes"\n'})}),"\n",(0,t.jsx)(n.p,{children:"To enable internal TLS encryption:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'kolla_enable_tls_internal: "yes"\n'})}),"\n",(0,t.jsx)(n.p,{children:"Two certificate files are required to use TLS securely with authentication,\nwhich will be provided by your Certificate Authority:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"the server certificate with private key"}),"\n",(0,t.jsx)(n.li,{children:"the CA certificate with any intermediate certificates"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"The combined server certificate and private key needs to be provided at\nthe following locations in the configuration repository:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["private key & certificates for ",(0,t.jsx)(n.code,{children:"kolla_external_fqdn"}),": ",(0,t.jsx)(n.code,{children:"environments/kolla/certificates/haproxy.pem"})]}),"\n",(0,t.jsxs)(n.li,{children:["private key & certificates for ",(0,t.jsx)(n.code,{children:"kolla_internal_fqdn"}),": ",(0,t.jsx)(n.code,{children:"environments/kolla/certificates/haproxy-internal.pem"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"generating-tls-certificates-with-lets-encrypt",children:"Generating TLS certificates with Let\u2019s Encrypt"}),"\n",(0,t.jsx)(n.h2,{id:"self-signed-certificates",children:"Self-signed certificates"}),"\n",(0,t.jsx)(n.p,{children:"The use of self-signed certificates with a custom CA is possible. However, a few\nadditional parameters are then required in the configuration so that the custom CA\nis known everywhere and the self-signed certificates are accepted as valid."}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Import custom CA"}),"\n",(0,t.jsxs)(n.p,{children:["Any custom CA can be added via the ",(0,t.jsx)(n.code,{children:"certificates_ca"})," parameter.\nThe import on the nodes is done via ",(0,t.jsx)(n.code,{children:"osism apply certificates"}),".\nThis is already done in the bootstrap of the nodes."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"certificates_ca:\n  - name: custom.crt\n    certificate: |\n      -----BEGIN CERTIFICATE-----\n      [...]\n      -----END CERTIFICATE-----\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Manager service"}),"\n",(0,t.jsxs)(n.p,{children:["The local environment variable ",(0,t.jsx)(n.code,{children:"REQUESTS_CA_BUNDLE"})," must be set explicitly so that\nthe manager service knows the custom CA in all necessary places."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/manager/configuration.yml"',children:"manager_environment_extra:\n  REQUESTS_CA_BUNDLE: /etc/ssl/certs/ca-certificates.crt\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Use in OpenStack"}),"\n",(0,t.jsxs)(n.p,{children:["The custom CA must also be copied into the OpenStack containers. To do this, the custom\nCA is first added in a file in the ",(0,t.jsx)(n.code,{children:"environments/kolla/certificates/ca"})," of the configuration\nrepository.  It makes sense to use the same filename like in step 1."]}),"\n",(0,t.jsx)(n.p,{children:"The import of the custom CA must then be explicitly enabled."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'kolla_copy_ca_into_containers: "yes"\nopenstack_cacert: /etc/ssl/certs/ca-certificates.crt\n'})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"second-loadbalancer",children:"Second Loadbalancer"}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsx)(n.p,{children:"This feature is available from OSISM 7.0.5."})}),"\n",(0,t.jsxs)(n.p,{children:["With OSISM, it is possible to manage any number of independent loadbalancers via a single OSISM\nmanager service using sub-environments. A sub environment is basically nothing more than another directory\nbelow the ",(0,t.jsx)(n.code,{children:"environments"})," directory of the configuration repository with a special name."]}),"\n",(0,t.jsxs)(n.p,{children:["A sub-environment for an additional loadbalancer always has the name ",(0,t.jsx)(n.code,{children:"kolla.NAME"})," as the loadbalancer\nis provided as part of Kolla. The ",(0,t.jsx)(n.code,{children:"kolla.NAME"})," directory in the configuration repository then contains\nthe ",(0,t.jsx)(n.code,{children:"configuration.yml"}),", ",(0,t.jsx)(n.code,{children:"images.yml"})," and ",(0,t.jsx)(n.code,{children:"secrets.yml"})," files as usual."]}),"\n",(0,t.jsx)(n.p,{children:"The following directories and files are also required in a sub-environment for a loadbalancer."}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"File"}),(0,t.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"certificates/ca/custom.crt"})}),(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"The file is optional. If a custom CA is used, it must be added here."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"certificates/haproxy-internal.pem"})}),(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"SSL certificate to be used."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{style:{textAlign:"left"},children:(0,t.jsx)(n.code,{children:"files/overlays/haproxy/services.d/haproxy.cfg"})}),(0,t.jsx)(n.td,{style:{textAlign:"left"},children:"HAProxy configuration to be used on the loadbalancer."})]})]})]}),"\n",(0,t.jsxs)(n.p,{children:["In this example, a sub-environment ",(0,t.jsx)(n.code,{children:"kolla.external"})," is created, which is used for an outward facing\nloadbalancer that only offers certain API services."]}),"\n",(0,t.jsxs)(n.p,{children:["In comparison to the normal ",(0,t.jsx)(n.code,{children:"kolla"})," environment, the groups to be used must be overwritten for a\nKolla sub-environment. In this case, one group is defined: ",(0,t.jsx)(n.code,{children:"kolla.external.loadbalancer"}),". It is\nrecommended to base the name of the groups on the name of the sub-environments."]}),"\n",(0,t.jsxs)(n.p,{children:["The group ",(0,t.jsx)(n.code,{children:"kolla.external.loadbalancer"})," is added to the global inventory in the ",(0,t.jsx)(n.code,{children:"10-custom"})," file.\nIn this example, ",(0,t.jsx)(n.code,{children:"testbed-node-2.testbed.osism.xyz"})," is used for the second loadbalancer."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",metastring:'title="inventory/10-custom"',children:"[kolla.external.loadbalancer]\ntestbed-node-2.testbed.osism.xyz\n"})}),"\n",(0,t.jsxs)(n.p,{children:["It is also important to ensure that the nodes used for the second loadbalancer are not included in\nthe ",(0,t.jsx)(n.code,{children:"loadbalancer"})," group. This can be checked with ",(0,t.jsx)(n.code,{children:"osism get hosts -l loadbalancer"}),". If the nodes of\nthe second loadbalancer are also listed there, the ",(0,t.jsx)(n.code,{children:"loadbalancer"})," group in the ",(0,t.jsx)(n.code,{children:"99-overwrite"})," file of\nthe global inventory must be overwritten. In this example, the ",(0,t.jsx)(n.code,{children:"loadbalaner"})," group is overwritten so\nthat only ",(0,t.jsx)(n.code,{children:"testbed-node-0.testbed.osism.xyz"})," and ",(0,t.jsx)(n.code,{children:"testbed-node-1.testbed.osism.xyz"})," are left in the\n",(0,t.jsx)(n.code,{children:"loadbalancer"})," group."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",metastring:'title="inventory/99-overwrite"',children:"[loadbalancer]\ntestbed-node-0.testbed.osism.xyz\ntestbed-node-1.testbed.osism.xyz\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Furthermore, in a Kolla sub-environment that is only used for a loadbalancer, only a few additional\nparameters are required in the ",(0,t.jsx)(n.code,{children:"configuration.yml"})," file."]}),"\n",(0,t.jsxs)(n.p,{children:["Don't get confused, only the ",(0,t.jsx)(n.code,{children:"kolla_*internal*"})," parameters and the ",(0,t.jsx)(n.code,{children:"haproxy-internal.pem"})," file are used\nhere in the example. This is because we only want to configure one virtual IP address on the external\nloadbalancer and the loadbalancer managed by Kolla has the internal IP address by default. It is therefore\nnot possible with Kolla to use only the ",(0,t.jsx)(n.code,{children:"kolla_*external*"})," parameters as an additional virtual IP address\nwith default values would then be configured by default."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla.external/configuration.yml"',children:'---\n##########################################################\n# hosts\n\nhosts_kolla_all: kolla.external.loadbalancer\nhosts_kolla_loadbalancer: kolla.external.loadbalancer\n\n##########################################################\n# docker\n\ndocker_namespace: osism\n\n##########################################################\n# loadbalancer\n\nkolla_internal_vip_address: 192.168.24.200\nkolla_internal_fqdn: api.testbed.osism.com\nkolla_enable_tls_internal: "yes"\n\n# Required if a custom CA is used.\nkolla_copy_ca_into_containers: "yes"\n'})}),"\n",(0,t.jsx)(n.p,{children:"At the moment it is only possible to deploy the loadbalancer itself with its own configuration. It is currently\nnot possible to use the integrated service configurations of Kolla itself (Nova, Cinder, ..) on an additional\nloadbalancer. This will be possible in the future."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"osism apply --sub external loadbalancer-without-service-config\n"})}),"\n",(0,t.jsx)(n.h2,{id:"proxysql",children:"ProxySQL"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'enable_proxysql: "yes"\n'})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>l});var t=i(7294);const s={},a=t.createContext(s);function l(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);