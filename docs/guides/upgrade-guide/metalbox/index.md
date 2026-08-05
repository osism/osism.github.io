---
sidebar_label: MetalBox
sidebar_key: upgrade-guide-metalbox
---

# MetalBox

The following pages describe how a MetalBox is kept up to date.

* [Data updates](./data-updates.md) — update the NetBox data, the Ironic images, the
  container registry, and the Ubuntu repository files.
* [Service updates](./service-updates.md) — update the Manager, NetBox, the
  infrastructure services, and the OpenStack services.

The installation of a MetalBox is described in the
[Deploy Guide](../../deploy-guide/metalbox.md), its architecture in the
[OSISM MetalBox](../../../concepts/metalbox.md) concept.

All scripts referenced on these pages are located in `/opt/configuration/scripts` on
the MetalBox and are available on the `PATH` of the `dragon` user, so they can be
called by their plain name.
