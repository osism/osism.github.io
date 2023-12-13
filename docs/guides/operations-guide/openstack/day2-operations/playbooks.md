---
sidebar_label: Playbooks
sidebar_position: 40
---

# Playbooks

## Host aggregates

Host aggregates can be managed with the playbook. The playbook is used with
`osism apply -e openstack host-aggregates`.

Further arguments for host aggregates can be found in the
[documentation for the openstack.cloud.host_aggregate](https://docs.ansible.com/ansible/latest/collections/openstack/cloud/host_aggregate_module.html) Ansible module.

```yaml title="environments/openstack/playbook-host-aggregates.yml"
---
- name: Manage host aggregates
  hosts: localhost
  connection: local

  vars:
    host_aggregates:
      - name: aggregate1
        hosts:
          - host1
          - host2
          - host3

  tasks:
    - name: Create host aggregate
      openstack.cloud.host_aggregate:
        cloud: admin
        state: present
        name: "{{ item.name }}"
        hosts: "{{ item.hosts }}"
      loop: "{{ host_aggregates }}"
```
