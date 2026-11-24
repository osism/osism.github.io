---
sidebar_label: cephx key rotation
---

# cephx key rotation

Every client and daemon of a Ceph cluster authenticates with a cephx key. This page
rotates the keys of a cluster managed by cephadm: after a key may have been exposed, by
policy, or for a new key type.

Two commands do the work:

* `osism apply cephadm-rotate-keys -e ceph_rotate_keys=<entities>` gives the named
  entities new keys and distributes them as far as Ceph and the manager can.
* `osism validate ceph-keys` checks that a rotation is complete: no rotation left
  unfinished, every copy of a key current, every running instance on the current key. It
  changes nothing, see [cephx key validation](./cephx-key-validation.md).

The page covers the keys of the OpenStack services, `client.admin`, the crash and RGW
daemons, the bootstrap keys, the lockbox keys of encrypted OSDs, and the keys Manila
hands to tenants. The keys of the monitor, manager, OSD and MDS daemons are not covered:
cephadm rotates them when it upgrades Ceph.

:::info Before you start

* The cluster is managed by cephadm and runs Ceph Tentacle with OSISM 11.
* Plan a maintenance window, see [The maintenance window](#the-maintenance-window).

:::

All commands run on the OSISM manager node. Both plays run once, on the first manager of
the inventory, also where there are several.

## How keys are rotated

The keys of the crash and RGW daemons, the bootstrap keys and the lockbox keys of encrypted
OSDs never leave Ceph. `cephadm-rotate-keys` rotates them and gives the daemons the new key
itself; nothing goes into the configuration repository.

The keys of the OpenStack services and `client.admin` live in the configuration repository,
which leads: a new key is in the repository before any service is given it. For these keys
`cephadm-rotate-keys` does not replace the key but *stages* a new one. Ceph keeps the old
key valid and adds the new one as a pending key. The play writes keyrings with the new key
into the manager's checkout of the configuration repository (`/opt/configuration`) and, for
the OpenStack services, into `/etc/ceph` on the monitor nodes; cephadm writes the
`client.admin` keyring there itself. You put them into your repository, then apply the
services. The first use of the new key *commits* it: from then on it is the only valid key.

:::warning A staged key is committed by any login attempt

Not only the first successful use of the new key commits it. Any failed login for the
entity commits it as well, for example with a stale keyring from an earlier rotation or a
test with the wrong keyring. From the commit on, whoever still holds the old key cannot
open new connections to Ceph until its service is applied. So do not leave staged keys
lying around: once a group is staged, follow its steps through without a pause, and do not
test the new keyring by hand.

:::

A completed rotation is not repeated by accident: `cephadm-rotate-keys` makes no new key
for an entity whose key is younger than 24 hours, and says so. To rotate again sooner,
for example right after a key has been exposed, add `-e ceph_rotate_keys_min_age=0`. The
variable takes the minimum age in hours, a whole number of 0 or more; 0 turns the check
off.

## The maintenance window

Once the keys of a group are staged, nothing is postponed. Run one `cephadm-rotate-keys`
at a time: two runs in parallel do not see each other, and each could restart an OSD or
redeploy a daemon while the other is doing the same. Do not run
`osism apply copy-ceph-keys` during a rotation either: it copies the monitor nodes' keyrings
into the manager's checkout, and while `client.admin` is staged those hold its old key, or
the new one in a form Ceph clients cannot read. One window can hold the whole rotation, in
the order of this page:

1. Section 2: the keys that never leave Ceph. The crash, RGW and bootstrap keys took ten
   minutes on a test cluster with six crash and three RGW daemons; the RGW daemons go one
   at a time, up to about 90 seconds each. Lockbox keys take one OSD restart each, one OSD
   after the other, with a wait for all PGs to be `active+clean` in between: one to two
   minutes per OSD on test clusters, more on busy ones. Lockbox comes before section 5,
   because it restarts every OSD.
2. Section 4: the OpenStack groups and `client.admin`, a few minutes each plus the
   repository step. After `client.admin`, the check passes only about ten minutes after
   the commit.
3. Section 5: `client.cinder` and `client.nova`. Applying Cinder and Nova took 11 to 15
   minutes on test clusters, followed by the live migration of every running instance.
   From the moment their new keys are committed until the last migration, no monitor or
   OSD may be restarted, no node rebooted and no Ceph upgrade run.
4. Section 6: the keys of tenants.

The size of the window is set by the number of running instances (section 5) and, on
clusters with many encrypted OSDs, by the lockbox keys: a hundred OSDs take hours. Such
clusters can rotate the lockbox keys, or all of section 2, in a separate window
beforehand: these keys never leave Ceph, and each run is complete on its own.

## 1. Delete the keys of services you do not run

`osism apply cephadm-pools` creates a key for every OpenStack service OSISM knows,
whether the deployment runs it or not. A cluster without Manila, for example, has a
`client.manila` that nothing uses. Rotating it would leave a staged key that nothing
commits. The services the deployment runs are listed in the service catalog, and
cinder-backup among the volume services:

```console
openstack --os-cloud admin service list
openstack --os-cloud admin volume service list
```

`client.glance` belongs to `glance`, `client.cinder` and `client.nova` to `cinder` and
`nova`, `client.cinder-backup` to the `cinder-backup` volume service, `client.gnocchi` to
`gnocchi` and `client.manila` to `manila`. Delete the keys of services that are not
listed:

```console
ceph auth del client.manila
```

If you add the service later, see
[A key for a service added later](#a-key-for-a-service-added-later).

## 2. Keys that never leave Ceph

```console
osism apply cephadm-rotate-keys -e ceph_rotate_keys=crash,rgw,bootstrap
osism apply cephadm-rotate-keys -e ceph_rotate_keys=lockbox
```

* **crash, RGW:** each key is rotated and its daemon redeployed by cephadm, which writes
  the new key to it. The crash daemons go all at once. The RGW daemons go one at a time,
  so that the others keep serving S3 and Swift; the next one follows once the previous one
  runs in a new container. A daemon that already runs with the current key is left alone.
* **bootstrap:** cephadm reads the bootstrap keys from the monitors when it needs them, so
  they are only rotated.
* **lockbox:** each encrypted OSD has a `client.osd-lockbox.<osd_fsid>` key, which it uses
  on every start to fetch its encryption key from the monitors. The key is stored twice on
  the OSD's host, in a tag of the OSD's logical volume and in its `lockbox.keyring`; an
  OSD whose copies hold an invalid key does not start again. The play stages the new key,
  writes it into both copies and restarts the OSD; the start commits the key. Until then,
  the old key keeps working. The OSDs go one at a time: each restart waits until all PGs
  are `active+clean` and `ceph osd ok-to-stop` agrees, and the next OSD follows once the
  previous one is up again and all PGs are `active+clean`. A logical volume with two
  `ceph.cephx_lockbox_secret` tags is refused, because it is not known which one is in
  force: the play names it and changes nothing.

The play checks everything it can before it changes anything. It refuses to start if, for
example, a host it needs cannot be reached or cephadm reports it offline or in
maintenance. For the lockbox keys, all PGs have to be `active+clean` first: on a degraded
cluster the play waits up to ten minutes for that, then stops with nothing changed. An OSD
that is down is left out and named in the output; rotate its key with the same command once
it is up again.

Nothing else needs to be done for these keys.

## 3. Check

After each of the following sections, and whenever in doubt:

```console
osism validate ceph-keys
```

It fails as long as a rotation is unfinished (a pending key, named with what commits it),
a copy of a key does not hold the current key, or a running instance still holds an old
key (section 5). What each of its checks covers is described in
[cephx key validation](./cephx-key-validation.md).

After an OSISM upgrade, or any other restart of the `nova_libvirt` containers, the check
`running-guests` fails from the first check on: it names the instances that started before
the restart, although they hold the current key. Until section 5 has live-migrated every
instance, judge only the other checks. A `running-guests` failure for the secrets of a
compute node is never expected; it is fixed with `osism apply nova`. From section 5 on,
every check has to pass.

## 4. Keys of the OpenStack services and client.admin

| Key                    | Applied with                                  | Keyring files in the configuration repository                                                                                                                                                                                                 |
|:-----------------------|:----------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `client.glance`        | `osism apply glance`                          | `environments/kolla/files/overlays/glance/ceph.client.glance.keyring`                                                                                                                                                                         |
| `client.cinder-backup` | `osism apply cinder`                          | `environments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder-backup.keyring`                                                                                                                                                    |
| `client.gnocchi`       | `osism apply gnocchi`                         | `environments/kolla/files/overlays/gnocchi/ceph.client.gnocchi.keyring`                                                                                                                                                                       |
| `client.manila`        | `osism apply manila`                          | `environments/kolla/files/overlays/manila/ceph.client.manila.keyring`                                                                                                                                                                         |
| `client.admin`         | `osism apply cephclient`                      | `environments/infrastructure/files/ceph/ceph.client.admin.keyring`                                                                                                                                                                            |
| `client.cinder`        | `osism apply cinder`, then `osism apply nova` | `environments/kolla/files/overlays/cinder/cinder-volume/ceph.client.cinder.keyring`, `environments/kolla/files/overlays/cinder/cinder-backup/ceph.client.cinder.keyring`, `environments/kolla/files/overlays/nova/ceph.client.cinder.keyring` |
| `client.nova`          | `osism apply cinder`, then `osism apply nova` | `environments/kolla/files/overlays/nova/ceph.client.nova.keyring`                                                                                                                                                                             |

A key your site added itself to `openstack_keys` (with `openstack_keys_extra`) is rotated
the same way, as a group of its own, if `ceph_custom_keys` gives its keyring a place in the
configuration repository; without one, the play refuses it before changing anything. In
step 3, apply the services that use it.

Rotate one group at a time: `client.glance`, `client.cinder-backup`, `client.gnocchi`,
`client.manila`, `client.admin`, and last `client.cinder` and `client.nova` together
(section 5). For each group, directly one after the other:

1. Stage the new key:

    ```console
    osism apply cephadm-rotate-keys -e ceph_rotate_keys=client.glance
    ```

    The summary at the end lists the keyring files it wrote into the manager's checkout
    and the next steps.

2. Copy these files from the manager's checkout (`/opt/configuration`) into your
   configuration repository. If your repository keeps keyrings encrypted, encrypt them
   first. Commit and push, then update the repository on the manager node:

    ```console
    osism apply configuration
    ```

3. Apply the services of the group, see the table. The first use of the new key commits
   it.

4. Check with `osism validate ceph-keys`.

Glance and cinder-backup may connect to Ceph only when they are used. If the check still
reports the new key of `client.glance` as pending after `osism apply glance`, upload or
download an image; for `client.cinder-backup`, create a backup. Then check again.

`client.admin` is what `ceph` on the manager uses. Its old key keeps working until the
commit, which `osism apply cephclient` brings. From staging until about ten minutes after
the commit, `ceph` and `cephadm shell` on the monitor nodes cannot read their admin
keyring: cephadm writes it there with the staged key, which Ceph clients cannot read, and
replaces it only some minutes after the commit. Until then, the check fails for
`client.admin` on each monitor node: the copy "carries a pending key line, which Ceph
clients cannot read". Run it again about ten minutes after `osism apply cephclient`. The
manager is not affected. If the key is committed early and `ceph` on the manager fails,
`osism apply cephclient` installs the new keyring from the manager's checkout.

## 5. client.cinder and client.nova

Nova's instances use these keys themselves. A running instance keeps the key its QEMU
process was given when it started; the process cannot be given a new one. After the new
key is committed, such an instance keeps working only as long as it keeps its connection
to the monitors. Once it loses that connection (a monitor restart or election, a network
interruption, ticket expiry after at most three days), it cannot authenticate again, and
its I/O freezes at the next new connection to an OSD. A frozen instance cannot be
live-migrated either. So every running instance gets a new QEMU process right after the
applies, by live migration: a migrated instance starts with the new key.

1. Stage both keys together:

    ```console
    osism apply cephadm-rotate-keys -e ceph_rotate_keys=client.cinder,client.nova
    ```

2. Put the keyring files into the configuration repository and run
   `osism apply configuration`, as in section 4.

3. Apply both services directly after each other; in between, Nova cannot open new
   connections with `client.cinder`:

    ```console
    osism apply cinder
    osism apply nova
    ```

4. Directly after, live-migrate every running instance, for each compute node:

    ```console
    osism manage compute migrate --yes --no-cold-migration <compute node>
    ```

    It live-migrates the running instances of the node one after the other and waits for
    each. The scheduler may place an instance on a node that is still to come, which then
    migrates it a second time; that does no harm. Instances that are shut off need
    nothing: they start with the new key.

5. Check with `osism validate ceph-keys`. It names every instance whose QEMU process is
   older than the new key, with its UUID and compute node. A compute node whose libvirt
   secrets do not hold the new keys fails on its own, without its instances: `osism apply
   nova` did not reach it. Run `osism apply nova` again first, then migrate its instances. The migrate command also
   reports a failed migration as completed, so this check is what tells whether every
   instance has moved. Live-migrate each
   instance it names:

    ```console
    osism manage server migrate --yes <instance UUID>
    ```

    An instance that cannot be live-migrated gets its new QEMU process by being stopped
    and started again, with `openstack --os-cloud admin server stop <server>` and
    `openstack --os-cloud admin server start <server>`. Check again until no instance is
    named.

From the commit in step 3 until the last migration in step 5, do not restart any monitor
or OSD, do not reboot any node and do not upgrade Ceph: each would freeze the instances
not yet migrated. An instance that froze anyway needs a hard reboot:

```console
openstack --os-cloud admin server reboot --hard --wait <server>
```

## 6. Keys of tenants

Keys that OpenStack creates for tenants, such as the cephx access rules of Manila shares,
are rotated through the service that created them, not in Ceph; `cephadm-rotate-keys`
refuses them. The cephx name of a Manila access rule (`access_to`) is the entity
`client.<access_to>`, which is how `ceph health detail` lists it. List the access rules of
all shares, each with its share, rule ID, cephx name and access level:

```bash
for share in $(openstack --os-cloud admin share list --all-projects -f value -c ID); do
    openstack --os-cloud admin share access list ${share} -f value -c ID -c "Access To" -c "Access Level" | sed "s/^/${share} /"
done
```

Keep this list: a deleted rule is no longer listed. For each cephx name, revoke its rules
and grant them again, with the same access level. A cephx name can have rules on several
shares, and Manila keeps its Ceph entity, and with it the old key, as long as one of its
rules remains. So revoke all rules of a name first, then grant them again:

```console
openstack --os-cloud admin share access delete <share> <access_id>
openstack --os-cloud admin share access create --access-level <rw|ro> <share> cephx <name>
```

Once the last rule of a name is revoked, Manila deletes the entity; the first new rule
creates it again, with a new key. Each new rule is `active` in
`openstack share access list <share>` within seconds. The tenant has to use the new key,
shown there as `Access Key`, for its mounts.

## If a step fails

`cephadm-rotate-keys` checks everything it can before it changes anything; a refusal
leaves every key and every copy as it was. If it fails later, it says which keys it has
changed and how far it got. Run the same command again, without
`-e ceph_rotate_keys_min_age=0`: a key that got a new key in the failed run gets no other,
but what is missing of its distribution is done. A staged key is written again, an OSD
whose lockbox key is still pending is restarted, and a crash or RGW daemon that does not
run with the current key is redeployed.

A host that cannot be reached once keys change (a daemon, OSD or monitor node) is the
exception: the run stops with Ansible's `UNREACHABLE` and without saying what it did.
`osism validate ceph-keys` shows what is left. Running the same command again stops at its
checks while the host cannot be reached (with `lockbox`, an OSD that is down is left out
and named instead); once the host is back, it continues the run as above.

If the lockbox part stops because a logical volume of the OSD carries two
`ceph.cephx_lockbox_secret` tags, the OSD is not restarted and its old key keeps working.
The message names the volumes. Leave one tag on each, with the key in force next, as the
message says, then run the same command again.

Never rotate a staged key by hand with `ceph auth rotate`: that makes the keyrings already
written invalid.

If a service apply of section 4 or 5 failed, repeat it. If the keyrings in the manager's
checkout were overwritten before they reached your repository, for example by an
`osism apply configuration` in between, run the same `cephadm-rotate-keys` command again:
it writes them again with the staged key. `osism validate ceph-keys` shows what is still
missing.

## A key for a service added later

A service deployed later gets its key the established way: `osism apply cephadm-pools`
creates every missing key, then `osism apply copy-ceph-keys`, put the new keyring into the
configuration repository, `osism apply configuration` and `osism apply <service>`.
`cephadm-pools` also creates again any key deleted in section 1: new, unused, of the
current type, and visible in what `copy-ceph-keys` writes. Delete it again if the service
is still not run.
