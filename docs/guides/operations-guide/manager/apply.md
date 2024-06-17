---
sidebar_label: Apply
---

# Apply


Applies are there to roll out Ansible Plays.  These are executed as background activity via a queuing system so that, for example, the loss of an SSH connection does not result in the execution being aborted.
In this case, the logs can also be analyzed [retrospectively](./log).

## List all available plays

```
$ osism apply
2023-09-30 10:09:25 | INFO     | No role given for execution. The roles listed in the table can be used.
+------------------------------------------------------------------+----------------+
| Role                                                             | Environment    |
|------------------------------------------------------------------+----------------|
| aodh                                                             | kolla          |
| barbican                                                         | kolla          |
| bifrost                                                          | kolla          |
| bifrost-keypair                                                  | kolla          |
| ceilometer                                                       | kolla          |
| certificates                                                     | generic        |
| cinder                                                           | kolla          |
| cloudkitty                                                       | kolla          |
| collectd                                                         | kolla          |
| common                                                           | kolla          |
| designate                                                        | kolla          |
| elasticsearch                                                    | kolla          |
| etcd                                                             | kolla          |
| glance                                                           | kolla          |
| gnocchi                                                          | kolla          |
| grafana                                                          | kolla          |
| heat                                                             | kolla          |
| horizon                                                          | kolla          |
| ironic                                                           | kolla          |
| iscsi                                                            | kolla          |
...
```

## Apply a role

```
$ osism apply operator -l node01
2024-06-14 09:33:10 | INFO     | Task f94a2e6f-d199-421c-b7b7-743db4661305 (operator) was prepared for execution.
2024-06-14 09:33:10 | INFO     | It takes a moment until task f94a2e6f-d199-421c-b7b7-743db4661305 (operator) has been started and output is visible here.

PLAY [Make ssh pipelining working] *********************************************

TASK [Do not require tty for all users] ****************************************
ok: [node01]

...
...

PLAY RECAP *********************************************************************
2024-06-14 09:34:14 | INFO     | Play has been completed. There may now be a delay until all logs have been written.
2024-06-14 09:34:14 | INFO     | Please wait and do not abort execution.
node01          : ok=11   changed=0    unreachable=0    failed=0    skipped=5    rescued=0    ignored=0
```

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

