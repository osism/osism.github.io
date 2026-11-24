---
sidebar_label: Move to aes256k cephx keys
sidebar_position: 10
---

# Move to the aes256k key type

Ceph 19.2.6 and 20.2.4 introduce a stronger cephx key type, `aes256k`, and report every key
of the old type `aes` in `ceph health detail`. A cluster upgraded to one of these releases
keeps its old keys, so nothing stops working, but the cluster stays `HEALTH_WARN` until
they are rotated. This page moves a cluster managed by cephadm to the new key type: it
makes Ceph create new keys with it, rotates every key, then disallows the old type. It
follows the procedure upstream documents in
[Upgrading and Rotating CephX Keys](https://docs.ceph.com/en/latest/rados/configuration/auth-config-ref/#cephx-upgrade).

:::info Before you start

* The cluster is managed by cephadm and runs Ceph Tentacle, 20.2.4 or later, everywhere,
  see [Ceph](./index.md). The upgrade has already rotated the keys of the
  monitor, manager, OSD and MDS daemons cephadm manages.
* The OpenStack services run OSISM 11. Their images carry a Tentacle client, which
  reads `aes256k` keys; the Ubuntu Cloud Archive client of older images does not, and the
  services lose access to Ceph once their keys are rotated. To check, on a node that runs
  Glance (a control node):
  `sudo docker exec glance_api dpkg -l librados2` shows `20.2.4` or later.

:::

All commands run on the OSISM manager node. List the keys that still use the old type:

```console
ceph health detail | grep "insecure key type"
```

## 1. Create new keys with the new type

```console
ceph mon set auth_preferred_cipher aes256k
ceph config set mon mon_auth_allow_insecure_key false
```

From now on, every key Ceph creates, every staged key and every rotation uses `aes256k`,
also the keys Manila creates for tenants. `AUTH_INSECURE_KEYS_CREATABLE` clears. Each
`ceph mon set` changes the monitor map, so the monitors hold a short election; that is
expected. `ceph health detail` can take up to a minute to reflect a change.

## 2. Rotate every key

Rotate the keys as described in
[cephx key rotation](../../operations-guide/ceph/cephx-key-rotation.md), all sections, the
keys of tenants included.
Right after the upgrade, the check's `running-guests` part fails until section 5 has
migrated the instances, as
[its section 3](../../operations-guide/ceph/cephx-key-rotation.md#3-check) explains.

The live migration of every running instance after `client.cinder` and `client.nova`
matters twice here. Besides the new key, an instance started before the OpenStack services
were upgraded to OSISM 11 runs a Ceph client that cannot use `aes256k` keys at all. On a
test cluster, attaching a volume to such an instance failed after the rotation
(`blockdev-add: error connecting: Invalid argument` in the `nova-compute` log) until it
had been live-migrated.

An `aes256k` key has 60 characters, an `aes` key 40. A tenant key that Manila created
again has the new type: `ceph auth get-key client.<access_to> | wc -c` prints `60`.

## 3. Disallow the old key type

`osism validate ceph-keys` has to pass, and its `old-key-type` check has to list no key:
as long as the old type is allowed, that check passes even while it lists keys of the old
type (see [cephx key validation](../../operations-guide/ceph/cephx-key-validation.md)). A
key that the rotation does not cover, for example one created by hand for an external
client, is rotated with `ceph auth rotate client.<name>`; give the new key to whoever uses
it before you go on, because the next command makes the old key unusable. Then:

```console
ceph mon set auth_allowed_ciphers aes256k
ceph health detail
```

`AUTH_INSECURE_KEYS_ALLOWED` clears. `AUTH_INSECURE_ROTATING_SERVICE_KEY_TYPE` clears on
its own when the monitors have replaced their rotating service keys. On test clusters
this took two and a quarter to three hours after the Ceph upgrade finished; no command is
needed. The cluster is then `HEALTH_OK`.

Rebooting nodes afterwards is a good test that every daemon still starts with its new key.
After a reboot, cephadm may list the host as `Offline` in `ceph orch host ls` for several
minutes although its daemons run; this also happens without any key rotation, and it
clears on its own.
