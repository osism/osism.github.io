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
