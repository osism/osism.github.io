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
