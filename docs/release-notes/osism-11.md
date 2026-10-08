---
sidebar_label: OSISM 11
sidebar_position: 5
---

# OSISM 11

Instructions for the upgrade can be found in the [Upgrade Guide](../guides/upgrade-guide/manager.mdx).

:::info

Similar to the Ubuntu point release model, the first release of OSISM 11 is intended for new installations, early adopters and testing purposes. For existing production environments we recommend to wait until the first point release OSISM 11.1 before upgrading.

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

| Release | Release Date    |
|:--------|:----------------|
| 11.0.0  | 8. October 2026 |

## 11.0.0

### OpenStack services (2026.1)

OSISM 11.0.0 moves the deployed OpenStack release from 2025.1 to 2026.1. Upgrade each service with `osism apply -a upgrade <service>` after switching the environment to this release.

The kolla-ansible container image now rotates HAProxy's logs by renaming them instead of copying and truncating them. `copytruncate` needs free space equal to the size of the log, so a log that had outgrown its rotation interval filled the disk on every rotation attempt. Renaming needs no such space.

### Ceph deployment with cephadm

The nutshell collection, used to set up a new Ceph cluster, now deploys it with cephadm instead of ceph-ansible from OSISM 11 onward, and already on the `latest` track. `osism apply` gained `--osism-version` and `--ceph-backend` options to control the selection explicitly; `--ceph-backend` lets an existing cluster keep its current backend, since selecting a workflow never migrates a cluster by itself.

New plays cover the full bootstrap: installing cephadm, bootstrapping the cluster on the monitor hosts, registering the remaining Ceph hosts, moving configuration overrides into the monitor config store, enabling the configured mgr modules, deploying MON, MGR and crash, creating OSDs from prepared LVM volumes, and deploying RGW and CephFS with their pools when enabled. The dashboard is configured on plain HTTP with standby handling. The OSD device preparation plays `configure-lvm-volumes` and `create-lvm-devices`, previously shipped only in the ceph-ansible image, now also live in osism-ansible, so they work regardless of backend; run them as `osism apply configure-lvm-volumes` and `osism apply create-lvm-devices` (no `ceph-` prefix, to avoid colliding with the existing ceph-ansible roles).

cephadm reaches the Ceph hosts with its own SSH key, `ceph_ssh_private_key` in `secrets.yml`, instead of the shared operator key. It is authorized only on the Ceph hosts through a new group-scoped mechanism, `operator_additional_authorized_keys` (with an `operator_additional_authorized_keys_delete` counterpart), which can also authorize other keys on a specific host group without touching the deployment-wide `operator_authorized_keys` list.

The ceph-ansible image now refuses to run any `ceph-*` play, including the LVM preparation plays, against a cluster already managed by cephadm. It also refuses to run when the deployment's `ceph_version` does not match the Ceph release series the image was built for. Without this guard, ceph-ansible's legacy container names made these plays fail only after they had already changed things on the hosts. Override either check with `-e ceph_cephadm_guard=false`, or durably with `ceph_cephadm_guard: false` in `environments/ceph/configuration.yml`.

A ceph-ansible cluster that stays on an older Ceph release than the one OSISM 11 defaults cephadm to (Tentacle) keeps getting its own matching Ceph and Ceph client images: `ceph_image_version` and `cephclient_version` are now resolved per Ceph release instead of only for the default one. `ceph_image_version` also defaults to `ceph_version` in osism/defaults now, so a cephadm deployment on the `latest` track resolves a ceph-daemon image tag even without a numbered release's version pins. Separately, a ceph-ansible variable naming collision that broke containerized plays such as `ceph-crash`, `ceph-mgrs`, `ceph-rolling_update` and the cephadm adoption check on existing Reef clusters is fixed: ceph-ansible's internal `ceph_version` no longer overwrites OSISM's own `ceph_version` configuration value.

The kolla images now install the Ceph client from download.ceph.com (20.2.4) instead of the Ubuntu archives, so OpenStack services can connect to a Ceph cluster that mints `aes256k` cephx keys (Squid 19.2.6+ or Tentacle 20.2.4+); the Ubuntu and UCA client packages cannot read those keys yet, which broke the connection for every Ceph-consuming service.

`osism validate ceph-rgws` now tests S3 at the address the gateway actually listens on instead of the inventory hostname, which is what cephadm's routed topology requires, since there the gateway binds only to the Ceph public network address. The `ceph-mons`, `-mgrs`, `-osds` and `-rgws` validators now fail the play when a validation fails, so `osism validate` reports the failure instead of exiting successfully regardless of the result.

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

- **Image registries**: ten registry defaults for OSISM-built images (Ceph, cephclient, osism-ansible, kolla-ansible, netbox, cgit, dnsdist, homer, nexus, openstackclient) now point at `registry.osism.tech` instead of `quay.io`, which OSISM stopped publishing to in February 2025. A deployment that never overrode these registries could not pull Tentacle's Ceph images at all, and got stale images of everything else; remove any existing override that still points at `quay.io`.
- **SSH reliability**: `ssh_args` now includes server-alive probes, so a session whose transport died silently, for example when a host's own package upgrade restarts `systemd-networkd` mid-play, is dropped after five minutes instead of waiting on the kernel's two-hour TCP keepalive and wedging the play.
- **Log rotation on generic-only hosts**: the kolla `cron` container is now deployed to every host that runs fluentd, not only to hosts in the `compute`, `control`, `monitoring`, `network` and `storage` groups. Dedicated loadbalancer nodes and managers outside the `monitoring` group received HAProxy's syslog output but had nothing to rotate it, so the log grew until the disk filled. Apply with `osism apply cron` (or `osism apply common`); if a log has already grown very large, delete it first, since the first rotation still needs free space equal to its size.
- **step-ca**: a deployment with a separate manager failed to bring up stepca at all, because its health check resolved the CA's own DNS name to the unreachable internal VIP instead of to itself; it now resolves to itself while still verifying TLS against the CA's real certificate. Separately, the SSH CA was never actually initialized by this role, on any deployment, because the init flag was rendered as a Python boolean instead of the string the entrypoint checks for. This is now fixed for a CA initialized from an empty volume; an already-initialized CA keeps its current configuration and needs a fresh volume to pick up the SSH CA.
