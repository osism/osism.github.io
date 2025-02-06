"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2490],{7826:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"release-notes/osism-8","title":"OSISM 8","description":"Instructions for the upgrade can be found in the Upgrade Guide.","source":"@site/docs/release-notes/osism-8.md","sourceDirName":"release-notes","slug":"/release-notes/osism-8","permalink":"/de/docs/release-notes/osism-8","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/release-notes/osism-8.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"OSISM 8"},"sidebar":"tutorialSidebar","previous":{"title":"OSISM 7","permalink":"/de/docs/release-notes/osism-7"},"next":{"title":"Appendix","permalink":"/de/docs/appendix/"}}');var i=n(4848),t=n(8453);const l={sidebar_label:"OSISM 8"},o="OSISM 8",c={},a=[{value:"Next",id:"next",level:2},{value:"8.1.0 (20250116)",id:"810-20250116",level:2},{value:"8.0.2 (20241006)",id:"802-20241006",level:2},{value:"8.0.1 (20240924)",id:"801-20240924",level:2},{value:"8.0.0 (20240911)",id:"800-20240911",level:2},{value:"Upgrade notes",id:"upgrade-notes",level:3},{value:"Other &amp; References",id:"other--references",level:3}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.header,{children:(0,i.jsx)(s.h1,{id:"osism-8",children:"OSISM 8"})}),"\n",(0,i.jsxs)(s.p,{children:["Instructions for the upgrade can be found in the ",(0,i.jsx)(s.a,{href:"../guides/upgrade-guide/manager",children:"Upgrade Guide"}),"."]}),"\n",(0,i.jsx)(s.p,{children:"The release notes build on each other. When upgrading from 7.0.1 to 8.0.0, you should\ntherefore not only read and take into account the release notes for 8.0.0 but also the\nprevious release notes. The same applies to an update from, for example, 8.0.0 to 8.0.2.\nThe release notes for 8.0.1 must then also be taken into account."}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Release"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Release Date"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"#810-20250116",children:"8.1.0"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:"16. January 2025"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"#802-20241006",children:"8.0.2"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:"6. October 2024"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"#801-20240924",children:"8.0.1"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:"24. September 2024"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"#800-20240911",children:"8.0.0"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:"11. September 2024"})]})]})]}),"\n",(0,i.jsx)(s.h2,{id:"next",children:"Next"}),"\n",(0,i.jsx)(s.p,{children:"Release date: ???"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"osism.services.virtualbmc"})," role was removed. Tenks, a virtual bare metal cluster management,\nwill be used in the future. The related virtualbmc container images was also removed."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Ansible 11 is supported by all OSISM collections and will be used from now on."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["New ",(0,i.jsx)(s.code,{children:"osism.services.dnsmasq"})," role was added."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["New ",(0,i.jsx)(s.code,{children:"osism.services.httpd"})," role was added."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"810-20250116",children:"8.1.0 (20250116)"}),"\n",(0,i.jsx)(s.p,{children:"Release date: 17. January 2025"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The Ceph service images have not been rebuilt. No upgrade of Ceph is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"All OpenStack service images have been rebuilt. An upgrade of OpenStack\nservices is recommended."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The service images for Kuryr and Zun will be not longer included in the next stable release."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The infrastructure service images (MariaDB, RabbitMQ, ..) have been rebuilt. An upgrade is recommended."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The network service images (OVN, OVS) have been rebuilt. An upgrade is recommended."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The monitoring service images (Prometheus & all Prometheus exporters) have been rebuilt. An upgrade is recommended."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The logging service images (OpenSearch, Fluentd) have been rebuilt. An upgrade is recommended."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"osism.commons.clevis"})," role was removed."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"osism.services.tang"})," role was removed."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"osism.services.metering"})," role was removed."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["New ",(0,i.jsx)(s.code,{children:"osism.services.wazuh_agent"})," role was added."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["New ",(0,i.jsx)(s.code,{children:"osism.services.sshd"})," role was added."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["New ",(0,i.jsx)(s.code,{children:"osism.services.teleport"})," role was added."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"802-20241006",children:"8.0.2 (20241006)"}),"\n",(0,i.jsx)(s.p,{children:"Release date: 6. October 2024"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The Ceph service images have not been rebuilt. No upgrade of Ceph is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The OpenStack service images for Ironic have been rebuilt.\nUpgrades of the Ironic service is recommended."}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["The Ironic have been rebuilt because of a critical security\nissues. Further details can be found in security advisory\n",(0,i.jsx)(s.a,{href:"https://security.openstack.org/ossa/OSSA-2024-004.html",children:"OSSA-2024-004: Ironic fails to verify checksums of supplied image_source URLs when configured to convert images to raw for streaming"}),".\nThis upgrade is important."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"Other OpenStack service images have not been rebuilt. No upgrade of other OpenStack\nservices is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The infrastructure service images (MariaDB, RabbitMQ, ..) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The network service images (OVN, OVS) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The monitoring service images (Prometheus & all Prometheus exporters) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The logging service images (OpenSearch, Fluentd) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The generic inventory group is now used as the default for the FRR service."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"In the inventory reconciler, the handling of inventory groups from the configuration repoistory\nand the Netbox has been improved. Groups that exist both in the configuration repository and in\nthe Netbox are now merged and do not overwrite each other."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["With the ",(0,i.jsx)(s.code,{children:"proxy_enable"})," parameter of ",(0,i.jsx)(s.code,{children:"osism.commons.proxy"})," it is possible to disable the proxy\nconfiguration. This makes it easier to configure global proxy parameters\n(via environment or group_vars) and to skip them via host_vars only for\nspecific hosts."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"osism.commons.repository"})," role now supports the newer DEB822 format and is now also\nusuable on Ubuntu 24.04 based ARM nodes."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["With the ",(0,i.jsx)(s.code,{children:"nexus_force_init"})," parameter of ",(0,i.jsx)(s.code,{children:"osism.services.nexus"})," it is possible to force the\ninitialisation of the Nexus service."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["A temporary workaround for the installation of python3-docker on Ubuntu 24.04 has been added\nto ",(0,i.jsx)(s.code,{children:"osism.services.docker"}),". This will be removed later."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["With the ",(0,i.jsx)(s.code,{children:"docker_storage_containerd_snapshotter"})," parameter of ",(0,i.jsx)(s.code,{children:"osism.services.docker"})," it is\npossible to enable the ",(0,i.jsx)(s.a,{href:"https://docs.docker.com/engine/storage/containerd/",children:"experimental container-snapshotter feature"}),".\nOnly use this on new nodes."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["With the ",(0,i.jsx)(s.code,{children:"frr_enable_bfdd"})," parameter of ",(0,i.jsx)(s.code,{children:"osism.services.frr"})," it is possible to enable the BFD\ndaemon."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["All ",(0,i.jsx)(s.code,{children:"frr_uplinks__*"})," parameters will now be merged with the ",(0,i.jsx)(s.code,{children:"frr_uplinks"}),"\nparameter of ",(0,i.jsx)(s.code,{children:"osism.services.frr"}),". This way it is possible to add host specific ",(0,i.jsx)(s.code,{children:"frr_uplinks"})," via\nthe host vars."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The integration of the ",(0,i.jsx)(s.a,{href:"https://github.com/osism/openstack-resource-manager",children:"OpenStack Resource Manager"}),"\nwas started in the OSISM CLI."]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute list"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute list HOSTNAME"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage server list"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage volume list"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute evacuate HOSTNAME"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute disable HOSTNAME"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute enable HOSTNAME"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute start HOSTNAME"})}),"\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.code,{children:"osism manage compute stop HOSTNAME"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"801-20240924",children:"8.0.1 (20240924)"}),"\n",(0,i.jsx)(s.p,{children:"Release date: 24. September 2024"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The Ceph service images have not been rebuilt. No upgrade of Ceph is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The OpenStack service images have not been rebuilt. No upgrade of OpenStack is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The infrastructure service images (MariaDB, RabbitMQ, ..) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The network service images (OVN, OVS) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The monitoring service images (Prometheus & all Prometheus exporters) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The logging service images (OpenSearch, Fluentd) have not been rebuilt. No upgrade is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The Prometheus OpenStack Exporter is no longer enabled by default as there have been frequent\nOOM problems and the exporter generates a very high load on the OpenStack APIs. If the exporter\nis still to be used, the ",(0,i.jsx)(s.code,{children:"enable_prometheus_openstack_exporter"})," parameter can be used for this."]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",metastring:'title="environments/kolla/configuration.yml"',children:'enable_prometheus_openstack_exporter: "yes"\n'})}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"An error when upgrading the Postres database of the Netbox service has been fixed. Upgrades\nof the Postgres database are now done automatically."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The Scaphandre service now accesses the host PIDs by default in order to better assign the\nconsumption data to the running processes. If this is not wanted, it can be switched off using\nthe ",(0,i.jsx)(s.code,{children:"scaphandre_share_pids_with_host"})," parameter."]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",metastring:'title="environments/configuration.yml"',children:"scaphandre_share_pids_with_host: false\n"})}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Both Ceph play (",(0,i.jsx)(s.code,{children:"osism apply ceph"}),")  and the validation of Ceph OSD services\n(",(0,i.jsx)(s.code,{children:"osism validate ceph-osds"}),") have been fixed for non-HCI environments."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Inventory groups in ",(0,i.jsx)(s.code,{children:"inventory/20-roles"})," now also overwrite groups in all other files\n(with exception of ",(0,i.jsx)(s.code,{children:"inventory/99-ovewrite"}),"). The same applies to groups that are set\nvia labels in Netbox. This makes it possible, for example, to define the load balancers\nvia the ",(0,i.jsx)(s.code,{children:"loadbalancer"})," group directly via ",(0,i.jsx)(s.code,{children:"inventory/20-roles"})," or a Netbox label."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"800-20240911",children:"8.0.0 (20240911)"}),"\n",(0,i.jsx)(s.p,{children:"Release date: 11. September 2024"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"In this release, OpenStack has been upgraded from OpenStack 2023.2 (Bobcat) to OpenStack\n2024.1 (Caracal). All OpenStack images and images of the associated infrastructure services\n(MariaDB, RabbitMQ, ..) have been rebuilt. These must be upgraded as required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"The Ceph service images have not been rebuilt. No upgrade of Ceph is required."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsx)(s.p,{children:"New manager features."}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The configuration is now synchronised with ",(0,i.jsx)(s.code,{children:"osism sync configuration"}),".\nThe ",(0,i.jsx)(s.code,{children:"osism configuration sync"})," command will be removed in the future."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The inventory is now synchronised with ",(0,i.jsx)(s.code,{children:"osism sync inventory"}),".\nThe ",(0,i.jsx)(s.code,{children:"osism reconciler sync"})," command will be removed in the future."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Netbox is now synchronised with ",(0,i.jsx)(s.code,{children:"osism sync netbox"}),".\nThe ",(0,i.jsx)(s.code,{children:"osism netbox sync"})," command will be removed in the future."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["Ironic is now synchronised with ",(0,i.jsx)(s.code,{children:"osism sync ironic"}),".\nThe ",(0,i.jsx)(s.code,{children:"osism netbox sync ironic"})," command will be removed in the future."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"upgrade-notes",children:"Upgrade notes"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The following secrets must be added in ",(0,i.jsx)(s.code,{children:"environments/kolla/secrets.yml"}),":"]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:"prometheus_skyline_password:  # generate with: pwgen 32 1\n"})}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"designate-sink"})," service of OpenStack Designate is now disabled by default.\nThe following must be added in ",(0,i.jsx)(s.code,{children:"environments/kolla/configuration.yml"})," to keep\nthe ",(0,i.jsx)(s.code,{children:"designate-sink"})," service enabled."]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:'designate_enable_notifications_sink: "yes"\n'})}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:["The file containing the custom local settings of Horizon has been renamed from\n",(0,i.jsx)(s.code,{children:"custom_local_settings"})," to ",(0,i.jsx)(s.code,{children:"_9999-custom-settings.py"}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"other--references",children:"Other & References"}),"\n",(0,i.jsxs)(s.p,{children:["OpenStack 2024.1 press announcement: ",(0,i.jsx)(s.a,{href:"https://www.openstack.org/software/openstack-caracal",children:"https://www.openstack.org/software/openstack-caracal"})]}),"\n",(0,i.jsxs)(s.p,{children:["OpenStack 2024.1 release notes: ",(0,i.jsx)(s.a,{href:"https://releases.openstack.org/caracal/index.html",children:"https://releases.openstack.org/caracal/index.html"})]}),"\n",(0,i.jsx)(s.p,{children:"Release notes for each OpenStack service:"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["Barbican: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/barbican/2024.1.html",children:"https://docs.openstack.org/releasenotes/barbican/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Ceilometer: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/ceilometer/2024.1.html",children:"https://docs.openstack.org/releasenotes/ceilometer/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Cinder: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/cinder/2024.1.html",children:"https://docs.openstack.org/releasenotes/cinder/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Designate: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/designate/2024.1.html",children:"https://docs.openstack.org/releasenotes/designate/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Glance: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/glance/2024.1.html",children:"https://docs.openstack.org/releasenotes/glance/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Heat: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/heat/2024.1.html",children:"https://docs.openstack.org/releasenotes/heat/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Horizon: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/horizon/2024.1.html",children:"https://docs.openstack.org/releasenotes/horizon/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Ironic: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/ironic/2024.1.html",children:"https://docs.openstack.org/releasenotes/ironic/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Keystone: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/keystone/2024.1.html",children:"https://docs.openstack.org/releasenotes/keystone/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Manila: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/manila/2024.1.html",children:"https://docs.openstack.org/releasenotes/manila/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Neutron: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/neutron/2024.1.html",children:"https://docs.openstack.org/releasenotes/neutron/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Nova: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/nova/2024.1.html",children:"https://docs.openstack.org/releasenotes/nova/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Octavia: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/octavia/2024.1.html",children:"https://docs.openstack.org/releasenotes/octavia/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Placement: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/placement/2024.1.html",children:"https://docs.openstack.org/releasenotes/placement/2024.1.html"})]}),"\n",(0,i.jsxs)(s.li,{children:["Skyline: ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/skyline-apiserver/2024.1.html",children:"https://docs.openstack.org/releasenotes/skyline-apiserver/2024.1.html"}),", ",(0,i.jsx)(s.a,{href:"https://docs.openstack.org/releasenotes/skyline-console/2024.1.html",children:"https://docs.openstack.org/releasenotes/skyline-console/2024.1.html"})]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>o});var r=n(6540);const i={},t=r.createContext(i);function l(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);