---
sidebar_label: Keystone
---

# Keystone

* List all users of a project who have been assigned the `member` role

  ```console
  $ openstack --os-cloud admin role assignment list --names --role member --project test
  +--------+-----------+-------+-----------+--------+--------+-----------+
  | Role   | User      | Group | Project   | Domain | System | Inherited |
  +--------+-----------+-------+-----------+--------+--------+-----------+
  | member | test@test |       | test@test |        |        | False     |
  +--------+-----------+-------+-----------+--------+--------+-----------+
  ```
