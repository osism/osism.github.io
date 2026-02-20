---
sidebar_label: Getting started
sidebar_position: 10
---

# Getting started

:::info

**About this documentation**

This documentation is constantly being updated and may be incomplete or contain
inaccuracies in some places. We are happy to provide support, as we understand
that the barrier to entry for OSISM can be challenging.

**Quick start options**

For newcomers, we offer two ways to get started quickly:

* [Cloud in a Box](./cloud-in-a-box/) — A self-contained environment for testing
* [Virtual testbed](./testbed/) — A virtual environment for experimentation

We also offer regular on-site workshops near Stuttgart if there is sufficient demand.

**Get involved**

* Open an [issue](https://github.com/osism/issues/issues) for questions, suggestions, or unclear sections
* Contact us at [info@osism.tech](mailto:info@osism.tech)
* Contributions to documentation and code are welcome and greatly appreciated

:::

OSISM is a comprehensive platform for managing software-defined cloud infrastructure.
It goes far beyond being a simple deployment tool for OpenStack.

While OSISM supports the deployment and management of OpenStack as a key component,
its capabilities extend to orchestrating a wide array of services and tools needed
to build and operate a modern private cloud.

Organizations using OSISM gain:

* A powerful toolset for building, managing, and scaling private cloud infrastructures
* Flexibility to tailor the infrastructure to their specific needs
* Full control over their data and operations

## Concepts

The [Concepts](./concepts/) section explains which components and modules make up OSISM, its
architecture, and the use cases it supports.

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

We aim to make each step as accessible as possible — from deployment and upgrades
to day-to-day operations. However, working with OSISM requires pre-existing
knowledge of several technologies. We reference external guides throughout this
documentation where appropriate.

### Linux

We assume familiarity with [Linux at LPIC-2 level](https://www.lpi.org/our-certifications/lpic-2-overview/):

* System administration (networking, services, automation)
* Security and maintenance
* Troubleshooting

### Ansible

We assume understanding of [Ansible](https://docs.ansible.com/) basics:

* YAML syntax
* Reading, modifying, and running playbooks
* Managing inventories
* Using variables and templates

### Docker

We assume intermediate [Docker](https://docs.docker.com/) CLI skills:

* Viewing container logs
* Restarting and managing containers
* Inspecting errors and debugging

### Kubernetes

We assume understanding of [Kubernetes](https://kubernetes.io/docs/home/) concepts:

* Inspecting cluster state and resources
* Troubleshooting pods and services
* Understanding deployments and configurations

:::tip Need help?

If you are unsure about your knowledge level, need support in gaining the required
skills, or would like a guided introduction, contact us at
[info@osism.tech](mailto:info@osism.tech). We are happy to help.

:::
