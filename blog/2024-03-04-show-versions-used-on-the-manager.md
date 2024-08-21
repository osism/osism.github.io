---
slug: 2024-03-04-show-versions-used-on-the-manager
title: Show versions used on the manager
authors: [berendt]
tags: [OSISM, Machine Room]
---

The `osism get versions manager` command can be used to display the
versions of the individual modules used by OSISM. The OSISM version
used is listed under `OSISM Version`. If available, the release used
for the corresponding module is listed under `Module Release`.

```
$ osism get versions manager
+---------------+-----------------+------------------+
| Module        | OSISM version   | Module release   |
|---------------+-----------------+------------------|
| osism-ansible | 7.0.0b          |                  |
| ceph-ansible  | 7.0.0b          | quincy           |
| kolla-ansible | 7.0.0b          | 2023.2           |
+---------------+-----------------+------------------+
```
