---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

## Reset

Sometimes it is necessary to reset the entire manager service.

:::warning

This is a disruptive action. Data is lost in the course of the process.
For example, the database of the ARA service.

:::

```
sudo systemctl stop docker-compose@manager.service
docker compose --project-directory /opt/manager down -v
sudo systemctl start docker-compose@manager.service
```

After starting the manager service, the inventory and the fact cache
must be rebuilt.

```
osism reconciler sync
osism apply facts
```

If Ceph is used, the Ceph keys should also be re-provisioned within
the manager service.

```
osism apply ceph-fetch-keys
```
