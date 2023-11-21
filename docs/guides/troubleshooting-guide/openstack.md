---
sidebar_label: OpenStack
sidebar_position: 40
---

# OpenStack

## Database creation fails

Problem:

```
TASK [keystone : Creating keystone database] ***********************************
fatal: [testbed-node-0]: FAILED! => changed=false
  action: mysql_db
  msg: 'unable to find /var/lib/ansible/.my.cnf. Exception message: (2003, "Can''t connect to MySQL server on ''api-int.local'' ([Errno 111] Connection refused)")'
```

Solution:

Restart the `kolla_toolbox` container. in this case on the node `testbed-node-0`.

```
$ osism console testbed-node-0/
testbed-node-0>>> restart kolla_toolbox
kolla_toolbox
testbed-node-0>>>
```
