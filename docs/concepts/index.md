---
sidebar_label: Concepts
sidebar_position: 20
---

# Concepts

:::info

The Concept Guide is currently under construction. Therefore, there are still
many empty sections that have already been created for the overall structure.
If there are requests for certain sections or if existing sections are not
understandable or need more details, please open an [issue](https://github.com/osism/issues/issues).
Contributions are welcome, and they are greatly appreciated. Open Source Software
and Documentation relies on contributions.

:::

## Highlevel Overview

![OSISM overview](./images/overview.drawio.png)

## Components in a cloud pod

* [Infrastructure as a Service (IaaS) with OpenStack](./components/openstack.md)
* [Software Defined Storage (SDS) with Ceph](./components/ceph.md)
* [Bare Metal as a Service (BMaaS) with Ironic](./components/ironic.md)
* [Software Defined Networking (SDN) with SONiC & OVN](./components/sonic.md)
* [Kubernetes (K8s) with K3S](./components/k3s.md)
* [Kubernetes as a Service (KaaS) with Gardener](./components/gardener.md)
* [Kubernetes as a Service (KaaS) with Cluster API](./components/clusterapi.md)
* [Identity & Access Management with Keycloak](./components/keycloak.md)
* [Privileged Access Management (PAM) to all infrastructure with Teleport](./components/teleport.md)
* [Logging, Monitoring & Telemetry with Prometheus & Grafana](./components/prometheus.md)
* [Realtime insights with Netdata](./components/netdata.md)

## Requirements

## Bill of Materials

* [Control nodes](./bom.md#control-nodes)
* [Compute nodes](./bom.md#compute-nodes)
* [Storage nodes](./bom.md#storage-nodes)
* [Network nodes](./bom.md#network-nodes)
* [Manager nodes](./bom.md#manager-nodes)
* [Switches](./bom.md#switches)
* [Network interface cards](./bom.md#network-interface-cards)
