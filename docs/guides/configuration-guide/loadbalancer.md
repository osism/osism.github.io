---
sidebar_label: Loadbalancer
sidebar_position: 20
---

# Loadbalancer

## IP addresses & FQDNs

```yaml title="environments/kolla/configuration.yml"
kolla_internal_vip_address: 192.168.16.9
kolla_external_vip_address: 192.168.16.254
```

```yaml title="environments/kolla/configuration.yml"
kolla_internal_fqdn: api-int.testbed.osism.xyz
kolla_external_fqdn: api.testbed.osism.xyz
```

```yaml title="environments/configuration.yml"
hosts_additional_entries:
  api-int.testbed.osism.xyz: 192.168.16.9
  api.testbed.osism.xyz: 192.168.16.254
```

## TLS certificates

To enable external TLS encryption:

```yaml title="environments/kolla/configuration.yml"
kolla_enable_tls_external: "yes"
```

To enable internal TLS encryption:

```yaml title="environments/kolla/configuration.yml"
kolla_enable_tls_internal: "yes"
```

Two certificate files are required to use TLS securely with authentication,
which will be provided by your Certificate Authority:

* the server certificate with private key
* the CA certificate with any intermediate certificates

The combined server certificate and private key needs to be provided at
the following locations in the configuration repository:

* private key & certificates for `kolla_external_fqdn`: `environments/kolla/certificates/haproxy.pem`
* private key & certificates for `kolla_internal_fqdn`: `environments/kolla/certificates/haproxy-internal.pem`

## Generating TLS certificates with Let’s Encrypt

## Self-signed certificates

The use of self-signed certificates with a custom CA is possible. However, a few
additional parameters are then required in the configuration so that the custom CA
is known everywhere and the self-signed certificates are accepted as valid.

1. Import custom CA

   Any custom CA can be added via the `certificates_ca` parameter.
   The import on the nodes is done via `osism apply certificates`.
   This is already done in the bootstrap of the nodes.

   ```yaml title="environments/configuration.yml"
   certificates_ca:
     - name: custom.crt
       certificate: |
         -----BEGIN CERTIFICATE-----
         [...]
         -----END CERTIFICATE-----
   ```

2. Manager service

   The local environment variable `REQUESTS_CA_BUNDLE` must be set explicitly so that
   the manager service knows the custom CA in all necessary places.

   ```yaml title="environments/manager/configuration.yml"
   manager_environment_extra:
     REQUESTS_CA_BUNDLE: /etc/ssl/certs/ca-certificates.crt
   ```

3. Use in OpenStack

   The custom CA must also be copied into the OpenStack containers. To do this, the custom
   CA is first added in a file in the `environments/kolla/certificates/ca` of the configuration
   repository.  It makes sense to use the same filename like in step 1.

   The import of the custom CA must then be explicitly enabled.

   ```yaml title="environments/kolla/configuration.yml"
   kolla_copy_ca_into_containers: "yes"
   openstack_cacert: /etc/ssl/certs/ca-certificates.crt

## Second Loadbalancer

:::info

This feature is available from OSISM 7.0.5.

:::

With OSISM, it is possible to manage any number of independent loadbalancers via a single OSISM
manager service using sub-environments. A sub environment is basically nothing more than another directory
below the `environments` directory of the configuration repository with a special name.

A sub-environment for an additional loadbalancer always has the name `kolla.NAME` as the loadbalancer
is provided as part of Kolla. The `kolla.NAME` directory in the configuration repository then contains
the `configuration.yml`, `images.yml` and `secrets.yml` files as usual.

The following directories and files are also required in a sub-environment for a loadbalancer.

| File                                             | Description                                                           |
|:-------------------------------------------------|:----------------------------------------------------------------------|
| `certificates/ca/custom.crt`                     | The file is optional. If a custom CA is used, it must be added here.  |
| `certificates/haproxy-internal.pem`              | SSL certificate to be used.                                           |
| `files/overlays/haproxy/services.d/haproxy.cfg`  | HAProxy configuration to be used on the loadbalancer.                 |

In this example, a sub-environment `kolla.external` is created, which is used for an outward facing
loadbalancer that only offers certain API services.

In comparison to the normal `kolla` environment, the groups to be used must be overwritten for a
Kolla sub-environment. In this case, one group is defined: `kolla.external.loadbalancer`. It is
recommended to base the name of the groups on the name of the sub-environments.

The group `kolla.external.loadbalancer` is added to the global inventory in the `10-custom` file.
In this example, `testbed-node-2.testbed.osism.xyz` is used for the second loadbalancer.

```ini title="inventory/10-custom"
[kolla.external.loadbalancer]
testbed-node-2.testbed.osism.xyz
```

It is also important to ensure that the nodes used for the second loadbalancer are not included in
the `loadbalancer` group. This can be checked with `osism get hosts -l loadbalancer`. If the nodes of
the second loadbalancer are also listed there, the `loadbalancer` group in the `99-overwrite` file of
the global inventory must be overwritten. In this example, the `loadbalaner` group is overwritten so
that only `testbed-node-0.testbed.osism.xyz` and `testbed-node-1.testbed.osism.xyz` are left in the
`loadbalancer` group.

```ini title="inventory/99-overwrite"
[loadbalancer]
testbed-node-0.testbed.osism.xyz
testbed-node-1.testbed.osism.xyz
```

Furthermore, in a Kolla sub-environment that is only used for a loadbalancer, only a few additional
parameters are required in the `configuration.yml` file.

Don't get confused, only the `kolla_*internal*` parameters and the `haproxy-internal.pem` file are used
here in the example. This is because we only want to configure one virtual IP address on the external
loadbalancer and the loadbalancer managed by Kolla has the internal IP address by default. It is therefore
not possible with Kolla to use only the `kolla_*external*` parameters as an additional virtual IP address
with default values would then be configured by default.

```yaml title="environments/kolla.external/configuration.yml"
---
##########################################################
# hosts

hosts_kolla_all: kolla.external.loadbalancer
hosts_kolla_loadbalancer: kolla.external.loadbalancer

##########################################################
# docker

docker_namespace: osism

##########################################################
# loadbalancer

kolla_internal_vip_address: 192.168.24.200
kolla_internal_fqdn: api.testbed.osism.com
kolla_enable_tls_internal: "yes"

# Required if a custom CA is used.
kolla_copy_ca_into_containers: "yes"
```

At the moment it is only possible to deploy the loadbalancer itself with its own configuration. It is currently
not possible to use the integrated service configurations of Kolla itself (Nova, Cinder, ..) on an additional
loadbalancer. This will be possible in the future.

```
osism apply --sub external loadbalancer-without-service-config
```

## ProxySQL

```yaml title="environments/kolla/configuration.yml"
enable_proxysql: "yes"
```
