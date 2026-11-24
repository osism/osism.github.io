---
sidebar_label: Logging & Monitoring
sidebar_position: 40
---

# Logging & Monitoring

Common issues with deploying logging & monitoring services provided by Kolla
are documented in the [OpenStack Troubleshooting Guide](../../troubleshooting-guide/openstack.mdx).

1. OpenSearch

   OpenSearch dashboards is also deployed with the `opensearch` role.

   ```bash
   osism apply -a pull opensearch
   osism apply opensearch
   ```

2. Prometheus

   ```bash
   osism apply -a pull prometheus
   osism apply prometheus
   ```

   With OSISM 11 and later, the node exporter and cAdvisor, which run on every
   node, are deployed with their own `prometheus-node-exporters` role. The
   change comes from Kolla Ansible, which moved both exporters out of the
   `prometheus` role upstream. With OSISM 10 and earlier, the `prometheus` role
   deploys them and there is no further command.

   With OSISM 11 and later:

   ```bash
   osism apply -a pull prometheus-node-exporters
   osism apply prometheus-node-exporters
   ```

3. Grafana

   ```bash
   osism apply -a pull grafana
   osism apply grafana
   ```
