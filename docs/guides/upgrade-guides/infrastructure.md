---
sidebar_label: Infrastructure
sidebar_position: 30
---

# Infrastructure

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

## OVN

```
osism apply -a pull ovn
osism apply -a upgrade ovn
```
