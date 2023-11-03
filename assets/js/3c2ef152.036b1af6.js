"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[1813],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>h});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=o.createContext({}),s=function(e){var n=o.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return o.createElement(u.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,u=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(t),m=r,h=d["".concat(u,".").concat(m)]||d[m]||c[m]||a;return t?o.createElement(h,i(i({ref:n},p),{},{components:t})):o.createElement(h,i({ref:n},p))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=m;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l[d]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=t[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5287:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var o=t(7462),r=(t(7294),t(3905));const a={sidebar_label:"Zuul CI",sidebar_position:200},i="Zuul CI",l={unversionedId:"guides/deploy-guide/zuul",id:"guides/deploy-guide/zuul",title:"Zuul CI",description:"We use Zuul CI as a CI service for OSISM. The service is not required for",source:"@site/docs/guides/deploy-guide/zuul.md",sourceDirName:"guides/deploy-guide",slug:"/guides/deploy-guide/zuul",permalink:"/docs/guides/deploy-guide/zuul",draft:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/deploy-guide/zuul.md",tags:[],version:"current",sidebarPosition:200,frontMatter:{sidebar_label:"Zuul CI",sidebar_position:200},sidebar:"tutorialSidebar",previous:{title:"Logging & Monitoring",permalink:"/docs/guides/deploy-guide/logging-monitoring"},next:{title:"Upgrade Guides",permalink:"/docs/guides/upgrade-guides/"}},u={},s=[{value:"Installation",id:"installation",level:2},{value:"Server preparation",id:"server-preparation",level:3},{value:"Define secrets",id:"define-secrets",level:3},{value:"Github App setup",id:"github-app-setup",level:3},{value:"Example Playbook",id:"example-playbook",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Your git repos are not displayed?",id:"your-git-repos-are-not-displayed",level:3},{value:"Your git repos are using the wrong branch?",id:"your-git-repos-are-using-the-wrong-branch",level:3},{value:"Your logs are not displayed in the web-UI?",id:"your-logs-are-not-displayed-in-the-web-ui",level:3}],p={toc:s},d="wrapper";function c(e){let{components:n,...t}=e;return(0,r.kt)(d,(0,o.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"zuul-ci"},"Zuul CI"),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"We use Zuul CI as a CI service for OSISM. The service is not required for\nthe use of OSISM itself. However, as we deploy and provide Zuul CI ourselves,\nthe documentation for this is also included in the OSISM deploy guide.")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"osism.services.zuul")," is the Ansible role to set up Zuul CI as a single-node\ninstallation with Docker Compose."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("h3",{id:"server-preparation"},"Server preparation"),(0,r.kt)("p",null,"Set up a server (VM) with Ubuntu Server 22.04 LTS and make\nsure that these packages are installed:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"docker.io"),(0,r.kt)("li",{parentName:"ul"},"docker-compose"),(0,r.kt)("li",{parentName:"ul"},"python3-docker"),(0,r.kt)("li",{parentName:"ul"},"python3-openstackclient")),(0,r.kt)("p",null,"Also configure your deploy user to be in the docker group and set up the\naccount for the zuul user. TCP-Ports 80 and 443 should be accessible\nfrom the internet, port 22 for management via SSH will also often be\nuseful, but not required."),(0,r.kt)("p",null,"If you have an OpenStack tenant where you want to deploy the Zuul\nserver, you can download and adapt this example\nplaybook:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'---\n- name: Setup zuul server\n  hosts: localhost\n  vars:\n    cloud: mycloud\n    flavor: myflavor\n    image: Ubuntu 22.04\n    keypair: mykeypair\n    network: myprivatenet\n    project: myproject\n    zuul_domain: mydomain.xyz.\n    zuul_fqdn: "zuul01.services.{{ zuul_domain }}"\n    zuul_host: zuul01\n\n  tasks:\n    - name: Create security group\n      openstack.cloud.security_group:\n        cloud: "{{ cloud }}"\n        name: "{{ project }}-zuul"\n        description: "Default security group for {{ project }}-zuul"\n\n    - name: Create security group rule (icmp)\n      openstack.cloud.security_group_rule:\n        cloud: "{{ cloud }}"\n        security_group: "{{ project }}-zuul"\n        protocol: icmp\n        remote_ip_prefix: 0.0.0.0/0\n\n    - name: Create security group rules (tcp)\n      openstack.cloud.security_group_rule:\n        cloud: "{{ cloud }}"\n        security_group: "{{ project }}-zuul"\n        protocol: tcp\n        remote_ip_prefix: 0.0.0.0/0\n        port_range_min: "{{ item }}"\n        port_range_max: "{{ item }}"\n      loop:\n        - 22\n        - 80\n        - 443\n\n    - name: Create zuul server\n      openstack.cloud.server:\n        cloud: "{{ cloud }}"\n        flavor: "{{ flavor }}"\n        image: "{{ image }}"\n        key_name: "{{ keypair }}"\n        name: "{{ zuul_host }}"\n        network: "{{ network }}"\n        security_groups:\n          - default\n          - "{{ project }}-zuul"\n        meta:\n          hostname: "{{ zuul_host }}"\n      register: zuul_server\n\n    - name: Add host\n      ansible.builtin.add_host:\n        name: "{{ zuul_server.openstack.accessIPv4 }}"\n        groups: zuul\n        ansible_user: ubuntu\n\n- name: Initialize zuul server\n  hosts: zuul\n  gather_facts: false\n  vars:\n    zuul_user: zuul\n\n  tasks:\n    - name: Wait for system to become reachable\n      ansible.builtin.wait_for_connection:\n\n    - name: Update all packages\n      ansible.builtin.apt:\n        update_cache: true\n        name: \'*\'\n        state: latest\n      become: true\n\n    - name: Install required packages\n      ansible.builtin.apt:\n        name:\n          - docker.io\n          - docker-compose\n          - python3-docker\n          - python3-openstackclient\n      become: true\n\n    - name: Add user to docker group\n      ansible.builtin.user:\n        name: "{{ ansible_ssh_user }}"\n        groups: docker\n        append: true\n      become: true\n\n    - name: Add group\n      ansible.builtin.group:\n        name: "{{ zuul_user }}"\n      become: true\n\n    - name: Add user\n      ansible.builtin.user:\n        name: "{{ zuul_user }}"\n        uid: 10001\n        shell: /bin/bash\n        group: "{{ zuul_user }}"\n        groups: sudo\n        append: true\n        home: "/home/{{ zuul_user }}"\n      become: true\n')),(0,r.kt)("h3",{id:"define-secrets"},"Define secrets"),(0,r.kt)("p",null,"There need to be some secrets handed to the deployment, the suggested\nmethod is to have a dedicated file that contains them, which will be\nincluded in the example playbook below via a ",(0,r.kt)("inlineCode",{parentName:"p"},"vars_files")," statement.\nThis allows you to easily protect all your secrets by applying\n",(0,r.kt)("inlineCode",{parentName:"p"},"ansible-vault encrypt")," to that file. The contents of this file should\nlook like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"---\nzuul_auth_secret: secret used for zuul web auth\nwebhook_token: token defined for github webhooks\ndb_user_pass: DB password for the zuul user\ndb_root_pass: DB root password\n")),(0,r.kt)("p",null,"In addition you need to prepare some further data that needs to be\nplaced into a ",(0,r.kt)("inlineCode",{parentName:"p"},"files")," directory in order to be consumed by the zuul\nrole. These are:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"A ",(0,r.kt)("inlineCode",{parentName:"li"},"clouds.yaml")," file for nodepool. This will be used by\n",(0,r.kt)("inlineCode",{parentName:"li"},"nodepool-builder")," to upload the newly created images and by\n",(0,r.kt)("inlineCode",{parentName:"li"},"nodepool-launcher")," to start instances running these images, these\nwill then be handed over to Zuul as CI nodes."),(0,r.kt)("li",{parentName:"ol"},"An SSH private key in the file ",(0,r.kt)("inlineCode",{parentName:"li"},"nodepool")," and the matching public\nkey in ",(0,r.kt)("inlineCode",{parentName:"li"},"nodepool.pub"),". These will be used by nodepool and zuul to\naccess the CI nodes via SSH."),(0,r.kt)("li",{parentName:"ol"},"An SSL private key and certificate pasted together in a file\nnamed ",(0,r.kt)("inlineCode",{parentName:"li"},"server.crt"),". This file will be used in the https setup by\nthe webserver. The certificate should cover both ",(0,r.kt)("inlineCode",{parentName:"li"},"zuul_webserver_fqdn"),"\nand ",(0,r.kt)("inlineCode",{parentName:"li"},"zuul_logserver_fqdn"),".")),(0,r.kt)("h3",{id:"github-app-setup"},"Github App setup"),(0,r.kt)("p",null,"In order for zuul to be able to interact with repositories hosted on\ngithub, you need to set up a github application. Follow the instructions\nat ",(0,r.kt)("a",{parentName:"p",href:"https://zuul-ci.org/docs/zuul/latest/drivers/github.html#application"},"https://zuul-ci.org/docs/zuul/latest/drivers/github.html#application"),"\nto do this. The webhook token to use is the one defined in the\npervious section. Use ",(0,r.kt)("inlineCode",{parentName:"p"},"github")," in place of ",(0,r.kt)("inlineCode",{parentName:"p"},"<connection-name>")," for the\nWebhook URL in the app configuration. After the app has been created,\nplace the PEM files that you downloaded into a\ndirectory named ",(0,r.kt)("inlineCode",{parentName:"p"},"pem-files"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ mkdir -p pem-files\n$ cp ~/Downloads/my-org-zuul.*.private-key.pem pem-files/my-org-zuul.pem\n")),(0,r.kt)("p",null,"Now add the information about your github app to ",(0,r.kt)("inlineCode",{parentName:"p"},"vars.yml"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"github_app_id: 000000\ngithub_pem_name: my-org-zuul\n")),(0,r.kt)("h3",{id:"example-playbook"},"Example Playbook"),(0,r.kt)("p",null,"Save this file as ",(0,r.kt)("inlineCode",{parentName:"p"},"main.yaml"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'---\n- name: Set up zuul\n  hosts: zuul.example.com\n  vars_files:\n    - vars.yml\n  pre_tasks:\n    - name: Create /etc/openstack/\n      ansible.builtin.file:\n        state: directory\n        path: /etc/openstack\n        owner: root\n        group: root\n        mode: 0755\n      become: true\n\n    - name: Deploy clouds.yaml file\n      ansible.builtin.copy:\n        src: clouds.yaml\n        dest: /etc/openstack/clouds.yaml\n        owner: root\n        group: zuul\n        mode: \'0640\'\n      become: true\n\n    - name: Create keypair in the cloud\n      openstack.cloud.keypair:\n        cloud: osism-ci\n        name: osism-zuul\n        public_key: "{{ lookup(\'file\', \'nodepool.pub\') }}"\n      become: true\n\n  roles:\n    - name: Execute zuul role\n      role: zuul\n      vars:\n        zuul_connections:\n          github:\n            driver: github\n            webhook_token: "{{ webhook_token }}"\n            app_id: "{{ github_app_id }}"\n            app_key: "/etc/zuul/pem-files/{{ github_pem_name }}.pem"\n          opendevorg:\n            name: opendev\n            driver: git\n            baseurl: https://opendev.org\n        zuul_tenants:\n          - tenant:\n              name: my-tenant-name\n              source:\n                opendevorg:\n                  untrusted-projects:\n                    - zuul/zuul-jobs:\n                        include:\n                          - job\n                github:\n                  config-projects:\n                    - my-org/zuul_demo_config:\n                        load-branch: main\n                  untrusted-projects:\n                    - my-org/zuul_demo_repo\n      become: true\n')),(0,r.kt)("p",null,"Create an ",(0,r.kt)("inlineCode",{parentName:"p"},"inventory")," file containing the login information for your zuul\nserver, it might look like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"zuul.example.com ansible_host=192.0.2.2 ansible_user=ubuntu\n")),(0,r.kt)("p",null,"Then you can deploy your zuul server by running:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"ansible-playbook -i inventory main.yaml\n")),(0,r.kt)("p",null,"This will deploy a simple zuul setup with sample example repos being\nreferenced. You can fork the example repos from the\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/osism"},"https://github.com/osism")," tenant or just use them as a guide for how\nto build your own."),(0,r.kt)("p",null,"For further information about how to tune this setup for\nyou specific environment, have a look at the sections covering\nnodepool and tenant configuration."),(0,r.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,r.kt)("h3",{id:"your-git-repos-are-not-displayed"},"Your git repos are not displayed?"),(0,r.kt)("p",null,"Have you thought of naming your repos with the prefix of your organization? ",(0,r.kt)("inlineCode",{parentName:"p"},"release")," should be ",(0,r.kt)("inlineCode",{parentName:"p"},"osism/release")," for example."),(0,r.kt)("h3",{id:"your-git-repos-are-using-the-wrong-branch"},"Your git repos are using the wrong branch?"),(0,r.kt)("p",null,"For ",(0,r.kt)("inlineCode",{parentName:"p"},"config-projects")," you set this value in the tenant-configuration with the ",(0,r.kt)("inlineCode",{parentName:"p"},"load-branch")," stanza.\nFor ",(0,r.kt)("inlineCode",{parentName:"p"},"untrusted-projects")," you set this value in the config-projects ",(0,r.kt)("inlineCode",{parentName:"p"},"project")," sections AND in EVERY ",(0,r.kt)("inlineCode",{parentName:"p"},"untrusted-project"),".\nEach ",(0,r.kt)("inlineCode",{parentName:"p"},"project")," section needs to have the ",(0,r.kt)("inlineCode",{parentName:"p"},"default-branch")," stanza."),(0,r.kt)("h3",{id:"your-logs-are-not-displayed-in-the-web-ui"},"Your logs are not displayed in the web-UI?"),(0,r.kt)("p",null,"Check, if the IP of the logfile server is really correct. In combination with GitHub there is a\nbug which keeps the GitHub App posting to the old IP even if the webhook IP was changed. Current\nworkaround: Delete the old GitHub App and create a new one."))}c.isMDXComponent=!0}}]);