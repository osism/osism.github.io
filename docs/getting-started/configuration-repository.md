---
sidebar_label: Configuration repository
sidebar_position: 10
---

# Configuration repository

## Initial creation

```
$ mkdir output
$ docker run --rm -v $(pwd)/output:/output -it quay.io/osism/cookiecutter
  [1/20] with_ceph (1):
  [2/20] ceph_network_backend (192.168.80.0/20):
  [3/20] ceph_network_frontend (192.168.64.0/20):
  [4/20] ceph_version (quincy):
  [5/20] domain (osism.xyz):
  [6/20] fqdn_external (api.osism.xyz):
  [7/20] fqdn_internal (api-int.osism.xyz):
  [8/20] git_host (github.com):
  [9/20] git_port (22):
  [10/20] git_repository (osism/cfg-cookiecutter):
  [11/20] git_username (git):
  [12/20] git_version (main):
  [13/20] ip_external (192.168.96.9):
  [14/20] ip_internal (192.168.32.9):
  [15/20] manager_version (latest):
  [16/20] name_server (149.112.112.112):
  [17/20] ntp_server (de.pool.ntp.org):
  [18/20] openstack_version (2023.1):
  [19/20] project_name (configuration):
[...]
```

### Use of a stable release

This is done via the parameter ``manager_version``. By default, this is always set to
``latest``. If, for example, the stable release ``6.0.0`` is to be used, the value for
this parameter is set to ``6.0.0``.

```
manager_version [latest]: 6.0.0
```

### Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>ceph_network_backend</code></td>
    <td>Address range for ceph's backend network</td>
    <td><code>192.168.80.0/20</code></td>
  </tr>
  <tr>
    <td><code>ceph_network_frontend</code></td>
    <td>Address range for ceph's frontend network</td>
    <td><code>192.168.64.0/20</code></td>
  </tr>
  <tr>
    <td><code>ceph_version</code></td>
    <td>The version of Ceph. When using a stable OSISM release (<code>manager_version != latest</code>), this value is ignored.</td>
    <td><code>quincy</code></td>
  </tr>
  <tr>
    <td><code>domain</code></td>
    <td>The Domain</td>
    <td><code>osism.xyz</code></td>
  </tr>
  <tr>
    <td><code>fqdn_external</code></td>
    <td>External API FQDN</td>
    <td><code>api.osism.xyz</code></td>
  </tr>
  <tr>
    <td><code>fqdn_internal</code></td>
    <td>Internal API FQDN</td>
    <td><code>api-int.osism.xyz</code></td>
  </tr>
  <tr>
    <td><code>git_host</code></td>
    <td>The address of the used Git server on which this repository will be stored later</td>
    <td><code>github.com</code></td>
  </tr>
  <tr>
    <td><code>git_port</code></td>
    <td>Port of the git repository</td>
    <td><code>22</code></td>
  </tr>
  <tr>
    <td><code>git_repository</code></td>
    <td>URI-Path to the git repository</td>
    <td><code>osism/cfg-cookiecutter</code></td>
  </tr>
  <tr>
    <td><code>git_username</code></td>
    <td>Username of the git repository</td>
    <td><code>git</code></td>
  </tr>
  <tr>
    <td><code>git_version</code></td>
    <td>Git Branch name</td>
    <td><code>main</code></td>
  </tr>
  <tr>
    <td><code>ip_external</code></td>
    <td>The external ip address of the API</td>
    <td><code>192.168.96.9</code></td>
  </tr>
  <tr>
    <td><code>ip_internal</code></td>
    <td>The internal ip address of the API</td>
    <td><code>192.168.32.9</code></td>
  </tr>
  <tr>
    <td><code>manager_version</code></td>
    <td>The version of OSISM. An overview of available OSISM releases can be found on <a href="https://release.osism.tech">release.osism.tech</a>.</td>
    <td><code>latest</code></td>
  </tr>
  <tr>
    <td><code>name_server</code></td>
    <td>Nameserver</td>
    <td><code>149.112.112.112</code></td>
  </tr>
  <tr>
    <td><code>ntp_server</code></td>
    <td>NTP server</td>
    <td><code>de.pool.ntp.org</code></td>
  </tr>
  <tr>
    <td><code>openstack_version</code></td>
    <td>The version of OpenStack. When using a stable OSISM release (<code>manager_version != latest</code>), this value is ignored.</td>
    <td><code>2023.1</code></td>
  </tr>
  <tr>
    <td><code>project_name</code></td>
    <td>Name of the configuration repository directory</td>
    <td><code>configuration</code></td>
  </tr>
  <tr>
    <td><code>with_ceph</code></td>
    <td>1 to use Ceph, 0 to not use Ceph</td>
    <td><code>1</code></td>
  </tr>
  <tr>
    <td><code>with_vault</code></td>
    <td>1 to use Ansible-Vault, 0 to not use Ansible-Vault</td>
    <td><code>1</code></td>
  </tr>
</table>

### Post-processing

* The password for Ansible Vault encrypted files, ist stored at `secrets/vaultpass`.
* The password of the generated Keepass file is `password`. This has to be changed.
* If a user config has been used, it can also be stored in the repository
* The contents in the generated configuration directory is stored in the repository.
  Be careful not to forget dotfiles like `.gitignore`. The directory itself is not
  stored in the repository.
