---
sidebar_label: Operations Guides
sidebar_position: 30
---

# Operations Guides

## Node states

:::note

This feature is currently under development and it is only usable with latest.

:::

A node can be in different states. Depending on the state, different actions
are possible or are triggered.

The individual states of a node can be retrieved via Ansible Facts and local
files on the node itself.

### Maintenance

```
osism set maintenance NODE
osism noset maintenance NODE
```

* Ansible fact: `ansible_local.osism.maintenance`
* State file: `/etc/osism/maintenance`

### Bootstrap

```
osism set bootstrap NODE
osism noset bootstrap NODE
```

* Ansible fact: `ansible_local.osism.bootstrap`
* State file: `/etc/osism/bootstrap`
