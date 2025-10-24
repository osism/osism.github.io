---
sidebar_label: Getting started
sidebar_position: 10
---

# Getting started

:::info

This documentation is constantly being updated, is incomplete in some places
and may contain inaccuracies. We are always happy to provide support without
any commitment, as we know that the barrier to entry for OSISM is not necessarily
low.

For newcomers, we offer [Cloud in a Box](./cloud-in-a-box/) and a
[virtual testbed](./testbed/) for a quick and easy start. For this purpose,
we also offer regular on-site workshops near Stuttgart if there is sufficient demand.

If there are requests for certain sections or if existing sections are not
understandable or need more details, please open an [issue](https://github.com/osism/issues/issues).
You are also welcome to contact us by email at [info@osism.tech](mailto:info@osism.tech).

Contributions are welcome, and they are greatly appreciated. Open Source Software
and Documentation relies on contributions. This documentation cannot be improved
without your feedback and help.

:::

OSISM is a comprehensive platform for managing software-defined cloud infrastructure that goes far beyond being a simple deployment tool for OpenStack. While OSISM does support the deployment and management of OpenStack as a key component, its capabilities extend to orchestrating a wide array of services and tools needed to build and operate a modern private cloud. By leveraging OSISM, organizations gain a powerful toolset for building, managing, and scaling private cloud infrastructures tailored to their specific needs, while also maintaining full control over their data and operations.

## Guides

This documentation is organized into guides:

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

## Required knowledge

We try to make deployment, upgrade, day2 operations etc. as easy as possible for everyone
to use. However, knowledge is still required that we do not cover in our documentation.
Wherever possible, we try to refer to existing documentation from e.g. Ansible or Docker.

If you are not sure whether you already have the required knowledge, need support in
gaining the knowledge or would like a guided introduction, you are welcome to contact
us at [info@osism.tech](mailto:info@osism.tech). We are happy to help.

* We assume that the reader is well familiar with Linux (LPIC2 level).
* We assume that the reader has understood the basic concepts of Ansible
  and can use Ansible in a basic way.
* We assume that the reader has understood the basic concepts of Docker
  and can use Docker in a basic way.
* We assume that the reader has understood the basic concepts of Kubernetes
  and can use Kubernetes in a basic way.
