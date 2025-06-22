---
sidebar_label: Getting started
sidebar_position: 10
---

# Getting started

OSISM is a comprehensive platform for managing software-defined cloud infrastructure that goes far beyond being a simple deployment tool for OpenStack. While OSISM does support the deployment and management of OpenStack as a key component, its capabilities extend to orchestrating a wide array of services and tools needed to build and operate a modern private cloud. By leveraging OSISM, organizations gain a powerful toolset for building, managing, and scaling private cloud infrastructures tailored to their specific needs, while also maintaining full control over their data and operations.

## Guides

This documentation is organised into guides:

* The [Concept Guide](./guides/concept-guide/) explains which components and modules make up OSISM. It also
  explains the use cases.
* The [Deploy Guide](./guides/deploy-guide/) explains how the nodes of a cluster are created and bootstrapped.
  It also explains how the individual modules can be deployed.
* The [Upgrade Guide](./guides/upgrade-guide/) explains how the individual modules can be upgraded.
* The [Configuration Guide](./guides/configuration-guide/) explains how the individual modules can be
  configured.
* The [Operations Guide](./guides/operations-guide/) explains how individual tasks can be done in
  day-to-day business in a running cluster.
* The [Troubleshooting Guide](./guides/troubleshooting-guide/) explains how to resolve problems.
  It is an extension of the Operations Guide.
* The [User Guide](./guides/user-guide/) is intended for users of the individual components. It contains
  best practices, as well as other information.

## Prerequisites

We aim to make each step as accessible as possible - from deployment, upgrade, to day2 operations and more. However, pre-existing knowledge is still required to work with our technology stack, which we do not cover in our documentation. Throughout our documentation we provide and refer to existing guides from e.g. Ansible and Docker.

### Linux
We assume the reader is familiar with [Linux (LPIC2 level)](https://www.lpi.org/our-certifications/lpic-2-overview/). This includes advanced system administration like networking, system services and automation, troubleshooting and security, and maintenance.

### Ansible
We assume the reader has understood the basic concepts of [Ansible](https://docs.ansible.com/). This includes understanding the YAML-syntax, reading, modifying and running playbooks, managing inventories, and using variables and templates.

### Docker
We assume that the reader has intermediate CLI skills of [Docker](https://docs.docker.com/), and knows how to view logs, restart containers, and inspect errors.

### Kubernetes
We assume that the reader has understood the concepts of [Kubernetes](https://kubernetes.io/docs/home/). Including inspecting clusters, and troubleshooting pods/services.

:::note

If you are not sure whether you already have the required knowledge, need support in
gaining the knowledge or would like a guided introduction, you are welcome to contact
us at [info@osism.tech](mailto:info@osism.tech). We are happy to help.

:::