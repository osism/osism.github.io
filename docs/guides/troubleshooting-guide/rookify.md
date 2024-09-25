---
sidebar_label: Rookify (technical preview)
sidebar_position: 40
---

# Rookify (technical preview)

:::warning

Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_.
Nevertheless, it is **strongly advised** to test Rookify in a controlled environment beforehand, such as the [OSISM testbed](https://github.com/osism/testbed). Additionally, ensure that all precautionary backups are taken, and any other necessary safety measures are in place.

:::

The [Rookify GitHub repository](https://github.com/SovereignCloudStack/rookify) includes a README.md that provides a condensed summary of the information covered here.

## ssh-issues 


**"Failed to load private key" **


- make sure the id-rsa keys are "clean" and do not contain unexpected strings like "\<\<EOF". Possible solution: Clean the keys manually or call `ssh-keygen -p -N "" -f ssh.key` to convert and reformat the keyfile to the expected format.


**"too many authentications error"**

- Sometimes too many keys loaded are loaded by the ssh-agent. Possible solution: Switch off the ssh-agent on you machine. You can do this yourself or by allowing direnv ( `direnv allow` ) to use `.envrc`. 

## frozen state

- if the rookify process freezes, check your connections. In the OSISM testbed especially check the vpn-connection (in testbed epository try `make vpn-*`)