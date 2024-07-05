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

## Use of custom plays and roles

Custom plays and roles can be used in all environments of the configuration repository to add 
logic which should also be part of the configuration repository.

:::info
It seems to us to be a good idea to minimize the amount of such special solutions, as extensive in-house solutions can potentially result in unexpected interactions or
additional testing-, integration and maintenance work.

We would also like to make a clear recommendation that, if possible, missing functions should be resolved by contributing to OSISM.
:::

Some facts about custom plays and roles:

* Plays must be stored under the following naming scheme so that they can be executed with the OSISM command.
  ```environments/<environment>/playbook-<the name of the play>.yml```
* Without specifying a particular environment the "custom" environment is used.
  ```
  # executes: environments/custom/playbook-setup-serial-device.yml
  osism apply setup-serial-device
  ```
* Specifying a play of a environment:
  ```
  # executes environments/deph/playbook-wipe-parititons.yml
  osism apply -e ceph wipe-parititons
  ```
* Custom roles that are used for a specific environment must be stored under the following path so that they can be found by plays.
  `environments/<environment>/roles/<role>/`

### Example play with roles: Manage the infrastructure of the SCS testing environment

The SCS hardware landscape testing environment provides a selection of custom roles which are used
to manage some infrastructural aspects of this testing environment.

* Instructions [how to use](https://github.com/SovereignCloudStack/hardware-landscape/blob/main/documentation/System_Deployment.md) the custom code
* The custom  [playsi and roles](https://github.com/SovereignCloudStack/hardware-landscape/tree/main/environments/custom)

### Example play: Wiping partitions

For example, this is a play to prepare all devices to be used for Ceph on a Ceph
resource node.

* It is saved in the configuration repository in the file `environments/ceph/playbook-wipe-partitions.yml`.
* It is run with `osism apply -e ceph wipe-parititons`.

:::warning

Just to be on the safe side: The following example can be useful, but it can also cause a lot of damage. Be warned!

:::


```yaml title="environments/ceph/playbook-wipe-partitions.yml
---
- name: Wipe partitions
  hosts: ceph-resource
  gather_facts: false

  tasks:
    - name: Find all logical devices with prefix ceph
      ansible.builtin.find:
        paths: /dev/mapper
        recurse: false
        file_type: link
        patterns: "ceph*"
      register: result

    - name: Remove all ceph related logical devices
      become: true
      ansible.builtin.command: "dmsetup remove {{ item.path }}"
      loop: "{{ result.files }}"
      changed_when: true

    - name: Wipe partitions with wipefs
      become: true
      ansible.builtin.command: "wipefs --all {{ item }}"
      changed_when: true
      loop: "{{ ansible_local.testbed_ceph_devices_all }}"

    - name: Overwrite first 32M with zeros
      become: true
      ansible.builtin.command: "dd if=/dev/zero of={{ item }} bs=1M count=32 oflag=direct,dsync"
      changed_when: true
      loop: "{{ ansible_local.testbed_ceph_devices_all }}"
```
