---
sidebar_label: Style Guide
sidebar_position: 100
---

# Style Guide

## Ansible

We implement all the default rules of Ansible Lint. All default rules can be found in the
Ansible Lint documentation: https://ansible-lint.readthedocs.io/en/latest/default_rules/

### Task names

* Tasks must always have names. The only exception allowed is for forked playbooks.
* A name never starts with a small letter
* Names are written in present tense
* No punctuation is used in names

### `become` directive

The `become` directive is only set when needed and is always set explicitly for each task that needs it.

Blocks, roles, or playbooks are never executed in a privileged mode.

We always insert the `become` directive between the name of a task and the task itself. This also applies
to related directives like `become_user`  or `become_flags`. This is for better visibility if a task is
privileged or not.

```yaml
- name: Copy hddtemp configuration file
  become: true
  ansible.builtin.copy:
    src: "{{ ansible_os_family }}/hddtemp"
    dest: "{{ hddtemp_conf_file }}"
    owner: root
    group: root
    mode: 0644
  notify: Restart hddtemp service
```

### `when` directive

If you need to use the `when` directive add this at the end-section from the task where it is needed. This
makes the code easier to understand for others.

```yaml
- name: "Archive existing {{ resolvconf_file }} file"
  become: true
  ansible.posix.synchronize:
    src: "/etc/resolv.conf"
    dest: "/etc/resolv.conf.{{ ansible_date_time.date }}"
    archive: true
  delegate_to: "{{ inventory_hostname }}"
  when: stat_resolvconf_file.stat.islnk is defined and not stat_resolvconf_file.stat.islnk
```

### Lists as defaults

Defaults that provide a list are always defined as in the following example.

`docker_hosts_defaults` sets the defaults in the role. Overriding is only possible with the `defaults` repository.

In the configuration repository, `docker_hosts_extra` is then used to add additional items to the list.

`docker_hosts` itself is never modified from the outside.

```yaml
docker_hosts_defaults:
  - "unix:///var/run/docker.sock"
docker_hosts_extra: []
docker_hosts: "{{ docker_hosts_defaults + docker_hosts_extra }}"
```

## Containerfiles

## Commit messages

## Python

We use [Black](https://github.com/psf/black) to automatically format the syntax of Python.
A job is running in the CI that checks if Black has been applied. Therefore, format the
files with Black accordingly in advance.
