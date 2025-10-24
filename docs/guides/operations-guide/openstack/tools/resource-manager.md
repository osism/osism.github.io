---
sidebar_label: Resource Manager
sidebar_position: 52
---

# Resource Manager

## Preparations

Prepare use of the OpenStack Resource Manager.

```bash
git clone https://github.com/osism/openstack-resource-manager
cd openstack-resource-manager
pipenv install
pipenv shell
```

Prepare cloud profile `admin` in `clouds.yml` and `secure.yml` (use `clouds.yml.sample` and `secure.yml.sample`
in the [openstack-resource-manager](https://github.com/osism/openstack-resource-manager) repository as sample files).

## Nova

### Live migration

Live migrate all instances from compute node `SOURCE` to compute node `TARGET`.

```bash
python3 src/host-action.py --yes --disable --action live-migrate --host SOURCE --input TARGET
```

### Evacuation

Evacuate all instances from compute node `SOURCE` to compute node `TARGET`.

```bash
python3 src/host-action.py --yes --action evacutate --host SOURCE --input TARGET
```

## Octavia

### Amphora rotation

Rotation of amphorae older than 30 days.

```console
$ python3 src/amphora.py --rotate
2023-10-12 21:00:38 | INFO     | Amphora 95a07c43-c0f9-44d2-bde8-a989e52427fa is older than 30 days
2023-10-12 21:00:38 | INFO     | Amphora 95a07c43-c0f9-44d2-bde8-a989e52427fa of loadbalancer 9008d3d7-f593-4bc3-941c-a740c178148d is rotated by a loadbalancer failover
```

## Cinder

```console
$ python3 src/volume.py
2023-12-11 23:09:44 | INFO     | Volume ad848454-ba1f-4c28-b9a8-edada17948b0 hangs in CREATING status for more than 2 hours
Delete volume ad848454-ba1f-4c28-b9a8-edada17948b0 [yes/no]:
```

## Orphans

```console
$ python3 src/orphan.py
2023-12-11 23:11:16 | INFO     | Checking nova / server
2023-12-11 23:11:21 | INFO     | Checking neutron / port
2023-12-11 23:11:23 | INFO     | Checking neutron / router
2023-12-11 23:11:23 | INFO     | Checking neutron / network
2023-12-11 23:11:24 | INFO     | Checking neutron / subnet
2023-12-11 23:11:24 | INFO     | Checking neutron / floatingip
2023-12-11 23:11:24 | INFO     | Checking neutron / rbacpolicy
2023-12-11 23:11:24 | INFO     | Checking neutron / securitygroup
2023-12-11 23:11:26 | INFO     | Checking neutron / securitygrouprule
2023-12-11 23:11:27 | INFO     | Checking glance / image
2023-12-11 23:11:30 | INFO     | Checking glance / imagemember
[...]
+---------------+-------------------+--------------------------------------+----------------------------------+
| servicename   | resourcename      | resource_id                          | project_id                       |
|---------------+-------------------+--------------------------------------+----------------------------------|
| neutron       | port              | 561f8f76-18b0-470a-92cd-4336346b4b18 | 3cfa8679f5d8429382b95d4d2dd80f79 |
| neutron       | port              | 6d1986e4-1e6d-4d4a-961d-97d372945bb1 | 3cfa8679f5d8429382b95d4d2dd80f79 |
| neutron       | port              | 74f9bddc-9bfa-4d06-a147-ca87127e501e | 8268b05ef24b41d8806c0fe417576610 |
| neutron       | port              | f630a66b-7725-4a68-868b-caebbaf1c003 | 8268b05ef24b41d8806c0fe417576610 |
| neutron       | router            | c0c4e4aa-53ee-4fd1-8f53-84d52cf6c60b | 3cfa8679f5d8429382b95d4d2dd80f79 |
| neutron       | router            | c8f9a13b-adcd-4a8e-942b-338bcf4dde7c | 8268b05ef24b41d8806c0fe417576610 |
| neutron       | network           | 62d6ad2a-0cda-4d45-9325-963b8eb67000 | 8268b05ef24b41d8806c0fe417576610 |
| neutron       | network           | 63b8fea6-7d7b-40c3-9c31-bee4404a92d6 | 3cfa8679f5d8429382b95d4d2dd80f79 |
| neutron       | subnet            | 0cd16262-330a-44ad-9160-daef84aded2d | 3cfa8679f5d8429382b95d4d2dd80f79 |
| neutron       | subnet            | 690dee14-ac12-464d-a911-a873c27ec818 | d33b0d15fd474131a335207216297a2a |
| neutron       | subnet            | 854e7c55-62e2-4679-9b18-805460b998ce | 8268b05ef24b41d8806c0fe417576610 |
| neutron       | rbacpolicy        | 00d7c2a2-6674-4f40-9f95-176a7858fcca | c8e4393b6d064a26a31014f82939172f |
| neutron       | rbacpolicy        | 0608c701-5b81-4712-989b-ba03cdcc255d | c8e4393b6d064a26a31014f82939172f |
[...]
| neutron       | securitygrouprule | fd3c553f-168e-4c24-ab40-09aa934bab86 | 3a96207b719643ae9ea9a81d95116e9e |
| neutron       | securitygrouprule | fdf337be-971c-4d5d-88ca-d90cdb468e88 | 3cfa8679f5d8429382b95d4d2dd80f79 |
| neutron       | securitygrouprule | ff8162fe-f053-49c9-8659-078061ce3e23 | d0b0add9ede0452791f71cb900e35242 |
| glance        | imagemember       | c7f2cb0c25d34c5d886ecaf483e5fda6     | c7f2cb0c25d34c5d886ecaf483e5fda6 |
| glance        | imagemember       | d4d0a161f9024fc8b517b0375eb97c89     | d4d0a161f9024fc8b517b0375eb97c89 |
| glance        | imagemember       | 150688b82efa44a5ac452d2b937f16e5     | 150688b82efa44a5ac452d2b937f16e5 |
| glance        | imagemember       | 150688b82efa44a5ac452d2b937f16e5     | 150688b82efa44a5ac452d2b937f16e5 |
| glance        | imagemember       | d33b0d15fd474131a335207216297a2a     | d33b0d15fd474131a335207216297a2a |
| cinder        | volume            | e7c4b05c-b76a-40cc-8381-03262e57eb94 | 9b5f7f8ed70d410c81e3f45bf4e36498 |
+---------------+-------------------+--------------------------------------+----------------------------------+
```
