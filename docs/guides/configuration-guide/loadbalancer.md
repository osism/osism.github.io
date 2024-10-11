---
sidebar_label: Loadbalancer
sidebar_position: 20
---

# Loadbalancer

The settings of the following section rely on the mechanisms of Kolla-Ansible, 
therefore it's a good idea to use the [upstream documentation](https://docs.openstack.org/kolla-ansible/latest/admin/tls.html) 
for finding out details which are not covered by this documentation.

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

:::warning
To avoid unnecessary additional work and problems, it is recommended that you configure TLS with the intended target
configuration of the specific environment during the initial rollout process.
:::

For example: Changes to the configuration of TLS or the fully qualified domain names (FQDNs) will result in new URLs (with and without the https prefix)
stored in the Openstack databases, and in the case of self-signed certificates, the CA certificate must be distributed to all participating clients.

As a result, the involved Ansible Plays must at least be executed in the correct order, and not all Ansible Plays can handle all possible configuration transitions on their own.
Therefore, in some cases, manual adjustments must be made to the systems.

For this reason, we recommend that you define domains, obtain certificates, and perform configurations in advance.

## General procedure

To enable TLS encryption the following steps are needed.

1. Activate tls encryption for both endpoints

  * To enable external TLS encryption:

    ```yaml title="environments/kolla/configuration.yml"
    kolla_enable_tls_external: "yes"
    ```
  * To enable internal TLS encryption:

    ```yaml title="environments/kolla/configuration.yml"
    kolla_enable_tls_internal: "yes"
     ```

2. Add the combined server certificate and private key to the following locations in the configuration repository:
  * private key & certificates for `kolla_external_fqdn`: `environments/kolla/certificates/haproxy.pem`
  * private key & certificates for `kolla_internal_fqdn`: `environments/kolla/certificates/haproxy-internal.pem`
3. Encrypt the certificates using ansible vault:
   ```
   make ansible_vault_edit FILE=environments/kolla/certificates/haproxy.pem
   make ansible_vault_edit FILE=environments/kolla/certificates/haproxy-internal.pem
   ```
4. Add the changes to the Git repository
   ```
   git add environments/kolla/certificates/haproxy.pem \
     environments/kolla/certificates/haproxy-internal.pem \
     environments/kolla/configuration.yml

   git commit -m "Add new certificates" environments/kolla/certificates/haproxy.pem \
     environments/kolla/certificates/haproxy-internal.pem \
     environments/kolla/configuration.yml
   ```
5. Rollout changes
   ```
   osism apply loadbalancer
   ```

### Self-signed certificates

OSISM supports the usage of self-signed certificates with a custom CA i.e if you
are running a test installation or for interim purposes.

Two certificate files are required to use TLS securely with authentication,
which will be provided by your custom Certificate Authority:

* the server certificate with private key
* the CA certificate with any intermediate certificates

The following procedure describes the preparation tasks for the CA, which is later followed
by the general steps described above.

1. Import custom CA

   Any custom CA can be added via the `certificates_ca` parameter.
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
   * Add the custom CA to the configuration repository in the directory `environments/kolla/certificates/ca` with the same
     name like in step 1
   * Configure the custom CA to be copied to the OpenStack containers
     ```yaml title="environments/manager/configuration.yml"
     kolla_copy_ca_into_containers: "yes"
     openstack_cacert: /etc/ssl/certs/ca-certificates.crt
     ```

4. Import the ca certificate to all nodes so that the custom CA is known everywhere and the self-signed certificates are accepted as valid.
   ```
   osism apply certificates
   ```

5. Execute all steps in the general documentation above

### Generating TLS certificates with Let’s Encrypt

Using Let's encrypt certificates is a good alternative to traditional certificate authorities and
greatly simplifies the administration of TLS certificates.

For a working Let's Encrypt configuration, the API endpoints (configured by `kolla_internal_fqdn` and `kolla_external_fqdn`) 
must be accessible from the internet.

1. Activate Let's Encrypt tls encryption for both endpoints

   ```yaml title="environments/kolla/configuration.yml"
   enable_letsencrypt: "yes"
   letsencrypt_email: "<The email used for registration and recovery contact>"
   kolla_enable_tls_external: "yes"
   kolla_enable_tls_internal: "yes"
   ```

2. Rollout changes
   ```
   osism apply loadbalancer
   ```

For more details about this topic, we recommend the [offical kolla-ansible documentation](https://docs.openstack.org/kolla-ansible/latest/admin/tls.html#generating-tls-certificates-with-let-s-encrypt).

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
