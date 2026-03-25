---
sidebar_label: OSISM 10
---

# OSISM 10

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager.mdx).

:::info

Similar to the Ubuntu point release model, the first release of OSISM 10 is intended for new installations, early adopters and testing purposes. For existing production environments we recommend to wait until the first point release OSISM 10.1 before upgrading.

:::

:::info

Starting with OSISM 10, a specific OSISM version is no longer tied to a single version of
Kubernetes, Docker, Ceph, or OpenStack. Instead, multiple versions of these components are
supported within the same OSISM release. For OSISM 10, this means that both OpenStack 2025.1
and OpenStack 2025.2 will be supported. OpenStack 2025.2 will be added with one of the next
releases.

:::

| Release     | Release Date     |
|:------------|:-----------------|
| 10.0.0-rc.1 | 8. December 2025 |
| 10.0.0-rc.2 | 30. January 2026 |
| 10.0.0      | 22. March 2026   |

## Upgrade notes

### RabbitMQ 3 to RabbitMQ 4 migration

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

   Before upgrading Nova, two additional steps are required in preparation. Afterwards, you can upgrade
   Nova as usual with `osism apply -a upgrade nova`.

   ```bash
   osism apply -a config nova -l 'nova-conductor[0]'
   osism apply nova-update-cell-mappings
   ```

   After upgrading all services, you can also delete all remaining classic queues at once using
   `osism migrate rabbitmq3to4 delete`.

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

8. Once everything has been upgraded, the old notification queues can also be deleted with
   `osism migrate rabbitmq3to4 delete notifications`.

9. Old exchanges can be removed with `osism migrate rabbitmq3to4 delete-exchanges`.

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

### New namespace for Kolla images

To make it easier to identify which OpenStack version is being used, the OpenStack version is
now included in the Kolla Image namespace. An existing `docker_namespace` parameter must be adjusted
accordingly. In the case of OSISM 10, this looks as follows. In the future, it will be possible to use
different OpenStack versions with a specific OSISM release.

```yaml title="environments/kolla/configuration.yml"
docker_namespace: kolla/release/2025.1
```

### New container registry

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

### New service names for RadosGW in Ceph Reef

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

### Removal of the community.general.yaml Ansible plugin

If `community.general.yaml` has been set for `stdout_callback` in `ansible.cfg`,
this entry must be removed and replaced with `result_format=yaml`.

```text
ERROR! [DEPRECATED]: community.general.yaml has been removed. The plugin
has been superseded by the option result_format=yaml in callback plugin
ansible.builtin.default from ansible-core 2.13 onwards. This feature was
removed from community.general in version 12.0.0. Please update your
playbooks.
```

### TLS for ProxySQL is now enabled by default

If you are already using ProxySQL, but without TLS, set the following parameter in
`environments/kolla/configuration.yml`.

```yaml title="environments/kolla/configuration.yml"
database_enable_tls_internal: "no"
```

### Open vSwitch hostname now defaults to FQDN

The default for `openvswitch_hostname` has been changed from `{{ ansible_facts.hostname }}` (short hostname)
to `{{ ansible_facts.fqdn }}` (fully qualified domain name). This aligns the Open vSwitch `external-ids:hostname`
with Neutron's `requested-chassis` field, which uses the FQDN-based name from the agent on FQDN-based deployments
([kolla-ansible change](https://opendev.org/openstack/kolla-ansible/commit/68036c19b0ce0ccd503843c85e42edb44cfc19e8)).

If your deployment relies on the short hostname, set the following parameter in
`environments/kolla/configuration.yml` to restore the previous behavior.

```yaml title="environments/kolla/configuration.yml"
openvswitch_hostname: "{{ ansible_facts.hostname }}"
```

### Remove of the Apache2 Shibboleth module in Keystone image

Due to repeated problems with the Apache2 Shibboleth module in conjunction with the Apache2 OIDC
module in the Keystone container image, the Apache2 Shibboleth module has been removed. An overlay
image is now available with [osism/keystone-shib](https://github.com/osism/container-images/tree/main/keystone-shib),
which only contains the Apache2 Shibboleth module and can be used as needed.

### New parameters

* Generate password with `pwgen 32` and add `prometheus_haproxy_password` to `environments/kolla/secrets.yml`

### Ceph RGW Multisite support

Support for Ceph RGW Multisite deployments is available through a dedicated `ceph-ansible-rgw-multisite`
container image. This image is provided for Ceph Quincy, Reef, and Squid releases and includes the
necessary functionality for deploying and managing RGW Multisite configurations.

To use the RGW Multisite image, set the following parameter in `environments/ceph/configuration.yml`:

```yaml title="environments/ceph/configuration.yml"
ceph_ansible_container_image: "registry.osism.tech/osism/ceph-ansible-rgw-multisite:CEPH_RELEASE"
```

Replace `CEPH_RELEASE` with your target Ceph version (`quincy`, `reef`, or `squid`).

## Manager Service

### Fast Inventory for large environments

For large environments with monolithic `hosts.yml` files (~50 MB), Ansible's startup time is
dominated by parsing YAML with all variables inlined. The new `/inventory/fast/` directory provides
an alternative inventory source that combines a compact JSON group index (26–200x faster to parse
than YAML) with separate `host_vars/` and `group_vars/` directories that Ansible lazy-loads on demand.

This is enabled automatically — no manual configuration is required.

### CLI startup time reduction

Heavy libraries (Celery, OpenStack SDK, keystoneauth1, pynetbox, Redis, cryptography, Docker, PyMySQL)
were previously imported eagerly at module level, causing CLI startup times of ~11 seconds. These imports
are now deferred via lazy loading, reducing startup to near-instant.

### Read-only reconciler mode

A new reconciler mode reads netplan, FRR, and dnsmasq parameters from existing custom fields
without writing back to NetBox. This enables using an external NetBox instance with a read-only
API token.

### Inventory reconciler improvements

* **Secrets extraction**: Ansible Vault encrypted values from the `secrets` custom field on NetBox
  devices are extracted and written to `999-netbox-secrets.yml` with proper `!vault` tags.
* **VRF dummy interface support**: Per-VRF loopback devices (e.g. `lo-vrf-a`, `lo-vrf-b`) for
  EVPN/VRF deployments with SONiC leaf-spine fabrics are generated as `network_dummy_devices`
  (netplan) and `frr_vrfs` with `router_id` (FRR).
* **VXLAN tunnel and VRF support**: Generation of `network_tunnels` configuration for VXLAN
  interfaces (mode, link, VNI, MTU, local address) including VXLAN interfaces in VRF assignments.
* **Routed OOB dnsmasq support**: L3/routed OOB network mode for metalbox, where each rack has
  its own subnet with DHCP relay. Includes per-prefix tagging and binding dnsmasq to physical
  uplink interfaces.
* **Configurable dnsmasq DHCP lease time**: New `DNSMASQ_LEASE_TIME` environment variable
  (default: `28d`).
* **Per-label-prefix FRR uplink lists**: Separate uplink lists per label prefix (e.g.
  `frr_uplinks_data`, `frr_uplinks_bmc`) in addition to the combined `frr_uplinks`.
* **Site-based inventory grouping**: Devices are automatically grouped by their NetBox site
  assignment into `netbox-site-{site_slug}` groups, enabling site-based targeting in Ansible.
* **FRR local_pref custom field**: Per-interface BGP local preference via `frr_local_pref` custom
  field on uplinks.
* **Deep-merge local_context_data**: Auto-generated `frr_parameters` and `netplan_parameters` are
  deep-merged with device `local_context_data`, where `local_context_data` wins on conflicts.
* **Configurable Ceph RGW default port**: The `ceph_rgw_default_port` variable can now override
  the default RGW port (8081).
* **Empty group initialization**: All groups defined in `NETBOX_ROLE_MAPPING` now appear in the
  generated inventory even when no devices are assigned, avoiding reference errors.
* **Minified hosts.yml**: A `hosts-minified.yml` is generated containing only hosts and group
  memberships (no variables), enabling faster inventory queries.
* **Servicesleaf role**: `servicesleaf` added to default FRR switch roles, with support for FRR
  uplinks without remote AS for yrzn-type devices.
* **netplan_parameters for loopback0**: Custom netplan parameters from the `netplan_parameters`
  custom field are now merged into loopback0 interface configuration.
* **OOB interface filtering**: Management-only interfaces are excluded from netplan configuration
  for non-metalbox nodes.
* **MTU for loopback interfaces**: MTU is now also set on loopback interfaces in netplan
  configuration.
* **Always regenerate parameters**: Persistent caching of parameters in NetBox custom fields has
  been removed; parameters are always regenerated from NetBox data on every run.

### Log file tailing

The new `osism log file` command enables real-time log tailing from remote nodes via SSH, with
clush support for inventory groups. Paths are restricted to `/var/log` to prevent directory traversal.

### SCS compliance validation

The new `osism validate scs` command runs Sovereign Cloud Stack (SCS) IaaS conformity tests
against OpenStack clouds.

### Enhanced console/SSH with group support

The `osism console ssh` command now accepts Ansible inventory group names. Single-host groups
connect directly, multi-host groups show an interactive selection list.

### Kolla version synchronization

The new `osism sync versions` command extracts version information from SBOM container images
(via skopeo, no Docker required) and renders them to `environments/kolla/versions.yml`. Supports
`--release` to sync from a specific OSISM release and `--dry-run` for preview.

### Database and messaging cluster status

The new `osism status database` command validates the MariaDB Galera Cluster (wsrep status, cluster
connectivity, readiness, sync state, flow control metrics, transaction statistics). The new
`osism status messaging` command validates the RabbitMQ Cluster (cluster name, node status,
memory/disk alarms, health check alarms) across all nodes.

### OpenStack resource management

A suite of new `osism manage` commands for handling problematic OpenStack resources:

* `osism manage loadbalancer list/reset/delete` for Octavia loadbalancers stuck in PENDING or ERROR state.
* `osism manage amphora restore/rotate` for restoring ERROR amphorae or rotating amphorae older than
  30 days (configurable).
* `osism manage volume repair` for Cinder volumes stuck in DETACHING, CREATING, ERROR_DELETING, or
  DELETING states.
* `osism manage server clean` for servers stuck in BUILD (>2h, configurable) or ERROR status.

### Vault password chain verification

The new `osism vault check` command verifies the full vault password chain — keyfile existence,
Fernet key validity, Redis storage, password decryption — and optionally tests decryption against
a `secrets.yml` file.

### Vault decrypt

The new `osism vault decrypt` command decrypts Ansible Vault encrypted files in-place.

### Stale bind mount detection

The new `osism check mount` and `osism check inode` commands detect stale bind mounts on
`/opt/configuration`. `check mount` spawns a fresh container and compares inodes between container
and host views. Useful for diagnosing invisible file changes after git operations.

### Ironic sync improvements

* **Dry-run mode**: `--dry-run` flag for `osism sync ironic` to preview changes without modifying
  Ironic nodes, with secret masking.
* **Config Context support**: `ironic_parameters` from NetBox Config Context are merged into node
  attributes, with Ansible Vault decryption support.
* **Generic Jinja2 rendering**: All `ironic_osism_*` secrets are available as Jinja2 variables in
  node attributes.
* **Automatic node cleaning**: Nodes are automatically cleaned on undeployment via per-node
  automated cleaning configuration.
* **Baremetal maintenance and burn-in**: New commands for managing node maintenance state and
  triggering burn-in tests.
* **Extra/skip kernel parameters**: `--extra-kernel-param` and `--skip-kernel-param` options allow
  injecting or skipping specific kernel append parameters during sync.
* **IPv6 support for IPA kernel parameters**: Adds `osism-ipa-ipv6` kernel parameter from
  `frr_loopback_v6` alongside existing IPv4 support.
* **Ansible Vault decryption for FRR parameters**: Encrypted FRR passwords (e.g. BGP neighbor
  passwords) in NetBox `frr_parameters` custom fields are now automatically decrypted during sync.
* **Soft power off**: `osism baremetal power off --soft` enables graceful ACPI power off so the
  OS can shut down cleanly before hardware power is cut.
* **Automatic power off on enroll**: Newly synced/enrolled nodes are automatically powered off to
  ensure a defined initial power state.
* **Automatic boot device override**: Boot device is set to virtual media (cdrom) before deploy,
  clean, and burn-in operations to prevent BIOS boot order changes from blocking reprovisioning.
* **FRR parameters as kernel parameters**: For supported IPA types, FRR parameters from NetBox
  custom fields are automatically appended as kernel boot parameters.
* **AS number derivation from hostname**: For the yrzn001 IPA type, the BGP AS number is derived
  from the device hostname. `frr_local_as` from config context takes priority as an override.
* **Metalbox discovery**: The metalbox primary IPv4 address is resolved from NetBox and passed as
  the `osism-ipa-metalbox` kernel parameter. The metalbox IP is also added as a hosts entry in
  the bootstrap playbook used during baremetal deploy.

### Ansible play execution tracking

All Ansible play executions are tracked in `/share/ansible-execution-history.json` with timestamp,
runtime version, hosts, arguments, and result status.

### Configurable operator user

The hardcoded `dragon` username has been replaced with the `OSISM_OPERATOR_USER` environment
variable across all commands (console, container, compose, log, report, check, lock).

### New report commands

* `osism report memory` queries physical memory via dmidecode and product UUID for all hosts.
* `osism report bgp` shows BGP session state across nodes and supports an `--afi` filter option.
* `osism report lldp` reports LLDP neighbor information for hosts.
* `osism report status bootstrap` checks whether nodes have been bootstrapped by inspecting
  `/etc/ansible/facts.d/osism.fact`.

### OpenStack stress testing

The new `osism openstack stress` command supports `--mode` (rolling/block) and `--clean` parameters
for stress testing OpenStack environments. Additional capabilities include:

* **YAML profiles**: Predefined parameter sets (`quick`, `stress`, `volume`, `persistent`) can be
  loaded via `--profile`. Custom profile paths are also supported.
* **Burn-in mode**: `--burnin` creates instances running `stress-ng` on all CPUs via cloud-init.
  Instances stay alive for a configurable duration (default 48h), then get cleaned up.
* **Operation statistics**: After a stress test completes, a summary table shows count, errors,
  average, min, max, median, and P95 timing stats for all OpenStack operations.
* **Resource reuse**: Existing networks, subnets, and server groups are detected and reused instead
  of always creating new ones.

### Web frontend for baremetal and inventory

A new web frontend provides a baremetal node listing and detail view showing conductor, fault state,
maintenance reason, owner, lessee, traits, Redfish address, primary IPs, kernel parameters, netplan
and FRR parameters, with direct links to the corresponding NetBox device. Nodes can be looked up by
name or UUID. An inventory page allows querying Ansible inventory data (hostvars, cached facts) with
search, filter, and copy-to-clipboard support. Sensitive values (passwords, secrets, Ansible Vault
encrypted values) are masked in API responses.

### Live streaming of Ansible output

Ansible playbook output now appears line-by-line in real time instead of in buffered blocks.

### SONiC switch configuration

Extensive SONiC configuration support including VRF/VXLAN/EVPN, SNMP/syslog configuration,
BGP neighbor improvements, flexible VRF naming conventions, and tag-based L2VPN EVPN activation
for BGP neighbors.

### NetBox Manager improvements

* **`autoconf` command**: Analyzes the NetBox API and automatically generates configuration including
  primary MAC/IP address assignment, loopback0 interface generation, device interface label
  propagation, PortChannel LAG interface generation, and automatic `managed-by-osism` tagging.
  Supports per-site output for numbered site folder structures.
* **`purge` command**: Deletes all resources managed by netbox-manager in reverse dependency order
  while preserving users, tokens, and custom fields. Supports `--limit`, `--exclude-core`,
  `--dry-run`, `--force`, and `--parallel` options.
* **`validate` command**: Verifies NetBox configuration consistency via API-based checks including
  IP-Prefix validation and VRF consistency validation.
* **Run command options**: `--fail-fast` for CI/CD pipelines, `--ignore-errors` to continue despite
  failures, `--verbose` for debugging, `--show-playbooks` to preview generated playbooks.
* **`uri` task type**: Enables direct NetBox API calls (GET, POST, PATCH, DELETE) for operations
  not covered by standard netbox.netbox collection modules.
* **YAML syntax validation**: Resource files are validated with meaningful error messages including
  line/column information.
* **Configurable device roles**: `NODE_ROLES` and `SWITCH_ROLES` are now configurable via
  `settings.toml`, allowing deployments with custom roles (e.g. `compute-chassis`, `consoleserver`).
* **Configurable loopback network multiplicator**: Segments can override the default multiplicator
  in loopback IP address calculation via the `_segment_loopback_network_multiplicator` config
  context parameter.
* **FRR local_pref propagation**: When a switch has a `frr_local_pref` custom field, the autoconf
  command propagates it to connected node device interfaces.
* **Git commit info in export archive**: The `export-archive` command now includes a
  `COMMIT_INFO.txt` file in the generated tarball for traceability.

### OVN Network Agent

The new [ovn-network-agent](https://github.com/osism/ovn-network-agent) is an event-driven network
daemon for OVN-based OpenStack environments. It watches the OVN Southbound and Northbound databases
in real time via OVSDB and reacts instantly to changes such as gateway chassis failover, Floating IP
assignments, and SNAT changes.

In environments where provider networks are announced via BGP (e.g. in leaf-spine fabrics) rather
than connected to a physical gateway, the agent advertises Floating IPs as /32 host routes from the
chassis where the gateway router is currently active. For each locally active router it installs
kernel routes and FRR static routes so that FRR can announce them via BGP, manages OVS flows on the
provider bridge, and injects default routes and static MAC bindings into OVN NB so that reply
traffic exits correctly in pure BGP-routed environments (gatewayless provider networks).

Additional capabilities:

* **Port forwarding (DNAT)**: Forwards traffic from anycast VIP addresses to internal backends
  while preserving client IPs through connmark-based return routing. Multiple backends are supported
  with sticky source-IP hashing for consistent client distribution.
* **High-availability drain mode**: On shutdown the agent gracefully lowers the gateway chassis
  priority, allowing OVN to migrate ports to standby nodes before the agent exits, eliminating
  traffic disruption windows.
* **Automatic network discovery**: Provider networks are auto-discovered from OVN logical router
  port configurations when not explicitly specified.
* **Stale chassis cleanup**: Detects ungracefully departed gateway nodes and removes their orphaned
  OVN entries after a configurable grace period.
* **Periodic reconciliation**: A safety-net reconciliation loop (default 60 s) ensures convergence
  even if an event is missed.

### Reliability improvements

* Unique SSH control paths per Celery task prevent intermittent "Permission denied" errors with
  concurrent Ansible tasks.
* RabbitMQ 4 compatibility with passive exchange declarations.
* Periodic exchange discovery connects to new RabbitMQ exchanges dynamically.
* Shared session management for NetBox connections to prevent file descriptor exhaustion.

## Ansible Collections

### Services

* **Kepler role**: New role to deploy Kepler (Kubernetes-based Efficient Power Level Exporter) for
  energy consumption monitoring.
* **FRR YRZN configuration profile**: An entirely new set of FRR configuration templates supporting
  dual BGP sessions, configurable announced networks, optional BGP neighbor passwords, and
  metalbox/network variants.
* **FRR hostname-based configuration**: Support for per-host FRR configuration files with fallback
  to type-based configuration, enabling more granular control.
* **FRR external configuration template**: New `frr_config_template` variable allows providing the
  full FRR config as a Jinja2 template from an external source (e.g. NetBox config context).
* **FRR VRRP support**: New `frr_vrrp_groups` variable to configure VRRP-managed IP addresses with
  IPv4/IPv6, priority, and preempt settings for leaf configuration.
* **FRR BGP local preference**: Configurable BGP local preference values via `frr_local_pref`
  dictionary, including IPv6 support.
* **FRR BGP neighbor password support**: Optional authentication for BGP neighbors.
* **FRR configurable daemons**: Enable/options variables for ospfd, ospf6d, and vrrpd daemons.
* **IPv6 support for Docker networks**: Configurable IPv6 for internal Docker networks in manager,
  netbox, openstackclient, and traefik roles. Also IPv6 support for manager host address defaults.
* **httpd HTTPS/SSL support**: Optional HTTPS/SSL termination, host network mode with configurable
  listen addresses, and keepalive/performance/timeout settings.
* **Manager uses uv for pip**: Wrapper scripts now use `uv` instead of `pip` for faster package
  installations.
* **Configurable NetBox systemd dependency**: New `netbox_external` parameter to skip the systemd
  dependency when NetBox runs externally.
* **Netdata large-scale optimizations**: Switched to dbengine memory mode, streaming compression,
  configurable page cache/disk space, and 24h default history.

### Commons

* **Fast hosts template**: A new "fast" hosts-file generation type that pre-computes each host's
  entry and renders the template once on localhost, replacing the O(N^2) per-host rendering approach.
  Major performance improvement for large inventories.
* **network-extra-init service**: A new optional systemd service that runs custom bridge and IP
  commands after the network is ready (e.g. VXLAN FDB entries, VRRP interfaces). Configurable via
  `network_extra_init_commands`.
* **Operator PS1 prompt configuration**: Custom PS1 prompt support in the operator user's `.bashrc`
  with `prepend` and `replace` modes.
* **NetBox submodule support**: Dedicated NetBox submodule management in the configuration role
  with separate git private key handling.
* **Default Ubuntu mirror change**: Default Ubuntu mirror changed to `ftp.uni-stuttgart.de`
  (HTTPS, 100 Gbps).

### Validations

* **SCS compatible Tempest test list**: A new test list aligned with Sovereign Cloud Stack
  standards for Tempest validation runs.
* **Keystone security compliance testing**: New `tempest_enable_keystone` variable to enable
  identity/security_compliance testing when Keystone is enabled.

## Removals

### Kubernetes

* **ingress-nginx**: The Kubernetes project has [announced the retirement](https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/)
  of ingress-nginx. The project will receive best-effort maintenance until March 2026, after which no new
  releases, bug fixes, or security updates will be provided. Users should migrate to the
  [Gateway API](https://gateway-api.sigs.k8s.io/) or an alternative ingress controller.

* **Kubernetes Dashboard**: The Kubernetes Dashboard has been [archived by SIG UI](https://groups.google.com/g/kubernetes-sig-ui/c/vpYIRDMysek)
  and is no longer actively maintained. The recommended successor is [Headlamp](https://headlamp.dev/),
  which provides a modern web interface with plugin support and proper RBAC integration.

## Deprecations

### Deprecation of ceph-ansible

The deployment tool ceph-ansible is deprecated as of OSISM 10 and will not be supported in upcoming
OSISM releases. While ceph-ansible is still maintained upstream, development activity has slowed
significantly. The [official recommendation](https://github.com/ceph/ceph-ansible/blob/main/README.rst)
is to migrate to [cephadm](https://docs.ceph.com/en/latest/cephadm/).

Existing Ceph clusters deployed with ceph-ansible will continue to be fully usable in OSISM 10. This
deprecation affects the manageability of Ceph clusters via ceph-ansible. The day-to-day functionality
of the clusters themselves is not impacted. However, upgrades, expansions, and other lifecycle operations
on Ceph clusters via ceph-ansible will not be possible in future OSISM releases. A migration to a
an other deployment tool like cephadm will be required to perform such operations going forward.

We are actively preparing migration paths from ceph-ansible to cephadm. As each environment is unique,
the exact migration approach will depend on the specific deployment scenario. OSISM customers will
receive dedicated support for their migration. If you are planning to migrate, please contact us so we
can assist you with your specific requirements. In the meantime, we recommend familiarizing yourself
with the [cephadm documentation](https://docs.ceph.com/en/latest/cephadm/).

### Deprecation of hardening

The [ansible-hardening](https://github.com/openstack/ansible-hardening) role used by the `hardening`
play is deprecated as of OSISM 10 and will be removed in a future OSISM release. The role does not
work reliably with Ubuntu 24.04.

As an alternative, we recommend [UBUNTU24-CIS](https://github.com/ansible-lockdown/UBUNTU24-CIS),
which provides CIS benchmark hardening for Ubuntu 24.04. This role is currently not integrated
into OSISM and must be used as a [custom play](../guides/operations-guide/manager/apply.md#use-of-custom-plays).

### Out-of-tree Cinder drivers

In this and future OSISM releases, out-of-tree drivers for Cinder (e.g. vendor-specific storage
backends) will only be provided through a dedicated container image and are no longer included
in the default Cinder container image.

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
