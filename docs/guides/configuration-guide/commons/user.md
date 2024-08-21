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
    # default for groups is user_groups
    # groups:
    groups:
      - docker
    # default is a group with the name of the user
    # or user_primary_group if set
    # primary_group: dragon
  - name: testing_github
    key: https://github.com/testing.keys
```

By default a new group with the name of a user will be created and assigned as
primary group. It is possible to use an already existing group as primary group
for all users. Can be overwritten with the user specific `primary_group` key.

```yaml
user_primary_group: dragon
```

If all users should be added to other specific groups by default, the `user_groups`
parameter can be used. Can be overwritten with the user specific `groups` key.

```yaml
user_groups:
  - docker
```

If users should be deleted, they are added to the `user_delete` list.

```yaml
user_delete:
  - user_to_delete_1
  - user_to_delete_2
```
