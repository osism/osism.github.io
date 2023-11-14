---
sidebar_label: Cloud in a Box
sidebar_position: 10
---

# Cloud in a Box - CiaB

💡 Cloud in a Box (CiaB) is a minimalistic installation of the latest stable OSISM release with only services which are needed to
make it work with Kubernetes. It is intended for use as a development
system on bare-metal or for use in edge environments.


:::warning

At the moment the secrets are stored in plain text in the [osism/cloud-in-a-box](https://github.com/osism/cloud-in-a-box)
repository and are not secure. Do not use for public accessible systems. In the future, the secrets will be generated automatically.

:::

## Requirements

The system to be used as Cloud in a Box must fulfill these minimum requirements.

| Type of resource | Amount                                                  | Note                                                                    |
|------------------|---------------------------------------------------------|-------------------------------------------------------------------------|
| CPU              | at least 1 socket with 4 cores                          |                                                                         |
| RAM              | at least 32 GByte                                       |                                                                         |
| Storage          | at least 1 TByte                                        | Has to be available as `/dev/sda` or `/dev/nvme0n1`                     |
| Network          | at least 1 network interface (dhcp and internet access) | An optional 2nd network interface can be used for external connectivity |
| USB stick        | at least 2 GByte                                        | Installation media for cloud in a box bootstrapping                     |

## Types

There are two types of Cloud in a Box.

1. The **sandbox** type is intended for developers and demonstrations. A full OSISM installation
   is one there which also includes Ceph and OpenSearch, for example. In the course of the
   installation, necessary images, networks, etc. are also created.

2. The **edge** type is intended to be deployed as an appliance to provide an edge cloud on a
   single node. Compared to the sandbox, certain services are not provided there or are
   implemented differently. For example, OpenSearch is not deployed because the logs are
   delivered to a central location. The storage backend will also be implemented differently there
   in the future instead of Ceph.

## Installation

The images currently download and install the 
[latest release of the installation-scripts](https://github.com/osism/cloud-in-a-box),
therefore it is mandatory to update the installation media at least when the underlying Ubuntu operating 
system release changes.  The installation of historical releases is currently not supported. 

1. Download one of the Cloud in a Box images of type sandbox
   * [ubuntu-autoinstall-cloud-in-a-box-1.iso](https://swift.services.a.regiocloud.tech/swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/osism-node-image/ubuntu-autoinstall-cloud-in-a-box-1.iso) (with first block device as `/dev/sda`)
   * [ubuntu-autoinstall-cloud-in-a-box-2.iso](https://swift.services.a.regiocloud.tech/swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/osism-node-image/ubuntu-autoinstall-cloud-in-a-box-2.iso) (with first block device as `/dev/nvme0n1`)

2. Use a tool like [balenaEtcher](https://etcher.balena.io) or `dd` to create a bootable USB stick with the Cloud
   in a Box image.

3. Boot from the USB stick. Make sure that the boot from USB is activated in the BIOS.

   :::warning

   When booting from this USB stick, all data on the hard disks will be destroyed
   without confirmation.

   :::

4. The installation of the operating system (Ubuntu 22.04) will start and take a few minutes. After that the system
   will shutdown.

5. The first start of the system
   * Remove the USB storage device
     (The USB stick is only needed again if the Cloud in a Box system is to be fully reinstalled.)
   * Connect the first network interface to an ethernet interface that provides access to the internet via DHCP configuration
   * Boot the system from the internal hard disk device (if 
6. The deployment will start. This takes some time and the system will shutdown when the
   deployment is finished. This takes roughly an hour, possibly longer depending on the
   hardware and internet connection.

7. Start the system again. System is ready for use, by default DHCP is tried on the first network device.

8. Login via SSH. Use the user `dragon` with the password `password`.
   (You can obtain the ip address by inspecting the logs of your dhcp server or from the *issue text* of the virtual consoles of the system)
   ```bash
   ssh dragon@IP_FROM_YOUR_SERVER
   passwd
   ```
   ![CiaB Issue Text](images/cloud-in-a-box/issue.png)

### Wireguard VPN service access

Copy the `/home/dragon/wireguard-client.conf` file from CiaB to your workstation. This is necessary
for using the web endpoints on your workstation. Rename the wireguard config file to something
like `cloud-in-a-box.conf`.

If you want to connect to the Cloud in a Box system from multiple clients, change the client IP
address in the config file to be different on each client.

```bash
scp dragon@IP_FROM_YOUR_SERVER:/home/dragon/wireguard-client.conf $HOME/cloud-in-a-box.conf
```

Install wireguard on your workstation, if you have not done this before. For instructions how to do
it on your workstation, please have a look on the documentation of your used distribution. The
wireguard documentation you will find [here](https://www.wireguard.com/).

Start the wireguard tunnel.

```bash
sudo wg-quick up $HOME/cloud-in-a-box.conf
```

## Webinterfaces

If you want to access the services please choose the URL from the following list:

| Name                    | URL                                           | Username   | Password  |
|-------------------------|-----------------------------------------------|------------|-----------|
| ARA                     | <https://ara.services.in-a-box.cloud>         | ara        | password  |
| Flower                  | <https://flower.services.in-a-box.cloud>      | -          | -         |
| Grafana                 | <https://api.in-a-box.cloud:3000>             | admin      | password  |
| Homer                   | <https://homer.services.in-a-box.cloud>       | -          | -         |
| Horizon - admin project | <https://api.in-a-box.cloud>                  | admin      | password  |
| Horizon - test project  | <https://api.in-a-box.cloud>                  | test       | test      |
| Skyline - admin project | <https://api.in-a-box.cloud:9999>             | admin      | password  |
| Skyline - test project  | <https://api.in-a-box.cloud:9999>             | test       | test      |
| OpenSearch Dashboards   | <https://api.in-a-box.cloud:5601>             | opensearch | password  |
| Netbox                  | <https://netbox.services.in-a-box.cloud>      | admin      | password  |
| Netdata                 | <http://manager.systems.in-a-box.cloud:19999> | -          | -         |
| phpMyAdmin              | <https://phpmyadmin.services.in-a-box.cloud>  | root       | password  |
| RabbitMQ                | <https://api.in-a-box.cloud:15672>            | openstack  | password  |

## Command-line interfaces

Login to Ciab as described in step 8 of the installation chapter.

* Select one of the preconfigured environments:
   - `system` 
   - `admin`
   - `test`
* Set the environment by exporting the environment variable: `OS_CLOUD`:
   ```bash
   export OS_CLOUD=admin
   ```
* Use [OpenStack CLI](https://docs.openstack.org/newton/user-guide/cli.html) via the command `openstack`.
   ```bash
   openstack availability zone list
   openstack image list
   openstack server list # After installation there are no servers
   ```

### Import of additional images

The [OpenStack Image Manager](https://github.com/osism/openstack-image-manager/) is used to manage images.
In the example, the `Garden Linux` image is imported.

```bash
export OS_CLOUD=admin
osism manage images --filter 'Garden Linux'
```

All available images: <https://github.com/osism/openstack-image-manager/tree/main/etc/images>

## Upgrade

It is best to execute the commands within a screen session, it takes some time. Please note
that you cannot update the Ceph deployment at the moment. This will be enabled in the future.

```bash
osism apply configuration
/opt/configuration/upgrade.sh
docker system prune -a
```

## Customisations

### Use of 2nd NIC for external network

In the default configuration, the Cloud in a Box is built in such a way that an internal
VLAN101 is used as an simulated external network and this is made usable via the 1st network
interface using masquerading. This makes it possible for instances running on the Cloud
in a Box to reach the internet. The disadvantage of this is that the instances themselves
can only be reached via floating IP addresses from the Cloud in a Box system itself or
via the Wireguard tunnel. Especially in edge environments, however, one would usually like
to have this differently and the instances should be directly accessible via the local
network.

To make this work, first identify the name of a 2nd network card to be used.

```bash
dragon@manager:~$ sudo lshw -class network -short
H/W path          Device          Class          Description
============================================================
/0/100/2.2/0      eno7            network        Ethernet Connection X552 10 GbE SFP+
/0/100/2.2/0.1    eno8            network        Ethernet Connection X552 10 GbE SFP+
/0/100/1c/0       eno1            network        I210 Gigabit Network Connection
/0/100/1c.1/0     eno2            network        I210 Gigabit Network Connection
/0/100/1c.4/0     eno3            network        I350 Gigabit Network Connection
/0/100/1c.4/0.1   eno4            network        I350 Gigabit Network Connection
/0/100/1c.4/0.2   eno5            network        I350 Gigabit Network Connection
/0/100/1c.4/0.3   eno6            network        I350 Gigabit Network Connection
```

In the following we use `eno7`. Activate the device manually with  `sudo ip link set up dev eno7`.
Then check that a link is actually present.

```
dragon@manager:~$ ethtool eno7
Settings for eno7:
	Supported ports: [ FIBRE ]
	Supported link modes:   10000baseT/Full
[...]
	Link detected: yes
```

Now this device is made permanently known in the network configuration. Select the MTU
accordingly. For 1 GBit rather `1500` than `9100`.

* `/opt/configuration/inventory/group_vars/generic/network.yml`
* `/opt/configuration/environments/manager/group_vars/manager.yml`

```yaml
network_ethernets:
  eno1:
    dhcp4: true
  eno7:
    mtu: 9100
```

Then, this change is deployed and applied.

```bash
osism apply network
sudo netplan apply
```

Now the configuration for Neutron and OVN is prepared. `network_workload_interface`
is expanded by the 2nd network interface. The order is not random, first `vlan101`
then `eno7`. `neutron_bridge_name` is added.

* `/opt/configuration/inventory/group_vars/generic/network.yml`
* `/opt/configuration/environments/manager/group_vars/manager.yml`

```yaml
network_workload_interface: "vlan101,eno7"
neutron_bridge_name: "br-ex,br-add"
```

Then, this change is deployed.

```bash
osism reconciler sync
osism apply openvswitch
osism apply ovn
osism apply neutron
```

Now segments and/or subnets can be configured. In this case, `eno7` is configured as an
untagged port on the remote side.

* `/opt/configuration/environments/openstack/playbook-additional-public-network.yml`

```yaml
- name: Create additional public network
  hosts: localhost
  connection: local

  tasks:
    - name: Create additional public network
      openstack.cloud.network:
        cloud: admin
        state: present
        name: public-add
        external: true
        provider_network_type: flat
        provider_physical_network: physnet2

    - name: Create additional public subnet
      openstack.cloud.subnet:
        cloud: admin
        state: present
        name: subnet-public-add
        network_name: public-add
        cidr: 192.168.23.0/24
        enable_dhcp: false
        allocation_pool_start: 192.168.23.100
        allocation_pool_end: 192.168.23.200
        gateway_ip: 192.168.23.1
        dns_nameservers:
          - 8.8.8.8
          - 9.9.9.9
```

The additional public network can now be made known with
`osism apply -e openstack additional-public-network`.

There is now a 2nd floating IP address pool with the name `public-add`
available for use. If instances are to be started directly in this network,
`enable_dhcp: true` must be set. In this case, it should be clarified in
advance with the provider of the external network whether the use of DHCP
is permitted there.

## Troubleshooting

![Broken disk setup](./images/cloud-in-a-box/screenshot1.png)

This error means that your disk setup is broken. Use `cfdisk` and delete all partitions on
the system on which you want to install the Cloud in a Box image.

With `lsblk` you can verify if the partitions are empty.


## Development

For the further development of the scripts and the mechanisms of the Cloud in a Box,
you need to know the following.

* The operating system is brought onto the node via [an automatic Ubuntu installation](https://github.com/osism/node-image)
  that uses [cloud-init](https://cloud-init.io)
* The installation starts the script [init.sh](https://github.com/osism/cloud-in-a-box/blob/main/init.sh) which performs
  an initial clone of the [osism/cloud-in-a-box](https://github.com/osism/cloud-in-a-box) repository and a checkout of
  the `main` branch. It also executes the [deploy.sh](https://github.com/osism/cloud-in-a-box/blob/main/deploy.sh) and
  [bootstrap.sh](https://github.com/osism/cloud-in-a-box/blob/main/bootstrap.sh) scripts.
* The installation persists the kernel parameters of the initial boot to the file `/etc/.initial-kernel-commandline`
* The status and activities of the deployment are logged in `/var/log/install-cloud-in-a-box.log`. For proper colors use `less -r`.
  Search for `OVERALL STATUS` to find the result of the specific installation steps.
* Branch and location of the [osism/cloud-in-a-box](https://github.com/osism/cloud-in-a-box) repository can be overriden
  by setting the kernel parameters `ciab_repo_url` (a public repository address without authentication) and `ciab_branch`
  (a name of a branch, use only ASCII chars, `-`, and `_`).
