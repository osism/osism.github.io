---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

1. OpenSearch

   OpenSearch dashboards is also upgraded with the `opensearch` role.

   ```
   osism apply -a pull opensearch
   osism apply -a upgrade opensearch
   ```

2. Prometheus

   ```
   osism apply -a pull prometheus
   osism apply prometheus
   ```

3. Grafana

   ```
   osism apply -a pull grafana
   osism apply -a upgrade grafana
   ```
