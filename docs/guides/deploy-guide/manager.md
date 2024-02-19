---
sidebar_label: Manager
sidebar_position: 30
---

# Manager

## Provision the operating system of the manager

The Manager Node serves as the central administration instance for managing the cloud environment.
With the help of Ansible and other OSISM-specific [components](../../architecture), the entire life cycle of the
system is coordinated from here (installation, customization, upgrades, etc.).

Requirements for the manager node:

- the system should have the following hardware features
  - at least 64 GB RAM
  - at least 256 GB hard disk space
  - the system should be initially and permanently accessible independently of the cloud environment itself from the seed node
  - the system should have direct access to the network areas of the individual server systems in the cloud environment
- an Ubuntu version matching the OSISM version should be installed on the system
  (typically the latest Ubuntu LTS version, a system based on one of the [osism - node-images](https://github.com/osism/node-image) would be ideal)
- no manual adjustments or installations should have been made on the system apart from the basic installation
- the system should be accessible from the [Seed Node](../seed) via SSH
- the system should have the correct time
- if possible, the system should use the operating system


## Install the manager

Change into the `configuration/environments/manager` directory of the configuration repository.
on the seed node.

The deployment of the seed node is documented in the [Deploy Guide for the seed node](../deploy-guide/seed).

```
cd configuration/environments/manager
```

### Create operator user

The operator user is created on each node. It is used as a service account for OSISM. All
containers run with this user. Ansible also uses this user to access the nodes. Commands
on the manager node need to be run as this user. The name of the operator user is always `dragon`.

With `ANSIBLE_USER` the existing user account is set after the provsioning of the management
node. When using the [osism/node-image](https://github.com/osism/node-image) the user is `osism`
and the password of this user is `password`. If you install Ubuntu manually the user usually
is `ubuntu`. If you want to use any other user here, that's no problem. It is important that
this user has sudo rights. The password according to what you have set yourself.

```
ANSIBLE_BECOME_ASK_PASS=True \
ANSIBLE_ASK_VAULT_PASS=True \
ANSIBLE_ASK_PASS=True \
ANSIBLE_USER=osism \
./run.sh operator
```

When the `./run.sh operator` is executed, the following prompts are displayed.

| Prompt                                       | Value                                              | Comment                              |
|----------------------------------------------|----------------------------------------------------|--------------------------------------|
| `SSH password:`                              | Password so that the `ANSIBLE_USER` can login      | Enabled by `ANSIBLE_ASK_PASS`        |
| `BECOME password[defaults to SSH password]:` | Password so that the `ANSIBLE_USER` can use `sudo` | Enabled by `ANSIBLE_BECOME_ASK_PASS` |
| `Vault password:`                            | Value of `secrets/vaultpass`                       | Enabled by `ANSIBLE_ASK_VAULT_PASS`  |

* If a password is required to login to the manager node, `ANSIBLE_ASK_PASS=True` must be set.
* If an SSH key is required to login to the manager node, the key has to be added on the manager
  node to `~/.ssh/authorized_keys` in the home directory of the user specified as `ANSIBLE_USER` first.
* If the error `ERROR! Attempting to decrypt but no vault secrets found` occurs, `ANSIBLE_ASK_VAULT_PASS=True`
  has to be set.
* If the error `/bin/sh: 1: /usr/bin/python: not found occurs`, Python has to be installed first on
  the manager node:

  ```
  ANSIBLE_USER=osism ./run.sh python3
  ```

* If you receive the following error message `ssh: Too many authentication failures` set
  `ANSIBLE_SSH_ARGS` environment variable to use only the operator ssh key for authentication.

  ```
  export ANSIBLE_SSH_ARGS="-o IdentitiesOnly=yes"
  ```

* The warning message `[WARNING]: running playbook inside collection osism.manager` can be ignored
* If Ansible Vault is used, let Ansible ask for the Vault password:

  ```
  export ANSIBLE_ASK_VAULT_PASS=True
  ```

Details on all parameters can be found in
[Ansible Configuration Settings](https://docs.ansible.com/ansible/latest/reference_appendices/config.html)
in the Ansible documentation.

| Environment variable      | Type    | Description                                                                                                                                                                   |
|---------------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ANSIBLE_ASK_PASS`        | Boolean | This controls whether an Ansible playbook should prompt for a login password. If using SSH keys for authentication, you probably do not need to change this setting.          |
| `ANSIBLE_ASK_VAULT_PASS`  | Boolean | This controls whether an Ansible playbook should prompt for a vault password.                                                                                                 |
| `ANSIBLE_BECOME_ASK_PASS` | Boolean | Toggle to prompt for privilege escalation password.                                                                                                                           |
| `ANSIBLE_SSH_ARGS`        | String  | If set, this will override the Ansible default ssh arguments.                                                                                                                 |
| `ANSIBLE_USER`            | String  | The user Ansible ‘logs in’ as.                                                                                                                                                |
To verify the creation of the operator user, use the private key file `id_rsa.operator`. Make
sure you purge all keys from ssh-agent identity cache using `ssh-add -D`. You can print the list
using `ssh-add -l`. The list should be empty.

```
ssh-add -D
ssh -o IdentitiesOnly=yes -i id_rsa.operator dragon@testbed-manager
```

### Apply the network configuration

Most of the parameters required for Ansible (`ANSIBLE_BECOME_ASK_PASS`, `ANSIBLE_ASK_PASS`, `ANSIBLE_USER`, ...)
in the previous step are no longer necessary. If Ansible Vault is used, however, `ANSIBLE_ASK_VAULT_PASS`
must still be set.

```
export ANSIBLE_ASK_VAULT_PASS=True
```

To prevent recurring installation of Ansible Collections, `export INSTALL_ANSIBLE_ROLES=False` can be set.

The network configuration, already present on a node should be backuped before this step.
Then you can deploy the network configuration with the network role.

```
./run.sh network
```

Upon completion of the network configurtion, a node reboot should be performed to ensure the configuration
is functional and reboot safe. Since network services are not restarted automatically, later changes to the
network configuration are not effective without a manual apply of the network configuration or reboot of the
nodes.

### Bootstrap

Most of the parameters required for Ansible (`ANSIBLE_BECOME_ASK_PASS`, `ANSIBLE_ASK_PASS`, `ANSIBLE_USER`, ...)
in the previous step are no longer necessary.

If Ansible Vault is used, however, `export ANSIBLE_ASK_VAULT_PASS=True` must still be set.

To prevent recurring installation of Ansible Collections, `export INSTALL_ANSIBLE_ROLES=False` can be set.
This is recommended.

1. Bootstrap the manager node.

   ```
   ./run.sh bootstrap
   ```

2. Reboot the manager node.

   ```
   ./run.sh reboot
   ```

### Deploy

1. Transfer the configuration repository.

   ```
   ./run.sh configuration
   ```

2. Deploy the Traefik service. This is optional and only necessary if the Traefik service is to be used.

   ```
   ./run.sh traefik
   ```

3. Deploy the Netbox service. This is optional and only necessary if the Netbox service is to be used.

   ```
   ./run.sh netbox
   ```

4. Deploy the manager service.

   ```
   ./run.sh manager
   ```

Finally, the Ansible Vault password is made known on the manager node.

```
osism set vault password
Ansible Vault password: ********
```

Ready. The manager is now prepared and you can continue with the bootstrap of the other nodes.
The seed node used until here is no longer necessary.
