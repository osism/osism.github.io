---
sidebar_label: OpenStack
sidebar_position: 20
---

# OpenStack

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
