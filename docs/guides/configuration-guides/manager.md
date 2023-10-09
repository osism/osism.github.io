---
sidebar_label: Manager
sidebar_position: 5
---

# Manager

## Stable release

It is recommended to use a stable release of OSISM. All available releases are listed on
[release.osism.tech](https://release.osism.tech).

In the example, OSISM release 6.0.0 is used.

1. Sync the image versions in the configuration repository. It is important to do this so
   that the correct versions are available in `environments/manager/images.yml`.

   ```
   MANAGER_VERSION=6.0.0 gilt overlay  # you have to do this 2x
   MANAGER_VERSION=6.0.0 gilt overlay
   ```

2. Set the new manager version in the configuration repository.

   ```
   yq -i '.manager_version = "6.0.0"' environments/manager/configuration.yml
   ```

3. If `openstack_version` or `ceph_version` are set in `environments/manager/configuration.yml`
   (or anywhere else), they must be removed. If these are set, the stable release is not used for
   these components.

4. Commit and push changes in the configuration repository. Since everyone here has their own
   workflows for changes to the configuration repository, only a generic example for Git.

   ```
   git commit -a -s -m "manager: use OSISM version 6.0.0"
   git push
   ```

## OpenSearch integration

With the command `osism log opensearch` it is possible to send SQL queries
to the OpenSearch service. For the command to be functional, the OpenSearch
integration must be activated in the manager environment and the OpenSearch
address and port must be set.

```yaml title="environments/manager/configuration.yml"
manager_opensearch_enable: true
manager_opensearch_address: api-int.testbed.osism.xyz
manager_opensearch_port: 9200
```

The integration can also be enabled later. `osism update manager` is then
executed after the configuration has been changed.
