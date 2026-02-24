---
sidebar_label: Concepts
sidebar_position: 20
---

# Concepts

This section explains OSISM's architecture, the components that make up a cloud pod,
and the design principles that guide technology choices.

## Architecture overview

![OSISM overview](./images/overview.drawio.svg)

The diagram above shows a high-level view of an OSISM-managed cloud pod. It illustrates
how physical compute, storage, and network resources are abstracted into software-defined
layers — OpenStack for compute, Ceph for storage, and SONiC with OVN/OVS for networking
— with Kubernetes as a Service built on top.

## The OSISM Manager

The OSISM Manager is the central control point of every OSISM deployment. It is the
operator's single point of entry for deploying, configuring, and operating all services
in a cloud pod. All Ansible-based automation — for OpenStack, Ceph, infrastructure,
and Kubernetes — runs through the manager's job queue system.

See the [OSISM Manager](./manager.md) page for a detailed breakdown of the manager's
components.

## Components in a cloud pod

* [Infrastructure as a Service (IaaS) with OpenStack](./components/openstack.md)
* [Software Defined Storage (SDS) with Ceph](./components/ceph.md)
* [Bare Metal as a Service (BMaaS) with Ironic](./components/ironic.md)
* Software Defined Networking (SDN) with [SONiC](https://sonicfoundation.dev/) & [OVN](https://www.ovn.org/)
* [Kubernetes (K8s) with K3S](./components/k3s.md)
* [Kubernetes as a Service (KaaS) with Gardener](./components/gardener.md)
* [Kubernetes as a Service (KaaS) with Cluster API](./components/clusterapi.md)
* [Identity & Access Management with Keycloak](./components/keycloak.md)
* [Privileged Access Management (PAM) with Teleport](https://goteleport.com/)
* Logging, Monitoring & Telemetry with [Prometheus](https://prometheus.io/) & [Grafana](https://grafana.com/)
* [Realtime insights with Netdata](./components/netdata.md)

## Technology Adaptability

OSISM integrates proven open source projects into a cohesive cloud platform. As
technology evolves, OSISM adapts by evaluating and adopting new approaches while
providing controlled migration paths. Read more in the
[Technology Adaptability](./technology-adaptability.md) chapter.

## Bill of Materials

* [Control nodes](./bom.md#control-nodes)
* [Compute nodes](./bom.md#compute-nodes)
* [Storage nodes](./bom.md#storage-nodes)
* [Network nodes](./bom.md#network-nodes)
* [Manager nodes](./bom.md#manager-nodes)
* [Switches](./bom.md#switches)
* [Network interface cards](./bom.md#network-interface-cards)
