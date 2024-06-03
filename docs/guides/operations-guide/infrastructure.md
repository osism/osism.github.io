---
sidebar_label: Infrastructure
---

# Infrastructure

## MariaDB

### Backup

[Mariabackup](https://mariadb.com/kb/en/mariabackup-overview/)  is used to create backups
of MariaDB.

* Full backup

  ```
  osism apply mariadb_backup
  ```

* Incremental backup (supported as of OSISM 7.0.6)

  ```
  osism apply mariadb_backup -e mariadb_backup_type=incremental
  ```

There is a Docker volume `mariadb_backup` on the 1st control node. The backups
are stored in this volume.

```
$ docker run --rm -v mariadb_backup:/backup -it ubuntu:22.04 bash -c 'ls -la /backup'
total 9728
drwxr-xr-x 2 42434 42434    4096 Jun  3 18:46 .
drwxr-xr-x 1 root  root     4096 Jun  3 18:47 ..
-rw-r--r-- 1 42434 42434 4530618 Jun  3 18:46 incremental-18-mysqlbackup-03-06-2024-1717440409.qp.xbc.xbs.gz
-rw-r--r-- 1 42434 42434      11 Jun  3 18:45 last_full_date
-rw-r--r-- 1 42434 42434 5411763 Jun  3 18:45 mysqlbackup-03-06-2024-1717440342.qp.xbc.xbs.gz
```

### Restore

https://docs.openstack.org/kolla-ansible/latest/admin/mariadb-backup-and-restore.html#restoring-backups

### Recovery

```
osism apply mariadb_recovery
```

## Open Search

### Get all indices

```
$ curl https://api-int.testbed.osism.xyz:9200/_cat/indices?v
health status index                          uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   flog-2024.04.17                1rCP3NpUQSS5wmulCn6Y5g   1   1    1657832            0        1gb        654.4mb
green  open   .opensearch-observability      UnS2gFb-QhC8oIefL3C52Q   1   2          0            0       624b           208b
green  open   .plugins-ml-config             hMdzW6ooRMGZ_0OGcdNSgA   1   1          1            0      7.8kb          3.9kb
green  open   .opendistro-job-scheduler-lock fa_Io8bJQ8qfGII4DypxFg   1   1          1            3     51.1kb         35.1kb
green  open   .kibana_1                      v-aJ6ioSQsOwHQn_NNbeOg   1   1          0            0       416b           208b
```

### Delete an index

```
$ curl -X DELETE https://api-int.testbed.osism.xyz:9200/flog-2024.04.17
{"acknowledged":true}
```
