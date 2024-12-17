---
sidebar_label: Install instance from ISO image
---

# Install instance from ISO image

While in general it is considered best practice to create instances from existing or specially crafted images, sometimes it is necessary to install an instance using a traditional installer packaged in an ISO image.
One way to do this in OpenStack is to leverage the [instance rescue mechanism](https://docs.openstack.org/nova/latest/user/rescue.html), which allows to boot an instance from another image while providing access to the instances storage.

## Upload the ISO image

If the required ISO image is not available in the image store yet upload it first:

```
PATH_TO_ISO_IMAGE=""
IMAGE_NAME=""
openstack image create \
  --disk-format iso \
  --file $PATH_TO_ISO_IMAGE \
  --property hw_rescue_device=disk \
  --property hw_rescue_bus=virtio \
  $IMAGE_NAME
```

The `hw_rescue_device` and `hw_rescue_bus` properties may be omitted if you do not intent to create an instance from a boot volume.

## Creating the instance

### Using nova local storage

Create an instance with a blank local boot device, e.g.:

Until [this bug](https://bugs.launchpad.net/nova/+bug/2090926) is fixed, one cannot create an instance with a blank local boot device. As a workaround create an unbootable dummy image first, e.g.:

```
DUMMY_IMAGE_NAME="dummy"
dd if=/dev/zero of="$DUMMY_IMAGE_NAME" bs=1k count=1
openstack image create \
  --file "$DUMMY_IMAGE_NAME" \
  "$DUMMY_IMAGE_NAME"
rm  "$DUMMY_IMAGE_NAME"
```

Create the instance:

```
INSTANCE_NAME=""
FLAVOR=""
openstack server create \
  --flavor "$FLAVOR" \
  --image "$DUMMY_IMAGE_NAME" \
  --no-network \
  "$INSTANCE_NAME"
```

Once the bug is fixed the instance may be created directly:

```
INSTANCE_NAME=""
FLAVOR=""
openstack server create \
  --flavor "$FLAVOR" \
  --block-device "source_type=blank,destination_type=local,guest_format=raw,boot_index=0" \
  --no-network \
  "$INSTANCE_NAME"
```

### Using boot from volume

Create an instance with a blank boot volume

```
INSTANCE_NAME=""
FLAVOR=""
BOOT_VOLUME_SIZE=""
openstack server create \
  --flavor "$FLAVOR" \
  --block-device "source_type=blank,destination_type=volume,volume_size=$BOOT_VOLUME_SIZE,boot_index=0" \
  --no-network \
  "$INSTANCE_NAME"
```

Set the created volume to bootable

```
openstack volume set --bootable $(openstack server show $INSTANCE_NAME -f json -c attached_volumes | jq -r '.attached_volumes | first | .id')
```

## Install the created instance from the uploaded ISO 

Use the rescue mechanism to boot the ISO, e.g.:

```
openstack server rescue \
  --image $IMAGE_NAME \
  $INSTANCE_NAME
```

Wait for the instance to be rescued. This will take a moment, as a soft reboot is tried before issueing a hard reboot.
Watch the instance `task_state` and `status` to see the latter change from `ACTIVE` to `RESCUE`.

```
watch openstack server show $INSTANCE_NAME -f value -c status -c task_state
```

Start the installation procedure, e.g. by opening the instance's console

```
openstack console url show $INSTANCE_NAME
```

The instances storage device should be available as a destination for the installation.
Rebooting the instance in this state will lead to the rescue image being booted again.
To boot the instance from its freshly provisioned boot device unrescue the instance:

```
openstack server unrescue $INSTANCE_NAME
```
