---
sidebar_label: Docker
sidebar_position: 20
---

# Docker

## Restart behaviour

When upgrading, the Docker service is restarted. As a result, it can come to a restart of the
running containers. This can lead to interruptions in individual services. A change in
`/etc/docker/daemon.json` due to a new configuration parameter etc. can also result in a
required restart.

Whether the containers are restarted when the Docker Service is restarted depends on whether the
[Live Restore feature](https://docs.docker.com/config/containers/live-restore/) is used.
This can be configured via the parameter `docker_live_restore`. Live restore is enabled by default.

But even if the Live Restore feature is enabled, certain upgrades will cause running containers
to be restarted:

> Live restore allows you to keep containers running across Docker daemon updates, but is only
> supported when installing patch releases (`YY.MM.x`), not for major (`YY.MM`) daemon upgrades.

There are two ways to prevent a restart of the Docker service during an upgrade.

If the restart behaviour of the Docker service is changed, always make sure to restart the
Docker service manually afterwards (e.g. by a system reboot).

1. A host group can be defined via the parameter `docker_ignore_restart_groupname`. The
   restart of the Docker service is not triggered for all hosts in this group. By default,
   `docker_ignore_restart_groupname` is set to `manager`. The parameter is best set in the
   `environments/configuration.yml` file when making an adjustment. For example, to prevent
   the restart on all hosts, `docker_ignore_restart_groupname` is set to `generic`.

   ```yaml
   docker_ignore_restart_groupname: generic
   ```

2. With the parameter `docker_allow_restart`, the restart of the Docker service can be
   prevented. By default, `docker_allow_restart` is set to `true`. It is recommended to set
   this parameter only at runtime. Otherwise, the best place for the parameter is the
   `environments/configuration.yml` file.

   ```
   osism apply docker -e docker_allow_restart=false
   ```
