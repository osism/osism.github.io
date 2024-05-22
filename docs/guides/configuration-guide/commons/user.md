---
sidebar_label: User
---

# User

With the `osism.commons.user` role, it is possible to manage additional
user accounts on a node.

Users are managed via the `user_list` parameter.

```yaml
user_list:
  - name: testing
    key: ssh-rsa AAAAB...
    groups:  # default for groups is user_groups
      - dragon
      - docker
  - name: testing_github
    key: https://github.com/testing.keys
```

If users should be added to other specific groups by default, the `user_groups`
parameter can be used.

```yaml
user_grups:
  - docker
```

If users should be deleted, they are added to the `user_delete` list.

```yaml
user_delete
  - user_to_delete_1
  - user_to_delete_2
```
