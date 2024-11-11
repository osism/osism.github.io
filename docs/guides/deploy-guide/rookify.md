---
sidebar_label: Rookify (technical preview)
sidebar_position: 51
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy Rookify: Migrate to Rook from Ceph-Ansible (Technical Preview)

:::warning

Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_.
Nevertheless, it is **strongly advised** to test Rookify in a controlled environment first, such as the [OSISM testbed](https://github.com/osism/testbed). Additionally ensure that precautionary backups are made and all other necessary safety measures are in place.

:::

It is currently recommended to install Rookify on your local machine and connect through VPNs to the target system (the one where Ceph-Ansible needs to be "rookified" 😉).

Rookify operates `in place`, meaning no parallel nodes are required. As noted earlier, Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_, but given the complexity of infrastructure, precautionary backups and safety measures are highly recommended.

For a condensed summary of the information covered here, refer to the [Rookify GitHub repository](https://github.com/SovereignCloudStack/rookify).

## Prerequisites & Requirements

- A functioning Ceph cluster deployed using traditional methods.
- Access to a Kubernetes cluster with sufficient resources to host the migrated Ceph cluster.
- Kubernetes nodes must be deployed on at least the OSD nodes.
- Monitor and OSD daemons should stay in place. Former to ensure that the Ceph endpoints do not change during migration, the later ones to have access to the underlying hardware.
- Rook operator version 1.13 or higher installed on the Kubernetes cluster.
- `radoslib` version 2.0.0 installed.
- For a _dockerized setup_, `docker` and `docker compose` are required.
- In order to use the Makefile, `GNU make` is required.

## Manual Installation

### Download or Clone the Repository

Clone or download Rookify from the [repository](https://github.com/SovereignCloudStack/rookify).

### Install and Run Locally (without Docker)

1.  Navigate to the tool directory:

```bash
cd rookify
```

2. To install Rookify locally, Python's `virtualenv` will be used (Note: This will install `pre-commit` in your local user user context):

:::tip

Checkout the included options in the `Makefile` by typing `make`.

:::

```
make setup
```

This command also verifies if the required Python library `radoslib` is installed. Ensure it is available on your Linux distribution.

:::tip

Before running Rookify, check all available options by using `rookify --help`.

:::

To run Rookify you can either run it directly from within Python's `virtualenv` or with help of the Makefile:

```bash
# directly
./.venv/bin/rookify --help
# using make
make run-local-rookify
```

### Install and Run from within a Container

1. Navigate to the tool directory:

2. To install Rookify in a container, you can use either Podman or Docker (Note: In both cases, Python’s `radoslib` library must be installed locally):

```
make check-radoslib
make up
```

This command uses `docker compose`, so ensure it is installed as well.

To run Rookify, you can either enter the container and run it from there or use `make run-rookify`.

:::note

Before running rookify, it's useful to check all options by using `rookify --help`.

:::
