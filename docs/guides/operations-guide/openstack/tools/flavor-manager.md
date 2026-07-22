---
sidebar_label: Flavor Manager
sidebar_position: 51
---
# Flavor Manager

## Overview

The OpenStack Flavor Manager manages the creation, modification, and removal of flavors.
It operates as a facilitator that orchestrates compute flavors in alignment
with the standard [SCS-0100: Flavor Naming](https://docs.scs.community/standards/iaas/scs-0100/)
by utilizing YAML files provided by the SCS project.

There are two ways to use the OpenStack Flavor Manager:

* **[Via the OSISM CLI](#usage-via-the-osism-cli)** with `osism manage flavors`. This is the
  preferred way for operators of an OSISM environment. No separate installation is required.
* **[Standalone](#standalone-usage)** by installing the `openstack-flavor-manager` package
  directly. This is useful when the tool is used independent of OSISM.

Regardless of the path, the available [flavor definitions](#definitions) are the same. The cloud
profile used must be allowed to create and delete flavors. By default the cloud profile with the
name `admin` is used; another profile can be selected with the `--cloud` parameter.

## Usage via the OSISM CLI

No `clouds.yaml` needs to be provided. The cloud credentials are taken from the OSISM configuration
(the `environments/openstack` directory of your configuration repository, where the secrets are
kept in `secure.yml`) that has been deployed to the manager.

```console
$ osism manage flavors --help

usage: osism manage flavors [-h] [--no-wait] [--cloud CLOUD]
                            [--name {cloudpod,scs,osism,local,url}] [--url URL]
                            [--recommended]

options:
  -h, --help            show this help message and exit
  --no-wait             Do not wait until flavor management has been completed
  --cloud CLOUD         Cloud name in clouds.yaml (default: admin)
  --name {cloudpod,scs,osism,local,url}
                        Name of flavor definitions (default: local)
  --url URL             Overwrite the default URL where the flavor definitions
                        are available
  --recommended         Also create recommended flavors
```

To create the mandatory flavors of the selected [flavor definition](#definitions), run (the OSISM
CLI uses the `local` definition by default):

```bash
osism manage flavors
```

To additionally create the recommended flavors of the definition, add the `--recommended`
parameter:

```bash
osism manage flavors --recommended
```

Unlike the [standalone tool](#standalone-usage), the OSISM CLI does not expose the `--limit-memory`
option. Recommended flavors are therefore always filtered with its default limit of 32 GB.

Another definition can be selected with the `--name` parameter, for example the
[`scs` definition](#definitions):

```bash
osism manage flavors --name scs
```

By default the command waits until the flavor management has been completed and streams the output.
Use `--no-wait` to start the task in the background without waiting for it to finish.

## Standalone usage

For use independently of OSISM, the OpenStack Flavor Manager can be installed and run directly.
Install the `openstack-flavor-manager` package with pip. It is likely that additional dependencies
such as `pkg-config` or `libssl-dev` must be installed in advance.

```bash
pip install openstack-flavor-manager
```

Or clone the repository [osism/openstack-flavor-manager](https://github.com/osism/openstack-flavor-manager)
and use the OpenStack Flavor Manager from source with tox.

```bash
tox -- --help
```

There must be a `clouds.yaml` file with the cloud profile in the directory where the OpenStack
Flavor Manager is executed. Secrets can optionally be split out into a `secure.yml` file.

```console
$ openstack-flavor-manager --help

 Usage: openstack-flavor-manager [OPTIONS]

╭─ Options ──────────────────────────────────────────────────────────────────────────────────────────────────╮
│ --name                TEXT     Source of flavor definitions. [default: scs]                                │
│ --url                 TEXT     Overwrite the default URL where the flavor definitions are available.       │
│ --debug                        Enable debug logging.                                                       │
│ --cloud               TEXT     Cloud name in clouds.yaml. [default: admin]                                 │
│ --recommended                  Create recommended flavors.                                                 │
│ --limit-memory        INTEGER  Limit memory in GB for recommended flavors. [default: 32]                   │
│ --help                         Show this message and exit.                                                 │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

To create the mandatory flavors of the [`scs` definition](#definitions) (the default for the
standalone tool), you run:

```bash
openstack-flavor-manager
```

To additionally create the recommended flavors, you run:

```bash
openstack-flavor-manager --recommended
```

The `--limit-memory` option caps the RAM (in GB, default 32) of the recommended flavors that get
created: any recommended flavor requesting more than the limit is skipped. This is useful to avoid
creating large recommended flavors that the compute hosts in the environment could never schedule.
Mandatory flavors are never filtered and are always created regardless of their RAM. To also create
recommended flavors with up to 64 GB of RAM, you run:

```bash
openstack-flavor-manager --recommended --limit-memory 64
```

The output should look like this:

```console
2023-09-20 13:03:14 | INFO     | Flavor SCS-1V-4 created
2023-09-20 13:03:14 | INFO     | Flavor SCS-2V-8 created
2023-09-20 13:03:14 | INFO     | Flavor SCS-4V-16 created
2023-09-20 13:03:14 | INFO     | Flavor SCS-8V-32 created
...
```

All flavors of the definition are now available in your OpenStack environment.
Check yourself by running:

```bash
openstack --os-cloud admin flavor list
```

```console
$ openstack --os-cloud admin flavor show SCS-2V-4-20s
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| Field                      | Value                                                                                                                           |
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------+
| OS-FLV-DISABLED:disabled   | False                                                                                                                           |
| OS-FLV-EXT-DATA:ephemeral  | 0                                                                                                                               |
| access_project_ids         | None                                                                                                                            |
| description                | None                                                                                                                            |
| disk                       | 20                                                                                                                              |
| id                         | 652e3a6c-330e-4ee3-922b-b49c3c093062                                                                                            |
| name                       | SCS-2V-4-20s                                                                                                                    |
| os-flavor-access:is_public | True                                                                                                                            |
| properties                 | hw_rng:allowed='true', scs:cpu-type='shared-core', scs:disk0-type='ssd', scs:name-v1='SCS-2V:4:20s', scs:name-v2='SCS-2V-4-20s' |
| ram                        | 4096                                                                                                                            |
| rxtx_factor                | 1.0                                                                                                                             |
| swap                       | 0                                                                                                                               |
| vcpus                      | 2                                                                                                                               |
+----------------------------+---------------------------------------------------------------------------------------------------------------------------------+
```

## Definitions

A flavor definition is a YAML file with a `mandatory` list and an optional `recommended` list of
flavors. By default only the mandatory flavors are created; the recommended flavors are additionally
created when the `--recommended` parameter is used.

The definition to use is selected with the `--name` parameter:

* `scs` – *downloaded at runtime* from GitHub: the mandatory and recommended flavors of the
  [SCS-0100: Flavor Naming](https://docs.scs.community/standards/iaas/scs-0100/) standard, defined in
  [`SCS-Spec.MandatoryFlavors.verbose.yaml`](https://github.com/SovereignCloudStack/standards/blob/main/Tests/iaas/SCS-Spec.MandatoryFlavors.verbose.yaml).
* `osism` – *downloaded at runtime* from GitHub: the OSISM flavor set, defined in
  [`flavors.yaml`](https://github.com/osism/openstack-flavor-manager/blob/main/flavors.yaml). It
  contains all flavors of the `scs` definition as well as some additional ones.
* `cloudpod` – *read from disk on the manager* (`/data/cloudpod.yml`): the flavor set for OSISM
  CloudPods. This file is shipped with OSISM as
  [`cloudpod.yml`](https://github.com/osism/python-osism/blob/main/files/data/cloudpod.yml).
* `local` – *read from disk on the manager* (`/data/flavors.yaml` by default). This file is shipped
  with OSISM as
  [`flavors.yaml`](https://github.com/osism/python-osism/blob/main/files/data/flavors.yaml) (kept in
  sync with the `osism` definition). This is the default when using the OSISM CLI.
* `url` – *downloaded at runtime* from an arbitrary URL, which must be provided with the `--url`
  parameter.

For the `local`, `cloudpod` and `url` definitions the source location can be overwritten with the
`--url` parameter. The default `--name` differs between the two usage paths: the OSISM CLI uses
`local`, while the standalone tool uses `scs`.

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
