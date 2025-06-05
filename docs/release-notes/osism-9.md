---
sidebar_label: OSISM 9
---

# OSISM 9

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager).

| Release                  | Release Date        |
|:-------------------------|:--------------------|
| [9.1.0](#910-20250530)   | 30. May 2025        |
| [9.0.0](#900-20250408)   | 8. April 2025       |

## 9.1.0 (20250530)

### Known issues

* Incremental MariaDB backups are not working [lp#2111620](https://bugs.launchpad.net/kolla/+bug/2111620)

## 9.0.0 (20250408)

## Other and References

### New container registry

Container images are no longer pushed to Quay.io and are only made available on our own
container registry. During the transition phase, the new container registry must be made
known in the configuration repository. In the future ( likely with the release of OSISM 10),
these parameters can be removed again.

```yaml title="environments/kolla/configuration.yml"
kolla_namespace: kolla/release
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

### Ceph 18.2 (Reef)

Ceph 18.2 release notes: https://docs.ceph.com/en/latest/releases/reef/

### OpenStack 2024.2 (Dalmatian)

OpenStack 2024.2 release notes: https://releases.openstack.org/dalmatian/index.html

Release notes for each OpenStack service:

* Barbican: https://docs.openstack.org/releasenotes/barbican/2024.2.html
* Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2024.2.html
* Cinder: https://docs.openstack.org/releasenotes/cinder/2024.2.html
* Designate: https://docs.openstack.org/releasenotes/designate/2024.2.html
* Glance: https://docs.openstack.org/releasenotes/glance/2024.2.html
* Heat: https://docs.openstack.org/releasenotes/heat/2024.2.html
* Horizon: https://docs.openstack.org/releasenotes/horizon/2024.2.html
* Ironic: https://docs.openstack.org/releasenotes/ironic/2024.2.html
* Keystone: https://docs.openstack.org/releasenotes/keystone/2024.2.html
* Manila: https://docs.openstack.org/releasenotes/manila/2024.2.html
* Neutron: https://docs.openstack.org/releasenotes/neutron/2024.2.html
* Nova: https://docs.openstack.org/releasenotes/nova/2024.2.html
* Octavia: https://docs.openstack.org/releasenotes/octavia/2024.2.html
* Placement: https://docs.openstack.org/releasenotes/placement/2024.2.html
* Skyline: https://docs.openstack.org/releasenotes/skyline-apiserver/2024.2.html, https://docs.openstack.org/releasenotes/skyline-console/2024.2.html
