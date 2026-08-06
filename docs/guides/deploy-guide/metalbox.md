---
sidebar_label: MetalBox
sidebar_position: 5
---

# Installation of the MetalBox

:::info

For the architecture of the MetalBox and the purpose of its individual components —
NetBox, the OSISM Manager, Ironic, the HTTPd, the container registry, the APT
repository, and the base services — see the
[OSISM MetalBox](../../concepts/metalbox.md) concept.

:::

There are two ways to install a MetalBox:

* **MetalBox image** — a preconfigured machine image is written to the first disk of a
  physical server. After the initial downloads have been made, the complete
  installation can be carried out in an air-gapped environment without any access to
  external sources. This is the recommended way.
* **Existing server or VM** — the MetalBox services are deployed on an existing
  Ubuntu 24.04 machine, which can be either a physical server or a virtual machine.
  This installation requires external connectivity, as packages, container images, and
  the configuration repository are fetched from the Internet.

## Prerequisites

* A **NetBox configuration repository** that describes the site: the MetalBox itself,
  the bare-metal nodes, the switches, and the addressing. The data is applied to
  NetBox with the [netbox-manager](https://github.com/osism/netbox-manager). The
  MetalBox reads everything it needs to know about the environment from NetBox.
* Enough **local storage** for the container registry, the Ubuntu repository, and the
  Ironic images if the environment is air-gapped.

All scripts referenced on this page come from the
[metalbox repository](https://github.com/osism/metalbox), which is checked out to
`/opt/configuration` on the MetalBox — already contained in the machine image in
[Option 1](#option-1-metalbox-image), cloned manually in
[Option 2](#option-2-existing-server). They are therefore located in
`/opt/configuration/scripts` and are available on the `PATH` of the `dragon` user, so
they can be called by their plain name.

## Release variants {#release-variants}

For the [container registry](../../concepts/metalbox.md#docker-registry) — the mirror
that serves all container images to the MetalBox and to the nodes of the CloudPod —
two variants are available:

* **2025.1** — a rolling build of the current `2025.1` release. The images are rebuilt
  and republished regularly, so the tags inside `registry-2025.1-full.tar.bz2` move
  forward over time.
* **stable** — always points to the current stable OSISM release. The `stable` name
  itself does not change as new releases are published; which release it currently
  resolves to is listed in the [Release Notes](../../release-notes/index.md). The
  image versions inside `registry-stable-full.tar.bz2` are pinned per release and only
  change when a new stable OSISM release is published. Use this variant for
  reproducible deployments that should not track the rolling `2025.1` build.

The following sections default to the `2025.1` artifacts. Replace the file name with
the `stable` counterpart (e.g. `registry-stable-full.tar.bz2` instead of
`registry-2025.1-full.tar.bz2`) to deploy the pinned variant.

:::note

Only the full container registry is provided as a `stable` variant. The non-full
registry is published as a single version-independent `registry.tar.bz2`. The Octavia
image (`octavia-export-2025.1.img`) is only published for `2025.1`.

:::

### Container registry tarballs {#container-registry-tarballs}

Four tarballs are published, all built from
[`zuul/mirror-container-images.yml`](https://github.com/osism/metalbox/blob/main/zuul/mirror-container-images.yml)
using the image lists under
[`zuul/vars/`](https://github.com/osism/metalbox/tree/main/zuul/vars).

| Tarball                        | Contents                                                                                                                                                                                                                                                                                                                                                                                                               |
|:-------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `registry.tar.bz2`             | Version-independent base tarball for the MetalBox itself. Built from [`container-images-metalbox.yml`](https://github.com/osism/metalbox/blob/main/zuul/vars/container-images-metalbox.yml) only.                                                                                                                                                                                                                      |
| `registry-2024.2-full.tar.bz2` | Contents of `registry.tar.bz2` plus the OpenStack image set from [`container-images-openstack-2024.2.yml`](https://github.com/osism/metalbox/blob/main/zuul/vars/container-images-openstack-2024.2.yml).                                                                                                                                                                                                               |
| `registry-2025.1-full.tar.bz2` | Contents of `registry.tar.bz2` plus the OpenStack image set from [`container-images-openstack-2025.1.yml`](https://github.com/osism/metalbox/blob/main/zuul/vars/container-images-openstack-2025.1.yml).                                                                                                                                                                                                               |
| `registry-stable-full.tar.bz2` | Contents of `registry.tar.bz2` plus the OpenStack image set from [`container-images-openstack-stable.yml`](https://github.com/osism/metalbox/blob/main/zuul/vars/container-images-openstack-stable.yml) and the Manager image set from [`container-images-manager-stable.yml`](https://github.com/osism/metalbox/blob/main/zuul/vars/container-images-manager-stable.yml), pinned to the current OSISM stable release. |

## Option 1: Installation from the MetalBox image {#option-1-metalbox-image}

This option requires a **physical server** with a BMC that supports mounting virtual
media (vHDD and vDVD), connected to the out-of-band (OOB) management network of the
pod.

### Preparation

1. Download the MetalBox image
   [osism-metalbox-image.zip](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-metalbox-image.zip).
   Unzip the `osism-metalbox-image.zip` file. The unzipped file is named
   `osism-metalbox-image.raw`.
2. Download the latest small [Grml](https://grml.org/download/) live ISO file. When
   creating this document, the file name was `grml-small-2025.05-amd64.iso`.
3. If SONiC is to be used: Download the SONiC image for the switches from the vendor
   that provides it. Place the `.bin` files in a directory and run `sonic-export.sh`
   in that directory to pack them into the `sonic-export.img` file that is imported on
   the MetalBox. By default the script picks up files matching
   `sonic-broadcom-enterprise-base*.bin`; set `SONIC_PATTERN` for other file names.
4. Export the NetBox configuration repository with
   `netbox-manager export-archive -i`. When using a NetBox configuration repository
   provided by OSISM, the file `netbox-export.img` can be downloaded from GitHub after
   a trigger of the `Run export` action.
5. Download the Ironic images:
   * [osism-ipa.initramfs](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-ipa.initramfs)
   * [osism-ipa.kernel](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-ipa.kernel)
   * [osism-node.qcow2](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-node.qcow2)
   * [osism-node.qcow2.CHECKSUM](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-node.qcow2.CHECKSUM)
   * [osism-esp.raw](https://nbg1.your-objectstorage.com/osism/openstack-ironic-images/osism-esp.raw)

:::tip

Downloads from the Hetzner Object Storage can occasionally be interrupted. Use
`aria2c` for resumable, multi-connection downloads as described in the
[Troubleshooting Guide](../troubleshooting-guide/metalbox.md#resumable-downloads-with-aria2c).

:::

#### Additional downloads for air-gapped environments

1. If the MetalBox is to be used as an Ubuntu repository server for nodes inside the
   CloudPod, download
   [ubuntu-noble.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/ubuntu-noble.tar.bz2).
2. If the MetalBox is to be used as a container registry for nodes inside the
   CloudPod, download
   [registry-2025.1-full.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/registry-2025.1-full.tar.bz2)
   or, for the pinned variant,
   [registry-stable-full.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/registry-stable-full.tar.bz2).
3. If the MetalBox is to be used as a file server for nodes inside the CloudPod,
   download
   [octavia-export-2025.1.img](https://nbg1.your-objectstorage.com/osism/metalbox/octavia-export-2025.1.img).

### Writing the image to disk

All steps in this section are carried out through the BMC of the server over the
out-of-band (OOB) management network: the files are attached as virtual media, the
Grml live system is operated from the remote console, and the node is power-cycled
through the BMC as well.

1. Use the `osism-metalbox-image.raw` file as virtual media (vHDD).
2. Use the `grml-small-2025.05-amd64.iso` file as virtual media (vDVD) and boot it.
3. Write the MetalBox image to the first disk. Note that the exact names of the disks
   may vary depending on the server type, use `lsblk` to verify.

   ```bash
   dd if=/dev/sdc of=/dev/sda bs=4M status=progress
   ```

   Afterwards power off the node, remove all virtual media devices and power on the
   node again.

Log in on the remote console as the operator user `dragon` with the default password
`password`. At this point the network of the MetalBox is not configured yet — that
happens later with `osism apply network` — so the remote console is the only way in.

:::warning

Both the default password and the shipped SSH key are public. They are built into the
MetalBox image through the `operator_password` and `operator_authorized_keys`
variables in
[`elements/metalbox/static/root/part1.yml`](https://github.com/osism/openstack-ironic-images/blob/main/elements/metalbox/static/root/part1.yml)
of the openstack-ironic-images repository. Change the password of the `dragon` user
and replace the SSH key before the MetalBox is reachable from anywhere untrusted.

:::

:::note

The initial boot can take some time as the local container registry is created on
first boot. The boot is finished once the `registry` container is up and running.
Verify with `docker ps`:

```console
dragon@metalbox:~$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                    NAMES
2ff7d1d57b06   registry:3   "/entrypoint.sh /etc…"   44 seconds ago   Up 43 seconds   0.0.0.0:5001->5000/tcp   registry
```

:::

### Deployment of the services

Continue as the `dragon` user on the MetalBox (default credentials `dragon` /
`password`).

1. Import the NetBox files.
   * Use the `netbox-export.img` file as virtual media (vHDD) and run
     `netbox-import.sh` to import the NetBox files. Afterwards remove the virtual
     media (vHDD).
   * **or** Make the `netbox-export.img` file available in `/home/dragon` — the
     network is not configured at this point, so it has to come from local media such
     as a USB stick or another disk that is not touched during the deployment — and
     run `mount-images.sh`. Run `netbox-import.sh` to import the NetBox files.
     Afterwards run `unmount-images.sh`.
2. Run `deploy-netbox.sh` to deploy the NetBox service.
3. Run `netbox-manage.sh` to initialise the NetBox service. Note that this can take a
   couple of minutes to complete depending on the size of the installation.
4. Run `get-netbox-config.sh NODE` to get the specific configuration for this MetalBox
   from NetBox. Replace `NODE` with the name of the MetalBox device in NetBox. This
   also sets the site that the MetalBox manages, taken from the site the device is
   assigned to.
5. Run `deploy-manager.sh` to deploy the OSISM Manager service.
6. Run `osism sync inventory` to sync the inventory.
7. Run `osism apply hosts` to sync the `/etc/hosts` file.
8. Run `osism apply network` to sync the network configuration.
9. Run `osism apply frr` to sync the FRR configuration.
10. Run `osism apply facts` to sync the facts.
11. Run `osism apply chrony` to sync the NTP configuration.
12. Decide whether the MetalBox is used as an Ubuntu repository server.
    * If the MetalBox is to be used as an Ubuntu repository server for nodes inside
      the CloudPod, do all steps in
      [Using the MetalBox as an Ubuntu repository server](#ubuntu-repository-server).
    * **or** Disable the use of the MetalBox as a repository server by running
      `disable-repository.sh`.
13. Decide whether the MetalBox is used as a SONiC ZTP server.
    * If the MetalBox is to be used as a SONiC ZTP server, import the SONiC files:
      * Use the file `sonic-export.img` as virtual media (vHDD) and run
        `deploy-sonic.sh` to deploy the SONiC ZTP services. Afterwards remove the
        virtual media (vHDD).
      * **or** Copy the `sonic-export.img` file to `/home/dragon` and run
        `mount-images.sh`. Run `deploy-sonic.sh` to deploy the SONiC ZTP services.
        Afterwards run `unmount-images.sh`.
    * **or** Disable the use of SONiC by running `disable-sonic.sh`.
14. Run `deploy-infrastructure.sh` to deploy the infrastructure services.
15. Run `deploy-openstack.sh` to deploy the OpenStack services.
16. Upload the Ironic image files downloaded in [Preparation](#preparation) to
    `/opt/httpd/data/root`.
17. Run `osism sync ironic` to sync the bare-metal nodes.
18. Additional steps for air-gapped environments:
    * If the MetalBox is to be used as a container registry for nodes inside the
      CloudPod, do all steps in
      [Using the MetalBox as a full container registry](#full-container-registry).
    * If the MetalBox is to be used as a file server for nodes inside the CloudPod, do
      all steps in [Using the MetalBox as a file server](#file-server).

## Option 2: Installation on an existing server or VM {#option-2-existing-server}

This option deploys the MetalBox services on an existing machine instead of using the
preconfigured MetalBox image. The machine can be a physical server or a virtual
machine.

### Prerequisites

The server needs to be running Ubuntu 24.04 LTS. We recommend having at least 8
vCPUs, 32 GB RAM and 100 GB SSD disk.

### Basic preparation

Execute these commands as any user on the server that has `sudo` access.

```bash
cd
sudo apt update
sudo apt full-upgrade -y
sudo apt install -y git pipx python3-venv sshpass
git clone https://github.com/osism/metalbox/
sudo mv metalbox /opt/configuration
cd /opt/configuration/environments/manager/
echo "ansible_connection: local" >> host_vars/metalbox/vars.yml
./run.sh operator
sudo chown -R dragon:dragon /opt/configuration
```

:::warning

The `./run.sh operator` playbook invocation creates the `dragon` user and installs a
public SSH key for it — the same key the MetalBox image ships. It comes from the
`operator_authorized_keys` variable in
[`environments/configuration.yml`](https://github.com/osism/metalbox/blob/main/environments/configuration.yml)
of the metalbox repository. Replace the key with a locally generated one before the
machine is reachable from anywhere untrusted. No password is set for the `dragon` user
in this variant; the account is created with a locked password.

:::

### Log in again as dragon

The previous steps created the `dragon` user account which will be used to run the
MetalBox services. Switch to it in one of two ways:

* Run `sudo -iu dragon` from the account used so far.
* Log in over SSH with the private key that matches the installed public key. It is
  published as `operator_private_key` in
  [`elements/metalbox/static/root/part1.yml`](https://github.com/osism/openstack-ironic-images/blob/main/elements/metalbox/static/root/part1.yml)
  of the openstack-ironic-images repository.

### Prepare the MetalBox installation

Prepare the environment:

```bash
cd
git clone https://github.com/osism/openstack-ironic-images
cd /opt/configuration/environments/manager/
# Install ansible roles
./run.sh noop
# Run the metalbox preparation playbook
venv/bin/ansible-playbook ~/openstack-ironic-images/elements/metalbox/static/root/part1.yml
# Install some more python libs and another ansible collection
pipx install netbox-manager
pipx install 'ansible-core>=2.19.0,<2.20.0'
/home/dragon/.local/bin/ansible-galaxy collection install netbox.netbox
```

The MetalBox installation runs a set of Docker containers from a local registry. Fill
the registry volume with the container images and start the registry:

```bash
cd
wget -O registry.tar.bz2 https://nbg1.your-objectstorage.com/osism/metalbox/registry.tar.bz2
docker run --rm -v registry:/volume -v /home/dragon:/import library/alpine:3 sh -c 'cd /volume && tar xjf /import/registry.tar.bz2'
docker run -d -p 0.0.0.0:5001:5000 -v registry:/var/lib/registry --name registry --restart always library/registry:3
```

Add the internal address of the MetalBox. The configuration is pinned to the fixed
address `192.168.42.10` on a dummy interface named `metalbox`, and several components
expect to find it there:

* it is the `kolla_internal_vip_address` under which Keystone and Ironic are reached,
* it is the endpoint of the NetBox API (`http://192.168.42.10:8121`), which
  `get-netbox-config.sh` and the Manager query,
* it is the `ansible_host` of the MetalBox in its own inventory, so the Manager
  reaches the node it runs on through it,
* and it is what the `metalbox.osism.xyz` and `api.metalbox.osism.xyz` host entries
  resolve to.

```bash
sudo ip link add metalbox type dummy
sudo ip addr add 192.168.42.10/32 dev metalbox
sudo ip link set up metalbox
```

On the MetalBox image this interface is created by `osism apply network` from the
`network_dummy_devices` variable. On an existing server it is set up by hand as shown
above, and because a dummy interface does not survive a reboot, it should also be
added to the permanent network configuration, for example in a file in
`/etc/netplan`.

### Fill the NetBox directory

In the directory containing the NetBox data — this can be either a dedicated Git
repository or the `netbox` subdirectory of the CloudPod repository — run:

```bash
netbox-manager export-archive
netbox-manager import-archive
```

This copies the relevant data into `/opt/configuration/netbox/`.

Deploy NetBox and fill it with data. Each of the following commands can take a couple
of minutes to complete.

```bash
deploy-netbox.sh
netbox-manage.sh
```

Run `get-netbox-config.sh NODE` to get the specific configuration for this MetalBox
from NetBox. Replace `NODE` with the name of the MetalBox device in NetBox. This also
sets the site that the MetalBox manages, taken from the site the device is assigned
to.

### Finish the MetalBox installation

Deploy the Manager and import the inventory from NetBox:

```bash
deploy-manager.sh
osism sync inventory
```

Ironic and the services it depends on are not deployed yet. Continue with the
remaining steps of [Option 1](#deployment-of-the-services):

1. Run `osism apply hosts` to sync the `/etc/hosts` file. The OpenStack services are
   reached under `api.metalbox.osism.xyz` and `metalbox.osism.xyz`, which resolve
   through these entries.
2. Run `osism apply facts` to sync the facts.
3. Run `osism apply chrony` to sync the NTP configuration.
4. Decide whether the MetalBox is used as an Ubuntu repository server and as a SONiC
   ZTP server, as in steps 12 and 13 of Option 1.
5. Run `deploy-infrastructure.sh` to deploy the infrastructure services.
6. Run `deploy-openstack.sh` to deploy the OpenStack services.
7. Upload the Ironic image files listed in [Preparation](#preparation) to
   `/opt/httpd/data/root`.
8. Run `osism sync ironic` to sync the bare-metal nodes.

`osism apply network` and `osism apply frr` are not part of this variant. The network
of an existing server is managed outside the MetalBox, which is why the dummy
interface above is created by hand.

Further tasks can then be performed on the MetalBox as documented in the rest of the
documentation, e.g. managing Ironic nodes or SONiC switches.

## Additional steps for air-gapped environments

### Using the MetalBox as an Ubuntu repository server {#ubuntu-repository-server}

1. Download the Ubuntu repository archive
   [ubuntu-noble.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/ubuntu-noble.tar.bz2).
2. Copy `ubuntu-noble.tar.bz2` to `/home/dragon` on the MetalBox node.
3. Run `SKIP_DOWNLOAD=true update-repository.sh` to import the Ubuntu repository
   files. Note that this can take a couple of minutes to finish.

### Using the MetalBox as a full container registry {#full-container-registry}

1. Download
   [registry-2025.1-full.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/registry-2025.1-full.tar.bz2)
   or, to use the pinned variant,
   [registry-stable-full.tar.bz2](https://nbg1.your-objectstorage.com/osism/metalbox/registry-stable-full.tar.bz2).
2. Copy the file to `/home/dragon` on the MetalBox node.
3. Import it with `REGISTRY_FILE` set to its name — it defaults to `registry.tar.bz2`,
   so it has to be set for any other name. Note that this can take a couple of minutes
   to finish.

   ```bash
   SKIP_DOWNLOAD=true REGISTRY_FILE=registry-2025.1-full.tar.bz2 update-registry.sh
   ```

### Using the MetalBox as a file server {#file-server}

1. Download the Octavia image export
   [octavia-export-2025.1.img](https://nbg1.your-objectstorage.com/osism/metalbox/octavia-export-2025.1.img).
2. Copy `octavia-export-2025.1.img` to `/home/dragon` on the MetalBox node.
3. Run `mount-images.sh` to mount the `octavia-export-2025.1.img` image.
4. Run `octavia-import.sh` to import the Octavia image files.
5. Run `unmount-images.sh` to unmount the `octavia-export-2025.1.img` image.

## Appendix

### Writing the MetalBox image directly to disk without unpacking

To avoid the intermediate `osism-metalbox-image.raw` file, `funzip` can stream the
contents of `osism-metalbox-image.zip` straight to the target disk. Export the target
device as an environment variable first so the command does not accidentally reference
the wrong disk. Verify the target with `lsblk` before running the command — the write
is destructive.

```bash
DEVICE=/dev/sda
funzip osism-metalbox-image.zip | dd of=$DEVICE bs=4M status=progress
```

## Next steps

* [Data updates on the MetalBox](../upgrade-guide/metalbox/data-updates.md) —
  update the NetBox data, the Ironic images, the container registry, and the Ubuntu
  repository files.
* [Service updates on the MetalBox](../upgrade-guide/metalbox/service-updates.md) —
  update the Manager, NetBox, the infrastructure services, and the OpenStack services.
* [Software RAID](../configuration-guide/metalbox/software-raid.md) — configure a
  software RAID for the bare-metal nodes that are provisioned by the MetalBox.
