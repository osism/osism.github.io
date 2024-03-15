---
sidebar_label: Testbed Guide
---

# Testbed

💡 With the OSISM Testbed, it is possible to run a full Sovereign Cloud Stack
deployment on an existing OpenStack environment such as Cleura or REGIO.cloud.

OSISM is the reference implementation for the infrastructure as a service layer in the
[Sovereign Cloud Stack](https://scs.community) (SCS) project. The OSISM Testbed is therefore
used in the SCS project to test and work on the Instrastructure as a Service layer.

The OSISM Testbed is intended as a playground. Further services and integration will
be added over time. A increasing number of best practices and experiences from the productive
deployments will be included here in the future. It will become more production-like
over time. However, at no point does it claim to represent a production setup exactly.

## Requirements

### Cloud access

The usual prerequisite is to have an account on one of the supported OpenStack cloud providers.

In principle, it is also possible to add further environments on which the testbed can be operated
with manageable effort: Virtual machines, network and storage based on OpenStack are used as the basis or to
provide the testbed. As OSISM/SCS also virtualizes systems itself, the OpenStack environment must provide
the capabilities for nested virtualization.

It is not part of this guide to describe the registration with the individual cloud
providers. Please contact the respective cloud provider for this.

| Product             | Provider       | Profile name     |
|:--------------------|:---------------|:-----------------|
| Cleura              | Cleura         | `cleura`         |
| Fuga Cloud          | FUGA           | `fuga`           |
| HuaweiCloud         | HuaweiCloud    | `huaweicloud`    |
| OVH                 | OVH            | `ovh`            |
| OpenTelekomCloud    | T-Systems      | `otc`            |
| pluscloud open      | plusserver     | `pluscloudopen`  |
| pluscloud SCS Test  | plussserver    | `gx-scs`         |
| REGIO.cloud         | OSISM          | `regiocloud`     |
| Wavestack           | noris network  | `wavestack`      |

For each provider listed in the table, a predefined profile is available in the
`terraform/environments` directory. This profile contains the name of the public
network, which flavors to use, etc.

Here is an example from the profile for REGIO.cloud.

```text
flavor_manager            = "SCS-4V-16-50"
flavor_node               = "SCS-8V-32-50"
volume_type               = "ssd"
image                     = "Ubuntu 22.04"
image_node                = "Ubuntu 22.04"
public                    = "public"
availability_zone         = "nova"
volume_availability_zone  = "nova"
network_availability_zone = "nova"
```

### Cloud resources

The OSISM Testbed requires at least the following project quota when using the default flavors:

| Quantity | Resource             | Note                                          |
|:---------|:---------------------|:----------------------------------------------|
| 4        | Instances            | 28 VCPUs + 112 GByte RAM (3 modes, 1 manager) |
| 9        | Volumes              | 90 GByte volume storage                       |
| 1        | Floating IP          |                                               |
| 1        | Keypair              |                                               |
| 3        | Security group       |                                               |
| 16       | Security group rules |                                               |
| 1        | Network              |                                               |
| 1        | Subetwork            |                                               |
| 6        | Ports                |                                               |
| 1        | Router               |                                               |

## Preparations

### Software

* `make` must be installed on the system
* `wireguard` or `sshuttle` must be installed on your system for vpn access
* `virtualenv` must be installed for managing python dependencies like `ansible`

### Custom CA

The OSISM Testbed installation currently uses hostnames in the domain `testbed.osism.xyz`.  This is a real domain
and we provide the DNS records matching the addresses used in the OSISM Testbed, so that once you connect to your testbed via a direct
link or Wireguard, you can access hosts and servers by their hostname (e.g. `ssh testbed-manager.testbed.osism.xyz`).

We also provide a wildcard TLS certificate signed by a custom CA for `testbed.osism.xyz` and `*.testbed.osism.xyz`.

This CA is always used for each testbed. The CA is not regenerated and it is not planned to change this for the next 10 years.

In order for these certificates to be recognized locally as valid, the CA
[environments/kolla/certificates/ca/testbed.crt](https://raw.githubusercontent.com/osism/testbed/main/environments/kolla/certificates/ca/testbed.crt)
must be imported locally.

## Getting Started

This section describes step by step how to deploy the OSISM Testbed.

1. Request access from the administrator of the respective cloud or get access to an Openstack cloud.

2. Clone the [osism/testbed](https://github.com/osism/testbed) repository.
   The repository can also be cloned to any other location.

   ```sh
   mkdir -p ~/src/github.com/osism
   git clone https://github.com/osism/testbed ~/src/github.com/osism/testbed
   cd ~/src/github.com/osism/testbed
   ```

3. Configure your cloud access profile
   The access data for the cloud provider used is stored in `terraform/clouds.yaml` and optionally
   in `terraform/secure.yaml` (same structure, if you want to store credentials on a separate place).
   In file [terraform/clouds.yaml.sample](https://github.com/osism/testbed/blob/main/terraform/clouds.yaml.sample)
   you will find examples of typical setups. Settings that are identical for all users of a cloud can be defined
   centrally via the profiles of the file
   [terraform/clouds-public.yaml](https://github.com/osism/testbed/blob/main/terraform/clouds-public.yaml).
   You can reference these settings by using the `profile` parameter in cloud-specific
   definition in `terraform/clouds.yaml`.
   The user specific settings of the `clouds.yaml` file are provided by the cloud provider. Please check the
   documentation  of the cloud provider you are using or their support for details.

   REGIO.cloud is used as an example. The cloud name in `clouds.yaml`
   and the environment name (value of `ENVIRONMENT`) are `regiocloud` in this case. If another cloud
   is used, replace `regiocloud` with the respective profile name from the table above.

   ```yaml
   clouds:
     regiocloud:
       profile: regiocloud
       auth:
         project_name: PROJECT
         username: USERNAME
         project_domain_name: DOMAIN
         user_domain_name: DOMAIN
   ```

   The use of application credentials is preferred. This way it is not necessary to store
   details like username or project name or sensitive information like the password in the
   `clouds.yaml` file.

   The application credentials can be found in Horizon under **Identity**. Use `OSISM testbed` as
   name and click `Create Application Credential`.

   The `clouds.yaml` file of REGIO.cloud can be used as an example for the use of
   application credentials. With another cloud provider, only the `auth_url` must then be changed
   accordingly.

   ```yaml
   clouds:
     regiocloud:
       auth:
         application_credential_id: ID
         application_credential_secret: SECRET
       auth_type: "v3applicationcredential"
   ```

   If you want to make use of `terraform/secure.yaml` add your secrets there instead of `clouds.yaml`, e.g:

   ```yaml
   clouds:
     regiocloud:
       auth:
         password: PASSWORD
   ```

   or

   ```yaml
   clouds:
     regiocloud:
       auth:
         application_credential_secret: SECRET
   ```

4. Prepare the deployment. The versions of Ansible and OpenTofu are managed automatically and necessary
   dependencies are cloned.

   ```sh
   make prepare
   ```

5. Create the infrastructure with OpenTofu.

   ```sh
   make ENVIRONMENT=regiocloud create
   ```

6. Deploy the OSISM manager and bootstrap all nodes.

   ```sh
   make ENVIRONMENT=regiocloud manager
   ```

7. Deploy all services. Depending on the cloud, the installation will take some time. Up
   to two hours is not unusual. In this step, Ceph, OpenStack and all necessary
   infrastructure services (MariaDB, RabbitMQ, ...) are deployed.

   ```sh
   make ENVIRONMENT=regiocloud deploy
   ```

   Alternatively, it is also possible to deploy the services step by step directly on the
   manager. To do this, first log in to the manager with `make ENVIRONMENT=regiocloud login`
   and then execute the deploy scripts one after the other. It is recommended to do this
   within a screen session.

   ```sh
   /opt/configuration/scripts/deploy/001-helper-services.sh
   /opt/configuration/scripts/deploy/100-ceph-services-basic.sh
   /opt/configuration/scripts/deploy/200-infrastructure-services-basic.sh
   /opt/configuration/scripts/deploy/300-openstack-services-basic.sh
   /opt/configuration/scripts/deploy/400-monitoring-services.sh
   ```

   Deploying the services takes some time and depends on how much bandwidth is available,
   how the instances are equipped, etc. 90-120 minutes is not unusual when Ceph and OpenStack
   are fully deployed.

   In order not to prolong the deployments themselves images may optionally be pulled in advance:

   ```sh
   /opt/configuration/scripts/pull-images.sh
   ```

   If you only want to install the monitoring services, a few dependencies must be installed first:

   ```sh
   osism apply common
   osism apply loadbalancer
   osism apply opensearch
   osism apply mariadb
   ```

   You can then use the monitoring services without having to install a complete Openstack environment.

   You can install some basic OpenStack resources like public network, flavors and images by running

   ```sh
   /opt/configuration/scripts/bootstrap.sh
   ```

   If you want to verify the installation with [refstack](https://opendev.org/openinfra/refstack) run

   ```sh
   /opt/configuration/scripts/check.sh
   ```

8. After the deployment, you can log in to the manager via SSH and jump to the nodes of the cluster

   ```sh
   make ENVIRONMENT=regiocloud login
   ssh testbed-node-0
   ssh testbed-<TAB><TAB>
   ```

9. If you want you can create a test project with a test user after login. It also
   creates an instance with a volume attached to a network with a router.

   ```sh
   osism apply --environment openstack test
   ```

10. When the OSISM Testbed is no longer needed, it can be deleted.

   ```sh
   make ENVIRONMENT=regiocloud clean
   ```

## Configuration

This section describes how to configure and customise the OSISM Testbed.

### Variables

The defaults for the OpenTofu variables are intended for REGIO.cloud.

| Variable                  | Default                  | Description                              |
|:--------------------------|:-------------------------|:-----------------------------------------|
| availability_zone         | `nova`                   |                                          |
| ceph_version              | `quincy`                 |                                          |
| cloud_provider            | `regiocloud`             |                                          |
| configuration_version     | `main`                   |                                          |
| deploy_monitoring         | `false`                  |                                          |
| dns_nameservers           | `["8.8.8.8", "9.9.9.9"]` |                                          |
| enable_config_drive       | `true`                   |                                          |
| flavor_manager            | `SCS-4V-16-50`           |                                          |
| flavor_node               | `SCS-8V-32-50`           |                                          |
| image                     | `Ubuntu 22.04`           | Only Ubuntu 22.04 is currently supported |
| image_node                | `Ubuntu 22.04`           | Only Ubuntu 22.04 is currently supported |
| manager_version           | `latest`                 |                                          |
| network_availability_zone | `nova`                   |                                          |
| number_of_nodes           | `3`                      |                                          |
| number_of_volumes         | `3`                      |                                          |
| openstack_version         | `2023.2`                 |                                          |
| prefix                    | `testbed`                |                                          |
| public                    | `external`               |                                          |
| refstack                  | `false`                  |                                          |
| volume_availability_zone  | `nova`                   |                                          |
| volume_size_base          | `30`                     |                                          |
| volume_size_storage       | `10`                     |                                          |
| volume_type               | `__DEFAULT__`            |                                          |

### Overrides

| Name                                       | Description      |
|:-------------------------------------------|:-----------------|
| `manager_boot_from_image`                  |                  |
| `manager_boot_from_volume`                 |                  |
| `neutron_availability_zone_hints_network`  |                  |
| `neutron_availability_zone_hints_router`   |                  |
| `neutron_router_enable_snat`               |                  |
| `nodes_boot_from_image`                    |                  |
| `nodes_boot_from_volume`                   |                  |
| `nodes_use_ephemeral_storage`              |                  |

### Customisations

| Name                  | Description      |
|:----------------------|:-----------------|
| `access_floatingip`   |                  |
| `access_ipv4`         |                  |
| `access_ipv6`         |                  |
| `default`             |                  |
| `neutron_floatingip`  |                  |

## Usage of the the Testbed

### VPN access

Install wireguard on your workstation, if you have not done this before. For instructions how to do
it on your workstation, please have a look on the documentation of your used distribution. The
wireguard documentation you will find [here](https://www.wireguard.com).

Start the wireguard tunnel.
(Press CTRL+c to keep the tunnel running forever. The make target also launches a browser tab with references to all services)

```bash
make vpn-wireguard ENVIRONMENT=regiocloud
```

If you want to connect to the OSISM Testbed from multiple clients, change the client IP
address in the downloaded configuration file to be different on each client.

Copy the `/home/dragon/wireguard-client.conf` from the manager file to your workstation. This is necessary
for using the web endpoints on your workstation. Rename the wireguard config file to something
like `wg-testbed-regiocloud.conf`.

If you do not want to use Wireguard you can also work with [sshuttle](https://github.com/sshuttle/sshuttle).

```bash
make vpn-sshuttle ENVIRONMENT=regiocloud
killall sshuttle
```

If you are unable to access the following domains, you can customize your local `/etc/hosts` with the following entries:

```bash
# OSISM testbed Hosts
192.168.16.5   ara.testbed.osism.xyz ara
192.168.16.5   cgit.testbed.osism.xyz cgit
192.168.16.5   flower.testbed.osism.xyz flower
192.168.16.5   homer.testbed.osism.xyz homer
192.168.16.5   netbox.testbed.osism.xyz netbox
192.168.16.5   testbed-manager.testbed.osism.xyz testbed-manager
192.168.16.5   nexus.testbed.osism.xyz nexus
192.168.16.5   phpmyadmin.testbed.osism.xyz phpmyadmin
192.168.16.9   api-int.testbed.osism.xyz api-int
192.168.16.10  testbed-node-0.testbed.osism.xyz testbed-node-0
192.168.16.11  testbed-node-1.testbed.osism.xyz testbed-node-1
192.168.16.12  testbed-node-2.testbed.osism.xyz testbed-node-2
192.168.16.13  testbed-node-3.testbed.osism.xyz testbed-node-3
192.168.16.14  testbed-node-4.testbed.osism.xyz testbed-node-4
192.168.16.15  testbed-node-5.testbed.osism.xyz testbed-node-5
192.168.16.16  testbed-node-6.testbed.osism.xyz testbed-node-6
192.168.16.17  testbed-node-7.testbed.osism.xyz testbed-node-7
192.168.16.18  testbed-node-8.testbed.osism.xyz testbed-node-8
192.168.16.19  testbed-node-9.testbed.osism.xyz testbed-node-9
192.168.16.100 keycloak.testbed.osism.xyz keycloak
192.168.16.254 api.testbed.osism.xyz api
```

### Webinterfaces

All SSL enabled services within the OSISM Testbed use certs which are signed by the self-signed
[OSISM Testbed CA](https://raw.githubusercontent.com/osism/testbed/main/environments/kolla/certificates/ca/testbed.crt)
(Download the file and import it as certification authority to your browser).

If you want to access the services please choose the URL from the following table.

| Name                     | URL                                            | Username     | Password     | Note            |
|:-------------------------|:-----------------------------------------------|:-------------|:-------------|:----------------|
| ARA                      | https://ara.testbed.osism.xyz                  | ara          | password     |                 |
| Ceph                     | https://api-int.testbed.osism.xyz:8140         | admin        | password     |                 |
| Flower                   | https://flower.testbed.osism.xyz               |              |              |                 |
| Grafana                  | https://api-int.testbed.osism.xyz:3000         | admin        | password     |                 |
| HAProxy (testbed-node-0) | http://testbed-node-0.testbed.osism.xyz:1984   | haproxy      | password     |                 |
| HAProxy (testbed-node-1) | http://testbed-node-1.testbed.osism.xyz:1984   | haproxy      | password     |                 |
| HAProxy (testbed-node-2) | http://testbed-node-2.testbed.osism.xyz:1984   | haproxy      | password     |                 |
| Homer                    | https://homer.testbed.osism.xyz                |              |              |                 |
| Horizon (via Keycloak)   | https://api.testbed.osism.xyz                  | alice        | password     |                 |
| Horizon (via Keystone)   | https://api.testbed.osism.xyz                  | admin        | password     | domain: default |
| Horizon (via Keystone)   | https://api.testbed.osism.xyz                  | test         | test         | domain: test    |
| Keycloak                 | https://keycloak.testbed.osism.xyz/auth        | admin        | password     |                 |
| Netbox                   | https://netbox.testbed.osism.xyz               | admin        | password     |                 |
| Netdata                  | http://testbed-manager.testbed.osism.xyz:19999 |              |              |                 |
| Nexus                    | https://nexus.testbed.osism.xyz                | admin        | password     |                 |
| OpenSearch Dashboards    | https://api.testbed.osism.xyz:5601             | opensearch   | password     |                 |
| Prometheus               | https://api-int.testbed.osism.xyz:9091         |              |              |                 |
| RabbitMQ                 | https://api-int.testbed.osism.xyz:15672        | openstack    | password     |                 |
| phpMyAdmin               | https://phpmyadmin.testbed.osism.xyz           | root         | password     |                 |

### Authentication with OIDC

Authentication with OpenID Connect (OIDC) is possible via Keycloak, which is automatically configured for the OIDC mechanism.

#### OpenStack web dashboard (Horizon) login via OIDC

For logging in via OIDC, open your browser at OpenStack Dashboard Login Page, select **Authenticate via Keycloak**, after being
redirected to the Keycloak login page, perform the login with the credentials **alice** and **password**.
After that you will be redirected back to the Horizon dashboard, where you will be logged in with the user **alice**.

#### OpenStack web dashboard (Horizon) logout

Keep in mind, that clicking **Sign Out** on the Horizon dashboard currently doesn't revoke your OIDC token, and any consequent
attempt to **Authenticate via Keycloak** will succeed without providing the credentials.

The expiration time of the Single Sign On tokens can be controlled on multiple levels in Keycloak.

1. On realm level under *Realm Settings* > *Tokens*.
   Assuming the *keycloak_realm* ansible variable is the default *osism*, and keycloak is listening on
   [keycloak.testbed.osism.xyz](https://keycloak.testbed.osism.xyz), then the configuration form is available
   [here](https://keycloak.testbed.osism.xyz/auth/admin/master/console/#/realms/osism/token-settings).

   Detailed information is available in the Keycloak Server Administrator Documentation
   [Session and Token Timeouts](https://www.keycloak.org/docs/latest/server_admin/#_timeouts) section.

2. In a realm down on the [client level](https://keycloak.testbed.osism.xyz/auth/admin/master/console/#/realms/osism/clients)
   select the client (keystone), and under *Settings* > *Advanced Settings*.

   It is recommended to keep the *Access Token Lifespan* on a relatively low value, with the trend of blocking third party
   cookies. For further information see the Keycloak documentation's [Browsers with Blocked Third-Party Cookies](https://www.keycloak.org/docs/latest/securing_apps/#browsers-with-blocked-third-party-cookies) section.

#### Usage of the Openstack CLI

The `environments/openstack` folder contains the needed files for the openstack client:

```bash
cd environments/openstack
export OS_CLOUD=<the cloud environment>  # i.e. admin
openstack floating ip list
```

#### OpenStack CLI operations with OpenID Connect password

Using the OpenStack cli is also possible via OIDC, assuming you provisioned the user **alice** with password **password**,
then you can perform a simple `project list` operation like this:

See chapter "Usage the Openstack CLI" for basic openstack usage.

```sh
openstack \
 --os-cacert /etc/ssl/certs/ca-certificates.crt \
 --os-auth-url https://api.testbed.osism.xyz:5000/v3 \
 --os-auth-type v3oidcpassword \
 --os-client-id keystone \
 --os-client-secret 0056b89c-030f-486b-a6ad-f0fa398fa4ad \
 --os-username alice \
 --os-password password \
 --os-identity-provider keycloak \
 --os-protocol openid \
 --os-identity-api-version 3 \
 --os-discovery-endpoint https://keycloak.testbed.osism.xyz/auth/realms/osism/.well-known/openid-configuration \
project list
```

#### OpenStack CLI token issue with OpenID Connect

It is also possible to exchange your username/password to a token, for further use with the cli.
The `token issue` subcommand returns an SQL table, in which the `id` column's `value` field contains the token:

See chapter "Usage the Openstack CLI" for basic openstack usage.

```sh
openstack \
 --os-cacert /etc/ssl/certs/ca-certificates.crt \
 --os-auth-url https://api.testbed.osism.xyz:5000/v3 \
 --os-auth-type v3oidcpassword \
 --os-client-id keystone \
 --os-client-secret 0056b89c-030f-486b-a6ad-f0fa398fa4ad \
 --os-username alice \
 --os-password password \
 --os-identity-provider keycloak \
 --os-protocol openid \
 --os-identity-api-version 3 \
 --os-discovery-endpoint https://keycloak.testbed.osism.xyz/auth/realms/osism/.well-known/openid-configuration \
 --os-openid-scope "openid profile email" \
token issue \
  -c id
  -f value
```

An example token is like:

```sh
gAAAAABhC98gL8nsQWknro3JWDXWLFCG3CDr3Mi9OIlvVAZMjy2mNgYtlXv_0yAIy-
nSlLAaLIGhht17-mwf8uclKgRuNVsYLSmgUpB163l89-ch2w2_OFe9zNSQNWf4qfd8
Cl7E7XvvUoFr1N8Gh09vaYLvRvYgCGV05xBUSs76qCHa0qElPUsk56s5ft4ALrSrzD
4cEQRVb5PXNjywdZk9_gtJziz31A7sD4LPIy82O5N9NryDoDw
```

* TODO: OpenStack CLI operations with token
* TODO: OpenStack CLI token revoke

## Advanced Usage

### Change versions

1. Go to `/opt/configuration` on `testbed-manager`
2. Run `./scripts/set-openstack-version.sh zed` to set the OpenStack version to `zed`
3. Run `./scripts/set-ceph-version.sh quincy` to set the Ceph version to `quincy`
4. Run `osism-update-manager` to update the manager

### Deploy services

| Script                                                                      | Description |
|:----------------------------------------------------------------------------|:------------|
| `/opt/configuration/scripts/deploy/000-manager-service.sh`                  |             |
| `/opt/configuration/scripts/deploy/001-helper-services.sh`                  |             |
| `/opt/configuration/scripts/deploy/100-ceph-services-basic.sh`              |             |
| `/opt/configuration/scripts/deploy/200-infrastructure-services-basic.sh`    |             |
| `/opt/configuration/scripts/deploy/210-infrastructure-services-extended.sh` |             |
| `/opt/configuration/scripts/deploy/300-openstack-services-basic.sh`         |             |
| `/opt/configuration/scripts/deploy/310-openstack-services-extended.sh`      |             |
| `/opt/configuration/scripts/deploy/320-openstack-services-baremetal.sh`     |             |
| `/opt/configuration/scripts/deploy/330-openstack-services-additional.sh`    |             |
| `/opt/configuration/scripts/deploy/400-monitoring-services.sh`              |             |

### Upgrade services

| Script                                                                    | Description |
|:--------------------------------------------------------------------------|:------------|
| `/opt/configuration/scripts/upgrade/100-ceph-services.sh`                 |             |
| `/opt/configuration/scripts/upgrade/200-infrastructure-services-basic.sh` |             |
| `/opt/configuration/scripts/upgrade/300-openstack-services-basic.sh`      |             |
| `/opt/configuration/scripts/upgrade/310-openstack-services-extended.sh`   |             |
| `/opt/configuration/scripts/upgrade/320-openstack-services-baremetal.sh`  |             |
| `/opt/configuration/scripts/upgrade/330-openstack-services-additional.sh` |             |

## Troubleshooting

### Unsupported locale setting

```sh
$ make prepare
ansible-playbook -i localhost, ansible/check-local-versions.yml
ERROR: Ansible could not initialize the preferred locale: unsupported locale setting
make: *** [prepare] Error 1
```

To solve the problem you have to modify the `Makefile`. Change the 1st line as follows.

```bash
export LC_ALL=en_US.UTF-8
```

To find out the locale used on the system `printenv` can be used.

```bash
$ printenv | grep -i lang|locale
LANG="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_CTYPE="UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_ALL=
```

## Notes

* The configuration is intentionally kept quite static. Please create no PRs to make the configuration more flexible/dynamic.
* The OSISM documentation uses hostnames, examples, addresses etc. from OSISM Testbed.
* Even if all components (storage, network, compute, control) are operated on the same nodes, there are separate networks.
  This is because in larger productive HCI environments, dedicated control nodes and network nodes are usually provided.
  It is also common to place storage frontend and storage backend on an independent/additional network infrastructure.
* The third volume (`/dev/sdd`) is not enabled for Ceph by default. This is to test the scaling of Ceph.
* Ansible errors that have something to do with undefined variables (e.g. `AnsibleUndefined`) are most likely due to cached
  facts that are no longer valid. The facts can be updated by running `osism apply facts`.
* The manager is used as pull through cache for Docker images and Ubuntu packages. This reduces the amount of traffic consumed.
* To speed up the Ansible playbooks, [ARA](https://ara.recordsansible.org) can be disabled. This
  is done by executing `/opt/configuration/scripts/disable-ara.sh`. Afterwards no more logs are available in the ARA web
  interface.

## Appendix

### Supported releases

The following stable Ceph and OpenStack releases are supported.

The deployment of Ceph is based on [ceph-ansible](https://docs.ceph.com/ceph-ansible/).

* Ceph Pacific
* Ceph Quincy (**default**)
* Ceph Reef

The deployment of OpenStack is based on [kolla-ansible](https://docs.openstack.org/kolla-ansible/latest/).

* OpenStack Zed
* OpenStack 2023.1
* OpenStack 2023.2 (**default**)

The deployment of Kubernetes is based on [k3s-ansible](https://github.com/techno-tim/k3s-ansible).

* Kubernetes v1.29

### Included services

The following services can currently be used with this testbed without further adjustments.

#### Infrastructure

* Ceph
* Fluentd
* Gnocchi
* Grafana
* Haproxy
* Influxdb
* Keepalived
* Keycloak
* Kubernetes CAPI Management Cluster
* Mariadb
* Memcached
* Netbox
* Netdata
* Opensearch
* Openvswitch
* Patchman
* Prometheus exporters
* Rabbitmq
* Redis

#### OpenStack

* Barbican
* Ceilometer
* Cinder
* Designate
* Glance
* Heat
* Horizon
* Ironic
* Keystone
* Magnum
* Manila
* Neutron
* Nova (with Libvirt/KVM)
* Octavia
* Senlin
* Skyline

### Makefile reference

```bash
$ make help

Usage:
  make <target>
  help                  Display this help.
  clean                 Destroy infrastructure with OpenTofu.
  wipe-local-install    Wipe the software dependencies in `venv`.
  create                Create required infrastructure with OpenTofu.
  login                 Log in on the manager.
  vpn-wireguard         Establish a wireguard vpn tunnel.
  vpn-sshuttle          Establish a sshuttle vpn tunnel.
  bootstrap             Bootstrap everything.
  manager               Deploy only the manager service.
  identity              Deploy only identity services.
  ceph                  Deploy only ceph services.
  deploy                Deploy everything and then check it.
  prepare               Run local preperations.
  deps                  Install software preconditions to `venv`.

$ make <TAB> <TAB>
```

### CI jobs

You can inspect the [results of the daily zuul jobs](https://zuul.services.betacloud.xyz/t/osism/builds?project=osism%2Ftestbed&skip=0).

| Name                      | Description |
|:--------------------------|:------------|
| testbed-deploy            |             |
| testbed-deploy-ceph       |             |
| testbed-deploy-cleura     |             |
| testbed-deploy-pco        |             |
| testbed-deploy-stable     |             |
| testbed-deploy-wavestack  |             |
| testbed-update-stable     |             |
| testbed-upgrade           |             |
| testbed-upgrade-ceph      |             |
| testbed-upgrade-cleura    |             |
| testbed-upgrade-pco       |             |
| testbed-upgrade-stable    |             |
| testbed-upgrade-wavestack |             |
