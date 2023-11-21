"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9377],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),k=i,m=d["".concat(s,".").concat(k)]||d[k]||c[k]||o;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=k;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},6216:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const o={sidebar_label:"Configuration repository",sidebar_position:10},a="Configuration Repository",l={unversionedId:"guides/configuration-guide/configuration-repository",id:"guides/configuration-guide/configuration-repository",title:"Configuration Repository",description:"The configuration required for OSISM is stored in a single Git monorepo, the configuration repository.",source:"@site/docs/guides/configuration-guide/configuration-repository.md",sourceDirName:"guides/configuration-guide",slug:"/guides/configuration-guide/configuration-repository",permalink:"/docs/guides/configuration-guide/configuration-repository",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/configuration-repository.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_label:"Configuration repository",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Configuration Guide",permalink:"/docs/guides/configuration-guide/"},next:{title:"Inventory",permalink:"/docs/guides/configuration-guide/inventory"}},s={},u=[{value:"Configuration repository layout",id:"configuration-repository-layout",level:2},{value:"Creating a new configuration repository",id:"creating-a-new-configuration-repository",level:2},{value:"Git repository",id:"git-repository",level:3},{value:"Creation",id:"creation",level:3},{value:"Use of a stable release",id:"use-of-a-stable-release",level:3},{value:"Make commit",id:"make-commit",level:3},{value:"Post-processing",id:"post-processing",level:3},{value:"Notes",id:"notes",level:3},{value:"Parameters",id:"parameters",level:3}],p={toc:u},d="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"configuration-repository"},"Configuration Repository"),(0,i.kt)("p",null,"The configuration required for OSISM is stored in a single Git monorepo, the configuration repository."),(0,i.kt)("h2",{id:"configuration-repository-layout"},"Configuration repository layout"),(0,i.kt)("p",null,"A configuration repository is always composed of the same basic layout."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"environments")," directory"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"inventory")," directory"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"netbox")," directory (optional)"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"requirements.txt")," file")),(0,i.kt)("p",{parentName:"li"},"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"requirements.txt")," the necessary dependencies are listed to be able to execute Gilt.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"gilt.yml")," file")),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"https://gilt.readthedocs.io"},"Gilt")," is a Git layering tool. We use Gilt to maintain the image versions,\nAnsible configuration and scripts within the ",(0,i.kt)("inlineCode",{parentName:"p"},"environments/manager")," directory."),(0,i.kt)("p",{parentName:"li"},"The ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/osism/cfg-generics/blob/main/gilt.yml"},"current gilt.yml")," file is always\nlocated in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/osism/cfg-generics"},"osism/cfg-generics")," repository."),(0,i.kt)("p",{parentName:"li"},"To use Gilt the dependencies are installed first."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"pip3 install -r requirements.txt\n")),(0,i.kt)("p",{parentName:"li"},"After that you can update the manager environment in ",(0,i.kt)("inlineCode",{parentName:"p"},"environments/manager"),". Since the ",(0,i.kt)("inlineCode",{parentName:"p"},"gilt.yml"),"\nitself is updated with Gilt it is always important to run the command twice."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"gilt overlay\ngilt overlay\n")),(0,i.kt)("p",{parentName:"li"},"If a stable OSISM release is used, the version to be used is specified by ",(0,i.kt)("inlineCode",{parentName:"p"},"MANAGER_VERSION"),".\nIn the example, OSISM release 6.0.0 is used. The current stable release is listed at\n",(0,i.kt)("a",{parentName:"p",href:"https://release.osism.tech/"},"release.osism.tech"),". Always check there in advance and do not\ncopy the stable release used here as an example. More detail about this in\n",(0,i.kt)("a",{parentName:"p",href:"manager#stable-release"},"Configuration Guide > Manager > Stable release"),"."),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"MANAGER_VERSION=6.0.0 gilt overlay\nMANAGER_VERSION=6.0.0 gilt overlay\n")))),(0,i.kt)("h2",{id:"creating-a-new-configuration-repository"},"Creating a new configuration repository"),(0,i.kt)("p",null,"The initial content for this repository is generated using the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/osism/cfg-cookiecutter"},"cookiecutter"),"."),(0,i.kt)("h3",{id:"git-repository"},"Git repository"),(0,i.kt)("p",null,"The content generated by the cookiecutter in the ",(0,i.kt)("inlineCode",{parentName:"p"},"output/configuration")," directory is\ncommitted to a new Git repository. By default, it is assumed that the configuration\nrepository is stored on GitHub. This can also be GitLab or an internal Git service\nas well."),(0,i.kt)("p",null,"Host and path to the Git repository are specified via the ",(0,i.kt)("inlineCode",{parentName:"p"},"git_")," parameters: The\n",(0,i.kt)("inlineCode",{parentName:"p"},"git_")," parameters do not specify the path to the cookiecutter to use."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"  [8/20] git_host (github.com):\n  [9/20] git_port (22):\n  [10/20] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY): regiocloud/configuration\n  [11/20] git_username (git):\n  [12/20] git_version (main):\n")),(0,i.kt)("p",null,"In this case, the generated configuration in the ",(0,i.kt)("inlineCode",{parentName:"p"},"output/configuration")," directory is\nstored on GitHub in the ",(0,i.kt)("inlineCode",{parentName:"p"},"regiocloud/configuration")," repository."),(0,i.kt)("h3",{id:"creation"},"Creation"),(0,i.kt)("p",null,"In this example a new configuration repository is created with the defaults. The latest versions of\nOSISM are used. The use of a stable release is described in the section\n",(0,i.kt)("a",{parentName:"p",href:"#use-of-a-stable-release"},"Use of a stable release"),"."),(0,i.kt)("p",null,"The directory ",(0,i.kt)("inlineCode",{parentName:"p"},"output")," is created and used as output volume."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"mkdir output\n")),(0,i.kt)("p",null,"The cookiecutter is executed within a container. Docker must be usable on the system\non which the cookiecutter is to be used. It should also work with podman."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"docker run --rm -v $(pwd)/output:/output -it quay.io/osism/cookiecutter\n[1/20] with_ceph (1):\n[2/20] ceph_network_backend (192.168.80.0/20):\n[3/20] ceph_network_frontend (192.168.64.0/20):\n[4/20] ceph_version (quincy):\n[5/20] domain (osism.xyz):\n[6/20] fqdn_external (api.osism.xyz):\n[7/20] fqdn_internal (api-int.osism.xyz):\n[8/20] git_host (github.com):\n[9/20] git_port (22):\n[10/20] git_repository (YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY):\n[11/20] git_username (git):\n[12/20] git_version (main):\n[13/20] ip_external (192.168.96.9):\n[14/20] ip_internal (192.168.32.9):\n[15/20] manager_version (latest):\n[16/20] name_server (149.112.112.112):\n[17/20] ntp_server (de.pool.ntp.org):\n[18/20] openstack_version (2023.1):\n[19/20] project_name (configuration):\n[...]\n")),(0,i.kt)("p",null,"Since we run the cookiecutter inside a container, the user rights are not correct\nafterwards and have to be changed."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"sudo chown -R $USER: output/\n")),(0,i.kt)("h3",{id:"use-of-a-stable-release"},"Use of a stable release"),(0,i.kt)("p",null,"When you want to use a stable release this is done via the parameter ",(0,i.kt)("inlineCode",{parentName:"p"},"manager_version"),".\nBy default, this is always set to ",(0,i.kt)("inlineCode",{parentName:"p"},"latest"),". If, for example, the stable release ",(0,i.kt)("inlineCode",{parentName:"p"},"6.0.0"),"\nis to be used, the value for this parameter is set to ",(0,i.kt)("inlineCode",{parentName:"p"},"6.0.0"),"."),(0,i.kt)("p",null,"The current stable release is listed at ",(0,i.kt)("a",{parentName:"p",href:"https://release.osism.tech/"},"release.osism.tech"),".\nAlways check there in advance and do not copy the stable release used here as an example."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"manager_version [latest]: 6.0.0\n")),(0,i.kt)("p",null,"If the ",(0,i.kt)("inlineCode",{parentName:"p"},"manager_version")," parameter is set to a stable release then it is no longer necessary\nto set the ",(0,i.kt)("inlineCode",{parentName:"p"},"ceph_version")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"openstack_version")," parameters. These are then no longer needed\nand are ignored. The used versions result from the ",(0,i.kt)("inlineCode",{parentName:"p"},"manager_version"),"."),(0,i.kt)("h3",{id:"make-commit"},"Make commit"),(0,i.kt)("p",null,"The content is now committed to the previously created Git repository."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'$ git clone git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cp -r output/configuration/* output/configuration/.gitignore YOUR_NEW_CONFIGURATION_REPOSITORY\n$ cd YOUR_NEW_CONFIGURATION_REPOSITORY\n$ git add .gitignore *\n$ git commit -m "Initial commit"\n$ git push\n')),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"secrets")," directory is not stored in the Git repository. Its contents can be\nstored in a suitable location."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"secrets")," directory contains an SSH key pair which is used as a deploy key to\nmake the configuration repository available on the manager node later. Write access\nis not required. The public SSH key is stored in the file ",(0,i.kt)("inlineCode",{parentName:"p"},"secrets/id_rsa.configuration.pub"),"."),(0,i.kt)("p",null,"How to add a deploy key on GitHub is documented in\n",(0,i.kt)("a",{parentName:"p",href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys"},"Managing deploy keys"),"."),(0,i.kt)("h3",{id:"post-processing"},"Post-processing"),(0,i.kt)("p",null,"The configuration repository that is initially created with the Cookiecutter is not directly usable.\nFor example, the inventory needs to be built. All further information can be found in the\n",(0,i.kt)("a",{parentName:"p",href:"./"},"Configuration Guide"),"."),(0,i.kt)("h3",{id:"notes"},"Notes"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The password for Ansible Vault encrypted files, ist stored at ",(0,i.kt)("inlineCode",{parentName:"li"},"secrets/vaultpass"),"."),(0,i.kt)("li",{parentName:"ul"},"The password of the generated Keepass file is ",(0,i.kt)("inlineCode",{parentName:"li"},"password"),". This has to be changed.")),(0,i.kt)("h3",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("tr",null,(0,i.kt)("th",null,"Parameter"),(0,i.kt)("th",null,"Description"),(0,i.kt)("th",null,"Default")),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"ceph_network_backend")),(0,i.kt)("td",null,"Address range for ceph's backend network"),(0,i.kt)("td",null,(0,i.kt)("code",null,"192.168.80.0/20"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"ceph_network_frontend")),(0,i.kt)("td",null,"Address range for ceph's frontend network"),(0,i.kt)("td",null,(0,i.kt)("code",null,"192.168.64.0/20"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"ceph_version")),(0,i.kt)("td",null,"The version of Ceph. When using a stable OSISM release (",(0,i.kt)("code",null,"manager_version != latest"),"), this value is ignored."),(0,i.kt)("td",null,(0,i.kt)("code",null,"quincy"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"domain")),(0,i.kt)("td",null,"The domain used by hostnames"),(0,i.kt)("td",null,(0,i.kt)("code",null,"osism.xyz"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"fqdn_external")),(0,i.kt)("td",null,"External API FQDN"),(0,i.kt)("td",null,(0,i.kt)("code",null,"api.osism.xyz"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"fqdn_internal")),(0,i.kt)("td",null,"Internal API FQDN"),(0,i.kt)("td",null,(0,i.kt)("code",null,"api-int.osism.xyz"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"git_host")),(0,i.kt)("td",null,"Address of the used Git server"),(0,i.kt)("td",null,(0,i.kt)("code",null,"github.com"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"git_port")),(0,i.kt)("td",null,"Port of the used Git server"),(0,i.kt)("td",null,(0,i.kt)("code",null,"22"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"git_repository")),(0,i.kt)("td",null,"Path to the git configuration repository"),(0,i.kt)("td",null,(0,i.kt)("code",null,"YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"git_username")),(0,i.kt)("td",null,"Username of the git repository"),(0,i.kt)("td",null,(0,i.kt)("code",null,"git"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"git_version")),(0,i.kt)("td",null,"Git branch name"),(0,i.kt)("td",null,(0,i.kt)("code",null,"main"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"ip_external")),(0,i.kt)("td",null,"The external IP address of the API (resolves to ",(0,i.kt)("code",null,"fqdn_external"),")"),(0,i.kt)("td",null,(0,i.kt)("code",null,"192.168.96.9"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"ip_internal")),(0,i.kt)("td",null,"The internal IP address of the API (resolves to ",(0,i.kt)("code",null,"fqdn_internal"),")"),(0,i.kt)("td",null,(0,i.kt)("code",null,"192.168.32.9"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"manager_version")),(0,i.kt)("td",null,"The version of OSISM. An overview of available OSISM releases can be found on ",(0,i.kt)("a",{href:"https://release.osism.tech"},"release.osism.tech"),"."),(0,i.kt)("td",null,(0,i.kt)("code",null,"latest"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"name_server")),(0,i.kt)("td",null,"Nameserver. Only one nameserver is set here because the query of multiple values in Cooiecutter is weird. Add more nameservers afterwards."),(0,i.kt)("td",null,(0,i.kt)("code",null,"149.112.112.112"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"ntp_server")),(0,i.kt)("td",null,"NTP server. Only one NTP server is set here because the query of multiple values in Cooiecutter is weird. Add more NTP servers afterwards."),(0,i.kt)("td",null,(0,i.kt)("code",null,"de.pool.ntp.org"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"openstack_version")),(0,i.kt)("td",null,"The version of OpenStack. When using a stable OSISM release (",(0,i.kt)("code",null,"manager_version != latest"),"), this value is ignored."),(0,i.kt)("td",null,(0,i.kt)("code",null,"2023.1"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"project_name")),(0,i.kt)("td",null,"Name of the configuration repository directory"),(0,i.kt)("td",null,(0,i.kt)("code",null,"configuration"))),(0,i.kt)("tr",null,(0,i.kt)("td",null,(0,i.kt)("code",null,"with_ceph")),(0,i.kt)("td",null,"1 to use Ceph, 0 to not use Ceph"),(0,i.kt)("td",null,(0,i.kt)("code",null,"1")))))}c.isMDXComponent=!0}}]);