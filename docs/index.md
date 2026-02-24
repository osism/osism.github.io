---
sidebar_label: Getting started
sidebar_position: 10
---

# Getting started

OSISM is a comprehensive platform for managing software-defined cloud infrastructure.
It goes beyond being a deployment tool — OSISM provides a unified operations framework
for building, running, and scaling private cloud environments based on open source
components. Organizations using OSISM gain full control over their data and operations,
with the flexibility to tailor the infrastructure to their specific needs.

## What OSISM provides

OSISM integrates and manages the full stack of services needed for a modern private cloud:

* Infrastructure as a Service (IaaS) with OpenStack
* Software Defined Storage (SDS) with Ceph
* Bare Metal as a Service (BMaaS) with Ironic
* Software Defined Networking (SDN) with SONiC & OVN
* Kubernetes (K8s) with K3S
* Kubernetes as a Service (KaaS) with Gardener and Cluster API
* Identity & Access Management with Keycloak
* Privileged Access Management (PAM) with Teleport
* Logging, Monitoring & Telemetry with Prometheus & Grafana

See the [Concepts](./concepts/) section for a deeper look at the architecture and
component choices.

## Quick start

For newcomers, we offer two ways to get started quickly:

* [Cloud in a Box](./cloud-in-a-box/) — A self-contained environment for testing
* [Virtual testbed](./testbed/) — A virtual environment for experimentation

We also offer regular on-site workshops near Stuttgart if there is sufficient demand.
Contact us at [info@osism.tech](mailto:info@osism.tech) to express interest.

## Guides

This documentation is organized into the following guides:

| Guide                                                    | Description                                         |
|----------------------------------------------------------|-----------------------------------------------------|
| [Deploy Guide](./guides/deploy-guide/)                   | Creating, bootstrapping nodes and deploying modules |
| [Upgrade Guide](./guides/upgrade-guide/)                 | Upgrading individual modules                        |
| [Configuration Guide](./guides/configuration-guide/)     | Configuring individual modules                      |
| [Operations Guide](./guides/operations-guide/)           | Day-to-day tasks in a running cluster               |
| [Troubleshooting Guide](./guides/troubleshooting-guide/) | Resolving problems (extends Operations Guide)       |
| [User Guide](./guides/user-guide/)                       | Best practices and information for component users  |

## Prerequisites

Working with OSISM requires familiarity with several technologies. The official
documentation for each is a good starting point.

### Linux

Familiarity with Linux administration is helpful — the
[Linux Documentation Project](https://tldp.org/) and the
[official Linux man pages](https://man7.org/linux/man-pages/) are good references.
You should be comfortable with networking, services, and the command line.

### Ansible

OSISM uses Ansible extensively for automation. The
[Ansible documentation](https://docs.ansible.com/) covers YAML syntax, playbooks,
inventories, and variables.

### Docker

All OSISM services run as containers. The
[Docker documentation](https://docs.docker.com/) is a good resource for learning
container management, log inspection, and debugging.

### Kubernetes

OSISM deploys and manages Kubernetes clusters. The
[Kubernetes documentation](https://kubernetes.io/docs/home/) covers cluster concepts,
resource inspection, and troubleshooting.

## Get involved

* Open an [issue](https://github.com/osism/issues/issues) for questions, suggestions,
  or unclear sections
* Contact us at [info@osism.tech](mailto:info@osism.tech)
* Contributions to documentation and code are welcome and greatly appreciated
