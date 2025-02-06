"use strict";(self.webpackChunkosism=self.webpackChunkosism||[]).push([[2704],{1097:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"guides/configuration-guide/ceph/rook","title":"Configuration for Rook","description":"The official Ceph documentation is located on https://docs.ceph.com/en/latest/rados/configuration/","source":"@site/docs/guides/configuration-guide/ceph/rook.md","sourceDirName":"guides/configuration-guide/ceph","slug":"/guides/configuration-guide/ceph/rook","permalink":"/docs/guides/configuration-guide/ceph/rook","draft":false,"unlisted":false,"editUrl":"https://github.com/osism/osism.github.io/tree/main/docs/guides/configuration-guide/ceph/rook.md","tags":[],"version":"current","sidebarPosition":31,"frontMatter":{"sidebar_label":"Configuration for Rook","sidebar_position":31},"sidebar":"tutorialSidebar","previous":{"title":"Ceph","permalink":"/docs/guides/configuration-guide/ceph/"},"next":{"title":"OpenStack","permalink":"/docs/guides/configuration-guide/openstack/"}}');var r=n(4848),t=n(8453);const i={sidebar_label:"Configuration for Rook",sidebar_position:31},a="Configuration for Rook",l={},c=[{value:"Unique Identifier",id:"unique-identifier",level:2},{value:"Client",id:"client",level:2},{value:"Network configuration",id:"network-configuration",level:2},{value:"Configuring <code>addressRanges</code>",id:"configuring-addressranges",level:3},{value:"Configuring encryption, compression, msgr2",id:"configuring-encryption-compression-msgr2",level:3},{value:"Flexible approach using <code>rook_network</code>",id:"flexible-approach-using-rook_network",level:3},{value:"RGW service - CephObjectStore CRD",id:"rgw-service---cephobjectstore-crd",level:2},{value:"Cephfs - CephFilesystem CRD",id:"cephfs---cephfilesystem-crd",level:2},{value:"Extra pools - CephBlockPool CRD",id:"extra-pools---cephblockpool-crd",level:2},{value:"Storage configuration",id:"storage-configuration",level:2},{value:"Deploy OSDs on all nodes and found devices",id:"deploy-osds-on-all-nodes-and-found-devices",level:3},{value:"Deploy OSDs on specific nodes and devices based on a device filter",id:"deploy-osds-on-specific-nodes-and-devices-based-on-a-device-filter",level:3},{value:"Deploy OSDs on specific nodes and devices based on device names",id:"deploy-osds-on-specific-nodes-and-devices-based-on-device-names",level:3},{value:"Flexible approach using <code>rook_storage</code>",id:"flexible-approach-using-rook_storage",level:3},{value:"Encrypted OSDs",id:"encrypted-osds",level:3},{value:"Dashboard",id:"dashboard",level:2},{value:"Enable dashboard and configure ssl and ports",id:"enable-dashboard-and-configure-ssl-and-ports",level:3},{value:"Rook Cluster Name",id:"rook-cluster-name",level:2},{value:"Kubernetes Namespaces",id:"kubernetes-namespaces",level:2},{value:"Number and Placement of Ceph Daemons",id:"number-and-placement-of-ceph-daemons",level:2},{value:"Crash Collector",id:"crash-collector",level:2},{value:"Log Collector",id:"log-collector",level:2},{value:"Ceph Config",id:"ceph-config",level:2},{value:"Second Ceph cluster",id:"second-ceph-cluster",level:2},{value:"Helm Value File",id:"helm-value-file",level:2}];function d(e){const o={a:"a",admonition:"admonition",code:"code",del:"del",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.header,{children:(0,r.jsx)(o.h1,{id:"configuration-for-rook",children:"Configuration for Rook"})}),"\n",(0,r.jsxs)(o.p,{children:["The official Ceph documentation is located on ",(0,r.jsx)(o.a,{href:"https://docs.ceph.com/en/latest/rados/configuration/",children:"https://docs.ceph.com/en/latest/rados/configuration/"})]}),"\n",(0,r.jsxs)(o.p,{children:["It is ",(0,r.jsx)(o.strong,{children:"strongly advised"})," to use the documentation for the version being used."]}),"\n",(0,r.jsxs)(o.ul,{children:["\n",(0,r.jsxs)(o.li,{children:["Quincy - ",(0,r.jsx)(o.a,{href:"https://docs.ceph.com/en/quincy/rados/configuration/",children:"https://docs.ceph.com/en/quincy/rados/configuration/"})]}),"\n",(0,r.jsxs)(o.li,{children:["Reef - ",(0,r.jsx)(o.a,{href:"https://docs.ceph.com/en/reef/rados/configuration/",children:"https://docs.ceph.com/en/reef/rados/configuration/"})]}),"\n"]}),"\n",(0,r.jsx)(o.h2,{id:"unique-identifier",children:"Unique Identifier"}),"\n",(0,r.jsx)(o.p,{children:"The File System ID is a unique identifier for the cluster."}),"\n",(0,r.jsxs)(o.p,{children:[(0,r.jsxs)(o.del,{children:["The identifier is set via the parameter ",(0,r.jsx)(o.code,{children:"fsid"})," in ",(0,r.jsx)(o.code,{children:"environments/rook/configuration.yml"})]}),"\n",(0,r.jsxs)(o.del,{children:["and must be unique. It can be generated with ",(0,r.jsx)(o.code,{children:"uuidgen"}),"."]})]}),"\n",(0,r.jsxs)(o.p,{children:["It is generated automatically by the ",(0,r.jsx)(o.a,{href:"/docs/guides/deploy-guide/services/ceph/rook",children:"Rook Deployment"}),"."]}),"\n",(0,r.jsxs)(o.p,{children:["TODO: To evaluate if we want and can pass a ",(0,r.jsx)(o.code,{children:"fsid"}),". This is no out-of-the-box Rook feature, though."]}),"\n",(0,r.jsx)(o.h2,{id:"client",children:"Client"}),"\n",(0,r.jsx)(o.p,{children:(0,r.jsxs)(o.del,{children:["The ",(0,r.jsx)(o.code,{children:"client.admin"})," keyring is placed in the file ",(0,r.jsx)(o.code,{children:"environments/infrastructure/files/ceph/ceph.client.admin.keyring"}),"."]})}),"\n",(0,r.jsx)(o.p,{children:"There is no real Ceph client installed on the manager node, but a wrapper to enter the Rook Toolbox can be installed."}),"\n",(0,r.jsx)(o.p,{children:"If the namespace of the rook cluster was changed this needs to be reflected as well as the install type of the client."}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/infrastructure/configuration.yml"',children:"cephclient_install_type: rook\n\ncephclient_rook_namespace: rook-ceph\n"})}),"\n",(0,r.jsx)(o.p,{children:"After successfully configuring the environment for the client, run the installation:"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-bash",children:"osism apply cephclient\n"})}),"\n",(0,r.jsxs)(o.p,{children:["This will try to detect a prior installation of a Ceph client with the install type ",(0,r.jsx)(o.code,{children:"container"})," or ",(0,r.jsx)(o.code,{children:"package"})," and cleanup that previous installation."]}),"\n",(0,r.jsx)(o.h2,{id:"network-configuration",children:"Network configuration"}),"\n",(0,r.jsxs)(o.p,{children:["Some useful ansible variables for the options from the ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/?h=#network-configuration-settings",children:"Rook Network Configuration Settings"})," are available.\nIf you want complete flexibility, you can also use the ",(0,r.jsx)(o.code,{children:"rook_network"})," variable which abstracts all settings from ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest/CRDs/Cluster/ceph-cluster-crd/#network-configuration-settings",children:"Rook Network Configuration Settings"}),"."]}),"\n",(0,r.jsxs)(o.h3,{id:"configuring-addressranges",children:["Configuring ",(0,r.jsx)(o.code,{children:"addressRanges"})]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_network_public: "192.168.16.0/24"\nrook_network_cluster: "192.168.17.0/24"\n'})}),"\n",(0,r.jsx)(o.h3,{id:"configuring-encryption-compression-msgr2",children:"Configuring encryption, compression, msgr2"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_network_encryption: true\nrook_network_compression: true\nrook_network_require_msgr2: false\n"})}),"\n",(0,r.jsxs)(o.h3,{id:"flexible-approach-using-rook_network",children:["Flexible approach using ",(0,r.jsx)(o.code,{children:"rook_network"})]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_network_encryption: true\nrook_network_compression: true\nrook_network_require_msgr2: false\nrook_network_public: "192.168.16.0/20"\nrook_network_cluster: "{{ rook_network_public }}"\nrook_network:\n  connections:\n    # Whether to encrypt the data in transit across the wire to prevent eavesdropping the data on the network.\n    # The default is false. When encryption is enabled, all communication between clients and Ceph daemons, or between Ceph daemons will be encrypted.\n    # When encryption is not enabled, clients still establish a strong initial authentication and data integrity is still validated with a crc check.\n    # IMPORTANT: Encryption requires the 5.11 kernel for the latest nbd and cephfs drivers. Alternatively for testing only,\n    # you can set the "mounter: rbd-nbd" in the rbd storage class, or "mounter: fuse" in the cephfs storage class.\n    # The nbd and fuse drivers are *not* recommended in production since restarting the csi driver pod will disconnect the volumes.\n    encryption:\n      enabled: "{{ rook_network_encryption }}"\n    # Whether to compress the data in transit across the wire. The default is false.\n    # Requires Ceph Quincy (v17) or newer. Also see the kernel requirements above for encryption.\n    compression:\n      enabled: "{{ rook_network_compression }}"\n    # Whether to require communication over msgr2. If true, the msgr v1 port (6789) will be disabled\n    # and clients will be required to connect to the Ceph cluster with the v2 port (3300).\n    # Requires a kernel that supports msgr v2 (kernel 5.11 or CentOS 8.4 or newer).\n    requireMsgr2: "{{ rook_network_require_msgr2 }}"\n  # enable host networking\n  provider: host\n  addressRanges:\n    public:\n      - "{{ rook_network_public }}"\n    cluster:\n      - "{{ rook_network_cluster }}"\n'})}),"\n",(0,r.jsx)(o.h2,{id:"rgw-service---cephobjectstore-crd",children:"RGW service - CephObjectStore CRD"}),"\n",(0,r.jsx)(o.admonition,{type:"info",children:(0,r.jsxs)(o.p,{children:["OpenStack integration between Keystone/Swift and Rook is currently missing upstream in Rook. Please have a look at ",(0,r.jsx)(o.a,{href:"https://github.com/orgs/SovereignCloudStack/projects/18/views/1?layout=board&pane=issue&itemId=63889060",children:"#1027"})," to get the current status of the integration in OSISM."]})}),"\n",(0,r.jsxs)(o.p,{children:["Have a look at ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest/CRDs/Object-Storage/ceph-object-store-crd/",children:"CephObjectStore CRD Spec"})," for details on how to configure the RGW service."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_cephobjectstore_default_name: rgw\nrook_cephobjectstore_replicated_default_size: 3\nrook_cephobjectstore_erasurecoded_default_datachunks: 2\nrook_cephobjectstore_erasurecoded_default_codingchunks: 1\nrook_cephobjectstore_failuredomain: host\nrook_cephobjectstore_default_port: 8081\nrook_cephobjectstore_preservepoolsondelete: true\nrook_cephobjectstore_keystone_acceptedRoles: []\n  # - admin\n  # - member\nrook_cephobjectstore_keystone_implicitTenants: ""\nrook_cephobjectstore_keystone_revocationInterval: 1200\nrook_cephobjectstore_keystone_tokenCacheSize: 1000\nrook_cephobjectstore_keystone_url: ""\nrook_cephobjectstore_swift_accountInUrl: true\nrook_cephobjectstore_swift_urlPrefix: ""\nrook_cephobjectstore_swift_versioningEnabled: true\nrook_cephobjectstore_s3_authKeystone: true\nrook_cephobjectstore_s3_enable: true\n# name of the secret that provides admin user credentials needs to be in same namespace\nrook_cephobjectstore_keystone_serviceUserSecretName: ceph-rgw-usersecret\n# the following settings belong to the usersecret\nrook_cephobjectstore_keystone_auth_type: ""\nrook_cephobjectstore_keystone_identity_api_version: 3\nrook_cephobjectstore_keystone_password: ""\nrook_cephobjectstore_keystone_project_domain_name: "Default"\nrook_cephobjectstore_keystone_project_name: ""\nrook_cephobjectstore_keystone_user_domain_name: "Default"\nrook_cephobjectstore_keystone_username: ""\nrook_cephobjectstores:\n  - name: "{{ rook_cephobjectstore_default_name }}"\n    spec:\n      metadataPool:\n        failureDomain: "{{ rook_cephobjectstore_failuredomain }}"\n        replicated:\n          size: "{{ rook_cephobjectstore_replicated_default_size }}"\n        # erasureCoded:\n        #   dataChunks: "{{ rook_cephobjectstore_erasurecoded_default_datachunks }}"\n        #   codingChunks: "{{ rook_cephobjectstore_erasurecoded_default_codingchunks }}"\n      dataPool:\n        failureDomain: "{{ rook_cephobjectstore_failuredomain }}"\n        replicated:\n          size: "{{ rook_cephobjectstore_replicated_default_size }}"\n        # erasureCoded:\n        #   dataChunks: "{{ rook_cephobjectstore_erasurecoded_default_datachunks }}"\n        #   codingChunks: "{{ rook_cephobjectstore_erasurecoded_default_codingchunks }}"\n      preservePoolsOnDelete: "{{ rook_cephobjectstore_preservepoolsondelete }}"\n      gateway:\n        port: "{{ rook_cephobjectstore_default_port }}"\n        resources: "{{ rook_resources_cephobjecstore }}"\n        # securePort: 443\n        # sslCertificateRef:\n        instances: 1\n        priorityClassName: system-cluster-critical\n        placement: "{{ rook_placement_cephobjectstore }}"\n        annotations: "{{ rook_annotations_cephobjecstore }}"\n      auth:\n        keystone:\n          acceptedRoles: "{{ rook_cephobjectstore_keystone_acceptedRoles }}"\n          implicitTenants: "{{ rook_cephobjectstore_keystone_implicitTenants }}"\n          revocationInterval: "{{ rook_cephobjectstore_keystone_revocationInterval }}"\n          serviceUserSecretName: "{{ rook_cephobjectstore_keystone_serviceUserSecretName }}"\n          tokenCacheSize: "{{ rook_cephobjectstore_keystone_tokenCacheSize }}"\n          url: "{{ rook_cephobjectstore_keystone_url }}"\n        protocols:\n          swift:\n            accountInUrl: "{{ rook_cephobjectstore_swift_accountInUrl }}"\n            urlPrefix: "{{ rook_cephobjectstore_swift_urlPrefix }}"\n            versioningEnabled: "{{ rook_cephobjectstore_swift_versioningEnabled }}"\n          s3:\n            authKeystone: "{{ rook_cephobjectstore_s3_authKeystone }}"\n            enable: "{{ rook_cephobjectstore_s3_enable }}"\n    storageClass:\n      enabled: false\n'})}),"\n",(0,r.jsx)(o.h2,{id:"cephfs---cephfilesystem-crd",children:"Cephfs - CephFilesystem CRD"}),"\n",(0,r.jsxs)(o.p,{children:["Have a look at ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest/CRDs/Shared-Filesystem/ceph-filesystem-crd/",children:"CephFilesystem CRD Spec"})," for details on how to configure Cephfs."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_cephfilesystem_default_name: cephfs\nrook_cephfilesystem_replicated_default_size: 3\nrook_cephfilesystem_erasurecoded_default_datachunks: 2\nrook_cephfilesystem_erasurecoded_default_codingchunks: 1\nrook_cephfilesystem_default_metadatapool_parameters_compression_mode: none\nrook_cephfilesystem_default_datapool_parameters_compression_mode: none\nrook_cephfilesystems:\n  - name: "{{ rook_cephfilesystem_default_name }}"\n    spec:\n      metadataPool:\n        failureDomain: host\n        # The metadata pool spec must use replication.\n        replicated:\n          size: "{{ rook_cephfilesystem_replicated_default_size }}"\n          requireSafeReplicaSize: true\n        parameters:\n          compression_mode: "{{ rook_cephfilesystem_default_datapool_parameters_compression_mode }}"\n          # target_size_ratio: ".5"\n      dataPools:\n        - failureDomain: host\n          # The data pool spec can use replication or erasure coding.\n          replicated:\n            size: "{{ rook_cephfilesystem_replicated_default_size }}"\n            requireSafeReplicaSize: true\n          # erasureCoded:\n          #   dataChunks: "{{ rook_cephfilesystem_erasurecoded_default_datachunks }}"\n          #   codingChunks: "{{ rook_cephfilesystem_erasurecoded_default_codingchunks }}"\n          name: data0\n          parameters:\n            compression_mode: "{{ rook_cephfilesystem_default_datapool_parameters_compression_mode }}"\n            # target_size_ratio: ".5"\n      metadataServer:\n        activeCount: "{{ rook_mds_count }}"\n        activeStandby: true\n        resources: "{{ rook_resources_cephfilesystem }}"\n        priorityClassName: system-cluster-critical"\n        placement: "{{ rook_placement_cephfilesystem }}"\n        annotations: "{{ rook_annotations_cephfilesystem }}"\n    storageClass:\n      enabled: false\n'})}),"\n",(0,r.jsx)(o.h2,{id:"extra-pools---cephblockpool-crd",children:"Extra pools - CephBlockPool CRD"}),"\n",(0,r.jsxs)(o.p,{children:["Extra pools can be defined via the ",(0,r.jsx)(o.code,{children:"rook_cephblockpools"})," parameter. Be sure to also include the default pools.\nThey will use the default values from the ",(0,r.jsx)(o.code,{children:"rook_cephblockpool_*"})," variables."]}),"\n",(0,r.jsxs)(o.p,{children:["Have a look at ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Block-Storage/ceph-block-pool-crd/#spec",children:"CephBlockPool CRD Spec"})," for details."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_cephblockpool_replicated_default_size: 3\nrook_cephblockpool_erasurecoded_default_datachunks: 2\nrook_cephblockpool_erasurecoded_default_codingchunks: 1\nrook_cephblockpool_default_min_size: "0"\nrook_cephblockpool_default_pg_num: "128"\nrook_cephblockpools:\n  # default pools\n  - name: backups\n    spec:\n      failureDomain: host\n      replicated:\n        size: "{{ rook_cephblockpool_replicated_default_size }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n  - name: volumes\n    spec:\n      failureDomain: host\n      replicated:\n        size: "{{ rook_cephblockpool_replicated_default_size }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n  - name: images\n    spec:\n      failureDomain: host\n      replicated:\n        size: "{{ rook_cephblockpool_replicated_default_size }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n  - name: metrics\n    spec:\n      failureDomain: host\n      replicated:\n        size: "{{ rook_cephblockpool_replicated_default_size }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n  - name: vms\n    spec:\n      failureDomain: host\n      replicated:\n        size: "{{ rook_cephblockpool_replicated_default_size }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n  # extra pools\n  - name: extra1\n    spec:\n      failureDomain: host\n      replicated:\n        size: "{{ rook_cephblockpool_replicated_default_size }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n  - name: extra2\n    spec:\n      failureDomain: host\n      erasureCoded:\n        dataChunks: "{{ rook_cephblockpool_erasurecoded_default_datachunks }}"\n        codingChunks: "{{ rook_cephblockpool_erasurecoded_default_codingchunks }}"\n      parameters:\n        min_size: "{{ rook_cephblockpool_default_min_size }}"\n        pg_num: "{{ rook_cephblockpool_default_pg_num }}"\n        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"\n    storageClass:\n      enabled: false\n'})}),"\n",(0,r.jsx)(o.h2,{id:"storage-configuration",children:"Storage configuration"}),"\n",(0,r.jsx)(o.admonition,{type:"info",children:(0,r.jsx)(o.p,{children:"In the default setup, no OSD will be deployed (better safe than sorry approach)."})}),"\n",(0,r.jsxs)(o.p,{children:["You have to pass a storage configuration via ",(0,r.jsx)(o.code,{children:"environments/rook/configuration.yml"}),"."]}),"\n",(0,r.jsxs)(o.p,{children:["Some useful ansible variables for the options from the ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#storage-selection-settings",children:"Rook Storage Selection Settings"})," are available.\nIf you want complete flexibility, you can also use the ",(0,r.jsx)(o.code,{children:"rook_storage"})," variable which abstracts all settings from ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#storage-selection-settings",children:"Rook Storage Selection Settings"}),"."]}),"\n",(0,r.jsx)(o.h3,{id:"deploy-osds-on-all-nodes-and-found-devices",children:"Deploy OSDs on all nodes and found devices"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_storage_useallnodes: true\nrook_storage_usealldevices: true\n"})}),"\n",(0,r.jsx)(o.h3,{id:"deploy-osds-on-specific-nodes-and-devices-based-on-a-device-filter",children:"Deploy OSDs on specific nodes and devices based on a device filter"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_storage_useallnodes: false\nrook_storage_usealldevices: false\nrook_storage_devicefilter: "^sd[b-c]"\nrook_storage_nodes:\n - name: "testbed-node-0"\n - name: "testbed-node-1"\n - name: "testbed-node-2"\n'})}),"\n",(0,r.jsx)(o.h3,{id:"deploy-osds-on-specific-nodes-and-devices-based-on-device-names",children:"Deploy OSDs on specific nodes and devices based on device names"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_storage_useallnodes: false\nrook_storage_usealldevices: false\nrook_storage_nodes:\n - name: "testbed-node-0"\n   devices:\n     - name: "/dev/sdb"\n     - name: "/dev/sdc"\n     - name: "/dev/sde"\n - name: "testbed-node-1"\n   devices:\n     - name: "/dev/sdf"\n     - name: "/dev/sdg"\n     - name: "/dev/sdh"\n - name: "testbed-node-2"\n   devices:\n     - name: "/dev/sdi"\n     - name: "/dev/sdj"\n     - name: "/dev/sdk"\n'})}),"\n",(0,r.jsxs)(o.h3,{id:"flexible-approach-using-rook_storage",children:["Flexible approach using ",(0,r.jsx)(o.code,{children:"rook_storage"})]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'# do not use all nodes\nrook_storage_useallnodes: false\n# do not use all found devices\nrook_storage_usealldevices: false\nrook_storage_config_osdsperdevice: "1"\n# enable device encryption\nrook_storage_config_encrypteddevice: "true"\n# define a device filter where to create OSDs\nrook_storage_devicefilter: ""\n# name nodes where to create OSDs\nrook_storage_nodes: []\n#  - name: "testbed-node-0"\n#  - name: "testbed-node-1"\n#  - name: "testbed-node-2"\nrook_storage:\n  useAllNodes: "{{ rook_storage_useallnodes }}"\n  useAllDevices: "{{ rook_storage_usealldevices }}"\n  config:\n    crushRoot: "custom-root" # specify a non-default root label for the CRUSH map\n    metadataDevice: "md0" # specify a non-rotational storage so ceph-volume will use it as block db device of bluestore.\n    databaseSizeMB: "1024" # uncomment if the disks are smaller than 100 GB\n    osdsPerDevice: "{{ rook_storage_config_osdsperdevice }}" # this value can be overridden at the node or device level\n    encryptedDevice: "{{ rook_storage_config_encrypteddevice }}" # the default value for this option is "false"\n  # # Individual nodes and their config can be specified as well, but \'useAllNodes\' above must be set to false. Then, only the named\n  # # nodes below will be used as storage resources. Each node\'s \'name\' field should match their \'kubernetes.io/hostname\' label.\n  nodes:\n    - name: "172.17.4.201"\n      devices: # specific devices to use for storage can be specified for each node\n        - name: "sdb"\n        - name: "nvme01" # multiple osds can be created on high performance devices\n          config:\n            osdsPerDevice: "5"\n        - name: "/dev/disk/by-id/ata-ST4000DM004-XXXX" # devices can be specified using full udev paths\n      config: # configuration can be specified at the node level which overrides the cluster level config\n    - name: "172.17.4.301"\n      deviceFilter: "^sd."\n'})}),"\n",(0,r.jsx)(o.h3,{id:"encrypted-osds",children:"Encrypted OSDs"}),"\n",(0,r.jsx)(o.p,{children:"OSDs are encrypted by default. Rook creates a LUKS on LVM setup for this. Encryption keys are managed by Ceph, as usual."}),"\n",(0,r.jsx)(o.admonition,{type:"info",children:(0,r.jsx)(o.p,{children:"Provisioning LUKS on already existing logical volumes is not supported currently by Rook."})}),"\n",(0,r.jsxs)(o.p,{children:["Have a look at the ",(0,r.jsx)(o.a,{href:"https://docs.ceph.com/en/latest/ceph-volume/lvm/encryption/",children:"Ceph documentation on LVM encryption"})," and the ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/?h=#osd-configuration-settings",children:"Rook OSD Configuration Settings"})," for details."]}),"\n",(0,r.jsxs)(o.p,{children:["If you want complete flexibility, look into the details of the ",(0,r.jsx)(o.a,{href:"#helm-value-file",children:"Helm Value File"}),"."]}),"\n",(0,r.jsx)(o.h2,{id:"dashboard",children:"Dashboard"}),"\n",(0,r.jsx)(o.p,{children:"Password for the admin user of the Ceph dashboard is automatically generated by rook and can be retrieved like this:"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{children:"kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath=\"{['data']['password']}\" | base64 --decode && echo\n"})}),"\n",(0,r.jsxs)(o.p,{children:["Have a look at the ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/Storage-Configuration/Monitoring/ceph-dashboard/",children:"Rook Ceph Dashboard Documentation"})," for details."]}),"\n",(0,r.jsxs)(o.p,{children:["Some useful ansible variables for the options from the ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/Storage-Configuration/Monitoring/ceph-dashboard/",children:"Rook Ceph Dashboard Documentation"})," are available."]}),"\n",(0,r.jsx)(o.h3,{id:"enable-dashboard-and-configure-ssl-and-ports",children:"Enable dashboard and configure ssl and ports"}),"\n",(0,r.jsx)(o.p,{children:"The Ceph dashboard is deployed by default and also an LoadBalancer Service is created in Kubernetes."}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_dashboard_enabled: true\nrook_dashboard_ssl: true\nrook_dashboard_port: 7000\nrook_dashboard_port_external: 443\n"})}),"\n",(0,r.jsx)(o.h2,{id:"rook-cluster-name",children:"Rook Cluster Name"}),"\n",(0,r.jsx)(o.p,{children:"The name that will be used internally for the Ceph cluster can be changed. Most commonly the name is the same as the namespace since multiple clusters are not supported in the same namespace."}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_cluster_name: rook-ceph\n"})}),"\n",(0,r.jsx)(o.h2,{id:"kubernetes-namespaces",children:"Kubernetes Namespaces"}),"\n",(0,r.jsx)(o.p,{children:"The Kubernetes namespace that will be created for the Rook cluster can be changed. The services, pods, and other resources created by the operator will be added to this namespace. The common scenario is to create a single Rook cluster. If multiple clusters are created, they must not have conflicting devices or host paths."}),"\n",(0,r.jsxs)(o.p,{children:["By default, both for the operator and the rook cluster, the namespace ",(0,r.jsx)(o.code,{children:"rook-ceph"})," is used."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_operator_namespace: rook-ceph\nrook_namespace: rook-ceph\n"})}),"\n",(0,r.jsx)(o.h2,{id:"number-and-placement-of-ceph-daemons",children:"Number and Placement of Ceph Daemons"}),"\n",(0,r.jsx)(o.p,{children:"The number and placement of Ceph daemons can be changed."}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_mon_count: 3\nrook_mds_count: 3\nrook_mgr_count: 3\n"})}),"\n",(0,r.jsxs)(o.p,{children:["Please read ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#mon-settings",children:"Rook MON Settings"}),", ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#mgr-settings",children:"Rook MGR Settings"})," and ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Shared-Filesystem/ceph-filesystem-crd/#metadata-server-settings",children:"Rook MDS Settings"})," to understand which configurations make sense."]}),"\n",(0,r.jsx)(o.p,{children:"The following inventory groups are defined with defaults and can be used to control the node affinity regarding the indicated Ceph components:"}),"\n",(0,r.jsxs)(o.ul,{children:["\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.code,{children:"rook-mds"})}),"\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.code,{children:"rook-mgr"})}),"\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.code,{children:"rook-mon"})}),"\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.code,{children:"rook-osd"})}),"\n",(0,r.jsx)(o.li,{children:(0,r.jsx)(o.code,{children:"rook-rgw"})}),"\n"]}),"\n",(0,r.jsx)(o.p,{children:"To customise those inventory groups it is possible to do so in the following format:"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-ini",metastring:'title="inventory/20-roles"',children:"[rook-mds:children]\nceph-control\n\n[rook-mgr:children]\nceph-control\n\n[rook-mon:children]\nceph-control\n\n[rook-osd:children]\nceph-resource\n\n[rook-rgw:children]\nceph-control\n"})}),"\n",(0,r.jsx)(o.p,{children:"Nodes assigned to those groups will be labeled and then be utilised during the scheduling of the pods with a configuration like the following for each component:"}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'nodeAffinity:\n  requiredDuringSchedulingIgnoredDuringExecution:\n    nodeSelectorTerms:\n    - matchExpressions:\n      - key: "node-role.osism.tech/{{ rook_placement_label_mon }}"\n        operator: In\n        values:\n        - "true"\n'})}),"\n",(0,r.jsxs)(o.p,{children:["If you decide after the initial deployment to move Ceph components to different nodes you can do so modifying ",(0,r.jsx)(o.code,{children:"inventory/20-roles"})," and run ",(0,r.jsx)(o.code,{children:"osism apply rook-change-labels"})," afterwards."]}),"\n",(0,r.jsx)(o.h2,{id:"crash-collector",children:"Crash Collector"}),"\n",(0,r.jsxs)(o.p,{children:["The ",(0,r.jsx)(o.a,{href:"https://docs.ceph.com/en/quincy/mgr/crash/",children:"Ceph Crash Module"})," is enabled by default. You can also configure how long to retain the crash reports."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_crashcollector:\n  disable: false\n  daysToRetrain: 7\n"})}),"\n",(0,r.jsx)(o.h2,{id:"log-collector",children:"Log Collector"}),"\n",(0,r.jsx)(o.p,{children:"The log collector will run as a side-car next to each Ceph daemon. The Ceph configuration option log_to_file will be turned on, meaning Ceph daemons will log on files in addition to still logging to container's stdout. These logs will be rotated."}),"\n",(0,r.jsxs)(o.p,{children:["See ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#cluster-settings",children:"Rook Cluster Settings"})," for more details."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:"rook_logcollector:\n  enabled: true\n  periodicity: daily  # one of: hourly, daily, weekly, monthly\n  maxLogSize: 500M    # SUFFIX may be 'M' or 'G'. Must be at least 1M.\n"})}),"\n",(0,r.jsx)(o.h2,{id:"ceph-config",children:"Ceph Config"}),"\n",(0,r.jsx)(o.admonition,{type:"info",children:(0,r.jsx)(o.p,{children:"The Ceph Config feature is currently in an experimental state in the Rook project."})}),"\n",(0,r.jsxs)(o.p,{children:["Please read ",(0,r.jsx)(o.a,{href:"https://rook.github.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#ceph-config",children:"Ceph Config"})," for details on how to use and what to expect from this feature."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_cephconfig:\n  global:\n    # All values must be quoted so they are considered a string in YAML\n    osd_pool_default_size: "3"\n    mon_warn_on_pool_no_redundancy: "false"\n    osd_crush_update_on_start: "false"\n  # Make sure to quote special characters\n  "osd.*":\n    osd_max_scrubs: "10"\n'})}),"\n",(0,r.jsx)(o.h2,{id:"second-ceph-cluster",children:"Second Ceph cluster"}),"\n",(0,r.jsx)(o.p,{children:"In theory, this is completely customizable by deploying multiple helm releases. No evaluation has been done so far, though and this is currently not implemented in OSISM."}),"\n",(0,r.jsx)(o.h2,{id:"helm-value-file",children:"Helm Value File"}),"\n",(0,r.jsxs)(o.p,{children:["The ",(0,r.jsx)(o.a,{href:"https://github.com/osism/ansible-collection-services/tree/main/roles/rook",children:"OSISM Rook role"})," is an opinionated and sane default configuration. If you reach the limits of what is customizable via ansible variables or have a very custom setup, you can pass a custom or additional ",(0,r.jsx)(o.a,{href:"https://github.com/osism/ansible-collection-services/blob/main/roles/rook/templates/01-helm-values-all.yml.j2",children:(0,r.jsx)(o.code,{children:"values.yml"})})," files or even any ",(0,r.jsx)(o.a,{href:"https://rook.io/docs/rook/latest-release/CRDs/specification/",children:"Rook CRD"})," to the role and it will be jinja2 templated and roled out to the kubernetes cluster."]}),"\n",(0,r.jsxs)(o.p,{children:["Just overwrite ",(0,r.jsx)(o.code,{children:"rook_configuration_directory"})," and place any ",(0,r.jsx)(o.code,{children:"*.yml.j2"})," files that you want to apply there."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{className:"language-yaml",metastring:'title="environments/rook/configuration.yml"',children:'rook_template_directory: "{{ configuration_directory }}/environments/rook/files"\n'})}),"\n",(0,r.jsxs)(o.ul,{children:["\n",(0,r.jsxs)(o.li,{children:["Helm ",(0,r.jsx)(o.code,{children:"values.yml"})," files need to be named ",(0,r.jsx)(o.code,{children:"*-helm-values-*.yml.j2"})]}),"\n",(0,r.jsxs)(o.li,{children:["custom CRDs need to be named ",(0,r.jsx)(o.code,{children:"*-CRD-*.yml.j2"})]}),"\n"]}),"\n",(0,r.jsx)(o.p,{children:"It makes sense to also include the default templates and change them (to e.g. use already existing ansible variables) add your custom settings on top or change them to fit your use cases."}),"\n",(0,r.jsxs)(o.p,{children:["Get the default templates from the ",(0,r.jsx)(o.code,{children:"osism-ansible"})," container or download them from github."]}),"\n",(0,r.jsx)(o.pre,{children:(0,r.jsx)(o.code,{children:'mkdir /opt/configuration/environments/rook/files\ncd /opt/configuration/environments/rook/files\nfor file in 01-helm-values-all.yml.j2 02-CRD-CephClient.yml.j2 ; do\n  curl -O "https://raw.githubusercontent.com/osism/ansible-collection-services/main/roles/rook/templates/${file}"\ndone\n'})})]})}function h(e={}){const{wrapper:o}={...(0,t.R)(),...e.components};return o?(0,r.jsx)(o,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,o,n)=>{n.d(o,{R:()=>i,x:()=>a});var s=n(6540);const r={},t=s.createContext(r);function i(e){const o=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(t.Provider,{value:o},e.children)}}}]);