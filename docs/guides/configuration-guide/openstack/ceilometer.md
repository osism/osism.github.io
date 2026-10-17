---
sidebar_label: Ceilometer
---

# Ceilometer

* [Ceilometer admin guide](https://docs.openstack.org/ceilometer/latest/admin/index.html)
* [Ceilometer configuration reference](https://docs.openstack.org/ceilometer/latest/configuration/index.html)

## Metrics in Prometheus

When Ceilometer is enabled, its polling agents serve the samples they poll in
Prometheus format, and the Prometheus that OSISM deploys scrapes them. No
further configuration is needed.

* The central and compute polling agents listen on their API address,
  port `9181`.
* Prometheus scrapes them in the job `ceilometer`, one target per host of the
  `ceilometer-central` and `ceilometer-compute` groups.
* The series are named `ceilometer_<meter>`, e.g. `ceilometer_cpu` or
  `ceilometer_volume_size`, with the resource in the `resource` label and the
  project in the `project` label.

If neither Gnocchi, the Pushgateway publisher nor a custom `pipeline.yaml` is
configured, the polling agents stop sending their samples to the notification
agent as well, because nothing would consume them.

Every central agent polls every central resource, so a series such as
`ceilometer_volume_size` exists once per control node. Aggregate it by resource
in queries:

```promql
max by (resource) (ceilometer_volume_size)
```

Ceilometer polls every 300 seconds, so a value changes at most once per
polling interval. Which meters are polled is decided by Ceilometer's
`polling.yaml`.

To turn the export off, or to move it to another port, override the defaults:

```yaml title="environments/kolla/configuration.yml"
enable_ceilometer_prometheus_exporter: "no"
ceilometer_prometheus_exporter_port: "9181"
```

A host that is in both the `ceilometer-central` and the `ceilometer-compute`
group runs both agents, and they cannot share the port. The deployment of
Ceilometer stops on such a host and names the variables to set. Move one of
the two agents for that host; Prometheus follows automatically:

```yaml title="inventory/host_vars/<host>/ceilometer.yml"
ceilometer_central_prometheus_exporter_port: "9182"
```

The IPMI agent (`enable_ceilometer_ipmi`) does not export to Prometheus.

When Ceilometer is enabled on a running cloud, apply Prometheus after
Ceilometer so that it picks up the new scrape job:

```bash
osism apply ceilometer
osism apply prometheus
```
