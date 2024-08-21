---
sidebar_label: OpenStack
sidebar_position: 30
---

# OpenStack

## Image tags

Sometimes it is necessary to specify the image tag to be used for a specific service or a specific image of a service.
All available images and tags are listed in the [002-images-kolla.yml](https://github.com/osism/defaults/blob/main/all/002-images-kolla.yml)
file.

The image tags can be set in the `environments/kolla/images.yml` file.

* Use a specific tag for all images of a service:

  ```yaml title="environments/kolla/images.yml"
  barbican_tag: "2023.1"
  ```

* Use a specific tag for a specific image of a service:

  ```yaml title="environments/kolla/images.yml"
  barbican_worker_tag: "2023.1"
  ```

## Endpoints

### Public endpoints

The public endpoints used for the individual OpenStack services can be configured via the `public_endpoint` parameters.
These are defined as follows.

| Parameter                                  | Default value                                                                                        |
|:-------------------------------------------|:-----------------------------------------------------------------------------------------------------|
| aodh_public_endpoint                       | `aodh_external_fqdn \| kolla_url(public_protocol, aodh_api_public_port)`                             |
| blazar_public_endpoint                     | `blazar_external_fqdn \| kolla_url(public_protocol, blazar_api_public_port, '/v1')`                  |
| ceph_rgw_public_endpoint                   | `ceph_rgw_external_fqdn \| kolla_url(public_protocol, ceph_rgw_public_port, ceph_rgw_endpoint_path)` |
| cinder_v3_public_endpoint                  | `{{ cinder_public_base_endpoint }}/v3/%(tenant_id)s`                                                 |
| cloudkitty_public_endpoint                 | `cloudkitty_external_fqdn \| kolla_url(public_protocol, cloudkitty_api_public_port)`                 |
| cyborg_public_endpoint                     | `cyborg_external_fqdn \| kolla_url(public_protocol, cyborg_api_port, '/v2')`                         |
| gnocchi_public_endpoint                    | `gnocchi_external_fqdn \| kolla_url(public_protocol, gnocchi_api_public_port)`                       |
| heat_cfn_public_endpoint                   | `{{ heat_cfn_public_base_endpoint }}/v1`                                                             |
| heat_public_endpoint                       | `heat_external_fqdn \| kolla_url(public_protocol, heat_api_public_port, '/v1/%(tenant_id)s')`        |
| ironic_inspector_public_endpoint           | `ironic_inspector_external_fqdn \| kolla_url(public_protocol, ironic_inspector_public_port)`         |
| magnum_public_endpoint                     | `magnum_external_fqdn \| kolla_url(public_protocol, magnum_api_public_port, '/v1')`                  |
| manila_public_endpoint                     | `{{ manila_public_base_endpoint }}/v1/%(tenant_id)s`                                                 |
| manila_v2_public_endpoint                  | `{{ manila_public_base_endpoint }}/v2`                                                               |
| masakari_public_endpoint                   | `masakari_external_fqdn \| kolla_url(public_protocol, masakari_api_public_port)`                     |
| mistral_public_endpoint                    | `mistral_external_fqdn \| kolla_url(public_protocol, mistral_api_public_port, '/v2')`                |
| nova_legacy_public_endpoint                | `{{ nova_public_base_endpoint }}/v2/%(tenant_id)s`                                                   |
| nova_public_endpoint                       | `{{ nova_public_base_endpoint }}/v2.1`                                                               |
| placement_public_endpoint                  | `placement_external_fqdn \| kolla_url(public_protocol, placement_api_public_port)`                   |
| tacker_public_endpoint                     | `tacker_external_fqdn \| kolla_url(public_protocol, tacker_server_public_port)`                      |
| trove_public_endpoint                      | `trove_external_fqdn \| kolla_url(public_protocol, trove_api_public_port, '/v1.0/%(tenant_id)s')`    |
| venus_public_endpoint                      | `venus_external_fqdn \| kolla_url(public_protocol, venus_api_port)`                                  |
| watcher_public_endpoint                    | `watcher_external_fqdn \| kolla_url(public_protocol, watcher_api_public_port)`                       |
| zun_public_endpoint                        | `zun_external_fqdn \| kolla_url(public_protocol, zun_api_public_port, '/v1/')`                       |

Some of the previous default values refer to a `public_base_endpoint parameter`. These are defined as follows.

| Parameter                                 | Default value                                                                                  |
|:------------------------------------------|:-----------------------------------------------------------------------------------------------|
| cinder_public_base_endpoint               | `cinder_external_fqdn \| kolla_url(public_protocol, cinder_api_public_port)`                   |
| heat_cfn_public_base_endpoint             | `heat_cfn_external_fqdn \| kolla_url(public_protocol, heat_api_cfn_public_port)`               |
| manila_public_base_endpoint               | `manila_external_fqdn \| kolla_url(public_protocol, manila_api_public_port)`                   |
| nova_public_base_endpoint                 | `nova_external_fqdn \| kolla_url(public_protocol, nova_api_public_port)`                       |
| skyline_apiserver_public_base_endpoint    | `skyline_apiserver_external_fqdn \| kolla_url(public_protocol, skyline_apiserver_public_port)` |

### Example for the use of name-based endpoints

DNS records pointing to the `kolla_external_vip_address` are created in advance.

Additional configuration parameters to overwrite the public endpoints
are added in the `environments/kolla/configuration.yml` file. If certain services
are not used, they are removed. If other services are used, these are added (see the
table above).

```yaml title="environments/kolla/configuration.yml"
barbican_public_endpoint: https://barbican.services.a.regiocloud.tech
cinder_public_base_endpoint: https://cinder.services.a.regiocloud.tech
designate_public_endpoint: https://designate.services.a.regiocloud.tech
glance_public_endpoint: https://glance.services.a.regiocloud.tech
ironic_public_endpoint: https://ironic.services.a.regiocloud.tech
keystone_public_url: https://keystone.services.a.regiocloud.tech
manila_public_endpoint: https://manila.services.a.regiocloud.tech
neutron_public_endpoint: https://neutron.services.a.regiocloud.tech
nova_public_base_endpoint: https://nova.services.a.regiocloud.tech
octavia_public_endpoint: https://octavia.services.a.regiocloud.tech
placement_public_endpoint: https://placement.services.a.regiocloud.tech
```

Since we bind the `name_based_external_front` frontend to the same ports as the
`horizon_external_front`, the external Horizon frontend must be disabled. This is
only possible as of OSISM 7.0.6.

```yaml title="environments/kolla/configuration.yml"
haproxy_enable_horizon_external: false
```

Additional HAProxy configuration in `haproxy/services.d/haproxy.cfg` is required to map
the DNS records to the correct backends. Here too, unused services are removed or
additional services are added.

```none title="environments/kolla/files/overlays/haproxy/services.d/haproxy.cfg"
frontend name_based_external_front
    mode http
    http-request del-header X-Forwarded-Proto
    option httplog
    option forwardfor
    http-request set-header X-Forwarded-Proto https if { ssl_fc }
    bind {{ kolla_external_vip_address }}:80
    bind {{ kolla_external_vip_address }}:443 ssl crt /etc/haproxy/certificates/haproxy.pem
    default_backend horizon_back

    acl ACL_keystone.services.a.regiocloud.tech hdr(host) -i keystone.services.a.regiocloud.tech
    use_backend keystone_external_back if ACL_keystone.services.a.regiocloud.tech

    acl ACL_glance.services.a.regiocloud.tech hdr(host) -i glance.services.a.regiocloud.tech
    use_backend glance_api_external_back if ACL_glance.services.a.regiocloud.tech

    acl ACL_neutron.services.a.regiocloud.tech hdr(host) -i neutron.services.a.regiocloud.tech
    use_backend neutron_server_external_back if ACL_neutron.services.a.regiocloud.tech

    acl ACL_placement.services.a.regiocloud.tech hdr(host) -i placement.services.a.regiocloud.tech
    use_backend placement_api_external_back if ACL_placement.services.a.regiocloud.tech

    acl ACL_nova.services.a.regiocloud.tech hdr(host) -i nova.services.a.regiocloud.tech
    use_backend nova_api_external_back if ACL_nova.services.a.regiocloud.tech

    acl ACL_console.services.a.regiocloud.tech hdr(host) -i console.services.a.regiocloud.tech
    use_backend nova_novncproxy_external_back if ACL_console.services.a.regiocloud.tech

    acl ACL_designate.services.a.regiocloud.tech hdr(host) -i designate.services.a.regiocloud.tech
    use_backend designate_api_external_back if ACL_designate.services.a.regiocloud.tech

    acl ACL_cinder.services.a.regiocloud.tech hdr(host) -i cinder.services.a.regiocloud.tech
    use_backend cinder_api_external_back if ACL_cinder.services.a.regiocloud.tech

    acl ACL_octavia.services.a.regiocloud.tech hdr(host) -i octavia.services.a.regiocloud.tech
    use_backend octavia_api_external_back if ACL_octavia.services.a.regiocloud.tech

    acl ACL_swift.services.a.regiocloud.tech hdr(host) -i swift.services.a.regiocloud.tech
    use_backend swift_api_external_back if ACL_swift.services.a.regiocloud.tech

    acl ACL_ironic.services.a.regiocloud.tech hdr(host) -i ironic.services.a.regiocloud.tech
    use_backend ironic_api_external_back if ACL_ironic.services.a.regiocloud.tech
```

Additional Nova configuration in `nova.conf` is required to use the URL for the NoVNC service.

```ini title="environments/kolla/files/overlays/nova.conf"
[vnc]
novncproxy_base_url = https://console.services.a.regiocloud.tech/vnc_lite.html
```

## Network interfaces

| Parameter                      | Default                                                                | Description    |
|:-------------------------------|:-----------------------------------------------------------------------|:---------------|
| `network_interface`            | `eth0`                                                                 |                |
| `neutron_external_interface`   | `{{ network_interface }}`                                              |                |
| `kolla_external_vip_interface` | `{{ network_interface }}`                                              |                |
| `api_interface`                | `{{ network_interface }}`                                              |                |
| `migration_interface`          | `{{ api_interface }}`                                                  |                |
| `tunnel_interface`             | `{{ network_interface }}`                                              |                |
| `octavia_network_interface`    | `{{ 'o-hm0' if octavia_network_type == 'tenant' else api_interface }}` |                |
| `dns_interface`                | `{{ network_interface }}`                                              |                |
| `dpdk_tunnel_interface`        | `{{ neutron_external_interface }}`                                     |                |
| `ironic_http_interface`        | `{{ api_interface }}`                                                  |                |
| `ironic_tftp_interface`        | `{{ api_interface }}`                                                  |                |

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

If the operator wants to configure the initial disk, cpu and ram allocation ratio on compute node `com1`,
the operator needs to create the file  `environments/kolla/files/overlays/nova/com1/nova.conf` with this
content:

```ini
[DEFAULT]
initial_cpu_allocation_ratio = 3.0
initial_ram_allocation_ratio = 1.0
initial_disk_allocation_ratio = 1.0
```

Note that the numbers shown here with an `initial_cpu_allocation_ratio` of 3.0 do match the requirements
of the SCS-nV-* (moderate oversubscription) flavors. If you do not use SMT/hyperthreading, SCS would allow
5.0 here (for the V flavors).

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

## Number of service workers

The number of workers used for the individual services can generally be configured using two parameters.

```yaml
openstack_service_workers: "{{ [ansible_facts.processor_vcpus, 5] | min }}"
openstack_service_rpc_workers: "{{ [ansible_facts.processor_vcpus, 3] | min }}“
```

The default for `openstack_service_workers` is set to `5` when using the cookiecutter for the initial creation
of the configuration.

This value can be overwritten for individual services. The default for all parameters in the following table is
``{{ openstack_service_workers }}``. The parameter `aodh_api_workers` can then be used to explicitly set the
number of workers for the AODH API, for example. A reconfigure must be made for the particular services in the
case of a change. ``osism apply -a reconfigure aodh`` in this example.

These parameters are all set in `environments/kolla/configuration.yml`.

| Parameter                              |
|:---------------------------------------|
| aodh_api_workers                       |
| barbican_api_workers                   |
| cinder_api_workers                     |
| designate_api_workers                  |
| designate_worker_workers               |
| designate_producer_workers             |
| designate_central_workers              |
| designate_sink_workers                 |
| designate_mdns_workers                 |
| glance_api_workers                     |
| gnocchi_metricd_workers                |
| gnocchi_api_workers                    |
| heat_api_cfn_workers                   |
| heat_api_workers                       |
| heat_engine_workers                    |
| horizon_wsgi_processes                 |
| ironic_api_workers                     |
| keystone_api_workers                   |
| proxysql_workers                       |
| magnum_api_workers                     |
| magnum_conductor_workers               |
| manila_api_workers                     |
| neutron_api_workers                    |
| neutron_metadata_workers               |
| nova_api_workers                       |
| nova_superconductor_workers            |
| nova_metadata_api_workers              |
| nova_scheduler_workers                 |
| nova_cell_conductor_workers            |
| octavia_api_workers                    |
| octavia_healthmanager_health_workers   |
| octavia_healthmanager_stats_workers    |
| placement_api_workers                  |
| skyline_gunicorn_workers               |

## Back-end TLS configuration
