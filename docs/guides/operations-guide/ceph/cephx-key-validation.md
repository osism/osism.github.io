---
sidebar_label: cephx key validation
---

# cephx key validation

`osism validate ceph-keys` checks the cephx keys of the Ceph cluster: that no
rotation is left unfinished, that every copy of a key the deployment keeps holds the
current key, and that every running instance uses it. It changes nothing.

```console
osism validate ceph-keys
```

It runs on the first manager node and fails if any of its checks fails. It prints one line
per check and, below it, every entry that did not pass. The same results are written as a
JSON report on the manager:
`/opt/reports/validator/ceph-keys-validator-<timestamp>-report.json`, as the other Ceph
validators do. Neither the output nor the report contains a key or any part of one:
comparisons say only whether two copies hold the same key.

## The checks

### pending-keys

No entity has a pending key. A pending key is a new key that Ceph keeps next to the old
one until its first use commits it, so a pending key is a rotation that is not finished.
Each one is named with what commits it: for the keys of the OpenStack services, putting
the keyring files of the manager's checkout into the configuration repository and applying
the services; for `client.admin`, `osism apply cephclient`; for the lockbox key of an
encrypted OSD, the next start of that OSD. For a pending key of any other entity, find out
what uses the entity, then commit the key with `ceph auth commit-pending <name>` or drop it
with `ceph auth clear-pending <name>`.

### old-key-type

Lists the entities whose key is of the old key type `aes`. Ceph 19.2.6 and 20.2.4 add the
stronger type `aes256k` and report every key of the old type in `ceph health detail`.

Keys of the old type are listed without failing the check, unless `ceph_validate_strict`
is true (as in the other Ceph validators) or the monitors no longer allow the old type
(`auth_allowed_ciphers` excludes `aes`):

```console
osism validate ceph-keys -e ceph_validate_strict=true
```

### monitor-copies

`/etc/ceph/ceph.<entity>.keyring` on every monitor node holds the current key, for
`client.admin` and the keys of the OpenStack services (`openstack_keys`) that exist on the
cluster. `osism apply copy-ceph-keys` copies the keyrings into the configuration
repository from here, so a missing file fails as well. A file that carries a pending key
line fails, because Ceph clients cannot read it.

### checkout

Each keyring file that `osism apply copy-ceph-keys` writes into the manager's checkout of
the configuration repository, and that exists there, holds the current key and is
unmodified in git. A file that holds the current key but is modified has not reached the
repository yet, and the next `osism apply configuration` would bring back what the
repository holds. Encrypted keyring files are decrypted for the comparison.

The check needs `configuration_directory`, which the OSISM defaults set to
`/opt/configuration`. If it is not set, the check fails with
`checkout @ manager: failed - configuration_directory is not set`.

### running-guests

On every compute node (inventory group `compute`), every QEMU process started after
libvirt loaded the current keys of its Ceph secrets. A running instance keeps the key its
QEMU process was started with. Once the old key is no longer valid, such an instance keeps
working only as long as it keeps its connection to the monitors; once it loses that
connection, its I/O freezes at the next new connection to an OSD. The
check names each instance that still holds the old key, with its UUID and compute node:
live-migrate it, or stop and start it.

Before the instances are compared, the libvirt secrets themselves have to hold the current
keys, in kolla's copy (`/etc/kolla/nova-libvirt/secrets`) and in the `nova_libvirt`
container. A compute node whose secrets do not fails on its own, without its instances:
`osism apply nova` has not given it the current keys. Run `osism apply nova` again.

A restart of the `nova_libvirt` container without a key change makes the check name
instances that started before it, although they hold the current key; it never misses an
instance that holds the old key. Without compute nodes, the check is skipped.

A monitor or compute node that cannot be reached fails its part of the checks; the other
nodes are still checked.
