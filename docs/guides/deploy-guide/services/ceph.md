---
sidebar_label: Ceph
sidebar_position: 50
---

# Ceph

1. Deploy base services.

   ```
   osism apply ceph-mons
   osism apply ceph-mgrs
   osism apply ceph-osds
   osism apply ceph-crash
   ```

   It's all done here step by step. It is also possible to do this in a single step:

   ```
   osism apply ceph-base
   ```

2. Get ceph keys. This places the necessary keys in /opt/configuration.

   ```
   osism apply copy-ceph-keys
   ```

   After run, these keys must be permanently added to the configuration repository
   via Git.

   ```
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

   If the `osism apply copy-ceph-keys` fails and the keys are not found in the `/share`
   directory, this can be solved with `osism apply ceph-fetch-keys`.

3. After the Ceph keys have been persisted in the configuration repository, the Ceph
   client can be deployed.

   ```
   osism apply cephclient
   ```


## RGW service

1. [Configure the RGW service](./../../configuration-guide/ceph#rgw-service)

2. Apply role `ceph-rgws` to deploy the Ceph RGW services.

   ```
   osism apply ceph-rgws
   ```

3. Apply role `kolla-ceph-rgw` to add the OpenStack endpoint.

   ```
   osism apply kolla-ceph-rgw
   ```

4. Apply role `loadbalancer` to add the HAProxy backend and frontend.

   ```
   osism apply loadbalancer
   ```

5. Apply role `horizon` to enable the Swift dashboard.

   ```
   osism apply horizon
   ```
