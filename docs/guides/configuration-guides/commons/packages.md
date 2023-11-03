---
sidebar_label: Packages 
---

# Packages

With the `osism.commons.packages` role, it is possible to add packages on a node
in a general form.

```
required_packages_default:
  - ethtool
  - jq
  - rsyslog

required_packages_extra: []
required_packages: "{{ required_packages_default + required_packages_extra + required_packages_distribution }}"
```

## Distribution specific packages

### Debian

With Debian, the packages listed in `required_packages_distribution` are installed by default.

```
required_packages_distribution:
  - debsums
  - selinux-utils
  - ssh
```

The `apt_cache_valid_time` parameter can be used to set the `cache_valid_time` paremter
of the `ansible.builtin.apt` module. The module updates the apt cache if it is older than
the `cache_valid_time`. The parameter is set in seconds and defaults to `3600`.

## Upgrade of packages

The `upgrade_packages` parameter can be used to configure the upgrade of packages.
The parameter is set to `true` by default.
