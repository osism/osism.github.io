---
sidebar_label: Deploy Guide
sidebar_position: 10
---

# Deploy Guide

💡 The Deploy Guide describe how to provision, bootstrap and deploy nodes and services.

A classification is made for services. For example, all infrastructure services
such as RabbitMQ or MariaDB are covered in the [infrastructure section](./services/infrastructure)
of the [services chapter](./services).

The manager node is handled in a [separate chapter](./manager) because it must be handled differently when
building a new environment.

Before deploying services to nodes, they must all be bootstrapped. This is covered
in the [bootstrap chapter](./bootstrap).

The guide always assume that a node is already initially accessible via SSH and only
needs to be bootstrapped and integrated into the environment. Deploying bare-metal nodes
with an operating system is documented in the [provisioning chapter](./provisioning).

In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the deploy action in
the second step. This significantly reduces the times required for the restart from a
service.

## Getting started

OSISM is deployed in a series of successive phases. The phases are documented in this guide.

1. [Creation of a configuration repository](../configuration-guide/configuration-repository#creating-a-new-configuration-repository)
2. [Preparation of a seed node](./seed)
3. [Preparation of a manager node](./manager)
4. [Provisioning of the bare-metal nodes](./provisioning)
5. [Bootstrap of the bare-metal nodes](./bootstrap)
6. [Deployment of the services](./services)
