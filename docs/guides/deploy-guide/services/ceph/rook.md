---
sidebar_label: Deployment with Rook
sidebar_position: 51
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deployment with Rook

:::warning

The deployment of Ceph with Rook is a technical preview and not recommended for
production use yet.

:::

1. Deploy services.

   When using Rook, all services are deployed via a single helm chart and at the
   same time. This could be altered by passing custom CRDs. See
   the [Rook Configuration Guide](../../../configuration-guide/ceph/rook.md).

   * Deploy [Kubernetes Cluster](../../../deploy-guide/services/kubernetes.md)

   * Deploy [Rook Operator](https://rook.io/docs/rook/latest/Helm-Charts/operator-chart/)

     ```bash
     osism apply rook-operator
     ```

   * Deploy Ceph cluster

     ```bash
     osism apply rook
     ```

   * Copy Ceph keyrings to kolla directories (if deploying OpenStack)

     ```bash
     osism apply rook-fetch-keys
     ```

2. Get Ceph keyrings. This places the necessary keys in `/opt/configuration`.

   ```bash
   osism apply rook-fetch-keys
   ```

   After run, these keys must be permanently added to the configuration repository
   via Git.

   ```console
   environments/infrastructure/files/ceph/ceph.client.admin.keyring
   environments/kolla/files/overlays/gnocchi/ceph.client.gnocchi.keyring
   environments/kolla/files/overlays/nova/ceph.client.cinder.keyring
   environments/kolla/files/overlays/nova/ceph.client.nova.keyring
   environments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder.keyring
   environments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder-backup.keyring
   environments/kolla/files/overlays/cinder/cinder-volume/ceph.client.cinder.keyring
   environments/kolla/files/overlays/manila/ceph.client.manila.keyring
   environments/kolla/files/overlays/glance/ceph.client.glance.keyring
   ```

   You can also overwrite the `rook_cephclients` parameter to skip
   these keys.

   ```yaml title="environments/rook/configuration.yml"
   rook_cephclients: {}
   ```

3. A Ceph client, a wrapper on the manager for entering the Rook toolbox, can be deployed.

   ```bash
   osism apply cephclient
   ```

   You have to make sure the correct [Configuration Options for the Rook Ceph Client Wrapper](../../../configuration-guide/ceph/rook.md#client) are net.

4. After getting the Ceph Keyrings, the [OpenStack Deployment](../../../deploy-guide/services/openstack.md) can optionally be done.

## RGW service

Deployment of the Ceph RGW Service is enabled by default in Rook. This is done by creating a default [CephObjectStore CRD](https://rook.io/docs/rook/latest-release/CRDs/Object-Storage/ceph-object-store-crd/). How the Ceph RGW service can be deployed and integrated into OpenStack is described here.

In the `environments/rook/configuration.yml` file you have to adapt accordingly to your environment at least like shown below:

```yaml title="environments/rook/configuration.yml"
rook_cephconfig:
  client.rgw.rgw.a:
    rgw_keystone_verify_ssl: "false"
    rgw_verify_ssl: "false"
## keystone
rook_cephobjectstore_keystone_acceptedRoles:
  - admin
  - member
rook_cephobjectstore_keystone_implicitTenants: "true"
rook_cephobjectstore_keystone_url: "https://api-int.testbed.osism.xyz:5000"
rook_cephobjectstore_swift_urlPrefix: "swift"
## keystone user
rook_cephobjectstore_keystone_auth_type: "password"
rook_cephobjectstore_keystone_project_domain_name: "Default"
rook_cephobjectstore_keystone_project_name: "service"
rook_cephobjectstore_keystone_user_domain_name: "Default"
rook_cephobjectstore_keystone_username: "ceph_rgw"
````
As well as in the `environments/rook/secrets.yml` file:

```yaml title="environments/rook/secrets.yml"
rook_cephobjectstore_keystone_passwor: supersecretpassword
````
