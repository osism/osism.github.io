---
sidebar_label: Infrastructure
sidebar_position: 30
---

# Infrastructure

1. Kubernetes

   This is only necessary if the internal Kubernetes cluster has also been deployed.
   This can be checked by executing `kubectl get nodes` on the manager node.

   ```bash
   osism apply k3s-upgrade
   ```

2. Cron, Fluentd & Kolla Toolbox

   The common role of Kolla is used to manage the services `cron`, `fluentd`
   and `kolla-toolbox`.

   It is important to do this upgrade before any other upgrades in the Kolla
   environment, as parts of the other upgrades depend on the `kolla-toolbox`
   service.

   ```bash
   osism apply -a pull common
   osism apply -a upgrade common
   ```

3. Loadbalancer

   ```bash
   osism apply -a pull loadbalancer
   osism apply -a upgrade loadbalancer
   ```

4. Key-value store: Valkey or Redis

   Which service to upgrade depends on the OSISM release you are upgrading **to**,
   not the one you are coming from. OSISM 11 and later run Valkey; OSISM 10 and
   earlier run Redis. OSISM enables the matching service automatically, so only
   the role name in the command differs.

   :::warning Add the Valkey secret before upgrading to OSISM 11

   The Valkey role requires `valkey_master_password`, which a configuration
   repository created before the switch does not have:
   `environments/kolla/secrets.yml` is generated once, when the repository is
   created, and no later upgrade adds keys to an existing one. Without it the
   upgrade below fails part-way through with
   `AnsibleUndefinedVariable: 'valkey_master_password' is undefined`.

   Generate a password with `pwgen 32`, add `valkey_master_password` to
   `environments/kolla/secrets.yml` in the configuration repository, commit it,
   and sync the configuration on the manager node with `osism apply
   configuration`. Then run the Valkey upgrade below.

   :::

   When upgrading to OSISM 11 or later:

   ```bash
   osism apply -a pull valkey
   osism apply -a upgrade valkey
   ```

   Coming from a Redis deployment, these are the only commands to run for this
   step — do not upgrade `redis` first. The Valkey upgrade detects the running
   Redis instance, starts Valkey alongside it, replicates the data across, fails
   over to Valkey, and then removes the Redis containers and their data volume.

   When upgrading to OSISM 10 or earlier, both releases run Redis and nothing
   migrates:

   ```bash
   osism apply -a pull redis
   osism apply -a upgrade redis
   ```

5. Memcached

   ```bash
   osism apply -a pull memcached
   osism apply -a upgrade memcached
   ```

6. RabbitMQ

   ```bash
   osism apply -a pull rabbitmq
   osism apply -a upgrade rabbitmq
   ```

7. MariaDB

   ```bash
   osism apply -a pull mariadb
   osism apply -a upgrade mariadb
   ```
