---
sidebar_label: Package Upgrades
---

# Package Upgrades

## Compute Nodes

Set HOST environment to be used in subsequent commands to the compute node which is going to be updated

```console
HOST=""
```

Disable compute host, so that no new instances are scheduled to it and instance state remains unchanged

```console
osism manage compute disable $HOST
```

Live-migrate all instances to other compute nodes

```console
osism manage compute migrate --yes $HOST
```

List remaining nodes in non-live-migratable state

```console
osism manage compute list $HOST
```

Move shut off nodes to other nodes

```console
INTERACTIVE=false openstack server list --all-projects --status SHUTOFF --host $HOST -f value -c ID | while read -r ID; do openstack server migrate $ID; done
```

Show migrations

```console
openstack server migration list --host $HOST --changes-since 2025-04-15
```

and confirm resize for all finished migrations individually

```console
openstack server resize confirm #SERVER
```

Check for remaining nodes in unmigratables states

```console
osism manage compute list $HOST
```

Apply package upgrades

```console
osism apply upgrade-packages -e ireallymeanit=yes --limit $HOST
```

Optionally reboot the node

```console
osism apply reboot -e ireallymeanit=yes -e reboot_wait=yes --limit $HOST
```

Re-enable the compute node

```console
osism manage compute enable $HOST
```
