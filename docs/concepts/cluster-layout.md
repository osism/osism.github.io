---
sidebar_label: Cluster Layout
sidebar_position: 25
---

# Cluster layout

The sections below describe the recommended number of nodes for a standard OSISM
CloudPod. These numbers are not arbitrary — they are driven by quorum
requirements of the distributed systems running inside the cluster.

A **quorum** is the minimum number of members a distributed system needs to
agree on a decision before it can proceed safely. More than half of all members
must be reachable and in agreement. If fewer members are available than this
threshold, the cluster stops accepting writes rather than risk inconsistency or
data corruption. This is why an even number of nodes (e.g. 2 or 4) provides no
more fault tolerance than the odd number below it: both 2-node and 1-node
clusters can not tolerate any failures before losing quorum, and both 4-node
and 3-node clusters can only tolerate one failure. Odd node counts are therefore
preferred.

With an even number of nodes, a network partition that splits the cluster into
two equal halves leaves neither side with a majority — both halves stop
accepting writes.  Worse, if the cluster does not enforce strict quorum, both
halves may continue independently and diverge, a situation known as
**split-brain**. Reconciling split-brain state often requires manual
intervention and can result in data loss.

## Sizing

### Minimal lab

The smallest possible layout to run a functional OSISM deployment on physical
hardware — suitable for development, evaluation, or a home lab. No high
availability or Ceph storage self-healing is required, but Ceph still needs
3 nodes to satisfy the default replication factor of 3.

The manager, control, Ceph (MON+OSD), network and compute roles are all
co-located on the same 3 nodes, bringing the total to **3 physical nodes**.

| Role              | Nodes | Hosted on     |
|-------------------|-------|---------------|
| Manager           | 1     | control node  |
| Control           | 3     | dedicated     |
| Network           | 1     | control node  |
| Compute           | 3     | control nodes |
| Storage (MON+OSD) | 3     | control nodes |

### Virtual testbed

The [OSISM Testbed](../testbed/index.md) is a ready-made environment that
deploys a full OSISM stack on virtual machines inside an existing OpenStack
cloud. Unlike the minimal lab above, it provisions dedicated VMs for each node
and is fully scripted — making it the quickest way to explore OSISM without any
physical hardware. It uses **7 VMs** in total: 1 dedicated manager and 6 nodes
that carry the control, storage, and compute roles.

### Production minimum

The smallest production-grade layout. Satisfies quorum for all control plane
services and the default Ceph replication factor of 3. Two network nodes provide
simple active/passive failover. No Ceph self-healing after a storage node loss —
recovery requires manual repair or replacement of the failed node.

The manager gets its own dedicated node to split cluster management from
workload. Control, Ceph (MON+OSD), and compute roles are co-located on the same
3 nodes. At this scale the overhead of the MON daemons does not warrant
dedicated hardware. Network nodes stay separate, bringing the total to
**6 physical nodes**.

| Role              | Nodes | Hosted on     |
|-------------------|-------|---------------|
| Manager           | 1     | dedicated     |
| Control           | 3     | dedicated     |
| Network           | 2     | dedicated     |
| Compute           | 3     | control nodes |
| Storage (MON+OSD) | 3     | control nodes |

### Recommended

The recommended layout for a production CloudPod. All roles run on dedicated
nodes, allowing each node type to be sized independently for its workload and
keeping operational concerns clearly separated.

Five control nodes allow the cluster to maintain quorum and tolerate one
additional failure during a rolling maintenance window. Three network nodes
preserve active/passive failover even while one node is under maintenance.

Ceph MON and OSD are placed on separate dedicated nodes. MON daemons are
lightweight but latency-sensitive — sharing hardware with OSD daemons, which
generate significant I/O, can cause monitor timeouts under load and trigger
false failovers. Dedicated MON nodes also allow the OSD nodes to be sized purely
for storage capacity and throughput. Five nodes for each role allow full
self-healing after the loss of one node without operator intervention.

The total comes to **21+ physical nodes**, scaling with the number of compute
and storage nodes.

| Role     | Nodes | Hosted on |
|----------|-------|-----------|
| Manager  | 1     | dedicated |
| Control  | 5     | dedicated |
| Network  | 3     | dedicated |
| Compute  | 3+    | dedicated |
| Ceph MON | 5     | dedicated |
| Ceph OSD | 4+    | dedicated |

:::warning

Running fewer nodes than the production minimum counts does not just reduce
redundancy — it can cause distributed systems to become unhealthy or
unavailable. See the sections below for details.

:::

## Control nodes and quorum

Control nodes run clustered services that rely on a quorum to elect a leader and
to remain consistent: MariaDB Galera, RabbitMQ, etcd, and others all use
variants of the Raft or Paxos consensus algorithm. With **fewer than 3 control
nodes**, these clusters cannot tolerate the loss of a single node — the loss of
one node out of two leaves the remaining node unable to form a majority and the
service becomes unavailable.

Three control nodes is therefore the **minimum for any deployment**.

## Storage nodes and Ceph replication

Ceph distributes data across OSDs (Object Storage Daemons) using placement
groups. The default replication factor for the pools created by OSISM (for
OpenStack) is **3**, meaning every object is stored on three different OSDs, on
three different hosts.

If your cluster has **fewer than 3 storage nodes**, Ceph cannot satisfy this
replication requirement with the default configuration. The result is that pools
become degraded, Ceph reports a `HEALTH_WARN` or `HEALTH_ERR`, and writes may be
blocked.

With exactly **3 storage nodes**, the replication constraint is satisfied under
normal conditions. However, if one node is lost the cluster immediately becomes
degraded and cannot fully re-replicate the data because there are no spare nodes
to write the third copy to. Recovery is only possible once the failed node is
repaired or replaced.

With **5 storage nodes**, losing one node still leaves 4 nodes available. Ceph
can immediately start re-replicating affected placement groups across the
remaining nodes, returning the cluster to a fully healthy state without operator
intervention. Five storage nodes is therefore the recommended minimum number for
a production CloudPod.

## Network nodes and redundancy

Network nodes terminate external networks and implement security zones. A single
network node is a single point of failure for all external connectivity. Two
network nodes allow active/passive or active/active failover depending on the
routing design.

For environments that require strict security zone separation, network nodes
must be physically separate from control and compute nodes, so plan for
dedicated hardware from the start.
