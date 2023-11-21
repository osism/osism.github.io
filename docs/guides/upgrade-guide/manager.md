---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

Always read the release notes first to learn what has changed and what
adjustments are necessary

1. Update the OSISM release in use in the configuration repository as described in
   [Configuration Guides > Manager > Stable release](../configuration-guide/manager#stable-release).

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
