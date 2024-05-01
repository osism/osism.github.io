---
sidebar_label: Docker
---

# Docker

With the `osism.services.docker` role, it is possible to manage Docker.

## Configure logging drivers

Docker documentation: https://docs.docker.com/config/containers/logging/configure/

The role currently supports the following parameters with their respective defaults.

```yaml
docker_log_driver: "json-file"
docker_log_level: info
docker_log_opts:
  max-size: 10m
  max-file: 3
```

The log driver to be used can be configured with `docker_log_driver`. By default,
`json-file` is used. The log driver writes all logs of a container to a JSON file
in `/var/lib/docker/containers`. All supported log drivers can be found in the
[Docker documentation](https://docs.docker.com/config/containers/logging/configure/#supported-logging-drivers).

The log level can be configured via `docker_log_level`.

Parameters for the log driver used can be set with the `docker_log_opts` dictionary.
By default, the maximum size of a JSON file is set to 10 MByte with `max-size: 10m`.
If it contains more, the file is rotated.

Furthermore, `max-file: 3` specifies that up to 3 files should be available.
