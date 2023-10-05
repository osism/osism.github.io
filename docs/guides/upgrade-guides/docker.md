---
sidebar_label: Docker
sidebar_position: 20
---

# Docker

The Docker version used is defined via the parameter `docker_version` in the file
`environments/configuration.yml`.

```yaml
docker_version: '5:20.10.24'
```

All installable versions can be displayed with `apt-cache madison docker-ce`.

```
$ apt-cache madison docker-ce
 docker-ce | 5:24.0.6-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:24.0.5-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:24.0.4-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:24.0.3-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:24.0.2-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:24.0.1-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:24.0.0-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.6-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.5-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.4-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.3-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.2-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.1-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:23.0.0-1~ubuntu.22.04~jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.24~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.23~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.22~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.21~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.20~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.19~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.18~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.17~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.16~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.15~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.14~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
 docker-ce | 5:20.10.13~3-0~ubuntu-jammy | https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages
```

If, for example, you want to change the Docker version from `20.10.24` to `24.0.6`, `docker_version` in
`environments/configuration.yml` is changed accordingly. The `5:` prefix is placed in front of the version.

The upgrade of Docker is then done with the OSISM CLI. Docker on the manager itself is updated differently.
This does not work on the manager itself because the Docker service may be started during the upgrade and
individual containers may be started as a result. This would interrupt the run of the role itself.

```
osism apply docker -l 'docker:!manager'
```

By default, `serial` is set to `1` so that the the hosts are upgrade one after the other.
To adjust this, either use the `osism_serial` dictionary in the `environments/configuration.yml` file
to change the value in `docker` or append `-e serial=10%` to upgrade, for example, 10%
with each iteration.

```yaml
osism_serial:
  docker: 10%
```

On the manager itself, the `run.sh` script in the manager environment of the configuration must
currently be used to upgrade the Docker service. In a future release a dedicated `osism update docker`
command will be available for this purpose.

```
cd /opt/configuration/environments/manager
ANSIBLE_ASK_VAULT_PASS=True ./run.sh docker
```

## Restart behaviour

When upgrading, the Docker service is restarted. As a result, it can come to a restart of the
running containers. This can lead to interruptions in individual services. A change in
`/etc/docker/daemon.json` due to a new configuration parameter etc. can also result in a
required restart.

Whether the containers are restarted when the Docker Service is restarted depends on whether the
[Live Restore feature](https://docs.docker.com/config/containers/live-restore/) is used.
This can be configured via the parameter `docker_live_restore`. Live restore is enabled by default.
It is important to set the `docker_live_restore` parameter explicitly as a string. This means
`docker_live_restore: "false"` or `docker_live_restore: "true"`.

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
