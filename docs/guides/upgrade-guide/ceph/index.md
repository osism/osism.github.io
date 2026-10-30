---
sidebar_label: Ceph
sidebar_key: upgrade-guide-ceph
sidebar_position: 20
---

# Ceph

How Ceph is upgraded depends on what manages it: ceph-ansible or cephadm. `ceph orch
status` on the OSISM manager node reports `Backend: cephadm` on a cluster managed by
cephadm.

## Ceph managed by ceph-ansible

```console
osism apply ceph-rolling_update -e ireallymeanit=yes
osism apply cephclient
```

## Ceph managed by cephadm

cephadm upgrades the daemons itself, one after the other, with `ceph orch upgrade`. The
steps below move a cluster from Reef to Tentacle with OSISM 11; Tentacle supports the
upgrade from Reef directly. The same procedure applies to an update within a release,
with the image of that release.

:::info Before you start

* The cluster is managed by cephadm, and `ceph -s` reports `HEALTH_OK`. After a
  [migration from ceph-ansible](../../migration-guide/cephadm/index.md), Step 7 of that
  guide has to be done: Tentacle reports the cephx entities it leaves behind as
  `HEALTH_ERR`. This prints nothing once they are gone:

    ```console
    ceph auth ls 2>/dev/null | grep -E '^(mds\.[^.]+|client\.crash|client\.rgw\..+\.rgw[0-9]+)$'
    ```
* The manager runs OSISM 11, which carries the Tentacle image:
  `grep manager_version /opt/configuration/environments/manager/configuration.yml` on the
  manager node shows the release.

:::

1. Set the Ceph release in `environments/configuration.yml` of the configuration
   repository. A repository upgraded from OSISM 10 usually has no `ceph_version` there
   yet; add it:

    ```yaml title="environments/configuration.yml"
    ceph_version: tentacle
    ```

    If `ceph_conf_overrides` in `environments/ceph/configuration.yml` sets
    `rgw keystone api version`, remove that line too: Tentacle no longer knows the option
    (OSISM 11 release notes). On a cluster migrated from ceph-ansible nothing reads that
    file any more, so removing it there changes nothing on the running cluster; the copy
    in the config store is dealt with in step 5.

    Commit and push the changes, then update the configuration repository on the OSISM
    manager node:

    ```console
    osism apply configuration
    ```

2. Determine the target image on the OSISM manager node. The release lists the image
   version for each Ceph release it supports:

    ```console
    docker exec osism-ansible grep -A5 '^ceph_image_versions:' /ansible/group_vars/all/versions.yml
    ```

    The image is `ceph-daemon` with the `tentacle` version, from the registry the cluster
    already uses, for example `registry.osism.tech/osism/ceph-daemon:20.2.5-r2`.
    `ceph config dump | grep container_image` shows the registry; it may show the current
    image by digest (`…/ceph-daemon@sha256:…`), so take only the registry and path from
    it.

    ```console
    CEPH_IMAGE=registry.osism.tech/osism/ceph-daemon:20.2.5-r2
    ceph orch upgrade check --image ${CEPH_IMAGE}
    ```

    The check lists every daemon under `needs_update` and shows the target version
    (`ceph version 20.2.5 … tentacle (stable)` for the example image).

3. Start the upgrade, in the same shell as step 2 (the command uses `CEPH_IMAGE`), and
   follow it:

    ```console
    ceph orch upgrade start --image ${CEPH_IMAGE}
    ceph orch upgrade status
    ceph -s
    ```

    The upgrade is done when `ceph orch upgrade status` no longer reports it in progress. A
    Tentacle manager prints "There are no upgrades in progress currently."; a Reef or Squid
    manager prints the status as JSON, with `"in_progress": false`. On an upgrade from
    Reef, the managers already run Tentacle by then. On a test cluster with 27 daemons the
    upgrade took about 35 minutes. While it runs:

    * cephadm mutes the `AUTH_INSECURE_*` health checks.
    * cephadm upgrades the OSDs of one host together. PGs peer, and a few can be inactive
      for up to a minute ("Reduced data availability").
    * `all OSDs are running tentacle or later but require_osd_release < tentacle` shows
      for a moment, until cephadm sets the new release.
    * After the last daemon has the new version, cephadm rotates the cephx keys of the
      monitor, manager, OSD and MDS daemons and redeploys them. The progress counter
      runs down again during this phase (for example from 27/27 to 19/27), and
      `ceph orch upgrade status` keeps saying "upgrading rgw daemons" throughout.
    * The OSDs restart again for their new keys, two at a time: each time `ceph -s`
      shows 2 OSDs down and one or two PGs inactive for a few seconds.
    * Each time cephadm upgrades or redeploys the MDS daemons, the cluster log shows
      `MDS_ALL_DOWN` as an error that clears within a fraction of a second.
    * When the upgrade finishes, cephadm sets the new service ticket type and lifts its
      mutes. For a few seconds, until the monitors have applied the change, the cluster
      reports `HEALTH_ERR` for `AUTH_INSECURE_SERVICE_TICKETS`; it clears on its own.

    If following the upgrade is interrupted, for example because your session ends or
    `ceph orch upgrade status` fails for a moment while the managers fail over, cephadm
    carries on. Run `ceph orch upgrade status` again and continue from there; do not start
    over, because the checks in "Before you start" fail while an upgrade runs and right
    after it. If the status shows the upgrade paused (`"is_paused": true` and a
    `message`), `ceph health detail` names the reason as an `UPGRADE_*` check. Correct it,
    then continue the upgrade:

    ```console
    ceph orch upgrade resume
    ```

4. Check the result:

    ```console
    ceph versions
    ceph health detail
    ```

    Every daemon reports the target version from step 2. The cluster is `HEALTH_WARN`, from client
    keys of the old key type (`AUTH_INSECURE_CLIENT_KEY_TYPE`) and from the monitors
    still allowing that type (`AUTH_INSECURE_KEYS_ALLOWED`, `AUTH_INSECURE_KEYS_CREATABLE`,
    `AUTH_INSECURE_ROTATING_SERVICE_KEY_TYPE`). The cluster works with these warnings.
    They clear once the remaining keys have been rotated and the old key type is
    disallowed. Do not rotate the keys of the OpenStack services without distributing
    them: a service loses access to Ceph as soon as its key is rotated, until the new key
    is in the configuration repository and the service has been applied.

5. Remove `rgw_keystone_api_version`, if the cluster sets it. Tentacle no longer knows the
   option (`ceph config dump` lists it as `unknown`) and the RGW daemons ignore it:

    ```console
    ceph config rm client.rgw rgw_keystone_api_version
    ceph orch ps --daemon-type rgw
    ```

    Then redeploy the RGW daemons one at a time, so that the others keep serving S3 and
    Swift. For each daemon `NAME` in the list:

    ```console
    ceph orch daemon redeploy NAME
    ceph orch ps --daemon-type rgw --refresh
    ```

    Repeat the second command until the daemon shows `running` with a new `CONTAINER ID`,
    then go on to the next. Until it has been replaced, `ceph orch ps` keeps listing the
    old container as running. A daemon takes up to a minute and a half; if one is not
    running in a new container after 10 minutes, `ceph health detail` shows why.
    (`ceph orch daemon restart` refuses an RGW daemon without `--force`.)

    Remove the option only **after** the RGW daemons run Tentacle. On Reef its default is
    `2`, and removing it there turns Keystone authentication of every Swift and S3 request
    into `401 Unauthorized` at once.

6. Update the Ceph client on the manager:

    ```console
    osism apply cephclient
    ```

    `ceph --version` on the manager then reports the same Tentacle version.

:::note RGW daemons deployed without `--networks`

Not part of this procedure: RGW daemons that a migration deployed without `--networks` can
be bound to their nodes' own addresses from now on. The Tentacle image of OSISM 11
carries OSISM's cephadm address-discovery fix, and with it the
binding works on the routed topology as well. See the note on daemons deployed without
`--networks` in the
[migration guide](../../migration-guide/cephadm/index.md#deploy-the-new-rgw-daemons).

:::
