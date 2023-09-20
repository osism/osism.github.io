---
sidebar_label: Flavor Manager
sidebar_position: 51
---

# Flavor Manager

## Overview

The openstack-flavour-manager operates as a facilitator that orchestrates VM compute flavors in alignment 
with the SCS OpenStack cloud standard, utilizing standardized YAML files supplied by SCS. 
This service oversees the creation, modification, and removal of flavors within the 
OpenStack environment.

## Requirements

OpenStack flavor and compute service

The "flavor" and "compute" services in OpenStack are integrated components of the Nova service.
Installing the Nova service is a prerequisite for utilizing the flavor management functionality.


# Getting started

## Installation

First, you need to install the openstack-flavor-manager. You can either use pip:

```bash
pip3 install openstack-flavor-manager
```

Or you can clone the repository from https://github.com/osism/openstack-flavor-manager and run the installation
from the source code:

```bash
tox -- --help
```
Please note: If you opt for the tox installation, ensure you add both the clouds.yaml and secure.yml 
files to the root directory of the cloned repository.


After installation, you maybe have to also reload your shell.

## Usage

Usage: python -m openstack_flavor_manager.main [OPTIONS]

--name               TEXT  Name of flavor definitions. [default: scs] \
--debug                    Enable debug logging.\
--cloud              TEXT  Cloud name in clouds.yaml. [default: admin]\
--recommended              Create recommended flavors.\
--help                     Show this message and exit.

For example, if you want to deploy the recommended SCS flavors, you can simply run:

Only install mandatory flavors:

```bash
~$ openstack-flavor-manager
```

Also install SCS-recommended flavors if required:

```bash
~$ openstack-flavor-manager --recommended
```

the Output should look like this on success:
```
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-1V-4' created.
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-2V-8' created.
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-4V-16' created.
2023-09-20 13:03:14 | INFO     | Flavor 'SCS-8V-32' created.
...
```

All recommended flavors should now be available in your OpenStack cloud environment.
Check yourself by running: 

```bash
openstack flavor list
```

The --cloud parameter is optional. If you have multiple clouds configured in your clouds.yaml, 
you can specify the cloud to connect to using this parameter.
By default, the "admin" cloud is used if no other is specified.

The clouds.yaml file is a configuration file that contains credentials and endpoint information for connecting
to OpenStack clouds. The openstack.connect(cloud=cloud) function reads this file to establish a connection to the 
specified OpenStack cloud environment.


## Flavor definitions

There are two different configuration available by default.
One for "scs" and one for "osism." Each has its own "Mandatory" and "Recommended" flavor set.
If you run the program with a specific configuration (either "scs" or "osism"), using the --name parameter, 
the list of flavors to install changes.

Also have a look on how to flavor yaml files are structured to get a better understanding
on how flavor definitions are made up:

SCS:"https://raw.githubusercontent.com/SovereignCloudStack/standards/main/Tests/iaas/SCS-Spec.MandatoryFlavors.verbose.yaml"
OSISM: "https://raw.githubusercontent.com/osism/openstack-flavor-manager/main/flavors.yaml"
