---
sidebar_label: Certificates
---

# Certificates

With the `osism.commons.certificates` role, it is possible to add custom CA certificates
on a node. The parameter should be used in the `environments/configuration.yml` file.

```yaml title="environments/configuration.yml"
certificates_ca:
  - name: custom.crt
    certificate: |
      -----BEGIN CERTIFICATE-----
      [...]
      -----END CERTIFICATE-----
```

The role is part of the bootstrap of a node. CA certificates can be added at a later
point in time via `osism apply certificates` on a node.

Further details on the use of self-signed certificates can be found in chapter
[Self-signed certificates](../loadbalancer#self-signed-certificates)
of the configuration guide.
