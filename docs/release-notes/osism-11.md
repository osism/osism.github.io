---
sidebar_label: OSISM 11
sidebar_position: 5
---

# OSISM 11

:::warning

OSISM 11 is validated for **new installations only**. Upgrading an existing
deployment to OSISM 11 is not covered by its releases so far. Do not upgrade an
existing environment to OSISM 11 until a release documents the upgrade path.

:::

:::info

OSISM 11 supports only OpenStack 2026.1 Gazpacho. Following the
[SLURP-only policy](../concepts/release-cadence.md), OSISM tracks exactly one
OpenStack release per major version — the spring SLURP release (`YYYY.1`) — so
the non-SLURP OpenStack 2026.2 Hibiscus is not added to OSISM 11.

Kubernetes (managed with Gardener), Docker, and Ceph (managed with cephadm) are
not tied to a single version within an OSISM major release and can be updated
independently of it.

:::

| Release | Release Date     |
|:--------|:-----------------|
| 11.0.1  | 11. October 2026 |
| 11.0.0  | 8. October 2026  |

## 11.0.1

OSISM 11.0.1 supersedes 11.0.0. OSISM 11.0.0 fails to deploy because of the image
tag problems fixed in this release, so use 11.0.1 for new installations.

### OpenStack services (2026.1)

* **Nova scheduler no longer drops consumers on every `osism apply nova`**: kolla-ansible's cell-cache refresh sends SIGHUP to `nova-scheduler` on every nova deploy or reconfigure, and nova's shutdown handler used to sleep for `manager_shutdown_timeout` (160s by default) before respawning. Every `scheduler` queue in the cloud was left without consumers for close to three minutes, during which `select_destinations` calls could time out. A carried patch now renders `manager_shutdown_timeout = 0` for `nova-scheduler` only; `nova-compute` and `nova-conductor` keep the default, so live migrations and other in-progress operations still wait for it. Override the value in the custom config file `nova/nova-scheduler.conf` if you need a different shutdown behavior for the scheduler.
* **RabbitMQ consumers now respect the configured prefetch count**: with `om_enable_rabbitmq_stream_fanout` set to `false` in OSISM's 2026.1 overlay, kolla-ansible only rendered `rabbit_qos_prefetch_count` inside the stream-fanout block, so `om_rpc_qos_prefetch_count` (50 by default) never reached any service configuration. Consumers ran with unlimited prefetch, letting a single consumer claim every ready message of a quorum queue instead of spreading load across workers. The prefetch count is now rendered unconditionally in every affected service template.
* **Several kolla images no longer request nonexistent tags**: on 11.0.0, ten images requested a tag that was never populated because the image's own release version never reached the variable the tag is read from. This is fixed for keystone's httpd frontend (and ironic's and the Let's Encrypt webserver's, if enabled), for `hacluster` and `hacluster-corosync`, for `ovsdpdk`, and for the Prometheus valkey and openstack-network exporters, both enabled by default in this release. No configuration change is required.
* **ProxySQL's Galera reader hostgroup now includes the backup writers**: `writer_is_also_reader` changed from `0` to `2`, so the standby Galera nodes are also members of the reader hostgroup; the active writer stays out of it. This does not change where queries go on a standard deployment: kolla's ProxySQL query rules send every service's traffic to the writer hostgroup, so all reads and writes still reach the single active writer. It only affects query routing if you add your own query rules that send reads to the reader hostgroup.

### osism-ansible now pins infrastructure service versions

`osism apply` stopped loading `group_vars/all/images.yml` in 2022, so adminer, dnsmasq, opentelemetry-collector, phpmyadmin, scaphandre and step-ca have been running at each role's own default tag since then. `versions.yml` now carries pinned tags for all of them, reaching the inventory through the osism-ansible image and the inventory reconciler:

* adminer 4.7 → 5.5.1 (fixes CVE-2026-25892, CVE-2021-29625 and GHSA-r4x9-5m63-3vxw, among others)
* dnsmasq 2.90 → 2.91 (memory-safety fixes)
* opentelemetry-collector 0.136.0 → 0.162.0
* phpmyadmin 5.2 → 5.2.3
* scaphandre 1.0.0 → 1.0.3
* step-ca 0.28.4 → 0.30.2 (fixes CVE-2025-44005, affecting ACME and SCEP provisioners, plus CVE-2025-66406, CVE-2026-30836 and CVE-2026-40097)

An operator override in the service's own `images.yml` (for example `environments/kolla/images.yml` for step-ca, `environments/monitoring/images.yml` for scaphandre) still takes precedence over these pins. The opentelemetry-collector role also now renders the OTLP gRPC exporter as `otlp_grpc` for collector versions 0.144.0 and later, matching the bumped tag and avoiding a deprecation warning.

## 11.0.0

### OpenStack services (2026.1)

OSISM 11.0.0 deploys OpenStack 2026.1.

- The `mariadb_backup` playbook alias is gone in 2026.1; use `osism apply mariadb-backup`.
- Keystone federation is served from its own httpd container in 2026.1. Federation has not been validated with OSISM 11.
- MariaDB is reached through ProxySQL, which is the default MariaDB load balancer since 2025.2. With internal TLS enabled, as in a configuration generated by cfg-cookiecutter, `database_enable_tls_internal` resolves to `yes` and ProxySQL needs its own certificate and key, `environments/kolla/certificates/proxysql-cert.pem` and `proxysql-key.pem`, and the CA that issued them as `environments/kolla/certificates/proxysql-ca.pem`. Without `proxysql-ca.pem`, ProxySQL falls back to `environments/kolla/certificates/ca/root.crt`, which only reaches the container with `kolla_copy_ca_into_containers: "yes"`. Without them `osism apply loadbalancer` fails at `Copying over proxysql-cert.pem`. To keep the database connections unencrypted instead, set `database_enable_tls_internal: "no"` in `environments/kolla/configuration.yml`. See the [loadbalancer configuration](../guides/configuration-guide/loadbalancer.md).

### Ceph deployment with cephadm

The nutshell collection, used to set up a new Ceph cluster, now deploys it with cephadm instead of ceph-ansible from OSISM 11 onward. `osism apply` gained `--osism-version` and `--ceph-backend` options to control the selection explicitly.

New plays cover the full bootstrap: installing cephadm, bootstrapping the cluster on the monitor hosts, registering the remaining Ceph hosts, moving configuration overrides into the monitor config store, enabling the configured mgr modules, deploying MON, MGR and crash, creating OSDs from prepared LVM volumes, and deploying RGW and CephFS with their pools when enabled. The dashboard is configured on plain HTTP with standby handling. The OSD device preparation plays `configure-lvm-volumes` and `create-lvm-devices`, previously shipped only in the ceph-ansible image, now also live in osism-ansible, so they work regardless of backend; run them as `osism apply configure-lvm-volumes` and `osism apply create-lvm-devices` (no `ceph-` prefix, to avoid colliding with the existing ceph-ansible roles).

cephadm reaches the Ceph hosts with its own SSH key, `ceph_ssh_private_key` in `secrets.yml`, instead of the shared operator key. cfg-cookiecutter generates it for new configurations, together with `ceph_public_key` and `inventory/group_vars/ceph.yml`. It is authorized only on the Ceph hosts through a new group-scoped mechanism, `operator_additional_authorized_keys` (with an `operator_additional_authorized_keys_delete` counterpart), which can also authorize other keys on a specific host group without touching the deployment-wide `operator_authorized_keys` list.

The ceph-ansible image now refuses to run any `ceph-*` play, including the LVM preparation plays, against a cluster already managed by cephadm. It also refuses to run when the deployment's `ceph_version` does not match the Ceph release series the image was built for. Without this guard, ceph-ansible's legacy container names made these plays fail only after they had already changed things on the hosts. Override either check with `-e ceph_cephadm_guard=false`, or durably with `ceph_cephadm_guard: false` in `environments/ceph/configuration.yml`.

The kolla images now install the Ceph client from download.ceph.com (20.2.4) instead of the Ubuntu archives, so OpenStack services can connect to a Ceph cluster that mints `aes256k` cephx keys (Squid 19.2.6+ or Tentacle 20.2.4+); the Ubuntu and UCA client packages cannot read those keys yet, which broke the connection for every Ceph-consuming service.

Kernel Ceph clients need `aes256k` support as well, which according to the upstream Ceph advisory is available from Linux 7.0. This affects tenants mounting CephFS shares with the kernel client through Manila's native CephFS backend, and kernel RBD mappings. Manila's CephFS-via-NFS backend and all librbd/librados consumers (Nova, Cinder, Glance) are not affected.

`osism validate ceph-rgws` now tests S3 at the address the gateway actually listens on instead of the inventory hostname, which is what cephadm's routed topology requires, since there the gateway binds only to the Ceph public network address. The `ceph-mons`, `-mgrs`, `-osds` and `-rgws` validators now fail the play when a validation fails, so `osism validate` reports the failure instead of exiting successfully regardless of the result.

### Configuration repository from an earlier deployment

A new OSISM 11 deployment can start from a configuration repository taken over from an OSISM 10 or older deployment instead of one generated by cfg-cookiecutter. Such a repository lacks settings that OSISM 11 requires:

- `ceph_version: tentacle` in `environments/configuration.yml`. The osism-ansible image carries Ceph image versions for every Ceph release it supports and selects them with `ceph_version`; until OSISM 10 the ceph-ansible image defined it. Without it, `osism apply cephadm-bootstrap` and `osism apply cephclient` fail on an undefined variable.
- The cephadm SSH key: `ceph_ssh_private_key` in `environments/secrets.yml` (encrypted with Ansible Vault), `ceph_public_key` in `environments/configuration.yml`, and `inventory/group_vars/ceph.yml`, which authorizes the public key on the Ceph hosts through `operator_additional_authorized_keys`.
- `enable_ceph_rgw: true` in `environments/ceph/configuration.yml` when RGW is wanted, in addition to `environments/kolla/configuration.yml`. The cephadm RGW and pool plays read it from the ceph environment, and without it RGW is not deployed while Keystone still gets the object-store endpoints. Every RGW host also needs `radosgw_address` in its host vars; `radosgw_interface` is not supported with cephadm.
- No `rgw keystone api version` in `ceph_conf_overrides` in `environments/ceph/configuration.yml`. Tentacle removed the option together with Keystone v2.0 support, and setting it fails the cephadm configuration step. It stays valid for Reef and Squid.
- `valkey_master_password` in `environments/kolla/secrets.yml`. Valkey replaces Redis from OpenStack 2025.2 on, and this is the only secret OpenStack 2026.1 adds over 2025.1.
- The ProxySQL certificate, key and CA described under [OpenStack services](#openstack-services-20261), if internal TLS is enabled.

### CIS hardening for Ubuntu 24.04

The [UBUNTU24-CIS](https://github.com/ansible-lockdown/UBUNTU24-CIS) role is
integrated as `osism apply ubuntu24-cis`; the play only accepts Ubuntu 24.04
hosts. Setting `enable_cis_hardening: true` also runs CIS hardening in
`osism apply bootstrap` and `osism apply maintenance`; it is off by default.
The flag is not tied to an Ubuntu release: the hook picks the CIS role that
matches each host's release and skips hosts on a release without one.

The defaults apply the CIS Level 1 server profile without the controls that
break an OSISM node: no firewall management; forwarding, `rp_filter` and time
sync left to OSISM; host logging kept on rsyslog; unowned and world-writable
files reported rather than changed, since container and Ceph data has no host
owner; no AIDE; and no Level 2 rules. Tighten them
with `ubtu24cis_*` variables in `environments/configuration.yml`; the OSISM
values are in `all/099-ubuntu24-cis.yml` of
[osism/defaults](https://github.com/osism/defaults).

The role uninstalls `apport` and the `telnet` and `ftp` clients. That removes
the `ubuntu-server` and `ubuntu-standard` metapackages, and the next
`osism apply maintenance` autoremoves what they pulled in, among others
`open-vm-tools`, `fwupd`, `udisks2`, `tcpdump` and `nano`. To keep such
packages, list them in `required_packages_extra`; that marks them as manually
installed, so autoremove keeps them. It does not help for packages the role
removes itself: keep those with the role's switches, such as
`ubtu24cis_telnet_required: true` or `ubtu24cis_ftp_client: true`.

The `hardening` play (ansible-hardening) is unchanged and still deprecated.
With both enabled, the two roles set the SSH server and `login.defs` options
differently and rewrite them on every bootstrap and maintenance run; the CIS
values win because the CIS role runs last. Both also declare `TMOUT` read-only,
so every login shell prints a `readonly variable` error. Set
`enable_hardening: false` when enabling `enable_cis_hardening`.

### openstack-image-manager

- `--verify-checksum` checks a downloaded image's bytes against its published checksum before anything is created in Glance, including for rolling `latest` versions and `file:` imports, which were previously imported unchecked. It recognizes bare MD5/SHA1/SHA512 digests as well as `algo:hex` ones. Without the flag, an import that cannot be checked is only logged as a warning, as before.
- `min_disk` is now optional in image definitions. The manager raises it to the image's virtual disk size, rounded up to whole GiB, after import, instead of only the size of the downloaded file; an undersized value in a definition is corrected the same way. Previously an undersized `min_disk` advertised a disk size Nova then refused to boot a volume of.
- Image definitions are now re-applied to every existing image on each sync, not only at import. A manual change to a managed image's tags, status or visibility is reverted on the next run; `--dry-run` still only reports what would change.
- New opt-in `--retire-expired` option stops importing or updating, and retires, images whose definition's `provided_until` date has passed, following the existing `uuid_validity`, `--hide` and `--use-os-hidden` retention settings. Without the flag, an expired definition is still imported, with a warning that `--retire-expired` would retire it.
- New Ubuntu Core 26 image definition, booting via UEFI.
- AlmaLinux image definitions now set `os_distro` to `almalinux` instead of `centos`, to satisfy the SCS-0102-V2 uniqueness requirement. Update any filter or script that still matches AlmaLinux images on `os_distro: centos`.
- A superseded multi-version generic image is now demoted to `oldgeneric` in a single Glance update, instead of up to three separate requests that could leave it half-retired if one failed in between.
- The manager tolerates a managed image missing `image_description` or `internal_version` properties instead of failing with a `KeyError`, and aborts image sharing with an error message when the target domain does not exist instead of raising an `AttributeError`.

### Notable changes

- **Image registries**: ten registry defaults for OSISM-built images (Ceph, cephclient, the Ansible images run by the manager such as osism-ansible and kolla-ansible, dnsmasq, netbox, cgit, dnsdist, homer, nexus, openstackclient) now point at `registry.osism.tech` instead of `quay.io`, which OSISM stopped publishing to in February 2025. A deployment that never overrode these registries could not pull Tentacle's Ceph images at all, and got stale images of everything else.
- **SSH reliability**: `ssh_args` now includes server-alive probes, so a session whose transport died silently, for example when a host's own package upgrade restarts `systemd-networkd` mid-play, is dropped after five minutes instead of waiting on the kernel's two-hour TCP keepalive and wedging the play.
- **HAProxy log rotation**: the kolla `cron` container is now deployed to every host that runs fluentd, not only to hosts in the `compute`, `control`, `monitoring`, `network` and `storage` groups. Dedicated loadbalancer nodes and managers outside the `monitoring` group received HAProxy's syslog output but had nothing to rotate it, so the log grew until the disk filled. HAProxy's logs are also rotated by renaming them instead of copying and truncating them: `copytruncate` needs free space equal to the size of the log, so a log that had outgrown its rotation interval filled the disk on every rotation attempt.
- **step-ca**: a deployment with a separate manager failed to bring up stepca at all, because its health check resolved the CA's own DNS name to the unreachable internal VIP instead of to itself; it now resolves to itself while still verifying TLS against the CA's real certificate. Separately, the SSH CA was never actually initialized by this role, on any deployment, because the init flag was rendered as a Python boolean instead of the string the entrypoint checks for. This is now fixed.
