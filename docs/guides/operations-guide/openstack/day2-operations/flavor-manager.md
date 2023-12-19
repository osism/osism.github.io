---
sidebar_label: Flavor Manager
sidebar_position: 51
---
# Flavor Manager

## Overview

The OpenStack Flavor Manager manages the creation, modification, and removal of flavors.
It operates as a facilitator that orchestrates compute flavors in alignment
with the standard [SCS-0100: Flavor Naming](https://docs.scs.community/standards/iaas/scs-0100)
by utilizing YAML files provided by the SCS project.

## Installation

The OpenStack Flavor Manager can be used via the OSISM CLI. This is the preferred way to use it.
No installation is then required. It is used via `osism manage flavors`.

For use independent of OSISM install the `openstack-flavor-manager` package with pip. It is likely
that additional dependencies such as `pkg-config` or `libssl-dev` must be installed in advance.

```bash
$ pip install openstack-flavor-manager
```

Or clone the repository [osism/openstack-flavor-manager](https://github.com/osism/openstack-flavor-manager)
and use the OpenStack Flavor Manager from source with tox.

```bash
$ tox -- --help
```

## Usage

There must be a `clouds.yml` and a `secure.yml` file in the directory where the OpenStack Flavor Manager
will be executed. When using the OSISM CLI, the files are expected in `environments/openstack`
in your configuration repository.

The cloud profile to be used can be specified via the optional `--cloud` parameter.
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

To create the mandatory flavors by the [SCS-0100: Flavor Naming](https://docs.scs.community/standards/iaas/scs-0100)
standard, you run:

```bash
$ openstack-flavor-manager
```

To create the recommended flavors by the SCS Flavor Naming Standard, you run:

```bash
$ openstack-flavor-manager --recommended
```

The output should look like this:

```
2023-09-20 13:03:14 | INFO     | Flavor SCS-1V-4 created
2023-09-20 13:03:14 | INFO     | Flavor SCS-2V-8 created
2023-09-20 13:03:14 | INFO     | Flavor SCS-4V-16 created
2023-09-20 13:03:14 | INFO     | Flavor SCS-8V-32 created
...
```

All recommended flavors are now be available in your OpenStack environment.
Check yourself by running: 

```bash
$ openstack --os-cloud admin flavor list
```

## Definitions

There are two flavor definitions available by default. One for
[SCS](https://raw.githubusercontent.com/SovereignCloudStack/standards/main/Tests/iaas/SCS-Spec.MandatoryFlavors.verbose.yaml)
and one for [OSISM](https://raw.githubusercontent.com/osism/openstack-flavor-manager/main/flavors.yaml).
Each definition has its own set of mandatory and recommended flavors. The definition of OSISM contains
all definitions of SCS as well as some others.

To run the OpenStack Flavor Manager with a specific definition, either `scs` or `osism`,
use the optional `--name` parameter. By default the [SCS-0100: Flavor Naming](https://docs.scs.community/standards/iaas/scs-0100)
standard definition will be used.

```
$ openstack-flavor-manager --name osism
```

## Name parser and generator

A generator and parser for flavor names according to the SCS standard is available on
[flavors.scs.community](https://flavors.scs.community).

The flavor name `SCS-2V-4-20s` is inserted in field `Flavor name`:

<img
  src={require('./images/flavor-manager/flavors-1.png').default}
  width="50%"
/>

The flavor `SCS-2V-4-20s` translated is
`2 generic x86-64 vCPUs with 4.0 GiB RAM and SSD 20GB root volume`:

<img
  src={require('./images/flavor-manager/flavors-2.png').default}
  width="50%"
/>
