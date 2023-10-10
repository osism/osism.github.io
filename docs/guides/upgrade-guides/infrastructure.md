---
sidebar_label: Infrastructure
sidebar_position: 30
---

# Infrastructure

## Kubernetes

## Cron, Fluentd & Kolla Toolbox

The common role of Kolla is used to manage the services `cron`, `fluentd`
and `kolla-toolbox`.

It is important to do this upgrade before any other upgrades in the Kolla
environment, as parts of the other upgrades depend on the `kolla-toolbox`
service.

```
osism apply -a pull common
osism apply -a upgrade common
```

## Loadbalancer

```
osism apply -a pull loadbalancer
osism apply -a upgrade loadbalancer
```

## Redis

```
osism apply -a pull redis
osism apply -a upgrade redis
```

## Memcached

```
osism apply -a pull memcached
osism apply -a upgrade memcached
```

## RabbitMQ

```
osism apply -a pull rabbitmq
osism apply -a upgrade rabbitmq
```

## MariaDB

```
osism apply -a pull mariadb
osism apply -a upgrade mariadb
```
