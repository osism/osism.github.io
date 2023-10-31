---
sidebar_label: Scripts
sidebar_position: 20
---

# Scripts

Scripts are included in container images to simplify
development work and to enable testing and hotfixes in running
environments.
What scripts are available and how to use them is described in
this section.

## change-osism.sh

With the `change-osism.sh` script it is possible to bring the
[Python package osism](https://pypi.org/project/osism/) to a
development state from the
[osism/python-osism](https://github.com/osism/python-osism)
repository.

Here, the script is used in the running inventory reconciler
service to install the branch `main` of
[osism/python-osism](https://github.com/osism/python-osism).
Instead of `main`, any branch can be used.

```
docker exec -u root -it manager-inventory_reconciler-1 /change-osism.sh main
```

It is important to restart the container afterwards.

```
docker restart manager-inventory_reconciler-1
```

The script is included in the following container images:

* osism/ceph-ansible (used by the service ceph-ansible)
* osism/inventory-reconciler (used by the service manager-inventory_reconciler-1)
* osism/kolla-ansible (used by the service kolla-ansible)
* osism/osism-ansible (used by the service osism-ansible)

## change.sh

The `change.sh` script is used to bring the main core of an image
to a certain state.

In all containers that use the [osism image](https://quay.io/repository/osism/osism),
such as `osismclient`, the behavior of this script is identical to the behavior of
`change-osism.sh` script as described before.

```
docker exec -u root -it osismclient /change.sh main
```
