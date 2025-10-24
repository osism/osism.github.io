---
sidebar_label: OpenStack
sidebar_position: 40
---

# OpenStack

:::info

When upgrade the different OpenStack services, all containers must be
restarted. When restarting the API services, there is a short downtime
of the APIs. This downtime is usually less than 1 minute.

:::

1. OpenStack client

   ```bash
   osism apply openstackclient
   ```

2. Keystone

   ```bash
   osism apply -a pull keystone
   osism apply -a upgrade keystone
   ```

3. Glance

   ```bash
   osism apply -a pull glance
   osism apply -a upgrade glance
   ```

4. Designate

   ```bash
   osism apply -a pull designate
   osism apply -a upgrade designate
   ```

5. Placement

   ```bash
   osism apply -a pull placement
   osism apply -a upgrade placement
   ```

6. Cinder

   ```bash
   osism apply -a pull cinder
   osism apply -a upgrade cinder
   ```

7. Neutron

   ```bash
   osism apply -a pull neutron
   osism apply -a upgrade neutron
   ```

8. Nova

   ```bash
   osism apply -a pull nova
   osism apply -a upgrade nova
   ```

9. Octavia

   ```bash
   osism apply -a pull octavia
   osism apply -a upgrade octavia
   ```

   9.1. Update amphora image

   This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,
   this step is not necessary.

   We provide regularly updated images for Octavia in
   [osism/openstack-octavia/amphora-image](https://github.com/osism/openstack-octavia-amphora-image).
   The OSISM CLI can be used to upload the correct image depending on the OpenStack release
   used.

   ```bash
   osism manage image octavia
   ```

   9.2. Amphora rotation

   This step is only necessary if the Amphora driver is used. If OVN is used as the driver,
   this step is not necessary.

10. Horizon

    ```bash
    osism apply -a pull horizon
    osism apply -a upgrade horizon
    ```
