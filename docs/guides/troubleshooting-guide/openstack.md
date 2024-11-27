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

## Ceph connections not working 

* Problem: `auth: error parsing file` or `auth: failed to load`

  ```
  $ docker exec -ti nova_compute ceph -k /etc/ceph/ceph.client.nova.keyring -n client.nova -s
  2024-06-28T06:43:05.660+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input
  2024-06-28T06:43:05.660+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: error parsing file /etc/ceph/ceph.client.nova.keyring: cannot parse buffer: Malformed input
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 auth: failed to load /etc/ceph/ceph.client.nova.keyring: (5) Input/output error
  2024-06-28T06:43:05.664+0000 7d5df526b640 -1 monclient: keyring not found
  [errno 5] RADOS I/O error (error connecting to the cluster)
  ```

  Solution:

  Check your Ceph keyfiles. Probably a missing newline at the EOF.

## Cinder volume create failure

* Problem: Volume creation is stuck after creation of the database object with no host assigned.

  Solution:

  Database objects are created by the api service for valid request while the host is assigned by the scheduler.

  * Check the scheduler logs for errors
  * If there is nothing wrong with the scheduler itself, check the communication between the services via oslo.messaging
    Usually this is done via rabbitmq:
    * Check cluster status on every node for status, alarms and network partitions
      ```
      docker exec rabbitmq rabbitmqctl cluster_status
      ```
    * Check rabbitmq logs for errors
    * Check rabbitmq queues for errors or accumulated messages
      ```
      docker exec rabbitmq rabbitmqctl list_queues name type state consumers messages | grep -E '^cinder'
      ```
   * If everything seems fine check network connectivity to rule out network issues
     ```
     osism validate kolla-connectivity
     ```
   * If networking is fine then as a last resort a reset of rabbitmq may be considered
     Beware that this will destroy rabbitmq state which may result in inconsitent resource states
     ```
     osism apply rabbitmq-reset-state
     ```

