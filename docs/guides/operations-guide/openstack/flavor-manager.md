---
sidebar_label: Flavor Manager
sidebar_position: 51
---

# Flavor Manager

## Overview

The OpenStack Flavor Manager manages the creation, modification, and removal of flavors within an OpenStack environment.
The OpenStack Flavor Manager operates as a facilitator that orchestrates compute flavors in alignment 
with the [SCS Flavor Naming Standard](https://docs.scs.community/standards/scs-0100-v3-flavor-naming)
by utilizing YAML files provided by the SCS project.

## Installation

Install the `openstack-flavor-manager` package with pip.

```bash
pip3 install openstack-flavor-manager
```

Or clone the repository [osism/openstack-flavor-manager](https://github.com/osism/openstack-flavor-manager)
and use the OpenStack Flavor Manager from source with tox.


```bash
tox -- --help
```

## Usage

There must be a `clouds.yml` and a `secure.yml` file in the directory where the OpenStack Flavor Manager
will be executed. The cloud profile to be used can be specified via the optional `--cloud` parameter.
By default the cloud profile with the name `admin` is used. It must be possible to create and delete
flavors with the used cloud credentials.

```
$ openstack-flavor-manager --help

 Usage: openstack-flavor-manager [OPTIONS]

╭─ Options ────────────────────────────────────────────────────────────────────────────────────╮
│ --name               TEXT  Name of flavor definitions. [default: scs]                        │
│ --debug                    Enable debug logging.                                             │
│ --cloud              TEXT  Cloud name in clouds.yaml. [default: admin]                       │
│ --recommended              Create recommended flavors.                                       │
│ --help                     Show this message and exit.                                       │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

To create the mandatory flavors by the SCS Flavor Naming Standard, you run:

```bash
$ openstack-flavor-manager
```

To create the recommended flavors by the SCS Flavor Naming Standard, you run:

```bash
$ openstack-flavor-manager --recommended
```

The output should look like this:

```
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-1V-4' created.
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-2V-8' created.
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-4V-16' created.
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-8V-32' created.
...
```

All recommended flavors are now be available in your OpenStack environment.
Check yourself by running: 

```bash
openstack --os-cloud admin flavor list
```


## Flavor definitions

There are two flavor definitions available by default. One for
[SCS](https://raw.githubusercontent.com/SovereignCloudStack/standards/main/Tests/iaas/SCS-Spec.MandatoryFlavors.verbose.yaml)
and one for [OSISM](https://raw.githubusercontent.com/osism/openstack-flavor-manager/main/flavors.yaml).
Each definition has its own set of mandatory and recommended flavors.

To run the OpenStack Flavor Manager with a specific definition, either `scs` or `osism`,
use the optional `--name` parameter. By default the [SCS Flavor Naming Standard](https://docs.scs.community/standards/scs-0100-v3-flavor-naming)
definition will be used.

```
$ openstack-flavor-manager --name osism
```
