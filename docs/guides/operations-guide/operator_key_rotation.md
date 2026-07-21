---
sidebar_label: Rotate Operator Key
---

# Rotation of the operator key

The operator key is used to gain access to all nodes managed by the OSISM
Manager and usually also to access the manager itself.
Rotation of the key is a multi-step process.

## Generating a new key and adding it to the list of authorized keys

* Generate a new ssh key, using `ssh-keygen` or any other tool suiting your
  requirements
* Distribute the private key to all jumphosts used to access the manager node
  with the operator user (usually `dragon`)
* Append the **public** key to the list of `operator_authorized_keys` in `environments/configuration.yml` of your configuration repository.
  ```yaml:environments/configuration.yml
  [...]
  operator_authorized_keys:
    - "{{ operator_public_key }}"
    - ssh-rsa AAAA...new key content...
  [...]
  ```
* Commit and push the change to the repository.

## Adding the new public key to the nodes

On the manager node:

* Ensure you can access all nodes by running
  ```bash
  osism apply ping
  ```
* Update your configuration repository to the commit containing your newly added key
  ```bash
  osism apply configuration
  ```
* Actually append the new key by applying the operator role. It is advisable to test the change by limiting the rollout to a single node using the `--limit` parameter.
  ```bash
  osism apply operator -- --limit node01
  ```
* Test the new access by explicitly specifying the private key.
  ```bash
  ssh -o IdentitiesOnly=yes -i ~/.ssh/id_new_private_key dragon@node01
  ```
* If the login is successful, proceed with the rollout across the fleet.
  ```bash
  osism apply operator
  ```

## Preparing the configuration repository to use the new key in the manager

* Replace the content of `operator_private_key` in `environments/secrets.yml` of your configuration repository with the content of the newly created **private** key file. Decrypt and re-encrypt the file using your configuration repository's Ansible Vault password.
  ```yaml:environments/secrets.yml
  [...]
  configuration_git_private_key: |
    -----BEGIN RSA PRIVATE KEY-----
    [...]
    -----END RSA PRIVATE KEY-----
  [...]
  ```
* Move the old public key to `operator_authorized_keys_delete` in `environments/configuration.yml` of your configuration repository. Usually the key is set in `operator_public_key` and only referenced in `operator_authorized_keys`, so the new key needs to be moved there. In the end your configuration should look similar to this:
  ```yaml:environments/configuration.yml
  [...]
  operator_public_key: ssh-rsa AAAA...new key content...
  operator_authorized_keys:
    - "{{ operator_public_key }}"
  operator_authorized_keys_delete:
    - ssh-rsa AAAA...old key content...
  [...]
  ```
* Commit and push the change to the repository.

## Switching the manager to the new key

On the manager node:

* Update your configuration repository to the commit that was prepared in the previous step
  ```bash
  osism apply configuration
  ```
* Update and restart the manager
  ```bash
  osism apply manager -- -e manager_service_allow_restart=false
  cd /opt/manager
  docker compose down
  docker compose up -d
  ```
* Reset the vault password
  ```bash
  osism vault password set
  ```
* Test the manager connection using the new key
  ```bash
  osism apply ping
  ```

## Remove the old key from the node's authorized keys

On the manager node:

* Remove the old key by applying the operator role. It is advisable to test the change by limiting the rollout to a single node using the `--limit` parameter.
  ```bash
  osism apply operator -- --limit node01
  ```
* Test whether the manager can still access the node
  ```bash
  osism apply ping -- --limit node01
  ```
* If the ping is successful, proceed with the rollout across the fleet.
  ```bash
  osism apply operator
  ```

The manager now uses the new key to access the nodes, and access for the old key has been revoked.

## Clean up the configuration repository

Since the old key has been removed, it may be removed from the configuration repository as well.

* Remove the key `operator_authorized_keys_delete` in `environments/configuration.yml` of your configuration repository.
* Commit and push the change to the repository.

## Rotating the key in the NetBox (MetalBox)

In case the hardware is provisioned using the OSISM MetalBox, the operator key also needs to be replaced in the `local_context` of each device, so that a newly provisioned system is accessible through the manager.
If your setup uses a separate repository for NetBox management, apply the following change there and update the git submodule in the configuration repository afterwards by running `git submodule update --init`. Remember to also commit the updated submodule.
In case your setup manages the NetBox from the configuration directory, apply the changes there and commit them directly.

* Find each occurrence of
  ```yaml
  - device:
      [...]
      local_context_data:
        operator_authorized_keys:
          - ssh-rsa AAAA...old key content...
  ```
  and replace the old key with the new **public** key.
* Commit and push the change to the repository.

On your MetalBox(es):

* Update the NetBox data in `/opt/configuration` with the change just committed.
* Manage the local NetBox to update it
  ```bash
  osism manage netbox
  ```

Do the same on your manager:

* Update the NetBox data in `/opt/configuration` with the change just committed.
  ```bash
  osism apply configuration
  ```
* Manage the local NetBox to update it
  ```bash
  osism manage netbox
  ```
