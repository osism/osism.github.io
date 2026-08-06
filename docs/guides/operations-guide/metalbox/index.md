---
sidebar_label: MetalBox
sidebar_key: operations-guide-metalbox
---

# MetalBox

The MetalBox provisions the bare-metal nodes of a CloudPod through
[OpenStack Ironic](https://docs.openstack.org/ironic/latest/). The following pages
describe how nodes are deployed and redeployed with it.

* [Node deployment](./node-deployment.md) — bring a new, empty node from its NetBox
  entry to a running operating system. This is the generic case and the basis for
  everything else.
* [Node redeployment](./node-redeployment.md) — reprovision a node that is already in
  service and redeploy the services of its role, including the removal and re-addition
  of a compute node with its workload.
* [Hardware replacement](./hardware-replacement.md) — the additional steps needed when
  components of a node have been replaced, for any node type.

The installation of a MetalBox is described in the
[Deploy Guide](../../deploy-guide/metalbox.md), keeping it up to date in the
[Upgrade Guide](../../upgrade-guide/metalbox/index.md), and its architecture in the
[OSISM MetalBox](../../../concepts/metalbox.md) concept.

## Where the commands run {#where-the-commands-run}

The pages in this section switch between different systems, and running a command on
the wrong one is the most common source of confusion:

| Prompt       | System                                                               | Commands                                                                                                        |
|:-------------|:---------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------|
| **MetalBox** | The MetalBox itself, which runs Ironic and the NetBox it is fed from | `osism baremetal …`, `osism sync ironic`, and `osism sync inventory` for the MetalBox' own inventory            |
| **Manager**  | The OSISM Manager of the CloudPod                                    | `osism apply …`, `osism manage compute …`, and `osism sync inventory` for the CloudPod inventory                |
| **Node**     | A bare-metal node itself                                             | The few steps that have to be run on a node directly, such as removing a control node from the RabbitMQ cluster |

The MetalBox and the Manager both run an OSISM Manager and both understand
`osism sync inventory`, but they manage different inventories: the MetalBox drives the
bare-metal life cycle below the CloudPod, the Manager deploys the services on top of
it. The
[OSISM MetalBox](../../../concepts/metalbox.md#osism-manager) concept explains the
split in more detail.
