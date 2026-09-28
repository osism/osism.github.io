---
sidebar_label: MariaDB Backup & Restore
sidebar_key: operations-guide-mariadb
---

# MariaDB Backup & Restore

Backups of the OpenStack control plane database, and restoring one to
an existing MariaDB/Galera cluster.

These pages cover a deployment with a **single MariaDB shard**, which is the
default. A sharded deployment runs several independent Galera clusters, and
neither the backup host selection nor the restore procedure below has been tested
against one.

* [Backup](./backup.mdx) — which host holds the archives, how to take one, and
  how to schedule and prune them. OSISM schedules no backups and removes no old
  ones; both are yours, and they belong together.
* [Restore](./restore.md) — restoring in six steps, from a full backup or from a
  full plus one increment. A restore replaces database state on every member and
  requires an outage.
* [Connection fix](./connection-fix.md) — a defect up to and including OSISM
  10.2.0 that lets a backup lock one node while copying another, with nothing
  reporting an error. Settle it before relying on backups.
