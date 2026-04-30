---
sidebar_label: OSISM MetalBox
sidebar_position: 6
---

# OSISM MetalBox

The OSISM MetalBox is a hardware-provisioning toolkit built around
[OpenStack Ironic](https://docs.openstack.org/ironic/). It deploys bare-metal hosts
and bundles every component required to install an OSISM environment offline, so a
pod can be brought up without external network access. Operators use the MetalBox to
bootstrap new environments and to manage their lifecycle over time — for example,
when hardware is added, replaced, or upgraded. A built-in OSISM Manager provides the
familiar abstraction for bare-metal deployments through Ironic and acts as the
adapter that reads all required inventory and host information from NetBox.

## Architecture

![OSISM MetalBox](./images/osism-metalbox.drawio.svg)

## Components

### NetBox

[NetBox](https://github.com/netbox-community/netbox) is the source of truth for the
hardware inventory and IP address assignments. Because it also captures the full
network topology — including cabling, interfaces, VLANs, rack and site information,
and arbitrary custom fields — it is the link between bare-metal provisioning and
network provisioning: every host that Ironic deploys, and every switch port that is
configured, is described in NetBox first.

By default, NetBox runs on the MetalBox itself, but it can also be operated
externally; the MetalBox talks to it exclusively through the NetBox API, so its
location is transparent to the rest of the stack.

NetBox is populated from a netbox-configuration repository that the operator
prepares before bootstrapping an environment. The data is applied through the
[netbox-manager](https://github.com/osism/netbox-manager), which renders the
configuration repository into NetBox via the API. See the netbox-manager
[documentation](https://github.com/osism/netbox-manager#readme) for the
configuration-repository layout and the available import workflows.

### OSISM Manager

The MetalBox ships a full [OSISM Manager](./manager.md) — the same image with the
same containers, queues, and Ansible flavors as the Manager used on a regular cloud
pod. What differs is the network attachment and their focus: the MetalBox is
connected to the out-of-band (OOB) management network so that Ironic can mount
images and control the power state of servers, while the regular Manager only
needs SSH access to the data network to deploy hosts with Ansible. In addition
to that, the OSISM Manager on the MetalBox reads from a static built-in
configuration repository, which facilitates the deployment of the OpenStack
services Ironic, Keystone and their infrastructure components to enable bare
metal deployments via OpenStack. So while the OSISM Manager described in
[OSISM Manager](./manager.md) handles the deployment of OpenStack to provide
IaaS for virtualisation (also called overcloud), the OSISM Manager on the
MetalBox deploys only a minimal OpenStack as tool chain for the bare-metal
life-cycle-management below it (also called undercloud). So we use OpenStack in
the undercloud to provide infrastructure (hardware) for the deployment of
OpenStack as overcloud.

To deploy the undercloud the Manager on the MetalBox reads hardware inventory
and intended state (for example, whether a node should be in maintenance) from
NetBox, creates the corresponding nodes in Ironic, and reconciles their state
through the Ironic API.

For the internal architecture of the Manager — job queues, Ansible containers,
and the configuration volume — see the [OSISM Manager](./manager.md) concept.

### Ironic

[Ironic](https://docs.openstack.org/ironic/) runs in standalone mode on the
MetalBox — that is, without the rest of OpenStack. The only OpenStack service
deployed alongside it is Keystone for authentication; the supporting infrastructure
components are MariaDB, Redis, and RabbitMQ.

Servers are provisioned via virtual media: Ironic mounts a small image containing
the [ironic-python-agent](https://docs.openstack.org/ironic-python-agent/) (IPA)
over the OOB interface and boots the node from it. During boot, IPA brings up and
minimally configures the data interfaces of the node, then uses them to talk back
to Ironic on the MetalBox and to pull the target image, which is written to disk
over the data network. PXE is intentionally not used, so no DHCP/TFTP requirements
are imposed on the data network.

Both images — the IPA boot image mounted via virtual media and the target image
written to the node — are built by OSISM on top of the corresponding upstream
projects in the
[openstack-ironic-images](https://github.com/osism/openstack-ironic-images)
repository. The image-build definitions live under `elements/`: the IPA boot
image is built from the
[osism-ipa](https://github.com/osism/openstack-ironic-images/tree/main/elements/osism-ipa)
element, and the deploy image written to the node is built from the
[osism-node](https://github.com/osism/openstack-ironic-images/tree/main/elements/osism-node)
element.

The HTTPd component on the MetalBox serves these images to Ironic and to the nodes
during provisioning; the Docker registry and APT repository become relevant once a
provisioned node starts pulling its OSISM packages and container images.

For OSISM-specific details on the Ironic setup, see the
[Ironic component concept](./components/ironic.md).

### HTTPd

A plain HTTP server hosts the images that Ironic and the nodes need during
provisioning: the IPA boot image, which Ironic assembles when attaching virtual
media over the OOB network, and the target deploy image, which IPA fetches over
the data network and writes to disk. The HTTPd is therefore reachable from both
networks.

The component is the upstream
[httpd Alpine container](https://hub.docker.com/_/httpd) — no OSISM-specific
modifications — mirrored through the MetalBox Docker registry so it is available
in offline environments.

### Docker registry

The MetalBox runs the upstream
[Docker registry container](https://hub.docker.com/_/registry) to serve all
container images required by an OSISM environment in offline scenarios. When the
deployment has external connectivity the registry is only used as a fallback;
when the environment is air-gapped, every container image consumed by the
MetalBox itself and by the provisioned nodes — the OSISM Manager and its Ansible
flavors, all OpenStack services, Ceph, and the supporting infrastructure
components — is pulled from this registry.

The registry is prepopulated with the images needed to bring the MetalBox into
its initial state (most notably the OSISM Manager image). It is then filled and
kept up to date from registry tarballs hosted on the OSISM S3 storage. Two
variants are published — a rolling `2025.1` build and a pinned `stable` build —
and they are produced automatically by Zuul. See
[Container registry tarballs](https://github.com/osism/metalbox/tree/main#container-registry-tarballs)
in the metalbox repository for the available artifacts and the procedure to
import them.

### APT repository

The APT repository serves the same purpose as the Docker registry, just for
`.deb` packages: in offline scenarios it provides every Ubuntu package required
to install the CloudPod, and in environments with external connectivity it acts
as a fallback. All CloudPod nodes use it as their APT source during deployment
and operations.

Like the container registry, the APT repository is populated from a tarball
hosted on the OSISM S3 storage. For the available artifacts and the procedure to
enable, disable, or update the repository, see the
[metalbox documentation](https://github.com/osism/metalbox/tree/main#readme).

### Base services (DHCP, DNS, NTP)

The MetalBox also provides the base network services that any provisioning workflow
relies on: DHCP and DNS are served by [dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html),
and NTP is provided by [Chrony](https://chrony-project.org/). These services can be
attached to the OOB or management network and are intended for environments where
no external DHCP, DNS, or NTP servers are available.

The SONiC ZTP workflow described below depends on these services: switches booting
into ONIE need to receive the correct DHCP options to discover their image and
configuration source on the MetalBox.

## SONiC ZTP

The MetalBox can additionally serve as a Zero Touch Provisioning (ZTP) server for
[SONiC](https://sonicfoundation.dev/) network switches. Leaf and spine switches
that ship with [ONIE](https://opencomputeproject.github.io/onie/) (Open Network
Install Environment) discover the MetalBox on their first boot, fetch a
per-switch image and configuration, install both to local storage, and finally
reboot into a fully configured Network Operating System (NOS) — without any
operator interaction on the switch console.

The diagram below shows the components involved and the order in which they
interact. All ZTP traffic between the MetalBox and the switches runs on the OOB
network; the switches' data ports (Ethernet0..N) are not used during
provisioning.

![SONiC ZTP on the OSISM MetalBox](./images/osism-metalbox-sonic.drawio.svg)

The provisioning sequence is:

1. **Provide network information.** NetBox holds the inventory of switches —
   including each switch's MGMT MAC address, hostname, and the per-port
   configuration that should end up in SONiC (interfaces, port channels, VLANs,
   BGP, addressing). The OSISM Manager reads this from NetBox via the API.

2. **Generate per-switch SONiC and DHCP configuration.** From the NetBox data,
   the Manager renders a SONiC configuration file for every switch
   (`switch01-config`, `switch02-config`, ...) and places it on the HTTP server
   next to the SONiC image (`sonic.bin`) it should be installed with. The
   Manager also renders the per-switch DHCP host entries for dnsmasq, so each
   switch is matched on its MGMT MAC and offered exactly the URLs that point to
   its own image and config.

3. **Send DHCP request.** The switch is powered on and boots into ONIE in
   install mode. ONIE brings up the MGMT NIC and broadcasts a DHCP request on
   the OOB network.

4. **Send location of image and config via DHCP.** On the MetalBox, dnsmasq
   replies with the standard DHCP options (address, gateway, DNS, NTP) plus
   DHCP option 67 (Bootfile-Name), which points ONIE at the per-switch ZTP
   URL on the HTTPd from which the SONiC image and configuration are fetched.
   Because the host entries are matched on the MGMT MAC, every switch
   receives a URL that references its own files.

5. **Install image and config to disk (ZTP).** ONIE downloads `sonic.bin` and
   the matching `switchNN-config` from the HTTPd over the OOB network, installs
   the SONiC NOS to local storage, and stages the configuration so it is picked
   up on the next boot.

6. **Mark installation done.** Once the install step finishes successfully, the
   switch reports back to the MetalBox so that the Manager knows the ZTP step
   has completed for this switch.

7. **Set state to deployed.** The Manager updates the switch's state in NetBox
   to reflect that the switch is now provisioned. The DHCP configuration on
   the MetalBox is not changed — dnsmasq keeps offering the same options to
   the switch. The switch simply does not boot back into ONIE install mode
   after the NOS is installed, so it ignores the ZTP options even though they
   are still delivered. This means that updating the NOS on a switch is as
   simple as regenerating its files on the MetalBox and rebooting the switch
   back into ONIE install mode — it will run through steps 3–8 again and pick up
   the new image.

8. **Reboot.** The switch reboots out of ONIE and into the freshly installed
   SONiC NOS, comes up with the per-switch configuration applied, and starts
   forwarding traffic on its data ports.

## Further reading

For installing, operating, and updating a MetalBox — including the air-gap
procedures and the data-update workflows — see the
[metalbox repository](https://github.com/osism/metalbox).

For populating NetBox from a netbox-configuration repository, see the
[netbox-manager](https://github.com/osism/netbox-manager).

For the components reused from the regular OSISM stack, see the
[OSISM Manager](./manager.md) concept and the
[Ironic component concept](./components/ironic.md).
