"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2517],{5263:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var t=o(5893),s=o(1151);const i={sidebar_label:"Client"},r="Client",a={id:"guides/user-guide/openstack/openstackclient",title:"Client",description:"OpenStackClient looks for a clouds.yaml configuration file in the following locations:",source:"@site/docs/guides/user-guide/openstack/openstackclient.md",sourceDirName:"guides/user-guide/openstack",slug:"/guides/user-guide/openstack/openstackclient",permalink:"/de/docs/guides/user-guide/openstack/openstackclient",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/user-guide/openstack/openstackclient.md",tags:[],version:"current",frontMatter:{sidebar_label:"Client"},sidebar:"tutorialSidebar",previous:{title:"OpenStack",permalink:"/de/docs/guides/user-guide/openstack/"},next:{title:"Security groups",permalink:"/de/docs/guides/user-guide/openstack/security-groups"}},c={},l=[{value:"Migration from openrc to clouds.yaml",id:"migration-from-openrc-to-cloudsyaml",level:2},{value:"With an editor",id:"with-an-editor",level:2},{value:"With a script",id:"with-a-script",level:2},{value:"Python",id:"python",level:3},{value:"Bash",id:"bash",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"client",children:"Client"}),"\n",(0,t.jsxs)(n.p,{children:["OpenStackClient looks for a ",(0,t.jsx)(n.code,{children:"clouds.yaml"})," configuration file in the following locations:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"current directory"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"~/.config/openstack"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"/etc/openstack"})}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["With the OpenStack client you can specify the cloud profile specified in the ",(0,t.jsx)(n.code,{children:"clouds.yaml"}),"\nconfiguration file  by providing the ",(0,t.jsx)(n.code,{children:"--os-cloud <cloud identifier>"})," parameter."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"openstack --os-cloud openstack network list\n"})}),"\n",(0,t.jsx)(n.h2,{id:"migration-from-openrc-to-cloudsyaml",children:"Migration from openrc to clouds.yaml"}),"\n",(0,t.jsxs)(n.p,{children:["If you have your ",(0,t.jsx)(n.code,{children:"openrc"})," file  but you need this information in a ",(0,t.jsx)(n.code,{children:"clouds.yaml"})," file,\nthis can easily be converted."]}),"\n",(0,t.jsx)(n.h2,{id:"with-an-editor",children:"With an editor"}),"\n",(0,t.jsxs)(n.p,{children:["Example content of a ",(0,t.jsx)(n.code,{children:"openrc"})," file downloaded from Horizon dashboard."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",metastring:'title="PROJECT-openrc.sh"',children:'#!/usr/bin/env bash\n# To use an OpenStack cloud you need to authenticate against the Identity\n# service named keystone, which returns a **Token** and **Service Catalog**.\n# The catalog contains the endpoints for all services the user/tenant has\n# access to - such as Compute, Image Service, Identity, Object Storage, Block\n# Storage, and Networking (code-named nova, glance, keystone, swift,\n# cinder, and neutron).\n#\n# *NOTE*: Using the 3 *Identity API* does not necessarily mean any other\n# OpenStack API is version 3. For example, your cloud provider may implement\n# Image API v1.1, Block Storage API v2, and Compute API v2.0. OS_AUTH_URL is\n# only for the Identity API served through keystone.\nexport OS_AUTH_URL=https://api.testbed.osism.xyz:5000/v3\n# With the addition of Keystone we have standardized on the term **project**\n# as the entity that owns the resources.\nexport OS_PROJECT_ID=PROJECT_ID\nexport OS_PROJECT_NAME="PROJECT"\nexport OS_USER_DOMAIN_NAME="DOMAIN"\nif [ -z "$OS_USER_DOMAIN_NAME" ]; then unset OS_USER_DOMAIN_NAME; fi\nexport OS_PROJECT_DOMAIN_ID="DOMAIN_ID"\nif [ -z "$OS_PROJECT_DOMAIN_ID" ]; then unset OS_PROJECT_DOMAIN_ID; fi\n# unset v2.0 items in case set\nunset OS_TENANT_ID\nunset OS_TENANT_NAME\n# In addition to the owning entity (tenant), OpenStack stores the entity\n# performing the action as the **user**.\nexport OS_USERNAME="USERNAME"\n# With Keystone you pass the keystone password.\necho "Please enter your OpenStack Password for project $OS_PROJECT_NAME as user $OS_USERNAME: "\nread -sr OS_PASSWORD_INPUT\nexport OS_PASSWORD=$OS_PASSWORD_INPUT\n# If your configuration has multiple regions, we set that information here.\n# OS_REGION_NAME is optional and only valid in certain environments.\nexport OS_REGION_NAME="RegionOne"\n# Don\'t leave a blank variable, unset it if it was empty\nif [ -z "$OS_REGION_NAME" ]; then unset OS_REGION_NAME; fi\nexport OS_INTERFACE=public\nexport OS_IDENTITY_API_VERSION=3\n'})}),"\n",(0,t.jsxs)(n.p,{children:["First you need to create a ",(0,t.jsx)(n.code,{children:"clouds.yaml"})," file. Take care of the indentation and\nuse spaces instead of tabs."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="clouds.yaml"',children:"clouds:\n  openstack:\n    auth:\n      auth_url: <OS_AUTH_URL goes here> \n      password: <OS_PASSWORD goes here, if not set, enter you password here>\n      project_domain_name: <OS_PROJECT_DOMAIN_NAME goes here>\n      project_name: <OS_PROJECT_NAME goes here>\n      user_domain_name: <OS_USER_DOMAIN_NAME goes here>\n      username: <OS_USERNAME goes here>\n   region_name: <OS_REGION_NAME goes here>\n   identity_api_version: <OS_IDENTITY_API_VERSION goes here> \n   interface: <OS_INTERFACE goes here>\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The final ",(0,t.jsx)(n.code,{children:"clouds.yaml"})," for your ",(0,t.jsx)(n.code,{children:"openrc"})," will then look like this one. The content\nfrom the previous ",(0,t.jsx)(n.code,{children:"PROJECT-openrc.sh"})," example was used here."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="clouds.yaml"',children:"clouds:\n  openstack:\n    auth:\n      auth_url: https://api.testbed.osism.xyz:5000/v3\n      password: PASSWORD\n      project_domain_name: DOMAIN\n      project_name: PROJECT\n      user_domain_name: DOMAIN\n      username: USERNAME\n   region_name: RegionOne\n   identity_api_version: 3\n   interface: public\n"})}),"\n",(0,t.jsx)(n.h2,{id:"with-a-script",children:"With a script"}),"\n",(0,t.jsx)(n.h3,{id:"python",children:"Python"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",metastring:'title="clouds.py"',children:'import os\nimport yaml\n \nclouds = {\n  "clouds":{\n    "openstack": {\n      "auth" : {\n        "auth_url" : os.environ["OS_AUTH_URL"],\n        "project_name": os.environ["OS_PROJECT_NAME"],\n        "project_domain_name": os.environ["OS_PROJECT_DOMAIN_NAME"],\n        "username": os.environ["OS_USERNAME"],\n        "user_domain_name": os.environ["OS_USER_DOMAIN_NAME"],\n        "password": os.environ["OS_PASSWORD"],\n      },\n      "region_name": os.environ["OS_REGION_NAME"],\n      "identity_api_version":  os.environ["OS_IDENTITY_API_VERSION"],\n      "interface": "public"\n    }\n  }\n}\n \nprint(yaml.dump(clouds))\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Source: ",(0,t.jsx)(n.a,{href:"https://adam.younglogic.com/2022/03/generating-a-clouds-yaml-file",children:"Adam Young's Web Log"})]}),"\n",(0,t.jsxs)(n.p,{children:["First you need to source your ",(0,t.jsx)(n.code,{children:"openrc"})," file so that the ",(0,t.jsx)(n.code,{children:"OS_"})," variables are available."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"source PROJECT-openrc.sh\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Now you can execute the Python script and a ",(0,t.jsx)(n.code,{children:"clouds.yaml"})," will be written."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"python3 clouds.py > clouds.yaml\n"})}),"\n",(0,t.jsx)(n.h3,{id:"bash",children:"Bash"}),"\n",(0,t.jsxs)(n.p,{children:["You need to point the ",(0,t.jsx)(n.code,{children:"source"})," line to your ",(0,t.jsx)(n.code,{children:"openrc"})," file first. Then execute the Bash script.\nThis will create the ",(0,t.jsx)(n.code,{children:"clouds.yaml"})," file in your currect directory"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'#!/bin/bash\n\nsource PROJECT-openrc.sh\n\nPROJECT_ID=$(openstack project list | grep $OS_PROJECT_NAME | awk \'{print $2}\')\n\ncat << EOF > clouds.yaml\nclouds:\n  openstack:\n    auth:\n      auth_url: $OS_AUTH_URL\n      username: "$OS_USERNAME"\n      password: "$OS_PASSWORD"\n      project_name: "$OS_PROJECT_NAME"\n      project_id: "$PROJECT_ID"\n      user_domain_name: "$OS_USER_DOMAIN_NAME"\n    region_name: "$OS_REGION_NAME"\n    interface: "public"\n    identity_api_version: $OS_IDENTITY_API_VERSION\nEOF\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Source: ",(0,t.jsx)(n.a,{href:"https://andreaskaris.github.io/blog/openstack/using_clouds_yaml",children:"Andreas Karis Blog"})]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>r});var t=o(7294);const s={},i=t.createContext(s);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);