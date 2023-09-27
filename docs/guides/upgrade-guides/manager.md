---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

Always read the release notes first to learn what has changed and what
adjustments are necessary

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
   (or anywhere else), they must be removed when using a stable release.

4. Commit and push changes in the configuration repository. Since everyone here has their own
   workflows for changes to the configuration repository, only a generic example for Git.

   ```
   git commit -a -s -m "manager: use OSISM version 6.0.0"
   git push
   ```

5. Update the configuration repository on the manager.

   ```
   osism apply configuration
   ```

6. Update the manager services on the manager.

   ```
   osism update manager
   ```

   * If Ansible Vault was used to encrypt `environments/manager/secrets.yml`, the parameter
     `--ask-vault-pass` is also appended.
   * If `osism update manager` does not work yet, use `osism-update-manager` instead.


7. Refresh the facts cache.

   ```
   osism apply facts
   ```

8. If Traefik is used on the management plane (`traefik_enable: true` in `environments/infrastructure/configuration.yml`)
   then Traefik should also be upgraded directly.

   ```
   osism apply traefik
   ```
