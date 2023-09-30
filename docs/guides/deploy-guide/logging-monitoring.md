---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

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
