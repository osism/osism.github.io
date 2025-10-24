---
sidebar_label: Sysctl
---

# Sysctl

With the `osism.commons.sysctl` role, it is possible to manage the attributes of the kernel
via [sysctl](https://en.wikipedia.org/wiki/Sysctl) on a node.

The following defaults are set via the parameter `sysctl_defaults`.

| Group         | Attribute                      | Default  |
|:--------------|:-------------------------------|:---------|
| elasticsearch | vm.max_map_count               | 262144   |
| rabbitmq      | net.ipv4.tcp_keepalive_time    | 6        |
| rabbitmq      | net.ipv4.tcp_keepalive_intvl   | 3        |
| rabbitmq      | net.ipv4.tcp_keepalive_probes  | 3        |
| rabbitmq      | net.core.wmem_max              | 16777216 |
| rabbitmq      | net.core.rmem_max              | 16777216 |
| rabbitmq      | net.ipv4.tcp_fin_timeout       | 20       |
| rabbitmq      | net.ipv4.tcp_tw_reuse          | 1        |
| rabbitmq      | net.core.somaxconn             | 4096     |
| rabbitmq      | net.ipv4.tcp_syncookies        | 0        |
| rabbitmq      | net.ipv4.tcp_max_syn_backlog   | 8192     |
| generic       | vm.swappiness                  | 1        |
| compute       | net.netfilter.nf_conntrack_max | 1048576  |

The `sysctl_extra` parameter can be used to set your own parameters or overwrite existing
parameters in the defaults.

```yaml title="Set attribute fs.inotify.max_user_instances to 256 for all nodes in group generic"
sysctl_extra:
  generic:
    - name: fs.inotify.max_user_instances
      value: 256
```
