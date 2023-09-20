---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

Always read the release notes first to learn what has changed and what
adjustments are necessary

1. Sync the image versions in the configuration repository.

   ```
   MANAGER_VERSION=6.0.0 gilt overlay  # you have to do this 2x
   MANAGER_VERSION=6.0.0 gilt overlay
   ```

2. Set the new manager version in the configuration repository.

   ```
   yq -i '.manager_version = "6.0.0"' environments/manager/configuration.yml
   ```

3. If `openstack_version` or `ceph_version` are set in `environments/manager/configuration.yml`
   (or anywhere else), they must be removed when using a stable release.

4. Update the configuration repository on the manager.

   ```
   osism apply configuration
   ```

5. Update the manager services on the manager.

   ```
   osism update manager
   ```

6. Refresh the facts cache.

   ```
   osism apply facts
   ```
