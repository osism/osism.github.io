---
sidebar_label: Rookify (technical preview)
sidebar_position: 31
---

# Configure Rookify: Migrate from Ceph-Ansible to Rook (Technical Preview)

:::warning

Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_.
Nevertheless, it is **strongly advised** to test Rookify in a controlled environment first, such as the [OSISM testbed](https://github.com/osism/testbed). Addition ure that precautionary backups are made, and all other necessary safety measures are in place.

:::

For a condensed summary of the information covered here, refer to the [Rookify GitHub repository](https://github.com/SovereignCloudStack/rookify).

## Config.yaml

The primary configuration file for Rookify is `config.yaml`. The repository includes an example file for general use, as well as one specifically tailored for the OSISM testbed setup:

- [config.example.yaml](https://github.com/SovereignCloudStack/rookify/blob/main/config.example.yaml)
- [config.example.osism.yaml](https://github.com/SovereignCloudStack/rookify/blob/main/config.example.osism.yaml)

### Parameters

#### General

```yaml title="config.example.yaml"
general:
  machine_pickle_file: data.pickle
```

The `general` section allows for the optional definition of a pickle file, which saves the state of the migration as serialized objects on disk. The pickle filed can be named as desired.

#### Logging

```yaml title="config.example.yaml"
logging:
  level: INFO # level at which logging should start
  format:
    time: "%Y-%m-%d %H:%M.%S" # other example: "iso"
    renderer: console # or: json
```

The `logging` section allows for specification of `structlog`. The `level` parameter can be set to any Python [log-levels](https://docs.python.org/3/library/logging.html#logging-levels), such as `NOTSET, DEBUG, INFO, WARNING, ERROR, CRITICAl`, but using `INFO` is recommended.

#### Ceph

```yaml title="config.example.yaml"

ceph:
  config: ./.ceph/ceph.conf
  keyring: ./.ceph/ceph.client.admin.keyring
```

The ceph section specifies the paths for the `ceph.conf` and `ceph.client.admin.keyring` files on the target system (the system where Ceph-Ansible needs to be migrated to Rook).

#### SSH

```yaml title="config.example.yaml"
# specify the correct path to the private key
ssh:
  private_key: /home/USER/.ssh/cloud.private
  hosts:
    testbed-node-0:
      address: 192.168.16.10
      user: dragon
    testbed-node-1:
      address: 192.168.16.11
      user: dragon
    testbed-node-2:
      address: 192.168.16.12
      user: dragon
```

The `ssh` section specifies the `private_key` and `hosts`. The `hosts` section includes hostnames or aliases (e.g. `testbed-node-0`), their IP addresses (e.g., for VPN connections, IPs starting with `192.186...`), and the user for login. If you are using the OSISM testbed, ensure the private key does not contain any extra strings like `EOF`. The keys must be 'clean' to avoid connection errors.

#### Kubernetes

```yaml title="config.example.yaml"

kubernetes:
  config: ./k8s/config
```

The `kubernetes` section specifies the Kubernetes configuration (e.g. if you use `kubectl`, this is usually located in `~/.kube/config`) for Rookify's Kubernetes library. Rookify needs to connect to the Kubernetes cluster on the target systems to use Rook.

```yaml title="config.example.yaml"
rook:
  cluster:
    name: osism-ceph
    namespace: rook-ceph
  ceph:
    image: quay.io/ceph/ceph:v18.2.1
```

The `rook` sections requires information about the Rook installation on the target system. For the `cluster`, Rookify needs the cluster name and namespace. Additionally, Rookify requires the Ceph version being used, i.e., the image version of the Ceph container.

:::note
  Rookify does not install Rook for you. You need to provide a running Rook installation, i.e. a Rook Operator, on your target system.
:::


For OSISM-specific migrations, Rookify needs additional information, such as the respective labels for the Rook resources:

```yaml title="config.example.osism.yaml"
rook:
  cluster:
    name: osism-ceph
    namespace: rook-ceph
    mds_placement_label: node-role.osism.tech/rook-mds
    mgr_placement_label: node-role.osism.tech/rook-mgr
    mon_placement_label: node-role.osism.tech/rook-mon
    osd_placement_label: node-role.osism.tech/rook-osd
    rgw_placement_label: node-role.osism.tech/rook-rgw
  ceph:
    image: quay.io/ceph/ceph:v18.2.1
```


#### Migration_modules

```yaml title="config.example.yaml"
migration_modules:
- analyze_ceph
- create_rook_cluster
- migrate_mons
- migrate_osds
- migrate_osd_pools
- migrate_mds
- migrate_mds_pools
- migrate_mgrs
- migrate_rgws
- migrate_rgw_pools
```

Rookify uses a modular structure, allowing you to migrate various parts of Ceph-Ansible to Rook. The `migration_modules` section specifies which modules need to be executed for the migration. Rookify contains more modules — check the [`src/rookify/module`](https://github.com/SovereignCloudStack/rookify/tree/main/src/rookify/modules) directory to see the currently implemented modules.

:::note
  Many modules depend on each other. For example, the `analyze_ceph` module will automatically run with all other modules, so 
  there is no need to specify it. It’s included here for clarity.
:::
