---
sidebar_label: MariaDB Recovery
---

# MariaDB Recovery

When every member of the MariaDB/Galera cluster has stopped but its data is
intact, for example after a power outage, the cluster has to be brought back
from the member with the most recent data.

## Before you start

On the **manager**, gather:

* The MariaDB inventory hosts and their count. Note the count: the check at the
  end compares against it.

  ```bash
  osism get hosts -l mariadb
  ```

* `database_password`, which the check prompts for on each MariaDB node:

  ```bash
  osism vault view environments/kolla/secrets.yml
  ```

## Recover the cluster

On the **manager**:

```bash
osism apply mariadb-recovery
```

The play starts the cluster from the member with the highest Galera sequence
number and joins the others to it.

## Verify

Run this on **every MariaDB node**, entering `database_password` at the prompt.
It queries the node directly, so it bypasses the load balancer:

```bash
docker exec -it mariadb mariadb -uroot -p -N -B -e \
    "show status where variable_name in ('wsrep_cluster_size',
     'wsrep_cluster_status','wsrep_local_state_comment')"
```

Every node must report the **member count gathered above**, `Primary` and
`Synced`. Do not derive the expected count from the first node's answer: API
success alone cannot detect a separate single-member Primary.

On the **manager**, check service reads and a write with admin credentials:

```bash
export OS_CLOUD=admin
openstack endpoint list
openstack user list
openstack image list
openstack flavor list
openstack network list
PROBE_ID=$(openstack network create "recovery-check-$(date +%s)" -f value -c id) &&
    openstack network delete "$PROBE_ID"
```

Require each command to succeed.
