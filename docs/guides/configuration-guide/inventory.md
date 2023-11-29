---
sidebar_label: Inventory
sidebar_position: 10
---

# Inventory

The inventory used for the environment is located in the `inventory` directory.

## Manager

The manager has his own inventory which is used exclusively for the seed phase of the manager.
It is located in the directory `environments/manager`. There is a `hosts` file with only the
manager node in it.

## Reconciler

![Inventory Reconciler](./images/inventory/inventory-reconciler.png)

## Host Vars

## Group Vars

### Define variable for all nodes

The Ansible group `all` is specifically used internally by OSISM, is reserved and is not supported
for additional variables. When variables are added in the configuration repository for the all group,
they are ignored. In OSISM the group `generic` can be used to store variables for all nodes.
