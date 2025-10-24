---
sidebar_label: SSH Config
---

# SSH Config

With the `osism.commons.sshconfig` role, it is possible to manage a SSH config
file in the home directory of the operator user.

## Extra config

The `sshconfig_extra` parameter can be used to add any other SSH configuration to the `.ssh/config` file.

```yaml
sshconfig_extra: |
  Host github.com
    ProxyCommand nc -X connect -x <web-proxy-hostname-or-ip>:<web-proxy-port>> ssh.github.com 443
```

## Example

In the [testbed](https://github.com/osism/testbed)
the `/home/dragon/.ssh/config` file is created on the manager node `testbed-manager`.

```none title="Example for an assembled /home/dragon/.ssh/config file"
Host testbed-manager
  HostName testbed-manager.testbed.osism.xyz
  User dragon
  Port 22
  IdentityFile /opt/ansible/secrets/id_rsa.operator

####################
Host testbed-node-0
  HostName testbed-node-0.testbed.osism.xyz
  User dragon
  Port 22
  IdentityFile /opt/ansible/secrets/id_rsa.operator

####################
Host testbed-node-1
  HostName testbed-node-1.testbed.osism.xyz
  User dragon
  Port 22
  IdentityFile /opt/ansible/secrets/id_rsa.operator

####################
Host testbed-node-2
  HostName testbed-node-2.testbed.osism.xyz
  User dragon
  Port 22
  IdentityFile /opt/ansible/secrets/id_rsa.operator
```


## Defaults

| Parameter                    | Default                                | Description                                                                                                                                                                                                                                                                                                                             |
|:-----------------------------|:---------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sshconfig_groupname`        | `all`                                  | All nodes in this group are included.                                                                                                                                                                                                                                                                                                   |
| `sshconfig_order`            | `20`                                   | The `.ssh/config.d` directory is used to prepare the `.ssh/config` file. You can add your own files in this directory. Everything with a filename prefix smaller than `sshconfig_order` is placed at the beginning of the assembled `.ssh/config` file. Anything with a filename prefix greater than `sshconfig_order` goes at the end. |
| `sshconfig_port`             | `22`                                   | The SSH port.                                                                                                                                                                                                                                                                                                                           |
| `sshconfig_private_key_file` | `/opt/ansible/secrets/id_rsa.operator` | The identity file to use. The file itself must already exist there. The file is created by the `osism.services.manager` role.                                                                                                                                                                                                           |
| `sshconfig_user`             | `"{{ operator_user }}"`                | The user in which home directory the `.ssh/config` file will be generated.                                                                                                                                                                                                                                                              |
| `sshconfig_extra`            | `""`                                   | Add additional SSH configuration to the end of the `.ssh/config` file.                                                                                                                                                                                                                                                                  |
