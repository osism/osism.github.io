---
sidebar_label: Console
sidebar_position: 15
---

# Console

A `console` command is available in the OSISM CLI. This allows specific parts of the
environment to be operated interactively.

## Ansible

Used tool: [ansible-console](https://docs.ansible.com/ansible/latest/cli/ansible-console.html)

```
$ osism console --type ansible testbed-node-0
Welcome to the ansible console. Type help or ? to list commands.

dragon@testbed-node-0 (1)[f:5]$ !uptime
testbed-node-0 | CHANGED | rc=0 >>
 18:14:15 up 80 days, 33 min,  0 users,  load average: 4.00, 3.07, 2.67
dragon@testbed-node-0 (1)[f:5]$
```

Shortcut: `osism console .testbed-node-0`

## Clush

Used tool: [ClusterShell](https://clustershell.readthedocs.io)

The same groups as defined in the Ansible Inventory can be used.

```
$ osism console --type clush control
Enter 'quit' to leave this interactive mode
Working with nodes: testbed-node-[0-2]
clush>
```

Shortcut: `osism console :control`

## Container

Used tool: [Python Prompt Toolkit](https://python-prompt-toolkit.readthedocs.io/en/master/index.html)

```
$ osism console --type container testbed-node-0/fluentd
(fluentd)[td-agent@testbed-node-0 /]$ ps ax
    PID TTY      STAT   TIME COMMAND
      1 ?        Ss     0:00 dumb-init --single-child -- kolla_start
      7 ?        Sl    24:28 /opt/td-agent/bin/ruby /usr/sbin/td-agent -o /var/log/kolla/fluentd/fluent
     25 ?        Sl   3519:55 /opt/td-agent/bin/ruby -Eascii-8bit:ascii-8bit /usr/sbin/td-agent -o /var
    238 pts/0    Ss     0:00 bash
    247 pts/0    R+     0:00 ps ax
```

Shortcut: `osism console testbed-node-0/fluentd`

## SSH

Used tool: [OpenSSH](https://www.openssh.com)

```
$ osism console --type ssh testbed-node-0
You have new mail.
Last login: Wed Sep 27 18:15:39 2023 from 192.168.16.5
dragon@testbed-node-0:~$ uptime
 18:16:25 up 80 days, 35 min,  1 user,  load average: 2.85, 3.04, 2.71
```

Shortcut: `osism console testbed-node-0`
