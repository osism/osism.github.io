---
sidebar_label: Infrastructure
sidebar_position: 30
---

# Infrastructure

1. **Optional:** Pull containers

   ```
   osism apply -a pull common
   osism apply -a pull loadbalancer
   osism apply -a pull redis
   osism apply -a pull memcached
   osism apply -a pull memcached
   osism apply -a pull rabbitmq
   osism apply -a pull mariadb
   ```

2. Cron, Fluentd & Kolla Toolbox

   The common role of Kolla is used to manage the services `cron`, `fluentd`
   and `kolla-toolbox`.

   It is important to do this upgrade **before any other upgrades** in the Kolla
   environment, as parts of the other upgrades depend on the `kolla-toolbox`
   service.

   ```
   osism apply -a upgrade common
   ```

3. Loadbalancer

   ```
   osism apply -a upgrade loadbalancer
   ```

4. Redis

   ```
   osism apply -a upgrade redis
   ```

5. Memcached

   ```
   osism apply -a upgrade memcached
   ```

6. RabbitMQ

   ```
   osism apply -a upgrade rabbitmq
   ```

7. MariaDB

   ```
   osism apply -a upgrade mariadb
   ```
