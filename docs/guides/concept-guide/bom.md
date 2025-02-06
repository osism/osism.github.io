---
sidebar_label: Bill of Materials
sidebar_position: 50
---

# Bill of Materials

:::info

The brands, models and configurations listed are examples. There is no
single best specification for building a cloud pod. It always depends very
much on the requirements of the cloud pod and the situation. The examples
are not minimal and include various preferences of ours. The choice of
hardware always depends very much on the requirements, the available budget
and also the future plans of the cloud pod. There is no universal hardware
recommendation that fits all cases. These are all just examples.

:::

## Control nodes

A control node is responsible for running all or most of the OpenStack
services that manage API services and their associated runtimes. These
nodes are essential for users to interact with the cloud pod and maintain
its managed state.

However, control nodes typically do not run user virtual machines. It is
therefore advisable to replicate the control nodes to ensure high availability
and fault tolerance. A good starting point for achieving RAFT quorum is to have
three control nodes.

* 2x SSD with at least 480 GByte for the operating system
* 4x NVMe with at least 960 GByte for the services
* 128 GByte memory (it should be possible to upgrade to 256 GByte, or use 256
  GByte directly)
* Dual port NIC with 25G or 100G (depending on which leaf switches are used)
* 2 CPU sockets each with at least 32 cores or 1 CPU socket with at least 64 cores

Real world example:

* https://www.supermicro.com/de/products/system/clouddc/1u/sys-121c-tn10r

## Compute nodes

Compute nodes are dedicated to running users' virtual machines. They do not
host API services, storage services or network routers, other than the basic
network infrastructure required to connect virtual machines.

* 2x SSD or NVMe with at least 480 GByte for the operating system
* 2x NVMe with at least 1.92 TByte for local storage recommended (if this is not implemented
  at the start, the model should be selected so that NVMe devices can be added later,
  the size depends on which CPU and how much memory is used, 7.68 TByte is more likely to be used)
* Dual port NIC with 25G or 100G (depending on which leaf switches are used)
* CPU sockets and memory depends on the requirement

Real world example:

* https://www.supermicro.com/de/products/twin

## Storage nodes

A dedicated storage node runs only storage services. This can be necessary in larger
deployments to protect the storage services from ressource starvation through user
workloads.

Read the [Ceph hardware recommendations](https://docs.ceph.com/en/latest/start/hardware-recommendations/) first.

* 2x SSD or NVMe with at least 480 GByte for the operating system
* Dual port NIC with 100G (we recommend always using 100G for storage nodes)
* Storage devices depends on the requirement
* CPU sockets and memory depends on the storage devices used

## Network nodes

A dedicated network node runs only network services. This is normally necessary to be
able to map safety zones. External networks terminate on the network nodes.

Real world example:

* [Supermicro SuperServer SYS-110D-8C-FRAN8TP](https://www.supermicro.com/en/products/system/iot/1u/sys-110d-8c-fran8tp)

  * 2x SSD or NVMe with at least 480 GByte for the operating system
  * 2x DIMM slots with 32 GByte modules, leave 2 DIMM slots open for later expansion
  * If required, an additional dual port 25G or 100G NIC in the PCIe expansion slots
  * Intel Xeon Processor D-2733NT (this is onboard and not selectable)

## Manager nodes

The manager node, also known as the deploy node or deployment node, is designated
to manage the deployment process of all services. It is often also utilized to host
components of the monitoring services. It serves as the operator's entry point into
the cloud pod for operations.

* 2x SSD or NVMe with at least 1.92 TByte for the operating system and the services
* 64 GByte memory (it should be possible to upgrade to 128 GByte, or use 128 GByte directly)
* Dual port NIC with 25G or 100G (depending on which leaf switches are used)
* 1 CPU socket with at least 16 cores

Real world example:

* https://www.supermicro.com/de/products/system/clouddc/1u/sys-121c-tn10r

## Switches

### Management switches

* 1G: [Edgecore AS4610-54T](https://www.edge-core.com/product/as4610-54t/)
* 10G: [Edgecore DCS202 - AS5835-54T](https://www.edge-core.com/product/dcs202/)

### Leaf switches

It is recommended to always use 100G for the data plane and the storage nodes.
Especially when using all-flash storage nodes, there is then enough bandwidth
available. The more and the larger flash devices you use, the more bandwidth is
required.

With the leaf switches for the compute plane, it depends on how large the compute
nodes are. The more CPU sockets/cores and the more memory the compute nodes have,
the more bandwidth is required on the compute nodes. Depending on how large the racks
are (or better how much power you can use in it), it may make sense to work with 100G
switches for the compute plane or with 25G switches if 4x 25G per compute node are used
instead of 2x 25G per compute node (if the compute nodes are large enough).

* 25G: [Edgecore DCS203 - AS7326-56X](https://www.edge-core.com/product/dcs203/)
* 100G: [Edgecore DCS204 - AS7726-32X](https://www.edge-core.com/product/dcs204/)

### Spine switches

* 100G: [Edgecore DCS204 - AS7726-32X](https://www.edge-core.com/product/dcs204/)
* 400G: [Edgecore DCS510 - AS9716-32D](https://www.edge-core.com/product/dcs510/)

## Network interface cards
