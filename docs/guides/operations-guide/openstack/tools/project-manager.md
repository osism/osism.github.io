---
sidebar_label: Project Manager
sidebar_position: 53
---

# Project Manager

## Overview

The OpenStack Project Manager manages the creation of Openstack Domains, Projects and Users.


## Installation

Prepare to use the Openstack Project Manager.

During installation, ldap libraries are required under Linux; you should install libldap2-dev and libsasl2-dev beforehand.

```bash
git clone https://github.com/osism/openstack-project-manager
cd openstack-project-manager
pipenv install
pipenv shell
```

## Defaults


### create.py 
The `create.py` command and his default options while executing the command.

```text
 --admin-domain              default
 --assign-admin-user         true
 --cloud                     admin
 --create-admin-user         true
 --create-domain             false
 --create-user               false
 --domain-name-prefix        true
 --has-service-network       false
 --has-public-network        true
 --has-shared-images         true
 --internal-id               unset
 --random                    false
 --managed-network-resources false
 --name                      sandbox
 --owner                     unset
 --password                  unset
 --password-length           16
 --public-network            public
 --quota-class               basic
 --service-network-cidr      unset
 --quota-multiplier          1
 --quota-multiplier-compute  unset
 --quota-multiplier-network  unset
 --quota-multiplier-storage  unset
 --quota-router              1
```

### manage.py

The `manage.py` has also some defaults while executing and will touch all projects in your Openstack Cluster, if not --domain is used.

```text
 --admin-domain        default
 --assign-admin-user   false
 --classes             etc/classes.yml
 --domain              unset
 --dry-run             false
 --endpoints           etc/endpoints.yml
 --manage-endpoints    false
 --manage-homeprojects false
 --name                unset
```

Default Openstack Roles to users are set to `member` and `load-balancer_member` at this time, the behavior can only be changed in the code.



## Usage

There must be a `clouds.yml` and a `secure.yml` file in the directory where the OpenStack Project Manager will be executed, examples are provided within the git repository. 

The cloud profile to be used can be specified via the optional --cloud parameter. By default the cloud profile with the name admin is used. It has to be and admin account, to create and modify domains, projects, users and quotas.

The Openstack Project Manager essentially consists of two parts, the `create.py` and the `manage.py`, there are more scripts for handling users using ldap which needs more configuration setup.


### create.py

This command is used to create and modify domains, projects, users and quotas. As default the domain is used as prefix for all projects and users created for easy alloction in Openstack.

:::note

create.py can't delete once created objects, this must be done using Openstack commands to remove a project or domain.

:::

```console
python src/create.py -h
usage: create [-h] [--admin-domain ADMIN_DOMAIN] [--assign-admin-user] [--cloud CLOUD] [--config-dir DIR] [--config-file PATH] [--create-admin-user] [--create-domain] [--create-user]
              [--domain DOMAIN] [--domain-name-prefix] [--has-public-network] [--has-service-network] [--has-shared-images] [--internal-id INTERNAL_ID] [--managed-network-resources] [--name NAME]
              [--noassign-admin-user] [--nocreate-admin-user] [--nocreate-domain] [--nocreate-user] [--nodomain-name-prefix] [--nohas-public-network] [--nohas-service-network]
              [--nohas-shared-images] [--nomanaged-network-resources] [--norandom] [--owner OWNER] [--password PASSWORD] [--password-length PASSWORD_LENGTH] [--public-network PUBLIC_NETWORK]
              [--quota-class QUOTA_CLASS] [--quota-multiplier QUOTA_MULTIPLIER] [--quota-multiplier-compute QUOTA_MULTIPLIER_COMPUTE] [--quota-multiplier-network QUOTA_MULTIPLIER_NETWORK]
              [--quota-multiplier-storage QUOTA_MULTIPLIER_STORAGE] [--quota-router QUOTA_ROUTER] [--random] [--service-network-cidr SERVICE_NETWORK_CIDR]

options:
  -h, --help            show this help message and exit
  --admin-domain ADMIN_DOMAIN
                        Admin domain
  --assign-admin-user   Assign admin user
  --cloud CLOUD         Managed cloud
  --config-dir DIR      Path to a config directory to pull `*.conf` files from. This file set is sorted, so as to provide a predictable parse order if individual options are over-ridden. The set
                        is parsed after the file(s) specified via previous --config-file, arguments hence over-ridden options in the directory take precedence. This option must be set from the
                        command-line.
  --config-file PATH    Path to a config file to use. Multiple config files can be specified, with values in later files taking precedence. Defaults to None. This option must be set from the
                        command-line.
  --create-admin-user   Create admin user
  --create-domain       Create domain only
  --create-user         Create user
  --domain DOMAIN       Domain
  --domain-name-prefix  Add domain name as prefix to the project name
  --has-public-network  Has public network infrastructure
  --has-service-network
                        Has service network infrastructure
  --has-shared-images   Has shared images
  --internal-id INTERNAL_ID
                        Internal ID
  --managed-network-resources
                        Manage the network resources
  --name NAME           Projectname
  --noassign-admin-user
                        The inverse of --assign-admin-user
  --nocreate-admin-user
                        The inverse of --create-admin-user
  --nocreate-domain     The inverse of --create-domain
  --nocreate-user       The inverse of --create-user
  --nodomain-name-prefix
                        The inverse of --domain-name-prefix
  --nohas-public-network
                        The inverse of --has-public-network
  --nohas-service-network
                        The inverse of --has-service-network
  --nohas-shared-images
                        The inverse of --has-shared-images
  --nomanaged-network-resources
                        The inverse of --managed-network-resources
  --norandom            The inverse of --random
  --owner OWNER         Owner of the project
  --password PASSWORD   Password
  --password-length PASSWORD_LENGTH
                        Password length
  --public-network PUBLIC_NETWORK
                        Public network
  --quota-class QUOTA_CLASS
                        Quota class
  --quota-multiplier QUOTA_MULTIPLIER
                        Quota multiplier
  --quota-multiplier-compute QUOTA_MULTIPLIER_COMPUTE
                        Quota multiplier compute
  --quota-multiplier-network QUOTA_MULTIPLIER_NETWORK
                        Quota multiplier network
  --quota-multiplier-storage QUOTA_MULTIPLIER_STORAGE
                        Quota multiplier storage
  --quota-router QUOTA_ROUTER
                        Quota router
  --random              Generate random names
  --service-network-cidr SERVICE_NETWORK_CIDR
                        Service network CIDR
```

#### Create a Domain and inital project

When executing the `create.py` command, the first time with `--domain`, it will create a new domain, an admin account and the first project `webshop`. The admin account will be created in the default Domain of Openstack and can be used for the Service Provider to manager the complete domain. 

```console
$ python3 src/create.py --domain democompany --name webshop
+----------------+----------------------+----------------------------------+
| name           | value                | id                               |
|----------------+----------------------+----------------------------------|
| domain         | democompany          | a8549ef5d3d14f938b127a1cdefe3788 |
| project        | democompany-webshop  | 645538bf67664cfeaed32476d58f95fb |
| admin          | democompany-admin    | cc8d6bf7b61d4199ba5a4230c4ec6d62 |
| admin_password | qawsEdfg2d45Fsxc     |                                  |
+----------------+----------------------+----------------------------------+
```

#### Create a User for a project

```console
$ python3 src/create.py --domain democompany --name webshopuser --create-user
+----------+-------------------------+----------------------------------+
| name     | value                   | id                               |
|----------+-------------------------+----------------------------------|
| domain   | democompany             | a8549ef5d3d14f938b127a1cdefe3788 |
| project  | democompany-webshop     | 5752b6701026478f9cac122fc54eb9cb |
| user     | democompany-webshopuser | ce213655559d47d7800501124fed4d02 |
| password | vEvM9vgRESdffWE2        |                                  |
+----------+-------------------------+----------------------------------+
```

#### Create additional project with unlimited quota

```console
$ python3 src/create.py --domain democompany --name styles --quota-class unlimited
+----------+--------------------+----------------------------------+
| name     | value              | id                               |
|----------+--------------------+----------------------------------|
| domain   | democompany        | a8549ef5d3d14f938b127a1cdefe3788 |
| project  | democompany-styles | 666097e396fd4f9392d6aa55c76d8267 |
+----------+--------------------+----------------------------------+
```


#### Set quotas for a project

All quota information must be set as a property to the Openstack project within your Openstack Cluster, if no property is set, the `basic` quotaclass of `etc/classes.yml` will be applied.
It is possible to set a quota multiplier for any project.

The following command sets a multiplier of 256 of the basic quota:

```bash
$ openstack project set --property quotamultiplier=256 democompany-webshop
```

Adjusting gigabyte quota for storage with a multiplier of 20 of the basic quota for a project:

```bash
openstack project set  --property quotamultiplier_storage=20 democompany-webshop
```

This will override the general quotamultiplier only for storage.

Other possible multiplier which can be set individually are: `quotamultiplier_compute`, `quotamultiplier_network`, `quota_router`

To change the quotaclass to unlimited from the `etc/classes.yaml`

```bash
openstack project set  --property quotaclass=unlimited democompany-webshop
```

#### Special project: images

With this special Project you can share all images uploaded into this project to all other project in your domain which has set the property `has-shared-images`, which is by default set.
Alsoi only the domain-admin user has access to this project, other domain users won't see this, they will find the uploaded images in their projects. 
If you want your grant other domain users also access to upload some images, you need to give them access to the images Project in Openstack.

```console
$ python3 src/create.py --domain democompany --name images
+---------+---------------------+----------------------------------+
| name    | value               | id                               |
|---------+---------------------+----------------------------------|
| domain  | democompany         | a8549ef5d3d14f938b127a1cdefe3788 |
| project | democompany-images  | 6d57f39aacbe485d87733865b1e79d03 |
+---------+---------------------+----------------------------------+
```

Additionally you need to add the domain and domain-admin user to the `clouds.yaml`, it is always named `opm-domainname-admin:` so the manage.py can setup permissions to the projects later on and users are able to find the images.

```yaml
  opm-democompany-admin:
    auth:
      auth_url: https://keystone.my.cloud:5000/v3
      username: democompany-admin
      password: yourpassword
      user_domain_name: Default
      project_domain_name: democompany
    identity_api_version: 3
```

#### Special project: service

With this special project you can share installed services, like a harbor, to all other projects in your domain. Per default, only the domain admin has access to this project.

```console
$ python3 src/create.py --domain democompany --name service
+---------+---------------------+----------------------------------+
| name    | value               | id                               |
|---------+---------------------+----------------------------------|
| domain  | democompany         | a8549ef5d3d14f938b127a1cdefe3788 |
| project | democompany-service | a5558f7338f94adea5f41858636256b5 |
+---------+---------------------+----------------------------------+
```


### manage.py

:::warning

This command applies quotas, networks and routers to **all** projects in the Openstack Cluster, not only to those have been configured previously with the `create.py` or `openstack project set --property` commands.

:::

Best is to run this command by cron, every hour to apply all pending changes, it is also possible to run this at the command line to apply changes immediately.

```console
python3 src/manage.py -h
usage: manage [-h] [--admin-domain ADMIN_DOMAIN] [--assign-admin-user] [--classes CLASSES] [--cloud CLOUD] [--config-dir DIR] [--config-file PATH] [--domain DOMAIN] [--dry-run]
              [--endpoints ENDPOINTS] [--manage-endpoints] [--manage-homeprojects] [--name NAME] [--noassign-admin-user] [--nodry-run] [--nomanage-endpoints] [--nomanage-homeprojects]

options:
  -h, --help            show this help message and exit
  --admin-domain ADMIN_DOMAIN
                        Admin domain
  --assign-admin-user   Assign admin user
  --classes CLASSES     Path to the classes.yml file
  --cloud CLOUD         Cloud name in clouds.yaml
  --config-dir DIR      Path to a config directory to pull `*.conf` files from. This file set is sorted, so as to provide a predictable parse order if individual options are over-ridden. The set
                        is parsed after the file(s) specified via previous --config-file, arguments hence over-ridden options in the directory take precedence. This option must be set from the
                        command-line.
  --config-file PATH    Path to a config file to use. Multiple config files can be specified, with values in later files taking precedence. Defaults to None. This option must be set from the
                        command-line.
  --domain DOMAIN       Domain to be managed
  --dry-run             Do not really do anything
  --endpoints ENDPOINTS
                        Path to the endpoints.yml file
  --manage-endpoints    Manage endpoints
  --manage-homeprojects
                        Manage home projects
  --name NAME           Project to be managed
  --noassign-admin-user
                        The inverse of --assign-admin-user
  --nodry-run           The inverse of --dry-run
  --nomanage-endpoints  The inverse of --manage-endpoints
  --nomanage-homeprojects
                        The inverse of --manage-homeprojects
```

#### Manage a specific domain only

```console
$ python3 src/manage.py --domain democompany

2024-04-19 14:24:02.873 | INFO     | democompany - domain_id = a8549ef5d3d14f938b127a1cdefe3788
2024-04-19 14:24:04.886 | INFO     | democompany-images - project_id = 6d57f39aacbe485d87733865b1e79d03
2024-04-19 14:24:04.886 | INFO     | democompany-images - project_id = 6d57f39aacbe485d87733865b1e79d03, domain_id = a8549ef5d3d14f938b127a1cdefe3788
2024-04-19 14:24:04.953 | INFO     | democompany-images - quotaclass {'compute': {'cores': 0, 'injected_file_content_bytes': 10240, 'injected_file_path_bytes': 255, 'injected_files': 5, 'instances': 0, 'key_pairs': 0, 'metadata_items': 128, 'ram': 0, 'server_group_members': 0, 'server_groups': 0}, 'network': {'floatingip': 0, 'network': 0, 'port': 0, 'rbac_policy': 0, 'router': 0, 'security_group': 0, 'security_group_rule': 0, 'subnet': 0, 'subnetpool': 0}, 'volume': {'backup_gigabytes': 0, 'backups': 0, 'gigabytes': 1000, 'per_volume_gigabytes': 25, 'snapshots': 0, 'volumes': 100}, 'parent': 'default'}
2024-04-19 14:24:04.953 | INFO     | democompany-images - check network quota
2024-04-19 14:24:05.048 | INFO     | democompany-images - check compute quota
2024-04-19 14:24:05.175 | INFO     | democompany-images - check volume quota
2024-04-19 14:24:05.286 | INFO     | democompany-images - check if external rbac policy must be deleted (public)
2024-04-19 14:24:05.349 | INFO     | democompany-images - check if service rbac policy must be deleted (democompany-service)
2024-04-19 14:24:06.081 | INFO     | democompany-service - project_id = a5558f7338f94adea5f41858636256b5
2024-04-19 14:24:06.081 | INFO     | democompany-service - project_id = a5558f7338f94adea5f41858636256b5, domain_id = a8549ef5d3d14f938b127a1cdefe3788
2024-04-19 14:24:06.131 | INFO     | democompany-service - quotaclass {'compute': {'cores': 256, 'injected_file_content_bytes': 10240, 'injected_file_path_bytes': 255, 'injected_files': 5, 'instances': 256, 'key_pairs': 256, 'metadata_items': 128, 'ram': 262144, 'server_group_members': 256, 'server_groups': 256}, 'network': {'floatingip': 256, 'network': 256, 'port': 256, 'rbac_policy': 1024, 'router': 256, 'security_group': 256, 'security_group_rule': 1024, 'subnet': 256, 'subnetpool': 256}, 'volume': {'backup_gigabytes': 0, 'backups': 0, 'gigabytes': 0, 'per_volume_gigabytes': 0, 'snapshots': 0, 'volumes': 0}, 'parent': 'default'}
2024-04-19 14:24:06.131 | INFO     | democompany-service - check network quota
2024-04-19 14:24:06.212 | INFO     | democompany-service - check compute quota
2024-04-19 14:24:06.330 | INFO     | democompany-service - check volume quota
2024-04-19 14:24:06.467 | INFO     | democompany-service - check if external rbac policy must be created (public)
2024-04-19 14:24:06.589 | INFO     | democompany-service - check if service rbac policy must be deleted (democompany-service)
2024-04-19 14:24:06.840 | INFO     | democompany-webshop - project_id = 5752b6701026478f9cac122fc54eb9cb
2024-04-19 14:24:06.840 | INFO     | democompany-webshop - project_id = 5752b6701026478f9cac122fc54eb9cb, domain_id = a8549ef5d3d14f938b127a1cdefe3788
2024-04-19 14:24:06.915 | INFO     | democompany-webshop - quotaclass {'compute': {'cores': 4, 'injected_file_content_bytes': 10240, 'injected_file_path_bytes': 255, 'injected_files': 5, 'instances': -1, 'key_pairs': 4, 'metadata_items': 128, 'ram': 8192, 'server_group_members': 4, 'server_groups': 4}, 'network': {'floatingip': 4, 'network': 1, 'port': 20, 'rbac_policy': 10, 'router': 0, 'security_group': 5, 'security_group_rule': 20, 'subnet': 2, 'subnetpool': 1}, 'volume': {'backup_gigabytes': 40, 'backups': 8, 'gigabytes': 20, 'per_volume_gigabytes': 200, 'snapshots': 4, 'volumes': 4}, 'parent': 'default'}
2024-04-19 14:24:06.915 | INFO     | democompany-webshop - check network quota
2024-04-19 14:24:06.993 | INFO     | democompany-webshop - check compute quota
2024-04-19 14:24:07.114 | INFO     | democompany-webshop - check volume quota
2024-04-19 14:24:07.254 | INFO     | democompany-webshop - check if external rbac policy must be created (public)
2024-04-19 14:24:07.334 | INFO     | democompany-webshop - check if service rbac policy must be deleted (democompany-service)
```

## Config files 

The config files which can be used for `create.py` and `manage.py` are using the [oslo.config format](https://docs.openstack.org/oslo.config/latest/configuration/quickstart.html), you can set the command line options as `key = value pair` and create your own config files matching your setup.

```yaml title="democompany.conf"
[DEFAULT]
cloud = admin
domain = democompany
```

## Quota Templates 

Edit the `etc/classes.yml` file if you want to change or add new quota templates

## Setup Endpoints

Edit the `etc/endpoints.yml` file to fit your available endpoints
