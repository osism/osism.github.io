---
sidebar_label: Seed
sidebar_position: 10
---

# Seed

:::info

The prerequisite for the deployment of a cluster is a configuration repository.
What a configuration repository is and how it is created is described in the
[Configuration Guide](../configuration-guide/configuration-repository.md#creating-a-new-configuration-repository).

:::

The seed node is used once for the initial bootstrap of the manager node.

The seed node:

- can also be used to initially create and prepare the configuration repository.
- is not the manager node itself. It is sufficient to use the local workstation.
- doesn't have to be a dedicated system.
- is no longer needed after the installation of the manager is done.
- must be able to reach the manager node via SSH.

It is important for the further process that no packages are installed manually
on the manager. Especially not Docker.


The use of a Linux operating system on the seed node is recommended. This
documentation assumes that Ubuntu 24.04 is used. Other operating systems should
also work, but are not actively tested by us.

There are two ways to run the seed tooling:

* **Seed container** — a prebuilt container image with Ansible and all required
  OSISM collections. The only prerequisite on the seed node is a working
  Docker (or Podman) installation. No packages are installed on the seed node
  itself.
* **Manual installation** — install the required packages on the seed node and
  use the `run.sh` script from the configuration repository.

## Option 1: Seed container {#option-1-seed-container}

```bash
docker pull registry.osism.tech/osism/seed
```

`run.sh` itself runs the playbooks inside the seed container automatically —
there is no separate wrapper. When a container engine (Docker or Podman) is
available and `SEED_CONTAINER` is left at its default value of `auto`, `run.sh`
execs the `registry.osism.tech/osism/seed` image with the configuration
repository bind-mounted, so every Manager step is the same plain command:

```bash
./run.sh <playbook>
```

No extra setup is required beyond having Docker (or Podman) installed on the
seed node. The same `./run.sh <playbook>` command is used whether you are
running with the seed container or with a local venv installation — the
difference is transparent.

To force the local-venv path (Option 2) even when a container engine is
present, set `SEED_CONTAINER=false` before running any playbook.

## Option 2: Manual installation

```bash
sudo apt-get install git python3-pip python3-virtualenv sshpass libssh-dev
```

## Get a copy of the configuration repository

Each environment managed with OSISM is based on a configuration repository. This was
previously created with Cookiecutter and the [osism/cfg-cookiecutter](https://github.com/osism/cfg-cookiecutter)
repository.

The creation of the configuration repository is covered in chapter
[Creation of a configuration repository](../configuration-guide/configuration-repository.md#creating-a-new-configuration-repository)
of the [Configuration Guide](../configuration-guide/index.md).

A configuration repository is stored on a Git server (e.g. GitHub, Gitlab, ...). The
configuration repository is individual for each environment and is therefore not provided
by us.

The configuration repository to be used must be available on the seed node. In the following
example, replace `YOUR_ORG` and `YOUR_NEW_CONFIGURATION_REPOSITORY` accordingly.

```bash
git clone ssh://git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git
```

Examples:

* The repository is located in the `regiocloud` organization on GitHub, has the name
  configuration and can be accessed via SSH: `ssh://git@github.com:regiocloud/configuration.git`
* The repository is located in the `regiocloud` organization on Gitlab, has the name configuration
  and can be accessed via SSH: `ssh://git@gitlab.com:regiocloud/configuration.git`
* The repository is located in the `regiocloud` organization on an internal Gitlab, has the name
  configuration and can be accessed via SSH: `ssh://git@git.services.osism.tech:regiocloud/configuration.git`

If necessary, the configuration SSH key can be used for the initial transfer of the repository.

For this, the following content is added in `~/.ssh/config` and the SSH private key is stored in
`~/.ssh/id_rsa.configuration`.


```text
Host github.com
  HostName github.com
  User git
  Port 22
  IdentityFile ~/.ssh/id_rsa.configuration
```
