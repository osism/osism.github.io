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

Do not `sum` the raw series; that counts every resource once per control node.
The central agents do not poll in step, so an increase shows in the aggregate
at the first agent's next poll, but a decrease or a deleted resource only once
every central agent has polled again. That takes up to one polling interval,
and longer if one agent's calls to an OpenStack API hang.

Which meters are polled is described in [Polled meters](#polled-meters).

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

## Polled meters

OSISM renders Ceilometer's `polling.yaml` for every agent. The agents poll
every 300 seconds (`ceilometer_polling_interval`).

* Compute agents, 22 meters: `power.state`, `cpu`, `vcpus`, `memory`,
  `memory.available`, `memory.usage`, `memory.resident`, `memory.swap.in`,
  `memory.swap.out`, `network.incoming.bytes`, `network.incoming.packets`,
  `network.outgoing.bytes`, `network.outgoing.packets`, `disk.root.size`,
  `disk.ephemeral.size`, `disk.device.read.bytes`,
  `disk.device.read.requests`, `disk.device.write.bytes`,
  `disk.device.write.requests`, `disk.device.capacity`,
  `disk.device.allocation` and `disk.device.usage`.
* Central agents, only for the services that are enabled:
  * Cinder: `volume.size`, `volume.snapshot.size`, `volume.backup.size`
  * Glance: `image.size`
  * Neutron: `ip.floating`
  * Manila: `manila.share.size`
  * Designate: `dns.zone.status`, `dns.zone.recordsets`, `dns.zone.ttl`,
    `dns.zone.serial`
  * Octavia: `loadbalancer.operating`, `loadbalancer.provisioning`
* `radosgw.*` and `hardware.ipmi.*` are not polled.

To poll further meters, add them to the default list:

```yaml title="environments/kolla/configuration.yml"
ceilometer_polling_meters_extra:
  - disk.device.read.latency
```

To replace the list, provide your own
`environments/kolla/files/overlays/ceilometer/polling.yaml`. It is used for
every agent instead of the rendered one. Ceilometer ignores meter names it
does not know without a message, so check that the series you expect appear.
When you remove the file again, `osism apply -a reconfigure ceilometer`
restores the rendered default.
