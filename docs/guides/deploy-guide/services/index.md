---
sidebar_label: Services
sidebar_key: deploy-guide-services
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
4. [Ceph](./ceph/index.mdx)
5. [OpenStack](./openstack.md)


In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the deploy action in
the second step. This significantly reduces the time required for the deployment of new
services.

Before service deployment the network connectivity with the given MTU needs to
be validated.
This is done by running

```bash
osism validate kolla-connectivity
```

The command will check the connection using ICMP echo request/reply between all
hosts with the configured MTU and for all configured networks.
A successful run is a strong indicator that the network configuration is correct.
When ceph is used also run

```bash
osism validate ceph-connectivity
```

to additionally check ceph networks in the same way.
