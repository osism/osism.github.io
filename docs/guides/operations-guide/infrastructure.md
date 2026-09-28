---
sidebar_label: Infrastructure
---

# Infrastructure

## Loadbalancer

For the `manage-loadbalancer` play to work, the internal control socket
of the HAProxy service must be set to admin level. This is the default.

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

Backing up the control plane database and restoring it are covered under
[MariaDB Backup & Restore](mariadb/index.md).

### Recovery

If you stopped your mariadb galera cluster completely, you can use the following procedure
to start a recovery.

```bash
osism apply mariadb-recovery
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
