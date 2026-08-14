---
sidebar_label: OpenStack
sidebar_key: operations-guide-openstack
---

# OpenStack

## Create an external network

The play `network-external` is available and usable as of OSISM 7.0.6.

```bash
osism apply network-external
```

Available parameters for the OpenStack Environment (`environments/openstack/configuration.yml`).

| Parameter                                  | Default            |
|:-------------------------------------------|:-------------------|
| network_external_allocation_pool_end       | "192.168.112.200"  |
| network_external_allocation_pool_start     | "192.168.112.100"  |
| network_external_cidr                      | "192.168.112.0/20" |
| network_external_cloud                     | admin              |
| network_external_gateway_ip                | "192.168.112.5"    |
| network_external_name                      | public             |
| network_external_provider_network_type     | flat               |
| network_external_provider_physical_network | physnet1           |
| network_external_state                     | present            |

## Reboot a compute node

1. Live migrate all instances running on the compute node
   with the help of the [OpenStack Resource Manager](./tools/resource-manager.md#live-migration)

2. Ensure that no more instances are running on the compute node

   ```bash
   ps ax | grep qemu
   ```

3. Reboot the compute node

   ```bash
   osism apply reboot -l NODE -e ireallymeanit=yes
   ```

4. Wait for the compute node to reboot

5. Re-enable the compute service

   ```bash
   openstack --os-cloud admin compute service set --enable --disable-reason "" NODE nova-compute
   ```

6. Check compute service

   ```bash
   openstack --os-cloud admin compute service list --host NODE --service nova-compute
   ```

## Add a new compute node

1. Add the operator user

   ```bash
   osism apply operator -u osism -l NODE
   ```

2. Run the bootstrap

   ```bash
   osism apply bootstrap -l NODE
   ```

3. When a routed network fabric is used deploy the FRR service (optional)

   ```bash
   osism apply frr -l NODE
   ```

4. Deploy logging service and Prometheus exporters

   ```bash
   osism apply common -l NODE
   osism apply prometheus -l NODE
   osism apply scaphandre -l NODE
   ```

5. Deploy network services

   ```bash
   osism apply openvswitch -l NODE
   osism apply ovn -l NODE
   osism apply neutron -l NODE
   ```

   If you do not use the OVN SDN skip `osism apply ovn -l NODE`.

6. Deploy compute services

   ```bash
   osism apply nova -l NODE
   ```

7. Deploy telemetry services (optional)

   ```bash
   osism apply ceilometer -l NODE
   ```

8. Deploy Netdata service (optional)

   ```bash
   osism apply netdata -l NODE
   ```

9. Add compute node to Prometheus monitoring

   ```bash
   osism apply prometheus -l monitoring
   ```

10. Refresh the `/etc/hosts` file

    ```bash
    osism apply hosts
    ```

11. Refresh the SSH client configuration file

    ```bash
    osism apply sshconfig
    ```

12. Add compute node to the known hosts file

    ```bash
    osism apply known-hosts
    ```

Containers that run on a compute node. Versions may differ. There is no `ceilometer_compute` container
if you have not deployed the optional OpenStack telemetry service.

```console
$ docker ps
CONTAINER ID   IMAGE                                                                                 COMMAND                  CREATED         STATUS                   PORTS                         NAMES
559e5176695c   registry.osism.tech/kolla/release/2025.1/nova-compute:31.3.1.20260615                 "dumb-init --single-…"   5 minutes ago   Up 5 minutes (healthy)                                 nova_compute
31248d71ab7d   registry.osism.tech/kolla/release/2025.1/nova-libvirt:10.0.0.20260615                 "dumb-init --single-…"   6 minutes ago   Up 6 minutes (healthy)                                 nova_libvirt
9292030d706c   registry.osism.tech/kolla/release/2025.1/nova-ssh:31.3.1.20260615                     "dumb-init --single-…"   6 minutes ago   Up 6 minutes (healthy)                                 nova_ssh
fda4b6fb30c8   registry.osism.tech/kolla/release/2025.1/neutron-metadata-agent:26.0.4.20260615       "dumb-init --single-…"   2 hours ago     Up 2 hours (healthy)                                   neutron_ovn_metadata_agent
0e3ec450b668   registry.osism.tech/kolla/release/2025.1/ceilometer-compute:24.0.1.20260615           "dumb-init --single-…"   6 hours ago     Up 6 hours (healthy)                                   ceilometer_compute
25ff9702e0e5   registry.osism.tech/kolla/release/2025.1/prometheus-libvirt-exporter:2.2.0.20260615   "dumb-init --single-…"   6 hours ago     Up 6 hours                                             prometheus_libvirt_exporter
1bff2e29923b   registry.osism.tech/kolla/release/2025.1/prometheus-cadvisor:0.49.2.20260615          "dumb-init --single-…"   6 hours ago     Up 6 hours                                             prometheus_cadvisor
602832daf237   registry.osism.tech/kolla/release/2025.1/prometheus-node-exporter:1.8.2.20260615      "dumb-init --single-…"   6 hours ago     Up 6 hours                                             prometheus_node_exporter
d4de2f32cdf8   registry.osism.tech/kolla/release/2025.1/ovn-controller:25.3.1.20260615               "dumb-init --single-…"   6 hours ago     Up 6 hours                                             ovn_controller
3bf43ae5a94f   registry.osism.tech/kolla/release/2025.1/openvswitch-vswitchd:3.5.1.20260615          "dumb-init --single-…"   7 hours ago     Up 7 hours (healthy)                                   openvswitch_vswitchd
ebc048b02ab2   registry.osism.tech/kolla/release/2025.1/openvswitch-db-server:3.5.1.20260615         "dumb-init --single-…"   7 hours ago     Up 7 hours (healthy)                                   openvswitch_db
4f33dfa66c14   hubblo/scaphandre:0.5.0                                                               "scaphandre promethe…"   7 hours ago     Up 7 hours               10.10.129.64:9155->8080/tcp   scaphandre
9b1f6342dc60   registry.osism.tech/kolla/release/2025.1/cron:3.0.20260615                            "dumb-init --single-…"   7 hours ago     Up 7 hours                                             cron
718aecaddde1   registry.osism.tech/kolla/release/2025.1/kolla-toolbox:20.4.1.20260615                "dumb-init --single-…"   7 hours ago     Up 7 hours                                             kolla_toolbox
f6f9422c1853   registry.osism.tech/kolla/release/2025.1/fluentd:5.0.9.20260615                       "dumb-init --single-…"   7 hours ago     Up 7 hours                                             fluentd
```

## Remove a compute node

1. In the configuration repository remove the compute node everywhere. Then update the configuration
   repository on the manager with `osism apply configuration`

2. Live migrate all instances running on the compute node
   with the help of the [OpenStack Resource Manager](./tools/resource-manager.md#live-migration)

3. Evacuate all instances on the compute node
   with the help of the [OpenStack Resource Manager](./tools/resource-manager.md#evacuation)

4. Ensure that no more instances are running on the compute node

   ```bash
   ps ax | grep qemu
   ```

5. Stop all OpenStack compute services on the compute node

   ```bash
   systemctl stop kolla-nova_ssh-container.service
   systemctl stop kolla-nova_libvirt-container.service
   systemctl stop kolla-nova_compute-container.service
   ```

6. Delete the compute service

   ```console
   $ openstack --os-cloud admin compute service list --host NODE
   +--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+
   | ID                                   | Binary         | Host    | Zone     | Status   | State | Updated At                 |
   +--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+
   | 90345eb5-cf2f-47ef-becc-758ee36fb132 | nova-compute   | NODE    | nova     | enabled  | down  | 2023-12-21T11:53:00.000000 |
   +--------------------------------------+----------------+---------+----------+----------+-------+----------------------------+
   ```

   ```bash
   openstack --os-cloud admin compute service delete 90345eb5-cf2f-47ef-becc-758ee36fb132
   ```

7. Stop all OpenStack network services on the compute node

   ```bash
   systemctl stop kolla-neutron_ovn_metadata_agent-container.service
   systemctl stop kolla-ovn_controller-container.service
   ```

8. Delete the network services

   ```console
   $ openstack --os-cloud admin network agent list --host NODE
   +--------------------------------------+----------------------+---------+-------------------+-------+-------+----------------------------+
   | ID                                   | Agent Type           | Host    | Availability Zone | Alive | State | Binary                     |
   +--------------------------------------+----------------------+---------+-------------------+-------+-------+----------------------------+
   | 0a5708ea-ba8b-5fde-8187-c6b24d3cf5ed | OVN Metadata agent   | NODE    |                   | :-)   | UP    | neutron-ovn-metadata-agent |
   | NODE                                 | OVN Controller agent | NODE    |                   | :-)   | UP    | ovn-controller             |
   +--------------------------------------+----------------------+---------+-------------------+-------+-------+----------------------------+

   $ openstack --os-cloud admin network agent delete 0a5708ea-ba8b-5fde-8187-c6b24d3cf5ed
   $ openstack --os-cloud admin network agent delete NODE
   ```

9. Refresh the facts

   ```bash
   osism apply facts
   ```

10. Refresh the `/etc/hosts` file

    ```bash
    osism apply hosts
    ```

11. Refresh the SSH client configuration file

    ```bash
    osism apply sshconfig
    ```

12. Remove compute node from Prometheus monitoring

    ```bash
    osism apply prometheus -l monitoring
    ```

13. Remove compute node from the known hosts file

    ```bash
    osism apply known-hosts
    ```
