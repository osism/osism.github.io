---
sidebar_label: Keystone
---

# Keystone

* List all users of a project

  ```
  $ openstack --os-cloud admin user list --project test --domain test
  +----------------------------------+------+
  | ID                               | Name |
  +----------------------------------+------+
  | 0c1afedc7f674c7f901cdf2775a5dd06 | test |
  +----------------------------------+------+
  ```
