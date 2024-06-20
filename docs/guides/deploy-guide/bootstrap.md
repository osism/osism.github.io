---
sidebar_label: Bootstrap
sidebar_position: 40
---

# Bootstrap

:::info

As a prerequisite for the bootstraping the nodes of a cluster, the manager node has to be
prepared. What a Manager node is and how to prepare it is documented in the
[Manager chapter of the deploy guide](./manager.md).

All the nodes must also have already been provisioned. How manual provisioning is done
is documented in the [Provisioning chapter of the Deploy Guide](./provisioning).

:::

Before the nodes can be bootstrapped, they must all have already been provisioned.
The guide for this can be found in the section [Provisioning of bare-metal nodes](./provisioning).

The following steps are applied to bootstrap all nodes. After the completion of the bootstrap,
the nodes are ready for the deployment of the services.


## Group assignments

Assign the nodes to the suitable roles in `inventory/20-roles`

* Assign all nodes to the "generic" group
* Assign the nodes to the suitable groups


TODO: Does it make sense to describe the purpose of the groups with a few words to
help newbies to make the right descicions?

| Groupname             | Description                                           |
|-----------------------|-------------------------------------------------------|
| `[generic]`           | Roles which do not have any service specific settings |
| `[manager]`           | Roles for the manager nodes                           |
| `[monitoring]`        | The log, metric and alerting infrastructure roles     |
| `[control]`           | Openstack contoller roles                             |
| `[compute]`           | Openstack compute nodes roles                         |
| `[ceph-control]`      | Ceph mon servers                                      |
| `[ceph-resource]`     | Ceph OSDs, ...                                        |
| `[ceph-rgw:children]` | Rados Gateway roles                                   |


## Create operator user

Ansible must be given access to the systems so that OSISM can orchestrate the systems.

In principle, this is achieved by the operator role. The basic command for this is as follows:
```
osism apply operator -u osism
``

Initial access to set up access can either be via a known password or an SSH public key already stored on the system can be used for this.

The operator public SSH key has to be added in advance on all nodes to `authorized_keys` file
of the user specified with `-u`. This key is stored as `operator_public_key` in the file
`environments/configuration.yml`.

It is important that this user has sudo rights with `NOPASSWD` to get root access for perfoming automations.

Alternatively (not recommended), the password can be stored in plain text in a file `/opt/configuration/secrets/become_password`.
The parameter `--become-pass-file /opt/configuration/secrets/become_password` must then also be specified:

```
osism apply operator -u osism \
   --become-pass-file /opt/configuration/secrets/become_password
```

:::warning

The initial user (specified i.e. with `-u osism`) will not be deactivated by default.
It is a good idea to delete the user at this point of the installation so that the user does not
accidentally remain active on the system with their known password and attackers can exploit this.
This can be achieved via the [`user_delete` array in the `user` role](https://github.com/osism/ansible-collection-commons/blob/main/roles/user/defaults/main.yml).

:::


### Use a SSH public key

This is the recommended way.

When using custom [osism/node-image](https://github.com/osism/node-image) the build argument `ssh_public_key_user_osism` can be used
to add the public key to the node image.
If you us this method, no additional flags are needed for executing the "operator" role.

### Use a password

When using the [osism/node-image](https://github.com/osism/node-image) the user is `osism`
and the password of this user is `password`. If you install Ubuntu manually the user usually
is `ubuntu`. If you want to use any other user here, that's no problem. It is important that
this user has sudo rights. The password according to what you have set yourself.

When using a custom [osism/node-image](https://github.com/osism/node-image) the build argument `password_hash` can be used
to define your own password for the node image.


The parameter `--conn-pass-file /opt/configuration/secrets/conn_password` must be specified:

```
echo "password" > /opt/configuration/secrets/conn_password
osism apply operator -u osism \
  --limit 'all:!manager' \
  --conn-pass-file /opt/configuration/secrets/conn_password
```

If a password is required for both sudo and login, use both arguments at the same time.

```
osism apply operator -u osism \
   --become-pass-file /opt/configuration/secrets/become_password \
   --conn-pass-file /opt/configuration/secrets/conn_password
```

## Optional: Using a proxy with your environment


1. Optional: Deploy squid proxy on the manager:
   ```
   osism apply squid
   ```
   This is only necessary if you use the proxy on the manager to enable external access of the nodes to the internet.

2. Have a look to the [proxy documentation](../configuration-guide/proxy.md) and configure it before running this playbook.
3. Apply proxy settings to the nodes
   ```
   osism apply proxy
   ```

## Network configuration. It is recommended to backup the existing network configuration.

1. Configure the network setup
   Have a look to the [network documentation](../../configuration-guide/network.md) and configure it before running this playbook
   ```
   osism apply network
   ```

2. Recommendend, but not mandatory: The reboot at this point is recommended to ensure that the network configuration is working.

   ```
   osism apply reboot -l 'all:!manager' -e ireallymeanit=yes
   ```

3. Check if all systems are reachable (you probably have to do this several times until all systems are accessible).

   ```
   osism apply ping
   ```

   * System is currently rebooting and is not yet accessible via network.

     ```
     fatal: [net003]: UNREACHABLE! => {"changed": false, "msg": "Connection timed
     out.", "unreachable": true}``
     ```

   * System has already been rebooted and is not accessible via the network.

     ```
     fatal: [net003]: UNREACHABLE! => {"changed": false, "msg": "EOF on stream;
     last 100 lines received:\nssh: connect to host 10.15.0.33 port 22: No route
     to host\r", "unreachable": true}
     ```

## Bootstrap the nodes

1. [Refresh facts](../operations-guide/manager/facts).

   ```
   osism apply facts
   ```

2. Bootstrap nodes

   ```
   osism apply bootstrap
   ```

3. Reboot (non-optional). Since the kernel version often changes after the initial bootstrap,
   the reboot should always be performed.

   ```
   osism apply reboot -l 'all:!manager' -e ireallymeanit=yes
   ```

4. Check if all systems are reachable (you probably have to do this several times until all systems are accessible).

   ```
   osism apply ping
   ```

## Finalize Boostrapping

1. Prepare the SSH configuration of the manager node.

   ```
   osism apply sshconfig
   ```

2. Make all SSH public keys known.

   ```
   osism apply known-hosts
   ```

Ready. All nodes are now bootstrapped and available to deploy services.
