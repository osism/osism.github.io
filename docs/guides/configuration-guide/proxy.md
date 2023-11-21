---
sidebar_label: Proxy
sidebar_position: 99
---

# Proxy

```
##########################################################
# proxy

docker_configure_proxy: true
docker_proxy_http: "http://{{ groups['manager'][0] }}:3128"
docker_proxy_https: "{{ docker_proxy_http }}"

proxy_proxies:
  http: "http://{{ groups['manager'][0] }}:3128"
  https: "http://{{ groups['manager'][0] }}:3128"
```
