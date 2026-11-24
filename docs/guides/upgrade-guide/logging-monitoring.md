---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

1. OpenSearch

   OpenSearch dashboards is also upgraded with the `opensearch` role.

   ```bash
   osism apply -a pull opensearch
   osism apply -a upgrade opensearch
   ```

2. Prometheus

   ```bash
   osism apply -a pull prometheus
   osism apply prometheus
   ```

   When upgrading to OSISM 11 or later, the node exporter and cAdvisor, which
   run on every node, are upgraded with their own `prometheus-node-exporters`
   role. The change comes from Kolla Ansible, which moved both exporters out of
   the `prometheus` role upstream. Without this step, the exporter containers
   that the `prometheus` role deployed before keep running with their old
   images.

   ```bash
   osism apply -a pull prometheus-node-exporters
   osism apply prometheus-node-exporters
   ```

   When upgrading to OSISM 10 or earlier, the `prometheus` role upgrades them
   and there is no further command.

3. Grafana

   ```bash
   osism apply -a pull grafana
   osism apply -a upgrade grafana
   ```
