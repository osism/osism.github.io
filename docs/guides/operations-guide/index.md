---
sidebar_label: Operations Guide
sidebar_position: 30
---

# Operations Guide

## Node states

:::note

This feature is currently under development and it is only usable with latest.

:::

A node can be in different states. Depending on the state, different actions
are possible or are triggered.

The individual states of a node can be retrieved via Ansible Facts and local
files on the node itself.

### Maintenance

```
osism set maintenance NODE
osism noset maintenance NODE
```

* Ansible fact: `ansible_local.osism.maintenance`
* State file: `/etc/osism/maintenance`

### Bootstrap

```
osism set bootstrap NODE
osism noset bootstrap NODE
```

* Ansible fact: `ansible_local.osism.bootstrap`
* State file: `/etc/osism/bootstrap`

## Custom plays

Custom Plays can be used in all environments in the configuration repository.

For example, this is a play to prepare all devices to be used for Ceph on a Ceph
resource node. It is saved in the configuration repository in the file
`environments/ceph/playbook-wipe-partitions.yml`. It is run with
`osism apply -e ceph wipe-parititons`.

```yaml title="environments/ceph/playbook-wipe-partitions.yml
---
- name: Wipe partitions
  hosts: ceph-resource
  gather_facts: false

  tasks:
    - name: Wipe partitions
      become: true
      ansible.builtin.shell: |
        wipefs --all "{{ item }}"
        dd if=/dev/zero of="{{ item }}" bs=1 count=4096
      changed_when: false
      with_items: "{{ devices }}"
```
