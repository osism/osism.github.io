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

![OSISM Manager architecture](../images/osism-manager.drawio.svg)

## Components

### osismclient / python-osism

`osismclient` is the container that provides the `osism` CLI. All operator interactions
— running playbooks, querying task state, retrieving logs — use `osism` as the entry
point. The CLI is provided by the
[python-osism](https://github.com/osism/python-osism) library, which also exposes
the underlying Python API.

### Job queues (Celery + Redis)

The manager uses [Celery](https://docs.celeryq.dev/) backed by a Redis instance
(`manager-redis`) to dispatch and queue Ansible tasks. The same Redis instance also
serves as the [Ansible facts cache](https://docs.ansible.com/ansible/latest/plugins/cache/redis.html),
so that all Ansible containers share the same gathered host facts. Separate
queues exist for each workload type:

* `kolla-ansible job queue` — OpenStack service lifecycle
* `ceph-ansible job queue` — Ceph deployment and management
* `osism-ansible job queue` — Infrastructure-level playbooks
* `osism-kubernetes job queue` — Kubernetes-related operations

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

### Configuration volume

All Ansible containers share read-only access to the configuration repository, mounted
at `/opt/configuration`. This volume is the single source of truth for the entire
deployment — inventory, group variables, host variables, and secrets are all read from
this location.

## Further reading

For day-to-day usage of the manager — running commands, inspecting tasks, viewing logs,
and opening console sessions — see the
[Operations Guide > Manager](../guides/operations-guide/manager/index.md) section.
