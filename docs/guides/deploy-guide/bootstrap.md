---
sidebar_label: Bootstrap
sidebar_position: 40
---

# Bootstrap

Before the nodes can be bootstrapped, they must all have already been provisioned.
The guide for this can be found in the section
[Provisioning of management and control plane nodes](./provisioning)

The following steps are applied to bootstrap all nodes. After the completion of the bootstrap,
the nodes are already ready for use.

1. Create operator user.

   ```
   osism apply operator -u osism
   ```

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

   * When using the [osism/node-image](https://github.com/osism/node-image) the user is `osism` and the password of this
     user is `password`. If you install Ubuntu manually the user usually is `ubuntu`. The password according to what you
     have set yourself

2. Proxy deployment (optional). This is only necessary if you use the proxy on the manager to enable external access to
   the nodes.

   ```
   osism apply squid
   osism apply proxy
   ```

3. Network configuration. It is recommended to backup the existing network configuration.

   ```
   osism apply network
   ```

4. Reboot (optional). The reboot at this point is recommended to ensure that the network configuration is working.

   ```
   osism apply reboot -l 'all:!manager' -e ireallymeanit=yes
   ```

5. Check if all systems are reachable (you probably have to do this several times until all systems are accessible).

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

6. Refresh facts.

   ```
   osism apply facts
   ```

7. Bootstrap.

   ```
   osism apply bootstrap
   ```

8. Reboot (non-optional). Since the kernel version often changes after the initial bootstrap,
   the reboot should always be performed.

   ```
   osism apply reboot -l 'all:!manager' -e ireallymeanit=yes
   ```

9. Prepare the SSH configuration of the manager node.

   ```
   osism apply sshconfig
   ```

10. Check again if all systems are reachable (you probably have to do this several times until all systems are accessible).

   ```
   osism apply ping
   ```

Ready. All nodes are now bootstrapped and available to deploy services.
