---
sidebar_label: Software RAID
sidebar_position: 10
---

# Software RAID

Configuring a node with software RAID is done by setting an appropriate
`target_raid_config` in the `ironic_parameters` custom field of the corresponding
NetBox device.

```yaml
---
- device:
    name: node101
    [...]
    custom_fields:
      [...]
      ironic_parameters:
        [...]
        target_raid_config:
          logical_disks:
            - size_gb: MAX
              raid_level: "1"
              is_root_volume: true
              controller: software
```

Use `osism sync ironic node101` to synchronize the `target_raid_config` with the
bare-metal node. The RAID configuration is applied during node provisioning with
`osism baremetal deploy node101`.

The above example configuration creates a software RAID1 as root volume using the full
size of all available disks. It is possible to restrict the used physical disks by
specifying the `physical_disks` attribute with an array of restrictions as described in
the Ironic documentation on
[root device hints](https://docs.openstack.org/ironic/latest/install/advanced.html#root-device-hints).
For example use

```yaml
---
- device:
    name: node101
    [...]
    custom_fields:
      [...]
      ironic_parameters:
        [...]
        target_raid_config:
          logical_disks:
            - size_gb: MAX
              raid_level: "1"
              is_root_volume: true
              controller: software
              physical_disks:
                - size: "<= 1000"
                - size: "<= 1000"
```

to restrict usage to two disks with a size smaller than or equal to 1000 GiB.

More examples and restrictions may be found in the
[Ironic RAID documentation](https://docs.openstack.org/ironic/latest/admin/raid.html).

A generic `target_raid_config` for all nodes may also be added to
`/opt/configuration/environments/manager/files/conductor.yml` on the MetalBox. This
however requires a reconfiguration of the Manager running on the MetalBox by executing
`update-manager.sh`. The change naturally needs to be reapplied when the MetalBox image
is replaced. Individual nodes with a differing `target_raid_config` may be overridden in
the NetBox device's custom field `ironic_parameters` as described above.

## Building the array without a deployment

The RAID configuration is applied during `osism baremetal deploy`, and a full
`osism baremetal clean` removes it again: the default is `--raid delete`, so a node that
had a mirror comes back from a clean without one. To build or rebuild the declared array
on its own, without deploying an image, name the `recreate` mode:

```bash
osism baremetal clean --raid recreate node101
```

This deletes any existing configuration, erases the disks and then builds
`target_raid_config`. That order is dictated by Ironic: the create step does not remove
existing disks and fails if the target disks are already partitioned, so the delete and
erase steps have to run first. The details are in the
[Ironic RAID documentation](https://docs.openstack.org/ironic/latest/admin/raid.html).

On hardware whose disks cannot be erased in band, the erase step has no working path and
a full clean fails before the array is ever built. Platform firmware that freezes the
ATA erase paths during POST is one cause. Combine the mode with `--metadata-only` there,
so only the disk metadata is erased:

```bash
osism baremetal clean --metadata-only --raid recreate node101
```

`recreate` refuses a node that has no `target_raid_config` rather than passing the
request on. Ironic accepts such a request and fails on the create step, which runs
last: the disks have already been erased by then, and the node ends up in
`clean failed` with maintenance mode set, so it needs the maintenance flag cleared and
the clean repeated. If a node configured as described above is refused, its
configuration has most likely not been synchronized yet; run
`osism sync ironic node101` first.

The remaining modes and the flag's argument order are described under
[Node deployment](../../operations-guide/metalbox/node-deployment.md).

## Configuring rebuild speed limits for nodes with software RAID

To configure the rebuild speed, `mdraid` provides the `speed_limit_min` and
`speed_limit_max` sysctl parameters. These may be used to configure a target rebuild
speed minimum for when there is no rebuild activity on an array and a maximum for when
there is no other activity. The given values are interpreted as Kibibytes per second.

Use the [sysctl role](../commons/sysctl.md) supplied with OSISM to modify these
parameters. For example, to set a minimum target speed of `5000 KiB/s` and a maximum
target speed of `500000 KiB/s` on all nodes in the compute group add the following to
`environments/generic/configuration.yml`.

```yaml
sysctl_extra:
  compute:
    - name: dev.raid.speed_limit_min
      value: 5000
    - name: dev.raid.speed_limit_max
      value: 500000
```

The `sysctl` values are then applied by running `osism apply sysctl`.
