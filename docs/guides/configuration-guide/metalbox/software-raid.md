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
