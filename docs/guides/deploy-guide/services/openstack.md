---
sidebar_label: OpenStack
sidebar_position: 60
---

# OpenStack

Common issues with deploying OpenStack services are documented in the
[OpenStack Troubleshooting Guide](../../troubleshooting-guide/openstack.md).

:::info

An OpenStack deployment contains a number of components providing APIs to access infrastructure resources.
The [OpenStack Components](https://www.openstack.org/software/project-navigator/openstack-components#openstack-services)
page lists the various services that can be deployed to provide such resources to cloud end users.
Unfortunately, not all of the OpenStack projects listed there are still active.
Not all of the services listed there are supported by OSISM.

:::

1. OpenStack client

   ```bash
   osism apply openstackclient
   ```

2. Keystone

   ```bash
   osism apply -a pull keystone
   osism apply keystone
   ```

3. Glance

   ```bash
   osism apply -a pull glance
   osism apply glance
   ```

4. Designate

   ```bash
   osism apply -a pull designate
   osism apply designate
   ```

5. Placement

   ```bash
   osism apply -a pull placement
   osism apply placement
   ```

6. Cinder

   ```bash
   osism apply -a pull cinder
   osism apply cinder
   ```

7. Neutron

   ```bash
   osism apply -a pull neutron
   osism apply neutron
   ```

8. Nova

   ```bash
   osism apply -a pull nova
   osism apply nova
   ```

9. Octavia

   ```bash
   osism apply octavia-certificates
   osism apply copy-octavia-certificates
   ```

   ```bash
   osism apply -a pull octavia
   osism apply octavia
   ```

10. Optional: Manage amphora image

   This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,
   this step is not necessary.

   We provide regularly updated images for Octavia in
   [osism/openstack-octavia/amphora-image](https://github.com/osism/openstack-octavia-amphora-image).

   * Configure API Endpoint

     For the command to be usable, a cloud profile for octavia must currently be added in the
     clouds.yml file of the OpenStack environment. The `auth_url` is changed accordingly.

     ```yaml title="environments/openstack/clouds.yml"
     clouds:
       [...]
       octavia:
         auth:
           username: octavia
           project_name: service
           auth_url: https://api.testbed.osism.xyz:5000/v3
           project_domain_name: default
           user_domain_name: default
         cacert: /etc/ssl/certs/ca-certificates.crt
         identity_api_version: 3
     ```

  * Configure the secret

    The secret is added to the secure.yml file. The password is set in the parameter
    `octavia_keystone_password` in the file `environments/kolla/secrets.yml`.

    Get the secret with
    ```bash
    make ansible_vault_show FILE=environments/kolla/secrets.yml |grep octavia_keystone_password
    ```

    ```yaml title="environments/openstack/secure.yml"
    ---
    clouds:
      [...]
      octavia:
        auth:
          password: VALUE_OF_octavia_keystone_password
    ```

  * Upload the correct and current image depending on the current Openstack release:

    ```bash
    osism manage image octavia
    ```

11. Horizon

    ```bash
    osism apply -a pull horizon
    osism apply horizon
    ```
