---
sidebar_label: Simple Stress
sidebar_position: 55
---

# Simple Stress

## Overview
The OpenStack Simple Stress is a small stress test for your Openstack Cluster. You can use it for burnin tests or if you want to monitor your cluster perfomance.
It is able to start a predefined amount of Servers in specific networks in parallel and serial and removes them afterwards, so you can test your environment to the limits.

## Installation
Prepare to use the Openstack Simple Stress.

```bash
git clone https://github.com/osism/openstack-simple-stress
cd openstack-simple-stress
pipenv install
pipenv shell
```

## Defaults

The `main.py` command and the default options while executing the command.

```text
 --cleanup       true
 --cloud         simple-stress
 --compute-zone  nova
 --debug         false
 --delete        true
 --flavor        SCS-2V-8
 --floating      false
 --image         Ubuntu 22.04
 --interval      10  (seconds)
 --keypair       unset
 --network       simple-stress
 --network-zone  nova
 --number        1
 --parallel      1
 --prefix        simple-stress
 --storage-zone  simple-stress
 --timeout       600 (seconds)
 --volume        false
 --volume-number 1
 --volume-size   1 (gigabyte)
 --wait          true
```

## Usage

There must be a `clouds.yml` and a `secure.yml` file in the directory where the OpenStack Simple Stress will be executed, examples are provided within the git repository.

The cloud profile to be used can be specified via the optional `--cloud` parameter. By default, the cloud profile with the name `simple-stress` is used.

```console
$ python src/main.py -h
usage: main [-h] [--cleanup] [--cloud CLOUD] [--compute-zone COMPUTE_ZONE] [--config-dir DIR]
            [--config-file PATH] [--debug] [--delete] [--flavor FLAVOR] [--floating] [--image IMAGE]
            [--interval INTERVAL] [--keypair KEYPAIR] [--network NETWORK] [--network-zone NETWORK_ZONE]
            [--nocleanup] [--nodebug] [--nodelete] [--nofloating] [--novolume] [--nowait]
            [--number NUMBER] [--parallel PARALLEL] [--prefix PREFIX] [--storage-zone STORAGE_ZONE]
            [--timeout TIMEOUT] [--volume] [--volume-number VOLUME_NUMBER] [--volume-size VOLUME_SIZE]
            [--wait]

options:
  -h, --help            show this help message and exit
  --cleanup
  --cloud CLOUD         Cloud name
  --compute-zone COMPUTE_ZONE
                        Compute availability zone to use
  --config-dir DIR      Path to a config directory to pull `*.conf` files from. This file set is sorted,
                        so as to provide a predictable parse order if individual options are over-
                        ridden. The set is parsed after the file(s) specified via previous --config-
                        file, arguments hence over-ridden options in the directory take precedence. This
                        option must be set from the command-line.
  --config-file PATH    Path to a config file to use. Multiple config files can be specified, with
                        values in later files taking precedence. Defaults to None. This option must be
                        set from the command-line.
  --debug
  --delete
  --flavor FLAVOR
  --floating
  --image IMAGE
  --interval INTERVAL
  --keypair KEYPAIR
  --network NETWORK
  --network-zone NETWORK_ZONE
                        Network availability zone to use
  --nocleanup           The inverse of --cleanup
  --nodebug             The inverse of --debug
  --nodelete            The inverse of --delete
  --nofloating          The inverse of --floating
  --novolume            The inverse of --volume
  --nowait              The inverse of --wait
  --number NUMBER
  --parallel PARALLEL
  --prefix PREFIX
  --storage-zone STORAGE_ZONE
                        Storage availability zone to use
  --timeout TIMEOUT
  --volume
  --volume-number VOLUME_NUMBER
  --volume-size VOLUME_SIZE
  --wait
```

Running a small and simple test on your Openstack environment, using Ubuntu_22.04 image with the flavor of 2VCPUs and 8Gigabytes of RAM, starting 6 servers, 2 parallel each with a volume size of 20Gigabytes.

```console
$ python src/main.py --network test-net --flavor SCS-2V-8 --image Ubuntu_22.04 --number 6 --parallel 2 --volume-size 20
2024-04-23 11:47:16 | INFO     | Checking flavor SCS-2V-8
2024-04-23 11:47:17 | INFO     | flavor.id = 926f952f-0714-4c55-92c2-7514191fecce
2024-04-23 11:47:17 | INFO     | Checking image Ubuntu_22.04
2024-04-23 11:47:17 | INFO     | image.id = 667649d6-e828-403b-8871-15dde7b9ce85
2024-04-23 11:47:17 | INFO     | Checking network test-net
2024-04-23 11:47:18 | INFO     | network.id = 9688192e-11dd-4618-a18c-99d3267f630a
2024-04-23 11:47:18 | INFO     | Creating server simple-stress-0
2024-04-23 11:47:18 | INFO     | Creating server simple-stress-1
2024-04-23 11:47:18 | INFO     | Waiting for server 049bf974-b0fd-467f-aabd-3593b2a409a4 (simple-stress-0)
2024-04-23 11:47:18 | INFO     | Waiting for server e485697f-feae-458c-952d-000072374c3f (simple-stress-1)
2024-04-23 11:47:28 | INFO     | Waiting for boot / test results of 049bf974-b0fd-467f-aabd-3593b2a409a4 (simple-stress-0)
2024-04-23 11:47:29 | INFO     | Waiting for boot / test results of e485697f-feae-458c-952d-000072374c3f (simple-stress-1)
2024-04-23 11:47:39 | INFO     | Deleting server 049bf974-b0fd-467f-aabd-3593b2a409a4 (simple-stress-0)
2024-04-23 11:47:39 | INFO     | Waiting for deletion of server 049bf974-b0fd-467f-aabd-3593b2a409a4 (simple-stress-0)
2024-04-23 11:47:39 | INFO     | Deleting server e485697f-feae-458c-952d-000072374c3f (simple-stress-1)
2024-04-23 11:47:40 | INFO     | Waiting for deletion of server e485697f-feae-458c-952d-000072374c3f (simple-stress-1)
2024-04-23 11:47:49 | INFO     | Creating server simple-stress-2
2024-04-23 11:47:50 | INFO     | Creating server simple-stress-3
2024-04-23 11:47:50 | INFO     | Waiting for server 26595dd3-09d4-4758-8d1f-58a40b681d11 (simple-stress-2)
2024-04-23 11:47:51 | INFO     | Waiting for server a098cc12-94ff-4036-bf42-4fc08287809f (simple-stress-3)
2024-04-23 11:48:00 | INFO     | Waiting for boot / test results of 26595dd3-09d4-4758-8d1f-58a40b681d11 (simple-stress-2)
2024-04-23 11:48:01 | INFO     | Waiting for boot / test results of a098cc12-94ff-4036-bf42-4fc08287809f (simple-stress-3)
2024-04-23 11:48:11 | INFO     | Deleting server a098cc12-94ff-4036-bf42-4fc08287809f (simple-stress-3)
2024-04-23 11:48:12 | INFO     | Waiting for deletion of server a098cc12-94ff-4036-bf42-4fc08287809f (simple-stress-3)
2024-04-23 11:48:12 | INFO     | Deleting server 26595dd3-09d4-4758-8d1f-58a40b681d11 (simple-stress-2)
2024-04-23 11:48:12 | INFO     | Waiting for deletion of server 26595dd3-09d4-4758-8d1f-58a40b681d11 (simple-stress-2)
2024-04-23 11:48:22 | INFO     | Creating server simple-stress-4
2024-04-23 11:48:22 | INFO     | Waiting for server 05b9f996-5a06-4359-b495-3463cc7b81e0 (simple-stress-4)
2024-04-23 11:48:22 | INFO     | Creating server simple-stress-5
2024-04-23 11:48:23 | INFO     | Waiting for server 8d372de6-ca07-4afb-9e80-1589fd5242e8 (simple-stress-5)
2024-04-23 11:48:43 | INFO     | Waiting for boot / test results of 05b9f996-5a06-4359-b495-3463cc7b81e0 (simple-stress-4)
2024-04-23 11:48:43 | INFO     | Waiting for boot / test results of 8d372de6-ca07-4afb-9e80-1589fd5242e8 (simple-stress-5)
2024-04-23 11:48:55 | INFO     | Deleting server 05b9f996-5a06-4359-b495-3463cc7b81e0 (simple-stress-4)
2024-04-23 11:48:55 | INFO     | Deleting server 8d372de6-ca07-4afb-9e80-1589fd5242e8 (simple-stress-5)
2024-04-23 11:48:55 | INFO     | Waiting for deletion of server 05b9f996-5a06-4359-b495-3463cc7b81e0 (simple-stress-4)
2024-04-23 11:48:55 | INFO     | Waiting for deletion of server 8d372de6-ca07-4afb-9e80-1589fd5242e8 (simple-stress-5)
2024-04-23 11:49:05 | INFO     | Server 049bf974-b0fd-467f-aabd-3593b2a409a4 finished
2024-04-23 11:49:05 | INFO     | Server e485697f-feae-458c-952d-000072374c3f finished
2024-04-23 11:49:05 | INFO     | Server a098cc12-94ff-4036-bf42-4fc08287809f finished
2024-04-23 11:49:05 | INFO     | Server 26595dd3-09d4-4758-8d1f-58a40b681d11 finished
2024-04-23 11:49:05 | INFO     | Server 05b9f996-5a06-4359-b495-3463cc7b81e0 finished
2024-04-23 11:49:05 | INFO     | Server 8d372de6-ca07-4afb-9e80-1589fd5242e8 finished
2024-04-23 11:49:05 | INFO     | Runtime: 107.4460s
```

Using a config directory with configfiles to run the test.

Path to a config directory to pull `*.conf` files from. This file set is sorted,
so as to provide a predictable parse order if individual options are over-ridden.
The set is parsed after the file(s) specified via previous --config file,
arguments hence over-ridden options in the directory take precedence. This
option must be set from the command-line.


```bash
python src/main.py --config-dir /path/to/config-dir
```

## Config files

The config files which can be used for `main.py` are using the [oslo.config format](https://docs.openstack.org/oslo.config/latest/configuration/quickstart.html), you can set the command line options as `key = value pair` and create your own config files matching your setup.

```yaml title="mytest.conf"
[DEFAULT]
cloud = simple-stress
network = test-net
number = 6
parallel = 2
flavor = SCS-2V-8
image = Ubuntu_22.04
volume-size = 20
```


