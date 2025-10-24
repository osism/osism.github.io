---
sidebar_label: Proxy
sidebar_position: 15
---

# Proxy

In the following examples, it is assumed that the Squid proxy integrated by OSISM
is used on the first manager node. Any other proxy accessible from the nodes can
also be used here. `http://{{ groups['manager'][0] }}:3128` which is used here as an
example is then replaced accordingly with the address of the proxy.

## Deployment of a Squid Proxy Server

The Squid service can be deployed on the first manager. This is useful if no proxy
can be used in the environment. The first manager node is then used by all other nodes
as a pass-through node. Please note that this is not a caching proxy or even an air gap.
This is also possible with OSISM, but not with the help of the Squid service.

```bash
osism apply squid
```

## Configurations

It is advisable to exclude hosts that are locally accessible from using the HTTP proxy
if they use HTTP(S) communication, as otherwise communication will take place unnecessarily via the
proxy. In some cases the proxy does not have access to the internal networks (this depends on its location),
but this can also lead to higher latencies or to inferred availability problems
if the proxy is temporarily unavailable.

:::warning
As [Gitlab has described in 2021](https://about.gitlab.com/blog/2021/01/27/we-need-to-talk-no-proxy/#no_proxy), there are subtle differences depending on the technology, implementation and age as to whether environment variables should be lowercase or uppercase, or what types of exclusions are possible.

Furthermore, the documentation of certain implementations is not very clear in its statements.

It usually makes sense to exclude all [private ipv4 networks](https://www.rfc-editor.org/rfc/rfc1918) when the involved technology supports this
because these private networks or network areas are typicall relatively rarely accessed via a proxy anyway but there is a high potential that a network
which is required to be reached directly is overlooked.
:::

We therefore try to choose the clearest examples possible.

The example domain `landscape.example.com` is used for hosts of the following names:

- `api.zone1.landscape.example.com`
- `api-internal.zone1.landscape.example.com`
- `manager.landscape.example.com`

### Docker

This allows Docker images to be pulled via a proxy.

```yaml title="environments/configuration.yml"
##########################################################
# proxy

docker_configure_proxy: true
docker_proxy_http: "http://{{ groups['manager'][0] }}:3128"
docker_proxy_https: "{{ docker_proxy_http }}"

# Due to the fact, that Golang supports CIDR blocks its a good idea to exclude local networks,
# there might be cases where CIDR excludes are ignored when calling non-golang binaries.
docker_proxy_no_proxy_extra:
  - landscape.example.com
  - "10.0.0.0/8"
  - "172.16.0.0/12"
  - "192.168.0.0/16"
```

### APT

This allows APT packages to be downloaded via a proxy.

```yaml title="environments/configuration.yml"
##########################################################
# proxy

proxy_proxies:
  http: "http://{{ groups['manager'][0] }}:3128"
  https: "http://{{ groups['manager'][0] }}:3128"

# Due to the fact, that APT and libcurl does not support CIDR blocks, we cannot use global excludes
# using CIDR expressions
proxy_no_proxy_extra:
  - landscape.example.com
```

### OpenStack

Proxy settings for containers such as Magnum that need internet access.

Exclude all internal adresses, *especially* the internal api endpoint.

```yaml title="environments/kolla/configuration.yml"
##########################################################
# proxy

container_http_proxy: "http://{{ groups['manager'][0] }}:3128"
container_https_proxy: "http://{{ groups['manager'][0] }}:3128"

# Due to the fact, that openstacks relies on python, we cannot trust that global CIDR
# excludes are working in general but it they don't harm
container_no_proxy: "localhost,127.0.0.1,landscape.example.com,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
```

### Kubernetes / K3s

Settings for the OSISM Kubernetes cluster, which is operated independently of Openstack.
These settings affect all http and https requests of the K3s installation as they are passed as environment variables via the systemd unit.
For this reason, `NO_PROXY` must be configured so that the network between the K8S nodes is explicitly excluded.

An example:
```yaml title="environments/configuration.yml"
##########################################################
# proxy

proxy_env:
  HTTP_PROXY: "http://{{ groups['manager'][0] }}:3128"
  HTTPS_PROXY: "http://{{ groups['manager'][0] }}:3128"
  # Due to the fact, that k8s is based on Golang supports CIDR blocks its a good idea to exclude local networks,
  # there might be really rare cases where CIDR excludes are ignored when calling non-golang binaries.
  NO_PROXY: "localhost,127.0.0.1,landscape.example.com,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
```
