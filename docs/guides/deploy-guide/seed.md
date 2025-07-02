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

The seed node is used once for the initial bootstrap of the manager node. The seed node can
also be used to initially create and prepare the configuration repository. The seed node is
not the manager node itself. It is sufficient to use the local workstation. It doesn't have
to be a dedicated system. The seed node is no longer needed in the further process. The seed
node must be able to reach the manager node via SSH. It is important for the further process
that no packages are installed manually on the manager. Especially not Docker.


The use of Linux on the seed node is recommended. Other operating systems should also
work without problems. It is assumed in this documentation that Ubuntu 24.04 is used on
the seed node.

## Install required packages

```
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

```
git clone ssh://git@github.com:YOUR_ORG/YOUR_NEW_CONFIGURATION_REPOSITORY.git
```

Examples:

* The repository is located in the `regiocloud` organisation on GitHub, has the name
  configuration and can be accessed via SSH: `ssh://git@github.com:regiocloud/configuration.git`
* The repository is located in the `regiocloud` organisation on Gitlab, has the name configuration
  and can be accessed via SSH: `ssh://git@gitlab.com:regiocloud/configuration.git`
* The repository is located in the `regiocloud` organisation on an internal Gitlab, has the name
  configuration and can be accessed via SSH: `ssh://git@git.services.osism.tech:regiocloud/configuration.git`

If necessary, the configuration SSH key can be used for the initial transfer of the repository.

For this, the following content is added in `~/.ssh/config` and the SSH privte key is stored in
`~/.ssh/id_rsa.configuration`.


```
Host github.com
  HostName github.com
  User git
  Port 22
  IdentityFile ~/.ssh/id_rsa.configuration
```
