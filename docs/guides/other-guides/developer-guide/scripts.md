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

* [osism/inventory-reconciler](https://github.com/osism/container-image-inventory-reconciler) used by the service `manager-inventory_reconciler-1`
* [osism/python-osism](https://github.com/osism/python-osism) used by the service `osismclient`

## change.sh

The `change.sh` script may be used to update repositories to development branches. Different targets may be passed as a first parameter and existing branch names as a second.
The availability of targets depends on the container it is run in.

* For the `osism-ansible` container
  * `/change.sh osism <git branch>` for the [osism/python-osism](https://github.com/osism/python-osism) repository
  * `/change.sh playbooks <git branch>` for the [osism/ansible-playbooks](https://github.com/osism/ansible-playbooks) repository
  * `/change.sh [services|commons|validations] <git branch>` for the [osism/ansible-collection-services](https://github.com/osism/ansible-collection-services), [osism/ansible-collection-commons](https://github.com/osism/ansible-collection-commons), and [osism/ansible-collection-validations](https://github.com/osism/ansible-collection-validations) repositories

* For the `ceph-ansible` container
  * `/change.sh osism <git branch>` for the [osism/python-osism](https://github.com/osism/python-osism) repository
  * `/change.sh operations <git branch>` for the [osism/kolla-operations](https://github.com/osism/kolla-operations) repository

* For the `kolla-ansible` container
  * `/change.sh osism <git branch>` for the [osism/python-osism](https://github.com/osism/python-osism) repository
  * `/change.sh operations <git branch>` for the [osism/kolla-operations](https://github.com/osism/kolla-operations) repository
  * `/change.sh kolla-ansible <git branch>` for the [openstack/kolla-ansible](https://opendev.org/openstack/kolla-ansible) repository

In this example, the `main` branch of [osism/ansible-collection-services](https://github.com/osism/ansible-collection-services) is used in the `osism-ansible` container.

  ```
  docker exec -u root -it osism-ansible /change.sh services main
  ```

## Inventory Reconciler

The container image of the inventory reconciler contains a few more scripts.

* `change-generics.sh` for the [osism/cfg-generics](https://github.com/osism/cfg-generics) repository
* `change-defaults.sh` for the [osism/defaults](https://github.com/osism/defaults) repository
* `change-release.sh` for the [osism/release](https://github.com/osism/release) repository

It is important to restart the container afterwards.

```
docker restart manager-inventory_reconciler-1
```
