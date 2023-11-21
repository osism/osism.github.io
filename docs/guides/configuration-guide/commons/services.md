---
sidebar_label: Services
---

# Services

With the `osism.commons.services` role, it is possible to manage services on a node
in a general form. This allows you to either activate any services or indicate that
specific services are running and should be deactivated.

## Start and enable required services

```yaml
services_required_default:
  - cron
services_required_extra: []
services_required: "{{ services_required_default + services_required_extra }}"
```

:::note

`services_required` should not be overwritten. Use `services_required_extra` to add extra services.

:::

## Note on services that should be deactivated

```yaml
services_warning_default:
  - nscd
services_warning_extra: []
services_warning: "{{ services_warning_default + services_warning_extra }}"
```

:::note

`services_warning` should not be overwritten. Use `services_warning_extra` to add extra services.

:::
