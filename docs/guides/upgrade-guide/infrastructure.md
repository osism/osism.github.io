---
sidebar_label: Infrastructure
sidebar_position: 30
---

# Infrastructure

1. **Optional:** Kubernetes

   This is only necessary if the internal Kubernetes cluster has also been deployed.
   This can be checked by executing `kubectl get nodes` on the manager node.

   ```
   osism apply k3s-upgrade
   ```

2. **Optional:** Pull containers

   ```
   osism apply -a pull common
   osism apply -a pull loadbalancer
   osism apply -a pull redis
   osism apply -a pull memcached
   osism apply -a pull memcached
   osism apply -a pull rabbitmq
   osism apply -a pull mariadb
   ```

3. Cron, Fluentd & Kolla Toolbox

   The common role of Kolla is used to manage the services `cron`, `fluentd`
   and `kolla-toolbox`.

   It is important to do this upgrade **before any other upgrades** in the Kolla
   environment, as parts of the other upgrades depend on the `kolla-toolbox`
   service.

   ```
   osism apply -a upgrade common
   ```

4. Loadbalancer

   ```
   osism apply -a upgrade loadbalancer
   ```

5. Redis

   ```
   osism apply -a upgrade redis
   ```

6. Memcached

   ```
   osism apply -a upgrade memcached
   ```

7. RabbitMQ

   ```
   osism apply -a upgrade rabbitmq
   ```

8. MariaDB

   ```
   osism apply -a upgrade mariadb
   ```
