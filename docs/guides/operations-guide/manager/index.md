---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

## Architecture View

![OSISM orchestrator](./images/python-osism.drawio.png)

## OSISM Usage

### Get help for OSISM commands

```
osism help
osism help apply
```

### Update the configuration

Once the manager has been deployed and the configuration repository has been initially transferred to the manager node,
the configuration repository can be updated using osism apply configuration.

Configuration changes are typically staged in a clone of the configuration repo to have versioning of changes.

```
cd /opt/configuration
git pull
osism apply configuration
```

If local changes were made directly in the configuration repository on the manager node, these are overwritten without asking.

