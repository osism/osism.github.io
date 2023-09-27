---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

## OpenSearch

* OpenSearch dashboards is also upgraded with the `opensearch` role

```
osism apply -a pull opensearch
osism apply -a upgrade opensearch
```

## Grafana

```
osism apply -a pull grafana
osism apply -a upgrade grafana
```
