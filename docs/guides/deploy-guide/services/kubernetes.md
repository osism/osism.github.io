---
sidebar_label: Kubernetes
sidebar_position: 12
---

# Kubernetes

:::info

As of OSISM 7, it is possible to create a Kubernetes cluster on all nodes.
At the moment, this is still optional. In the future, it will be necessary
to deploy this Kubernetes cluster.

:::

1. Deploy the [K3s](https://k3s.io) cluster.

   ```
   osism apply kubernetes
   ```

2. Deploy the [Kubernetes dashboard](https://github.com/kubernetes/dashboard):

   ```
   osism apply kubernetes-dashboard
   ```

## Cluster API

1. Deploy the [Cluster API](https://cluster-api.sigs.k8s.io) management cluster on the K3s cluster:

   ```
   osism apply clusterapi
   ```

2. Add the `kubeconfig` file to the configuration repository (required later by OpenStack
   Magnum Service):

   ```
   osism apply copy-kubeconfig
   ```
