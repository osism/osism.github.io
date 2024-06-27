---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

1. **Optional:** Pull containers

   ```
   osism apply -a pull opensearch
   osism apply -a pull prometheus
   osism apply -a pull grafana
   ```

2. OpenSearch

   OpenSearch dashboards is also upgraded with the `opensearch` role.

   ```
   osism apply -a upgrade opensearch
   ```

3. Prometheus

   ```
   osism apply prometheus
   ```

4. Grafana

   ```
   osism apply -a upgrade grafana
   ```
