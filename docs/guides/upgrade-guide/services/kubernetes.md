---
sidebar_label: Kubernetes
sidebar_position: 12
---

# Kubernetes

1. Deploy the [K3s](https://k3s.io) cluster.

   ```
   osism apply -a upgrade kubernetes
   ```

2. Deploy the [Kubernetes dashboard](https://github.com/kubernetes/dashboard):

   ```
   osism apply -a upgrade kubernetes-dashboard
   ```

## Cluster API

Deploy the [Cluster API](https://cluster-api.sigs.k8s.io) management cluster on the K3s cluster:

```
osism apply -a upgrade clusterapi
```

