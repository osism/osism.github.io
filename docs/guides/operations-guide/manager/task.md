---
sidebar_label: Task
---

# Task

## List

All running or scheduled tasks can be listed with `osism task list`.

```
+----------------------+--------------------------------------+-------------------------+----------+----------------------------+-----------------------------------------------+
| Worker               | ID                                   | Name                    | Status   | Start time                 | Arguments                                     |
|----------------------+--------------------------------------+-------------------------+----------+----------------------------+-----------------------------------------------|
| celery@kolla-ansible | 8a553e69-c532-4ba0-a5d4-08a983bde692 | osism.tasks.kolla.run   | ACTIVE   | 2023-09-27 17:55:54.252250 | ['kolla', 'common', ['-e kolla_action=pull']] |
| celery@osism-ansible | dba72dd5-1885-408f-9262-e0ded111a007 | osism.tasks.ansible.run | ACTIVE   | 2023-09-27 18:00:31.215879 | ['generic', 'facts', []]                      |
+----------------------+--------------------------------------+-------------------------+----------+----------------------------+-----------------------------------------------+
```

## Broker reset

Sometimes tasks get stuck. Due to the internal locks it is then not possible to re-execute
plays with the same name. Also it is currently not possible to cancel already running tasks
(is on the todo list). The only way to unblock the situation is to stop the manager service
and remove the Redis volume. Afterwards the manager is started again.

```
cd /opt/manager
docker compose down
docker volume rm manager_redis
docker compose up -d
```
