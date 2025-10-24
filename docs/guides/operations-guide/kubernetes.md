---
sidebar_label: Kubernetes
---

# Kubernetes

## Hubble

## Get service IP address

```console
$ kubectl get service -n kube-system hubble-ui
NAME        TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)        AGE
hubble-ui   LoadBalancer   10.43.136.133   172.31.252.0   80:31797/TCP   6h22m
```

## Headlamp

## Get service IP address

```console
$ kubectl get service -n kube-system headlamp
NAME       TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)        AGE
headlamp   LoadBalancer   10.43.165.245   172.31.252.1   80:32210/TCP   5h34m
```

### Generate a service account token

```bash
kubectl create token headlamp-admin -n kube-system
```
