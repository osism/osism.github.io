---
sidebar_label: OSISM Manager
sidebar_position: 5
---

# OSISM Manager

The OSISM Manager is the central management node in every OSISM deployment. It is the
operator's single point of entry for deploying, configuring, and operating all services
in a cloud pod. Every Ansible-based task — whether for OpenStack, Ceph, infrastructure,
or Kubernetes — is dispatched through the manager.

## Architecture

![OSISM Manager](./images/osism-manager.drawio.svg)

## Components

### osismclient / python-osism

`osismclient` is the container that provides the `osism` CLI. All operator interactions
— running playbooks, querying task state, retrieving logs — use `osism` as the entry
point. The CLI is provided by the
[python-osism](https://github.com/osism/python-osism) library, which also exposes
the underlying Python API.

### Job queues (Celery + Redis)

The manager uses [Celery](https://docs.celeryq.dev/en/stable/) backed by a Redis instance
(`manager-redis`) to dispatch and queue Ansible tasks. The same Redis instance also
serves as the [Ansible facts cache](https://docs.ansible.com/projects/ansible/latest/plugins/cache/redis.html),
so that all Ansible containers share the same gathered host facts. Separate
queues exist for each workload type:

* `kolla-ansible job queue` — OpenStack service lifecycle
* `ceph-ansible job queue` — Ceph deployment and management
* `osism-ansible job queue` — Infrastructure-level playbooks
* `osism-kubernetes job queue` — Kubernetes-related operations
* `reconciler job queue` — Inventory reconciliation

Separate queues allow operations to run in parallel — for example, an OpenStack
deployment and a Ceph operation can proceed simultaneously without waiting for each
other.

### kolla-ansible

Handles the lifecycle management of OpenStack services. The container image is
maintained at
[github.com/osism/container-image-kolla-ansible](https://github.com/osism/container-image-kolla-ansible).

### ceph-ansible

Handles Ceph deployment and day-2 management. The container image is maintained at
[github.com/osism/container-image-ceph-ansible](https://github.com/osism/container-image-ceph-ansible).

### osism-ansible

Handles infrastructure-level playbooks that are not covered by kolla-ansible or
ceph-ansible — for example, bootstrapping nodes, managing network configuration, and
operating supporting services. The container image is maintained at
[github.com/osism/container-image-osism-ansible](https://github.com/osism/container-image-osism-ansible).

### osism-kubernetes

Handles Kubernetes-related operations, including cluster provisioning and lifecycle
management. The source is maintained at
[github.com/osism/osism-kubernetes](https://github.com/osism/osism-kubernetes).

To keep the architecture diagram readable, `osism-kubernetes` is not depicted there. It
follows the same pattern as the other Ansible containers: it has its own
`osism-kubernetes job queue`, shares the `manager-redis` facts cache, and mounts both the
`/opt/configuration` and the `/ansible/inventory` volumes.

### inventory-reconciler

Reconciles the Ansible inventory that all other Ansible containers operate on. It runs
through its own `reconciler job queue` and is triggered with `osism sync inventory`. The
container image is maintained at
[github.com/osism/container-image-inventory-reconciler](https://github.com/osism/container-image-inventory-reconciler).

The reconciler combines two inventory sources:

* the [configuration repository](../guides/configuration-guide/configuration-repository.md)
  mounted read-only at `/opt/configuration`, and
* a [NetBox](https://netbox.dev/) instance, if the inventory is generated from NetBox
  data (see [Inventory](../guides/configuration-guide/inventory.md)).

From these sources it renders the effective inventory and writes it to the shared
`/ansible/inventory` volume. Decoupling inventory generation from the workload containers
means the inventory is computed once, in one place, and every Ansible container always
sees a consistent view of the hosts and their group and host variables.

### Configuration volume

All Ansible containers share read-only access to the
[configuration repository](../guides/configuration-guide/configuration-repository.md),
mounted at `/opt/configuration`. This volume is the single source of truth for the
entire deployment — the inventory source, group variables, host variables, and secrets
all originate from this location. The `inventory-reconciler` reads the inventory source
from here and turns it into the reconciled inventory described below.

### Inventory volume

The reconciled inventory lives on a shared `/ansible/inventory` volume. The
`inventory-reconciler` is the only container that writes to it; all Ansible containers
(`kolla-ansible`, `ceph-ansible`, `osism-ansible`, `osism-kubernetes`) mount it and use it
as their Ansible inventory. Because the inventory is produced centrally by the reconciler
rather than by each Ansible container individually, all workloads share exactly the same,
already reconciled view of the environment.

## Further reading

For day-to-day usage of the manager — running commands, inspecting tasks, viewing logs,
and opening console sessions — see the
[Operations Guide > Manager](../guides/operations-guide/manager/index.md) section.
