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

## OVN database reports "misrouted message" after reinstalling a node

* Problem: After completely reinstalling one OVN node, the `ovn_nb_db` (and usually `ovn_sb_db`) logs errors like

  ```console
  syntax error: Parsing raft append_request RPC failed: misrouted message (addressed to <server-id>)
  ```

  The OVN NB and SB databases form an OVSDB RAFT cluster (usually three members). Every member has a unique **server ID (SID)** that is generated when its database file is first created. Reinstalling a node from scratch recreates its database file and therefore gives it a **new SID**, while the surviving members still have the **old SID** of that node in their RAFT configuration. RAFT RPCs are addressed to a specific SID, so the surviving members keep sending `append_request` RPCs addressed to the now-gone old SID and the reinstalled node rejects them as *misrouted*. The reinstalled node may also have bootstrapped its own standalone cluster instead of joining the existing one.

* Solution:

  * Make sure the remaining members still have quorum before changing anything. With one of three nodes gone the other two form a quorum and the cluster stays writable. If you lost two of three, the cluster is read-only and you must recover from the single surviving database first — this procedure does not apply.

  * From a **healthy** member, look at the cluster state and identify the server IDs of the stale (old) member for both databases.

    ```console
    docker exec ovn_nb_db ovs-appctl -t /var/run/ovn/ovnnb_db.ctl cluster/status OVN_Northbound
    docker exec ovn_sb_db ovs-appctl -t /var/run/ovn/ovnsb_db.ctl cluster/status OVN_Southbound
    ```

    The stale member is the one in the `Servers:` list whose address points at the reinstalled node but whose SID no longer matches the node's current one. Depending on the state it may show a large `last msg ... ms ago` value, appear as disconnected, or carry no `last msg` entry at all.

  * To confirm which SID is the current (new) one, run `cluster/status` on the **reinstalled** node itself — it reports its own current SID marked `(self)`. Any SID listed at that node's address on the healthy members that differs from this `(self)` value is the stale one to remove.

  * Remove the stale member from the cluster. Run this on a healthy member for each affected database, using the short server ID from `cluster/status`.

    ```console
    docker exec ovn_nb_db ovs-appctl -t /var/run/ovn/ovnnb_db.ctl cluster/kick OVN_Northbound <old-nb-sid>
    docker exec ovn_sb_db ovs-appctl -t /var/run/ovn/ovnsb_db.ctl cluster/kick OVN_Southbound <old-sb-sid>
    ```

  * Only if OVN was already (re-)deployed on the reinstalled node and it came up with its own standalone cluster, remove the freshly created database containers and volumes there so it does not keep that wrong state when it rejoins. On a node that has not had OVN deployed yet there is nothing to clean up — skip straight to the redeploy.

    ```console
    docker stop ovn_nb_db ovn_sb_db
    docker rm ovn_nb_db ovn_sb_db
    docker volume rm ovn_nb_db ovn_sb_db
    ```

  * Re-deploy OVN so the reinstalled node joins the existing cluster as a fresh member.

    ```console
    osism apply ovn
    ```

  * Verify on all three nodes that each database again reports three connected members with a single leader.

    ```console
    docker exec ovn_nb_db ovs-appctl -t /var/run/ovn/ovnnb_db.ctl cluster/status OVN_Northbound
    docker exec ovn_sb_db ovs-appctl -t /var/run/ovn/ovnsb_db.ctl cluster/status OVN_Southbound
    ```
