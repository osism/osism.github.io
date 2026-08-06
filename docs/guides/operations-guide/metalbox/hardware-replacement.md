---
sidebar_label: Hardware replacement
sidebar_position: 30
---

# Hardware replacement

Provisioning is driven from NetBox: the MetalBox reads the hardware inventory from it,
creates the corresponding node in Ironic and generates the configuration for the first
boot from it. When hardware of a node is replaced, the data in NetBox therefore has to
be brought in line with reality before the node is provisioned again. Otherwise the
node is deployed against the parameters of hardware it no longer has.

The steps on this page apply to every node type. They are done while the node is out of
service: for a node that is already in the environment, between taking it out and
provisioning it again, see [Node redeployment](./node-redeployment.md).

Which system each command runs on is given with every step, see
[Where the commands run](./index.md#where-the-commands-run).

## Checking the data in NetBox

When components have been replaced, or when a node is commissioned for the first time,
check the data recorded in NetBox and update it where needed:

* **MAC addresses** — when a network card has been replaced, the MAC addresses recorded
  so far have to be removed and the new ones added. They are part of the
  provisioning-relevant data and have to match the installed hardware.
* **Firmware versions and configuration** — check them against the state currently in
  use and adjust where needed.

Roll changes to the NetBox data out as described in
[Update of the NetBox data](../../upgrade-guide/metalbox/data-updates.md#update-of-the-netbox-data).

:::warning

Changing a NetBox resource can be interpreted as adding a new resource, so that the
previous one has to be deleted explicitly. This applies to changes in the repository as
well as to applying them on the MetalBoxes.

Changing a MAC address **adds** it to the existing ones. The previous MAC address has to
be deleted manually, or NetBox has to be rebuilt completely. Delete the old MAC
addresses in the GUI of the respective NetBox under `Addressing -> MAC Addresses`, using
the filter to restrict the entries shown to the node in question, then select them and
confirm the `Delete` function in the drop-down menu on the right. This has to be
repeated on the NetBox instances of the MetalBox systems, because resource management is
incremental there as well.

:::

## Applying the change to the baremetal service

**MetalBox.** Once NetBox is correct, update the inventory and synchronize the node with
the baremetal service so that Ironic picks up the changed parameters:

```bash
osism sync inventory
osism sync ironic
```

**MetalBox.** To check that the change has actually landed, compare the parameters
NetBox provides with the state Ironic holds for the node:

```bash
osism baremetal dump node101
osism baremetal dump --ironic node101
```

The first renders the data from NetBox, the second the actual deployment state from
Ironic.

Once the data matches the hardware, continue with
[Node deployment](./node-deployment.md) for a node that is provisioned for the first
time, or with [Node redeployment](./node-redeployment.md) for a node that goes back into
service.
