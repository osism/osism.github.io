---
sidebar_label: Manager
sidebar_position: 5
---

# Manager

## OpenSearch integration

With the command `osism log opensearch` it is possible to send SQL queries
to the OpenSearch service. For the command to be functional, the OpenSearch
integration must be activated in the manager environment and the OpenSearch
address and port must be set.

```yaml title="environments/manager/configuration.yml"
manager_opensearch_enable: true
manager_opensearch_address: api-int.testbed.osism.xyz
manager_opensearch_port: 9200
```

The integration can also be enabled later. `osism update manager` is then
executed after the configuration has been changed.
