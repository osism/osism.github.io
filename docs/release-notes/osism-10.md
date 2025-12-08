---
sidebar_label: OSISM 10
---

# OSISM 10

:::info

The OSISM 10 release notes are still a work in progress and not yet complete.

:::

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager.mdx).

| Release         | Release Date |
|:----------------|:-------------|
| [10.0.0](#1000) |              |

## 10.0.0

### Upgrade nodes

#### RabbitMQ 3 to RabbitMQ 4 migration

OSISM 10 only supports RabbitMQ 4. This requires a mandatory switch to quorum
queues if this has not already been done.

If you were already using quorum queues with RabbitMQ 3, migrating from RabbitMQ 3
to RabbitMQ 4 is easy. Run `osism apply -a upgrade rabbitmq`. Most of the existing
old classic queues are automatically removed when upgrading the individual OpenStack
services afterwards. After completing all upgrades, run `osism migrate rabbitmq3to4 delete`
to remove old classic queues.

If you are unsure whether you are already using quorum queues or not, first make the upgrade
from the Manager service. Then run `osism migrate rabbitmq3to4 check`.

```bash
$ osism migrate rabbitmq3to4 check
2025-12-03 21:04:33 | INFO     | Connecting to RabbitMQ Management API at 192.168.16.10:15672 (node: testbed-node-0) as openstack...
2025-12-03 21:04:33 | INFO     | Found 210 classic queue(s)
2025-12-03 21:04:33 | INFO     | Found 0 quorum queue(s)
2025-12-03 21:04:33 | INFO     |   - 210 classic queue(s) in vhost /
2025-12-03 21:04:33 | INFO     | Migration is REQUIRED: Only classic queues found, no quorum queues
```

If you have not used quorum queues before, here is our recommended procedure. This creates
a new RabbitMQ vHost `openstack` that uses quorum queues by default and then moves all
queues there when upgrading the services.

1. If not already done upgrade the Manager service as usual.
2. Remove the `om_enable_rabbitmq_quorum_queues` parameter from `environments/kolla/configuration.yml`.
3. Add the `om_rpc_vhost: openstack` parameter in `environments/kolla/configuration.yml`.
4. Add the `om_notify_vhost: openstack` parameter in `environments/kolla/configuration.yml`.
5. Upgrade RabbitMQ with `osism apply -a upgrade rabbitmq`.
6. Prepare a new RabbitMQ vHost that uses quorum queues by default with `osism migrate rabbitmq3to4 prepare`.
7. Upgrade the services that use RabbitMQ and delete the old queues afterwards. For aodh, for example, first
   run the upgrade with `osism apply -a upgrade aodh` and then remove the classic queues.

   ```bash
   $ osism migrate rabbitmq3to4 delete aodh
   2025-12-02 20:55:27 | INFO     | Connecting to RabbitMQ Management API at 192.168.16.10:15672 (node: testbed-node-0) as openstack...
   2025-12-02 20:55:27 | INFO     | Found 2 classic queue(s) for service 'aodh' in vhost '/'
   2025-12-02 20:55:27 | INFO     | Deleted queue: alarm.all.sample
   2025-12-02 20:55:27 | INFO     | Deleted queue: alarming.sample
   2025-12-02 20:55:27 | INFO     | Successfully deleted 2 queue(s) for service 'aodh' in vhost '/'
   ```

   These services use RabbitMQ:

   - aodh
   - barbican
   - ceilometer
   - cinder
   - designate
   - magnum
   - manila
   - neutron
   - nova
   - octavia

   After upgrading all services, you can also delete all remaining classic queues at once using
   `osism migrate rabbitmq3to4 delete`.

8. Once everything has been upgraded, the old notification queues can be deleted with
   `osism migrate rabbitmq3to4 delete notifications`.

When the Manager's listener service is used (`enable_listener` in `environments/manager/configuration.yml`)
add the new `openstack` RabbitMQ vhost to the `manager_listener_broker_uri` parameter.
Then update the manager with `osism update manager` and delete the old queues with
`osism migrate rabbitmq3to4 delete manager`.

Finally, you can re-run the check command. There should now be no more classic queues.

```bash
$ osism migrate rabbitmq3to4 check
2025-12-04 08:38:58 | INFO     | Connecting to RabbitMQ Management API at 192.168.16.10:15672 (node: testbed-node-0) as openstack...
2025-12-04 08:38:58 | INFO     | Found 0 classic queue(s)
2025-12-04 08:38:58 | INFO     | Found 216 quorum queue(s)
2025-12-04 08:38:58 | INFO     |   - 216 quorum queue(s) in vhost openstack
2025-12-04 08:38:58 | INFO     | Migration is NOT required: Only quorum queues found
```

#### New namespace for Kolla images

To make it easier to identify which OpenStack version is being used, the OpenStack version is
now included in the Kolla Image namespace. An existing `docker_namespace` parameter must be adjusted
accordingly.

```yaml title="environments/kolla/configuration.yml"
docker_namespace: kolla/release/2025.1
```

#### New container registry

Container images are no longer pushed to Quay.io and are only made available on our own
container registry. During the transition phase, the new container registry must be made
known in the configuration repository. In the future these parameters can be removed again.

```yaml title="environments/manager/configuration.yml"
docker_registry: index.docker.io
docker_registry_ansible: registry.osism.tech
docker_registry_netbox: registry.osism.tech
```

```yaml title="inventory/group_vars/all/registries.yml"
ceph_docker_registry: registry.osism.tech
dnsmasq_docker_registry: registry.osism.tech
docker_registry_ansible: registry.osism.tech
docker_registry_cephclient: registry.osism.tech
docker_registry_cgit: registry.osism.tech
docker_registry_dnsdist: registry.osism.tech
docker_registry_homer: registry.osism.tech
docker_registry_kolla: registry.osism.tech
docker_registry_netbox: registry.osism.tech
docker_registry_nexus: registry.osism.tech
docker_registry_openstackclient: registry.osism.tech
```

#### New service names for RadosGW in Ceph Reef

The naming scheme for the Ceph RadosGW service was changed from

```text
rgw.$HOSTNAME.$INSTANCE
```

to

```text
rgw.$ZONE.$HOSTNAME.$INSTANCE
```

Please adapt any `client` entries in `ceph_config_overrides` in `environments/ceph/configuration.yml`
accordingly. E.g. if you previously had

```yaml title="environments/ceph/configuration.yml"
ceph_conf_overrides:
  "client.rgw.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
```

change it to

```yaml title="environments/ceph/configuration.yml"
ceph_conf_overrides:
  "client.rgw.{{ rgw_zone }}.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
```

#### Removal of the community.general.yaml Ansible plugin

If `community.general.yaml` has been set for `stdout_callback` in `ansible.cfg`,
this entry must be removed and replaced with `result_format=yaml`.

```text
ERROR! [DEPRECATED]: community.general.yaml has been removed. The plugin
has been superseded by the option result_format=yaml in callback plugin
ansible.builtin.default from ansible-core 2.13 onwards. This feature was
removed from community.general in version 12.0.0. Please update your
playbooks.
```

#### TLS for ProxySQL is now enabled by default

If you are already using ProxySQL, but without TLS, set the following parameter in
`environments/kolla/configuration.yml`.

```yaml title="environments/kolla/configuration.yml"
database_enable_tls_internal: "no"
```

## References

### Ceph 18.2 (Reef)

Ceph 18.2 release notes: https://docs.ceph.com/en/latest/releases/reef/

### OpenStack 2025.1 (Epoxy)

OpenStack 2025.1 release notes: https://releases.openstack.org/epoxy/index.html

Release notes for each OpenStack service:

* Barbican: https://docs.openstack.org/releasenotes/barbican/2025.1.html
* Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2025.1.html
* Cinder: https://docs.openstack.org/releasenotes/cinder/2025.1.html
* Designate: https://docs.openstack.org/releasenotes/designate/2025.1.html
* Glance: https://docs.openstack.org/releasenotes/glance/2025.1.html
* Heat: https://docs.openstack.org/releasenotes/heat/2025.1.html
* Horizon: https://docs.openstack.org/releasenotes/horizon/2025.1.html
* Ironic: https://docs.openstack.org/releasenotes/ironic/2025.1.html
* Keystone: https://docs.openstack.org/releasenotes/keystone/2025.1.html
* Kolla-Ansible: https://docs.openstack.org/releasenotes/kolla-ansible/2025.1.html
* Kolla: https://docs.openstack.org/releasenotes/kolla/2025.1.html
* Manila: https://docs.openstack.org/releasenotes/manila/2025.1.html
* Neutron: https://docs.openstack.org/releasenotes/neutron/2025.1.html
* Nova: https://docs.openstack.org/releasenotes/nova/2025.1.html
* Octavia: https://docs.openstack.org/releasenotes/octavia/2025.1.html
* Placement: https://docs.openstack.org/releasenotes/placement/2025.1.html
* Skyline: https://docs.openstack.org/releasenotes/skyline-apiserver/2025.1.html, https://docs.openstack.org/releasenotes/skyline-console/2025.1.html
* Watcher: https://docs.openstack.org/releasenotes/watcher/2025.1.html
