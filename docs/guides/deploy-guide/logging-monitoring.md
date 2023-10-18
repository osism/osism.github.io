---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

Common issues with deploying logging & monitoring services provided by Kolla
are documented in the [OpenStack Troubleshooting Guide](../troubleshooting-guides/openstack.md).

## OpenSearch

OpenSearch dashboards is also deployed with the `opensearch` role.

```
osism apply -a pull opensearch
osism apply opensearch
```

## Prometheus

```
osism apply -a pull prometheus
osism apply prometheus
```

## Grafana

```
osism apply -a pull grafana
osism apply grafana
```
