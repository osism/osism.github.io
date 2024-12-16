---
sidebar_label: Kubernetes
---

# Kubernetes

The deployment of the k3s cluster is optional and disabled by default.

The deployment is based on [k3s-ansible](https://github.com/techno-tim/k3s-ansible) and the defaults
are configured and described in [099-k3s.yml](https://github.com/osism/defaults/blob/main/all/099-k3s.yml)

<!-- can be removed after https://github.com/osism/issues/issues/1067 is solved -->
:::warning
K3S is currently not installable on nodes that use a layer-3 underlay network by running an FRR instance on the node itself. 
The OSISM integration for this scenario is still pending.
Metal-LB either uses ARP for the leader election (which cannot work in principle) or starts its own
FRR instance which conflicts with the FRR instance of the host.
:::

1. Enable the deployment of the k3s cluster by setting `enable_osism_kubernetes` to `yes`

2. Optional: If you run your environment behind a http proxy, [configure the proxy settings](../proxy.md)

3. The use of more than 3 name servers for the Kubernetes nodes generates a large number of warning messages as only the first three name servers are used.

4. Define the `apiserver_endpoint` with a unused ipv4 address

5. Define the `metal_lb_ip_range` with a range of free ipv4 adresses

6. Create kubernetes token

   ```
   openssl rand -base64 1024
   ```

7. Add this token to the secrets file with the name `k3s_token`

   ```
   make ansible_vault_edit FILE=environments/secrets.yml EDITOR=<your favourite editor>
   ```

   An example secret:
   ```
   k3s_token: |
      9nfWMSnntyozgwATpsxk/5UFRtW4sRfiDUIFH3JtqUr2vLJ+FN3qdUJyaLFMp0oa
      O9BsyztqhARd7gBy7yRg9GnD6KcCsM25rCSAD60iRK8ifi7uWyuTKaqruqv+IgsG
      ...
      KqvUiYaCkUSKP0jt8oDcoJ4eXjpHpk32yRg7LC+CHUFlqTOvs45NpBOKApH8vlkb
      u4xdpdxT3TjPSibeQz5BOyFL+2slxxoXMv7p1YR0R68=
   ```


