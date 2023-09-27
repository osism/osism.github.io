---
sidebar_label: Ceph
sidebar_position: 20
---

# Ceph

## RGW service

1. Add following configuration in `environments/ceph/configuration.yml`

   ```yaml
   ceph_conf_overrides:
     "client.rgw.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
       "rgw content length compat": "true"
       "rgw enable apis": "swift, s3, swift_auth, admin"
       "rgw keystone accepted roles": "_member_, member, admin"
       "rgw keystone accepted admin roles": "admin"
       "rgw keystone admin domain": "default"
       "rgw keystone admin password": "{{ ceph_rgw_keystone_password }}"
       "rgw keystone admin project": "service"
       "rgw keystone admin tenant": "service"
       "rgw keystone admin user": "ceph_rgw"
       "rgw keystone api version": "3"
       "rgw keystone url": "https://api-int.testbed.osism.xyz:5000"
       "rgw keystone verify ssl": "false"
       "rgw keystone implicit tenants": "true"
       "rgw s3 auth use keystone": "true"
       "rgw swift account in url": "true"
       "rgw swift versioning enabled": "true"
       "rgw verify ssl": "true"
       "rgw enforce swift acls": "true"
   ```

   If the `ceph_conf_overrides` parameter already exists in `environments/ceph/configuration.yml`,
   expand it and do not overwrite it.

2. Add the `ceph_rgw_keystone_password` from `environments/kolla/secrets.yml` to
   `environments/ceph/secrets.yml`.

3. Add following configuration in ``environments/kolla/configuration.yml``

   ```yaml
   enable_ceph_rgw: true
   enable_swift: false

   enable_ceph_rgw_keystone: true
   enable_ceph_rgw_loadbalancer: true
   enable_swift_s3api: true

   ceph_rgw_swift_compatibility: false
   ceph_rgw_swift_account_in_url: true

   ceph_rgw_hosts:
     - host: testbed-node-0
       ip: 192.168.16.10
       port: 8081
     - host: testbed-node-1
       ip: 192.168.16.11
       port: 8081
     - host: testbed-node-2
       ip: 192.168.16.12
       port: 8081
   ```

4. Apply `ceph-rgws` and `ceph-rgw` roles.

   ```
   osism apply ceph-rgws
   osism apply ceph-rgw
   ```
