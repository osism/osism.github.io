---
sidebar_label: OpenStack
sidebar_position: 60
---

# OpenStack

## Add a new compute node

```
osism apply operator -u osism -l NODE
osism apply bootstrap -l NODE
```

If FRR is used:

```
osism apply frr -l NODE
```

```
osism apply common -l NODE
osism apply openvswitch -l NODE
osism apply ovn -l NODE
osism apply prometheus -l NODE
osism apply ceilometer -l NODE
osism apply neutron -l NODE
osism apply nova -l NODE
```

If Scaphandre is used:

```
osism apply scaphandre -l NODE
```

If Netdata is used:

```
osism apply netdata -l NODE
```

Containers that run on a compute node. Versions may differ.

```
$ docker ps
CONTAINER ID   IMAGE                                                      COMMAND                  CREATED         STATUS                   PORTS                         NAMES
559e5176695c   quay.io/osism/nova-compute:27.1.1.20230919                 "dumb-init --single-…"   5 minutes ago   Up 5 minutes (healthy)                                 nova_compute
31248d71ab7d   quay.io/osism/nova-libvirt:8.0.0.20230919                  "dumb-init --single-…"   6 minutes ago   Up 6 minutes (healthy)                                 nova_libvirt
9292030d706c   quay.io/osism/nova-ssh:27.1.1.20230919                     "dumb-init --single-…"   6 minutes ago   Up 6 minutes (healthy)                                 nova_ssh
fda4b6fb30c8   quay.io/osism/neutron-metadata-agent:22.0.3.20230919       "dumb-init --single-…"   2 hours ago     Up 2 hours (healthy)                                   neutron_ovn_metadata_agent
0e3ec450b668   quay.io/osism/ceilometer-compute:20.0.1.20230919           "dumb-init --single-…"   6 hours ago     Up 6 hours (healthy)                                   ceilometer_compute
25ff9702e0e5   quay.io/osism/prometheus-libvirt-exporter:6.0.0.20230919   "dumb-init --single-…"   6 hours ago     Up 6 hours                                             prometheus_libvirt_exporter
1bff2e29923b   quay.io/osism/prometheus-cadvisor:0.45.0.20230919          "dumb-init --single-…"   6 hours ago     Up 6 hours                                             prometheus_cadvisor
602832daf237   quay.io/osism/prometheus-node-exporter:1.4.0.20230919      "dumb-init --single-…"   6 hours ago     Up 6 hours                                             prometheus_node_exporter
d4de2f32cdf8   quay.io/osism/ovn-controller:23.6.1.20230919               "dumb-init --single-…"   6 hours ago     Up 6 hours                                             ovn_controller
3bf43ae5a94f   quay.io/osism/openvswitch-vswitchd:3.1.2.20230919          "dumb-init --single-…"   7 hours ago     Up 7 hours (healthy)                                   openvswitch_vswitchd
ebc048b02ab2   quay.io/osism/openvswitch-db-server:3.1.2.20230919         "dumb-init --single-…"   7 hours ago     Up 7 hours (healthy)                                   openvswitch_db
4f33dfa66c14   hubblo/scaphandre:0.5.0                                    "scaphandre promethe…"   7 hours ago     Up 7 hours               10.10.129.64:9155->8080/tcp   scaphandre
9b1f6342dc60   quay.io/osism/cron:3.0.20230919                            "dumb-init --single-…"   7 hours ago     Up 7 hours                                             cron
718aecaddde1   quay.io/osism/kolla-toolbox:16.1.1.20230919                "dumb-init --single-…"   7 hours ago     Up 7 hours                                             kolla_toolbox
f6f9422c1853   quay.io/osism/fluentd:4.5.1.20230919                       "dumb-init --single-…"   7 hours ago     Up 7 hours                                             fluentd
```
