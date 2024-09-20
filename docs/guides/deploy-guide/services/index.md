---
sidebar_label: Services
sidebar_position: 100
---

# Services

:::info

The prerequisite for depoying the services of a cluster is the bootstrap of
the nodes. How to bootstrap the nodes is documented in the
[Bootstrap chapter of the Deploy Guide](../bootstrap.md).

:::

When setting up a new cluster, the services are deployed in a specific order.


1. [Infrastructure](./infrastructure.md)
2. [Kubernetes](./kubernetes.md)
3. [Network](./network.md)
4. [Logging & Monitoring](./logging-monitoring.md)
5. [Ceph](./ceph.mdx)
6. [OpenStack](./openstack.md)


In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the deploy action in
the second step. This significantly reduces the times required for the deployment time of new 
services.

