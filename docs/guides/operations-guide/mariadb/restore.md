---
sidebar_label: Restore
sidebar_position: 20
---

# MariaDB Restore

This guide covers restoring an existing MariaDB/Galera cluster to an earlier state,
from a full backup or from a full plus one incremental backup. The steps are the
same either way; the increment is named alongside the full in step 1. A restore
replaces database state across the cluster and requires an outage. It does not restore instance disks, volumes or other service data.
Records created after the backup disappear; records deleted after it return,
potentially without their backing resources. Reconcile database and service
state before returning to use; step 5 sets out what that involves.

Taking backups, and which host holds them, are covered in [MariaDB
Backup](./backup.mdx).

## Restore a backup

Before you start, gather:

* The MariaDB inventory hosts and their count. On the **manager**,
  `osism get hosts -l mariadb` lists them. Note the count: step 5 needs the number
  of members from before the outage, and a degraded cluster cannot tell you what it
  was.
* The full archive to restore — the `.gz` file, for example
  `mysqlbackup-19-09-2026-1789827265.qp.xbc.xbs.gz`. In the backup volume it sits
  inside a `full-<date>-<timestamp>` directory.
* The **restore node**: the backup host — identified as in [The backup
  host](./backup.mdx#the-backup-host).
* `database_password`, which step 5 needs on each MariaDB node. Read it from
  the OSISM vault on the **manager**:

  ```bash
  osism vault view environments/kolla/secrets.yml
  ```

Run `osism` commands on the **manager** and archive/copy commands on the
**restore node**. Keep the restore-node shell open for `IMAGE` and `ARCHIVE`.

### 1. Extract and prepare — restore node, before the outage

Everything below reads the archives from inside the `mariadb_backup` volume, under
`/backup/`. Only the `.gz` files are used — the directories they were written in play
no part in the restore, and an increment's file name ends in the name of its full, so
a pair stays matchable without them. If your copy is in off-host storage, copy the
file or files into the volume, on the **restore node**:

```bash
sudo cp /path/to/mysqlbackup-19-09-2026-1789827265.qp.xbc.xbs.gz \
    "$(docker volume inspect mariadb_backup -f '{{.Mountpoint}}')/"
```

It is then `/backup/mysqlbackup-19-09-2026-1789827265.qp.xbc.xbs.gz` inside the
container, which is what `ARCHIVE` is set to below.

Confirm that this host holds backups, and list them:

```bash
docker volume inspect mariadb_backup >/dev/null &&
IMAGE=$(docker inspect --format '{{.Image}}' mariadb) &&
docker run --rm -v mariadb_backup:/backup:ro "$IMAGE" sh -c '
    test -s /backup/last_full_file &&
    test -d "$(dirname "$(cat /backup/last_full_file)")" &&
    find /backup -maxdepth 2 -type f -ls'
```

The two tests are what make this a check. Mounting a named volume that does not
exist creates it, empty, so the volume's presence proves nothing. `last_full_file`
is written only by a backup that succeeded — but nothing removes it afterwards, so
it can outlive the archive it names; the second test is what catches that.

Set `ARCHIVE` to the selected full archive's absolute path **inside the
container**, beginning with `/backup/`. Replace this example with the actual
path; do not automatically accept the one `last_full_file` names.

```bash
ARCHIVE='/backup/full-<date>-<timestamp>/mysqlbackup-<date>-<timestamp>.qp.xbc.xbs.gz'
INCREMENT=
```

If you are restoring to an incremental backup, set `INCREMENT` to it as well. Apply
exactly **one**: every increment is taken against its full rather than against the
increment before it.

Copy the path from the listing above rather than typing it. An increment's file name
ends with the file name of the full it was taken against, and that must be the full
you set as `ARCHIVE`:

```bash
INCREMENT='/backup/incr-12-08-54-27-09-2026-since-27-09-2026-1790510748/incremental-12-08-54-27-09-2026-mysqlbackup-27-09-2026-1790510748.qp.xbc.xbs.gz'
```

Here it ends in `mysqlbackup-27-09-2026-1790510748`, the full's file name. A
mismatched pair does not restore: the prepare fails with `This incremental backup
seems not to be proper for the target`, having already begun modifying the prepared
copy, so clear `/backup/restore` before trying again.

:::warning An archive named `backup-full-*.mbs.gz` is not a restore point

That name means a broken backup path wrote it, and no check afterwards can show the
copy is consistent. Choose a different archive. If it is the only one you have,
treat recovering from it as salvage rather than a restore, and read [Checking an
archive you already have](./connection-fix.md#checking-an-archive-you-already-have)
first.

:::

Check free space first. `mariadb_backup` is a plain Docker volume — a directory under
`/var/lib/docker` with no size of its own — so what matters is the filesystem holding
`/var/lib/docker`, usually the root filesystem:

```bash
df -h /var/lib/docker
```

The archive is compressed, and how far it expands depends on what the database holds, so
its own size is a poor guide. Measure instead — this decompresses it and counts, without
writing it anywhere:

```bash
docker run --rm -v mariadb_backup:/backup:ro "$IMAGE" sh -c "gunzip -c '$ARCHIVE' | wc -c"
```

That figure is what extraction will occupy. Preparation then works in place and does not
need extra space. With an increment, run it for that archive too and budget for both —
they are extracted side by side.

The block below extracts the archive into `/backup/restore/full`, runs
`mariabackup --prepare` over it, applies `INCREMENT` if you set one, and leaves a
`prepared` marker that step 3 checks for.
It refuses to start if the archive is empty or if `/backup/restore` already exists — if
it does, find out whether it belongs to an earlier attempt at this restore before
removing it.
It does not mount the live database.

```bash
docker run --rm -v mariadb_backup:/backup "$IMAGE" \
    /bin/bash -euo pipefail -c '
        test -s "$1"
        mkdir /backup/restore
        mkdir /backup/restore/full
        gunzip -c -- "$1" | mbstream -x -C /backup/restore/full
        mariabackup --prepare --target-dir /backup/restore/full
        if [ -n "${2:-}" ]; then
            test -s "$2"
            mkdir /backup/restore/incr
            gunzip -c -- "$2" | mbstream -x -C /backup/restore/incr
            mariabackup --prepare --target-dir /backup/restore/full \
                        --incremental-dir /backup/restore/incr
        fi
        touch /backup/restore/prepared
    ' bash "$ARCHIVE" "${INCREMENT:-}"
```

On success the last line is `completed OK!` from `--prepare`, and the `prepared` marker
is written. On failure the block exits non-zero and writes no marker, and step 3 refuses
to run without one, so a failed prepare cannot be restored from by accident.

It does leave the scratch directory behind, holding as much as the extracted database,
and the block refuses to run over one that exists. Clear it before trying again:

```bash
docker run --rm -v mariadb_backup:/backup "$IMAGE" rm -rf /backup/restore
```

Crash-recovery messages during prepare are normal, and `io_uring_queue_init() failed
with EPERM` can be followed by a successful fallback.

### 2. Stop MariaDB — manager

On the **manager**:

```bash
osism apply -a stop mariadb
```

### 3. Replace the data — restore node only

**This deletes this node's current database.** Confirm you are on the recorded
restore node and that step 2 succeeded. The marker below only
confirms that a preparation block finished — one left by an earlier attempt looks
identical — so confirm step 1 succeeded in this attempt.

```bash
docker run --rm --volumes-from mariadb --name dbrestore \
    -v mariadb_backup:/backup "$IMAGE" /bin/bash -euc '
        test -f /backup/restore/prepared
        rm -rf /var/lib/mysql/* /var/lib/mysql/.[!.]* /var/lib/mysql/..?*
        mariabackup --copy-back --target-dir /backup/restore/full
    '
```

Require a successful exit and `completed OK!`. If copy-back fails, leave the
cluster stopped and investigate; do not run recovery on partial data.

### 4. Recover from the restored node — manager

Replace the placeholder with the **inventory name of the node used in step 3**:

```bash
osism apply mariadb-recovery -e 'mariadb_recover_inventory_name=<restore-node-inventory-name>'
```

:::warning Always name the restore node

Left to choose, recovery picks the node with the highest Galera sequence number
— which is usually *not* the one you restored. It then synchronizes the others
to that node, discarding the restore and resurrecting the data you just
replaced. The cluster comes back healthy and wrong, which is harder to notice
than an outright failure.

:::

The other members synchronize to the restored state, so they lose post-backup
changes too, and their data directories are replaced by transfer from the
restore node. That transfer scales with the size of the database and can
dominate the outage.

Recovery can be quiet while nodes start and synchronize. On the **restore
node**, follow it with:

```bash
sudo grep -E "Bootstrapping a new cluster|State transfer to" \
    /var/log/kolla/mariadb/mariadb.log | tail
```

The restore node logs `Bootstrapping a new cluster`, then `State transfer to
<member> complete.` as it overwrites each other member from the restored data.
Expect one line more than there are other members: the play restarts the restore
node at the end, and it then takes a transfer back from a peer. Use this to see that
progress is happening, not to decide when recovery is finished — step 5 is what
establishes that.

The log survives the restore. Judge new entries by their timestamps: old
shutdown lines or no new lines do not establish a failure. Require the recovery
play to succeed, then verify the cluster. OpenStack services normally reconnect
without restarting.

:::warning If the restored node will not start

`[ERROR] Found 1 prepared transactions! ... Aborting` on the restore node means
the archive was taken with the backup lock on the wrong node — see [MariaDB backup
connection fix](./connection-fix.md). `--prepare` reports `completed OK!` on such
an archive, so step 1 cannot have warned you.

The other members still hold their pre-restore data: the play waits for the
restored node to come up and fails there, before it restarts any of them. So
recovery with no node named will pick one of those members and bring the cluster
back on the data you were replacing — abandoning the restore, but keeping the
cloud:

```bash
osism apply mariadb-recovery
```

Re-running recovery on the restored node fails the same way and changes nothing.
If you need this archive rather than the cluster, recover the archive first.

:::

### 5. Verify before returning to service

Run this on **every MariaDB node**, entering `database_password` at the
prompt. It queries the node directly, so it bypasses the load balancer:

```bash
docker exec -it mariadb mariadb -uroot -p -N -B -e \
    "show status where variable_name in ('wsrep_cluster_size',
     'wsrep_cluster_status','wsrep_local_state_comment')"
```

Every node must report the **member count recorded before the outage**,
`Primary` and `Synced`. Do not derive the expected count from the first node's
answer: API success alone cannot detect a separate single-member Primary.

On the **manager**, check service reads and a write with admin credentials:

```bash
export OS_CLOUD=admin
openstack endpoint list
openstack user list
openstack image list
openstack flavor list
openstack network list
PROBE_ID=$(openstack network create "restore-check-$(date +%s)" -f value -c id) &&
    openstack network delete "$PROBE_ID"
```

Require each command to succeed.

Finally, exercise your normal workload smoke test: for example, boot from an
image-backed volume, attach a floating IP, test connectivity and clean up.
Use deployment-specific resources and allow the test traffic in the instance's
security group. Resolve failures before reopening the cloud to clients.

#### Reconcile the backing stores

The restore moved only MariaDB, so the database is now out of step with every
other store — OVN, Ceph, the hypervisors — in **both** directions. This is part
of returning to service, not a follow-up
task, and neither direction is visible through the API:

* **Records whose resources are gone.** List what the restored database claims —
  networks, routers, ports, volumes, images, instances — and confirm each
  against its backing store. A network can report `ACTIVE` with no logical
  switch behind it; the status field is not evidence. Decide per resource: a
  stale network record can be removed and recreated, but a volume or instance
  record may be the only remaining trace of something, so establish what is
  recoverable before removing anything.
* **Resources whose records are gone.** Anything created after the backup kept
  what it built and lost its row. No API call will list these, because nothing
  references them, and they hold capacity until someone looks. Enumerate each
  backing store directly — OVN logical switches and routers, RBD images in each
  Ceph pool, instance domains on the hypervisors — and compare against the
  restored database.

Reopen the cloud only once both directions have been reconciled.

### 6. Remove the scratch copy — restore node

After verification, reclaim the uncompressed database's space:

```bash
docker run --rm -v mariadb_backup:/backup "$IMAGE" rm -rf /backup/restore
```

If you copied an archive into the volume at the start of step 1, remove that too —
the prune script only works on the `full-*`, `incr-*` and `incomplete-*` directories
the backup script creates, so a loose archive at the root of the volume stays there
for good, on the filesystem that must not fill:

```bash
docker run --rm -v mariadb_backup:/backup "$IMAGE" \
    rm -f /backup/mysqlbackup-<date>-<timestamp>.qp.xbc.xbs.gz \
          /backup/incremental-<time>-mysqlbackup-<date>-<timestamp>.qp.xbc.xbs.gz
```

Archives the backup script itself wrote are inside `full-*` directories and are the
prune script's business; leave them alone.
