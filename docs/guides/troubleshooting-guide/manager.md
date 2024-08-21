---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

## Reset

Sometimes it is necessary to reset the entire manager service.

:::warning

This is a disruptive action. Data is lost in the process. For example, the database
of the ARA service.

:::

1. Stop the manager service

   ```
   sudo systemctl stop docker-compose@manager.service
   ```

2. Files on the `/share` volume are backed up in advance and restored after
   the manager service is started.

   ```
   docker run --rm \
     --mount source=manager_share,target=/share \
     --volume $(pwd):/backup \
     busybox \
     tar -czvf /backup/manager-share-$(date +%Y%m%d).tar.gz /share
   ```

3. Delete the manager service. **This is a disruptive action.**

   ```
   docker compose --project-directory /opt/manager down -v
   ```

4. Start the manager service

   ```
   sudo systemctl start docker-compose@manager.service
   ```

5. Restore the files on the `/share` volume.

   ```
   docker run --rm \
     --mount source=manager_share,target=/share \
     --volume $(pwd):/backup \
     busybox \
     tar -xzvf /backup/manager-share-$(date +%Y%m%d).tar.gz -C /
   ```

6. Check that manager service is healthy

   ```
   docker compose --project-directory /opt/manager ps
   ```

   Depending on what the manager service looks like, this output may vary.

   ```
   NAME                             IMAGE                                        COMMAND                  SERVICE                CREATED              STATUS                        PORTS
   ceph-ansible                     quay.io/osism/ceph-ansible:quincy            "/entrypoint.sh osis…"   ceph-ansible           About a minute ago   Up About a minute (healthy)
   kolla-ansible                    quay.io/osism/kolla-ansible:2023.2           "/entrypoint.sh osis…"   kolla-ansible          About a minute ago   Up About a minute (healthy)
   manager-api-1                    quay.io/osism/osism:latest                   "osism service api"      api                    About a minute ago   Up About a minute (healthy)   192.168.16.5:8000->8000/tcp
   manager-ara-server-1             quay.io/osism/ara-server:latest              "sh -c '/wait && /ru…"   ara-server             About a minute ago   Up About a minute (healthy)   8000/tcp
   manager-beat-1                   quay.io/osism/osism:latest                   "osism service beat"     beat                   About a minute ago   Up About a minute (healthy)
   manager-conductor-1              quay.io/osism/osism:latest                   "osism worker conduc…"   conductor              About a minute ago   Up About a minute (healthy)
   manager-flower-1                 quay.io/osism/osism:latest                   "osism service flower"   flower                 About a minute ago   Up About a minute (healthy)
   manager-inventory_reconciler-1   quay.io/osism/inventory-reconciler:latest    "/sbin/tini -- /entr…"   inventory_reconciler   About a minute ago   Up About a minute (healthy)
   manager-listener-1               quay.io/osism/osism:latest                   "osism service liste…"   listener               About a minute ago   Up About a minute (healthy)
   manager-mariadb-1                index.docker.io/library/mariadb:11.3.2       "docker-entrypoint.s…"   mariadb                About a minute ago   Up About a minute (healthy)   3306/tcp
   manager-netbox-1                 quay.io/osism/osism-netbox:latest            "osism worker netbox"    netbox                 About a minute ago   Up About a minute (healthy)
   manager-openstack-1              quay.io/osism/osism:latest                   "osism worker openst…"   openstack              About a minute ago   Up About a minute (healthy)
   manager-redis-1                  index.docker.io/library/redis:7.2.4-alpine   "docker-entrypoint.s…"   redis                  About a minute ago   Up About a minute (healthy)   6379/tcp
   manager-watchdog-1               quay.io/osism/osism:latest                   "osism service watch…"   watchdog               About a minute ago   Up About a minute (healthy)
   osism-ansible                    quay.io/osism/osism-ansible:latest           "/entrypoint.sh osis…"   osism-ansible          About a minute ago   Up About a minute (healthy)
   osismclient                      quay.io/osism/osism:latest                   "sleep infinity"         osismclient            About a minute ago   Up About a minute
   ```

7. When the manager service is healthy, the inventory and the fact cache
   must be rebuilt.

   ```
   osism reconciler sync
   osism apply facts
   ```
