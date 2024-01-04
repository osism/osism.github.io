---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

Always read the release notes first to learn what has changed and what
adjustments are necessary

1. Update the OSISM release in use in the configuration repository.

    1.1. Sync the image versions in the configuration repository. It is important to do this so
       that the correct versions are available in `environments/manager/images.yml`.

       ```
       gilt overlay  # you have to do this 2x
       gilt overlay
       ```

       Optionally, this is normally not necessary, it is possible to reference a specific tag of the
       [osism/cfg-generics](https://github.com/osism/cfg-generics) repository. To do this, first
       check which version of osism/cfg-generics is used in a particular release. The version is
       defined in `generics_version` in the `base.yml` file in the `osism/release` repository. For OSISM 6.0.0,
       for example, this is version [v0.20230919.0](https://github.com/osism/release/blob/main/6.0.0/base.yml#L6).
       This version is then added to the file `gilt.yml` in the configuration repository instead of
       `main` at `version`. This change must be made again after each execution of `gilt overlay` as
       it is overwritten by the call of `gilt overlay`. This cannot be realized differently in the
       current implementation of [Gilt](https://github.com/retr0h/gilt).

    1.2. Set the new manager version in the configuration repository.

       ```
       yq -i '.manager_version = "6.0.0"' environments/manager/configuration.yml
       ```

    1.3. If `openstack_version` or `ceph_version` are set in `environments/manager/configuration.yml`
       (or anywhere else), they must be removed. If these are set, the stable release is not used for
       these components.

    1.4. Commit and push changes in the configuration repository. Since everyone here has their own
       workflows for changes to the configuration repository, only a generic example for Git.

       ```
       git commit -a -s -m "manager: use OSISM version 6.0.0"
       git push
       ```

2. Update the configuration repository on the manager.

   ```
   osism apply configuration
   ```

3. Update the manager services on the manager.

   ```
   osism update manager
   ```

   * If Ansible Vault was used to encrypt `environments/manager/secrets.yml`, the parameter
     `--ask-vault-pass` is also appended.
   * If `osism update manager` does not work yet, use `osism-update-manager` instead.


4. Refresh the facts cache.

   ```
   osism apply facts
   ```

5. If Traefik is used on the management plane (`traefik_enable: true` in `environments/infrastructure/configuration.yml`)
   then Traefik should also be upgraded directly.

   ```
   osism apply traefik
   ```
