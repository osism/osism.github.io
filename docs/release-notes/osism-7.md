---
sidebar_label: OSISM 7
---

# OSISM 7

Instructions for the upgrade can be found in the [Upgrade Guide](https://osism.github.io/docs/guides/upgrade-guide/manager).

:::warning

7.0.0a, 7.0.0b, 7.0.0c, 7.0.0d are pre-releases. Do not use these releases.

:::

## 7.0.3

**Release date: 3. May 2024**

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images for Octavia and Nova have been rebuilt. Upgrades of the Octavia
  and Nova services are recommended. No upgrades of other OpenStack and associated
  infrastructure services such as MariaDB or RabbitMQ are required.

  * The Nova images have been rebuilt to add packages to be able to use vTMP ([osism/issues#1008](https://github.com/osism/issues/issues/1008>))
    If this is not relevant, the upgrade can be skipped.

  * The octavia images have been rebuilt to resolve an issue when creating a LB + a listener
    with an allowed_cidr with the fully-populated API ([osism/issues#980](https://github.com/osism/issues/issues/980>))

* During the preparation of the upgrades of the regions of the PCO a bug ([osism/issues#937](https://github.com/osism/issues/issues/973>))
  has been noticed which leads to a delay of up to 2 minutes between the necessary container stops and starts.
  This is due to a bug in the service units of all Kolla services. The bug is fixed in the current release.
  To avoid the delay during an upgrade, a fix must be applied in advance for all  srvice units from
  Kolla.


  ```
  osism apply fix-gh937
  ```

* Kubernetes Cluster API for the 1.30 series is available. They are now provided directly with
  `osism manage image clusterapi`. This means that Kubernetes Cluster API images are now available
  for series 1.27, 1.28, 1.29 and 1.30.

* A new role `tempest` has been added to the Ansible collection `osism.validations`. This makes it possible
  to perform significantly more tests than with the previously used `osism.validations.refstack` role. The new
  role will be used in the testbed in future to significantly increase the number of tests performed in the CI.

* New documentation for the [project manager](https://osism.tech/docs/guides/operations-guide/openstack/day2-operations/project-manager)
  and the [simple stress](https://osism.tech/docs/guides/operations-guide/openstack/day2-operations/simple-stress).

* When using the reboot play, it is now possible to wait for the reboot to be completed ([osism/issues#758](https://github.com/osism/issues/issues/758)).


  ```
  osism apply reboot \
    -e reboot_wait=yes \
    -e ireallymeanit=yes
  ```

* Monitoring services are now activated by default for the internal Kubernetes cluster.

* The `openstack_cacert` parameter used by Kolla is now set to `"/etc/ssl/certs/ca-certificates.crt"`
  by default. The previous default was `""`. If this is not wanted, the parameter must be overwritten in
  `environments/kolla/configuration.yml`.

* The `ironic_agent_files_directory` parameter used by Kolla is now set to `/share/ironic` by default.
  The previous default was `"{{ node_custom_config }}"`. If this is not wanted, the parameter must be overwritten
  in `environments/kolla/configuration.yml`. This is in preparation for the Ironic IPA images no longer being
  stored in the configuration repository but within the manager service at runtime.

* The Ironic IPA images are now downloaded from ironic play by default. If this is not wanted,
  `enable_ironic_agent_download_images: false` must be set in `environments/kolla/configuration.yml`.
  The Ironic IPA images can now also be downloaded independently of the ironic play with `osism apply ironic-download-ipa-images`.

* The `ceph_cluster_fsid` parameter is now generated automatically. It can be removed from `environments/configuration.yml`.
  The automatically generated `ceph_clusterfs_fsid` parameter is set to the value of the `fsid`
  parameter from `environments/ceph/configuration.yml`.

* You can now use your own hook scripts in `osism/cfg-cookiecutter`. These are placed in the directory
  `{{cookiecutter.project_name}}/scripts.d/` directory. The scripts are executed in alphabetical order.
  The scripts must be executable.

* Versions not yet pinned in the manager environment of the configuration repository (Ansible collections, `osism/cfg-generics`, ..)
  are now automatically pinned during synchronisation with `gilt overlay`. This also applies to the
  `osism update manager` script.

* The Docker version and the Docker CLI version can now also be managed via `osism/cfg-generics`.
  It is recommended to pin the Docker version in `environments/configuration.yml`.

  ```yaml
  docker_version: '5:24.0.9'
  ```

* When using the single service plays for Ceph (`ceph-osds`, `ceph-mons`, ..), no service restarts
  are executed for other services. This can be adjusted with the `ceph_handler_*_restart` parameters.
  The default value is `false`.

  ```yaml
  ceph_handler_crash_restart
  ceph_handler_mdss_restart
  ceph_handler_mgrs_restart
  ceph_handler_mons_restart
  ceph_handler_osds_restart
  ceph_handler_rbdmirrors_restart
  ceph_handler_rgws_restart
  ```

  The following example now makes it possible when adding new OSDs to really only start the OSDs that
  have been newly added and to avoid a restart of all OSDs in the cluster or on a node.

  ```
  osism apply ceph-osds -e ceph_handler_osds_restart=False
  ```

* The restart of Ceph Services is now throttled. By default, only one Ceph service is restarted at a time.
  This can be adjusted with the `ceph_handler_*_restart_throttle` parameters. The default value is `1`.

  ```yaml
  ceph_handler_crash_restart_throttle
  ceph_handler_mdss_restart_throttle
  ceph_handler_mgrs_restart_throttle
  ceph_handler_mons_restart_throttle
  ceph_handler_osds_restart_throttle
  ceph_handler_rbdmirrors_restart_throttle
  ceph_handler_rgws_restart_throttle
  ```

* OVN container images will be built without the `-march=broadwell` parameter in the future. The OVN
  images have not been updated with this release, this only serves as an announcement for the future. By
  removing the parameter, it is possible to use the OVN container images on older CPUs. It is planned to
  provide different variants of the OVN and OVS container images in the future to enable parameters for
  modern CPUs in order to improve performance in particular.

* This has nothing to do with the release itself and is just a notice. The build of the OpenStack Zed images has been
  disabled.

## 7.0.2

**Release date: 17. April 2024**

* The Ceph & OpenStack service images have not been rebuilt. No upgrades of Ceph & OpenStack and associated
  infrastructure services such as MariaDB or RabbitMQ are required.

* Properties for device type `vrfs` are now supported in the `osism.commons.network` role.

* Debian support in `osism.commons` & `osism.services` Ansible collection.

  * The roles of the `osism.commons` collection are now usable with Debian. The roles have been tested with Debian Bookworm.
  * The roles of the `osism.services` collection are now usable with Debian. The roles have been tested with Debian Bookworm.

* If the OSISM CLI is executed as root user there is now an informal warning message.

* Use a single network for Ceph frontend & backend in the cookiecutter. More information in the
  [Ceph network configuration reference](https://docs.ceph.com/en/latest/rados/configuration/network-config-ref/).

* When synchronising the configuration repository, it is now ensured that you are on the correct branch.

* Senlin images available again as rolling tag for OpenStack 2023.2.

* Zun images available again as rolling tag for OpenStack 2023.2 & 2024.1.

* New FRR configuration template for loadbalancers with an external uplink in the osism.services.frr role.

* `scs:name-v1` and `scs:name-v2` extra specs are now set via the OpenStack flavor manager.

* Task ID is now displayed in the output of the OSISM CLI for prepared tasks.

* New Makefile target in the OSISM Testbed to fetch the Wireguard configuration file: `vpn-wireguard-config`.

* With the play `noop` it is now possible to run a play with noop. This is useful for testing purposes of the manager service.

* The stable repository is now used as the default for the Netdata service in the `osism.services.netdata` role. This avoids
  package conflicts in future.

## 7.0.1
