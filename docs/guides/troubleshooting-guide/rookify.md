---
sidebar_label: Rookify (technical preview)
sidebar_position: 40
---

# Rookify (Technical Preview)

:::warning

Rookify is developed to migrate from Ceph-Ansible to Rook _in place_ and _without downtime_.
Nevertheless, it is **strongly advised** to test Rookify in a controlled environment first, such as the [OSISM testbed](https://github.com/osism/testbed). Additionally, ensure that precautionary backups are made, and all other necessary safety measures are in place.

:::

For a condensed summary of the information covered here, refer to the [Rookify GitHub repository](https://github.com/SovereignCloudStack/rookify).

## SSH Issues 


**"Failed to load private key"**

- Ensure the `id-rsa` keys are "clean" and do not contain unexpected strings like "\<\<EOF".
- Clean the keys manually, or use the following command to reformat the keyfile: `ssh-keygen -p -N "" -f ssh.key`.


**"Too many authentications error"**

- This can occur if too many keys are loaded by the ssh-agent.
- Disable the ssh-agent on your machine. You can do this manually or by allowing `direnv` to use `.envrc` with the command `direnv allow`. To install `direnv` on your machine refer to [Direnv's documentation](https://direnv.net/docs/installation.html)

## Frozen State

- If the Rookify process freezes, check your connections.
- In the OSISM testbed, ensure the VPN connection is active. For help to setup the VPN connection for the Testbed refer to [OSISM's documentation for testbed setup](https://osism.tech/docs/guides/other-guides/testbed/#vpn-access).
