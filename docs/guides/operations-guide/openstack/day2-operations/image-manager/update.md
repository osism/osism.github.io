---
sidebar_label: Automated updates 
sidebar_position: 1
---

# Image Manager update.py

## Overview

The OpenStack Image Manager update.py Script updates the `/etc/images/*.yaml` Files to the always latest release.


## Installation

Prepare to use the `update.py` script.

```
git clone https://github.com/osism/openstack-image-manager/ 
cd openstack-image-manager
pipenv install
pipenv shell
```

## Usage

```
python update.py --help
                                                                                                                                                          
 Usage: update.py [OPTIONS]                                                                                                                               
                                                                                                                                                          
╭─ Options ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ --debug                           Enable debug logging                                                                                                 │
│ --dry-run                         Do not perform any changes                                                                                           │
│ --minio-access-key          TEXT  Minio access key [env var: MINIO_ACCESS_KEY] [default: None]                                                         │
│ --minio-secret-key          TEXT  Minio secret key [env var: MINIO_SECRET_KEY] [default: None]                                                         │
│ --minio-server              TEXT  Minio server [env var: MINIO_SERVER] [default: swift.services.a.regiocloud.tech]                                     │
│ --minio-bucket              TEXT  Minio bucket [env var: MINIO_BUCKET] [default: openstack-images]                                                     │
│ --swift-prefix              TEXT  Swift prefix [env var: SWIFT_PREFIX] [default: swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/]                      │
│ --install-completion              Install completion for the current shell.                                                                            │
│ --show-completion                 Show completion for the current shell, to copy it or customize the installation.                                     │
│ --help                            Show this message and exit.                                                                                          │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

