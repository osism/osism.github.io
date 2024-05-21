---
sidebar_label: Infrastructure
sidebar_position: 10
---

# Infrastructure

Common issues with deploying infrastructure services required by OpenStack
are documented in the [OpenStack Troubleshooting Guide](../../troubleshooting-guide/openstack).

1. Cron, Fluentd & Kolla Toolbox

   The common role of Kolla is used to manage the services `cron`, `fluentd`
   and `kolla-toolbox`.

   It is important to do this deployment before any other deployements in the Kolla
   environment, as parts of the other deployments depend on the `kolla-toolbox`
   service.

   ```
   osism apply -a pull common
   osism apply common
   ```

2. Loadbalancer

   ```
   osism apply -a pull loadbalancer
   osism apply loadbalancer
   ```

3. Redis

   ```
   osism apply -a pull redis
   osism apply redis
   ```

4. Memcached

   ```
   osism apply -a pull memcached
   osism apply memcached
   ```

5. RabbitMQ

   ```
   osism apply -a pull rabbitmq
   osism apply rabbitmq
   ```

6. MariaDB

   ```
   osism apply -a pull mariadb
   osism apply mariadb
   ```
