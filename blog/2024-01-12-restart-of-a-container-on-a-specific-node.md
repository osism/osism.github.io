---
slug: 2024-01-12-restart-of-a-container-on-a-specific-node
title: Restart of a container on a specific node
authors: [berendt]
tags: [OSISM, Machine Room]
---
We not only develop OSISM, we also use it to operate our own cloud
infrastructure, the REGIO.cloud. When operating REGIO.cloud, we often
come across tasks in our day-to-day business that we can already solve
with the help of OSISM. If not, we [open an issue](https://github.com/osism/issues/issues)
for the task and build it in so that we can solve it directly in OSISM in the future.

In blog posts with the tag [Machine Room](https://osism.github.io/blog/tags/machine-room),
we will now write about such tasks and how we were able to solve them with OSISM.

Yesterday we had a hiccup in our RabbitMQ cluster. This has caused problems
with the attachment of volumes to instances during the night. After analyzing the
problem, it was decided that only a restart of the `nova_compute` containers,
which provide the Nova Compute Service, would solve the problem. With the play
`manage-container` it is possible to run an action, e.g. `restart`, of a specific
container.

As we have our compute nodes in housings, we have also mapped them in the inventory
in `inventory/10-custom` and can now use those groups to restart all Nova Compute
services one by one.

```
$ osism apply manage-container \
    -e container_action=restart \
    -e container_name=nova_compute \
    -l housing1047
2024-01-12 08:28:55 | INFO     | Task was prepared for execution. It takes a moment until the task has been started and output is visible here.

PLAY [Manage container] ********************************************************

TASK [Manage container] ********************************************************
changed: [com1047]

PLAY [Manage container] ********************************************************

TASK [Manage container] ********************************************************
changed: [com1048]

PLAY [Manage container] ********************************************************

TASK [Manage container] ********************************************************
changed: [com1049]

PLAY [Manage container] ********************************************************

TASK [Manage container] ********************************************************
changed: [com1050]

PLAY RECAP *********************************************************************
com1047                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
com1048                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
com1049                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
com1050                    : ok=1    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```
