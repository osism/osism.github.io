---
sidebar_label: Upgrade Guide
sidebar_position: 20
---

# Upgrade Guide

## General hints

TODO: Testumgebung, Inkubation, Runbook, Personal, ...

In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the upgrade action in
the second step. This significantly reduces the times required for the restart from a
service.


## The order of the upgrade steps


:::warning

Always read the [release notes](https://osism.tech/docs/release-notes/) first to learn what has changed and what
adjustments are necessary. Read the release notes even if you are only updating for minor releases e.g. from 7.0.2 to 7.0.5.

:::

TODO: validate order

* Step 1: [Upgrade the Manager](./manager)
* Step 2: [Upgrade Logging & Monitoring](./logging-monitoring)
* Step 3: [Upgrade the Infrastructure](./infrastructure)
* Step 4: [Upgrade the Network](./network)
* Step 5: [Upgrade Docker](./docker)
* Step 6: [Upgrade Openstack](./openstack)
* Step 7: [Upgrade the Ceph](./ceph)
