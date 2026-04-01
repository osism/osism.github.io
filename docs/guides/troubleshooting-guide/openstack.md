---
sidebar_label: OpenStack
sidebar_position: 40
---

# OpenStack

## Database creation fails

* Problem:

  ```console
  TASK [keystone : Creating keystone database] ***********************************
  fatal: [testbed-node-0]: FAILED! => changed=false
    action: mysql_db
    msg: 'unable to find /var/lib/ansible/.my.cnf. Exception message: (2003, "Can''t connect to MySQL server on ''api-int.local'' ([Errno 111] Connection refused)")'
  ```

* Solution:

  Restart the `kolla_toolbox` container. in this case on the node `testbed-node-0`.

  ```console
  $ osism console testbed-node-0/
  testbed-node-0>>> restart kolla_toolbox
  kolla_toolbox
  testbed-node-0>>>
  ```

## Ceph connections not working

* Problem: `auth: error parsing file` or `auth: failed to load`

  ```console
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

* Solution:

  Check your Ceph keyfiles. Probably a missing newline at the EOF.

## Cinder volume create failure

* Problem: Volume creation is stuck after creation of the database object with no host assigned.

* Solution:

  Database objects are created by the API service for valid request while the host is assigned by the scheduler.

  * Check the scheduler logs for errors
  * If there is nothing wrong with the scheduler itself, check the communication between the services via oslo.messaging
    Usually this is done via rabbitmq:
    * Check cluster status on every node for status, alarms and network partitions
      ```bash
      docker exec rabbitmq rabbitmqctl cluster_status
      ```
    * Check rabbitmq logs for errors
    * Check rabbitmq queues for errors or accumulated messages
      ```bash
      docker exec rabbitmq rabbitmqctl list_queues name type state consumers messages | grep -E '^cinder'
      ```
    * If everything seems fine check network connectivity to rule out network issues
      ```bash
      osism validate kolla-connectivity
      ```
    * If networking is fine then as a last resort a reset of rabbitmq may be considered
      Beware that this will destroy rabbitmq state which may result in inconsistent resource states
      ```bash
      osism apply rabbitmq-reset-state
      ```

## Redeploying compute node results in nova-compute service startup error

* Problem: The `nova-compute` services is refusing to start because of `not our first startup on this host`

  ```console
  nova.exception.InvalidConfiguration: No local node identity found, but this is not our first startup on this host. Refusing to start after potentially having lost that state!
  ```

* Solution:

  * Get the ID of the hypervisor

    ```console
    $ openstack --os-cloud admin hypervisor show -f value -c id testbed-node-0
    a78b460d-2a38-4d50-b904-7eddbe6cfccb
    ```

  * Add this ID to `/var/lib/nova/compute_id` (in the case you use local storage)

    ```console
    $ docker exec -it nova_compute bash
    (nova-compute)[nova@testbed-node-0/]$
    # echo -n "a78b460d-2a38-4d50-b904-7eddbe6cfccb" > /var/lib/nova/compute_id
    ```

## Loadbalancer are stuck in an immutable state

* Problem: Newly created/updated loadbalancers using the `amphora` provider are stuck in provisioning state `PENDING_CREATE`/`PENDING_UPDATE`

* Solution:
  * One possible cause is a communication failure between octavia workers and the amphora
    * Check for expired octavia certificates
      ```sh
      osism apply octavia-certificates -- -e octavia_certs_check_expiry=true -e octavia_certs_expiry_limit=0
      ```
    * Recreate certificates if they have expired  
      Unfortunately the certificates will not be recreated automatically once expired and have to be deleted first
      * To recreate all certificates including server and client CA clean up by running
        ```sh
        docker exec kolla-ansible bash -c "rm -rf /share/{server,client}_ca"
        ```
        on the manager
      * If only the client certificate is expired execute the following steps on the manager to clean up the old certificate
        * Create a backup of the Client CA
          ```sh
          docker exec kolla-ansible cp -a /share/client_ca /share/client_ca-$(date -I)
          ```
        * Remove the expired client certificate
          ```sh
          docker exec -it kolla-ansible bash -c "rm /share/client_ca/{client.cert-and-key.pem,client.cert.pem,client.csr.pem,index.txt}"
          ```
      * To actually create and copy the existing and created octavia certificates execute the following commands on the manager
        ```sh
        osism apply octavia-certificates
        osism apply copy-octavia-certificates
        ```
      * Deploy octavia with newly created certificates
        ```sh
        osism apply octavia
        ```
    * If certificates are fine check the octavia loadbalancer management network as another possible cause
  * Once the root cause has been resolved fix loadbalancers stuck in state `PENDING_*`.  
    Unfortunately loadbalancers cannot be moved out of PENDING states using the API, so they are set to `ERROR` state in the DB  
    Connect to the octavia database on a control node using the octavia DB credentials
    ```sh
    docker exec -it mariadb mysql -uoctavia -p octavia
    ```
    For every ID of a loadbalancer stuck in a pending state set the `provisioning_status` to `ERROR`
    ```sql
    MariaDB [octavia]> update load_balancer set provisioning_status='ERROR' where id='7f46b3f1-a405-4bbd-b0d0-5bf33a8cc04f';
    ```
  * Failover loadbalancers just set to `ERROR` state
    ```sh
    openstack --os-cloud admin loadbalancer failover 7f46b3f1-a405-4bbd-b0d0-5bf33a8cc04f
    ```
    If the client or server CA certificates have also been changed then all amphora based loadbalancers will need to be failed over to reestablish communication.
