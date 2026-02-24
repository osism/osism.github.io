---
sidebar_label: Manager
sidebar_position: 10
---

# Manager

All operations in an OSISM deployment are performed through the `osism` CLI. Commands
are submitted to the manager's job queue and executed asynchronously in the appropriate
Ansible container — so operations continue running even if the SSH session is lost.

For an overview of the manager's architecture and internal components, see the
[OSISM Manager](../../../concepts/manager.md) page in the Concepts guide.

![OSISM orchestrator](./images/python-osism.drawio.png)

## Commands

| Command                       | Description                                               |
|-------------------------------|-----------------------------------------------------------|
| [osism apply](./apply.md)     | Run Ansible plays in any environment                      |
| [osism get](./get.md)         | Query inventory hosts, host variables, and gathered facts |
| [osism log](./log.md)         | View Ansible play history, container logs, and OpenSearch |
| [osism task](./task.md)       | Inspect running and queued tasks                          |
| [osism console](./console.md) | Open interactive sessions on nodes or containers          |
