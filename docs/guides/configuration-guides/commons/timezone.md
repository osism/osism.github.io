---
sidebar_label: Timezone
---

# Timezone

With the `osism.commons.timezone` role, it is possible to manage the used timezone on a node.

This role is just a wrapper for the [community.general.timezone](https://docs.ansible.com/ansible/latest/collections/community/general/timezone_module.html)
module. The role also installs the `tzdata` package.

**Parameter**                | **Default**                            | **Description**
-----------------------------|----------------------------------------|---------------------
`timezone_hwclock`           | `UTC`                                  | Whether the hardware clock is in UTC or in local timezone.
`timezone_name`              | `UTC`                                  | Name of the timezone for the system clock.
