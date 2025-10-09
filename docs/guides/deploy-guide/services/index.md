---
sidebar_label: Services
sidebar_position: 100
---

# Services

:::info

The prerequisite for deploying the services of a cluster is the bootstrap of
the nodes. How to bootstrap the nodes is documented in the
[Bootstrap chapter of the Deploy Guide](../bootstrap.md).

:::

When setting up a new cluster, the services are deployed in a specific order.

1. [Infrastructure](./infrastructure.md)
2. [Network](./network.md)
3. [Logging & Monitoring](./logging-monitoring.md)
4. [Ceph](./ceph)
5. [OpenStack](./openstack.md)


In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the deploy action in
the second step. This significantly reduces the time required for the deployment of new
services.
