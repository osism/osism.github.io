---
sidebar_label: Configuration Guides
sidebar_position: 30
---

# Configuration Guides

## Configuration Repository

The entire configuration required for OSISM is stored in a monorepo.

### Layout

A configuration repository is always composed of the same basic layout.

* `gilt.yml` & `requirements.txt` files
* `environments` directory
* `inventory` directory
* `netbox` directory (optional)

### `gilt.yml` & `requirements.txt` files

[Gilt](https://gilt.readthedocs.io) is a Git layering tool. We use Gilt to maintain the image versions,
Ansible configuration and scripts within the `environments/manager` directory.

The [current gilt.yml](https://github.com/osism/cfg-generics/blob/main/gilt.yml) file is always
located in the [osism/cfg-generics](https://github.com/osism/cfg-generics) repository.

```yaml title="gilt.yml (date of this example: 2023-10-09)"
---
- git: https://github.com/osism/cfg-generics.git
  version: main
  files:
    - src: src/render-images.py
      dst: ./environments/manager/render-images.py
    - src: gilt.yml
      dst: ./gilt.yml
    - src: requirements.txt
      dst: ./requirements.txt
    - src: environments/manager/images.yml
      dst: environments/manager/images.yml
    - src: environments/manager/run.sh
      dst: environments/manager/run.sh
    - src: environments/manager/ansible.cfg
      dst: environments/manager/ansible.cfg
    - src: environments/manager/requirements.*
      dst: environments/manager/
      post_commands:
        - python3 render-images.py
        - rm render-images.py
```


In the `requirements.txt` the necessary dependencies are listed to be able to execute Gilt.

To use Gilt the dependencies are installed first.

```
pip3 install -r requirements.txt
```

After that you can update the manager environment in `environments/manager`. Since the `gilt.yml`
itself is updated with Gilt it is always important to run the command twice.

```
gilt overlay
gilt overlay
```

If a stable OSISM release is used, the version to be used is specified by `MANAGER_VERSION`.
In the example, OSISM release 6.0.0 is used. More detail about this in
[Configuration Guides > Manager > Stable release](../guides/configuration-guides/manager.md#stable-release).

```
MANAGER_VERSION=6.0.0 gilt overlay
MANAGER_VERSION=6.0.0 gilt overlay
```

### `environments` directory

### `inventory` directory

### `netbox` directory
