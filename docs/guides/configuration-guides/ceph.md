---
sidebar_label: Ceph
sidebar_position: 10
---

# Ceph

## Unique Identifier

The File System ID is a unique identifier for the cluster.
The identifier is set via the parameter `fsid` in `environments/ceph/configuration.yml`
and must be unique. It can be generated with `uuidgen`.

```yaml title="environments/ceph/configuration.yml"
fsid: c2120a4a-669c-4769-a32c-b7e9d7b848f4
```

## Client

In order to use the Ceph client on the manager node, the IP addresses of the Ceph
monitor services, usually they run on the Ceph control plane, are added in
`environments/infrastructure/configuration.yml` first.

```yaml title="environments/infrastructure/configuration.yml"
##########################
# cephclient

cephclient_mons:
  - 192.168.16.10
  - 192.168.16.11
  - 192.168.16.12
```

The `client.admin` keyring is placed in the file `environments/infrastructure/files/ceph/ceph.client.admin.keyring`.

## Swappiness

The swappiness is set via the `os_tuning_params` dictionary. The dictionary can
only be completely overwritten via an entry in the file `environments/ceph/configuration.yml`.

By default, the dictionary looks like this:

```
os_tuning_params:
  - { name: fs.file-max, value: 26234859 }
  - { name: vm.zone_reclaim_mode, value: 0 }
  - { name: vm.swappiness, value: 10 }
  - { name: vm.min_free_kbytes, value: "{{ vm_min_free_kbytes }}" }
```

The sysctl paremeters are written to the file `/etc/sysctl.d/ceph-tuning.conf`
on the storage nodes.

```
# cat /etc/sysctl.d/ceph-tuning.conf
fs.aio-max-nr=1048576
fs.file-max=26234859
vm.zone_reclaim_mode=0
vm.swappiness=10
vm.min_free_kbytes=4194303
```

## RGW service

1. Add following configuration in `environments/ceph/configuration.yml`

   ```yaml
   ceph_conf_overrides:
     "client.rgw.{{ hostvars[inventory_hostname]['ansible_hostname'] }}.rgw0":
       "rgw content length compat": "true"
       "rgw enable apis": "swift, s3, admin"
       "rgw keystone accepted roles": "member, admin"
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
   ```

   If the `ceph_conf_overrides` parameter already exists in `environments/ceph/configuration.yml`,
   expand it and do not overwrite it.

   If self-signed SSL certificates are used, two additional parameters must be set.

   ```
    "rgw keystone verify ssl": "false"
    "rgw verify ssl": "false"
   ```

   For all possible configuration parameters visit the
   [Ceph configuration reference](https://docs.ceph.com/en/quincy/radosgw/config-ref/).

2. Add the `ceph_rgw_keystone_password` from `environments/kolla/secrets.yml` to
   `environments/ceph/secrets.yml`.

3. Add following configuration in `environments/kolla/configuration.yml`

   ```yaml
   enable_ceph_rgw: true
   enable_ceph_rgw_keystone: true

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

## Extra pools

Extra pools can be defined via the `openstack_pools_extra` parameter.

```yaml title="inventory/group_vars/generic/ceph.yml"
openstack_cinder_extra001_pool:
  name: extra001
  pg_num: "{{ openstack_pool_default_pg_num }}"
  pgp_num: "{{ openstack_pool_default_pg_num }}"
  rule_name: "replicated_rule"
  min_size: "{{ openstack_pool_default_min_size }}"
  application: "rbd"

openstack_pools_extra:
  - "{{ openstack_cinder_extra001_pool }}"
```

If more than one Ceph cluster is managed with one manager, do not place the
parameters in `inventory/group_vars/generic` but in a corresponding directory.

If, for example, the inventory group of the Ceph cluster on which the additional
pools are to be created is `ceph.rbd`, then the parameters would be stored in
`inventory/group_vars/ceph.rbd.yml` accordingly.

| Parameter                       | Default value |
|---------------------------------|---------------|
|openstack_pool_default_pg_num    | 64            |
| openstack_pool_default_min_size | 0             |
