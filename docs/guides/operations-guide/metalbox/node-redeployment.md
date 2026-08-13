---
sidebar_label: Node redeployment
sidebar_position: 20
---

# Node redeployment

Redeploying a node that is already in service consists of two parts: reprovisioning it
with a fresh base system, and deploying the services of its role again. The first part
is the same for every node type, the second depends on the role the node has.

Which system each command runs on is given with every step, see
[Where the commands run](./index.md#where-the-commands-run).

Within a role there are normally redundant systems, so a single node can be
reprovisioned while the environment keeps running. Check the quorum of the services on
the node before taking it out, and shut the node down cleanly rather than cutting the
power.

:::warning

Compute nodes carry workload. Their instances have to be migrated away and the node has
to be removed from the OpenStack environment **before** it is reprovisioned. See
[Compute](#compute) for the steps around the generic procedure below.

:::

The examples below use the node `node101`.

## Reprovisioning

**MetalBox.** Shut the node down. This can be done on the node itself or as a graceful
power-off request through the BMC:

```bash
osism baremetal power off --soft node101
```

**MetalBox.** Watch the power state until the node is off:

```bash
watch osism baremetal list
```

**MetalBox.** Reprovision the node. Either in a single step:

```bash
osism baremetal deploy --rebuild node101
```

Or as an explicit undeploy:

```bash
osism baremetal undeploy node101
```

followed by a deploy:

```bash
osism baremetal deploy node101
```

The second form leaves the node in `available` in between. That allows further
maintenance before the node is put back into service, such as replacing hardware,
erasing the disks with `osism baremetal clean`, or running a burn-in. If hardware is
replaced at this point, the data in NetBox has to be updated as well, see
[Hardware replacement](./hardware-replacement.md).

**MetalBox.** During provisioning the node passes through several states and ends in
`active` once the operating system starts to boot. Follow it with:

```bash
watch osism baremetal list
```

**Manager.** Reaching `active` is not the same as being reachable. Check the network
connectivity of the node, either by polling:

```bash
osism apply ping -- --limit node101
```

or by blocking until the node is reachable via SSH:

```bash
osism apply wait-for-connection -- --limit node101
```

## Deployment of the services

**Manager.** Prepare the reprovisioned node. These steps are the same for every role:

```bash
osism sync inventory
osism apply ping
osism apply facts
osism apply hosts
osism apply bootstrap -- --limit node101
osism apply sshconfig
osism apply known-hosts
```

Why some of these commands are run without `--limit` is explained in
[Node deployment](./node-deployment.md#hand-the-node-over-to-the-manager).

**Manager.** Apply the network configuration, reboot the node so that it takes effect,
and wait for the node to come back:

```bash
osism apply network -- --limit node101
osism apply reboot -- --limit node101 -e ireallymeanit=yes
osism apply wait-for-connection -- --limit node101
```

Everything after this is role-specific.

:::note

The service lists below cover the roles of a standard environment. Depending on the
configuration, further services are deployed on a node. `iscsi` and `multipathd` for
example are only needed in environments that use them. Compare the lists with the
services the environment actually runs.

:::

## Control

:::warning

Before the RabbitMQ service of a control node is redeployed, it has to be removed from
the existing RabbitMQ cluster. The service must be stopped for this, which already
happened when the node was powered off above. Connect to one of the **active** control
nodes and remove the node from the cluster, here for `ctl101`:

```bash
docker exec rabbitmq rabbitmqctl forget_cluster_node rabbit@ctl101
```

:::

**Manager.** Deploy the services of a control node in this order. The runs are limited to
the `control` group, not to the reprovisioned node:

```bash
osism apply common -- --limit control
osism apply loadbalancer -- --limit control
osism apply redis -- --limit control
osism apply memcached -- --limit control
osism apply rabbitmq -- --limit control
osism apply mariadb -- --limit control
osism apply ovn -- --limit control
osism apply opensearch -- --limit control
osism apply prometheus -- --limit control
osism apply grafana -- --limit control
osism apply keystone -- --limit control
osism apply glance -- --limit control
osism apply designate -- --limit control
osism apply placement -- --limit control
osism apply cinder -- --limit control
osism apply neutron -- --limit control
osism apply nova -- --limit control
osism apply horizon -- --limit control
```

The limit is the `control` group and not the single node that was reprovisioned. The
control nodes are peers of one another, so a run against one of them alone is not enough:

* The configuration of the other control nodes references the reprovisioned node. The
  peer list in `rabbitmq.conf` and the `wsrep_cluster_address` of MariaDB are generated
  from all members of the group, and every control node needs an `/etc/hosts` entry for
  every other one. Those files are only rewritten on the nodes that are part of the run.
* The playbooks determine the state of a cluster from the hosts of the run. MariaDB for
  example decides from them whether the cluster already exists, whether it is stopped
  and which member is in sync. A run that contains only the freshly installed node
  answers those questions from a node that knows nothing of the running cluster.

Deploying the whole group lets the reprovisioned node join the existing clusters and
keeps the configuration of the other control nodes consistent with it. This is also what
Kolla Ansible requires, see
[Adding new controllers](https://docs.openstack.org/kolla-ansible/latest/user/adding-and-removing-hosts.html#adding-new-controllers).

Network and compute nodes are not peers of the other nodes of their role. Their
configuration refers to the control nodes, whose data Ansible collects even when they
are not part of the run, and no other node has to be reconfigured because of them. The
runs for those roles are therefore limited to the single node.

## Network

**Manager.** Deploy the services of a network node:

```bash
osism apply common -- --limit net101
osism apply openvswitch -- --limit net101
osism apply ovn -- --limit net101
osism apply prometheus -- --limit net101
osism apply designate -- --limit net101
osism apply octavia -- --limit net101
```

## Compute

Compute nodes carry workload, so the generic procedure above is framed by additional
steps: the instances have to be migrated away and the node removed from the OpenStack
environment first, and it has to be registered again afterwards. The same steps are
used to decommission and commission hardware, and for maintenance such as replacing
components. In the latter case they are combined with
[Hardware replacement](./hardware-replacement.md).

The examples in this section use the compute node `com101`.

### Removing the node from the environment

**Manager.** Disable the node so that no new instances are scheduled onto it:

```bash
osism manage compute disable com101
```

**Manager.** Migrate the instances of the node to other hypervisors:

```bash
osism manage compute migrate --yes com101
```

**Manager.** Verify that no instances are left on the node:

```bash
osism manage compute list com101
```

**MetalBox.** Once the node is empty, undeploy it and put it into maintenance mode. The
undeploy is only needed for a complete reinstallation. To only shut the node down, skip
it and use `osism baremetal power off com101` after setting maintenance mode:

```bash
osism baremetal undeploy com101
osism baremetal maintenance set com101
```

Maintenance mode is what takes the node out of the active inventory of the Manager, so
that the Manager can still be used for the rest of the environment.

**Manager.** Pick up the change:

```bash
osism sync inventory
```

**Manager.** Remove the OpenStack resources that belong to the node. Skip this if the
state on the node is kept and the node is put back into service unchanged, which is the
case when no reinstallation is done:

```bash
openstack --os-cloud admin compute service list -f value -c ID --host com101 | while read -r ID; do \
    openstack --os-cloud admin compute service delete $ID; done
openstack --os-cloud admin network agent list -f value -c ID --host com101 | while read -r ID; do \
    openstack --os-cloud admin network agent delete $ID; done
```

The node is now removed from the OpenStack environment and is managed through the
MetalBox only.

:::warning

Avoid booting the compute node again with the system that is still installed on it, as it
would register itself in the OpenStack environment again. If that happens, the steps
above have to be repeated.

:::

### Putting the node back into service

If hardware of the node was replaced while it was out of service, bring the data in
NetBox in line with it first, see [Hardware replacement](./hardware-replacement.md).

**MetalBox.** If the node is already recorded on the MetalBox, remove the maintenance
mode:

```bash
osism baremetal maintenance unset com101
```

**MetalBox.** If provisioning-relevant parameters such as MAC addresses have changed, or
if the node was not managed on a MetalBox before, further fields in NetBox have to be
updated. This happens automatically with a sync of the inventory, after which the data is
synchronized with the baremetal service:

```bash
osism sync inventory
osism sync ironic
```

**MetalBox.** Provision the node with the operating system. This is only needed if the
node was undeployed above. Otherwise start it again with
`osism baremetal power on com101`:

```bash
osism baremetal deploy com101
```

**Manager.** Continue with
[Deployment of the services](#deployment-of-the-services) to take the node back into
the inventory and bootstrap it, with `--limit com101` in place of `--limit node101`.

### Deploying the compute services

:::note

If the compute node uses local storage for Nova, that storage has to be prepared before
Nova is deployed, and any leftovers of a previous installation have to be cleared on the
node first. How local storage is laid out differs per environment and is not covered by
the OSISM tooling, so this step is done manually or with a custom playbook.

:::

**Manager.** Deploy the services of the compute node:

```bash
osism apply common -- --limit com101
osism apply openvswitch -- --limit com101
osism apply ovn -- --limit com101
osism apply prometheus -- --limit com101
osism apply neutron -- --limit com101
osism apply nova -- --limit com101
```

:::note

If the node was not reinstalled, its compute service was never deleted and still carries
the `disable` from the beginning of this procedure. Enable it again so that instances are
scheduled onto it:

```bash
osism manage compute enable com101
```

After a complete reinstallation this is not needed. The compute service is registered
again from scratch and is enabled by default.

:::

The node is set up as an OpenStack compute node in the OSISM environment again. Depending
on the previous configuration, it still has to be placed into the correct availability
zone.
