---
sidebar_label: Resource Manager
sidebar_position: 52
---

# Resource Manager

## Octavia

### Amphora rotation

Rotation of amphorae older than 30 days.

```
$ python3 src/amphora.py --rotate
2023-10-12 21:00:38 | INFO     | Amphora 95a07c43-c0f9-44d2-bde8-a989e52427fa is older than 30 days
2023-10-12 21:00:38 | INFO     | Amphora 95a07c43-c0f9-44d2-bde8-a989e52427fa of loadbalancer 9008d3d7-f593-4bc3-941c-a740c178148d is rotated by a loadbalancer failover
```
