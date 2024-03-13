"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[9372],{3197:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>a});var s=t(5893),i=t(1151);const r={sidebar_label:"OpenStack",sidebar_position:50},l="OpenStack",o={id:"guides/configuration-guide/openstack/index",title:"OpenStack",description:"Image tags",source:"@site/docs/guides/configuration-guide/openstack/index.md",sourceDirName:"guides/configuration-guide/openstack",slug:"/guides/configuration-guide/openstack/",permalink:"/de/docs/guides/configuration-guide/openstack/",draft:!1,unlisted:!1,editUrl:"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/openstack/index.md",tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_label:"OpenStack",sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Ceph",permalink:"/de/docs/guides/configuration-guide/ceph"},next:{title:"Horizon",permalink:"/de/docs/guides/configuration-guide/openstack/horizon"}},c={},a=[{value:"Image tags",id:"image-tags",level:2},{value:"Network interfaces",id:"network-interfaces",level:2},{value:"Customization of the service configurations",id:"customization-of-the-service-configurations",level:2},{value:"How does the configuration get into services?",id:"how-does-the-configuration-get-into-services",level:2},{value:"Number of service workers",id:"number-of-service-workers",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"openstack",children:"OpenStack"}),"\n",(0,s.jsx)(n.h2,{id:"image-tags",children:"Image tags"}),"\n",(0,s.jsxs)(n.p,{children:["Sometimes it is necessary to specify the image tag to be used for a specific service or a specific image of a service.\nAll available images and tags are listed in the ",(0,s.jsx)(n.a,{href:"https://github.com/osism/defaults/blob/main/all/002-images-kolla.yml",children:"002-images-kolla.yml"}),"\nfile."]}),"\n",(0,s.jsxs)(n.p,{children:["The image tags can be set in the ",(0,s.jsx)(n.code,{children:"environments/kolla/images.yml"})," file."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Use a specific tag for all images of a service:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/images.yml"',children:'barbican_tag: "2023.1"\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Use a specific tag for a specific image of a service:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="environments/kolla/images.yml"',children:'barbican_worker_tag: "2023.1"\n'})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"network-interfaces",children:"Network interfaces"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Parameter"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Default"}),(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"network_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"eth0"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"neutron_external_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ network_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"kolla_external_vip_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ network_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"api_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ network_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"migration_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ api_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"tunnel_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ network_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"octavia_network_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ 'o-hm0' if octavia_network_type == 'tenant' else api_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"dns_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ network_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"dpdk_tunnel_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ neutron_external_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"ironic_http_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ api_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"ironic_tftp_interface"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"},children:(0,s.jsx)(n.code,{children:"{{ api_interface }}"})}),(0,s.jsx)(n.td,{style:{textAlign:"left"}})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"customization-of-the-service-configurations",children:"Customization of the service configurations"}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["The following content is based on the ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/kolla-ansible/latest/admin/advanced-configuration.html#openstack-service-configuration-in-kolla",children:"kolla-ansible uptream documentation"}),"."]})}),"\n",(0,s.jsxs)(n.p,{children:["OSISM will generally look for files in ",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/CONFIGFILE"}),",\n",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/SERVICENAME/CONFIGFILE"})," or ",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/SERVICENAME/HOSTNAME/CONFIGFILE"}),"\nin the configuration repository. These locations sometimes vary and you should check the config task in the appropriate\nAnsible role for a full list of supported locations. For example, in the case of ",(0,s.jsx)(n.code,{children:"nova.conf"})," the following locations are\nsupported, assuming that you have services using ",(0,s.jsx)(n.code,{children:"nova.conf"})," running on hosts called ctl1, ctl2 and ctl3:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova.conf"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova/ctl1/nova.conf"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova/ctl2/nova.conf"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova/ctl3/nova.conf"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova/nova-scheduler.conf"})}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Using this mechanism, overrides can be configured per-project (Nova), per-project-service (Nova scheduler service) or\nper-project-service-on-specified-host (Nova servies on ctl1)."}),"\n",(0,s.jsxs)(n.p,{children:["Overriding an option is as simple as setting the option under the relevant section. For example, to set\noverride ",(0,s.jsx)(n.code,{children:"scheduler_max_attempts"})," in the Nova scheduler service, the operator could create\n",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova/nova-scheduler.conf"})," in the configuration repository with this content:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"[DEFAULT]\nscheduler_max_attempts = 100\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If the operator wants to configure the initial disk, cpu and ram allocation ratio on compute node ",(0,s.jsx)(n.code,{children:"com1"}),",\nthe operator needs to create the file  ",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/nova/com1/nova.conf"})," with this\ncontent:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"[DEFAULT]\ninitial_cpu_allocation_ratio = 3.0\ninitial_ram_allocation_ratio = 1.0\ninitial_disk_allocation_ratio = 1.0\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Note that the numbers shown here with an ",(0,s.jsx)(n.code,{children:"initial_cpu_allocation_ratio"})," of 3.0 do match the requirements\nof the SCS-nV-* (moderate oversubscription) flavors. If you do not use SMT/hyperthreading, SCS would allow\n5.0 here (for the V flavors)."]}),"\n",(0,s.jsxs)(n.p,{children:["This method of merging configuration sections is supported for all services using ",(0,s.jsx)(n.a,{href:"https://docs.openstack.org/oslo.config/latest/",children:"oslo.config"}),",\nwhich includes the vast majority of OpenStack services, and in some cases for services using YAML configuration.\nSince the INI format is an informal standard, not all INI files can be merged in this way. In these cases OSISM supports\noverriding the entire config file."]}),"\n",(0,s.jsxs)(n.p,{children:["Additional flexibility can be introduced by using Jinja conditionals in the config files. For example, you may create\nNova cells which are homogeneous with respect to the hypervisor model. In each cell, you may wish to configure the\nhypervisors differently, for example the following override shows one way of setting the ",(0,s.jsx)(n.code,{children:"bandwidth_poll_interval"}),"\nvariable as a function of the cell:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"[DEFAULT]\n{% if 'cell0001' in group_names %}\nbandwidth_poll_interval = 100\n{% elif 'cell0002' in group_names %}\nbandwidth_poll_interval = -1\n{% else %}\nbandwidth_poll_interval = 300\n{% endif %}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["An alternative to Jinja conditionals would be to define a variable for the ",(0,s.jsx)(n.code,{children:"bandwidth_poll_interval"})," and set\nit in according to your requirements in the inventory group or host vars:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"[DEFAULT]\nbandwidth_poll_interval = {{ bandwidth_poll_interval }}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["OSISM allows the operator to override configuration globally for all services. It will look for a file\ncalled ",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/global.conf"})," in the configuration repository."]}),"\n",(0,s.jsxs)(n.p,{children:["For example to modify database pool size connection for all services, the operator needs to create\n",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/global.conf"})," in the configuration repository with this content:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ini",children:"[database]\nmax_pool_size = 100\n"})}),"\n",(0,s.jsx)(n.h2,{id:"how-does-the-configuration-get-into-services",children:"How does the configuration get into services?"}),"\n",(0,s.jsx)(n.p,{children:"It is explained with example of OpenSearch Service how the configuration for OpenSearch\nis created and gets into the container."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The task ",(0,s.jsx)(n.a,{href:"https://github.com/openstack/kolla-ansible/blob/master/ansible/roles/opensearch/tasks/config.yml",children:"Copying over opensearch service config file"}),"\nmerges the individual sources of the files."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="Copying over opensearch service config file task"',children:'- name: Copying over opensearch service config file\n  merge_yaml:\n    sources:\n      # highlight-start\n  - "{{ role_path }}/templates/opensearch.yml.j2"\n  - "{{ node_custom_config }}/opensearch.yml"\n  - "{{ node_custom_config }}/opensearch/opensearch.yml"\n  - "{{ node_custom_config }}/opensearch/{{ inventory_hostname }}/opensearch.yml"\n      # highlight-end\n    dest: "{{ node_config_directory }}/opensearch/opensearch.yml"\n    mode: "0660"\n  become: true\n  when:\n    - inventory_hostname in groups[\'opensearch\']\n    - opensearch_services[\'opensearch\'].enabled | bool\n  notify:\n    - Restart opensearch container\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["As a basis a template ",(0,s.jsx)(n.a,{href:"https://github.com/openstack/kolla-ansible/blob/master/ansible/roles/opensearch/templates/opensearch.yml.j2",children:"opensearch.yml.j2"}),"\nis used which is part of the OpenSearch service role."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="opensearch.yml.j2 template"',children:"{% set num_nodes = groups['opensearch'] | length %}\n{% set recover_after_nodes = (num_nodes * 2 / 3) | round(0, 'floor') | int if num_nodes > 1 else 1 %}\nplugins.security.disabled: \"true\"\n\nnode.name: \"{{ 'api' | kolla_address | put_address_in_context('url') }}\"\nnetwork.host: \"{{ 'api' | kolla_address | put_address_in_context('url') }}\"\n\ncluster.name: \"{{ opensearch_cluster_name }}\"\ncluster.initial_master_nodes: [{% for host in groups['opensearch'] %}\"{{ 'api' | kolla_address(host) }}\"{% if not loop.last %},{% endif %}{% endfor %}]\nnode.master: true\nnode.data: true\ndiscovery.seed_hosts: [{% for host in groups['opensearch'] %}\"{{ 'api' | kolla_address(host) | put_address_in_context('url') }}\"{% if not loop.last %},{% endif %}{% endfor %}]\n\nhttp.port: {{ opensearch_port }}\ngateway.expected_nodes: {{ num_nodes }}\ngateway.recover_after_time: \"5m\"\ngateway.recover_after_nodes: {{ recover_after_nodes }}\npath.data: \"/var/lib/opensearch/data\"\npath.logs: \"/var/log/kolla/opensearch\"\nindices.fielddata.cache.size: 40%\naction.auto_create_index: \"true\"\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"For OpenSearch, overlay files can additionally be stored in 3 places in the configuration repository."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/opensearch.yml"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/opensearch/opensearch.yml"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/opensearch/{{ inventory_hostname }}/opensearch.yml"})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["When merging files, the last file found has the most weight. If there is a parameter ",(0,s.jsx)(n.code,{children:"node.master: true"}),"\nin the service role template ",(0,s.jsx)(n.code,{children:"opensearch.yml.j2"})," of the OpenSearch service and you set e.g.\n",(0,s.jsx)(n.code,{children:"node.master: false"})," in ",(0,s.jsx)(n.code,{children:"environments/kolla/files/overlays/opensearch.yml"})," then accordingly in the finished ",(0,s.jsx)(n.code,{children:"opensearch.yml"}),"\n",(0,s.jsx)(n.code,{children:"node.master: false"})," is used."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["After the merge the task ",(0,s.jsx)(n.code,{children:"Copying over opensearch service config file"})," copies the content into the\nconfiguration directory ",(0,s.jsx)(n.code,{children:"/etc/kolla/opensearch"})," of the service."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",metastring:'title="/etc/kolla/opensearch/opensearch.yml"',children:"action.auto_create_index: 'true'\ncluster.initial_master_nodes:\n- 192.168.16.10\ncluster.name: kolla_logging\ndiscovery.seed_hosts:\n- 192.168.16.10\ngateway.expected_nodes: 1\ngateway.recover_after_nodes: 1\ngateway.recover_after_time: 5m\nhttp.port: 9200\nindices.fielddata.cache.size: 40%\nnetwork.host: 192.168.16.10\nnode.data: true\nnode.master: true\nnode.name: 192.168.16.10\npath.data: /var/lib/opensearch/data\npath.logs: /var/log/kolla/opensearch\nplugins.security.disabled: 'true'\n"})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["The configuration directory ",(0,s.jsx)(n.code,{children:"/etc/kolla/opensearch"})," is mounted in each container of the OpenSearch service\nto ",(0,s.jsx)(n.code,{children:"/var/lib/kolla/config_files"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title="Output of docker inspect opensearch"',children:'"Mounts": [\n    {\n        "Type": "bind",\n        // highlight-start\n        "Source": "/etc/kolla/opensearch",\n        "Destination": "/var/lib/kolla/config_files",\n        // highlight-end\n        "Mode": "rw",\n        "RW": true,\n        "Propagation": "rprivate"\n    },\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Entrypoint of a service is always ",(0,s.jsx)(n.a,{href:"https://github.com/openstack/kolla/blob/master/docker/base/start.sh",children:"kolla_start"}),".\nThis script calls a script ",(0,s.jsx)(n.a,{href:"https://github.com/openstack/kolla/blob/master/docker/base/set_configs.py",children:"set_configs.py"}),".\nThis script takes care of copying files from ",(0,s.jsx)(n.code,{children:"/var/lib/kolla/config_files"})," to the right place inside the container.\nFor this purpose, the container has a\n",(0,s.jsx)(n.a,{href:"https://github.com/openstack/kolla-ansible/blob/master/ansible/roles/opensearch/templates/opensearch.json.j2",children:"config.json"}),"\nin which the individual actions are configured."]}),"\n",(0,s.jsxs)(n.p,{children:["The file ",(0,s.jsx)(n.code,{children:"/var/lib/kolla/config_files/opensearch.yml"})," is copied to ",(0,s.jsx)(n.code,{children:"/etc/opensearch/opensearch.yml"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["The permissions of ",(0,s.jsx)(n.code,{children:"/var/lib/opensearch"})," and ",(0,s.jsx)(n.code,{children:"/var/log/kolla/opensearch"})," are set accordingly."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title="/etc/kolla/opensearch/config.json"',children:'{\n    "command": "/usr/share/opensearch/bin/opensearch",\n    "config_files": [\n        {\n            // highlight-start\n            "source": "/var/lib/kolla/config_files/opensearch.yml",\n            "dest": "/etc/opensearch/opensearch.yml",\n            "owner": "opensearch",\n            "perm": "0600"\n            // highlight-end\n        }\n    ],\n    "permissions": [\n        {\n            // highlight-start\n            "path": "/var/lib/opensearch",\n            "owner": "opensearch:opensearch",\n            "recurse": true\n            // highlight-end\n        },\n        {\n            // highlight-start\n            "path": "/var/log/kolla/opensearch",\n            "owner": "opensearch:opensearch",\n            "recurse": true\n            // highlight-end\n        }\n    ]\n}\n'})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["In the ",(0,s.jsx)(n.code,{children:"config.json"})," of the service is also defined the command which will be executed after finishing the preparations.\nIn the case of OpenSearch this is ",(0,s.jsx)(n.code,{children:"/usr/share/opensearch/bin/opensearch"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title="/etc/kolla/opensearch/config.json"',children:'{\n    // highlight-start\n    "command": "/usr/share/opensearch/bin/opensearch",\n    // highlight-end\n    "config_files": [\n        {\n            "source": "/var/lib/kolla/config_files/opensearch.yml",\n            "dest": "/etc/opensearch/opensearch.yml",\n            "owner": "opensearch",\n            "perm": "0600"\n        }\n    ],\n    "permissions": [\n        {\n            "path": "/var/lib/opensearch",\n            "owner": "opensearch:opensearch",\n            "recurse": true\n        },\n        {\n            "path": "/var/log/kolla/opensearch",\n            "owner": "opensearch:opensearch",\n            "recurse": true\n        }\n    ]\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"number-of-service-workers",children:"Number of service workers"}),"\n",(0,s.jsx)(n.p,{children:"The number of workers used for the individual services can generally be configured using two parameters."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:'openstack_service_workers: "{{ [ansible_facts.processor_vcpus, 5] | min }}"\nopenstack_service_rpc_workers: "{{ [ansible_facts.processor_vcpus, 3] | min }}\u201c\n'})}),"\n",(0,s.jsxs)(n.p,{children:["The default for ",(0,s.jsx)(n.code,{children:"openstack_service_workers"})," is set to ",(0,s.jsx)(n.code,{children:"5"})," when using the cookiecutter for the initial creation\nof the configuration."]}),"\n",(0,s.jsxs)(n.p,{children:["This value can be overwritten for individual services. The default for all parameters in the following table is\n",(0,s.jsx)(n.code,{children:"{{ openstack_service_workers }}"}),". The parameter ",(0,s.jsx)(n.code,{children:"aodh_api_workers"})," can then be used to explicitly set the\nnumber of workers for the AODH API, for example. A reconfigure must be made for the particular services in the\ncase of a change. ",(0,s.jsx)(n.code,{children:"osism apply -a reconfigure aodh"})," in this example."]}),"\n",(0,s.jsxs)(n.p,{children:["These parameters are all set in ",(0,s.jsx)(n.code,{children:"environments/kolla/configuration.yml"}),"."]}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.th,{style:{textAlign:"left"},children:"Parameter"})})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"aodh_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"barbican_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"cinder_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"designate_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"designate_worker_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"designate_producer_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"designate_central_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"designate_sink_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"designate_mdns_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"glance_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"gnocchi_metricd_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"gnocchi_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"heat_api_cfn_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"heat_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"heat_engine_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"horizon_wsgi_processes"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"ironic_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"keystone_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"proxysql_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"magnum_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"magnum_conductor_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"manila_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"neutron_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"neutron_metadata_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"nova_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"nova_superconductor_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"nova_metadata_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"nova_scheduler_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"nova_cell_conductor_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"octavia_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"octavia_healthmanager_health_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"octavia_healthmanager_stats_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"placement_api_workers"})}),(0,s.jsx)(n.tr,{children:(0,s.jsx)(n.td,{style:{textAlign:"left"},children:"skyline_gunicorn_workers"})})]})]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>l});var s=t(7294);const i={},r=s.createContext(i);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);