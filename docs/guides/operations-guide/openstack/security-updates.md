---
sidebar_label: Security Updates
---

# Security Updates

When a fix for a security issue is not yet included in an OSISM release, it is provided through the
rolling container images in the `kolla` namespace of `registry.osism.tech`. The
[security advisories](../../../appendix/security/index.md) name the affected services and give the image
override for them. This page describes how to roll out such an override on a running deployment and
how to remove it again.

The examples use the Cinder API image on OpenStack 2025.1 (Epoxy). Replace the service, the
parameters and the release with the ones given in the advisory.

## Set the image override

Add the override from the advisory to `environments/kolla/images.yml` in the configuration
repository:

```yaml title="environments/kolla/images.yml"
cinder_api_tag: "2025.1"
cinder_api_image: "registry.osism.tech/kolla/cinder-api"
```

The `*_image` parameter is required together with the `*_tag` parameter. A deployment that uses an
OSISM release pulls the images from the `kolla/release/<openstack_version>` namespace, which has no
rolling tags. See [Rolling tags and release tags](../../configuration-guide/openstack/index.md#rolling-tags-and-release-tags).

Commit the change and synchronize the configuration repository on the manager node:

```bash
osism apply configuration
```

## Pull the images

```bash
osism apply -a pull cinder
```

Always pull first. The deploy in the next step only pulls an image that is missing on a node, so
after a new build of the rolling image it keeps running the old one.

## Deploy the service

```bash
osism apply cinder
```

This runs the default action `deploy` of the play. It recreates those containers whose image has
changed. While a container of an API service is being recreated, the API is not available on this
node for a short time.

Do not use `-a upgrade` for this. The upgrade action is meant for upgrades from one OpenStack release
to the next and does more than is needed for a fix within a release. For instance, for Cinder it
restarts all Cinder containers.

## Verify the deployed image

On every node of the service, the running container must use the image that has just been pulled.
The two commands print the same image ID when this is the case:

```bash
docker inspect --format '{{.Image}}' cinder_api
docker image inspect --format '{{.Id}}' registry.osism.tech/kolla/cinder-api:2025.1
```

Many advisories also give a check that tests for the fix itself. Run it in addition, because it also
shows whether the image that was pulled contains the fix.

A rolling tag always points to the most recent build of the images. When an advisory is updated
because a later build contains a further fix, repeat the steps from
[Pull the images](#pull-the-images) on.

## Remove the image override

Remove the override from `environments/kolla/images.yml` when the deployment is upgraded to an
OSISM release that ships the fixed images, as part of that upgrade. Every OSISM release published
after the date of the advisory ships them; the release dates are listed in the
[OSISM Release Notes](../../../release-notes/). Removing the override earlier switches the service back to the vulnerable image of the release in
use.

:::warning

Remove all overrides with rolling tags before upgrading to a new OpenStack release. A rolling tag
such as `2025.1` refers to a specific OpenStack release. When the override is left in place, the
service keeps running the images of the old OpenStack release after the upgrade.

:::
