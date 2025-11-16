---
sidebar_label: OSISM 10
---

# OSISM 10

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager.mdx).

| Release                | Release Date       |
|:-----------------------|:-------------------|

## 10.0.0

## RabbitMQ 4

Since the default changed to have all queues be of durable type in the Epoxy release,
following procedure is required to be carried out before any upgrade to Epoxy.

See docs: https://docs.openstack.org/kolla-ansible/latest/reference/message-queues/rabbitmq.html#high-availability

## New container registry

Container images are no longer pushed to Quay.io and are only made available on our own
container registry. During the transition phase, the new container registry must be made
known in the configuration repository. In the future ( likely with the release of OSISM 10),
these parameters can be removed again.

```yaml title="environments/kolla/configuration.yml"
docker_namespace: kolla/release
```

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

## New service names for RadosGW in Ceph Reef

The naming scheme for the Ceph RadosGW service was changed from

```text
rgw.$HOSTNAME.$INSTANCE
```

to

```text
rgw.$ZONE.$HOSTNAME.$INSTANCE
```

Please adapt any `client` entries in `ceph_config_overrides` in `environments/ceph/configuration.yml` accordingly.
E.g. if you previously had

```yaml title="environments/ceph/configuration.yml"
ceph_conf_overrides:
  "client.rgw.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
```

change it to

```yaml title="environments/ceph/configuration.yml"
ceph_conf_overrides:
  "client.rgw.{{ rgw_zone }}.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
```

## References

### Ceph 18.2 (Reef)

Ceph 18.2 release notes: https://docs.ceph.com/en/latest/releases/reef/

### OpenStack 2025.1 (Epoxy)

OpenStack 2025.1 release notes: https://releases.openstack.org/epoxy/index.html

Release notes for each OpenStack service:

* Kolla-Ansible: https://docs.openstack.org/releasenotes/kolla-ansible/2025.1.html
* Kolla: https://docs.openstack.org/releasenotes/kolla/2025.1.html
* Barbican: https://docs.openstack.org/releasenotes/barbican/2025.1.html
* Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2025.1.html
* Cinder: https://docs.openstack.org/releasenotes/cinder/2025.1.html
* Designate: https://docs.openstack.org/releasenotes/designate/2025.1.html
* Glance: https://docs.openstack.org/releasenotes/glance/2025.1.html
* Heat: https://docs.openstack.org/releasenotes/heat/2025.1.html
* Horizon: https://docs.openstack.org/releasenotes/horizon/2025.1.html
* Ironic: https://docs.openstack.org/releasenotes/ironic/2025.1.html
* Keystone: https://docs.openstack.org/releasenotes/keystone/2025.1.html
* Manila: https://docs.openstack.org/releasenotes/manila/2025.1.html
* Neutron: https://docs.openstack.org/releasenotes/neutron/2025.1.html
* Nova: https://docs.openstack.org/releasenotes/nova/2025.1.html
* Octavia: https://docs.openstack.org/releasenotes/octavia/2025.1.html
* Placement: https://docs.openstack.org/releasenotes/placement/2025.1.html
* Skyline: https://docs.openstack.org/releasenotes/skyline-apiserver/2025.1.html, https://docs.openstack.org/releasenotes/skyline-console/2025.1.html
