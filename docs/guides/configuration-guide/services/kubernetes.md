---
sidebar_label: Kubernetes
---

# Kubernetes

The deployment is based on [k3s-ansible](https://github.com/techno-tim/k3s-ansible) and the defaults
are configured and described in [099-k3s.yml](https://github.com/osism/defaults/blob/main/all/099-k3s.yml)

* Optional: If you run your environment begind a http proxy, [configure the proxy settings](../proxy.md)
* Define the `apiserver_endpoint` with a unused ipv4 address
* Define the `metal_lb_ip_range` with a range of free ipv4 adresses
* The use of more than 3 name servers for the Kubernetes nodes generates a large number of warning messages as only the first three name servers are used.

