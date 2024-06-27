---
sidebar_label: Bootstrap
sidebar_position: 40
---

# Bootstrap

:::info

The prerequisite for bootstraping the nodes of a cluster the Manager node has to be
prepares. What a Manager node is and how to prepare it is documented in the
[Manager chapter of the Deploy Guide](./manager.md).

All the nodes must also have already been provisioned. How manual provisioning is done
is documented in the [Provisioning chapter of the Deploy Guide](./provisioning.md).

:::

Before the nodes can be bootstrapped, they must all have already been provisioned.
The guide for this can be found in the section [Provisioning of bare-metal nodes](./provisioning.md).

The following steps are applied to bootstrap all nodes. After the completion of the bootstrap,
the nodes are already ready for use.

1. Create operator user.

   ```
   osism apply operator -u osism
   ```

   * When using the [osism/node-image](https://github.com/osism/node-image) the user is `osism`
     and the password of this user is `password`. If you install Ubuntu manually the user usually
     is `ubuntu`. If you want to use any other user here, that's no problem. It is important that
     this user has sudo rights. The password according to what you have set yourself.

   * The operator public SSH key has to be added in advance on all nodes to `authorized_keys` file
     of the user specified with `-u`. This key is stored as `operator_public_key` in the file
     `environments/configuration.yml`.

     Alternatively (not recommended), the password can be stored in plain text in a file `/opt/configuration/secrets/conn_password`.
     The parameter `--conn-pass-file /opt/configuration/secrets/conn_password` must then also be specified:

     ```
     osism apply operator -u osism \
       --conn-pass-file /opt/configuration/secrets/conn_password
     ```

   * It is important that this user has sudo rights with `NOPASSWD`.

     Alternatively (not recommended), the password can be stored in plain text in a file `/opt/configuration/secrets/become_password`.
     The parameter `--become-pass-file /opt/configuration/secrets/become_password` must then also be specified:

     ```
     osism apply operator -u osism \
       --become-pass-file /opt/configuration/secrets/become_password
     ```

   * If a password is required for both sudo and login, use both arguments at the same time.

     ```
     osism apply operator -u osism \
       --become-pass-file /opt/configuration/secrets/become_password \
       --conn-pass-file /opt/configuration/secrets/conn_password
     ```

   * When using the [osism/node-image](https://github.com/osism/node-image) the user is `osism` and the password of this
     user is `password`. If you install Ubuntu manually the user usually is `ubuntu`. The password according to what you
     have set yourself

2. Proxy deployment (optional). This is only necessary if you use the proxy on the manager to enable external access to
   the nodes.

   ```
   osism apply squid
   ```

3. Proxy configuration (optional). This is only necessary if you use the proxy on the manager to enable external access to
   the nodes.

   ```
   osism apply proxy
   ```

4. Network configuration. It is recommended to backup the existing network configuration.

   ```
   osism apply network
   ```

5. Reboot (optional). The reboot at this point is recommended to ensure that the network configuration is working.

   ```
   osism apply reboot -l 'all:!manager' -e ireallymeanit=yes
   ```

6. Check if all systems are reachable (you probably have to do this several times until all systems are accessible).

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

7. Refresh facts.

   ```
   osism apply facts
   ```

8. Bootstrap.

   ```
   osism apply bootstrap
   ```

9. Reboot (non-optional). Since the kernel version often changes after the initial bootstrap,
   the reboot should always be performed.

   ```
   osism apply reboot -l 'all:!manager' -e ireallymeanit=yes
   ```

10. Check if all systems are reachable (you probably have to do this several times until all systems are accessible).

    ```
    osism apply ping
    ```

11. Prepare the SSH configuration of the manager node.

    ```
    osism apply sshconfig
    ```

12. Make all SSH public keys known.

    ```
    osism apply known-hosts
    ```

Ready. All nodes are now bootstrapped and available to deploy services.
