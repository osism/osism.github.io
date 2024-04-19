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

```
git clone https://github.com/osism/openstack-project-manager
cd openstack-project-manager
pipenv install
pipenv shell
```

## Defaults


### create.py 
The OpenStack Project Manager has some defaults while executing `create.py` if you not set while executing.

```
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

```
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

There must be a `clouds.yml` and a `secure.yml` file in the directory where the OpenStack Project Manager will be executed, examples are provided with the git repository. 

The cloud profile to be used can be specified via the optional --cloud parameter. By default the cloud profile with the name admin is used. It must be and admin account create and modify domains, projects, users and quotas with the used cloud credentials. 

The Openstack Project Manager essentially consists of two parts, the create.py and the manage.py, there are more scripts for handling users using ldap which needs more configuration setup.

There is also a directory `etc` containing yaml Files for managing quotas and endpoints which can be modified for your needs.

### create.py

This command is used to create and modify domains, projects, users and quotas, by default the domain is used as prefix for all projects and users added later on to the domain for easy alloction later on.

```
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

#### Create a Domain and inital Project

When executing the create.py command, the first time with --domain, it will create a domain if does not exist and an admin account for this domain. The admin account is create in the default Domain of Openstack and can be used for the ServiceProvider to manager the complete domain. With the same command we also create our first project webshop, the domain will always be used as prefix.

```
$ python3 src/create.py --domain democompany --name demouser
+----------------+----------------------+----------------------------------+
| name           | value                | id                               |
|----------------+----------------------+----------------------------------|
| domain         | democompany          | a8549ef5d3d14f938b127a1cdefe3788 |
| project        | democompany-webshop  | 645538bf67664cfeaed32476d58f95fb |
| admin          | democompany-admin    | cc8d6bf7b61d4199ba5a4230c4ec6d62 |
| admin_password | qawsEdfg2d45Fsxc     |                                  |
+----------------+----------------------+----------------------------------+
```

#### Create a User for a Project

```
$ python3 src/create.py --domain democompany --name webshopuser --create-user             
+----------+-------------------------+----------------------------------+
| name     | value                   | id                               |
|----------+-------------------------+----------------------------------|
| domain   | democompany             | a8549ef5d3d14f938b127a1cdefe3788 |
| project  | democompany-webshop     | 645538bf67664cfeaed32476d58f95fb |
| user     | democompany-webshopuser | ce213655559d47d7800501124fed4d02 |
| password | vEvM9vgRESdffWE2        |                                  |
+----------+-------------------------+----------------------------------+
```

#### Set quotas for a Project

It is possible to set a quota multiplier for any project, if not set the `basic` quotas of `etc/classes.yml` will be applied.
All quota information must be set as a property to the Openstack project within your Openstack Cluster.

With the following command you set a multiplier of 256 of the basic quota:
```
$ openstack project set --property quotamultiplier=256 democompany-webshop
```

Adjusting gigabyte quota for storage with a multiplier of 20 of the basic quota for a project:
```
$ openstack project set  --property quotamultiplier_storage=20 democompany-webshop
```
This will override the general quotamultiplier only for storage.

Other possible multiplier which can be set individually are: `quotamultiplier_compute`, `quotamultiplier_network`, `quota_router`


#### Special Project: images

With this special Project you can share all images uploaded into this project to all other project in your domain which has set the property `has-shared-images`, which is by default set.
Per default, only the domain admin user has access to this project, other domain users won't see this. If you want your domain users also have access to upload some images you need to give them access in Openstack.

```
$ python3 src/create.py --domain democompany --name images
+---------+---------------------+----------------------------------+
| name    | value               | id                               |
|---------+---------------------+----------------------------------|
| domain  | democompany         | a8549ef5d3d14f938b127a1cdefe3788 |
| project | democompany-images  | 6aed2453c82ac8be2962382595dcc2d6 |
+---------+---------------------+----------------------------------+
```

Additionally you need to add the Domain and Domain Admin User to the `clouds.yaml` so the script can setup permissions to the projects and users to see these images.
It will always looking for a Cloud name `opm-domainname-admin:` entry.

```
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

```
$ python3 src/create.py --domain democompany --name service
+---------+---------------------+----------------------------------+
| name    | value               | id                               |
|---------+---------------------+----------------------------------|
| domain  | democompany         | a8549ef5d3d14f938b127a1cdefe3788 |
| project | democompany-service | add6ca06f5afe4e37e3de05a614ee475 |
+---------+---------------------+----------------------------------+
```



### manage.py

This command applies quotas, networks and routers to **all** project in the Openstack Cluster, not only to those have been setuped previously with the `create.py` or `openstack project set --property` commands.

Best is to run this command by cron, every hour to apply all changes. It is also possible to run this at the command line to apply changes immediately.

```
python src/manage.py -h
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


