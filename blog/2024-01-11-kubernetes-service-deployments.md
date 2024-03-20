---
slug: 2024-01-11-kubernetes-service-deployment
title: Kubernetes Service Deployments
authors: [berendt]
tags: [Sneak Peak, Kubernetes]
---
New big and small features are constantly being added to OSISM. This makes using OSISM
a little better for operators of the [Sovereign Cloud Stack](https://scs.community) every day.

Since we currently only do a major release every 6 months in which we write about these big
and small features in the release notes, there will be this kind of blog posts from now on.
In blog posts with the tag [Sneak Peak](https://osism.tech/blog/tags/sneak-peak),
we will now write about new features before the next major release.

This blog entry is specifically about the possibility of deploying services on the recently
integrated Kubernetes cluster.

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
