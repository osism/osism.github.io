---
sidebar_label: Concept Guide
sidebar_position: 10
---

# Concept Guide

## Highlevel Overview

![OSISM overview](./images/overview.drawio.png)

## Components in a cluster

* [Infrastructure as a Service (IaaS) with OpenStack](./components/openstack)
* [Software Defined Storage (SDS) with Ceph](./components/ceph)
* [Bare Metal as a Service (BMaaS) with Ironic](./components/ironic)
* [Software Defined Networking (SDN) with SONiC & OVN](./components/sonic)
* [Kubernetes (K8s) with K3S](./components/k3s)
* [Kubernetes as a Service (KaaS) with Gardener](./components/gardener)
* [Kubernetes as a Service (KaaS) with Cluster API](./components/clusterapi)
* [Identity & Access Management with Keycloak](./components/keycloak)
* [Privileged Access Management (PAM) to all infrastructure with Teleport](./components/teleport)
* [Logging, Monitoring & Telemetry with Prometheus & Grafana](./components/prometheus)
* [Realtime insights with Netdata](./components/netdata)
* [Simple virtualization & containerization with Proxmox VE](./components/proxmox)

## Requirements

## Layers in a cluster

* [Compute Plane](./layers#compute-plane)
* [Control Plane](./layers#control-plane)
* [Data Plane](./layers#data-plane)
* [Management Plane](./layers#management-plane)
* [Monitoring Plane](./layers#monitoring-plane)
* [Network Plane](./layers#network-plane)

## Cluster design

* [Compute architecture](./design#compute-architecture)
* [Storage architecture](./design#storage-architecture)
* [Network architecture](./design#network-architecture)
* [Identity architecture](./design#identity-architecture)
* [Control plane architecture](./design#control-plane-architecture)

## Use cases

* [Hyper-converged infrastructure (HCI)](./use-cases#hyper-converged-infrastructure-hci)

## Hardware Bill of Materials

* [Control nodes](./hardware-bom#control-nodes)
* [Compute nodes](./hardware-bom#compute-nodes)
* [Storage nodes](./hardware-bom#storage-nodes)
* [Network nodes](./hardware-bom#network-nodes)
* [Manager nodes](./hardware-bom#manager-nodes)
* [Switches](./hardware-bom#switches)
* [Network interface cards](./hardware-bom#network-interface-cards)
