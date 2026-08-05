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

All scripts referenced on this page are part of the MetalBox configuration repository.
They are located in `/opt/configuration/scripts` and are available on the `PATH` of
the `dragon` user, so they can be called by their plain name.

## Release variants {#release-variants}

For the container registry two variants are available:

* **2025.1** — a rolling build of the current `2025.1` release. The images are rebuilt
  and republished regularly, so the tags inside `registry-2025.1-full.tar.bz2` move
  forward over time.
* **stable** — always points to the current stable OSISM release (currently OSISM
  `10.0.0` on kolla `2025.1`; future releases such as `10.1.0` will be published under
  the same `stable` name). The image versions inside `registry-stable-full.tar.bz2`
  are pinned per release and only change when a new stable OSISM release is published.
  Use this variant for reproducible deployments that should not track the rolling
  `2025.1` build.

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
3. If SONiC is to be used: Download the SONiC export image `sonic-export.img` from the
   well known URL. This file can also be created locally by running `sonic-export.sh`
   inside a directory containing the SONiC images.
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

1. Use the `osism-metalbox-image.raw` file as virtual media (vHDD).
2. Use the `grml-small-2025.05-amd64.iso` file as virtual media (vDVD) and boot it.
3. Write the MetalBox image to the first disk. Note that the exact names of the disks
   may vary depending on the server type, use `lsblk` to verify.

   ```bash
   dd if=/dev/sdc of=/dev/sda bs=4M status=progress
   ```

   Afterwards power off the node, remove all virtual media devices and power on the
   node again.

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

Continue as the `dragon` user on the MetalBox.

1. Import the NetBox files.
   * Use the `netbox-export.img` file as virtual media (vHDD) and run
     `netbox-import.sh` to import the NetBox files. Afterwards remove the virtual
     media (vHDD).
   * **or** Copy the `netbox-export.img` file to `/home/dragon` and run
     `mount-images.sh`. Run `netbox-import.sh` to import the NetBox files. Afterwards
     run `unmount-images.sh`.
2. Run `deploy-netbox.sh` to deploy the NetBox service.
3. Run `netbox-manage.sh` to initialise the NetBox service. Note that this can take a
   couple of minutes to complete depending on the size of the installation.
4. Run `get-netbox-config.sh NODE` to get the specific configuration for this MetalBox
   from NetBox. Replace `NODE` with the name of the MetalBox device in NetBox.
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
16. Upload the Ironic image files to `/opt/httpd/data/root`.
17. Run `osism sync ironic` to sync the bare-metal nodes.
18. Additional steps for air-gapped environments:
    * If the MetalBox is to be used as a container registry for nodes inside the
      CloudPod, do all steps in
      [Using the MetalBox as a full container registry](#full-container-registry).
    * If the MetalBox is to be used as a file server for nodes inside the CloudPod, do
      all steps in [Using the MetalBox as a file server](#file-server).

### Automated deployment with run-all.sh

Instead of running the deployment steps individually, `run-all.sh` runs the sequence
unattended. It takes the name of the managed site in NetBox as its argument, which it
writes into the Manager configuration with `netbox-site.sh`:

```bash
run-all.sh SITE
```

The SONiC deployment steps can be skipped by setting `ENABLE_SONIC=false`. By
default, SONiC is enabled.

```bash
ENABLE_SONIC=false run-all.sh SITE
```

:::note

`run-all.sh` does not cover the full sequence above. `osism apply frr`, `osism apply
chrony`, the decision about the Ubuntu repository server, and the upload of the Ironic
image files to `/opt/httpd/data/root` are not part of it and still have to be carried
out where they apply.

:::

## Option 2: Installation on an existing server or VM {#option-2-existing-server}

This option deploys the MetalBox services on an existing machine instead of using the
preconfigured MetalBox image. The machine can be a physical server or a virtual
machine.

### Prerequisites

The server needs to be running Ubuntu 24.04 LTS. We recommend having at least 8
vCPUs, 32 GB RAM and 100 GB SSD disk.

### Basic preparation

Execute these commands as a user on the server that has `sudo` access at least via a
password. In the command example below this user is named `osism`, amend the commands
accordingly if a different username is used.

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

The `./run.sh operator` playbook invocation creates the `dragon` user and allows SSH
login for it with a well-known SSH key that is contained in the metalbox repository.
If the machine is reachable from the Internet via SSH, replace that key with a
locally-generated secure SSH key.

:::

### Log in again as dragon

The previous steps created the `dragon` user account which will be used to run the
MetalBox services. Log in as that user either directly or by executing
`sudo -iu dragon` from the existing account.

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

Add a well-known IP address in order for some API operations to work. Depending on how
the network is configured, it may make sense to add this configuration to the
permanent configuration, e.g. by adding it to a file in `/etc/netplan`.

```bash
sudo ip link add metalbox type dummy
sudo ip addr add 192.168.42.10/32 dev metalbox
sudo ip link set up metalbox
```

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
from NetBox. Replace `NODE` with the name of the MetalBox device in NetBox.

### Finish the MetalBox installation

Deploy the Manager and import the inventory from NetBox:

```bash
deploy-manager.sh
osism sync inventory
```

:::note

`deploy-manager.sh` refuses to run as long as the default site name `Discworld` is
still configured in `/opt/configuration/environments/manager/configuration.yml`. Set
the actual site name with `netbox-site.sh <your_site_name>` first.

:::

To deploy Ironic and the services it depends on, continue with the infrastructure and
OpenStack services as in
[Option 1, steps 12 to 17](#deployment-of-the-services): decide about the Ubuntu
repository server and the SONiC ZTP server, then run `deploy-infrastructure.sh` and
`deploy-openstack.sh`, upload the Ironic image files to `/opt/httpd/data/root`, and run
`osism sync ironic`.

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
2. Rename the downloaded file to `registry.tar.bz2`.
3. Copy `registry.tar.bz2` to `/home/dragon` on the MetalBox node.
4. Run `SKIP_DOWNLOAD=true update-registry.sh` to update the container registry. Note
   that this can take a couple of minutes to finish.

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
