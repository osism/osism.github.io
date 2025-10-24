---
sidebar_label: Infrastructure
sidebar_position: 10
---

# Infrastructure

Common issues with deploying infrastructure services required by OpenStack
are documented in the [OpenStack Troubleshooting Guide](../../troubleshooting-guide/openstack.md).


1. Optional: In order to reduce the active observation time for the deployment of the components,
   the container images for the following services can be downloaded in advance with the argument `-a pull`.

   ```bash
   osism apply -a pull common
   osism apply -a pull loadbalancer
   osism apply -a pull redis
   osism apply -a pull memcached
   osism apply -a pull rabbitmq
   osism apply -a pull mariadb
   ```

2. Cron, Fluentd & Kolla Toolbox

   The common role of Kolla is used to manage the services `cron`, `fluentd`
   and `kolla-toolbox`.

   It is important to do this deployment before any other deployments in the Kolla
   environment, as parts of the other deployments depend on the `kolla-toolbox`
   service.

   ```bash
   osism apply common
   ```

3. Loadbalancer

   Have a look to the [loadbalancer documentation](../../configuration-guide/loadbalancer.md) and configure it before deploying the service.

   ```bash
   osism apply loadbalancer
   ```

   It is important to do this deployment before any other deployments in the Kolla
   environment, as parts of the other deployments depend on the loadbalancer
   service.

4. Redis

   ```bash
   osism apply redis
   ```

5. Memcached

   ```bash
   osism apply memcached
   ```

6. RabbitMQ

   ```bash
   osism apply rabbitmq
   ```

7. MariaDB

   ```bash
   osism apply mariadb
   ```
