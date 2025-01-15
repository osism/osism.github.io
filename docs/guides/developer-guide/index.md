---
sidebar_label: Developer Guide
sidebar_position: 60
---

# Developer Guide

## How to add a new service

If you want to add a new service to OSISM, this is done via an Ansible role and (most often)
a container image. The following steps are necessary and are demonstrated using the example
of `osism.services.cgit`.

| Description                                                                         | Example                                                                |
|:------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|
| Add the Ansible role in one of the Ansible collection repositories                  | https://github.com/osism/ansible-collection-services/pull/578/files    |
| Add the Ansible playbook                                                            | https://github.com/osism/ansible-playbooks/pull/215/files              |
| Add the Ansible inventory group                                                     | https://github.com/osism/cfg-generics/pull/225/files                   |
| Add the used container image(s) to the release repository                           | https://github.com/osism/release/pull/278/files                        |
| Add the container images(s) to osism-ansible container image                        | https://github.com/osism/container-image-osism-ansible/pull/215/files  |
| Add the container image registry/registries and host(s) to the defaults repository  | https://github.com/osism/defaults/pull/54/files                        |
| Add a sample deployment to the testbed                                              | https://github.com/osism/testbed/pull/1043/files                       |

## How to add a new container image

If required, add a new container image in the [osism/container-images](https://github.com/osism/container-images)
repository. The example here is from the `osism.services.keycloak` role: https://github.com/osism/container-images/pull/34/files.

Whenever possible, upstream container images should be used. If only minor customizations are necessary,
always work with overlay container images based on upstream container images.

## How service deployment works

### Docker

![Service deployment with Docker](./images/service-with-docker.drawio.png)

### Kubernetes

![Service deployment with Kubernetes](./images/service-with-kubernetes.drawio.png)
