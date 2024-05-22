---
sidebar_label: Manager
sidebar_position: 15
---

# Manager

## Stable release

It is recommended to use a stable release of OSISM. All available releases are listed on
[release.osism.tech](https://release.osism.tech). Always check there in advance and do not copy
the stable release used here as an example.

In the example, OSISM release 6.0.0 is used.

1. Set the new manager version in the configuration repository.

   ```
   yq -i '.manager_version = "6.0.0"' environments/manager/configuration.yml
   ```

2. If `openstack_version` or `ceph_version` are set in `environments/manager/configuration.yml`
   (or anywhere else), they must be removed. If these are set, the stable release is not used for
   these components.

3. Sync the image versions in the configuration repository. It is important to do this so
   that the correct versions are available in `environments/manager/images.yml`.

   ```
   gilt overlay  # you have to do this 2x
   gilt overlay
   ```

   Optionally, this is normally not necessary, it is possible to reference a specific tag of the
   [osism/cfg-generics](https://github.com/osism/cfg-generics) repository. To do this, first
   check which version of osism/cfg-generics is used in a particular release. The version is
   defined in `generics_version` in the `base.yml` file in the `osism/release` repository. For OSISM 6.0.0,
   for example, this is version [v0.20230919.0](https://github.com/osism/release/blob/main/6.0.0/base.yml#L6).
   This version is then added to the file `gilt.yml` in the configuration repository instead of
   `main` at `version`. This change must be made again after each execution of `gilt overlay` as
   it is overwritten by the call of `gilt overlay`. This cannot be realized differently in the
   current implementation of [Gilt](https://github.com/retr0h/gilt).

4. Commit and push changes in the configuration repository. Since everyone here has their own
   workflows for changes to the configuration repository, only a generic example for Git.

   ```
   git commit -a -s -m "manager: use OSISM version 6.0.0"
   git push
   ```

## OpenSearch integration

With the command `osism log opensearch` it is possible to send SQL queries
to the OpenSearch service. For the command to be functional, the OpenSearch
integration must be activated in the manager environment and the OpenSearch
address and port must be set.

```yaml title="environments/manager/configuration.yml"
manager_opensearch_enable: true
manager_opensearch_address: api-int.testbed.osism.xyz
manager_opensearch_port: 9200
manager_opensearch_protocol: https
```

The integration can also be enabled later. `osism update manager` is then
executed after the configuration has been changed.

## OpenStack broker integration

If the Baremetal Service Integration in OSISM is used, the OpenStack Broker integration is
required. The integration itself is activated by setting the parameter `enable_listener` to `true`.

The hosts in the `manager_listener_broker_hosts` list are the control nodes of OpenStack.
The user is set via `manager_listener_broker_username`. On OpenStack's RabbitMQ broker, the user `openstack`
is present by default.

```yaml title="environments/manager/configuration.yml"
enable_listener: true
manager_listener_broker_hosts:
  - 192.168.16.10
  - 192.168.16.11
  - 192.168.16.12
manager_listener_broker_username: openstack
manager_listener_broker_uri: "{% for host in manager_listener_broker_hosts %}amqp://{{ manager_listener_broker_username }}:{{ manager_listener_broker_password }}@{{ host }}:5672/{% if not loop.last %};{% endif %}{% endfor %}"
```

The password used when using the `openstack` user is `rabbitmq_password` from `environments/kolla/secrets.yml`.

```yaml title="environments/manager/secrets.yml"
manager_listener_broker_password: RABBITMQ_PASSWORD
```
