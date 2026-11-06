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
* SSH access from the OSISM manager node to all Ceph nodes (required by cephadm for orchestration).
* The Ceph cluster must be running at least Ceph Octopus (15.2.x) or later. Clusters
  deployed with a supported OSISM release already meet this requirement.
* Python 3 and `lvm2` must be installed on all Ceph nodes (these are typically already present).

TODO: Consider replacing the manual prerequisite checks with an `osism apply ready-for-cephadm`
task that automatically verifies all conditions (cluster health, SSH access, Ceph version,
required packages).

## Step 1: Verify cluster health

Before starting the migration, ensure the cluster is in a healthy state. Run the following
commands on the OSISM manager node.

```bash
ceph -s
ceph osd tree
ceph df
```

All PGs should be `active+clean`. Resolve any degraded or misplaced PGs before proceeding.
In `ceph osd tree`, verify that all OSDs show `up` with a non-zero REWEIGHT. In `ceph df`,
check that `%RAW USED` is well below 85% (Ceph's default nearfull threshold).

## Step 2: Install cephadm

Install cephadm on **all** Ceph nodes, the hosts in the `ceph` inventory group
(`osism get hosts -l ceph`). The version of cephadm must match the running Ceph
release.

First, determine the running Ceph release on the OSISM manager node:

```bash
ceph versions
```

This lists the version of the running daemons, for example
`"ceph version 18.2.8 (...) reef (stable)": 21` under `overall`. The release name
(`reef`, `squid`) decides which of the following sections applies. The Reef commands
read the exact version from the running daemons themselves. Use `ceph versions`, not
`ceph version`: on the manager, `ceph version` reports the version of the `cephclient`
container, which need not match the cluster.

### Reef (18.x)

:::warning Do not use the UCA package on Reef
The Ubuntu Cloud Archive has not moved past cephadm 18.2.4, which contains a
[known bug](https://tracker.ceph.com/issues/63151) in its AppArmor profile parsing,
[fixed upstream](https://github.com/ceph/ceph/pull/57955) in 18.2.5+. The crash is in
`HostFacts`, so it is **not** limited to OSD adoption: on any node it also breaks
`cephadm shell` and `cephadm gather-facts`, the commands you reach for after the
migration. Any AppArmor profile whose name contains a space triggers it, and stock
Ubuntu 24.04 ships one (`/etc/apparmor.d/MongoDB_Compass`), so a default installation
is affected.
:::

On Reef, install cephadm as a standalone Python script from the Ceph Git repository on
**all** Ceph nodes, control and OSD alike:

```bash
CEPH_RELEASE=$(docker exec $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) ceph --version | awk '{print $3}')
curl --fail --silent --remote-name --location https://raw.githubusercontent.com/ceph/ceph/v${CEPH_RELEASE}/src/cephadm/cephadm.py
sudo install -m 0755 -o root -g root cephadm.py /usr/sbin/cephadm
rm cephadm.py
```

The release is read from the running daemon rather than from the container image tag,
because a tag is not always a Git reference: a stable tag (`18.2.8`) is not a branch, and
a registry that includes a port (`registry.example:5001/ceph/ceph:18.2.8`) defeats naive
parsing of the image name. `--fail` makes `curl` stop on a 404 instead of saving the
error page over `cephadm.py`. Every node fetches the script itself, so each needs HTTPS
access to `raw.githubusercontent.com`.

The standalone script does not know its own version: `cephadm version` prints
`cephadm version UNKNOWN` and exits with 1. Check the installation with
`sudo cephadm --help` instead, which exits with 0.

### Quincy (17)

No cephadm for Quincy has the fix: the bug is in the last Quincy release, 17.2.9, and
in its UCA package. Upgrade a Quincy cluster to Reef first (see the
[Ceph upgrade guide](../../upgrade-guide/ceph/index.md)), then follow the Reef
instructions above.

### Squid (19)

Install the cephadm package from the
[Ubuntu Cloud Archive](https://ubuntu-cloud.archive.canonical.com/ubuntu/pool/main/c/ceph/)
on **all** Ceph nodes. The exact point release does not need to match your running Ceph
version -- only the release series matters.

The package is installed directly via `dpkg` rather than `apt install` because the
Ubuntu Cloud Archive is typically not configured as an apt source in OSISM environments.
Adding the full UCA repository just for cephadm is not recommended, as it could
introduce unintended package upgrades from the UCA that conflict with the versions
managed by OSISM.

```bash
CEPHADM_PKG=cephadm_19.2.3-0ubuntu0.24.04.2~cloud0_amd64.deb
```

```bash
curl --fail --silent --remote-name --location https://ubuntu-cloud.archive.canonical.com/ubuntu/pool/main/c/ceph/${CEPHADM_PKG}
sudo dpkg -i ${CEPHADM_PKG}
```


## Step 3: Prepare the cephadm configuration

On each Ceph node, prepare the host for cephadm. The `cephadm prepare-host` command
performs a series of checks to ensure the host meets the requirements for managing
Ceph daemons with cephadm. Specifically, it verifies:

* A **container runtime** (Podman or Docker) is installed and functional
* **LVM2** (`lvm2` package) is available — required by Ceph OSDs for managing logical volumes
* **Time synchronization** (e.g. chrony or NTP) is enabled and running — clock skew between
  Ceph nodes can cause monitors to lose quorum
* General system prerequisites such as the availability of `systemctl`

If any of these checks fail, `prepare-host` will report the issue so it can be resolved
before proceeding with the migration.

```bash
sudo cephadm prepare-host
```

The output should look similar to this:

```console
Verifying podman|docker is present...
Verifying lvm2 is present...
Verifying time synchronization is in place...
Unit chrony.service is enabled and running
Repeating the final host check...
docker (/usr/bin/docker) is present
systemctl is present
lvcreate is present
Unit chrony.service is enabled and running
Host looks OK
```

If the output indicates errors or missing dependencies, resolve them before proceeding.

Determine the currently used container image and set it in the Ceph
configuration.
Run the following commands on the OSISM manager node:

```bash
MON_NODE=$(osism get hosts -l ceph-mon | awk 'NR>3 && /\|/ {print $2}' | head -1)
CEPH_IMAGE=$(ssh ${MON_NODE} "docker inspect \$(docker ps --filter 'name=ceph' --format '{{.Names}}' | head -1) --format '{{.Config.Image}}'")
echo "Container image: ${CEPH_IMAGE}"
ceph config set global container_image ${CEPH_IMAGE}
```

:::warning
Do not run the `docker inspect` command on the manager node — it runs the
`cephclient`
container there and would return a wrong image (`cephclient` instead of
`ceph-daemon`).
:::

Import the existing `ceph.conf` into the central monitor config store. This ensures
that custom tuning parameters are preserved after migration, as cephadm uses the
centralized config store instead of per-node `ceph.conf` files. Since the `ceph` CLI
is not installed on the host, execute the command inside the crash container on
**one of the monitor nodes**:

```bash
docker exec ceph-crash-$(hostname) ceph config assimilate-conf -i /etc/ceph/ceph.conf
```

In a typical OSISM deployment, the `ceph.conf` is the same on every node except for one
section: the RGW options sit under a section naming that node's own legacy RGW daemon,
`client.rgw.<zone>.<host>.rgw0`, on RGW and non-RGW nodes alike. Running the command once
is sufficient. The RGW options then land under the section of the node it ran on; the
RGW migration in Step 5 copies them to `client.rgw` for the new daemons. If nodes have
individual tuning parameters in their `ceph.conf`, run the command on each affected node.

## Step 4: Configure cephadm

Enable the cephadm orchestrator module on the OSISM manager node:

```bash
ceph mgr module enable cephadm
ceph orch set backend cephadm
```

Configure cephadm to use the `dragon` user (which has passwordless sudo) instead of
`root`. In a standard OSISM deployment, the operator SSH key already exists at
`/opt/ansible/secrets/id_rsa.operator`. Import it so that cephadm can connect to all
Ceph nodes.

:::note The public key has to be derived
`/opt/ansible/secrets/` holds the **private** key only. This is true of every OSISM
deployment rather than a local quirk: the `manager` role writes
`{{ secrets_directory }}/id_rsa.{{ item.key }}` for each configured private key and never
a matching `.pub`. The public half is therefore generated from the private one below,
before it is imported.
:::

On the OSISM manager node:
```bash
ceph cephadm set-user dragon
cp /opt/ansible/secrets/id_rsa.operator /opt/cephclient/data/
ssh-keygen -y -f /opt/ansible/secrets/id_rsa.operator > /opt/cephclient/data/id_rsa.operator.pub
ceph cephadm set-priv-key -i /data/id_rsa.operator
ceph cephadm set-pub-key -i /data/id_rsa.operator.pub
rm /opt/cephclient/data/id_rsa.operator*
```

The paths differ on purpose: on the manager, `ceph` runs inside the `cephclient`
container, which sees the host directory `/opt/cephclient/data` as `/data`. The files
are copied there on the host and read by `ceph` from inside the container.

Only the private key is needed for cephadm to reach the nodes, so a cluster where
`set-pub-key` was skipped still orchestrates normally. The public key is what
`ceph cephadm get-pub-key` returns, which is how the key is distributed to hosts added
later -- including by the alternative path below.

:::info

If no existing SSH key is available, generate a new one and distribute it to all Ceph
nodes instead:

```bash
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

:::

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

The output should look similar to this:

```console
Added host 'testbed-node-0' with addr '192.168.16.10'
Added host 'testbed-node-1' with addr '192.168.16.11'
Added host 'testbed-node-2' with addr '192.168.16.12'
Added host 'testbed-node-3' with addr '192.168.16.13'
Added host 'testbed-node-4' with addr '192.168.16.14'
Added host 'testbed-node-5' with addr '192.168.16.15'
```

Verify that all hosts have been registered:

```bash
ceph orch host ls
```

The output should look similar to this:

```console
HOST            ADDR           LABELS  STATUS
testbed-node-0  192.168.16.10
testbed-node-1  192.168.16.11
testbed-node-2  192.168.16.12
testbed-node-3  192.168.16.13
testbed-node-4  192.168.16.14
testbed-node-5  192.168.16.15
6 hosts in cluster
```

## Step 5: Adopt daemons

Adopt all Ceph daemons across the cluster. The recommended order is:

1. **Monitors** (mon)
2. **Managers** (mgr)
3. **OSDs** (osd)

For each daemon, run the adopt command on the respective node.

:::warning

Verify cluster health with `ceph -s` on the OSISM manager node after each step.
Do not proceed if `ceph -s` reports `HEALTH_ERR` or degraded/unavailable PGs.

During migration, `HEALTH_WARN` with messages like "stray daemon(s) not managed by
cephadm" or "failed to probe daemons or devices" is expected and safe to continue. The
stray daemons are reported from Step 4 on, as soon as the hosts are added, and right
after `ceph orch host add` a short-lived "stray host(s)" (`CEPHADM_STRAY_HOST`) can
appear as well.

:::

### Adopting monitor daemons

The monitor daemons (MON) maintain the cluster map and are responsible for consensus
among the Ceph nodes. The adopt command converts each monitor from its legacy
systemd/Docker-based deployment (as set up by ceph-ansible) to a cephadm-managed
container. During this process cephadm will:

1. Pull the container image (if not already present)
2. Stop and disable the old systemd unit (e.g. `ceph-mon@<hostname>`)
3. Move the monitor's data directory and logs into the cephadm-managed directory layout
   under `/var/lib/ceph/<fsid>/`
4. Create new systemd units managed by cephadm

The monitor remains available throughout — the other monitors maintain quorum while one
is being adopted.

On each monitor node (`osism get hosts -l ceph-mon`), set the required variables and adopt
the daemon:

```bash
CEPH_HOSTNAME=$(hostname)
CEPH_IMAGE=$(docker inspect $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) --format '{{.Config.Image}}')
sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name mon.${CEPH_HOSTNAME}
sudo systemctl reset-failed ceph-mon@${CEPH_HOSTNAME}.service 2>/dev/null || true
```

The output should look similar to this:

```console
Pulling container image registry.osism.tech/osism/ceph-daemon:reef...
Stopping old systemd unit ceph-mon@testbed-node-0...
Disabling old systemd unit ceph-mon@testbed-node-0...
Moving data...
Chowning content...
Moving logs...
Creating new units...
```

### Adopting manager daemons

The manager daemons (MGR) provide additional monitoring and management interfaces for
the cluster (e.g. the dashboard, Prometheus metrics, and the orchestrator module).
The adopt process is identical to that of the monitors — cephadm stops the legacy
unit, migrates data and logs, and creates new cephadm-managed systemd units. Since
multiple managers run in active/standby mode, adopting one at a time ensures the
cluster always has an active manager available.

On each manager node (`osism get hosts -l ceph-mgr`), set the required variables and adopt
the daemon:

```bash
CEPH_HOSTNAME=$(hostname)
CEPH_IMAGE=$(docker inspect $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) --format '{{.Config.Image}}')
sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name mgr.${CEPH_HOSTNAME}
sudo systemctl reset-failed ceph-mgr@${CEPH_HOSTNAME}.service 2>/dev/null || true
```

The output should look similar to this:

```console
Pulling container image registry.osism.tech/osism/ceph-daemon:reef...
Stopping old systemd unit ceph-mgr@testbed-node-0...
Disabling old systemd unit ceph-mgr@testbed-node-0...
Moving data...
Chowning content...
Moving logs...
Creating new units...
```

### Verify monitors and managers

After all monitors and managers have been adopted, verify on the OSISM manager node that
the orchestrator recognises them:

List all services known to the orchestrator:

```bash
ceph orch ls --refresh
```

:::note
`--refresh` asks the orchestrator to update its view and returns at once with what it
knew before, so daemons adopted a moment ago can be missing or show a lower count. Run
the command again a minute later. The same applies to every `--refresh` in this guide.
:::

The output should look similar to this. Both services show as `<unmanaged>` at this point,
which is expected:

```console
NAME  PORTS  RUNNING  REFRESHED  AGE  PLACEMENT
mgr              3/0  43s ago    -    <unmanaged>
mon              3/0  43s ago    -    <unmanaged>
```

List all monitor daemon instances and their status:

```bash
ceph orch ps --daemon-type mon
```

The output should look similar to this. All monitors should show as `running`:

```console
NAME                HOST            PORTS  STATUS         REFRESHED  AGE  MEM USE  MEM LIM  VERSION  IMAGE ID      CONTAINER ID
mon.testbed-node-0  testbed-node-0         running (22m)     2m ago  13m    73.6M    2048M  18.2.8   01985efead8e  e9f0ac0ce245
mon.testbed-node-1  testbed-node-1         running (19m)     2m ago  13m    69.5M    2048M  18.2.8   01985efead8e  aa12850676f7
mon.testbed-node-2  testbed-node-2         running (19m)     2m ago  13m    64.5M    2048M  18.2.8   01985efead8e  43a13bac74fb
```

List all manager daemon instances and their status:

```bash
ceph orch ps --daemon-type mgr
```

The output should look similar to this. All managers should show as `running`:

```console
NAME                HOST            PORTS  STATUS         REFRESHED  AGE  MEM USE  MEM LIM  VERSION  IMAGE ID      CONTAINER ID
mgr.testbed-node-0  testbed-node-0         running (3m)      2m ago   2m     459M        -  18.2.8   01985efead8e  b6c5b884b38c
mgr.testbed-node-1  testbed-node-1         running (2m)      2m ago    -     458M        -  18.2.8   01985efead8e  8adf9e898e82
mgr.testbed-node-2  testbed-node-2         running (2m)      2m ago    -     504M        -  18.2.8   01985efead8e  54e779780c5a
```

### Adopting OSD daemons

The OSD daemons (Object Storage Daemon) are responsible for storing the actual data on
disk. Adopting OSDs is the most sensitive part of the migration because each OSD manages
real data volumes (BlueStore). The adopt process migrates each OSD's data directory,
block device symlinks, and logs into the cephadm layout — but the underlying data on
disk is **not** moved or modified.

Because an OSD restart temporarily reduces the number of available replicas, safety flags
(`noout`, `nodeep-scrub`, balancer off) are set beforehand to prevent Ceph from
initiating unnecessary data rebalancing or deep scrubs while OSDs are being restarted
during adoption. The PG autoscaler is also disabled to avoid placement group changes
during the process.

Before adopting OSDs, set safety flags on the OSISM manager node to prevent unnecessary data
movement and PG changes during the adoption process. Record first whether the balancer is
active, so that it is switched back on only if it was on before:

```bash
ceph balancer status -f json | python3 -c "import json,sys; print(json.load(sys.stdin)['active'])" > /home/dragon/balancer_active.txt
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
        echo "${pool}" >> /home/dragon/autoscale_pools.txt
        ceph osd pool set ${pool} pg_autoscale_mode off
    fi
done
```

On each OSD node (`osism get hosts -l ceph-osd`), set the required variable and identify the
OSDs running on the node:

```bash
CEPH_IMAGE=$(docker inspect $(docker ps --filter "name=ceph" --format "{{.Names}}" | head -1) --format '{{.Config.Image}}')
docker ps --filter "name=ceph-osd"
```

The output should look similar to this:

```console
CONTAINER ID   IMAGE                                       COMMAND                CREATED    STATUS    NAMES
05eb59c1ef36   registry.osism.tech/osism/ceph-daemon:reef  "/usr/bin/ceph-osd …"  5 days ago Up 5 days ceph-osd-3
8646edf83163   registry.osism.tech/osism/ceph-daemon:reef  "/usr/bin/ceph-osd …"  5 days ago Up 5 days ceph-osd-1
```

The OSD ID is the number after `ceph-osd-` in the container name. For example,
`ceph-osd-1` has OSD ID `1` and `ceph-osd-3` has OSD ID `3`.

:::warning

Adopt OSDs **one node at a time**. After completing all OSDs on a node, wait until all
PGs return to `active+clean` (`ceph -s` shows all PGs `active+clean` under `data:`)
before proceeding to the next node. The overall health may still show `HEALTH_WARN` for
stray daemons during migration — this is expected and not a stop condition.

Within a single node, it is safe to use the loop below without waiting between individual
OSDs, provided your cluster meets both of the following conditions:

* At least **3 OSD nodes**.
* **Host-level CRUSH failure domain** — the OSISM default. Verify with:
  ```bash
  ceph osd crush rule dump
  ```
  All rules should show `"type": "host"` in the `chooseleaf` step.

If your cluster has only 2 OSD nodes, or any rule shows a different failure domain type,
adopt each OSD individually and wait for all PGs to return to `active+clean` after each
one before continuing.

:::

Then adopt each OSD on the node:

```bash
OSD_ID=<osd_id>
sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name osd.${OSD_ID}
sudo systemctl reset-failed ceph-osd@${OSD_ID}.service 2>/dev/null || true
```

The output should look similar to this:

```console
Pulling container image registry.osism.tech/osism/ceph-daemon:reef...
Found online OSD at //var/lib/ceph/osd/ceph-1/fsid
objectstore_type is bluestore
Stopping old systemd unit ceph-osd@1...
Disabling old systemd unit ceph-osd@1...
Moving data...
Chowning content...
Chowning /var/lib/ceph/11111111-1111-1111-1111-111111111111/osd.1/block...
Disabling host unit ceph-volume@ lvm unit...
Non-zero exit code 1 from systemctl disable ceph-volume@lvm-1-f3cfe0e4-70f3-4078-9aba-2d45170e9df9.service
systemctl: stderr Failed to disable unit: Unit file ceph-volume@lvm-1-f3cfe0e4-70f3-4078-9aba-2d45170e9df9.service does not exist.
Moving logs...
Creating new units...
```

Or use a loop to adopt all OSDs on the current node at once:

```bash
for osd_id in $(docker ps --filter "name=ceph-osd" --format "{{.Names}}" | sed 's/ceph-osd-//'); do
    sudo cephadm --image ${CEPH_IMAGE} adopt --style legacy --skip-firewalld --name osd.${osd_id}
    sudo systemctl reset-failed ceph-osd@${osd_id}.service 2>/dev/null || true
done
```

Right after the OSDs of a node have been adopted, `ceph -s` shows them restarting:
some OSDs `down`, PGs `peering` and briefly inactive ("Reduced data availability"),
and degraded objects. This is the restart, not a failure. It settled within 30 seconds
per node on a test cluster; wait until all PGs are `active+clean` before you judge the
state or continue with the next node.

:::info

During OSD adoption you may see an error like:

```console
Non-zero exit code 1 from systemctl disable ceph-volume@lvm-<OSD_ID>-<UUID>.service
Failed to disable unit: Unit file ceph-volume@lvm-<OSD_ID>-<UUID>.service does not exist.
```

This error is harmless. Cephadm attempts to disable the legacy `ceph-volume` systemd unit
as part of the adoption process. When Ceph was deployed with ceph-ansible using containers,
this unit does not exist, so the disable command fails. The OSD is still adopted correctly.

:::

After all OSDs have been adopted, verify that the orchestrator recognises them:

```bash
ceph orch ls --refresh
```

The output should now also include the OSD service:

```console
NAME  PORTS  RUNNING  REFRESHED  AGE  PLACEMENT
mgr              3/0  5m ago     -    <unmanaged>
mon              3/0  5m ago     -    <unmanaged>
osd                6  5m ago     -    <unmanaged>
```

Verify that all OSD daemon instances are running:

```bash
ceph orch ps --daemon-type osd --refresh
```

The output should look similar to this. All OSDs should show as `running`:

```console
NAME   HOST            PORTS  STATUS          REFRESHED  AGE  MEM USE  MEM LIM  VERSION  IMAGE ID      CONTAINER ID
osd.0  testbed-node-3         running (46s)      0s ago    -     181M    4096M  18.2.8   01985efead8e  f83bb9204db5
osd.1  testbed-node-4         running (5m)       0s ago   2m     167M    4096M  18.2.8   01985efead8e  11cd8d77a78b
osd.2  testbed-node-5         running (118s)     0s ago    -     176M    4096M  18.2.8   01985efead8e  f608633171a8
osd.3  testbed-node-4         running (3m)       0s ago   2m     196M    4096M  18.2.8   01985efead8e  5032744c6063
osd.4  testbed-node-5         running (2m)       0s ago    -     179M    4096M  18.2.8   01985efead8e  a9c9f18801d9
osd.5  testbed-node-3         running (38s)      0s ago    -     153M    4096M  18.2.8   01985efead8e  bfd02ac996db
```

Once all PGs are `active+clean`, remove the safety flags and re-enable the PG
autoscaler on the OSISM manager node:

```bash
ceph osd unset noout
ceph osd unset nodeep-scrub
if [ "$(cat /home/dragon/balancer_active.txt)" = "True" ]; then
    ceph balancer on
fi
rm /home/dragon/balancer_active.txt
```

```bash
if [ -f /home/dragon/autoscale_pools.txt ]; then
    while read pool; do
        if ceph osd pool set ${pool} pg_autoscale_mode on > /dev/null 2>&1; then
            echo "OK: ${pool}"
        else
            echo "FAILED: ${pool}"
        fi
    done < /home/dragon/autoscale_pools.txt
fi
# Once all pools show OK, run: rm /home/dragon/autoscale_pools.txt
```

### Migrating crash daemons

The crash daemons cannot be adopted from ceph-ansible and must be redeployed. Stop and
remove the legacy crash containers on each Ceph node:

```bash
CEPH_HOSTNAME=$(hostname)
sudo systemctl stop ceph-crash@${CEPH_HOSTNAME}.service
sudo systemctl disable ceph-crash@${CEPH_HOSTNAME}.service
```

Then deploy new crash daemons via cephadm on the OSISM manager node:

```bash
ceph orch apply crash
```

Verify that the crash daemons are running:

```bash
ceph orch ls
```

The output should now include the crash service:

```console
NAME   PORTS  RUNNING  REFRESHED  AGE  PLACEMENT
crash             6/6  3s ago     23s  *
mgr               3/0  3s ago     -    <unmanaged>
mon               3/0  3s ago     -    <unmanaged>
osd                 6  3s ago     -    <unmanaged>
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

In a typical single-site OSISM deployment, the zone and zonegroup are `default`. The realm
may be empty — the script below falls back to `default` in that case, giving a service ID
of `default.default`.
The service ID for the `ceph orch apply rgw` command is composed as
`<realm_name>.<zone_name>` (e.g. `default.default`).

Determine the RGW frontend port from the ceph-ansible configuration
(`environments/ceph/configuration.yml`). The variable `radosgw_frontend_port` contains
the port; without it, OSISM's default `8081` applies. The new daemons have to listen on
the port the legacy ones use, since the load balancer points there. Before the migration,
compare it with what a legacy RGW listens on, on an RGW node:

```bash
sudo ss -ltnp | grep radosgw
```

If the RGW service was configured with SSL (i.e. `radosgw_frontend_ssl_certificate` is
set in the ceph-ansible configuration), the SSL certificate must be imported into the
Ceph config-key store **before** deploying. Run this on each RGW node:

```bash
sudo ceph config-key set rgw/cert/rgw.$(hostname) -i <path_to_ssl_certificate>
```

#### Copy the RGW configuration for the new daemons

:::warning Do this before deploying the new RGW daemons
cephadm generates new daemon names, and **per-daemon configuration does not follow
them**. ceph-ansible stores RGW options under a section naming the legacy daemon
(`client.rgw.<zone>.<host>.rgw0`); the new daemons are called
`client.rgw.<realm>.<zone>.<host>.<random>` and inherit none of it. Without this step,
every RGW option set by the deployment -- Keystone integration, the enabled API set --
reverts to its default on the new daemons. They run and `ceph orch ps` shows them healthy,
so nothing in the later steps reveals it, while Keystone users get `401 Unauthorized`.
:::

Copy the options to `client.rgw`, which every RGW daemon inherits regardless of its
generated name:

```bash
OLD=$(ceph config dump -f json | python3 -c "import json,sys; print(sorted({e['section'] for e in json.load(sys.stdin) if e['name']=='rgw_keystone_url'})[0])")
echo "Copying from ${OLD}"
ceph config dump -f json | python3 -c "import json,sys; [print(e['name']) for e in json.load(sys.stdin) if e['section']=='$OLD' and e['name'] not in ('rgw_frontends','log_file')]" | while read -r k; do
    ceph config set client.rgw "$k" "$(ceph config get "$OLD" "$k")"
done
```

ceph-ansible renders these options into `ceph.conf`. The `ceph config assimilate-conf`
in Step 3 moves them into the monitor config store, but under the legacy section name,
which no cephadm daemon reads. `rgw_frontends` and `log_file` are left out of the copy:
they name the legacy daemon's host, and cephadm sets the frontend for each daemon itself.
The copy does not change the legacy daemons, which keep running until the migration
below: they already run with the same values.

If the deployment sets any **per-daemon MDS** options, the same rule applies to the MDS
section below: `ceph orch apply mds` likewise renames daemons. The OSISM default sets
none, so a default deployment is unaffected.

#### Deploy the new RGW daemons

:::warning

Unlike MDS daemons, RGW daemons bind to a specific port. The legacy daemon on a node must
be stopped **before** the new one can start, otherwise it will fail due to a port conflict.
The migration is therefore performed one node at a time to minimize S3/Swift API downtime
— the remaining RGW nodes continue serving requests while one node is being migrated.

:::

Prepare the variables and deploy the RGW service on the OSISM manager node. The
orchestrator will attempt to start daemons on each node, but they will only come up
once the legacy daemon on that node has been stopped. Until then, `ceph orch ps
--daemon-type rgw` reports no RGW daemons, and `ceph -s` shows `HEALTH_WARN` with
`CEPHADM_DAEMON_PLACE_FAIL` ("Failed to place 3 daemon(s)", "Cannot bind to IP 0.0.0.0
port …: Address already in use"). This is expected and clears once the loop below has
migrated every node.

Which command to use depends on the container image Step 3 printed:

* An image with a revision suffix, such as `ceph-daemon:18.2.8-r1` (shipped from OSISM
  11.0.0 on): deploy with `--networks`, listing each RGW node's `radosgw_address` as a
  `/32` (`/128` for IPv6), followed by the Ceph public network. Each daemon then
  listens only on its node's `radosgw_address`, the address the loadbalancer forwards
  to, as in a new OSISM 11 deployment. The public network alone is not enough: if
  other addresses of the RGW nodes lie in it, such as API VIPs on `loopback0`,
  cephadm may bind a daemon to one of those. The `CEPHADM_DAEMON_PLACE_FAIL` message
  above still names `0.0.0.0`; the address shows in the `PORTS` column of
  `ceph orch ps` once the loop below has run.
* An image without it, such as `ceph-daemon:18.2.8` (OSISM 10.3.0): deploy without
  `--networks`. With these images, cephadm cannot match the hosts' addresses on the
  routed topology and places no RGW daemon at all, while `ceph -s` stays `HEALTH_OK`.
  The daemons then listen on all addresses of the host; see the note below.

Before running `ceph orch apply`, check the printed `RGW_NETWORKS`: one address per RGW
node, each different, then the public network. A node missing from it has no
`radosgw_address` in the inventory. If SSL is used, add `--ssl` to the command:

```bash
RGW_REALM=$(radosgw-admin realm list --format json | python3 -c "import json,sys; print(json.load(sys.stdin)['realms'][0])" 2>/dev/null || echo "default")
RGW_ZONE=$(radosgw-admin zone list --format json | python3 -c "import json,sys; print(json.load(sys.stdin)['zones'][0])" 2>/dev/null || echo "default")
RGW_SERVICE_ID="${RGW_REALM}.${RGW_ZONE}"
RGW_PLACEMENT=$(osism get hosts -l ceph-rgw | awk 'NR>3 && /\|/ {print $2}' | paste -sd,)
RGW_PORT=$(python3 -c "import yaml; print(yaml.safe_load(open('/opt/configuration/environments/ceph/configuration.yml')).get('radosgw_frontend_port', 8081))")
RGW_NETWORKS=$(for node in ${RGW_PLACEMENT//,/ }; do
    osism get hostvars ${node} radosgw_address | awk -F'|' 'NR==4 {gsub(/[ \047]/, "", $4); print $4 ($4 ~ /:/ ? "/128" : "/32")}'
done | paste -sd,),$(ceph config get mon public_network)
echo ${RGW_NETWORKS}

# Image with a revision suffix (e.g. ceph-daemon:18.2.8-r1):
ceph orch apply rgw ${RGW_SERVICE_ID} --placement="${RGW_PLACEMENT}" --port=${RGW_PORT} --networks=${RGW_NETWORKS}

# Image without it (e.g. ceph-daemon:18.2.8):
# ceph orch apply rgw ${RGW_SERVICE_ID} --placement="${RGW_PLACEMENT}" --port=${RGW_PORT}
```

Then migrate each RGW node sequentially. On the OSISM manager node:

```bash
for node in $(osism get hosts -l ceph-rgw | awk 'NR>3 && /\|/ {print $2}'); do
    echo "Stopping legacy RGW daemon on ${node}..."
    ssh ${node} "sudo systemctl stop ceph-radosgw.target; sudo systemctl disable ceph-radosgw.target"

    echo "Waiting for new RGW daemon on ${node}..."
    until ceph orch ps --daemon-type rgw --format json | python3 -c "
import json, sys
daemons = json.load(sys.stdin)
sys.exit(0 if any(d['hostname'] == '${node}' and d.get('status_desc') == 'running' for d in daemons) else 1)
" 2>/dev/null; do
        sleep 5
    done
    echo "New RGW daemon on ${node} is running."
done
```

The loop can wait up to about a minute per node: `systemctl stop` returns before the
legacy container has released the port, and cephadm only retries placing the new daemon
on its next cycle. If it waits much longer, check `ceph health detail` for
`CEPHADM_DAEMON_PLACE_FAIL`.

The output should look similar to this:

```console
Stopping legacy RGW daemon on testbed-node-3...
Removed "/etc/systemd/system/multi-user.target.wants/ceph-radosgw.target".
Removed "/etc/systemd/system/ceph.target.wants/ceph-radosgw.target".
Waiting for new RGW daemon on testbed-node-3...
New RGW daemon on testbed-node-3 is running.
Stopping legacy RGW daemon on testbed-node-4...
Removed "/etc/systemd/system/multi-user.target.wants/ceph-radosgw.target".
Removed "/etc/systemd/system/ceph.target.wants/ceph-radosgw.target".
Waiting for new RGW daemon on testbed-node-4...
New RGW daemon on testbed-node-4 is running.
Stopping legacy RGW daemon on testbed-node-5...
Removed "/etc/systemd/system/multi-user.target.wants/ceph-radosgw.target".
Removed "/etc/systemd/system/ceph.target.wants/ceph-radosgw.target".
Waiting for new RGW daemon on testbed-node-5...
New RGW daemon on testbed-node-5 is running.
```

Verify that all new RGW daemons are running:

```bash
ceph orch ps --daemon-type rgw
```

The output should look similar to this:

```console
NAME                                       HOST            PORTS   STATUS         REFRESHED  AGE  MEM USE  MEM LIM  VERSION  IMAGE ID      CONTAINER ID
rgw.default.default.testbed-node-3.dhmops  testbed-node-3  *:8081  running (39s)    32s ago  39s    90.7M        -  18.2.8   fb822dbe2ee6  d4b9a7c26ecd
rgw.default.default.testbed-node-4.ibjvjy  testbed-node-4  *:8081  running (41s)    32s ago  41s    90.5M        -  18.2.8   fb822dbe2ee6  fcf4d6c837f4
rgw.default.default.testbed-node-5.xcegdm  testbed-node-5  *:8081  running (43s)    32s ago  43s    91.5M        -  18.2.8   fb822dbe2ee6  569fd2afad81
```

Deployed with `--networks`, the `PORTS` column shows each daemon's address, such as
`10.10.0.13:8081`, instead of `*:8081`. It must be the node's `radosgw_address`.

:::note Daemons deployed without `--networks`
They listen on all addresses of the host (`beast port=<port>`), so they also answer on
the host's other networks, such as the management network. Restrict access with a
firewall if that matters. Depending on how ceph-ansible last configured them, the legacy
daemons did the same, or were bound to the public network address.

Once the cluster runs an image with a revision suffix, the daemons can be bound to their
nodes' addresses: add the networks to the RGW service, then replace the daemons one at a
time. cephadm chooses the address only when it creates a daemon; `ceph orch redeploy`
keeps the old binding.

```bash
ceph orch ls rgw --export > /opt/cephclient/data/rgw.yaml
# add to /opt/cephclient/data/rgw.yaml, at the top level, one /32 per RGW node
# (its radosgw_address), then the public network:
# networks:
# - <radosgw_address of node 1>/32
# - <radosgw_address of node 2>/32
# - <public_network>
ceph orch apply -i /data/rgw.yaml
ceph orch daemon rm <one RGW daemon from ceph orch ps --daemon-type rgw>
```

Wait until its replacement runs, then remove the next one.
:::

Check that each new daemon has the deployment's configuration:

```bash
for d in $(ceph orch ps --daemon-type rgw --format json | python3 -c "import json,sys; [print(x['daemon_name']) for x in json.load(sys.stdin)]"); do
    echo "${d}: $(ceph config show client.${d} rgw_enable_apis) | $(ceph config show client.${d} rgw_keystone_url)"
done
```

Each line should show the API list and Keystone URL of the `client.rgw.…` section of
`ceph_conf_overrides` in `environments/ceph/configuration.yml`. Ceph's defaults, an API list starting with
`s3, s3website` and an empty Keystone URL, mean the copy above was skipped or failed:
run it now, then restart the daemons with `ceph orch restart rgw.${RGW_SERVICE_ID}`,
since `rgw_enable_apis` is not applied at runtime.

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
on the OSISM manager node:

:::info

The active MDS moves to a new daemon as soon as the new daemons are up, not when the
legacy ones are stopped. cephadm sets `mds_join_fs` to the file system name for its MDS
daemons, and the monitors replace an active MDS without that affinity by a standby that
has it. The cluster log shows `Dropping low affinity active daemon mds.<host> in favor
of higher affinity standby`, and `ceph -s` reports `FS_DEGRADED` for a few seconds while
CephFS clients reconnect. Plan for this short CephFS interruption at the deployment below.
Stopping the legacy daemons afterwards causes no further failover: by then they are all
standby.

:::

```bash
CEPHFS_NAME=$(ceph fs ls --format json | python3 -c "import json,sys; print(json.load(sys.stdin)[0]['name'])")
MDS_PLACEMENT=$(osism get hosts -l ceph-mds | awk 'NR>3 && /\|/ {print $2}' | paste -sd,)

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
```

Verify that the new MDS daemons are running:

```bash
ceph orch ls --service-type mds
```

The output should look similar to this:

```console
NAME        PORTS  RUNNING  REFRESHED  AGE  PLACEMENT
mds.cephfs             3/3  0s ago     13s  testbed-node-3;testbed-node-4;testbed-node-5
```

Then stop and disable the legacy MDS daemons. Run the following on the OSISM manager node:

```bash
for node in $(osism get hosts -l ceph-mds | awk 'NR>3 && /\|/ {print $2}'); do
    echo "Stopping legacy MDS daemon on ${node}..."
    ssh ${node} "sudo systemctl stop ceph-mds@${node}.service; sudo systemctl disable ceph-mds@${node}.service"
done
```

`ceph -s` keeps reporting the stopped legacy MDS daemons as stray
(`CEPHADM_STRAY_DAEMON`) until the orchestrator updates its view. Run
`ceph orch ps --refresh` and check `ceph -s` again a minute later.

## Step 6: Verify the migration

Verify the full cluster state on the OSISM manager node:

```bash
ceph -s
ceph orch ls
ceph orch ps
```

All daemons should appear in the `ceph orch ps` output with status `running`. In
`ceph orch ls`, the crash, MDS and RGW services show a placement, because the
orchestrator deployed them. The adopted monitor, manager and OSD services still show
`<unmanaged>`, as in Step 5; this is expected. Cluster health should be `HEALTH_OK`.

Verify that all daemons are running the same Ceph version (on the OSISM manager node):

```bash
ceph versions
```

The output should show a single version across all daemon types. If multiple versions
appear for any daemon type, some daemons were not adopted with the correct container image.

```json
{
    "mon": {
        "ceph version 18.2.8 (efac5a54607c13fa50d4822e50242b86e6e446df) reef (stable)": 3
    },
    "mgr": {
        "ceph version 18.2.8 (efac5a54607c13fa50d4822e50242b86e6e446df) reef (stable)": 3
    },
    "osd": {
        "ceph version 18.2.8 (efac5a54607c13fa50d4822e50242b86e6e446df) reef (stable)": 6
    },
    "mds": {
        "ceph version 18.2.8 (efac5a54607c13fa50d4822e50242b86e6e446df) reef (stable)": 3
    },
    "rgw": {
        "ceph version 18.2.8 (efac5a54607c13fa50d4822e50242b86e6e446df) reef (stable)": 3
    },
    "overall": {
        "ceph version 18.2.8 (efac5a54607c13fa50d4822e50242b86e6e446df) reef (stable)": 18
    }
}
```

## Step 7: Clean up ceph-ansible artifacts

Only proceed with this step after completing the verification in
[Step 6](#step-6-verify-the-migration): `ceph -s` shows `HEALTH_OK`, all daemons
appear as `running` in `ceph orch ps`, and `ceph versions` reports a single consistent
version across all daemon types.

1. Remove old systemd unit files that are no longer used. Run on **each Ceph node**.
   Do **not** use a wildcard like `ceph-*.service` as this would also remove the
   cephadm-managed units (e.g. `ceph-<FSID>@.service`). Keep `ceph.target` and
   `ceph.target.wants/`: cephadm writes its own `ceph.target`, and its cluster target
   `ceph-<FSID>.target` is linked from there. Disable the legacy targets first, so that
   no links to deleted files stay behind, then remove only the legacy units:

   ```bash
   for target in ceph-mon ceph-mgr ceph-osd ceph-mds ceph-radosgw; do
       sudo systemctl disable ${target}.target 2>/dev/null
   done
   sudo find /etc/systemd/system -type l -name 'ceph-radosgw@*.service' -delete
   sudo rm -f /etc/systemd/system/ceph-mon@.service \
              /etc/systemd/system/ceph-mgr@.service \
              /etc/systemd/system/ceph-osd@.service \
              /etc/systemd/system/ceph-mds@.service \
              /etc/systemd/system/ceph-radosgw@.service \
              /etc/systemd/system/ceph-crash@.service \
              /etc/systemd/system/ceph-mon.target \
              /etc/systemd/system/ceph-mgr.target \
              /etc/systemd/system/ceph-osd.target \
              /etc/systemd/system/ceph-mds.target \
              /etc/systemd/system/ceph-radosgw.target
   sudo systemctl daemon-reload
   ```

   The `find` removes the links of legacy RGW instances
   (`ceph-radosgw@rgw.<zone>.<host>.rgw0.service`), which the RGW migration stops but
   does not disable, together with links of that name that point to `/dev/null`
   (masked units). Check that no link points to a removed file and that the cluster
   target is still enabled:

   ```bash
   sudo find /etc/systemd/system -xtype l -name 'ceph*'
   systemctl list-unit-files 'ceph*' --state=enabled
   ```

   The first command prints nothing; the second lists `ceph.target` and
   `ceph-<FSID>.target`.

2. Remove the data directories of the legacy MDS and RGW daemons. Adoption moves the
   data of the mon, mgr and OSD daemons, but the MDS and RGW daemons were replaced, and
   their directories stay behind with the legacy keyrings in them. `cephadm ls` keeps
   reporting a legacy MDS daemon for as long as its directory exists. Run this on **each
   Ceph node**, not only the MDS and RGW nodes: the first monitor node holds copies of
   the RGW directories of all RGW nodes.

   ```bash
   sudo sh -c 'rm -rf /var/lib/ceph/mds/ceph-$(hostname) /var/lib/ceph/radosgw/ceph-rgw.*'
   ```

3. Remove the cephx entities of the daemons that were replaced rather than adopted.
   Crash, RGW and MDS daemons are redeployed under new names, so their legacy entities
   outlive the daemons and stay in `ceph auth ls`. On the OSISM manager node, list them
   first:

   ```bash
   ceph auth ls | grep -E '^(mds\.|client\.rgw\.|client\.crash$)'
   ceph orch ps --daemon-type mds
   ceph orch ps --daemon-type rgw
   ```

   Delete only the entities with no matching daemon in `ceph orch ps` -- the legacy
   names (`mds.<host>`, `client.rgw.<zone>.<host>.rgw0`), never the cephadm-generated
   ones. The cephadm crash daemons authenticate as `client.crash.<host>`; the shared
   `client.crash` that ceph-ansible's crash daemons used is left without a user:

   ```bash
   ceph auth del mds.<host>
   ceph auth del client.rgw.<zone>.<host>.rgw0
   ceph auth del client.crash
   ```

   :::warning This matters from Ceph 19.2.6 and 20.2.4 on
   Ceph 19.2.6 and 20.2.4 added health checks for cephx keys of the old key type. The
   upgrade rotates the keys of the monitor, manager, OSD and MDS daemons cephadm manages,
   but not these leftover entities. A cluster migrated on an older release and left
   uncleaned therefore reports **`HEALTH_ERR` after the next Ceph upgrade**:
   `AUTH_INSECURE_SERVICE_KEY_TYPE`, naming MDS daemons that no longer exist. Deleting the
   orphans clears it. The legacy `client.rgw.*` entities and `client.crash` are reported
   with `AUTH_INSECURE_CLIENT_KEY_TYPE` (`HEALTH_WARN`), along with every other client key
   that the upgrade does not rotate.
   :::

4. Remove the configuration sections of the legacy RGW daemons. No daemon reads them
   any more: they hold the options Step 3 imported, which Step 5 copied to
   `client.rgw`, and possibly `rgw_frontends` and `log_file` that ceph-ansible set for
   each legacy daemon. On the OSISM manager node, list them first:

   ```bash
   ceph config dump -f json | python3 -c "import json,re,sys; [print(e['section'], e['name']) for e in json.load(sys.stdin) if re.fullmatch(r'client\.rgw\..+\.rgw[0-9]+', e['section'])]"
   ```

   The match is on the legacy names, `client.rgw.<zone>.<host>.rgw<n>`. The sections of
   the cephadm daemons end in a random suffix, such as
   `client.rgw.default.default.testbed-node-3.vcezwz`, and are not listed. Then remove
   the listed options:

   ```bash
   ceph config dump -f json | python3 -c "import json,re,sys; [print(e['section'], e['name']) for e in json.load(sys.stdin) if re.fullmatch(r'client\.rgw\..+\.rgw[0-9]+', e['section'])]" | while read -r section name; do
       ceph config rm "${section}" "${name}"
   done
   ```

5. The ceph-ansible configuration in the OSISM configuration repository
   (`environments/ceph/`) can be kept as a reference but is no longer active.

:::note

Keep `/etc/ceph/ceph.conf` and the keyrings in `/etc/ceph` on the nodes. They are still
read: `cephadm shell` falls back to `/etc/ceph/ceph.conf` and
`/etc/ceph/ceph.client.admin.keyring`, and `osism apply copy-ceph-keys` collects the
OpenStack keyrings from `/etc/ceph` on the first monitor node. cephadm does not manage
these files on an adopted cluster (`ceph config get mgr
mgr/cephadm/manage_etc_ceph_ceph_conf` returns `false`), so they stay as ceph-ansible
left them and nothing updates them any more.

One of them is stale after item 3: `/etc/ceph/ceph.client.crash.keyring` holds the key
of the deleted `client.crash`. The cephadm crash daemons use their own keyrings under
`/var/lib/ceph/<FSID>/`. Remove it on each Ceph node:

```bash
sudo rm -f /etc/ceph/ceph.client.crash.keyring
```

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

If the pull fails, you may see an error like:

```console
Pulling container image registry.osism.tech/osism/ceph-daemon:reef...
ERROR: failed to pull image: unable to pull image: Error initializing source docker://registry.osism.tech/osism/ceph-daemon:reef: error pinging docker registry registry.osism.tech: Get "https://registry.osism.tech/v2/": dial tcp 185.56.112.10:443: i/o timeout
```

This typically indicates a network connectivity issue. If the node is behind a proxy,
ensure the container runtime is configured to use it (e.g. via `HTTP_PROXY`/`HTTPS_PROXY`
in `/etc/systemd/system/docker.service.d/proxy.conf` or the equivalent for Podman).

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
