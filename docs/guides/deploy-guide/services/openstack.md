---
sidebar_label: OpenStack
sidebar_position: 60
---

# OpenStack

Common issues with deploying OpenStack services are documented in the
[OpenStack Troubleshooting Guide](../../troubleshooting-guide/openstack).

:::info

An OpenStack deployment contains a number of components providing APIs to access infrastructure resources.
The [OpenStack Components](https://www.openstack.org/software/project-navigator/openstack-components#openstack-services)
page lists the various services that can be deployed to provide such resources to cloud end users.
Unfortunately, not all of the OpenStack projects listed there are still active.
Not all of the services listed there are supported by OSISM.

:::

## OpenStack client

```
osism apply openstackclient
```

## Keystone

```
osism apply -a pull keystone
osism apply keystone
```

## Glance

```
osism apply -a pull glance
osism apply glance
```

## Designate

```
osism apply -a pull designate
osism apply designate
```

## Placement

```
osism apply -a pull placement
osism apply placement
```

## Cinder

```
osism apply -a pull cinder
osism apply cinder
```

## Neutron

```
osism apply -a pull neutron
osism apply neutron
```

## Nova

```
osism apply -a pull nova
osism apply nova
```

## Octavia

```
osism apply -a pull octavia
osism apply octavia
```

## Horizon

```
osism apply -a pull horizon
osism apply horizon
```
