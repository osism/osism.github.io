---
sidebar_label: Style Guide
sidebar_position: 100
---

# Style Guide

## Ansible

We implement all the default rules of Ansible Lint. All default rules can be found in the
Ansible Lint documentation: <https://ansible.readthedocs.io/projects/lint/rules/>

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

[Black](https://github.com/psf/black) is a popular Python code formatter that automatically 
formats your code to adhere to a consistent style. We use it to automatically format the 
syntax of Python. A job is running in the CI that checks, if Black has been applied. Therefore, 
format the files with Black accordingly in advance.

### Installation 
```pip install black```

### Formatting a Single File
```black myfile.py```

### Formatting Multiple Files and/or directories 
```black file1.py file2.py dir/```

### Formatting an Entire Project
This command will format all Python files in the current directory and its subdirectories:

```black .```

### Check Mode (Dry Run)
Running Black with the ```--check``` option performs a dry run and reports files that would be 
changed without actually modifying them:

```black --check myfile.py```

### Excluding Files or Directories
You can exclude files or directories from formatting using the ```--exclude``` option:

```black --exclude=dir_to_exclude/ .```

### Integration with Code Editors
Many code editors have extensions or plugins that can automatically run Black on your code. 
For example, if you're using VSCode or PyCharm, you can easily integrate it into your IDE.

### Example of failed python-black Zuul job 
job-output.txt:
```
[…]
2023-11-16 14:38:14.149756 | TASK [python-black : Install pip module black]
2023-11-16 14:38:18.717886 | ubuntu-jammy | changed
2023-11-16 14:38:18.723062 | 
2023-11-16 14:38:18.723137 | TASK [python-black : Format code with Black if there is nothing to exclude]
2023-11-16 14:38:19.138060 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/adminer.py
2023-11-16 14:38:19.151965 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/bird.py
2023-11-16 14:38:19.163608 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/auditd.py
2023-11-16 14:38:19.187772 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/cephclient/package.py
2023-11-16 14:38:19.192695 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/cephclient/container.py
2023-11-16 14:38:19.219694 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/cgit.py
2023-11-16 14:38:19.230577 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/dnsdist.py
2023-11-16 14:38:19.275681 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/hddtemp/redhat.py
2023-11-16 14:38:19.300350 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/homer.py
2023-11-16 14:38:19.310641 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/lldpd.py
2023-11-16 14:38:19.318096 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/docker.py
2023-11-16 14:38:19.329099 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/osquery.py
2023-11-16 14:38:19.344766 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/rsyslog.py
2023-11-16 14:38:19.358190 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/smartd.py
2023-11-16 14:38:19.363578 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/tuned.py
2023-11-16 14:38:19.389205 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/molecule/delegated/tests/util/util.py
2023-11-16 14:38:19.406360 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/modules/kolla_container_facts.py
2023-11-16 14:38:19.415046 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/filter/address.py
2023-11-16 14:38:19.473508 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/modules/kolla_toolbox.py
2023-11-16 14:38:19.908963 | ubuntu-jammy | would reformat /home/zuul/src/github.com/osism/ansible-collection-services/plugins/modules/kolla_docker.py
2023-11-16 14:38:19.914395 | ubuntu-jammy |
2023-11-16 14:38:19.914412 | ubuntu-jammy | Oh no! ðŸ’¥ ðŸ’” ðŸ’¥
2023-11-16 14:38:19.914419 | ubuntu-jammy | 20 files would be reformatted, 18 files would be left unchanged.
2023-11-16 14:38:20.249358 | ubuntu-jammy | ERROR
2023-11-16 14:38:20.249501 | ubuntu-jammy | {
2023-11-16 14:38:20.249533 | ubuntu-jammy |   "delta": "0:00:01.053565",
2023-11-16 14:38:20.249553 | ubuntu-jammy |   "end": "2023-11-16 14:38:19.932073",
2023-11-16 14:38:20.249571 | ubuntu-jammy |   "msg": "non-zero return code",
2023-11-16 14:38:20.249587 | ubuntu-jammy |   "rc": 1,
2023-11-16 14:38:20.249603 | ubuntu-jammy |   "start": "2023-11-16 14:38:18.878508"
2023-11-16 14:38:20.249618 | ubuntu-jammy | }
[…]
```
