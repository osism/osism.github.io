"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[836],{4480:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>u});const i=JSON.parse('{"id":"guides/developer-guide/zuul","title":"Zuul CI","description":"We use Zuul CI as a CI service for OSISM. The service is not required for","source":"@site/docs/guides/developer-guide/zuul.md","sourceDirName":"guides/developer-guide","slug":"/guides/developer-guide/zuul","permalink":"/docs/guides/developer-guide/zuul","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/developer-guide/zuul.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"Zuul CI"},"sidebar":"tutorialSidebar","previous":{"title":"Style Guide","permalink":"/docs/guides/developer-guide/style-guide"},"next":{"title":"Cloud in a Box","permalink":"/docs/cloud-in-a-box/"}}');var s=o(4848),t=o(8453);const r={sidebar_label:"Zuul CI"},l="Zuul CI",a={},u=[{value:"The <code>zuul</code> label",id:"the-zuul-label",level:2},{value:"Installation",id:"installation",level:2},{value:"Server preparation",id:"server-preparation",level:3},{value:"Define secrets",id:"define-secrets",level:3},{value:"Github App setup",id:"github-app-setup",level:3},{value:"Example Playbook",id:"example-playbook",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Your git repos are not displayed?",id:"your-git-repos-are-not-displayed",level:3},{value:"Your git repos are using the wrong branch?",id:"your-git-repos-are-using-the-wrong-branch",level:3},{value:"Your logs are not displayed in the web-UI?",id:"your-logs-are-not-displayed-in-the-web-ui",level:3},{value:"Hanging jobs in a pipeline?",id:"hanging-jobs-in-a-pipeline",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"zuul-ci",children:"Zuul CI"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsx)(n.p,{children:"We use Zuul CI as a CI service for OSISM. The service is not required for\nthe use of OSISM itself. However, as we deploy and provide Zuul CI ourselves,\nthe documentation for this is also included in the OSISM Developer Guide."}),(0,s.jsxs)(n.p,{children:["Our Zuul CI instance is available at\n",(0,s.jsx)(n.a,{href:"https://zuul.services.betacloud.xyz/t/osism/status",children:"zuul.services.betacloud.xyz"}),"."]})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"osism.services.zuul"})," is the Ansible role to set up Zuul CI as a single-node\ninstallation with Docker Compose."]}),"\n",(0,s.jsxs)(n.h2,{id:"the-zuul-label",children:["The ",(0,s.jsx)(n.code,{children:"zuul"})," label"]}),"\n",(0,s.jsxs)(n.p,{children:["On CI jobs that consume a lot of resources and have long runtimes we use a label\n",(0,s.jsx)(n.code,{children:"zuul"})," to run these jobs."]}),"\n",(0,s.jsxs)(n.p,{children:["These CI jobs run in the ",(0,s.jsx)(n.a,{href:"https://zuul.services.betacloud.xyz/t/osism/buildsets?pipeline=label",children:"label pipeline"}),"\nand are only started once after the label has been assigned. If changes are made\nto a PR, the label must first be removed and then reassigned for a new run of the\nCI jobs."]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"zuul"})," label is usable in the following repositories:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/osism/container-images-kolla",children:"osism/container-images-kolla"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/osism/testbed",children:"osism/testbed"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.h3,{id:"server-preparation",children:"Server preparation"}),"\n",(0,s.jsx)(n.p,{children:"Set up a server (VM) with Ubuntu Server 22.04 LTS and make\nsure that these packages are installed:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"docker.io"}),"\n",(0,s.jsx)(n.li,{children:"docker-compose"}),"\n",(0,s.jsx)(n.li,{children:"python3-docker"}),"\n",(0,s.jsx)(n.li,{children:"python3-openstackclient"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Also configure your deploy user to be in the docker group and set up the\naccount for the zuul user. TCP-Ports 80 and 443 should be accessible\nfrom the internet, port 22 for management via SSH will also often be\nuseful, but not required."}),"\n",(0,s.jsx)(n.p,{children:"If you have an OpenStack tenant where you want to deploy the Zuul\nserver, you can download and adapt this example\nplaybook:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'---\n- name: Setup zuul server\n  hosts: localhost\n  vars:\n    cloud: mycloud\n    flavor: myflavor\n    image: Ubuntu 22.04\n    keypair: mykeypair\n    network: myprivatenet\n    project: myproject\n    zuul_domain: mydomain.xyz.\n    zuul_fqdn: "zuul01.services.{{ zuul_domain }}"\n    zuul_host: zuul01\n\n  tasks:\n    - name: Create security group\n      openstack.cloud.security_group:\n        cloud: "{{ cloud }}"\n        name: "{{ project }}-zuul"\n        description: "Default security group for {{ project }}-zuul"\n\n    - name: Create security group rule (icmp)\n      openstack.cloud.security_group_rule:\n        cloud: "{{ cloud }}"\n        security_group: "{{ project }}-zuul"\n        protocol: icmp\n        remote_ip_prefix: 0.0.0.0/0\n\n    - name: Create security group rules (tcp)\n      openstack.cloud.security_group_rule:\n        cloud: "{{ cloud }}"\n        security_group: "{{ project }}-zuul"\n        protocol: tcp\n        remote_ip_prefix: 0.0.0.0/0\n        port_range_min: "{{ item }}"\n        port_range_max: "{{ item }}"\n      loop:\n        - 22\n        - 80\n        - 443\n\n    - name: Create zuul server\n      openstack.cloud.server:\n        cloud: "{{ cloud }}"\n        flavor: "{{ flavor }}"\n        image: "{{ image }}"\n        key_name: "{{ keypair }}"\n        name: "{{ zuul_host }}"\n        network: "{{ network }}"\n        security_groups:\n          - default\n          - "{{ project }}-zuul"\n        meta:\n          hostname: "{{ zuul_host }}"\n      register: zuul_server\n\n    - name: Add host\n      ansible.builtin.add_host:\n        name: "{{ zuul_server.openstack.accessIPv4 }}"\n        groups: zuul\n        ansible_user: ubuntu\n\n- name: Initialize zuul server\n  hosts: zuul\n  gather_facts: false\n  vars:\n    zuul_user: zuul\n\n  tasks:\n    - name: Wait for system to become reachable\n      ansible.builtin.wait_for_connection:\n\n    - name: Update all packages\n      ansible.builtin.apt:\n        update_cache: true\n        name: \'*\'\n        state: latest\n      become: true\n\n    - name: Install required packages\n      ansible.builtin.apt:\n        name:\n          - docker.io\n          - docker-compose\n          - python3-docker\n          - python3-openstackclient\n      become: true\n\n    - name: Add user to docker group\n      ansible.builtin.user:\n        name: "{{ ansible_ssh_user }}"\n        groups: docker\n        append: true\n      become: true\n\n    - name: Add group\n      ansible.builtin.group:\n        name: "{{ zuul_user }}"\n      become: true\n\n    - name: Add user\n      ansible.builtin.user:\n        name: "{{ zuul_user }}"\n        uid: 10001\n        shell: /bin/bash\n        group: "{{ zuul_user }}"\n        groups: sudo\n        append: true\n        home: "/home/{{ zuul_user }}"\n      become: true\n'})}),"\n",(0,s.jsx)(n.h3,{id:"define-secrets",children:"Define secrets"}),"\n",(0,s.jsxs)(n.p,{children:["There need to be some secrets handed to the deployment, the suggested\nmethod is to have a dedicated file that contains them, which will be\nincluded in the example playbook below via a ",(0,s.jsx)(n.code,{children:"vars_files"})," statement.\nThis allows you to easily protect all your secrets by applying\n",(0,s.jsx)(n.code,{children:"ansible-vault encrypt"})," to that file. The contents of this file should\nlook like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"---\nzuul_auth_secret: secret used for zuul web auth\nwebhook_token: token defined for github webhooks\ndb_user_pass: DB password for the zuul user\ndb_root_pass: DB root password\n"})}),"\n",(0,s.jsxs)(n.p,{children:["In addition you need to prepare some further data that needs to be\nplaced into a ",(0,s.jsx)(n.code,{children:"files"})," directory in order to be consumed by the zuul\nrole. These are:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["A ",(0,s.jsx)(n.code,{children:"clouds.yaml"})," file for nodepool. This will be used by\n",(0,s.jsx)(n.code,{children:"nodepool-builder"})," to upload the newly created images and by\n",(0,s.jsx)(n.code,{children:"nodepool-launcher"})," to start instances running these images, these\nwill then be handed over to Zuul as CI nodes."]}),"\n",(0,s.jsxs)(n.li,{children:["An SSH private key in the file ",(0,s.jsx)(n.code,{children:"nodepool"})," and the matching public\nkey in ",(0,s.jsx)(n.code,{children:"nodepool.pub"}),". These will be used by nodepool and zuul to\naccess the CI nodes via SSH."]}),"\n",(0,s.jsxs)(n.li,{children:["An SSL private key and certificate pasted together in a file\nnamed ",(0,s.jsx)(n.code,{children:"server.crt"}),". This file will be used in the https setup by\nthe webserver. The certificate should cover both ",(0,s.jsx)(n.code,{children:"zuul_webserver_fqdn"}),"\nand ",(0,s.jsx)(n.code,{children:"zuul_logserver_fqdn"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"github-app-setup",children:"Github App setup"}),"\n",(0,s.jsxs)(n.p,{children:["In order for zuul to be able to interact with repositories hosted on\ngithub, you need to set up a github application. Follow the instructions\nat ",(0,s.jsx)(n.a,{href:"https://zuul-ci.org/docs/zuul/latest/drivers/github.html#application",children:"https://zuul-ci.org/docs/zuul/latest/drivers/github.html#application"}),"\nto do this. The webhook token to use is the one defined in the\npervious section. Use ",(0,s.jsx)(n.code,{children:"github"})," in place of ",(0,s.jsx)(n.code,{children:"<connection-name>"})," for the\nWebhook URL in the app configuration. After the app has been created,\nplace the PEM files that you downloaded into a\ndirectory named ",(0,s.jsx)(n.code,{children:"pem-files"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"$ mkdir -p pem-files\n$ cp ~/Downloads/my-org-zuul.*.private-key.pem pem-files/my-org-zuul.pem\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now add the information about your github app to ",(0,s.jsx)(n.code,{children:"vars.yml"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"github_app_id: 000000\ngithub_pem_name: my-org-zuul\n"})}),"\n",(0,s.jsx)(n.h3,{id:"example-playbook",children:"Example Playbook"}),"\n",(0,s.jsxs)(n.p,{children:["Save this file as ",(0,s.jsx)(n.code,{children:"main.yaml"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'---\n- name: Set up zuul\n  hosts: zuul.example.com\n  vars_files:\n    - vars.yml\n  pre_tasks:\n    - name: Create /etc/openstack/\n      ansible.builtin.file:\n        state: directory\n        path: /etc/openstack\n        owner: root\n        group: root\n        mode: 0755\n      become: true\n\n    - name: Deploy clouds.yaml file\n      ansible.builtin.copy:\n        src: clouds.yaml\n        dest: /etc/openstack/clouds.yaml\n        owner: root\n        group: zuul\n        mode: \'0640\'\n      become: true\n\n    - name: Create keypair in the cloud\n      openstack.cloud.keypair:\n        cloud: osism-ci\n        name: osism-zuul\n        public_key: "{{ lookup(\'file\', \'nodepool.pub\') }}"\n      become: true\n\n  roles:\n    - name: Execute zuul role\n      role: zuul\n      vars:\n        zuul_connections:\n          github:\n            driver: github\n            webhook_token: "{{ webhook_token }}"\n            app_id: "{{ github_app_id }}"\n            app_key: "/etc/zuul/pem-files/{{ github_pem_name }}.pem"\n          opendevorg:\n            name: opendev\n            driver: git\n            baseurl: https://opendev.org\n        zuul_tenants:\n          - tenant:\n              name: my-tenant-name\n              source:\n                opendevorg:\n                  untrusted-projects:\n                    - zuul/zuul-jobs:\n                        include:\n                          - job\n                github:\n                  config-projects:\n                    - my-org/zuul_demo_config:\n                        load-branch: main\n                  untrusted-projects:\n                    - my-org/zuul_demo_repo\n      become: true\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Create an ",(0,s.jsx)(n.code,{children:"inventory"})," file containing the login information for your zuul\nserver, it might look like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"zuul.example.com ansible_host=192.0.2.2 ansible_user=ubuntu\n"})}),"\n",(0,s.jsx)(n.p,{children:"Then you can deploy your zuul server by running:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"ansible-playbook -i inventory main.yaml\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This will deploy a simple zuul setup with sample example repos being\nreferenced. You can fork the example repos from the\n",(0,s.jsx)(n.a,{href:"https://github.com/osism",children:"https://github.com/osism"})," tenant or just use them as a guide for how\nto build your own."]}),"\n",(0,s.jsx)(n.p,{children:"For further information about how to tune this setup for\nyou specific environment, have a look at the sections covering\nnodepool and tenant configuration."}),"\n",(0,s.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,s.jsx)(n.h3,{id:"your-git-repos-are-not-displayed",children:"Your git repos are not displayed?"}),"\n",(0,s.jsxs)(n.p,{children:["Have you thought of naming your repos with the prefix of your organization? ",(0,s.jsx)(n.code,{children:"release"})," should be ",(0,s.jsx)(n.code,{children:"osism/release"})," for example."]}),"\n",(0,s.jsx)(n.h3,{id:"your-git-repos-are-using-the-wrong-branch",children:"Your git repos are using the wrong branch?"}),"\n",(0,s.jsxs)(n.p,{children:["For ",(0,s.jsx)(n.code,{children:"config-projects"})," you set this value in the tenant-configuration with the ",(0,s.jsx)(n.code,{children:"load-branch"})," stanza.\nFor ",(0,s.jsx)(n.code,{children:"untrusted-projects"})," you set this value in the config-projects ",(0,s.jsx)(n.code,{children:"project"})," sections AND in EVERY ",(0,s.jsx)(n.code,{children:"untrusted-project"}),".\nEach ",(0,s.jsx)(n.code,{children:"project"})," section needs to have the ",(0,s.jsx)(n.code,{children:"default-branch"})," stanza."]}),"\n",(0,s.jsx)(n.h3,{id:"your-logs-are-not-displayed-in-the-web-ui",children:"Your logs are not displayed in the web-UI?"}),"\n",(0,s.jsx)(n.p,{children:"Check, if the IP of the logfile server is really correct. In combination with GitHub there is a\nbug which keeps the GitHub App posting to the old IP even if the webhook IP was changed. Current\nworkaround: Delete the old GitHub App and create a new one."}),"\n",(0,s.jsx)(n.h3,{id:"hanging-jobs-in-a-pipeline",children:"Hanging jobs in a pipeline?"}),"\n",(0,s.jsx)(n.p,{children:"Sometimes jobs get stuck in a pipeline and are never scheduled. They must then be removed manually\nso that they do not block other jobs."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Hanging jobs in a pipeline",src:o(7382).A+"",width:"774",height:"588"})}),"\n",(0,s.jsxs)(n.p,{children:["First create a local ",(0,s.jsx)(n.code,{children:".zuul.conf"})," configuration file in your home directory."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",metastring:'title="$HOME/.zuul.conf"'})}),"\n",(0,s.jsxs)(n.p,{children:["[osism]\nurl=",(0,s.jsx)(n.a,{href:"https://zuul.services.betacloud.xyz/",children:"https://zuul.services.betacloud.xyz/"}),"\nauth_token=TOKEN\ntenant=osism"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"\nThe required auth token can be generated on the Zuul control node with the `zuul-admin` client.\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"docker exec -it zuul_scheduler zuul-admin create-auth-token --user USER --tenant osism --expires-in 3600 --auth-config zuul_operator"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"\nWith the [zuul-client](https://zuul-ci.org/docs/zuul-client/index.html) it is possible to\nremove the two hanging jobs from the screenshot.\n\n"})}),"\n",(0,s.jsx)(n.p,{children:"zuul-client --use-config osism dequeue --pipeline periodic-daily --project osism/k8s-capi-images --ref refs/heads/main\nzuul-client --use-config osism dequeue --pipeline periodic-daily --project osism/cfg-generics --ref refs/heads/main"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"\n## Important daily CI jobs\n\n* [osism/container-image-ceph-ansible](https://zuul.services.betacloud.xyz/t/osism/builds?project=osism%2Fcontainer-image-ceph-ansible&pipeline=periodic-daily&skip=0)\n* [osism/container-image-kolla-ansible](https://zuul.services.betacloud.xyz/t/osism/builds?project=osism%2Fcontainer-image-kolla-ansible&pipeline=periodic-daily&skip=0)\n* [osism/container-image-osism-ansible](https://zuul.services.betacloud.xyz/t/osism/builds?project=osism%2Fcontainer-image-osism-ansible&pipeline=periodic-daily&skip=0)\n* [osism/container-images-kolla](https://zuul.services.betacloud.xyz/t/osism/builds?project=osism%2Fcontainer-images-kolla&pipeline=periodic-midnight&skip=0)\n* [osism/testbed](https://zuul.services.betacloud.xyz/t/osism/builds?project=osism%2Ftestbed&pipeline=periodic-daily&skip=0)\n"})})]})}function c(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},7382:(e,n,o)=>{o.d(n,{A:()=>i});const i=o.p+"assets/images/zuul-hanging-jobs-in-a-pipeline-047d29fda9946dd80cebb88778249bce.png"},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>l});var i=o(6540);const s={},t=i.createContext(s);function r(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);