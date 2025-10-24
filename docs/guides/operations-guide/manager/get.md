---
sidebar_label: Get
---

# Get

A `get` command is available in the OSISM CLI. This allows to gather specific information.

## Hosts

* Get all hosts defined in the inventory

  ```console
  $ osism get hosts
  +-----------------------------------+
  | Host                              |
  |-----------------------------------|
  | testbed-manager.testbed.osism.xyz |
  | testbed-node-0.testbed.osism.xyz  |
  | testbed-node-1.testbed.osism.xyz  |
  | testbed-node-2.testbed.osism.xyz  |
  +-----------------------------------+
  ```

* Get all hosts defined in the inventory that are member of a specific inventory group

  ```console
  $ osism get hosts -l manager
  +-----------------------------------+
  | Host                              |
  |-----------------------------------|
  | testbed-manager.testbed.osism.xyz |
  +-----------------------------------+

  $ osism get hosts -l control
  +----------------------------------+
  | Host                             |
  |----------------------------------|
  | testbed-node-0.testbed.osism.xyz |
  | testbed-node-1.testbed.osism.xyz |
  | testbed-node-2.testbed.osism.xyz |
  +----------------------------------+
  ```

## Host variables

* Get all host vars of a specific node

  ```bash
  osism get hostvars testbed-manager.testbed.osism.xyz
  ```

* Get a specific host var of a specific node

  ```console
  $ osism get hostvars testbed-manager.testbed.osism.xyz ansible_host
  +-----------------------------------+--------------+----------------+
  | Host                              | Variable     | Value          |
  +===================================+==============+================+
  | testbed-manager.testbed.osism.xyz | ansible_host | '192.168.16.5' |
  +-----------------------------------+--------------+----------------+
  ```

## Host facts

* Get all facts of a specific node

  ```bash
  osism get facts testbed-manager.testbed.osism.xyz
  ```

* Get a specific fact of a specific node

  ```console
  $ osism get facts testbed-manager.testbed.osism.xyz ansible_architecture
  +-----------------------------------+----------------------+----------+
  | Host                              | Fact                 | Value    |
  +===================================+======================+==========+
  | testbed-manager.testbed.osism.xyz | ansible_architecture | 'x86_64' |
  +-----------------------------------+----------------------+----------+
  ```
