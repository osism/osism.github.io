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

## MariaDB backup host

* Get the host that `osism apply mariadb-backup` writes its archives to

  ```console
  $ osism get mariadb-backup-host
  +----------------------------------+
  | Host                             |
  |----------------------------------|
  | testbed-node-0.testbed.osism.xyz |
  +----------------------------------+
  ```

* Get the bare host name, for use in scripts

  ```console
  $ osism get mariadb-backup-host --format script
  testbed-node-0.testbed.osism.xyz
  ```

The host is resolved by the kolla-ansible mariadb role itself, the same way a backup
run does. So an override of `mariadb_backup_host` in the inventory or in
`environments/kolla/configuration.yml` is taken into account. The command runs a
read-only play on the kolla-ansible worker, so it takes a few seconds; `--timeout`
sets how long it waits (default: 300 seconds).

With several MariaDB shards, every shard resolves a backup host, but kolla-ansible
backs up only the default shard; the command reports that shard's host. If no host
would be backed up, for example because `mariadb_backup_host` is set to a host outside
the default shard, the command prints no host, names the hosts the shards resolved,
and exits non-zero: kolla-ansible would skip the backup without reporting an error.
If the play itself fails, `osism apply -e kolla mariadb-backup-host` shows its full
output.
