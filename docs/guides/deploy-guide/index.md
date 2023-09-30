---
sidebar_label: Deploy Guides
sidebar_position: 10
---

# Deploy Guides

💡 The Deploy Guides describe how to deploy individual nodes and services.

A classification is made for services. For example, all infrastructure services
such as RabbitMQ or MariaDB are covered in the Infrastructure Guide.

The Manager Node is treated specially because it must be treated differently when
building a new machine.

Before deploying services to nodes, they must all be bootstrapped. This is covered
in the Bootstrap Guide.

The guides always assume that a node is already initially accessible via SSH and only
needs to be bootstrapped and integrated into the machine. Deploying bare-metal nodes
with an operating system is not part of the Deploy Guides and is covered in the
Advanced Guides.

In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the deploy action in
the second step. This significantly reduces the times required for the restart from a
service.
