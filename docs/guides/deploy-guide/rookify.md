---
sidebar_label: Rookify (technical preview)
sidebar_position: 51
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy Rookify: Migrate to Rook from Ceph Ansible (technical preview)

:::warning

Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_.
Nevertheless, it is **strongly advised** to test Rookify in a controlled environment beforehand, such as the [OSISM testbed](https://github.com/osism/testbed). Additionally, ensure that all precautionary backups are taken, and any other necessary safety measures are in place.

:::

Currenlty Rookify is best install it on your own machine and then connected through vpn to you target system (the one where Ceph-Ansible needs to be rookified ;) ).

Rookify runs `in place`, which means that there are no parallel nodes necesssary. As mentioned above, Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_ but infrastructures are complicated, so precautionary backups and safety measure are very much advised.

The [Rookify GitHub repository](https://github.com/SovereignCloudStack/rookify) includes a README.md that provides a condensed summary of the information covered here.

## Prerequisites && Requirements

- A functioning Ceph cluster deployed via traditional methods.
- Access to a Kubernetes cluster with sufficient resources to host the
 migrated Ceph cluster.
  - Kubernetes nodes should be rolled out at least on the OSD nodes
- Rook operator version 1.13 or higher installed in the Kubernetes clu
ster.
- _local development enivornment_ requires radoslib version 2.0.0 inst
alled

## Manual Installation

### Download or Clone the Repository

Clone or download Rookify from the [repository](https://github.com/SovereignCloudStack/rookify).

## Install and Run Locally

1.  Navigate to the tool directory:

```bash
cd rookify
```

2. To install Rookify locally, pythons virtualenv will be used (Note: This will install pre-commit in your local user context):

:::tip

Checkout the included options of the added `Makefile` by simply typing `make`.

:::

```
make setup
```

This command also checks if you have the required python library for `radoslib` installed. Make sure to have it installed on your linux distribution.

:::tip

Before running rookify, first check all options by using `rookify --help`

:::

To run rookify you can either run it directly from within pythons virtualenv or with help of the make file:

```bash
# directly
./.venv/bin/rookify --help
# using make
make run-local-rookify
```

## Install and Run from within a Container

1.  Navigate to the tool directory:

2. To install Rookify into a container, podman or docker can be used (Note: in both cases pythons library for `radoslib` needs to be installed locally):

```
make check-radoslib
make up
```

This command uses `docker compose`, so make sure you have that installed as well.

To run rookify you can either enter the container and run rookify from there or use `make run-rookify`.

:::note

Before running rookify, it can be usefull to check all options by using `rookify --help`

:::
