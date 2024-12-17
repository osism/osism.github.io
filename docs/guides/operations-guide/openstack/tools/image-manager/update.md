---
sidebar_label: Automated updates
sidebar_position: 1
---

# Image Manager update.py

## Overview

The OpenStack Image Manager `update.py` Script updates the `/etc/images/*.yaml` files to the always latest release of the distributions, set S3 mirror URLs and uploads the images to the mirror.

These updated yaml files are later processed by the Image Manger itself.


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
python contrib/update.py --help

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

:::note

* At this time the update.py expects all yaml files at /etc/images/, which can't be configured at the moment.
* Mirroring can't be disabled at the moment.

:::


Best run this script by cron or a CI job, to update all distribution files periodically to the latest release and afterwards run [Openstack Image Manager](../image-manager/).
The distribution image yaml files must exist before running the script, you can use the files from the Github repo at `etc/images/` as template for your first run.


```
$ python contrib/update.py
2024-04-24 09:29:44 | INFO     | main:300 - Processing file /etc/images/centos.yml
2024-04-24 09:29:44 | INFO     | update_image:179 - Checking image CentOS Stream 9
2024-04-24 09:29:44 | INFO     | update_image:182 - Latest download URL is https://cloud.centos.org/centos/9-stream/x86_64/images/CentOS-Stream-GenericCloud-9-HEREBE\d+\.\dDRAGONS.x86_64.qcow2
2024-04-24 09:29:44 | INFO     | update_image:185 - Getting checksums from https://cloud.centos.org/centos/9-stream/x86_64/images/CHECKSUM
2024-04-24 09:29:44 | INFO     | get_latest_default:62 - Latest URL is now https://cloud.centos.org/centos/9-stream/x86_64/images/CentOS-Stream-GenericCloud-9-20240422.0.x86_64.qcow2
2024-04-24 09:29:44 | INFO     | get_latest_default:63 - Latest filename is now CentOS-Stream-GenericCloud-9-20240422.0.x86_64.qcow2
2024-04-24 09:29:44 | INFO     | update_image:192 - Checksum of current CentOS-Stream-GenericCloud-9-20240422.0.x86_64.qcow2 is sha256:47dd9ad7048afe96bc6cc0b3fd8922f290e99c29d251affcd22d0afecfe0e337
2024-04-24 09:29:44 | INFO     | update_image:208 - Our checksum is sha256:47dd9ad7048afe96bc6cc0b3fd8922f290e99c29d251affcd22d0afecfe0e337
2024-04-24 09:29:44 | INFO     | update_image:211 - Image CentOS Stream 9 is up-to-date, nothing to do
2024-04-24 09:29:44 | INFO     | main:300 - Processing file /etc/images/debian.yml
2024-04-24 09:29:44 | INFO     | update_image:179 - Checking image Debian 11
2024-04-24 09:29:44 | INFO     | update_image:182 - Latest download URL is https://cdimage.debian.org/cdimage/cloud/bullseye/latest/debian-11-genericcloud-amd64.raw
2024-04-24 09:29:44 | INFO     | update_image:185 - Getting checksums from https://cdimage.debian.org/cdimage/cloud/bullseye/latest/SHA512SUMS
2024-04-24 09:29:45 | INFO     | update_image:192 - Checksum of current debian-11-genericcloud-amd64-20240211-1654.raw is sha512:bdccf01b778a602024918e27bb8cfd84be32104609651f457ac1db10ee5d2a490d0c60e21ce3c0a7704e7ca439281724d0d7e48d279c9fc3a5133a7283e321e4
2024-04-24 09:29:45 | INFO     | update_image:208 - Our checksum is sha512:bdccf01b778a602024918e27bb8cfd84be32104609651f457ac1db10ee5d2a490d0c60e21ce3c0a7704e7ca439281724d0d7e48d279c9fc3a5133a7283e321e4
2024-04-24 09:29:45 | INFO     | update_image:211 - Image Debian 11 is up-to-date, nothing to do
2024-04-24 09:29:45 | INFO     | update_image:179 - Checking image Debian 12
2024-04-24 09:29:45 | INFO     | update_image:182 - Latest download URL is https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-genericcloud-amd64-daily.raw
2024-04-24 09:29:45 | INFO     | update_image:185 - Getting checksums from https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/SHA512SUMS
2024-04-24 09:29:46 | INFO     | update_image:192 - Checksum of current debian-12-genericcloud-amd64-daily-20240424-1727.raw is sha512:f4850b3910adb80801649399d4f89be08974a05a198aba7093f6e72d38d82183bc5b36183fb8dd34cd48a3e226d46802d8a8d85e8b5714b67c52e7ea642f085e
2024-04-24 09:29:46 | INFO     | update_image:208 - Our checksum is sha512:5401f8c6361bb2a82c2c24b4b4606d95e77229152a80e61f9c613bc88e25de9257057d0ed68b0256b745c4059162a54970fe4a8daf456b2eb67b4f5db5c97fcc
2024-04-24 09:29:46 | INFO     | update_image:229 - New values are {'version': '20240424', 'build_date': datetime.date(2024, 4, 24), 'checksum': 'sha512:f4850b3910adb80801649399d4f89be08974a05a198aba7093f6e72d38d82183bc5b36183fb8dd34cd48a3e226d46802d8a8d85e8b5714b67c52e7ea642f085e', 'url': 'https://cdimage.debian.org/cdimage/cloud/bookworm/daily/20240424-1727/debian-12-genericcloud-amd64-daily-20240424-1727.raw'}
2024-04-24 09:29:46 | INFO     | main:300 - Processing file /etc/images/rockylinux.yml
2024-04-24 09:29:46 | INFO     | update_image:179 - Checking image Rocky 9
2024-04-24 09:29:46 | INFO     | update_image:182 - Latest download URL is https://download.rockylinux.org/pub/rocky/9/images/x86_64/Rocky-9-GenericCloud.latest.x86_64.qcow2
2024-04-24 09:29:46 | INFO     | update_image:185 - Getting checksums from https://download.rockylinux.org/pub/rocky/9/images/x86_64/Rocky-9-GenericCloud.latest.x86_64.qcow2.CHECKSUM
2024-04-24 09:29:47 | INFO     | update_image:192 - Checksum of current Rocky-9-GenericCloud.latest.x86_64.qcow2 is sha256:7713278c37f29b0341b0a841ca3ec5c3724df86b4d97e7ee4a2a85def9b2e651
2024-04-24 09:29:47 | INFO     | update_image:208 - Our checksum is sha256:7713278c37f29b0341b0a841ca3ec5c3724df86b4d97e7ee4a2a85def9b2e651
2024-04-24 09:29:47 | INFO     | update_image:211 - Image Rocky_9 is up-to-date, nothing to do
2024-04-24 09:29:47 | INFO     | main:300 - Processing file /etc/images/ubuntu.yml
2024-04-24 09:29:47 | INFO     | update_image:179 - Checking image Ubuntu 22.04
2024-04-24 09:29:47 | INFO     | update_image:182 - Latest download URL is https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img
2024-04-24 09:29:47 | INFO     | update_image:185 - Getting checksums from https://cloud-images.ubuntu.com/jammy/current/SHA256SUMS
2024-04-24 09:29:47 | INFO     | update_image:192 - Checksum of current jammy-server-cloudimg-amd64.img is sha256:62af6445fd2c31f68a069151938a7dcb49158644cae531dd22efc36c1c15a710
2024-04-24 09:29:47 | INFO     | update_image:208 - Our checksum is sha256:62af6445fd2c31f68a069151938a7dcb49158644cae531dd22efc36c1c15a710
2024-04-24 09:29:47 | INFO     | update_image:211 - Image Ubuntu_22.04 is up-to-date, nothing to do
2024-04-24 09:29:47 | INFO     | update_image:179 - Checking image Ubuntu 22.04 Minimal
2024-04-24 09:29:47 | INFO     | update_image:182 - Latest download URL is https://cloud-images.ubuntu.com/minimal/releases/jammy/release/ubuntu-22.04-minimal-cloudimg-amd64.img
2024-04-24 09:29:47 | INFO     | update_image:185 - Getting checksums from https://cloud-images.ubuntu.com/minimal/releases/jammy/release/SHA256SUMS
2024-04-24 09:29:48 | INFO     | update_image:192 - Checksum of current ubuntu-22.04-minimal-cloudimg-amd64.img is sha256:bd99c64ad9d926eb5769f9f2cfd96ae4989a029bd64bd3e7e7deb8cff4251c65
2024-04-24 09:29:48 | INFO     | update_image:208 - Our checksum is sha256:bd99c64ad9d926eb5769f9f2cfd96ae4989a029bd64bd3e7e7deb8cff4251c65
2024-04-24 09:29:48 | INFO     | update_image:211 - Image Ubuntu 22.04 Minimal is up-to-date, nothing to do
2024-04-24 09:29:48 | INFO     | update_image:179 - Checking image Ubuntu 24.04
2024-04-24 09:29:48 | INFO     | update_image:182 - Latest download URL is https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
2024-04-24 09:29:48 | INFO     | update_image:185 - Getting checksums from https://cloud-images.ubuntu.com/noble/current/SHA256SUMS
2024-04-24 09:29:48 | INFO     | update_image:192 - Checksum of current noble-server-cloudimg-amd64.img is sha256:32a9d30d18803da72f5936cf2b7b9efcb4d0bb63c67933f17e3bdfd1751de3f3
2024-04-24 09:29:48 | INFO     | update_image:208 - Our checksum is sha256:d7ba8d5d1d073f2dc8351973bf4f35157c846a0ea6ee16fb2a9f45a78953e4a7
2024-04-24 09:29:48 | INFO     | update_image:229 - New values are {'version': '20240423', 'build_date': datetime.date(2024, 4, 23), 'checksum': 'sha256:32a9d30d18803da72f5936cf2b7b9efcb4d0bb63c67933f17e3bdfd1751de3f3', 'url': 'https://cloud-images.ubuntu.com/noble/20240423/noble-server-cloudimg-amd64.img'}
```

These yaml files are now extended with additional fields and the `update.py` will take care of the versions, checksum, url and build date to the latest release in the yaml file on every run.

* latest_checksum_url  - URL of the distros checksum file
* latest_url           - URL of the distros latest image
* mirror_url           - URL of the Image File at the local S3 Mirror

```yaml title="someexample.yaml"
---
images:
  - name: Debian 12
    enable: true
    shortname: debian-12
    format: qcow2
    login: debian
    min_disk: 8
    min_ram: 512
    status: active
    visibility: public
    multi: true
    meta:
      architecture: x86_64
      hw_disk_bus: scsi
      hw_rng_model: virtio
      hw_scsi_model: virtio-scsi
      hw_watchdog_action: reset
      hypervisor_type: qemu
      os_distro: debian
      os_version: '12'
      replace_frequency: quarterly
      uuid_validity: last-3
      provided_until: none
    tags: []
    latest_checksum_url: https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/SHA512SUMS
    latest_url:
      https://cdimage.debian.org/cdimage/cloud/bookworm/daily/latest/debian-12-genericcloud-amd64-daily.qcow2
    versions:
      - build_date: 2024-04-11
        checksum:
          sha512:3d6f26616e2c8b705993ddef874232887cebe42f1e70fcc020827ac88e8990177d537d34538c71ae2afd3b8baca953fff71eaa7ef71e752e82532c93dcdca436
        url:
          https://cdimage.debian.org/cdimage/cloud/bookworm/daily/20240411-1714/debian-12-genericcloud-amd64-daily-20240411-1714.qcow2
        mirror_url:
          https://swift.services.a.regiocloud.tech/swift/v1/AUTH_b182637428444b9aa302bb8d5a5a418c/openstack-images/debian-12/20240411-debian-12.qcow2
        version: '20240411'

```
