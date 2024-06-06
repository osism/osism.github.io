---
sidebar_label: Hardware Bill of Materials
sidebar_position: 50
---

# Hardware Bill of Materials

## Control nodes

A control node is responsible for running all or most of the OpenStack
services that manage API services and their associated runtimes. These
nodes are essential for users to interact with the cluster and maintain
its managed state.

However, control nodes typically do not run user virtual machines. It is
therefore advisable to replicate the control nodes to ensure high availability
and fault tolerance. A good starting point for achieving RAFT quorum is to have
three control nodes.

## Compute nodes

Compute nodes are dedicated to running users' virtual machines. They do not
host API services, storage daemons or network routers, other than the basic
network infrastructure required to connect virtual machines.

## Storage nodes

A dedicated storage node runs only storage daemons. This can be necessary in larger
deployments to protect the storage daemons from  ressource starvation through user
workloads.

## Network nodes

A dedicated storage node runs only storage daemons. This setup is essential in
larger deployments to protect the storage daemons from resource starvation
caused by user workloads.

## Manager nodes

The manager node, also known as the deploy node or deployment node, is designated
to manage the deployment process of all services. It is often also utilized to host
components of the monitoring services. It serves as the operator's entry point into
the cluster for operations.

## Switches
