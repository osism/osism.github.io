---
sidebar_label: Scripts
sidebar_position: 20
---

# Scripts

Scripts are included in container images to simplify development work and to enable
testing and hotfixes in running environments. What scripts are available and how to
use them is described in this chapter.

The `change.sh` script may be used to update repositories to development branches. Different
targets may be passed as a first parameter and existing branch names as a second. The availability
of targets depends on the container it is run in.

* For the `osismclient` container
  * `/change.sh osism <git branch>` for the [osism/python-osism](https://github.com/osism/python-osism) repository

* For the `inventory-reconciler` container
  * `/change.sh osism <git branch>` for the [osism/python-osism](https://github.com/osism/python-osism) repository
  * `/change.sh generics <git branch>` for the [osism/cfg-generics](https://github.com/osism/cfg-generics) repository
  * `/change.sh defaults <git branch>` for the [osism/defaults](https://github.com/osism/defaults) repository
  * `/change.sh release <git branch>` for the [osism/release](https://github.com/osism/release) repository

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

In this example, the `main` branch of [osism/ansible-collection-services](https://github.com/osism/ansible-collection-services)
is used in the `osism-ansible` container.

```bash
docker exec -u root -it osism-ansible /change.sh services main
```

The respective container should always be restarted after a change.

```bash
docker restart osism-ansible
```

If something has been changed in the defaults and is to be tested, this must be
changed in the inventory reconciler service. Regardless of which of the Ansible services
the customized defaults are intended for.

```bash
docker exec -u root -it manager-inventory_reconciler-1 /change.sh defaults main
docker restart manager-inventory_reconciler-1
```
