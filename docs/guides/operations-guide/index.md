---
sidebar_label: Operations Guide
sidebar_position: 30
---

# Operations Guide

## Change Node states

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

## Use of custom plays

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

## Manage services

```
osism apply manage-service \
  -e service_name=rsysloc \
  -e service_state=restarted
```

## Manage containers

```
osism apply manage-container \
  -e container_name=nova_compute \
  -e container_action=restart
```

## Reboot nodes

When using reboot play, the node is rebooted directly. It is not ensured in
advance that there is no more payload on the node and no services etc. are
disabled.

Reboot node `testbed-node-0.testbed.osism.xyz` and wait until the reboot has
been completed and the system is accessible again.

```
osism apply reboot \
  -e reboot_wait=True \
  -e ireallymeanit=yes \
  -l testbed-node-0.testbed.osism.xyz
```

Reboot node `testbed-node-0.testbed.osism.xyz` and do not wait for the reboot
to complete.

```
osism apply reboot \
  -e ireallymeanit=yes \
  -l testbed-node-0.testbed.osism.xyz
```

## Working with the OOB Board via IPMI

### Display the IP address

```
$ sudo ipmitool lan print | grep 'IP Address'
IP Address Source       : DHCP Address
IP Address              : 10.10.0.100
```
