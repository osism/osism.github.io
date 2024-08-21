---
slug: 2024-01-14-use-of-the-clustershell
title: Use of the ClusterShell
authors: [berendt]
tags: [OSISM, Machine Room]
---
[ClusterShell](https://clustershell.readthedocs.io/en/latest/intro.html) is an
event-driven open source Python framework, designed to run local or distant commands
in parallel on server farms or on large Linux clusters. We learned to use it by chance
during a large HPC project with the team there and learned to like it.

ClusterShell can be used in a rudimentary way via the `console` command of the OSISM CLI.
The Ansible inventory groups are available as node groups. These are automatically
generated and updated by the inventory reconciler.

In this example, the command `uname -v` is executed on all nodes in the node group
`housing1047`.

```
$ osism console --type clush housing1047
Enter 'quit' to leave this interactive mode
Working with nodes: com[1047-1050]
clush> uname -v
com1049: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2
com1050: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2
com1047: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2
com1048: #38~22.04.1-Ubuntu SMP PREEMPT_DYNAMIC Thu Nov  2 18:01:13 UTC 2
clush>
```


