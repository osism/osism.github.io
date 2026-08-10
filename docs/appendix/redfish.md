---
sidebar_label: Redfish Requirements
---

# Redfish Requirements

This appendix describes the requirements that the Redfish implementation of a server's
baseboard management controller (BMC) must meet so that the server can be provisioned
and managed by OSISM. It is intended to be shared with hardware vendors so that they
can verify the compatibility of their systems, and it defines the acceptance criteria
OSISM uses when qualifying new hardware.

:::warning No support commitment

Meeting the requirements in this document is a necessary precondition, not a
sufficient one: it does **not** imply that OSISM supports a particular hardware
model. Real-world Redfish implementations differ in behavior beyond what a
specification or profile validation can capture. Hardware models that have not
yet been qualified with OSISM must therefore always be expected to require
additional integration and stabilization effort.

:::

OSISM provisions bare-metal servers with [OpenStack Ironic](https://docs.openstack.org/ironic/latest/)
using the `redfish` hardware type. The key characteristics of the workflow (see the
[OSISM MetalBox concept](../concepts/metalbox.md) for details) are:

* Servers are booted exclusively via **Redfish virtual media** (Ironic boot interface
  `redfish-virtual-media`). PXE is intentionally not used, so no DHCP/TFTP
  infrastructure is required on the data network.
* Servers are deployed and operated in **UEFI boot mode**.
* Power and boot management are performed **out-of-band** through the Redfish API.
* The boot and deploy images are served from a plain **HTTP** server on the
  out-of-band management network and mounted by the BMC as a virtual CD.
* In addition to Ironic, OSISM itself reads hardware inventory (network interfaces,
  network adapters and their MAC addresses) directly from the Redfish API.

The requirements below are derived from the actual code paths of Ironic's `redfish`
drivers (based on the [sushy](https://opendev.org/openstack/sushy) library) and of the
OSISM tooling. Resource, property and action names refer to the
[DMTF Redfish specification (DSP0266)](https://www.dmtf.org/standards/redfish) and the
Redfish schema bundle.

## Requirement levels

The key words **MUST**, **MUST NOT**, **SHOULD** and **MAY** in this document are to be
interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

| Level  | Meaning                                                                                      |
|:-------|:---------------------------------------------------------------------------------------------|
| MUST   | Required for basic provisioning and operation. OSISM does not work without it.               |
| SHOULD | Used by OSISM for specific, commonly enabled features. Strongly recommended.                 |
| MAY    | Used only when the corresponding optional feature is enabled. Recommended for full coverage. |

## General protocol requirements

| #   | Requirement                                                                                                                                                                                                                                                                                                                                                                             | Level |
|:----|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------|
| G1  | Redfish protocol version **1.6.0 or later**, service root at `/redfish/v1/`.                                                                                                                                                                                                                                                                                                            | MUST  |
| G2  | API available via **HTTPS**. TLS 1.2 or later. Operation with a self-signed certificate must be possible (certificate verification is typically disabled on the management network); replacing the certificate with a customer-provided one SHOULD be supported.                                                                                                                        | MUST  |
| G3  | **Session-based authentication** (Redfish `SessionService`, token via the `Links/Sessions` collection as described in DSP0266), with **HTTP Basic authentication** as a fallback. OSISM and Ironic authenticate with `SessionOrBasicAuth`: a Redfish session is attempted first, HTTP Basic is used if session creation fails.                                                          | MUST  |
| G4  | Support for **multiple concurrent sessions**. Ironic, the OSISM conductor and operators may hold sessions at the same time; at least 8 concurrent sessions MUST be possible. Expired or invalidated sessions MUST result in `401`, so clients can re-authenticate.                                                                                                                      | MUST  |
| G5  | The `ComputerSystemCollection` (`/redfish/v1/Systems`) MUST contain **exactly one member** per BMC, or the vendor MUST document a stable, canonical `ComputerSystem` path that can be configured as `redfish_system_id`.                                                                                                                                                                | MUST  |
| G6  | Resource identifiers (`ComputerSystem`, `Manager`, `Chassis`, `VirtualMedia` member IDs) MUST be **stable** across reboots, BMC resets and firmware updates.                                                                                                                                                                                                                            | MUST  |
| G7  | `ComputerSystem/Links/ManagedBy` (to the `Manager`) and `ComputerSystem/Links/Chassis` MUST be populated.                                                                                                                                                                                                                                                                               | MUST  |
| G8  | Correct **ETag** handling: resources modified via `PATCH` (e.g. `ComputerSystem`, BIOS settings) MUST return ETags and accept `If-Match`.                                                                                                                                                                                                                                               | MUST  |
| G9  | Where `@Redfish.AllowableValues` annotations are published (e.g. `ResetType@Redfish.AllowableValues`, `BootSourceOverrideTarget@Redfish.AllowableValues`), the list MUST be **complete**. Clients reject values that are missing from the list without attempting the call.                                                                                                             | MUST  |
| G10 | API requests MUST be answered promptly (a few seconds for `GET`/`PATCH`/`POST`; long-running operations MUST be modelled asynchronously via the `TaskService`, see below).                                                                                                                                                                                                              | MUST  |
| G11 | `TaskService`: asynchronous operations (RAID configuration, firmware updates) MUST return HTTP `202` with a task monitor URI in the `Location` header. Tasks MUST report `TaskState` (`New`, `Starting`, `Running`, `Pending`, `Completed`, ...) and `TaskStatus` (`OK`, `Warning`, `Critical`), and SHOULD provide human-readable `Messages` based on the standard message registries. | MUST  |

## Power management

Ironic controls power exclusively through the `ComputerSystem` resource.

| #  | Requirement                                                                                                                                                                                              | Level  |
|:---|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| P1 | `ComputerSystem/PowerState` MUST reflect the actual power state (`On`, `Off`; `PoweringOn`/`PoweringOff` are understood). State transitions MUST become visible via `PowerState` within **300 seconds**. | MUST   |
| P2 | Action `#ComputerSystem.Reset` with `ResetType` **`On`**.                                                                                                                                                | MUST   |
| P3 | Action `#ComputerSystem.Reset` with `ResetType` **`ForceOff`**.                                                                                                                                          | MUST   |
| P4 | Action `#ComputerSystem.Reset` with `ResetType` **`ForceRestart`**.                                                                                                                                      | MUST   |
| P5 | Action `#ComputerSystem.Reset` with `ResetType` **`GracefulShutdown`** (used by OSISM for soft power-off, e.g. `osism baremetal poweroff --soft`).                                                       | MUST   |
| P6 | Action `#ComputerSystem.Reset` with `ResetType` **`GracefulRestart`**.                                                                                                                                   | SHOULD |
| P7 | Action `#ComputerSystem.Reset` with `ResetType` **`Nmi`** (NMI injection for crash-dump diagnostics).                                                                                                    | MAY    |
| P8 | A reset request targeting the current state (e.g. `On` while already powered on) SHOULD succeed or return a clear, descriptive error.                                                                    | SHOULD |

## Boot management

Boot control is performed via `PATCH` on `ComputerSystem` (property group `Boot`).
BMCs that redirect boot settings to a `@Redfish.Settings`/`SettingsObject` pending
area are supported, provided the semantics below still hold.

| #  | Requirement                                                                                                                                                                                                                                                                                        | Level  |
|:---|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| B1 | `Boot/BootSourceOverrideTarget` writable with the values **`Cd`** and **`Hdd`**.                                                                                                                                                                                                                   | MUST   |
| B2 | `Boot/BootSourceOverrideTarget` value **`Pxe`** (required for network-boot based workflows outside the OSISM default).                                                                                                                                                                             | SHOULD |
| B3 | `Boot/BootSourceOverrideTarget` values **`BiosSetup`** and **`UefiHttp`** (the latter together with `Boot/HttpBootUri` enables the alternative `redfish-https` boot interface without virtual media).                                                                                              | MAY    |
| B4 | `Boot/BootSourceOverrideEnabled` writable with **`Once`** and **`Continuous`**. A `Once` override MUST clear automatically after the next boot.                                                                                                                                                    | MUST   |
| B5 | `Boot/BootSourceOverrideMode` readable and writable with **`UEFI`** (`Legacy` MAY be supported, but is not used by OSISM).                                                                                                                                                                         | MUST   |
| B6 | A minimal `PATCH` that sets only `BootSourceOverrideTarget` (without resending `BootSourceOverrideEnabled` and `BootSourceOverrideMode`) MUST be accepted. Implementations MUST NOT require the full `Boot` triple in every request.                                                               | MUST   |
| B7 | The boot override configured via Redfish MUST actually take effect on the next boot, and the current values MUST be readable back via `GET`.                                                                                                                                                       | MUST   |
| B8 | The **persistent boot order** (UEFI boot entries) MUST NOT be reordered autonomously by BIOS/UEFI firmware after an operating system has been installed. (Field issue: firmware moving the local disk to the front of the boot order after deployment breaks subsequent virtual-media operations.) | MUST   |
| B9 | Boot-setting changes rejected while the host is in POST (e.g. HTTP `400` with a vendor-specific message) are tolerated and retried by Ironic, but the BMC SHOULD accept boot overrides at any time.                                                                                                | SHOULD |

## Virtual media

Virtual media is the central mechanism of the OSISM provisioning workflow: the BMC
mounts an ISO image, served over HTTP on the out-of-band management network, as a
virtual CD from which the server boots the deployment agent.

| #   | Requirement                                                                                                                                                                                                                                                      | Level  |
|:----|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| V1  | A `VirtualMedia` collection MUST be exposed under the `Manager` (`/redfish/v1/Managers/{id}/VirtualMedia`) and/or under the `ComputerSystem` (Redfish 1.13+ style). Both locations are supported; the `ComputerSystem` location is preferred when present.       | MUST   |
| V2  | At least one virtual media slot with `MediaTypes` containing **`CD`** (or `DVD`).                                                                                                                                                                                | MUST   |
| V3  | Action **`#VirtualMedia.InsertMedia`** accepting an `Image` URL. `TransferProtocolType` **`HTTP` MUST** be supported (images are served from a plain HTTP server on the management network); **`HTTPS` SHOULD** be supported. `NFS` and `CIFS` MAY be supported. | MUST   |
| V4  | `InsertMedia` MUST accept the optional properties `Inserted: true` and `WriteProtected: true`, and MUST also work when they are omitted.                                                                                                                         | MUST   |
| V5  | Action **`#VirtualMedia.EjectMedia`**. After a successful eject, `Inserted` MUST read `false`; if the eject completes asynchronously, a subsequent `InsertMedia` MUST NOT fail permanently.                                                                      | MUST   |
| V6  | `VirtualMedia` members MUST report `Inserted` and `Image` truthfully so that the attached state can be verified.                                                                                                                                                 | MUST   |
| V7  | Image URLs containing **query strings** (`?`, `&`) MUST be accepted (required when images are served via object-storage temporary URLs).                                                                                                                         | MUST   |
| V8  | The virtual CD MUST remain attached across host resets and through POST until it is explicitly ejected. In particular, applying pending BIOS/boot settings during POST MUST NOT eject or detach virtual media as a side effect.                                  | MUST   |
| V9  | The BMC MUST be able to boot from ISO images of at least **2 GiB** and sustain the host reading the complete image (streamed or downloaded).                                                                                                                     | MUST   |
| V10 | An additional slot with `MediaTypes` `USBStick` or `Floppy` (used by Ironic to attach config drives as removable media in some configurations).                                                                                                                  | MAY    |
| V11 | Every member of the `VirtualMedia` collection SHOULD support `InsertMedia`/`EjectMedia`. Internal-only slots (e.g. KVM-backed media that reject inserts) are tolerated but SHOULD be avoided or clearly distinguishable.                                         | SHOULD |

## UEFI and Secure Boot

| #  | Requirement                                                                                                                                                                                 | Level  |
|:---|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| U1 | The platform MUST support booting from virtual CD media in **UEFI mode**.                                                                                                                   | MUST   |
| U2 | If `Boot/BootSourceOverrideMode` is not implemented, the platform MUST default to UEFI.                                                                                                     | MUST   |
| U3 | `ComputerSystem/SecureBoot` resource with readable and writable `SecureBootEnable` (Secure Boot is not part of the current OSISM default workflow, but is supported by Ironic and planned). | SHOULD |
| U4 | Action `#SecureBoot.ResetKeys` with `ResetKeysType` values `ResetAllKeysToDefault` and `DeleteAllKeys`.                                                                                     | MAY    |

## Hardware inventory

OSISM reads network inventory directly from the Redfish API (`osism manage redfish
list`) to populate its source of truth (NetBox) and to create Ironic ports. Missing
optional properties are tolerated, but every property that is exposed must be correct.

| #  | Requirement                                                                                                                                                                                                                                    | Level  |
|:---|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------|
| I1 | `Systems/{id}/EthernetInterfaces` collection listing the host's LAN-on-motherboard and add-in NIC ports with a valid **`MACAddress`**.                                                                                                         | MUST   |
| I2 | `EthernetInterface` properties `PermanentMACAddress`, `SpeedMbps`, `MTUSize`, `LinkStatus`, `InterfaceEnabled`, `Status`.                                                                                                                      | SHOULD |
| I3 | `Chassis/{id}/NetworkAdapters` collection with `Manufacturer`, `Model`, `PartNumber`, `SerialNumber` and `FirmwareVersion` per adapter.                                                                                                        | SHOULD |
| I4 | `NetworkAdapters/{id}/NetworkDeviceFunctions` with `Ethernet/MACAddress` and `Ethernet/PermanentMACAddress` per port function (used to discover MAC addresses of adapters that do not appear under `EthernetInterfaces`, e.g. SmartNICs/DPUs). | SHOULD |
| I5 | `ComputerSystem` properties `Manufacturer`, `Model`, `SerialNumber`, `UUID`, `BiosVersion` and `Status/Health`.                                                                                                                                | SHOULD |

## Optional capabilities

The following capabilities are exercised only when the corresponding Ironic feature is
enabled for a deployment. Vendors targeting full OSISM/Ironic coverage SHOULD implement
them as described; the DMTF interoperability profile referenced below marks them as
*Recommended*.

### Out-of-band sensor data

Used when hardware metrics collection is enabled (Ironic `send_sensor_data`).

* `Chassis/Thermal`: `Fans[]` (`Reading`, `ReadingUnits`, `MinReadingRange`, `MaxReadingRange`, `Status`) and `Temperatures[]` (`ReadingCelsius`, `PhysicalContext`, `SensorNumber`, `Status`).
* `Chassis/Power`: `PowerSupplies[]` (`PowerCapacityWatts`, `LineInputVoltage`, `LastPowerOutputWatts`, `SerialNumber`, `Status`).
* Drive health: `Systems/{id}/SimpleStorage` is preferred (single call, inline data); `Storage`/`Drives` is used as a fallback. Implementing `SimpleStorage` in addition to `Storage` significantly reduces BMC load during periodic polling.
* Support for the `$expand` query parameter (`ProtocolFeaturesSupported/ExpandQuery`) SHOULD be provided to reduce the number of requests.

### BIOS configuration

Used by the Ironic `bios` interface (`redfish` BIOS interface).

* `Systems/{id}/Bios` with the current `Attributes`.
* `Bios/@Redfish.Settings` with `SettingsObject` (pending area), ETag support and `SupportedApplyTimes` including **`OnReset`**.
* A `Bios/AttributeRegistry` published under `/redfish/v1/Registries` describing attribute types, allowable values, bounds and read-only flags.
* Action `#Bios.ResetBios` (factory reset).

### Firmware updates

Used by the Ironic `firmware` interface.

* `UpdateService` with action **`#UpdateService.SimpleUpdate`** accepting an `ImageURI` (HTTP/HTTPS) and, on systems with multiple `ComputerSystem` members, `Targets`.
* The action MUST return a task monitor (`Location` header); progress is tracked via `TaskState`/`TaskStatus` as described in G11.
* Firmware versions MUST be readable out-of-band: `ComputerSystem/BiosVersion`, `Manager/FirmwareVersion`, and per network adapter `NetworkAdapter/Controllers[]/FirmwarePackageVersion`.
* After a BMC firmware update, the Redfish service MUST come back reachable with the same resource paths and credentials.

### RAID configuration

Used by the Ironic `raid` interface for out-of-band RAID management (OSISM alternatively
supports in-band RAID cleaning steps via the deployment agent).

* `Systems/{id}/Storage` collection; each RAID-capable `Storage` MUST expose its controller via `Controllers` (the deprecated inline `StorageControllers[]` is supported as a fallback) with **`SupportedRAIDTypes`**.
* `Drives[]` with `Id`, `CapacityBytes`, `MediaType` and `Protocol`.
* Volume management: `POST`/`DELETE` on `Storage/{id}/Volumes` with `RAIDType` (`RAID0`, `RAID1`, `RAID5`, `RAID6`, `RAID10`, ... as supported), `CapacityBytes` and `Links/Drives`. A create request without `CapacityBytes` MUST allocate the maximum possible size.
* `Volumes/@Redfish.OperationApplyTimeSupport` with `Immediate` (preferred) and/or `OnReset`.
* Asynchronous operations via task monitors as described in G11.

### Out-of-band inspection

Ironic can inspect hardware out-of-band via Redfish (`inspect` interface `redfish`).
OSISM currently collects inventory in-band via the deployment agent, so these
properties are optional but recommended: `MemorySummary/TotalSystemMemoryGiB`,
`Processors` (`TotalThreads`, `Model`, `MaxSpeedMHz`, `InstructionSet`),
disk capacities via `SimpleStorage`/`Storage`, `PCIeDevices`/`PCIeFunctions`,
and LLDP neighbor information via `Chassis/NetworkAdapters/{id}/Ports`
(`Ethernet/LLDPReceive`).

### Eventing

`EventService` with subscription management (`POST`/`DELETE` on
`EventService/Subscriptions`, `Protocol: Redfish`, `EventTypes` including `Alert`) MAY
be supported; Ironic exposes it via vendor passthru.

## Firmware behaviors that break provisioning

The following behaviors have been observed in the field with various BMC
implementations. They break the automated workflow — in some cases in ways that are
hard to diagnose — and MUST be avoided:

1. **Virtual media ejected during POST.** Any `PATCH` to boot settings creates pending
   firmware configuration; on some AMI-based BMCs, applying these pending settings
   during POST ejects the mounted virtual media as a side effect, so the server never
   boots the deployment image (see V8).
2. **Persistent boot order rewritten after deployment.** Firmware that autonomously
   moves the freshly installed disk to the top of the UEFI boot order prevents
   subsequent virtual-media based maintenance operations (see B8).
3. **Stale virtual media state.** Reporting `Inserted: true` after a completed eject,
   or failing `InsertMedia` because a previous eject is still in progress internally
   (see V5, V6).
4. **Rejecting spec-conformant `InsertMedia` payloads**, e.g. failing when the optional
   `Inserted`/`WriteProtected` properties are present (see V4).
5. **Rejecting image URLs with query strings** (see V7).
6. **Incomplete `@Redfish.AllowableValues` lists.** Clients treat the published list as
   authoritative; a supported but unlisted value (e.g. a `ResetType`) will never be
   used, and an unsupported but listed value causes hard failures (see G9).
7. **Requiring the full `Boot` property triple on every PATCH** instead of accepting
   minimal updates (see B6).
8. **Errors for no-op power actions**, e.g. HTTP `400`/`409` without a descriptive
   message when powering on an already powered-on system (see P8).
9. **Boot overrides silently ignored** — accepting `BootSourceOverrideEnabled:
   Continuous` in the API but not honoring it on subsequent boots (see B7).
10. **Feature-gating standard resources behind vendor licenses** in a way that returns
    misleading errors (e.g. access errors on `SecureBoot` without a specific license).

## Verification

### DMTF Redfish Interoperability Profile

The OpenStack Ironic project publishes a machine-readable
[Redfish interoperability profile](https://opendev.org/openstack/ironic/src/branch/master/redfish-interop-profiles)
(`OpenStackIronicProfile`) in the DMTF interoperability profile format. Vendors MUST
validate their Redfish implementation against the current version of this profile
(`OpenStackIronicProfile.v1_2_0.json` at the time of writing) using the
[DMTF Redfish-Interop-Validator](https://github.com/DMTF/Redfish-Interop-Validator);
refer to the validator's README for configuration and invocation.

The validation MUST pass without errors for all *Mandatory* requirements. See the
[Ironic interoperability documentation](https://docs.openstack.org/ironic/latest/admin/drivers/redfish/interop.html)
for details.

Note that the profile does not yet cover everything listed in this appendix (for
example `UefiHttp` boot, `NetworkAdapters`/`NetworkDeviceFunctions`, LLDP via `Ports`,
or the dynamic behaviors in V7–V9 and B6–B8); the requirements in this document apply
in addition to the profile.

### Functional acceptance tests

In addition to the profile validation, the following end-to-end scenarios MUST work
reliably (each SHOULD be repeated at least 10 times in a loop to detect intermittent
failures):

1. **Session authentication**: create session, perform requests, delete session; fall
   back to HTTP Basic when sessions are disabled.
2. **Power cycle**: `On` → `GracefulShutdown` → `On` → `ForceOff` → `On` →
   `ForceRestart`, verifying `PowerState` after each step within 300 seconds.
3. **Virtual media deployment cycle** (the core OSISM workflow): power off → eject all
   media → `InsertMedia` with an ISO from a plain HTTP URL → set
   `BootSourceOverrideTarget: Cd` with `BootSourceOverrideEnabled: Once` and
   `BootSourceOverrideMode: UEFI` → power on → verify the host boots the ISO → eject →
   reboot from local disk.
4. **Boot-order stability**: after an OS installation, verify that the UEFI boot order
   was not modified by the firmware and that a subsequent virtual media boot (scenario
   3) still succeeds.
5. **Inventory readout**: enumerate `EthernetInterfaces`, `NetworkAdapters` and
   `NetworkDeviceFunctions` and verify all reported MAC addresses against the physical
   hardware.

### Redfish mockup

To allow offline review of the Redfish resource tree, vendors SHOULD provide a mockup
of their implementation created with the
[DMTF Redfish-Mockup-Creator](https://github.com/DMTF/Redfish-Mockup-Creator)
(a copy is bundled with OSISM as `redfishMockupCreate.py`), taken from a
representative system of the model under review.

## References

* [DMTF Redfish specification DSP0266](https://www.dmtf.org/standards/redfish)
* [OpenStack Ironic Redfish driver documentation](https://docs.openstack.org/ironic/latest/admin/drivers/redfish.html)
* [OpenStack Ironic Redfish interoperability profile](https://opendev.org/openstack/ironic/src/branch/master/redfish-interop-profiles)
* [DMTF Redfish-Interop-Validator](https://github.com/DMTF/Redfish-Interop-Validator)
* [sushy — OpenStack Redfish client library](https://opendev.org/openstack/sushy)
* [OSISM MetalBox concept](../concepts/metalbox.md)
