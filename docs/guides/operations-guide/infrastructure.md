---
sidebar_label: Infrastructure
---

# Infrastructure

## Loadbalancer

For the `manage-loadbalancer` play to work, the internal control socket
of the HAProxy service must be set to admin level. As of OSISM 7.0.6 this
is the default. Before this, the parameter `haproxy_socket_level_admin` must
be added to the configuration repository and then a reconfigure
(`osism apply -a reconfigure loadbalancer`) must be done for the loadbalancer
service.

```yaml title="environments/kolla/configuration.yml"
haproxy_socket_level_admin: "yes"
```

You can check in the HAProxy configuration whether the control socket is
configured correctly.

```ini title="/etc/kolla/haproxy/haproxy.cfg"
global
    [...]
    stats socket /var/lib/kolla/haproxy/haproxy.sock group kolla mode 660 level admin
```

* Disable the host `testbed-node-0` in all backends of the service `keystone`

  ```bash
  osism apply manage-loadbalancer \
    -e manage_loadbalancer_action=disable \
    -e manage_loadbalancer_service=keystone \
    -e manage_loadbalancer_host=testbed-node-0
  ```

* Enable the host `testbed-node-0` in all backends of the service `keystone`

  ```bash
  osism apply manage-loadbalancer \
    -e manage_loadbalancer_action=enable \
    -e manage_loadbalancer_service=keystone \
    -e manage_loadbalancer_host=testbed-node-0
  ```

* Disable the host `testbed-node-0` in all backends

  ```bash
  osism apply manage-loadbalancer \
    -e manage_loadbalancer_action=disable \
    -e manage_loadbalancer_service=all \
    -e manage_loadbalancer_host=testbed-node-0
  ```

* Enable the host `testbed-node-0` in all backends

  ```bash
  osism apply manage-loadbalancer \
    -e manage_loadbalancer_action=enable \
    -e manage_loadbalancer_service=all \
    -e manage_loadbalancer_host=testbed-node-0
  ```

## MariaDB

### Backup

[Mariabackup](https://mariadb.com/kb/en/mariabackup-overview/) is used to create backups
of MariaDB. For more details about backups, you can use the official
[kolla-ansible](https://docs.openstack.org/kolla-ansible/latest/admin/mariadb-backup-and-restore.html) documentation.

* Create a full backup

  ```bash
  osism apply mariadb_backup
  ```

* Create a incremental backup (supported as of OSISM 7.0.6)

  ```bash
  osism apply mariadb_backup -e mariadb_backup_type=incremental
  ```

* Accessing created backups

  There is a Docker volume `mariadb_backup` on the 1st control node. The backups
  are stored in this volume.
  (see also /var/lib/docker/volumes/mariadb_backup/)

  ```console
  $ docker run --rm -v mariadb_backup:/backup -it ubuntu:22.04 bash -c 'ls -la /backup'
  total 9728
  drwxr-xr-x 2 42434 42434    4096 Jun  3 18:46 .
  drwxr-xr-x 1 root  root     4096 Jun  3 18:47 ..
  -rw-r--r-- 1 42434 42434 4530618 Jun  3 18:46 incremental-18-mysqlbackup-03-06-2024-1717440409.qp.xbc.xbs.gz
  -rw-r--r-- 1 42434 42434      11 Jun  3 18:45 last_full_date
  -rw-r--r-- 1 42434 42434 5411763 Jun  3 18:45 mysqlbackup-03-06-2024-1717440342.qp.xbc.xbs.gz
  ```

Currently there is no official scheduling and housekeeping (disk space) for mariadb backups.
You can create a simple cronjob on the manager or use your enterprise backup software.

```bash
cat /etc/cron.d/mariadb_backup <<'EOF'
0 7 * * * dragon osism apply mariadb_backup |logger -t mariadb_backup
EOF
```

### Restore

* Stop all MariaDb Instances

  ```bash
  osism apply -s stop maria
  ```

* Follow the [restore procedure described in the kolla-ansible manual](https://docs.openstack.org/kolla-ansible/latest/admin/mariadb-backup-and-restore.html#restoring-backups)

* Execute the recovery procedure with the node name where you executed the recovery

  ```bash
  osism apply mariadb_recovery -e mariadb_recover_inventory_name=THE_NAME_OF_THE_RESTORE_NODE
  ```

### Recovery

If you stopped your mariadb galera cluster completely, you can use the following procedure
to start a recovery.

```bash
osism apply mariadb_recovery
```

### Create database & user

1. Create a custom play `playbook-database-sample.yml` in `environments/kolla` in
   the configuration repository.

   ```yaml
   ---
   - name: Manage sample database
     hosts: control

     vars:
       database_sample_username: sample
       database_sample_name: sample

     tasks:
       - name: Create sample database
         become: true
         kolla_toolbox:
           container_engine: "{{ kolla_container_engine }}"
           module_name: mysql_db
           module_args:
             login_host: "{{ database_address }}"
             login_port: "{{ database_port }}"
             login_user: "root"
             login_password: "{{ database_password }}"
             name: "{{ database_sample_name }}"
         run_once: true

       - name: Create sample user
         become: true
         kolla_toolbox:
           container_engine: "{{ kolla_container_engine }}"
           module_name: mysql_user
           module_args:
             login_host: "{{ api_interface_address }}"
             login_port: "{{ mariadb_port }}"
             login_user: "root"
             login_password: "{{ database_password }}"
             name: "{{ database_sample_username }}"
             password: "{{ database_sample_password }}"
             host: "%"
             priv: "{{ database_sample_name }}.*:ALL"
             append_privs: True
         run_once: true
   ```

2. Add secret `database_sample_password` in `environments/kolla/secrets.yml` in the
   configuration repository.

3. Commit the custom play and the secret. Sync the configuration on the manager
   node with `osism apply configuration`.

4. Run `osism apply xxx` on the manager node.

## Open Search

### Get all indices

```console
$ curl https://api-int.testbed.osism.xyz:9200/_cat/indices?v
health status index                          uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   flog-2024.04.17                1rCP3NpUQSS5wmulCn6Y5g   1   1    1657832            0        1gb        654.4mb
green  open   .opensearch-observability      UnS2gFb-QhC8oIefL3C52Q   1   2          0            0       624b           208b
green  open   .plugins-ml-config             hMdzW6ooRMGZ_0OGcdNSgA   1   1          1            0      7.8kb          3.9kb
green  open   .opendistro-job-scheduler-lock fa_Io8bJQ8qfGII4DypxFg   1   1          1            3     51.1kb         35.1kb
green  open   .kibana_1                      v-aJ6ioSQsOwHQn_NNbeOg   1   1          0            0       416b           208b
```

### Delete an index

```console
$ curl -X DELETE https://api-int.testbed.osism.xyz:9200/flog-2024.04.17
{"acknowledged":true}
```
