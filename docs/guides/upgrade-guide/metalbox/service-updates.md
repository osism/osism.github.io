---
sidebar_label: Service updates
sidebar_position: 20
---

# Service updates on the MetalBox

The services running on the MetalBox are updated by running the corresponding
`update-*.sh` script.

:::warning

The MetalBox pulls all container images from its local registry. The container registry
must therefore be updated first, otherwise the update scripts redeploy the services
with the images that are already present. See
[Update of the container registry](./data-updates.md#update-of-the-container-registry).

:::

## Update of the Manager service

Run `update-manager.sh` to update the Manager service.

## Update of the NetBox service

Run `update-netbox.sh` to update the NetBox service.

## Update of the infrastructure services

Run `update-infrastructure.sh` to update the infrastructure services.

## Update of the OpenStack services

Run `update-openstack.sh` to update the OpenStack services.
