---
sidebar_label: Self-signed certificates
sidebar_position: 100
---

# Self-signed certificates

## OpenStack

### Horizon

```python title="environments/kolla/files/overlays/horizon/custom_local_settings"
OPENSTACK_SSL_NO_VERIFY = True
```
