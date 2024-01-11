---
slug: 2024-01-11-kubernetes-service-deployment
title: Kubernetes Service Deployments
authors: [berendt]
tags: [Sneak Peak, Kubernetes]
---
The deployment of services on the integrated Kubernetes cluster will be possible in
future via the `kubernetes` environment. A first simple example for the deployment
of Nginx is already [available in the osism/testbed repository](https://github.com/osism/testbed/tree/main/environments/kubernetes).
The new environment is used as usual with `osism apply`.

```
$ osism apply -e kubernetes nginx

$ kubectl get pods -n nginx
NAME                    READY   STATUS    RESTARTS   AGE
nginx-f7f5c78c5-crhnf   1/1     Running   0          2m28s
nginx-f7f5c78c5-tjf6r   1/1     Running   0          2m28s
nginx-f7f5c78c5-qbqjz   1/1     Running   0          2m28

$ kubectl get services -n nginx
NAME    TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
nginx   LoadBalancer   10.43.84.203   192.168.16.100   80:30612/TCP   2m46s

$ curl -I http://192.168.16.100
HTTP/1.1 200 OK
Server: nginx/1.25.3
```
