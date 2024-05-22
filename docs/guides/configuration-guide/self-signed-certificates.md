---
sidebar_label: Self-signed certificates
sidebar_position: 20
---

# Self-signed certificates

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
   ```
