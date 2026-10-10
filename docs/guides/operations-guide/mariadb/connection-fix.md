---
sidebar_label: Connection fix
sidebar_position: 30
---

# MariaDB backup connection fix

On deployments running kolla-ansible built before 2026-08-25 — which includes
**every OSISM release up to and including 10.2.0** — Mariabackup copies the data
directory of `mariadb_backup_host` but makes its control connection through the
internal API address, `kolla_internal_vip_address`, and therefore to whichever
node the load balancer sends it to.

That address is a keepalived VIP held by one control node in an L2 setup, or an
anycast address that every control node announces in a BGP setup such as the
[CloudPod network](../../../concepts/cluster-network.md#cloudpod-network). The
defect is the same in both: the connection reaches HAProxy, which sends it to
the first MariaDB member in inventory order.

When that member is `mariadb_backup_host` nothing goes wrong. They differ when
`mariadb_backup_host` has been moved, when a failover has moved database
traffic, or when the backup runs kolla's `replica` script, which connects to a
different member by design — and then the backup is taken against one node while
another node's files are copied.

On MariaDB **10.11.19 and 11.4.13** and later the mismatch is no longer tolerated
and the backup fails outright with a redo log error. OSISM 10.2.0 ships 10.11.18,
where it stays silent.

## What this breaks

**The recorded restore point belongs to another node.** Galera binary logs are
per-node, so the position the archive records does not correspond to the data it
contains, and the archive cannot serve as a point-in-time recovery base.

**The copy is taken without the backup lock that makes it consistent.** Such an
archive may not restore at all.

## Is this deployment affected?

Yes, if it runs **OSISM 10.2.0 or earlier**. The fix landed in kolla-ansible on
2026-08-25, after 10.2.0 was cut; every release since carries it.

That depends on the release alone. How the deployment is set up decides whether
the defect has produced a bad archive yet, not whether it is there — and a
failover can change that without warning.

### Is the fix already in place?

The rendered backup configuration shows where the control connection points. On
the host that is currently `mariadb_backup_host`:

```bash
sudo grep '^host' /etc/kolla/mariabackup/my.cnf
```

Compare it with the internal API address, on the **manager**:

```bash
grep kolla_internal_vip_address /opt/configuration/environments/kolla/configuration.yml
```

**If the two match, the fix is not in place** — the backup connects through the load
balancer. If they differ, the address is the node's own and the connection is pinned
to the host whose files are copied, which is what the fix does, whether it came from
the overlay below or from kolla itself past 10.2.0.

Compare against `kolla_internal_vip_address` rather than against the node's own
address: the backup host often carries it too — always, if it is an anycast address —
so `hostname -I` lists both and settles nothing.

## Applying the fix

Pin the control connection to the backed-up node itself. In the [configuration repository](../../configuration-guide/configuration-repository.md),
create an **overlay** — a file under `files/overlays/` that kolla merges into
the configuration it generates — at
`environments/kolla/files/overlays/backup.my.cnf`:

```ini title="environments/kolla/files/overlays/backup.my.cnf"
[client]
host={{ api_interface_address }}
```

Because it is merged rather than substituted, the user and password stay as
kolla generated them and you do not repeat them here. The Jinja is evaluated, so
`api_interface_address` resolves to the address of whichever node runs the
backup.

Then set in `environments/kolla/configuration.yml`:

```yaml title="environments/kolla/configuration.yml"
mariadb_backup_target: active
```

`mariadb_backup_target` chooses which of kolla's two backup scripts runs, and
`active` selects the one that connects to the node whose files it copies.

Commit both changes to the configuration repository, push them, and apply:

```bash
osism apply configuration
osism apply -a reconfigure mariadb
```

Both commands are needed: the first brings the pushed change to the manager, the
second renders the backup configuration from it. `osism apply configuration`
replaces `/opt/configuration` with what it finds at the origin, so a change made
only on the manager is discarded rather than applied — see [Synchronizing the
configuration
repository](../../configuration-guide/configuration-repository.md#synchronizing-the-configuration-repository).

This does not restart the database. The overlay is merged into
`/etc/kolla/mariabackup/my.cnf`, which only the backup container reads; the
running MariaDB service is configured from `/etc/kolla/mariadb/` and is left
untouched. No maintenance window is needed for this change.

## Checking an archive you already have

Applying the fix does not repair archives taken before it. Take a fresh full backup
once the fix is in place, and treat everything older as unreliable — delete it if you
do not need it.

If you must rely on an older archive, it is identifiable, but only from an extracted
and prepared copy — the state that
[step 1 of the restore](./restore.md#1-extract-and-prepare--restore-node-before-the-outage)
produces. With that copy in place, on the node holding it:

```bash
IMAGE=$(docker inspect --format '{{.Image}}' mariadb)
docker run --rm -v mariadb_backup:/backup:ro "$IMAGE" /bin/bash -euc '
    cat /backup/restore/full/*binlog_info
    cat /backup/restore/full/xtrabackup_binlog_pos_innodb
'
```

Compare the binary log file name and offset, ignoring a leading `./` and any trailing
GTID field.

**If the two name different files, the archive is not a valid restore point.** The lock
and the copy were on different nodes, so the copied files were never quiesced. Do not
restore from it. Missing output is a failure too, not a pass.

To try another archive, clear the scratch directory first — step 1 refuses to run over
one that already exists:

```bash
docker run --rm -v mariadb_backup:/backup "$IMAGE" rm -rf /backup/restore
```

If one archive from a deployment is affected, expect others taken in the same period to
be affected too; check each before relying on it.

**This check is evidence, not a guarantee, which is why it is not a substitute for
applying the fix.** An affected archive can restore cleanly and still record another
node's position, so a restore that succeeds tells you about that one archive at that
one moment and nothing about the next one.

## Undoing the change

There is one reason to undo this: the deployment has been upgraded past OSISM
10.2.0 and now carries the upstream fix. Kolla pins the connection itself from
then on and `mariadb_backup_target` is no longer read, so the overlay only
duplicates what is already there. Removing it is housekeeping — leaving it does
no harm, so there is no need to do this during the upgrade.

Revert the commit that applied the fix, and apply the change the same way you
applied it. The commit is the one that added the overlay file:

```bash
git log --oneline -- environments/kolla/files/overlays/backup.my.cnf
git revert <commit>
git push

osism apply configuration
osism apply -a reconfigure mariadb
```

If the overlay and the `mariadb_backup_target` line were committed separately,
revert both. `git log --oneline -S mariadb_backup_target --
environments/kolla/configuration.yml` finds the second one.
