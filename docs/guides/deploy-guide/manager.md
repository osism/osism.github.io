---
sidebar_label: Manager
sidebar_position: 1
---

# Manager

The prerequisite for the deployment of the Manager is the preparation of a
[configuration repository](../../getting-started/configuration-repository.md).

1. Install Ubuntu 22.04 on the node to be used as manager
   (see [Provisioning of management and control plane nodes](./bootstrap.md##provisioning-of-management-and-control-plane-nodes)).

2. A copy of the configuration repository is checked out on a local system,
   the so-called seed node, with which the manager node can be reached via SSH.

   ```
   git clone git@github.com:YOUR_ORGANISATION/YOUR_CONFIGURATION_REPOSITORY configuration
   cd configuration/environments/manager
   ```

## Create operator user

The operator user is created on each system. It is used as a service account for OSISM. All
containers run with this user. Ansible also uses this user to access the systems. Commands
on the manager node need to be run as this user. The name of the operator user is always `dragon`.

With `ANSIBLE_USER` the existing user account is set after the provsioning of the management
node. When using the [osism/node-image](https://github.com/osism/node-image) the user is `osism`
and the password of this user is `password`. If you install Ubuntu manually it usually is `ubuntu`.
The password according to what you have set yourself.

```
ANSIBLE_BECOME_ASK_PASS=True \
ANSIBLE_ASK_VAULT_PASS=True \
ANSIBLE_ASK_PASS=True \
ANSIBLE_USER=osism \
./run.sh operator
```

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
* To verify the creation of the operator user, use the private key file `id_rsa.operator`. Make
  sure you purge all keys from ssh-agent identity cache using `ssh-add -D`. You can print the list
  using `ssh-add -l`. The list should be empty.

  ```
  ssh-add -D
  ssh -o IdentitiesOnly=yes -i id_rsa.operator dragon@testbed-manager
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

## Network configuration

Most of the parameters required for Ansible (`ANSIBLE_BECOME_ASK_PASS`, `ANSIBLE_ASK_PASS`, `ANSIBLE_USER`, ...)
in the previous step are no longer necessary. If Ansible Vault is used, however, `ANSIBLE_ASK_VAULT_PASS`
must still be set.

To prevent recurring installation of Ansible Collections, `export INSTALL_ANSIBLE_ROLES=False` can be set.

The network configuration, already present on a system should be backuped before this step.
Then you can deploy the network configuration with the network role.

```
./run.sh network
```

Upon completion of the network configurtion, a system reboot should be performed to ensure the configuration
is functional and reboot safe. Since network services are not restarted automatically, later changes to the
network configuration are not effective without a manual apply of the network configuration or reboot of the
nodes.

## Bootstrap

Most of the parameters required for Ansible (`ANSIBLE_BECOME_ASK_PASS`, `ANSIBLE_ASK_PASS`, `ANSIBLE_USER`, ...)
in the previous step are no longer necessary. If Ansible Vault is used, however, `ANSIBLE_ASK_VAULT_PASS`
must still be set.

To prevent recurring installation of Ansible Collections, `export INSTALL_ANSIBLE_ROLES=False` can be set.

1. Bootstrap the manager node.

   ```
   ./run.sh bootstrap
   ```

2. Reboot the manager node.

   ```
   ./run.sh reboot
   ```

## Deploy

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
   ./run.sh netox
   ```

4. Deploy the manager service.

   ```
   ./run.sh manager
   ```

Ready. The manager is now prepared and you can continue with the bootstrap of the other nodes.
The seed node used until here is no longer necessary.
