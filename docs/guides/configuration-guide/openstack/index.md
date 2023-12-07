---
sidebar_label: OpenStack
sidebar_position: 50
---

# OpenStack

## Network interfaces

**Parameter**                  | **Default**                                                            | **Description**
-------------------------------|------------------------------------------------------------------------|----------------
`network_interface`            | `eth0`                                                                 |
`neutron_external_interface`   | `{{ network_interface }}`                                              |
`kolla_external_vip_interface` | `{{ network_interface }}`                                              |
`api_interface`                | `{{ network_interface }}`                                              |
`migration_interface`          | `{{ api_interface }}`                                                  |
`tunnel_interface`             | `{{ network_interface }}`                                              |
`octavia_network_interface`    | `{{ 'o-hm0' if octavia_network_type == 'tenant' else api_interface }}` |
`dns_interface`                | `{{ network_interface }}`                                              |
`dpdk_tunnel_interface`        | `{{ neutron_external_interface }}`                                     |
`ironic_http_interface`        | `{{ api_interface }}`                                                  |
`ironic_tftp_interface`        | `{{ api_interface }}`                                                  |

## Customization of the service configurations

:::info

The following content is based on the [kolla-ansible uptream documentation](https://docs.openstack.org/kolla-ansible/latest/admin/advanced-configuration.html#openstack-service-configuration-in-kolla).

:::

OSISM will generally look for files in `environments/kolla/files/overlays/CONFIGFILE`,
`environments/kolla/files/overlays/SERVICENAME/CONFIGFILE` or `environments/kolla/files/overlays/SERVICENAME/HOSTNAME/CONFIGFILE`
in the configuration repository. These locations sometimes vary and you should check the config task in the appropriate
Ansible role for a full list of supported locations. For example, in the case of `nova.conf` the following locations are
supported, assuming that you have services using `nova.conf` running on hosts called ctl1, ctl2 and ctl3:

* `environments/kolla/files/overlays/nova.conf`
* `environments/kolla/files/overlays/nova/ctl1/nova.conf`
* `environments/kolla/files/overlays/nova/ctl2/nova.conf`
* `environments/kolla/files/overlays/nova/ctl3/nova.conf`
* `environments/kolla/files/overlays/nova/nova-scheduler.conf`

Using this mechanism, overrides can be configured per-project (Nova), per-project-service (Nova scheduler service) or
per-project-service-on-specified-host (Nova servies on ctl1).

Overriding an option is as simple as setting the option under the relevant section. For example, to set
override `scheduler_max_attempts` in the Nova scheduler service, the operator could create
`environments/kolla/files/overlays/nova/nova-scheduler.conf` in the configuration repository with this content:

```ini
[DEFAULT]
scheduler_max_attempts = 100
```

If the operator wants to configure compute node cpu and ram allocation ratio on host com1, the operator needs to
create the file  `environments/kolla/files/overlays/nova/com1/nova.conf` with this content:

```ini
[DEFAULT]
cpu_allocation_ratio = 16.0
ram_allocation_ratio = 5.0
```

This method of merging configuration sections is supported for all services using [oslo.config](https://docs.openstack.org/oslo.config/latest/),
which includes the vast majority of OpenStack services, and in some cases for services using YAML configuration.
Since the INI format is an informal standard, not all INI files can be merged in this way. In these cases OSISM supports
overriding the entire config file.

Additional flexibility can be introduced by using Jinja conditionals in the config files. For example, you may create
Nova cells which are homogeneous with respect to the hypervisor model. In each cell, you may wish to configure the
hypervisors differently, for example the following override shows one way of setting the `bandwidth_poll_interval`
variable as a function of the cell:

```ini
[DEFAULT]
{% if 'cell0001' in group_names %}
bandwidth_poll_interval = 100
{% elif 'cell0002' in group_names %}
bandwidth_poll_interval = -1
{% else %}
bandwidth_poll_interval = 300
{% endif %}
```

An alternative to Jinja conditionals would be to define a variable for the `bandwidth_poll_interval` and set
it in according to your requirements in the inventory group or host vars:

```ini
[DEFAULT]
bandwidth_poll_interval = {{ bandwidth_poll_interval }}
```

OSISM allows the operator to override configuration globally for all services. It will look for a file
called `environments/kolla/files/overlays/global.conf` in the configuration repository.

For example to modify database pool size connection for all services, the operator needs to create
`environments/kolla/files/overlays/global.conf` in the configuration repository with this content:

```ini
[database]
max_pool_size = 100
```

## How does the configuration get into services?

It is explained with example of OpenSearch Service how the configuration for OpenSearch
is created and gets into the container.

* The task [Copying over opensearch service config file](https://github.com/openstack/kolla-ansible/blob/master/ansible/roles/opensearch/tasks/config.yml)
  merges the individual sources of the files.

  ```yaml title="Copying over opensearch service config file task"
  - name: Copying over opensearch service config file
    merge_yaml:
      sources:
        # highlight-start
	- "{{ role_path }}/templates/opensearch.yml.j2"
	- "{{ node_custom_config }}/opensearch.yml"
	- "{{ node_custom_config }}/opensearch/opensearch.yml"
	- "{{ node_custom_config }}/opensearch/{{ inventory_hostname }}/opensearch.yml"
        # highlight-end
      dest: "{{ node_config_directory }}/opensearch/opensearch.yml"
      mode: "0660"
    become: true
    when:
      - inventory_hostname in groups['opensearch']
      - opensearch_services['opensearch'].enabled | bool
    notify:
      - Restart opensearch container
  ```

* As a basis a template [opensearch.yml.j2](https://github.com/openstack/kolla-ansible/blob/master/ansible/roles/opensearch/templates/opensearch.yml.j2)
  is used which is part of the OpenSearch service role.

  ```yaml title="opensearch.yml.j2 template"
  {% set num_nodes = groups['opensearch'] | length %}
  {% set recover_after_nodes = (num_nodes * 2 / 3) | round(0, 'floor') | int if num_nodes > 1 else 1 %}
  plugins.security.disabled: "true"

  node.name: "{{ 'api' | kolla_address | put_address_in_context('url') }}"
  network.host: "{{ 'api' | kolla_address | put_address_in_context('url') }}"

  cluster.name: "{{ opensearch_cluster_name }}"
  cluster.initial_master_nodes: [{% for host in groups['opensearch'] %}"{{ 'api' | kolla_address(host) }}"{% if not loop.last %},{% endif %}{% endfor %}]
  node.master: true
  node.data: true
  discovery.seed_hosts: [{% for host in groups['opensearch'] %}"{{ 'api' | kolla_address(host) | put_address_in_context('url') }}"{% if not loop.last %},{% endif %}{% endfor %}]

  http.port: {{ opensearch_port }}
  gateway.expected_nodes: {{ num_nodes }}
  gateway.recover_after_time: "5m"
  gateway.recover_after_nodes: {{ recover_after_nodes }}
  path.data: "/var/lib/opensearch/data"
  path.logs: "/var/log/kolla/opensearch"
  indices.fielddata.cache.size: 40%
  action.auto_create_index: "true"
  ```

* For OpenSearch, overlay files can additionally be stored in 3 places in the configuration repository.

  * `environments/kolla/files/overlays/opensearch.yml`
  * `environments/kolla/files/overlays/opensearch/opensearch.yml`
  * `environments/kolla/files/overlays/opensearch/{{ inventory_hostname }}/opensearch.yml`

  When merging files, the last file found has the most weight. If there is a parameter `node.master: true`
  in the service role template `opensearch.yml.j2` of the OpenSearch service and you set e.g.
  `node.master: false` in `environments/kolla/files/overlays/opensearch.yml` then accordingly in the finished `opensearch.yml`
  `node.master: false` is used.

* After the merge the task `Copying over opensearch service config file` copies the content into the
  configuration directory `/etc/kolla/opensearch` of the service.

  ```yaml title="/etc/kolla/opensearch/opensearch.yml"
  action.auto_create_index: 'true'
  cluster.initial_master_nodes:
  - 192.168.16.10
  cluster.name: kolla_logging
  discovery.seed_hosts:
  - 192.168.16.10
  gateway.expected_nodes: 1
  gateway.recover_after_nodes: 1
  gateway.recover_after_time: 5m
  http.port: 9200
  indices.fielddata.cache.size: 40%
  network.host: 192.168.16.10
  node.data: true
  node.master: true
  node.name: 192.168.16.10
  path.data: /var/lib/opensearch/data
  path.logs: /var/log/kolla/opensearch
  plugins.security.disabled: 'true'
  ```

* The configuration directory `/etc/kolla/opensearch` is mounted in each container of the OpenSearch service
  to `/var/lib/kolla/config_files`.

  ```json title="Output of docker inspect opensearch"
  "Mounts": [
      {
          "Type": "bind",
          // highlight-start
          "Source": "/etc/kolla/opensearch",
          "Destination": "/var/lib/kolla/config_files",
          // highlight-end
          "Mode": "rw",
          "RW": true,
          "Propagation": "rprivate"
      },
  ```

* Entrypoint of a service is always [kolla_start](https://github.com/openstack/kolla/blob/master/docker/base/start.sh).
  This script calls a script [set_configs.py](https://github.com/openstack/kolla/blob/master/docker/base/set_configs.py).
  This script takes care of copying files from `/var/lib/kolla/config_files` to the right place inside the container.
  For this purpose, the container has a
  [config.json](https://github.com/openstack/kolla-ansible/blob/master/ansible/roles/opensearch/templates/opensearch.json.j2)
  in which the individual actions are configured.

  The file `/var/lib/kolla/config_files/opensearch.yml` is copied to `/etc/opensearch/opensearch.yml`.

  The permissions of `/var/lib/opensearch` and `/var/log/kolla/opensearch` are set accordingly.

  ```json title="/etc/kolla/opensearch/config.json"
  {
      "command": "/usr/share/opensearch/bin/opensearch",
      "config_files": [
          {
              // highlight-start
              "source": "/var/lib/kolla/config_files/opensearch.yml",
              "dest": "/etc/opensearch/opensearch.yml",
              "owner": "opensearch",
              "perm": "0600"
              // highlight-end
          }
      ],
      "permissions": [
          {
              // highlight-start
              "path": "/var/lib/opensearch",
              "owner": "opensearch:opensearch",
              "recurse": true
              // highlight-end
          },
          {
              // highlight-start
              "path": "/var/log/kolla/opensearch",
              "owner": "opensearch:opensearch",
              "recurse": true
              // highlight-end
          }
      ]
  }
  ```

* In the `config.json` of the service is also defined the command which will be executed after finishing the preparations.
  In the case of OpenSearch this is `/usr/share/opensearch/bin/opensearch`.

  ```json title="/etc/kolla/opensearch/config.json"
  {
      // highlight-start
      "command": "/usr/share/opensearch/bin/opensearch",
      // highlight-end
      "config_files": [
          {
              "source": "/var/lib/kolla/config_files/opensearch.yml",
              "dest": "/etc/opensearch/opensearch.yml",
              "owner": "opensearch",
              "perm": "0600"
          }
      ],
      "permissions": [
          {
              "path": "/var/lib/opensearch",
              "owner": "opensearch:opensearch",
              "recurse": true
          },
          {
              "path": "/var/log/kolla/opensearch",
              "owner": "opensearch:opensearch",
              "recurse": true
          }
      ]
  }
  ```
