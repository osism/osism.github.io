---
sidebar_label: OSISM 7
---

# OSISM 7

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager).

The release notes build on each other. When upgrading from 6.0.2 to 7.0.4, you should
therefore not only read and take into account the release notes for 7.0.4 but also the
previous release notes. The same applies to an update from, for example, 7.0.2 to 7.0.4.
The release notes for 7.0.3 must then also be taken into account.

| Release                  | Release Date      |
|:-------------------------|:------------------|
| [7.1.3](#713-20240908)   | 8. September 2024 |
| [7.1.2](#712-20240818)   | 18. August 2024   |
| [7.1.1](#711-20240812)   | 12. August 2024   |
| [7.1.0](#710-20240710)   | 10. July 2024     |
| [7.0.5](#705-20240524)   | 24. May 2024      |
| [7.0.4](#704-20240507)   | 7. May 2024       |
| [7.0.3](#703-20240503)   | 3. May 2024       |
| [7.0.2](#702-20240407)   | 17. April 2024    |
| [7.0.1](#701-20240327)   | 27. March 2024    |
| [7.0.0](#700-20240320)   | 20. March 2024    |

## 7.1.3 (20240908)

Release date: 8. September 2024

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images for Ironic have been rebuilt.
  Upgrades of the Ironic service is recommended.

  * The Ironic have been rebuilt because of a critical security
    issues. Further details can be found in security advisory
    [OSSA-2024-003: Unvalidated image data passed to qemu-img](https://security.openstack.org/ossa/OSSA-2024-003.html)
    and in SCS blog post
    [Sovereign Cloud Stack Security Advisory Image Processing in Ironic (CVE-2024-44082)](https://scs.community/de/security/2024/09/07/cve-2024-44082/). This upgrade is important.

* New manager features.

  * The name of the Kubernetes Cluster API image managed with `osism manage image clusterapi`
    changed to e.g. `ubuntu-capi-image-v1.30.0`.

  * Zombie processes when using `osism console --type ansible <HOSTGROUP>` are now removed.

* New Kolla features.

  * The Prometheus node-exporter is now deployed on all nodes by default.
  * cAdvisor is now deployed on all nodes by default.
  * Deprecation warnings in API services are disabled by default. To change this
    add the following parameter in `environments/kolla/configuration.yml`.

    ```yaml
    kolla_disable_python_deprecation_warnings: "no"
    ```

* New features in the `osism.commons.packages` role.

  * `bash-completion` and `git` are installed by default.

* New features in the `osism.services.netbox` role.

  * The start period of services can be configured.

    ```yaml
    netbox_service_netbox_start_period: 120s
    netbox_service_netbox_worker_start_period: 30s
    netbox_service_postgres_start_period: 30s
    netbox_service_redis_start_period: 30s
    ```

## 7.1.2 (20240818)

Release date: 18. August 2024

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images have not been rebuilt. No upgrade of OpenStack is required.

* New manager features.

  * It is now possible to manage custom images with `osism manage images`.
  * It is now possible to manage custom flavors with `osism manage flavors`.
  * Kubernetes Cluster API Images 1.31 are now deployed with `osism manage image clusterapi`.
  * With `osism apply -a config PLAY` it is now possible to update only the configuration
    files for services from the Kolla project.
  * The Mitogen plugin for Ansible has been updated and Ansible 2.17 should now also be
    usable.
  * With `osism apply disable-compute-node` it is possible to stop & disable all services on
    a compute node.
  * With `osism apply remove-compute-node` it is possible  to stop, disable & remove
    all services on a compute node.
  * With `osism apply disable-network-node` it is possible to stop & disable all services on
    a network node.
  * With `osism apply enable-network-node` it is  possible to start & enable all services on
    a network node.

* New features in the `osism.commons.network` role.

  * Dummy devices can be managed with the `network_dummy_devices` parameter (for Ubuntu >= 24.04).

* New features in the `osism.commons.packages` role.

  * The mode of the need start feature of APT can now be configured via the
    `packages_needrestart_mode` parameter. By default, services that are to be
    restarted are only listed.

* Removed roles.

  * `osism.validations.refstack` has been removed in favor of the `osism.validations.tempest` role.
    The OpenStack Interop and therefore also the Refstack project will no longer be actively
    continued.

  * `osism.services.openstack_health_monitor` has been removed in favor of the new SCS health
    monitor. This will probably be usable with OSISM 8.

## 7.1.1 (20240812)

Release date: 12. August 2024

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images for Nova and Keystone have been rebuilt.
  Upgrades of the Nova service is recommended.
  The OVN, OVS and Fluentd service images have been rebuild.

  * The Nova images have been rebuilt because of a critical security
    issues. Further details can be found in security advisory
    [OSSA-2024-002: Incomplete file access fix and regression for QCOW2 backing files and VMDK flat descriptors](https://security.openstack.org/ossa/OSSA-2024-002.html)
    and in SCS blog post
    [SCS Security Advisory on incomplete QCOW2 and VMDK image handling protections (CVE-2024-40767)](https://scs.community/de/security/2024/07/23/cve-2024-40767/). This upgrade is important. If a hotfix for this problem has already
    been deployed in advance, the parameters added for this in `environments/kolla/images.yml`
    must be removed again.

  * The Keystone images have been rebuilt to make the use of the [vexxhost/keystone-keycloak-backend](https://github.com/vexxhost/keystone-keycloak-backend)
    plugin possible. If this plugin is not relevant, the upgrade can be skipped.

  * The Fluentd image has been rebuilt to make the use of the [fluent-plugin-grafana-loki](https://grafana.com/docs/loki/latest/send-data/fluentd/)
    plugin possible. If this plugin is not relevant, the upgrade can be skipped.

  * Rebuild of the OVN images to update version to [24.3.2](https://www.ovn.org/en/releases/changelog_v24.03.2/). Housekeeping for clusters
    that want the latest stable versions. The upgrade can be skipped, there is no reason from a functional point of view.

  * Rebuild of the OVS images to update version to [3.3.1](https://www.openvswitch.org/releases/NEWS-3.3.1.txt). Housekeeping for clusters
    that want the latest stable versions. The upgrade can be skipped, there is no reason from a functional point of view.

  * When upgrading the Nova and Keystone API services, there is a short downtime
    of the APIs. This downtime is usually less than 1 minute.

* The Kubernetes version of the integrated Kubernetes cluster has been upgraded to 1.30.3. An upgrade of the Kubernetes cluster should be performed
  with `osism apply k3s-upgrade`.

* In preparation for the support of Ubuntu 24.04, the default Docker version was changed to 26.1.4. If an upgrade of Docker is made, this should
  be done node by node. The upgrade results in a restart of all containers.

  If you do not want to upgrade from Docker 24.0.9 to 26.1.4 yet, make sure that the versions are pinned
  in `environments/configuration.yml`. Double check that the versions there are correct after the configuration repository has been pulled on the manager.

  ```yaml
  docker_version: "5:24.0.9"
  docker_cli_version: "5:24.0.9"
  ```

* The CAPI and CAPO versions have been changed to 1.7.4 and 0.10.4.. Run `osism apply clusterapi` if you use CAPI management cluster on the
  integrated Kubernetes cluster.

* New Kolla features.

  * The `CS_AUTH_KEYS` environment variable for Barbican containers can be set via `barbican_cs_auth_keys`.

* New roles & plays.

  * `osism apply cleanup-journal` to vacuum the journald logs
  * `osism apply openvswitch-ipfix` to manage an Open vSwitch IPFIX collector
  * `osism apply openvswitch-netflow` to manage an Open vSwitch Netflow collector
  * `osism apply openvswitch-sflow` to manage an Open vSwitch sFlow collector
  * `osism apply zabbix_agent` for the deployment of the Zabbix agent
  * `osism validate ceph-connectivity` to validate Ceph network connectivity
  * `osism validate kolla-connectivity` to validate Kolla network connectivity
  * `osism validate ntp` to validate NTP synchronization

## 7.1.0 (20240710)

Release date: 10. July 2024

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images for Octavia, Nova, Glance, Cinder and Magnum have been rebuilt.
  Upgrades of those services are recommended. No upgrades of other OpenStack
  and associated infrastructure services such as MariaDB or RabbitMQ are required.

  * The Nova, Glance, and Cinder images have been rebuilt because of a critical security
    issues. Further details can be found in security advisory
    [OSSA-2024-001: Arbitrary file access through custom QCOW2 external data](https://security.openstack.org/ossa/OSSA-2024-001.html)
    and in SCS blog post
    [SCS Security Advisory on arbitrary file access through QCOW2 external data file (CVE-2024-32498)](https://scs.community/de/security/2024/07/02/cve-2024-32498/). This upgrade is important. If a hotfix for this problem has already
    been deployed in advance, the parameters added for this in `environments/kolla/images.yml`
    must be removed again.

  * The Octavia images have been rebuilt to fix an issue with the removal of leftover OVN LB HM ports
    ([osism/issues#921](https://github.com/osism/issues/issues/921)). If this is not relevant, the
    upgrade can be skipped.

  * The Magnum images have been rebuild to bump the versions of the included Magnum Cluster API plugins
    and to make the use of the Cilium CNI possible. If this is not relevant, the upgrade can be skipped.

  * When upgrading the Octavia, Nova, Glance, Cinder and Magnum API services, there is a short downtime
    of the APIs. This downtime is usually less than 1 minute.

* New manager features.

  * It is possible to [lock parts of the configuration repository](https://osism.tech/docs/guides/configuration-guide/configuration-repository/#locks)
    or the complete configuration repository. It is then no longer possible to execute plays assigned to
    these parts in the locked parts. This makes it possible to prevent the execution of plays in specific areas.
    To lock an environment, a `.lock` file is created in the corresponding directory of the environment. For
    example, the file `environments/kolla/.lock` locks the Kolla environment.

  * The defaults for the `hosts_*` parameters have been changed from `all` to `generic` in all plays. The default
    for the `hosts_*` parameters has already been set to `generic` in [osism/defaults](https://github.com/osism/defaults).
    This means that the behavior does not change.

  * The old wrapper scripts, e.g. `osism-generic`, are no longer copied. They will be removed in the future.

  * There is a new manager service that is used to manage all services on the internal Kubernetes cluster.
    This has to be activated explicitly via the parameter `enable_osism_kubernetes` in `environments/manager/configuration.yml`.

  * Host vars from the configuration repository are no longer synchronized to the Netbox. The config context of hosts
    from the Netbox can still be used for host vars.

* New Kolla features.

  * With the `haproxy_enable_horizon` parameter it is possible to disable the Horizon service in the
    loadbalancer. The value of the parameter is `yes` by default.
  * An error in the play for MariaDB backups has been fixed. It is now possible to use incremental backups.
  * The `org.opencontainers.image.version` container label is now used for the service versions inside
    the container image. So far, it has been used for the OSISM version.
  * The `haproxy_socket_level_admin` parameter is now set to `yes` by default.
  * With the `kolla_handler_throttle` parameter it is possible to throttle the execution of handlers.
  * If the restart of a container fails in the loadbalancer play, the execution of the play is
    interrupted immediately. This prevents the master container from being restarted if one of the 
    backup containers fails to restart.

* New roles & plays.

  * The k9s CLI can be used with osism.commons.k9s.
  * With osism.services.netbird it is possible to connect a node to a Netbird cluster.
  * With the gather-facts play it is possible to gather only the facts.
  * The `manage-loadbalancer` play can be used to manage the API services in the loadbalancer.
    In future, this play will be used by all upgrade plays to automatically remove an API service
    from the loadbalancer before restarting.

* Removed roles.

  * osism.commons.kompose

* Technical preview.

  * Rook

* New documentation.

  * https://osism.tech/docs/guides/operations-guide/ceph/#remove-a-single-osd-node
  * https://osism.tech/docs/guides/operations-guide/network/
  * https://osism.tech/docs/guides/configuration-guide/openstack/#example-for-the-use-of-name-based-endpoints

## 7.0.5 (20240524)

Release date: 24. May 2024

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images have not been rebuilt. No upgrade of OpenStack is required.

* Bugfixes in the osism.commons.network role.

  * When extending the role for CentOS and RHEL, a bug was introduced that prevented existing
    Netplan files from being deleted on Ubuntu. This has been fixed.

* Bugfixes in the osism.services.netdata role.

  * The repositories used were changed from Packagecloud to the repositories offered by the
    Netdata project itself. In this way, unresolvable package dependencies on Ubuntu 22.04 are
    now resolved.

* New features in the osism.services.manager role.

  * The use of the Netbox as the primary inventory is now optional, even with existing Netbox
    integration. It is therefore important to set the parameter `manager_inventory_from_netbox`
    to `true` before updating the manager service if the Netbox was previously used as the
    primary inventory. By default, the Netbox is no longer used as the primary inventory.

    ```yaml title="environments/manager/configuration.yml
    manager_inventory_from_netbox: true
    ```

* New features in the osism.services.docker role.

  * With the `docker_throttle_restart` parameter it's possible to
    [throttle the service restarts](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_strategies.html#restricting-execution-with-throttle).
    By default service restarts will not be throttled.

    ```yaml title="environments/configuration.yml
    docker_throttle_restart: 1
    ```

  * With the `docker_wait_after_restart` it is possible to wait `docker_wait_after_restart_seconds`
    seconds (60 seconds by default) after the restart of the Docker service. By default it will
    not be waited after the restart of the Docker service.

    ```yaml title="environments/configuration.yml
    docker_wait_after_restart: true
    docker_wait_after_restart_seconds: 60
    ```

* New features in the osism.services.traefik role.

  * With the `traefik_configuration_extra` parameter it's possible to add
    extra configuration to the Traefik service.

  * With the `traefik_extra_ports` parameter it's possible to manage additional
    ports with traefik. E.g. to manage port 5000 and port 8774:

    ```yaml
    traefik_extra_ports:
      - 5000
      - 8774
    ```

  * With the `traefik_configuration_dynamic` parameter it's possible to
    define additional services via the file provider.

    This will add a router that routes all requests on
    `api-81-163-192-117.traefik.me` to the service-horizon service.

    ```yaml
    traefik_configuration_dynamic:
      tcp:
        services:
          service-horizon:
            loadBalancer:
              servers:
                - address: "192.168.16.254:443"
        routers:
          router-horizon:
            rule: "HostSNI(`api-81-163-192-117.traefik.me`)"
            service: service-horizon
            entryPoints:
              - https
            tls:
              passthrough: true
    ```

* New features in the osism.commons.operator role.

  * With the `operator_authorized_keys_delete` parameter it's possible to delete authorized keys
    from the authorized key files of the operator user account. This is the counterpart to
    the `operator_authorized_keys` parameter.

  * With the `operator_authorized_github_accounts_delete` parameter it's possible to delete
    all authorized keys from a list of GitHub accounts from the authorized key files of the operator
    user account.  This is the counterpart to the `operator_authorized_github_accounts` parameter.

* New features in the osism.commons.known_hosts role.

  * With the `known_hosts_delete` parameter it's possible to delete known hosts entries from the
    known hosts file of the operator user account. This is the counterpart to the `known_hosts`
    and `known_hosts_extra` parameters.

* New features in the osism.commons.user role.

  * With the `user_sudoers` parameter it's possible to change the content of the user sudoers file.
    The default is `ALL=(ALL:ALL) NOPASSWD: ALL`.

* New features in the osism.commons.proxy role.

  * Proxy settings are now removed when no proxy settings are set with the `proxy_proxies` parameter.

* New playbooks and changes in the existing playbooks.

  * The `ensure-no-instances` ensures that no instances are defined in Libvirt and that no qemu
    processes are running. This can be used in preparation for maintenance work on compute nodes.
    In the future, the play will also take care of moving running or assigned instances from a
    compute node with the help of the OSISM Resource Manager.

  * With the `loadbalancer-without-service-config` play it's possible to manage the loadbalancer service
    without including all the OpenStack service roles. This makes it possible to do a loadbalancer container
    image upgrade pretty fast and also enables the deployment of multiple loadbalancers with separate
    configurations by using the sub environments.

  * The `osism.commons.sshconfig` role and the `osism.commons.certificates` role are now also run in
    the bootstrap play of the Manager.

  * With the `k3s-upgrade` play it is possible to upgrade the internal K3s Kubernetes cluster.

* New documentation.

  * The documentation for the
    [initial creation of a configuration repository using Cookiecutter](https://osism.tech/docs/guides/configuration-guide/configuration-repository)
    has been completely revised. In the Cookiecutter itself, notes have been added in many places to simplify
    the initial reworking of the created configuration repository.

  * Documentation for the [deployment of a second loadbalancer](https://osism.tech/docs/guides/configuration-guide/loadbalancer#second-loadbalancer) has been added.

* Changes in the Testbed.

  * It is now possible to provide the OpenStack APIs and the OpenStack Dashboard via a public IP address
    with a public DNS record including Letsencrypt certificate via a customization external-api via the
    manager node.

  * Ansible, which is required to initially deploy the Manager, is now installed in a virtual environment.
    This means that it is now also possible to use Ubuntu 24.04 as the operating system for the nodes.

* The CLI of the [Simple Stress tool](https://github.com/osism/openstack-simple-stress) has been changed
  to [Typer](https://typer.tiangolo.com). Units tests for improving code quality have been added.

* New Kubernetes CAPI images for the Kubernetes releases 1.27, 1.28, 1.29, and 1.30 are available.

* To avoid confusion, `rolling-upgrade` has been removed as a supported action for the `osism apply`
  command. The `upgrade` action should always and exclusively be used.

## 7.0.4 (20240507)

Release date: 7. May 2024

Due to an error in `osism/sbom` repository, the Nova and Octavia images were not updated as
originally stated in the release notes for OSISM 7.0.3. Therefore it was unfortunately necessary
to release a 7.0.4 which contains the correct SBOM. In 7.0.4 nothing has changed except the SBOM.
The correct images for Nova and Octavia are now included in 7.0.4 and the bugs listed below have
been fixed. An update of the Manager Service must be done and then, if required, an update of Nova
and Octavia can be updated as originally planned for OSISM 7.0.3. We apologize for the mistake and
the resulting effort.

* The OpenStack service images for Octavia and Nova have been rebuilt. Upgrades of the Octavia
  and Nova services are recommended. No upgrades of other OpenStack and associated
  infrastructure services such as MariaDB or RabbitMQ are required.

  * The Nova images have been rebuilt to add packages to be able to use vTMP ([osism/issues#1008](https://github.com/osism/issues/issues/1008))
    If this is not relevant, the upgrade can be skipped.

  * The octavia images have been rebuilt to resolve an issue when creating a LB + a listener
    with an allowed_cidr with the fully-populated API ([osism/issues#980](https://github.com/osism/issues/issues/980))

  * When upgrading the Nova and Octavia API services, there is a short downtime of the APIs.
    This downtime is usually less than 1 minute.


## 7.0.3 (20240503)

**Release date: 3. May 2024**

* The Ceph service images have not been rebuilt. No upgrade of Ceph is required.

* The OpenStack service images have not been rebuilt. No upgrade of OpenStack is required.

* During the preparation of the upgrades of the regions of the PCO a bug ([osism/issues#973](https://github.com/osism/issues/issues/973))
  has been noticed which leads to a delay of up to 2 minutes between the necessary container stops and starts.
  This is due to a bug in the service units of all Kolla services. The bug is fixed in the current release.
  **To avoid the delay during an upgrade, a fix must be applied in advance for all service units from
  Kolla.**

  ```console
  osism apply fix-gh973
  ```
* The Kubernetes Cluster API image for the Kubernetes (K8s) 1.30 series is available. The images are now provided directly with
  `osism manage image clusterapi`. This means that K8s Cluster API images are now available
  for K8s series 1.27, 1.28, 1.29 and 1.30.

* All Ansible collections have been prepared for use with Ubuntu 24.04. It is currently not recommended to
  upgrade existing clusters to Ubuntu 24.04 or to install new clusters with Ubuntu 24.04. There will be a note
  in future release notes that announces the full support of Ubuntu 24.04. At the moment everything related to Ubuntu
  24.04 is a technical preview.

* A new role `tempest` has been added to the Ansible collection `osism.validations`. This makes it possible
  to perform significantly more tests than with the previously used `osism.validations.refstack` role. The new
  role will be used in the testbed in future to significantly increase the number of tests performed in the CI.

* New documentation for the [project manager](https://osism.tech/docs/guides/operations-guide/openstack/tools/project-manager)
  and the [simple stress](https://osism.tech/docs/guides/operations-guide/openstack/tools/simple-stress).

* When using the reboot play, it is now possible to wait for the reboot to be completed ([osism/issues#758](https://github.com/osism/issues/issues/758)).


  ```console
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
  are now automatically pinned during synchronization with `gilt overlay`. This also applies to the
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

  ```console
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

## 7.0.2 (20240407)

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

* When synchronizing the configuration repository, it is now ensured that you are on the correct branch.

* Senlin images available again as rolling tag for OpenStack 2023.2.

* Zun images available again as rolling tag for OpenStack 2023.2 & 2024.1.

* New FRR configuration template for loadbalancers with an external uplink in the osism.services.frr role.

* `scs:name-v1` and `scs:name-v2` extra specs are now set via the OpenStack flavor manager.

* Task ID is now displayed in the output of the OSISM CLI for prepared tasks.

* New Makefile target in the OSISM Testbed to fetch the Wireguard configuration file: `vpn-wireguard-config`.

* With the play `noop` it is now possible to run a play with noop. This is useful for testing purposes of the manager service.

* The stable repository is now used as the default for the Netdata service in the `osism.services.netdata` role. This avoids
  package conflicts in future.

## 7.0.1 (20240327)

**Release date: 27. March 2024**

* It's now possible to also use custom plays in the `kolla` and in the `ceph` environments.
  As for the other environments, custom plays can now be stored there in a e.g. `playbook-hello-world.yml`
  file and run by using e.g. `osism apply -e kolla hello-world`.

* The version of k3s has been updated to `1.29.2`. If Kubernetes is used, upgrade with
  `osism apply kubernetes`.

* There is a new parameter `ceph_custom_keys` in the `copy-ceph-keys` play. This makes
  it possible to copy the keys from custom Ceph pools.

  ```yaml
  ceph_custom_keys:
    - src: ceph.client.manila1.keyring
      dest: "{{ configuration_directory }}/environments/kolla/files/overlays/manila/ceph.client.manila1.keyring"
  ```

* There is a new parameter `with_keycloak` in the cookiecutter. This can now be used to
  select whether the keycloak integration should be prepared or not.

* An error in the `ceph-pools` play has been fixed that prevented the keys from being
  created for the pools.

* The `ceph-iscsigws` play has been removed. The iSCSI gateway is in maintenance as of
  November 2022. This means that it is no longer in active development and will not be
  updated to add new features.

* With `ceph_serial` it is now possible to define how many hosts Ansible should manage at a single time
  in the Ceph plays.

  ```console
  osism apply ceph-mgrs -e ceph_serial=1
  ```

* With `ANSIBLE_VERSION` it's now possible to overwrite the use Ansible version when working with the `run.sh`
  script inside the manager environment.

* The `osism.commons.known_hosts` role has been completely revised.

  * avoid duplicate entries in the destination file
  * avoid comments in the destination file
  * make use of static entries possible

    It's now possible to add a `known_hosts` parameter to the host_vars to
    set static known hosts entries for a specific host. When this parameter
    is set `ssh-keygen` will not be used to generate the known hosts entries
    on the fly.

    ```yaml
    known_hosts:
      - ssh-rsa AAAAB3NzaC1y...
      - ecdsa-sha2-nistp256 AAAAE2VjZHN...
      - ssh-ed25519 AAAAC3NzaC1...
    ```

  * make use of extra entries possible

    It's now possible to add a `known_hosts_extra` parameter to the configuration
    repository to set extra known hosts entries.


    ```yaml
    known_hosts_extra:
      - testbed-node-1.testbed.osism.xyz ssh-rsa AAAAB3Nza...
      - testbed-node-2.testbed.osism.xyz ssh-rsa AAAAB3Nza...
    ```

  * The Octavia images have been updated. If Octavia is used, an upgrade must be done
    with `osism apply -a upgrade octavia`. We addressed the following issues.

    * Backport of [openstack/octavia#896995](https://review.opendev.org/c/openstack/octavia/+/896995) to fix errors
      when deleting LB with broken amphorae.

    * Bugfix for [osism/issues#890](https://github.com/osism/issues/issues/890) (Octavia (OVN) does
      not find existing subnet) by enabling the use of the custom CA for octavia
      user session queries with the following PR:
      [osism/container-images-kolla#412](https://github.com/osism/container-images-kolla/pull/412)

## 7.0.0 (20240320)

**Release date: 20. March 2024**

* Shortly before the release, [gilt](https://github.com/retr0h/gilt)
  made a major release which led to breaking changes. It is therefore important
  for the moment to install `python-gilt < 2` when synchronizing the
  configuration repository against the generics. In the CI and within the container
  images, we currently use `python-gilt == 1.2.3`. This is also the version that's
  currently installed in the container images and that's set in the `requirements.txt`.

### Removals & Deprecations

* The role `osism.services.tang` for deploying the Tang service is deprecated in preparation for removal
  as it is currently not in a usable state. An attempt will be made to make the role usable until the next
  release. The same applies to Clevis integration via the `osism.commons.clevis` role.

* The role `osism.services.openldap` for deploying the OpenLDAP service  has been removed.

* The manager plays to control the Vault service (`seal`, `unseal`, ..) have been removed as these tasks will
  be realized directly via the OSISM CLI (`osism set vault password`, ..) in the future.

* The role `osism.services.bird` for deploying the Bird service has been removed.

### New features

* With the `osism manage image octavia` command it is possible to rotate the Octavia Amphora image,
  which is rebuilt daily. Older images are deactivated. The old images must be removed manually after
  rotating the amphorae instances.

* With the `osism manage image clusterapi` command it is possible to import all currently stable Cluster
  API images (v1.27, v1.28, and v1.29). As soon as new minor or major versions are available, these are also
  imported. Old and no longer used versions must currently be removed manually.

* The persistence feature in Octavia can enabled with the new `enable_octavia_jobboard` parameter.
  The jobboard in Octavia is an [experimental feature](https://docs.openstack.org/octavia/latest/install/install-amphorav2.html).
  It is not recommended to use it in production.

  ```yaml title="environments/kolla/configuration.yml"
  enable_octavia_jobboard: "yes"
  ```

  This requires an additional database, which is only created when Octavia play is run in bootstrap mode
  first.

  ```console
  osism apply -a bootstrap octavia
  ```

  The secret `octavia_persistence_database_password` must be added to
  `environments/kolla/secrets.yml` before.

  ```yaml title="environments/kolla/secrets.yml"
  octavia_persistence_database_password:  # generate with: pwgen 32 1
  ```

* In preparation for the migration to Rook, the Rook operator is deployable on the internal Kubernetes
  cluster with `osism apply rook`. The Rook operator is not yet used for the Ceph deployment. For the deployment
  of Ceph we still use the ceph-ansible project. For the next release a tool called [rookify](https://github.com/sovereigncloudstack/rookify) is planned to
  migrate the Ceph deployment from ceph-ansible to Rook.

* CentOS 9 support in `osism.commons`` & `osism.services`` Ansible collection.

  * The roles of the `osism.commons`` collection are now usable with CentOS 9. The roles have been tested with
    CentOS 9.
  * The roles of the `osism.services`` collection are now usable with CentOS 9. The roles have been tested with
    CentOS 9.

* With the [openstack-resource-manager](https://github.com/osism/openstack-resource-manager) it is now possible to
  clean up orphaned amphora instances of Octavia or volumes that are stuck in the `DELETING` state.

* Kubernetes can now be deployed with [k3s-ansible](https://github.com/k3s-io/k3s-ansible) on the management plane and the control plane.

* It is now possible to manage the Ceph pools independently of `ceph-osds`` play using the `ceph-pools` play.

### Upgrade notes

* The switch from classic queue mirroring and durable queues to quorum queues
  in RabbitMQ has not yet been tested and documented. This is planned for the
  next release. The switch is not yet recommended.

* The `hosts_interface` parameter is now set to `internal_interface` by default.

* The Keycloak deployment via Docker Compose, which was previously included
  as a technical preview, has been completely revised and is now deployed on
  Kubernetes. No migration from the old deployment via Docker Compose to the
  new deployment via Kubernetes has been prepared. If you are currently using
  the Keycloak service, do not upgrade the Keycloak service and contact us in
  advance.

* The Keystone role `service` is required by a number of OpenStack services. The
  role has been created automatically with new deployments for some time now. It is
  possible that this role is not yet available on older deployments and must be created
  once in preparation for the upgrade. You can check whether the role is available in
  the output of `openstack --os-cloud admin role list`. If it does not exist, it can
  be created with `openstack --os-cloud admin role create service`.

  This `service` role is required by the service accounts for authentication after the
  upgrade of the OpenStack services. To avoid problems during the upgrade, it is important
  to assign this role to all existing service accounts in advance.

  ```console
  # List all users in the project service with the admin role. The existing service
  # accounts depend on the deployed services and may vary.
  $ openstack --os-cloud admin role assignment list --names --role admin --project service
  +-------+--------------------------+-------+-----------------+--------+--------+-----------+
  | Role  | User                     | Group | Project         | Domain | System | Inherited |
  +-------+--------------------------+-------+-----------------+--------+--------+-----------+
  | admin | ironic@Default           |       | service@Default |        |        | False     |
  | admin | neutron@Default          |       | service@Default |        |        | False     |
  | admin | gnocchi@Default          |       | service@Default |        |        | False     |
  | admin | swift@Default            |       | service@Default |        |        | False     |
  | admin | nova@Default             |       | service@Default |        |        | False     |
  | admin | placement@Default        |       | service@Default |        |        | False     |
  | admin | cinder@Default           |       | service@Default |        |        | False     |
  | admin | glance@Default           |       | service@Default |        |        | False     |
  | admin | designate@Default        |       | service@Default |        |        | False     |
  | admin | octavia@Default          |       | service@Default |        |        | False     |
  | admin | skyline@Default          |       | service@Default |        |        | False     |
  | admin | ironic-inspector@Default |       | service@Default |        |        | False     |
  | admin | ceilometer@Default       |       | service@Default |        |        | False     |
  +-------+--------------------------+-------+-----------------+--------+--------+-----------+

  # Assign the service role to all users in the project service (repeat this step for every
  # user in the list.
  $ openstack --os-cloud admin role add --user ironic --project service service
  [...]
  ```

* The use of ProxySQL for MariaDB is now possible and it is possible to switch
  to it as part of the upgrade. It is not mandatory and there is no recommendation.
  The parameter `enable_proxysql` is added to `environments/kolla/configuration.yml`
  for this purpose.

  ```yaml title="environments/kolla/configuration.yml"
  enable_proxysql: yes
  ```

  The secrets listed below (`proxysql_admin_password`, `proxysql_stats_password`,
  `mariadb_monitor_password`) must also be added or changed.

  When migrating to ProxySQL, it is important to upgrade MariaDB first.

  When migrating to ProxySQL, it is important to perform the loadbalancer upgrade
  before all OpenStack service upgrades. To make sure that the OpenStack services
  continue to work after the upgrade when ProxySQL is enabled as part of the upgrade,
  the ProxySQL service must have been deployed first. The ProxySQL service is deployed
  with the loadbalancer play.

  It is possible that connectivity with the database may be interrupted for a short time
  during the migration. It is therefore recommended to carry out extensive tests on the
  staging environment in advance.

* The following secrets must be added in `environments/kolla/secrets.yml`:

  ```yaml title="environments/kolla/secrets.yml"
  octavia_persistence_database_password:  # generate with: pwgen 32 1
  prometheus_bcrypt_salt:                 # generate with: pwgen 22 1 <-- there's a 22
  prometheus_grafana_password:            # generate with: pwgen 32 1
  prometheus_password:                    # generate with: pwgen 32 1
  proxysql_admin_password:                # generate with: pwgen 32 1
  proxysql_stats_password:                # generate with: pwgen 32 1
  ```

* The parameter `mariadb_monitoring_password` in `environments/kolla/secrets.yml`
  has to be renamed to `mariadb_monitor_password`. If the parameter is not present,
  it is added.

  ```yaml title="environments/kolla/secrets.yml"
  mariadb_monitor_password:     # generate with: pwgen 32 1
  ```

* The following parameters must be removed from the configuration repository from
  `environments/kolla/configuration.yml`:

  ```yaml title="environments/kolla/configuration.yml"
  ceph_nova_user: nova
  ceph_nova_keyring: ceph.client.nova.keyring
  ```

* Parameters for the Netbox service in `environments/infrastructure/configuration.yml` or
  `secrets.yml` must now also be added in `environments/manager/configuration.yml` or
  `secrets.yml`. In an upcoming  release, the parameters can be removed from the
  infrastructure environment.

* The Ansible callback plugin `osism.commons.still_alive` is now available to avoid timeouts
  for long-running tasks. This currently has to be explicitly enabled in the Ansible configuration.
  This is done in the `environments/ansible.cfg` file in the configuration repository.
  The callback plugin is enabled by default in the future. After this change has been made, the
  update of the manager must be performed. A manager with a version before OSISM 7.0.0 cannot be
  longer used if this plugin is set in `environments/ansible.cfg`.

  ```ini title="environments/ansible.cfg"
  [defaults]
  ...
  stdout_callback = osism.commons.still_alive
  ```

* In the inventory, the `nova_backend` parameter must be added to the host vars of
  compute nodes where local storage is used.

  ```yaml
  nova_backend: default
  ```

* The SSL certificate file `haproxy.pem` is now available in a different location in the
  `haproxy` container. Previously it was stored under `/etc/haproxy/haproxy.pem`. From
  now on it is stored under `/etc/haproxy/certificates/haproxy.pem`. If you have customized
  the configuration for the haproxy service or use overlays for this, adjust the locations of
  the SSL certificate as required.

* Due to the upgrade from Fluentd to version 5, some directory names within the container
  image for Fluentd have changed. If you have worked with overlay files in the Fluentd service,
  check these in advance. Currently we know that ``/var/run/td-agent`` is now available as
  `/var/run/fluentd` (check [osism/issues#864](https://github.com/osism/issues/issues/864)
  for details).  We assume that other directory names have changed similarly.

* If a Keystone domain with LDAP backend is used, it is important to add the `tls_cacertfile`
  parameter in the `[ldap]` section of the corresponding domain configuration.

  ```ini
  [ldap]
  ...
  tls_cacertfile = /etc/ssl/certs/ca-certificates.crt
  ```

* The management of Ceph pools and Ceph clients/keys has been moved to a separate play
  `ceph-pools`. It is important to set the `openstack_config` parameter in `environments/ceph/configuration.yml`
  to `false` or remove it completely if it still exists or is not yet set to `false`.

### Known issues

* If error `Couldn't fetch the key client.bootstrap-rbd at /var/lib/ceph/bootstrap-rbd/."`
  occurs when updating Ceph in task `create potentially missing keys (rbd and rbd-mirror)`,
  create directory `/var/lib/ceph/bootstrap-rbd/` on the 1st control node used for Ceph.
  Use the UID `64045` and the GID `64045`. Set `0755` as permissions.

* There are currently problems when using a custom CA in combination with Octavia ([osism/issues#890](https://github.com/osism/issues/issues/890)).
  A bugfix for this will be made available soon.

* There is another problem when using Octavia in combination with OVN which leads to a leakage
  of ports when deleting load balancers ([osism/issues#921](https://github.com/osism/issues/issues/921)).
  A bugfix for this is also expected to be available soon.

* The manager service is updated via `osism update manager`. If this command is not yet
  available, you can use `osism-update-manager` as an alternative.

  ```console
  osism: 'update manager' is not an osism command. See 'osism --help'.
  ```

* With some upgrades we noticed that in certain constellations there were problems with the
  OpenStack Octavia service, which could be prevented if the parameter `valid_interfaces` was added
  to the `environments/kolla/files/overlays/octavia.conf` file ([osism/issues#1021](https://github.com/osism/issues/issues/1021)).

  ```ini title="environments/kolla/files/overlays/octavia.conf"
  [certificates]
  valid_interfaces = internal

  [keystone_authtoken]
  valid_interfaces = internal

  [glance]
  valid_interfaces = internal

  [neutron]
  valid_interfaces = internal

  [nova]
  valid_interfaces = internal
  ```

### Other & References

Refstack 2022.11 results:

```text
======
Totals
======
Ran: 356 tests in 1221.9879 sec.
  - Passed: 353
  - Skipped: 3
  - Expected Fail: 0
  - Unexpected Success: 0
  - Failed: 0
Sum of execute time for each test: 715.6658 sec.
```

OpenStack 2023.2 press announcement: https://www.openstack.org/software/openstack-bobcat

OpenStack 2023.2 release notes: https://releases.openstack.org/bobcat/index.html

Release notes for each OpenStack service:

* Barbican: https://docs.openstack.org/releasenotes/barbican/2023.2.html
* Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2023.2.html
* Cinder: https://docs.openstack.org/releasenotes/cinder/2023.2.html
* Designate: https://docs.openstack.org/releasenotes/designate/2023.2.html
* Glance: https://docs.openstack.org/releasenotes/glance/2023.2.html
* Heat: https://docs.openstack.org/releasenotes/heat/2023.2.html
* Horizon: https://docs.openstack.org/releasenotes/horizon/2023.2.html
* Ironic: https://docs.openstack.org/releasenotes/ironic/2023.2.html
* Keystone: https://docs.openstack.org/releasenotes/keystone/2023.2.html
* Manila: https://docs.openstack.org/releasenotes/manila/2023.2.html
* Neutron: https://docs.openstack.org/releasenotes/neutron/2023.2.html
* Nova: https://docs.openstack.org/releasenotes/nova/2023.2.html
* Octavia: https://docs.openstack.org/releasenotes/octavia/2023.2.html
* Placement: https://docs.openstack.org/releasenotes/placement/2023.2.html
* Skyline: https://docs.openstack.org/releasenotes/skyline-apiserver/2023.2.html, https://docs.openstack.org/releasenotes/skyline-console/2023.2.html
