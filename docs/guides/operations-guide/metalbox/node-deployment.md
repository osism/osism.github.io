---
sidebar_label: Node deployment
sidebar_position: 10
---

# Node deployment

This page describes the generic case: a node that is described in NetBox but has never
been provisioned is brought to a running operating system and handed over to the OSISM
Manager of the CloudPod. Redeploying a node that is already in service is described in
[Node redeployment](./node-redeployment.md).

Which system each command runs on is given with every step, see
[Where the commands run](./index.md#where-the-commands-run).

## Prerequisites

* The MetalBox is installed and the OpenStack services on it are deployed, see
  [Installation of the MetalBox](../../deploy-guide/metalbox.md).
* The Ironic images are uploaded to `/opt/httpd/data/root` on the MetalBox.
* The node is described in NetBox: the device with its site, its MAC addresses, its
  addressing, and the `ironic_parameters` custom field that carries the driver and BMC
  information. If NetBox still has to be updated, roll the change out as described in
  [Update of the NetBox data](../../upgrade-guide/metalbox/data-updates.md#update-of-the-netbox-data);
  what to check when hardware was replaced is described in
  [Hardware replacement](./hardware-replacement.md).

## Provision states

Ironic moves a node through provision states, and each of the `osism baremetal`
commands only acts on nodes in specific ones. `provide` and `deploy` additionally skip
nodes that are in maintenance mode.

| Command                            | Acts on nodes in                                     | Result                                   |
|:-----------------------------------|:-----------------------------------------------------|:-----------------------------------------|
| `osism baremetal provide`          | `manageable`                                         | `available`                              |
| `osism baremetal clean`            | `available`                                          | erases the disks, node stays `available` |
| `osism baremetal burnin`           | `available`                                          | runs the selected burn-in tests          |
| `osism baremetal deploy`           | `available`, `deploy failed`                         | `active`                                 |
| `osism baremetal deploy --rebuild` | `active`, `error`                                    | `active`                                 |
| `osism baremetal undeploy`         | `active`, `wait call-back`, `deploy failed`, `error` | `available`                              |

A node that is in none of the listed states is skipped with a warning naming its
current state, so a command that appears to do nothing is usually a node in an
unexpected state rather than a failure.

The states above are the ones the commands are built around. The complete state
machine, including the intermediate and failure states a node passes through when a
transition does not follow the expected path, is documented in
[Ironic's node states](https://docs.openstack.org/ironic/latest/user/states.html). It is
worth consulting whenever a node ends up in a state that is not listed here.

## Register the node in Ironic

**MetalBox.** Read the inventory from NetBox and create or update the corresponding
node in Ironic:

```bash
osism sync inventory
osism sync ironic
```

`osism sync ironic` is what turns the NetBox device into an Ironic node. Run it again
whenever provisioning-relevant data in NetBox has changed, for example after a network
card was replaced.

**MetalBox.** Check that the node is known and see which state it is in:

```bash
osism baremetal list
```

The output lists every node with its power state, provision state and maintenance
flag. To see the device role from NetBox as well, add `--netbox`; to look at a single
group of nodes, filter with `--provision-state` or `--maintenance`.

## Prepare the node

**MetalBox.** `osism sync ironic` already takes a newly registered node from `enroll`
through `manageable` to `available`, which is the state a deployment starts from.
Automated cleaning is skipped during that transition. A node that is left in
`manageable`, for example after a failed cleaning, is moved on with:

```bash
osism baremetal provide node101
```

For hardware that is put into service for the first time, it is worth checking it
before deploying anything on it. The burn-in reads out the system and exercises the
selected components:

```bash
osism baremetal burnin --cpu --memory --disk node101
```

To erase the disks of a node before deploying, use:

```bash
osism baremetal clean node101
```

Cleaning runs in the `manageable` state, so the command moves the node there and back
by itself. On nodes with a RAID interface the RAID configuration is deleted as part of
it.

## Deploy the node

**MetalBox.** Write the operating system to the node:

```bash
osism baremetal deploy node101
```

The node boots the ironic-python-agent over virtual media, pulls the target image from
the MetalBox and writes it to disk. The configuration for the first boot is generated
from the `local_context_data` of the NetBox device, so the node configures itself when
it comes up.

Provisioning takes a while and ends in the `active` state. Follow it with:

```bash
watch osism baremetal list
```

## Hand the node over to the Manager

Reaching `active` means the operating system has been written and the node is booting.
Before any services can be deployed, the node has to be reachable over the network.

**Manager.** Pick the new node up into the inventory of the CloudPod:

```bash
osism sync inventory
```

**Manager.** Wait until the node answers. The first command reports the current state,
the second blocks until the node is reachable via SSH:

```bash
osism apply ping -- --limit node101
osism apply wait-for-connection -- --limit node101
```

**Manager.** Bootstrap the node:

```bash
osism apply facts
osism apply hosts
osism apply bootstrap -- --limit node101
osism apply sshconfig
osism apply known-hosts
```

`bootstrap` only has to touch the new node, so it is limited to it. `facts`, `hosts`,
`sshconfig` and `known-hosts` are run without `--limit` because they generate files from
the data of all nodes: `/etc/hosts` is written on every node and has to contain the new
node afterwards, and the `.ssh/config` and `known_hosts` of the Manager get an entry per
node. Limiting them to the new node would leave the other nodes without its address and
would write those files from incomplete data.

**Manager.** Apply the network configuration, reboot the node so that it takes effect,
and wait for the node to come back:

```bash
osism apply network -- --limit node101
osism apply reboot -- --limit node101 -e ireallymeanit=yes
osism apply wait-for-connection -- --limit node101
```

The node is now a managed node of the CloudPod. What has to be deployed on top of this
depends on the role of the node:

* For the services of a full deployment, see
  [Deployment of the services](../../deploy-guide/services/index.md).
* For the role-specific steps when a single node is put back into service, see
  [Node redeployment](./node-redeployment.md).
