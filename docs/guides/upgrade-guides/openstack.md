---
sidebar_label: OpenStack
sidebar_position: 40
---

# OpenStack

## Keystone

```
osism apply -a pull keystone
osism apply -a upgrade keystone
```

## Glance

```
osism apply -a pull glance
osism apply -a rolling-upgrade glance
```

## Designate

```
osism apply -a pull designate
osism apply -a upgrade designate
```

## Placement

```
osism apply -a pull placement
osism apply -a upgrade placement
```

## Cinder

```
osism apply -a pull cinder
osism apply -a upgrade cinder
```

## Neutron

```
osism apply -a pull neutron
osism apply -a rolling-upgrade neutron
```

## Nova

```
osism apply -a pull nova
osism apply -a rolling-upgrade nova
```

## Octavia

```
osism apply -a pull octavia
osism apply -a upgrade octavia
```
### Amphora image update

This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,
this step is not necessary.

### Amphora rotation

This step is only necessary if the Amphora Driver is used. If OVN is used as the driver,
this step is not necessary.

## Horizon

```
osism apply -a pull horizon
osism apply -a upgrade horizon
```

## OpenStack client

```
osism apply openstackclient
```
