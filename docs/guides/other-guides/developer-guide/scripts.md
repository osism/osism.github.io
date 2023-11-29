---
sidebar_label: Scripts
sidebar_position: 20
---

# Scripts

Scripts are included in container images to simplify development work and to enable
testing and hotfixes in running environments. What scripts are available and how to
use them is described in this chapter.

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

* [osism/ceph-ansible](https://github.com/osism/container-image-ceph-ansible) used by the service `ceph-ansible`
* [osism/inventory-reconciler](https://github.com/osism/container-image-inventory-reconciler) used by the service `manager-inventory_reconciler-1`
* [osism/kolla-ansible](https://github.com/osism/container-image-kolla-ansible) used by the service `kolla-ansible`
* [osism/osism-ansible](https://github.com/osism/container-image-osism-ansible) used by the service `osism-ansible`
* [osism/python-osism](https://github.com/osism/python-osism) osed by the service `osismclient`

## Inventory Reconciler

The container image of the inventory eeconciler contains a few more scripts.

* `change-generics.sh` for the [osism/cfg-generics](https://github.com/osism/cfg-generics) repository
* `change-defaults.sh` for the [osism/defaults](https://github.com/osism/defaults) repository
* `change-release.sh` for the [osism/release](https://github.com/osism/release) repository

It is important to restart the container afterwards.

```
docker restart manager-inventory_reconciler-1
```

## osism-ansible

The osism-ansible container image contains a few more scripts.

* `change.sh` for the [osism/ansible-collection-services](https://github.com/osism/ansible-collection-services), [osism/ansible-collection-commons](https://github.com/osism/ansible-collection-commons), and [osism/ansible-collection-validations](https://github.com/osism/ansible-collection-validations) repositories

  In this example, the `main` branch of [osism/ansible-collection-services](https://github.com/osism/ansible-collection-services) is used.

  ```
  docker exec -u root -it osism-ansible /change.sh services main
  ```

* `change-playbooks.sh` for the [osism/ansible-playbooks](https://github.com/osism/ansible-playbooks) repository
