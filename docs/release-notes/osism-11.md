---
sidebar_label: OSISM 11
sidebar_position: 11
---

# OSISM 11

:::warning

OSISM 11 is validated for **new installations only**. Upgrading an existing
deployment to OSISM 11 is not covered by this release. Do not upgrade a
production environment to OSISM 11 until a release documents the upgrade path.

:::

:::info

OSISM 11 supports only OpenStack 2026.1 Gazpacho. Following the
[SLURP-only policy](../concepts/release-cadence.md), OSISM tracks exactly one
OpenStack release per major version — the spring SLURP release (`YYYY.1`).

:::

## Next

### Ceph is deployed with cephadm, on Tentacle

New deployments deploy Ceph with [cephadm](https://docs.ceph.com/en/tentacle/cephadm/)
instead of ceph-ansible, and on Ceph Tentacle (20.2). ceph-ansible has no
branch past Squid, so it cannot deploy Tentacle at all. The deployment is
driven by `osism apply cephadm-<step>`, see the
[Ceph deploy guide](../guides/deploy-guide/services/ceph/index.mdx#deployment-with-cephadm).

- The `nutshell` collection selects the Ceph workflow by OSISM release: OSISM 11
  and the `latest` track use cephadm. `osism apply --ceph-backend ceph-ansible nutshell`
  keeps an existing cluster on ceph-ansible (the option goes before the collection
  name); selecting a workflow does not migrate a cluster.
- A cephadm deployment runs no ceph-ansible container. A configuration generated
  by cfg-cookiecutter for a Ceph release past Squid sets
  `ceph_ansible_enable: false` in `environments/manager/configuration.yml`.
- On the `latest` track `ceph_version` is set in `environments/configuration.yml`,
  so that every environment sees it, not only the manager.
- The OSD device preparation plays run in osism-ansible on cephadm deployments:
  `osism apply configure-lvm-volumes` and `osism apply create-lvm-devices`. The
  `ceph-configure-lvm-volumes` and `ceph-create-lvm-devices` forms remain for
  deployments on ceph-ansible.
- cephadm connects to the Ceph hosts with a dedicated SSH key of its own, not the
  operator key. cfg-cookiecutter generates it for new configurations
  (`ceph_ssh_private_key`, `ceph_public_key` and `inventory/group_vars/ceph.yml`).
- On a cluster managed by cephadm, `osism apply ceph-*` refuses to run, because
  those ceph-ansible plays would change hosts before failing on the missing
  ceph-ansible containers. Override for a single run with
  `-e ceph_cephadm_guard=false`.
- `rgw keystone api version` is removed in Tentacle together with Keystone v2.0
  support, and writing it fails the cephadm configuration step. Remove it from
  `ceph_conf_overrides` in `environments/ceph/configuration.yml` when deploying
  Tentacle; it stays for Reef and Squid, which still default it to `2`.
- On a routed topology, where each host's Ceph address is a `/32` on a loopback
  device, the `ceph-daemon` image carries a fix to cephadm's address discovery,
  without which `ceph orch apply` places no daemons on those networks.

### cephx keys use aes256k on new clusters

A new cluster on Ceph Tentacle 20.2.4 (or Squid 19.2.6) mints `aes256k` cephx
keys only. The OpenStack images therefore install the Ceph client from
`download.ceph.com` (20.2.4); the Ubuntu Cloud Archive and Ubuntu packages
cannot read these keys.

Kernel Ceph clients need aes256k support, which according to the upstream Ceph
advisory is available from Linux 7.0. This affects tenants mounting CephFS shares
with the kernel client through Manila's native CephFS backend, and kernel RBD
mappings. Manila's CephFS-via-NFS backend and all librbd/librados consumers (Nova,
Cinder, Glance) are not affected.

### Ceph validators fail when a validation fails

`osism validate ceph-mons`, `ceph-mgrs`, `ceph-osds` and `ceph-rgws` now exit
non-zero when the validation fails. Before, the result was recorded only in the
report file and the command reported success.

### Deployments are refused when host names are inconsistent

During bootstrap OSISM now checks each host's name and stops the deployment if
it cannot be used reliably. A host is refused when the name the kernel reports
differs from the name that looking up that name returns, when the two differ
only in case, when the name cannot be resolved at all, or when two hosts in the
inventory would end up with the same name.

The usual way into this is an inventory of fully qualified names on hosts that
are configured to use only the first label. Each machine then answers to a short
name while the network answers with the fully qualified one. Components differ
in which of the two they use, so anything that looks a host up by name can miss.
Three such lookups are known, and each breaks a deployment on its own: the
compute identity kolla-ansible writes for nova, nova-compute's authentication to
libvirt, and OVN port binding.

Use one form everywhere. Either set `hostname_use_fqdn: true`, so every name is
the fully qualified one, or give the hosts short inventory names, so every name
is short. Names have to be lowercase and at most 64 bytes, which is the kernel's
limit. The choice is free before a deployment and not afterwards: nova records
the name it first saw and has no way to rename a compute.

Setting `hostname_split_accepted: true` turns the refusal into a warning, for a
deployment that wants this state deliberately. It records the decision; it does
not make the state safe.

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

### OpenStack 2026.1

- The `mariadb_backup` playbook alias is gone; use `osism apply mariadb-backup`.
- Keystone federation is served from its own httpd container in 2026.1. Federation
  has not been validated with OSISM 11.
- `kolla-operations` is retired. OSISM does not ship Grafana dashboards or
  Prometheus alert rules; the in-image dashboards that only a manually added
  Grafana provisioning overlay could use are gone.
