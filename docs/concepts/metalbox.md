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
pod. What differs is the network attachment: the MetalBox is connected to the
out-of-band (OOB) management network so that Ironic can mount images and control
the power state of servers, while the regular Manager only needs SSH access to the
data network to deploy hosts with Ansible. Running two separate Managers is
therefore primarily an administrative split — certain security standards require
OOB and data network access to be separated — and not a technical limitation.

Both Managers operate on the same configuration repository, so there is a single
source of truth across the deployment. The netbox-configuration repository is
usually included as a git submodule of the CloudPod's configuration repository, so
no inventory or network data is duplicated.

The Manager on the MetalBox is responsible for the bare-metal lifecycle: it reads
hardware inventory and intended state (for example, whether a node should be in
maintenance) from NetBox, creates the corresponding nodes in Ironic, and reconciles
their state through the Ironic API. Depending on the deployment, the same Manager
can also continue on to provision the CloudPod once the bare-metal layer is in
place, or that work can be handed off to a separate Manager running on the pod.

For the internal architecture of the Manager — job queues, Ansible containers, and
the configuration volume — see the [OSISM Manager](./manager.md) concept.

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
provisioning: the IPA boot image, which Ironic references when attaching virtual
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

## Further reading

For installing, operating, and updating a MetalBox — including the air-gap
procedures and the data-update workflows — see the
[metalbox repository](https://github.com/osism/metalbox).

For populating NetBox from a netbox-configuration repository, see the
[netbox-manager](https://github.com/osism/netbox-manager).

For the components reused from the regular OSISM stack, see the
[OSISM Manager](./manager.md) concept and the
[Ironic component concept](./components/ironic.md).
