---
sidebar_label: Packages
---

# Packages

With the `osism.commons.packages` role, it is possible to add packages on a node
The parameters should be used in the inventory or in the
`environments/configuration.yml` file.

The role is applied during the bootstrap. The role can be applied manually using
`osism apply packages`.

The following packages are installed by default.

```
required_packages_default:
  - curl
  - dmidecode
  - ethtool
  - iotop
  - jq
  - lsscsi
  - ltrace
  - mtr
  - nvme-cli
  - pciutils
  - rsyslog
  - socat
  - sysstat
  - tmux
  - tree
  - whois
```

Additional packages can be added via the `required_packages_extra` parameter.

```
required_packages_extra: []
```

## Distribution specific packages

### Debian

With Debian, the packages listed in `required_packages_distribution` are installed by default.

```
required_packages_distribution:
  - command-not-found
  - debconf
  - debsums
  - htop
  - iftop
  - iperf
  - multitail
  - ncdu
  - pv
  - python-is-python3
  - selinux-utils
  - ssh
```

The `apt_cache_valid_time` parameter can be used to set the `cache_valid_time` paremter
of the `ansible.builtin.apt` module. The module updates the apt cache if it is older than
the `cache_valid_time`. The parameter is set in seconds and defaults to `3600`.

### CentOS

With CentOS, the packages listed in `required_packages_distribution` are installed by default.

```
required_packages_distribution:
  - libselinux-utils
  - openssh
```

## Upgrade of packages

The `upgrade_packages` parameter can be used to configure the upgrade of packages.
The parameter is set to `true` by default.
