---
sidebar_label: OSISM 8
---

# OSISM 8

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager).

The release notes build on each other. When upgrading from 7.0.1 to 8.0.0, you should
therefore not only read and take into account the release notes for 8.0.0 but also the
previous release notes. The same applies to an update from, for example, 8.0.0 to 8.0.2.
The release notes for 8.0.1 must then also be taken into account.

| Release                  | Release Date        |
|:-------------------------|:--------------------|
| [8.0.0](#800-20240911)   | 11. September 2024  |

## 8.0.0 (20240911)

Release date: 11. September 2024

* In this release, OpenStack has been upgraded from OpenStack 2023.2 (Bobcat) to OpenStack
  2024.1 (Caracal). All OpenStack images and images of the associated infrastructure services
  (MariaDB, RabbitMQ, ..) have been rebuilt. These must be upgraded as required.

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* New manager features.

  * The configuration is now synchronised with `osism sync configuration`.
    The `osism configuration sync` command will be removed in the future.

  * The inventory is now synchronised with `osism sync inventory`.
    The `osism reconciler sync` command will be removed in the future.

  * Netbox is now synchronised with `osism sync netbox`.
    The `osism netbox sync` command will be removed in the future.

  * Ironic is now synchronised with `osism sync ironic`.
    The `osism netbox sync ironic` command will be removed in the future.

### Upgrade notes

* The following secrets must be added in `environments/kolla/secrets.yml`:

  ```yaml
  prometheus_skyline_password:  # generate with: pwgen 32 1
  ```

* The `designate-sink` service of OpenStack Designate is now disabled by default.
  The following must be added in `environments/kolla/configuration.yml` to keep
  the `designate-sink` service enabled.

  ```yaml
  designate_enable_notifications_sink: "yes"
  ```

* The file containing the custom local settings of Horizon has been renamed from
  `custom_local_settings` to `_9999-custom-settings.py`.

### Other & References

OpenStack 2024.1 press announcement: https://www.openstack.org/software/openstack-caracal

OpenStack 2024.1 release notes: https://releases.openstack.org/caracal/index.html

Release notes for each OpenStack service:

* Barbican: https://docs.openstack.org/releasenotes/barbican/2024.1.html
* Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2024.1.html
* Cinder: https://docs.openstack.org/releasenotes/cinder/2024.1.html
* Designate: https://docs.openstack.org/releasenotes/designate/2024.1.html
* Glance: https://docs.openstack.org/releasenotes/glance/2024.1.html
* Heat: https://docs.openstack.org/releasenotes/heat/2024.1.html
* Horizon: https://docs.openstack.org/releasenotes/horizon/2024.1.html
* Ironic: https://docs.openstack.org/releasenotes/ironic/2024.1.html
* Keystone: https://docs.openstack.org/releasenotes/keystone/2024.1.html
* Manila: https://docs.openstack.org/releasenotes/manila/2024.1.html
* Neutron: https://docs.openstack.org/releasenotes/neutron/2024.1.html
* Nova: https://docs.openstack.org/releasenotes/nova/2024.1.html
* Octavia: https://docs.openstack.org/releasenotes/octavia/2024.1.html
* Placement: https://docs.openstack.org/releasenotes/placement/2024.1.html
* Skyline: https://docs.openstack.org/releasenotes/skyline-apiserver/2024.1.html, https://docs.openstack.org/releasenotes/skyline-console/2024.1.html
