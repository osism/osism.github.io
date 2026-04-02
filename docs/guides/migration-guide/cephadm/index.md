---
sidebar_label: Cephadm
sidebar_position: 32
---

# Migrate from Ceph-Ansible to Cephadm

:::warning

The migration from ceph-ansible to cephadm is performed _in place_ by adopting existing
Ceph daemons one at a time. While this process is designed to be non-disruptive, it is
**strongly advised** to test the migration in a controlled environment first, such as the
[OSISM testbed](https://github.com/osism/testbed). Ensure that precautionary backups are
made and all other necessary safety measures are in place before migrating a production
cluster.

TODO: Add specific guidance on recommended backup strategies (e.g. cluster-wide backups
to a separate cluster) and concrete safety measures to take before starting the migration.

:::

:::info Known limitations

This guide is a work in progress. The following areas are **not yet covered or tested**:

* **Multi-site RGW**: Only single-site RGW deployments have been tested. Multi-site migration instructions will be added in a future update.
* **Backup and safety measures**: Specific guidance on recommended backup strategies and concrete pre-migration safety measures is still being prepared.
* **Automated readiness checks**: A planned `osism apply ready-for-cephadm` task to automate prerequisite verification is not yet available.

This note will be updated as additional sections are completed.

:::

## Background

The deployment tool ceph-ansible is deprecated as of OSISM 10 and will not be supported
in upcoming OSISM releases. The
[official recommendation](https://github.com/ceph/ceph-ansible/blob/main/README.rst) from
the Ceph project is to migrate to [cephadm](https://docs.ceph.com/en/latest/cephadm/).

After migration, Ceph daemons run as containers managed by cephadm instead of
ceph-ansible. All lifecycle operations (upgrades, expansions, configuration
changes) are then performed through cephadm and the Ceph orchestrator.

For the full upstream documentation, refer to
[Switching from ceph-ansible to cephadm](https://docs.ceph.com/en/latest/cephadm/adoption/).

## Prerequisites

* A running Ceph cluster deployed with ceph-ansible via OSISM.
* All Ceph daemons are healthy (`ceph -s` reports `HEALTH_OK` or only expected warnings).
* SSH access to all Ceph nodes from the node where cephadm will be run.
* The Ceph cluster must be running at least Ceph Octopus (15.2.x) or later. Clusters on
  OSISM 7 or later already meet this requirement.
* Python 3 and `lvm2` must be installed on all Ceph nodes (these are typically already present).

TODO: Consider replacing the manual prerequisite checks with an `osism apply ready-for-cephadm`
task that automatically verifies all conditions (cluster health, SSH access, Ceph version,
required packages).

## Step 1: Verify cluster health

Before starting the migration, ensure the cluster is in a healthy state. Run the following
commands on the OSISM manager node .

```bash
ceph -s
ceph osd tree
ceph df
```

All PGs should be `active+clean`. Resolve any degraded or misplaced PGs before proceeding.

TODO: Consider including the health verification commands in the `osism apply ready-for-cephadm`
task as well.

## Step 2: Install cephadm

Install cephadm on **all** Ceph nodes. The version of cephadm must match the running Ceph
release.

First, determine the running Ceph release on the OSISM manager node :

```bash
ceph version
```

This returns output like `ceph version 18.2.7 (...)  reef (stable)`. The full version
number (e.g. `18.2.7`) is needed for the next step.

### Control nodes (mon, mgr)

Install the cephadm package from the
[Ubuntu Cloud Archive](https://ubuntu-cloud.archive.canonical.com/ubuntu/pool/main/c/ceph/)
on the control nodes:

| Ceph Release | cephadm Package                                     |
|:-------------|:----------------------------------------------------|
| Quincy (17)  | `cephadm_17.2.9-0ubuntu0.22.04.1~cloud0_amd64.deb` |
| Reef (18)    | `cephadm_18.2.4-0ubuntu1~cloud1_amd64.deb`         |
| Squid (19)   | `cephadm_19.2.3-0ubuntu0.24.04.2~cloud0_amd64.deb` |

These are the only versions available in the UCA. The exact point release does not need
to match your running Ceph version -- only the release series (Quincy, Reef, Squid) matters.

```bash
CEPHADM_PKG=cephadm_18.2.4-0ubuntu1~cloud1_amd64.deb
```

```bash
curl --silent --remote-name --location https://ubuntu-cloud.archive.canonical.com/ubuntu/pool/main/c/ceph/${CEPHADM_PKG}
sudo dpkg -i ${CEPHADM_PKG}
```

### OSD nodes

The UCA cephadm package for Reef (18.2.4) contains a
[known bug](https://tracker.ceph.com/issues/63151) that causes a crash when parsing
AppArmor profiles during OSD adoption. On OSD nodes, install cephadm as a standalone
Python script from the Ceph Git repository instead:

```bash
CEPH_RELEASE=$(docker inspect $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) --format '{{.Config.Image}}' | cut -d: -f2)
```

```bash
curl --silent --remote-name --location https://raw.githubusercontent.com/ceph/ceph/${CEPH_RELEASE}/src/cephadm/cephadm.py
chmod +x cephadm.py
sudo mv cephadm.py /usr/sbin/cephadm
```

### Verify

On each node, verify the installation:

```bash
sudo cephadm version
```

## Step 3: Prepare the cephadm configuration

On each Ceph node, prepare the host for cephadm:

```bash
sudo cephadm prepare-host
```

Confirm that the existing `/etc/ceph/ceph.conf` and `/etc/ceph/ceph.client.admin.keyring`
are accessible on the Ceph nodes. Cephadm will use these to connect to the cluster.

On each Ceph node, determine the currently used container image from a running Ceph
daemon:

```bash
CEPH_IMAGE=$(docker inspect $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) --format '{{.Config.Image}}')
```

Set the container image in the Ceph configuration. Run the following command on the
OSISM manager node:

```bash
ceph config set global container_image ${CEPH_IMAGE}
```

Import the existing `ceph.conf` into the central monitor config store. This ensures
that custom tuning parameters are preserved after migration, as cephadm uses the
centralized config store instead of per-node `ceph.conf` files. Since the `ceph` CLI
is not installed on the host, execute the command inside the crash container which is
available on every Ceph node:

```bash
docker exec ceph-crash-$(hostname) ceph config assimilate-conf -i /etc/ceph/ceph.conf
```

## Step 4: Enable the cephadm orchestrator

Enable the cephadm orchestrator module on the OSISM manager node:

```bash
ceph mgr module enable cephadm
ceph orch set backend cephadm
```

Configure cephadm to use the `dragon` user (which has passwordless sudo) instead of
`root`. Generate an SSH key and distribute it to all Ceph nodes. On the OSISM manager node:

```bash
ceph cephadm set-user dragon
ceph cephadm generate-key
ceph cephadm get-pub-key > /tmp/cephadm-pub-key.pub
```

Copy the public key to all Ceph nodes:

```bash
ssh-copy-id -f -i /tmp/cephadm-pub-key.pub dragon@<node>
```

Or use a loop to distribute the key to all Ceph nodes at once:

```bash
for node in $(osism get hosts -l ceph | awk 'NR>3 && /\|/ {print $2}'); do
    ssh-copy-id -f -i /tmp/cephadm-pub-key.pub dragon@${node}
done
```

Register all Ceph nodes with the orchestrator on the OSISM manager node:

```bash
ceph orch host add <node> <node-ip>
```

Or use a loop to register all Ceph nodes at once:

```bash
for node in $(osism get hosts -l ceph | awk 'NR>3 && /\|/ {print $2}'); do
    ceph orch host add ${node} $(getent hosts ${node} | awk '{print $1}')
done
```

Verify that all hosts have been registered:

```bash
ceph orch host ls
```

## Step 5: Adopt daemons

Adopt all Ceph daemons across the cluster. The recommended order is:

1. **Monitors** (mon)
2. **Managers** (mgr)
3. **OSDs** (osd)

For each daemon, run the adopt command on the respective node. Set the variables
on each node first:

```bash
CEPH_HOSTNAME=$(hostname)
CEPH_IMAGE=$(docker inspect $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) --format '{{.Config.Image}}')
```

:::warning

Verify cluster health with `ceph -s` on the OSISM manager node after each step.
Do not proceed if the cluster is not healthy.

:::

### Adopting monitor daemons

```bash
sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name mon.${CEPH_HOSTNAME}
sudo systemctl reset-failed ceph-mon@${CEPH_HOSTNAME}.service 2>/dev/null || true
```

### Adopting manager daemons

```bash
sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name mgr.${CEPH_HOSTNAME}
sudo systemctl reset-failed ceph-mgr@${CEPH_HOSTNAME}.service 2>/dev/null || true
```

### Verify monitors and managers

After all monitors and managers have been adopted, verify on the OSISM manager node that
the orchestrator recognises them:

```bash
ceph orch ls
ceph orch ps
```

### Adopting OSD daemons

Before adopting OSDs, set safety flags on the OSISM manager node to prevent unnecessary data
movement and PG changes during the adoption process:

```bash
ceph osd set noout
ceph osd set nodeep-scrub
ceph balancer off
```

Disable the PG autoscaler on all pools that have it enabled. Record which pools had it
enabled so it can be re-enabled after adoption:

```bash
for pool in $(ceph osd pool ls); do
    mode=$(ceph osd pool get ${pool} pg_autoscale_mode -f json | python3 -c "import json,sys; print(json.load(sys.stdin)['pg_autoscale_mode'])")
    if [ "${mode}" = "on" ]; then
        echo "${pool}" >> /tmp/autoscale_pools.txt
        ceph osd pool set ${pool} pg_autoscale_mode off
    fi
done
```

Then adopt the OSDs on each node:

```bash
sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name osd.<osd_id>
sudo systemctl reset-failed ceph-osd@<osd_id>.service 2>/dev/null || true
```

Or use a loop to adopt all OSDs on the current node at once:

```bash
for osd_id in $(docker ps --filter "name=ceph-osd" --format "{{.Names}}" | sed 's/ceph-osd-//'); do
    sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name osd.${osd_id}
    sudo systemctl reset-failed ceph-osd@${osd_id}.service 2>/dev/null || true
done
```

:::warning

Adopt OSDs one node at a time. After completing all OSDs on a node, wait until the
cluster has fully recovered (`ceph -s` shows `HEALTH_OK`) before proceeding to the next
node. In small environments with only a few OSDs, it is best to adopt each OSD individually
and wait for the cluster to recover between each adoption.

:::

:::info

During OSD adoption you may see an error like:

```
Non-zero exit code 1 from systemctl disable ceph-volume@lvm-<OSD_ID>-<UUID>.service
Failed to disable unit: Unit file ceph-volume@lvm-<OSD_ID>-<UUID>.service does not exist.
```

This error is harmless. Cephadm attempts to disable the legacy `ceph-volume` systemd unit
as part of the adoption process. When Ceph was deployed with ceph-ansible using containers,
this unit does not exist, so the disable command fails. The OSD is still adopted correctly.

:::

After all OSDs have been adopted, verify that the orchestrator recognises them:

```bash
ceph orch ps --refresh
```

Once all PGs are `active+clean`, remove the safety flags and re-enable the PG
autoscaler on the OSISM manager node:

```bash
ceph osd unset noout
ceph osd unset nodeep-scrub
ceph balancer on
```

```bash
if [ -f /tmp/autoscale_pools.txt ]; then
    while read pool; do
        ceph osd pool set ${pool} pg_autoscale_mode on
    done < /tmp/autoscale_pools.txt
    rm /tmp/autoscale_pools.txt
fi
```

### Migrating RGW daemons

:::note

The migration of RGW has currently only been tested for single-site deployments.
Instructions for multi-site RGW setups will be added in a future update of this guide.

:::

RGW daemons cannot be adopted in-place with `cephadm adopt`. Instead, new RGW daemons
are deployed via the orchestrator and the legacy daemons are stopped afterwards.

Determine the RGW nodes on the OSISM manager node:

```bash
osism get hosts -l ceph-rgw
```

Determine the RGW realm, zone group, and zone name from the running cluster:

```bash
radosgw-admin realm list
radosgw-admin zonegroup list
radosgw-admin zone list
```

In a typical single-site deployment, the default values are `default` for all three.
The service ID for the `ceph orch apply rgw` command is composed as
`<realm_name>.<zone_name>` (e.g. `default.default`).

Determine the RGW frontend port from the ceph-ansible configuration
(`environments/ceph/configuration.yml`). The variable `radosgw_frontend_port` contains
the port (default: `8081`).

If the RGW service was configured with SSL (i.e. `radosgw_frontend_ssl_certificate` is
set in the ceph-ansible configuration), the SSL certificate must be imported into the
Ceph config-key store **before** deploying. Run this on each RGW node:

```bash
sudo ceph config-key set rgw/cert/rgw.$(hostname) -i <path_to_ssl_certificate>
```

Deploy new RGW daemons on the OSISM manager node using a service spec. If SSL is used,
add `--ssl` to the command:

```bash
RGW_SERVICE_ID=default.default        # <realm_name>.<zone_name>
RGW_PLACEMENT="rgw-node-1,rgw-node-2,rgw-node-3"  # from osism get hosts -l ceph-rgw
RGW_PORT=8081                          # from radosgw_frontend_port in configuration.yml

ceph orch apply rgw ${RGW_SERVICE_ID} --placement="${RGW_PLACEMENT}" --port=${RGW_PORT}
# If SSL is enabled, add --ssl:
# ceph orch apply rgw ${RGW_SERVICE_ID} --placement="${RGW_PLACEMENT}" --port=${RGW_PORT} --ssl
```

Wait until the new RGW daemons are running:

```bash
ceph orch ps --daemon-type rgw
```

Then stop and disable the legacy RGW daemons on each RGW node:

```bash
sudo systemctl stop ceph-radosgw.target
sudo systemctl disable ceph-radosgw.target
```

### Migrating MDS daemons

MDS daemons cannot be adopted in-place with `cephadm adopt`. Instead, new MDS daemons
are deployed via the orchestrator and the legacy daemons are stopped afterwards.

Determine the CephFS filesystem name on the OSISM manager node:

```bash
ceph fs ls
```

This returns output like `name: cephfs, metadata pool: cephfs_metadata, data pools: [cephfs_data ]`.
The name (e.g. `cephfs`) is needed for the next step.

The CephFS name also corresponds to the `cephfs` variable in the ceph-ansible
configuration (`environments/ceph/configuration.yml`).

Determine the MDS nodes on the OSISM manager node:

```bash
osism get hosts -l ceph-mds
```

Deploy the new MDS daemons and stop the legacy ones by running the following script
on the OSISM manager node. Replace `<cephfs_name>` with the CephFS filesystem name and
list the MDS nodes in the placement:

```bash
CEPHFS_NAME=<cephfs_name>
MDS_PLACEMENT="<mds-node-1>,<mds-node-2>,<mds-node-3>"
MDS_NODES=(<mds-node-1> <mds-node-2> <mds-node-3>)

# Deploy new MDS daemons via the orchestrator
ceph orch apply mds ${CEPHFS_NAME} --placement="${MDS_PLACEMENT}"

# Wait until the new MDS daemons are running
echo "Waiting for new MDS daemons..."
until ceph orch ps --daemon-type mds --format json | python3 -c "
import json, sys
daemons = json.load(sys.stdin)
running = [d for d in daemons if d.get('status_desc') == 'running']
sys.exit(0 if len(running) >= len('${MDS_PLACEMENT}'.split(',')) else 1)
" 2>/dev/null; do
    sleep 5
done
echo "New MDS daemons are running."

# Stop and disable the legacy MDS daemons on each node
# Alternatively, run on each MDS node manually:
#   sudo systemctl stop ceph-mds@<hostname>.service
#   sudo systemctl disable ceph-mds@<hostname>.service
for node in "${MDS_NODES[@]}"; do
    echo "Stopping legacy MDS daemon on ${node}..."
    ssh ${node} "sudo systemctl stop ceph-mds@${node}.service; sudo systemctl disable ceph-mds@${node}.service"
done
```

## Step 6: Apply service specs

After adoption, daemons show as `<unmanaged>` in `ceph orch ls` because the orchestrator
has no service spec for them. Apply service specs on the OSISM manager node to make them
managed:

```bash
ceph orch apply mon --placement="<mon-node-1>,<mon-node-2>,<mon-node-3>"
ceph orch apply mgr --placement="<mgr-node-1>,<mgr-node-2>,<mgr-node-3>"
```

:::note

Adopted osd daemons will show as `<unmanaged>` in `ceph orch ls`. This is
expected and does not affect their operation. Do **not** use
`ceph orch apply osd --all-available-devices` as this will create new unwanted OSD
services instead of adopting the existing ones.

:::

Verify that all services are now managed on the OSISM manager node:

```bash
ceph orch ls
```

## Step 7: Verify the migration

Verify the full cluster state on the OSISM manager node:

```bash
ceph -s
ceph orch ps
```

All daemons should show as managed by cephadm in the `ceph orch ps` output. Cluster
health should be `HEALTH_OK`.

Verify that all services are running with the correct container image (on the OSISM manager node):

```bash
ceph versions
```

## Step 8: Deploy crash daemons

The crash daemons cannot be adopted from ceph-ansible and must be redeployed. Stop and
remove the legacy crash containers on each Ceph node:

```bash
sudo systemctl stop ceph-crash@${CEPH_HOSTNAME}.service
sudo systemctl disable ceph-crash@${CEPH_HOSTNAME}.service
```

Then deploy new crash daemons via cephadm on the OSISM manager node:

```bash
ceph orch apply crash
```

## Step 9: Clean up ceph-ansible artifacts

After verifying that all daemons have been successfully adopted and the cluster is
stable, the legacy ceph-ansible artifacts can be removed.

1. Remove old systemd unit files that are no longer used:

   ```bash
   sudo rm -f /etc/systemd/system/ceph-*.service
   sudo systemctl daemon-reload
   ```

2. The ceph-ansible configuration in the OSISM configuration repository
   (`environments/ceph/`) can be kept as a reference but is no longer active.

:::note

Do **not** remove `/etc/ceph/ceph.conf` or any keyring files. These are still
used by the cluster and are now managed by cephadm.

:::

## Post-migration operations

After migration, Ceph lifecycle operations are performed through cephadm and the
Ceph orchestrator instead of `osism apply ceph-*` commands.

| ceph-ansible (before)             | cephadm (after)                         |
|:----------------------------------|:----------------------------------------|
| `osism apply ceph-mons`           | `ceph orch apply mon`                   |
| `osism apply ceph-mgrs`           | `ceph orch apply mgr`                   |
| `osism apply ceph-osds`           | `ceph orch apply osd`                   |
| `osism apply ceph-rgws`           | `ceph orch apply rgw`                   |
| `osism apply ceph-mdss`           | `ceph orch apply mds`                   |
| Editing `configuration.yml`       | `ceph config set <section> <key> <val>` |
| `osism apply ceph-rolling_update` | `ceph orch upgrade start --image <img>` |

For the full cephadm operations reference, see the
[cephadm documentation](https://docs.ceph.com/en/latest/cephadm/).

## Troubleshooting

### Adoption fails with "daemon not found"

Ensure that the daemon is still running under the legacy systemd unit before attempting
adoption. Check with:

```bash
sudo systemctl status ceph-<type>@<id>
```

### OSD adoption fails with missing fsid or type file

In some containerized deployments, the files `/var/lib/ceph/osd/ceph-<id>/fsid` and
`/var/lib/ceph/osd/ceph-<id>/type` may not exist on the host. Cephadm requires these
files during adoption. Create them manually before retrying:

```bash
OSD_ID=<osd_id>
OSD_FSID=$(sudo ceph-volume lvm list ${OSD_ID} --format json | python3 -c "import json,sys; d=json.load(sys.stdin); print([e['tags']['ceph.osd_fsid'] for e in d['${OSD_ID}'] if e['type']=='block'][0])")
sudo mkdir -p /var/lib/ceph/osd/ceph-${OSD_ID}
echo "${OSD_FSID}" | sudo tee /var/lib/ceph/osd/ceph-${OSD_ID}/fsid
echo "bluestore" | sudo tee /var/lib/ceph/osd/ceph-${OSD_ID}/type
```

### Container image pull fails

Verify that the node can reach the container registry. For OSISM environments:

```bash
sudo cephadm pull registry.osism.tech/osism/ceph-daemon:${CEPH_RELEASE}
```

If the node is behind a proxy, ensure the container runtime is configured to use it.

### Cluster health degrades during migration

Stop the migration and investigate. Common causes:

* A daemon was adopted on the wrong node.
* The container image version does not match the running Ceph version.
* Network connectivity issues between nodes.

Resolve the issue before continuing. An adopted daemon can be reverted by stopping the
cephadm-managed unit and restarting the legacy systemd unit if it was preserved:

```bash
# Example: reverting an adopted OSD with ID 3
# Stop the cephadm-managed unit
sudo systemctl stop ceph-<FSID>@osd.3.service
sudo systemctl disable ceph-<FSID>@osd.3.service

# Restart the legacy systemd unit
sudo systemctl enable ceph-osd@3.service
sudo systemctl start ceph-osd@3.service
```

Replace `<FSID>` with the cluster's FSID, which can be found with `ceph fsid`. The same
pattern applies to other daemon types (replace `osd.3` with e.g. `mon.<hostname>` or
`mgr.<hostname>`).

### SSH connection issues

Cephadm requires SSH access to all nodes. Verify on the OSISM manager node:

```bash
ceph cephadm check-host <node>
```

Or use a loop to check all Ceph nodes at once:

```bash
for node in $(osism get hosts -l ceph | awk 'NR>3 && /\|/ {print $2}'); do
    echo "=== ${node} ==="
    ceph cephadm check-host ${node}
done
```

Ensure the cephadm SSH key has been distributed to all nodes (see Step 4).
