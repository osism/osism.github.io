---
sidebar_label: Configuration for Rook
sidebar_position: 31
---

# Configuration for Rook

The official Ceph documentation is located on https://docs.ceph.com/en/latest/rados/configuration/

It is **strongly advised** to use the documentation for the version being used.

* Quincy - https://docs.ceph.com/en/quincy/rados/configuration/
* Reef - https://docs.ceph.com/en/reef/rados/configuration/


## Unique Identifier

The File System ID is a unique identifier for the cluster.

~The identifier is set via the parameter `fsid` in `environments/rook/configuration.yml`~
~and must be unique. It can be generated with `uuidgen`.~

It is generated automatically by the [Rook Deployment](../../deploy-guide/services/ceph/rook.md).

TODO: To evaluate if we want and can pass a `fsid`. This is no out-of-the-box Rook feature, though.


## Client

~The `client.admin` keyring is placed in the file `environments/infrastructure/files/ceph/ceph.client.admin.keyring`.~

There is no real Ceph client installed on the manager node, but a wrapper to enter the Rook Toolbox can be installed.

If the namespace of the rook cluster was changed this needs to be reflected as well as the install type of the client.

```yaml title="environments/infrastructure/configuration.yml"
cephclient_install_type: rook

cephclient_rook_namespace: rook-ceph
```

After successfully configuring the environment for the client, run the installation:

```bash
osism apply cephclient
```

This will try to detect a prior installation of a Ceph client with the install type `container` or `package` and cleanup that previous installation.



## Network configuration

Some useful ansible variables for the options from the [Rook Network Configuration Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/?h=#network-configuration-settings) are available.
If you want complete flexibility, you can also use the `rook_network` variable which abstracts all settings from [Rook Network Configuration Settings](https://rook.io/docs/rook/latest/CRDs/Cluster/ceph-cluster-crd/#network-configuration-settings).

### Configuring `addressRanges`

```yaml title="environments/rook/configuration.yml"
rook_network_public: "192.168.16.0/24"
rook_network_cluster: "192.168.17.0/24"
```

### Configuring encryption, compression, msgr2

```yaml title="environments/rook/configuration.yml"
rook_network_encryption: true
rook_network_compression: true
rook_network_require_msgr2: false
```

### Flexible approach using `rook_network`

```yaml title="environments/rook/configuration.yml"
rook_network_encryption: true
rook_network_compression: true
rook_network_require_msgr2: false
rook_network_public: "192.168.16.0/20"
rook_network_cluster: "{{ rook_network_public }}"
rook_network:
  connections:
    # Whether to encrypt the data in transit across the wire to prevent eavesdropping the data on the network.
    # The default is false. When encryption is enabled, all communication between clients and Ceph daemons, or between Ceph daemons will be encrypted.
    # When encryption is not enabled, clients still establish a strong initial authentication and data integrity is still validated with a crc check.
    # IMPORTANT: Encryption requires the 5.11 kernel for the latest nbd and cephfs drivers. Alternatively for testing only,
    # you can set the "mounter: rbd-nbd" in the rbd storage class, or "mounter: fuse" in the cephfs storage class.
    # The nbd and fuse drivers are *not* recommended in production since restarting the csi driver pod will disconnect the volumes.
    encryption:
      enabled: "{{ rook_network_encryption }}"
    # Whether to compress the data in transit across the wire. The default is false.
    # Requires Ceph Quincy (v17) or newer. Also see the kernel requirements above for encryption.
    compression:
      enabled: "{{ rook_network_compression }}"
    # Whether to require communication over msgr2. If true, the msgr v1 port (6789) will be disabled
    # and clients will be required to connect to the Ceph cluster with the v2 port (3300).
    # Requires a kernel that supports msgr v2 (kernel 5.11 or CentOS 8.4 or newer).
    requireMsgr2: "{{ rook_network_require_msgr2 }}"
  # enable host networking
  provider: host
  addressRanges:
    public:
      - "{{ rook_network_public }}"
    cluster:
      - "{{ rook_network_cluster }}"
```


## RGW service - CephObjectStore CRD

:::info

OpenStack integration between Keystone/Swift and Rook is currently missing upstream in Rook. Please have a look at [#1027](https://github.com/orgs/SovereignCloudStack/projects/18/views/1?layout=board&pane=issue&itemId=63889060) to get the current status of the integration in OSISM.

:::

Have a look at [CephObjectStore CRD Spec](https://rook.io/docs/rook/latest/CRDs/Object-Storage/ceph-object-store-crd/) for details on how to configure the RGW service.

```yaml title="environments/rook/configuration.yml"
rook_cephobjectstore_default_name: rgw
rook_cephobjectstore_replicated_default_size: 3
rook_cephobjectstore_erasurecoded_default_datachunks: 2
rook_cephobjectstore_erasurecoded_default_codingchunks: 1
rook_cephobjectstore_failuredomain: host
rook_cephobjectstore_default_port: 8081
rook_cephobjectstore_preservepoolsondelete: true
rook_cephobjectstore_keystone_acceptedRoles: []
  # - admin
  # - member
rook_cephobjectstore_keystone_implicitTenants: ""
rook_cephobjectstore_keystone_revocationInterval: 1200
rook_cephobjectstore_keystone_tokenCacheSize: 1000
rook_cephobjectstore_keystone_url: ""
rook_cephobjectstore_swift_accountInUrl: true
rook_cephobjectstore_swift_urlPrefix: ""
rook_cephobjectstore_swift_versioningEnabled: true
rook_cephobjectstore_s3_authKeystone: true
rook_cephobjectstore_s3_enable: true
# name of the secret that provides admin user credentials needs to be in same namespace
rook_cephobjectstore_keystone_serviceUserSecretName: ceph-rgw-usersecret
# the following settings belong to the usersecret
rook_cephobjectstore_keystone_auth_type: ""
rook_cephobjectstore_keystone_identity_api_version: 3
rook_cephobjectstore_keystone_password: ""
rook_cephobjectstore_keystone_project_domain_name: "Default"
rook_cephobjectstore_keystone_project_name: ""
rook_cephobjectstore_keystone_user_domain_name: "Default"
rook_cephobjectstore_keystone_username: ""
rook_cephobjectstores:
  - name: "{{ rook_cephobjectstore_default_name }}"
    spec:
      metadataPool:
        failureDomain: "{{ rook_cephobjectstore_failuredomain }}"
        replicated:
          size: "{{ rook_cephobjectstore_replicated_default_size }}"
        # erasureCoded:
        #   dataChunks: "{{ rook_cephobjectstore_erasurecoded_default_datachunks }}"
        #   codingChunks: "{{ rook_cephobjectstore_erasurecoded_default_codingchunks }}"
      dataPool:
        failureDomain: "{{ rook_cephobjectstore_failuredomain }}"
        replicated:
          size: "{{ rook_cephobjectstore_replicated_default_size }}"
        # erasureCoded:
        #   dataChunks: "{{ rook_cephobjectstore_erasurecoded_default_datachunks }}"
        #   codingChunks: "{{ rook_cephobjectstore_erasurecoded_default_codingchunks }}"
      preservePoolsOnDelete: "{{ rook_cephobjectstore_preservepoolsondelete }}"
      gateway:
        port: "{{ rook_cephobjectstore_default_port }}"
        resources: "{{ rook_resources_cephobjecstore }}"
        # securePort: 443
        # sslCertificateRef:
        instances: 1
        priorityClassName: system-cluster-critical
        placement: "{{ rook_placement_cephobjectstore }}"
        annotations: "{{ rook_annotations_cephobjecstore }}"
      auth:
        keystone:
          acceptedRoles: "{{ rook_cephobjectstore_keystone_acceptedRoles }}"
          implicitTenants: "{{ rook_cephobjectstore_keystone_implicitTenants }}"
          revocationInterval: "{{ rook_cephobjectstore_keystone_revocationInterval }}"
          serviceUserSecretName: "{{ rook_cephobjectstore_keystone_serviceUserSecretName }}"
          tokenCacheSize: "{{ rook_cephobjectstore_keystone_tokenCacheSize }}"
          url: "{{ rook_cephobjectstore_keystone_url }}"
        protocols:
          swift:
            accountInUrl: "{{ rook_cephobjectstore_swift_accountInUrl }}"
            urlPrefix: "{{ rook_cephobjectstore_swift_urlPrefix }}"
            versioningEnabled: "{{ rook_cephobjectstore_swift_versioningEnabled }}"
          s3:
            authKeystone: "{{ rook_cephobjectstore_s3_authKeystone }}"
            enable: "{{ rook_cephobjectstore_s3_enable }}"
    storageClass:
      enabled: false
```


## Cephfs - CephFilesystem CRD

Have a look at [CephFilesystem CRD Spec](https://rook.io/docs/rook/latest/CRDs/Shared-Filesystem/ceph-filesystem-crd/) for details on how to configure Cephfs.

```yaml title="environments/rook/configuration.yml"
rook_cephfilesystem_default_name: cephfs
rook_cephfilesystem_replicated_default_size: 3
rook_cephfilesystem_erasurecoded_default_datachunks: 2
rook_cephfilesystem_erasurecoded_default_codingchunks: 1
rook_cephfilesystem_default_metadatapool_parameters_compression_mode: none
rook_cephfilesystem_default_datapool_parameters_compression_mode: none
rook_cephfilesystems:
  - name: "{{ rook_cephfilesystem_default_name }}"
    spec:
      metadataPool:
        failureDomain: host
        # The metadata pool spec must use replication.
        replicated:
          size: "{{ rook_cephfilesystem_replicated_default_size }}"
          requireSafeReplicaSize: true
        parameters:
          compression_mode: "{{ rook_cephfilesystem_default_datapool_parameters_compression_mode }}"
          # target_size_ratio: ".5"
      dataPools:
        - failureDomain: host
          # The data pool spec can use replication or erasure coding.
          replicated:
            size: "{{ rook_cephfilesystem_replicated_default_size }}"
            requireSafeReplicaSize: true
          # erasureCoded:
          #   dataChunks: "{{ rook_cephfilesystem_erasurecoded_default_datachunks }}"
          #   codingChunks: "{{ rook_cephfilesystem_erasurecoded_default_codingchunks }}"
          name: data0
          parameters:
            compression_mode: "{{ rook_cephfilesystem_default_datapool_parameters_compression_mode }}"
            # target_size_ratio: ".5"
      metadataServer:
        activeCount: "{{ rook_mds_count }}"
        activeStandby: true
        resources: "{{ rook_resources_cephfilesystem }}"
        priorityClassName: system-cluster-critical"
        placement: "{{ rook_placement_cephfilesystem }}"
        annotations: "{{ rook_annotations_cephfilesystem }}"
    storageClass:
      enabled: false
```

## Extra pools - CephBlockPool CRD

Extra pools can be defined via the `rook_cephblockpools` parameter. Be sure to also include the default pools.
They will use the default values from the `rook_cephblockpool_*` variables.

Have a look at [CephBlockPool CRD Spec](https://rook.io/docs/rook/latest-release/CRDs/Block-Storage/ceph-block-pool-crd/#spec) for details.

```yaml title="environments/rook/configuration.yml"
rook_cephblockpool_replicated_default_size: 3
rook_cephblockpool_erasurecoded_default_datachunks: 2
rook_cephblockpool_erasurecoded_default_codingchunks: 1
rook_cephblockpool_default_min_size: "0"
rook_cephblockpool_default_pg_num: "128"
rook_cephblockpools:
  # default pools
  - name: backups
    spec:
      failureDomain: host
      replicated:
        size: "{{ rook_cephblockpool_replicated_default_size }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
  - name: volumes
    spec:
      failureDomain: host
      replicated:
        size: "{{ rook_cephblockpool_replicated_default_size }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
  - name: images
    spec:
      failureDomain: host
      replicated:
        size: "{{ rook_cephblockpool_replicated_default_size }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
  - name: metrics
    spec:
      failureDomain: host
      replicated:
        size: "{{ rook_cephblockpool_replicated_default_size }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
  - name: vms
    spec:
      failureDomain: host
      replicated:
        size: "{{ rook_cephblockpool_replicated_default_size }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
  # extra pools
  - name: extra1
    spec:
      failureDomain: host
      replicated:
        size: "{{ rook_cephblockpool_replicated_default_size }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
  - name: extra2
    spec:
      failureDomain: host
      erasureCoded:
        dataChunks: "{{ rook_cephblockpool_erasurecoded_default_datachunks }}"
        codingChunks: "{{ rook_cephblockpool_erasurecoded_default_codingchunks }}"
      parameters:
        min_size: "{{ rook_cephblockpool_default_min_size }}"
        pg_num: "{{ rook_cephblockpool_default_pg_num }}"
        pgp_num: "{{ rook_cephblockpool_default_pg_num }}"
    storageClass:
      enabled: false
```


## Storage configuration

:::info

In the default setup, no OSD will be deployed (better safe than sorry approach).

:::

You have to pass a storage configuration via `environments/rook/configuration.yml`.

Some useful ansible variables for the options from the [Rook Storage Selection Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#storage-selection-settings) are available.
If you want complete flexibility, you can also use the `rook_storage` variable which abstracts all settings from [Rook Storage Selection Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#storage-selection-settings).

### Deploy OSDs on all nodes and found devices

```yaml title="environments/rook/configuration.yml"
rook_storage_useallnodes: true
rook_storage_usealldevices: true
```

### Deploy OSDs on specific nodes and devices based on a device filter

```yaml title="environments/rook/configuration.yml"
rook_storage_useallnodes: false
rook_storage_usealldevices: false
rook_storage_devicefilter: "^sd[b-c]"
rook_storage_nodes:
 - name: "testbed-node-0"
 - name: "testbed-node-1"
 - name: "testbed-node-2"
```

### Deploy OSDs on specific nodes and devices based on device names

```yaml title="environments/rook/configuration.yml"
rook_storage_useallnodes: false
rook_storage_usealldevices: false
rook_storage_nodes:
 - name: "testbed-node-0"
   devices:
     - name: "/dev/sdb"
     - name: "/dev/sdc"
     - name: "/dev/sde"
 - name: "testbed-node-1"
   devices:
     - name: "/dev/sdf"
     - name: "/dev/sdg"
     - name: "/dev/sdh"
 - name: "testbed-node-2"
   devices:
     - name: "/dev/sdi"
     - name: "/dev/sdj"
     - name: "/dev/sdk"
```

### Flexible approach using `rook_storage`

```yaml title="environments/rook/configuration.yml"
# do not use all nodes
rook_storage_useallnodes: false
# do not use all found devices
rook_storage_usealldevices: false
rook_storage_config_osdsperdevice: "1"
# enable device encryption
rook_storage_config_encrypteddevice: "true"
# define a device filter where to create OSDs
rook_storage_devicefilter: ""
# name nodes where to create OSDs
rook_storage_nodes: []
#  - name: "testbed-node-0"
#  - name: "testbed-node-1"
#  - name: "testbed-node-2"
rook_storage:
  useAllNodes: "{{ rook_storage_useallnodes }}"
  useAllDevices: "{{ rook_storage_usealldevices }}"
  config:
    crushRoot: "custom-root" # specify a non-default root label for the CRUSH map
    metadataDevice: "md0" # specify a non-rotational storage so ceph-volume will use it as block db device of bluestore.
    databaseSizeMB: "1024" # uncomment if the disks are smaller than 100 GB
    osdsPerDevice: "{{ rook_storage_config_osdsperdevice }}" # this value can be overridden at the node or device level
    encryptedDevice: "{{ rook_storage_config_encrypteddevice }}" # the default value for this option is "false"
  # # Individual nodes and their config can be specified as well, but 'useAllNodes' above must be set to false. Then, only the named
  # # nodes below will be used as storage resources. Each node's 'name' field should match their 'kubernetes.io/hostname' label.
  nodes:
    - name: "172.17.4.201"
      devices: # specific devices to use for storage can be specified for each node
        - name: "sdb"
        - name: "nvme01" # multiple osds can be created on high performance devices
          config:
            osdsPerDevice: "5"
        - name: "/dev/disk/by-id/ata-ST4000DM004-XXXX" # devices can be specified using full udev paths
      config: # configuration can be specified at the node level which overrides the cluster level config
    - name: "172.17.4.301"
      deviceFilter: "^sd."
```


### Encrypted OSDs

OSDs are encrypted by default. Rook creates a LUKS on LVM setup for this. Encryption keys are managed by Ceph, as usual.

:::info

Provisioning LUKS on already existing logical volumes is not supported currently by Rook.

:::

Have a look at the [Ceph documentation on LVM encryption](https://docs.ceph.com/en/latest/ceph-volume/lvm/encryption/) and the [Rook OSD Configuration Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/?h=#osd-configuration-settings) for details.

If you want complete flexibility, look into the details of the [Helm Value File](#helm-value-file).

## Dashboard

Password for the admin user of the Ceph dashboard is automatically generated by rook and can be retrieved like this:

```bash
kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo
```

Have a look at the [Rook Ceph Dashboard Documentation](https://rook.io/docs/rook/latest-release/Storage-Configuration/Monitoring/ceph-dashboard/) for details.

Some useful ansible variables for the options from the [Rook Ceph Dashboard Documentation](https://rook.io/docs/rook/latest-release/Storage-Configuration/Monitoring/ceph-dashboard/) are available.

### Enable dashboard and configure ssl and ports

The Ceph dashboard is deployed by default and also an LoadBalancer Service is created in Kubernetes.

```yaml title="environments/rook/configuration.yml"
rook_dashboard_enabled: true
rook_dashboard_ssl: true
rook_dashboard_port: 7000
rook_dashboard_port_external: 443
```

## Rook Cluster Name

The name that will be used internally for the Ceph cluster can be changed. Most commonly the name is the same as the namespace since multiple clusters are not supported in the same namespace.

```yaml title="environments/rook/configuration.yml"
rook_cluster_name: rook-ceph
```

## Kubernetes Namespaces

The Kubernetes namespace that will be created for the Rook cluster can be changed. The services, pods, and other resources created by the operator will be added to this namespace. The common scenario is to create a single Rook cluster. If multiple clusters are created, they must not have conflicting devices or host paths.

By default, both for the operator and the rook cluster, the namespace `rook-ceph` is used.

```yaml title="environments/rook/configuration.yml"
rook_operator_namespace: rook-ceph
rook_namespace: rook-ceph
```

## Number and Placement of Ceph Daemons

The number and placement of Ceph daemons can be changed.

```yaml title="environments/rook/configuration.yml"
rook_mon_count: 3
rook_mds_count: 3
rook_mgr_count: 3
```

Please read [Rook MON Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#mon-settings), [Rook MGR Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#mgr-settings) and [Rook MDS Settings](https://rook.io/docs/rook/latest-release/CRDs/Shared-Filesystem/ceph-filesystem-crd/#metadata-server-settings) to understand which configurations make sense.

The following inventory groups are defined with defaults and can be used to control the node affinity regarding the indicated Ceph components:

* `rook-mds`
* `rook-mgr`
* `rook-mon`
* `rook-osd`
* `rook-rgw`

To customize those inventory groups it is possible to do so in the following format:

```ini title="inventory/20-roles"
[rook-mds:children]
ceph-control

[rook-mgr:children]
ceph-control

[rook-mon:children]
ceph-control

[rook-osd:children]
ceph-resource

[rook-rgw:children]
ceph-control
```

Nodes assigned to those groups will be labeled and then be utilized during the scheduling of the pods with a configuration like the following for each component:

```yaml title="environments/rook/configuration.yml"
nodeAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    nodeSelectorTerms:
    - matchExpressions:
      - key: "node-role.osism.tech/{{ rook_placement_label_mon }}"
        operator: In
        values:
        - "true"
```

If you decide after the initial deployment to move Ceph components to different nodes you can do so modifying `inventory/20-roles` and run `osism apply rook-change-labels` afterwards.

## Crash Collector

The [Ceph Crash Module](https://docs.ceph.com/en/quincy/mgr/crash/) is enabled by default. You can also configure how long to retain the crash reports.

```yaml title="environments/rook/configuration.yml"
rook_crashcollector:
  disable: false
  daysToRetrain: 7
```

## Log Collector

The log collector will run as a side-car next to each Ceph daemon. The Ceph configuration option log_to_file will be turned on, meaning Ceph daemons will log on files in addition to still logging to container's stdout. These logs will be rotated.

See [Rook Cluster Settings](https://rook.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#cluster-settings) for more details.

```yaml title="environments/rook/configuration.yml"
rook_logcollector:
  enabled: true
  periodicity: daily  # one of: hourly, daily, weekly, monthly
  maxLogSize: 500M    # SUFFIX may be 'M' or 'G'. Must be at least 1M.
```

## Ceph Config

:::info

The Ceph Config feature is currently in an experimental state in the Rook project.

:::

Please read [Ceph Config](https://rook.github.io/docs/rook/latest-release/CRDs/Cluster/ceph-cluster-crd/#ceph-config) for details on how to use and what to expect from this feature.

```yaml title="environments/rook/configuration.yml"
rook_cephconfig:
  global:
    # All values must be quoted so they are considered a string in YAML
    osd_pool_default_size: "3"
    mon_warn_on_pool_no_redundancy: "false"
    osd_crush_update_on_start: "false"
  # Make sure to quote special characters
  "osd.*":
    osd_max_scrubs: "10"
```

## Second Ceph cluster

In theory, this is completely customizable by deploying multiple helm releases. No evaluation has been done so far, though and this is currently not implemented in OSISM.

## Helm Value File

The [OSISM Rook role](https://github.com/osism/ansible-collection-services/tree/main/roles/rook) is an opinionated and sane default configuration. If you reach the limits of what is customizable via ansible variables or have a very custom setup, you can pass a custom or additional [`values.yml`](https://github.com/osism/ansible-collection-services/blob/main/roles/rook/templates/01-helm-values-all.yml.j2) files or even any [Rook CRD](https://rook.io/docs/rook/latest-release/CRDs/specification/) to the role and it will be jinja2 templated and rolled out to the kubernetes cluster.

Just overwrite `rook_configuration_directory` and place any `*.yml.j2` files that you want to apply there.

```yaml title="environments/rook/configuration.yml"
rook_template_directory: "{{ configuration_directory }}/environments/rook/files"
```

- Helm `values.yml` files need to be named `*-helm-values-*.yml.j2`
- custom CRDs need to be named `*-CRD-*.yml.j2`

It makes sense to also include the default templates and change them (to e.g. use already existing ansible variables) add your custom settings on top or change them to fit your use cases.

Get the default templates from the `osism-ansible` container or download them from github.

```bash
mkdir /opt/configuration/environments/rook/files
cd /opt/configuration/environments/rook/files
for file in 01-helm-values-all.yml.j2 02-CRD-CephClient.yml.j2 ; do
  curl -O "https://raw.githubusercontent.com/osism/ansible-collection-services/main/roles/rook/templates/${file}"
done
```
