---
sidebar_label: Octavia
sidebar_position: 20
---

# Octavia

## Cleanup of amphora missing from the DB

```none title="/var/log/kolla/octavia/octavia-health-manager.log"
2023-10-25 16:43:52.547 22 WARNING octavia.amphorae.drivers.health.heartbeat_udp [-]
The amphora 2a33a889-4f9a-4340-84a5-e58a7a8af17e with IP 10.1.0.79 is missing from the
DB, so it cannot be automatically deleted (the compute_id is unknown). An operator must
manually delete it from the compute service.
```
