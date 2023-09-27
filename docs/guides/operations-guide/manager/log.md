---
sidebar_label: Logging
sidebar_position: 10
---

# Logging

## Ansible

```
$ osism log ansible
(ara) help

Documented commands (use 'help -v' for verbose/'help <topic>' for details):
===========================================================================
alias  exit  history  quit          run_script  shell
edit   help  macro    run_pyscript  set         shortcuts

Application commands (type help <topic>):
=========================================
complete     host metrics  playbook delete   record delete  result show
expire       host show     playbook list     record list    task delete
help         play delete   playbook metrics  record show    task list
host delete  play list     playbook prune    result delete  task metrics
host list    play show     playbook show     result list    task show
```

## Container

```
$ osism log container testbed-node-0 horizon
[...]
++++ APACHE_LOCK_DIR=/var/lock/apache2
++++ export APACHE_LOG_DIR=/var/log/apache2
++++ APACHE_LOG_DIR=/var/log/apache2
++++ export LANG=C
++++ LANG=C
++++ export LANG
+++ install -d /var/run/apache2/
+++ rm -rf '/var/run/apache2/*'
+++ [[ ubuntu =~ centos|rocky ]]
+ echo 'Running command: '\''/usr/sbin/apache2 -DFOREGROUND'\'''
+ exec /usr/sbin/apache2 -DFOREGROUND
AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 192.168.16.10. Set the 'ServerName' directive globally to suppress this message
```

## OpenSearch

OpenSearch can be queried with [SQL](https://opensearch.org/docs/latest/search-plugins/sql/sql/index/).

```
$ osism log opensearch
```
