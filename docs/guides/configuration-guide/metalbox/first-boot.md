---
sidebar_label: First boot of a node
sidebar_position: 20
---

# First boot of a node

When the MetalBox provisions a node with `osism baremetal deploy`, it puts a short play
on the node's config drive. The node runs it when it comes up for the first time: the
play sets the hostname, the hosts file and the operator user, and the network and FRR
configuration where the device has them. Until the Manager takes over, it is the only
configuration from NetBox that a freshly provisioned node gets, so it has to carry the
operator key the Manager logs in with.

## Where the variables come from

The variables of the play come from the NetBox device:

* The top-level keys of the device's `local_context_data`. These are also host
  variables in the inventory of the Manager, so later plays use them as well.
* The keys under `first_boot`, set in the device's `local_context_data` or in a config
  context, for example one per site. They apply to the first boot only and win over
  top-level keys of the same name. A device's own `first_boot` wins over that of a
  config context. Supported from OSISM 11.1.0; earlier releases ignore them.
* The values that `osism baremetal deploy` adds to the play itself win over both:
  * the hostname, which is the name of the Ironic node;
  * `hosts_additional_entries` and `docker_insecure_registries`, which point to the
    MetalBox and are set whenever its address is known in NetBox;
  * the netplan and FRR parameters, from the device's `netplan_parameters` and
    `frr_parameters` custom fields, which `osism sync ironic` copies to the Ironic node.

## The operator key

The operator key is needed in two places: in `environments/configuration.yml` of the
configuration repository, from which the Manager installs it on all nodes, and in
NetBox, from which the MetalBox puts it on the config drive. The MetalBox does not read
the configuration repository.

In NetBox, keep the key in one place: under `first_boot`, preferably in one config
context per site, so that a key rotation changes a single entry there (see
[Rotation of the operator key](../../operations-guide/operator_key_rotation.mdx)). Under
`first_boot` the key reaches only the first boot and does not become a host variable
of later plays. For example:

```yaml
- config_context:
    name: first-boot-operator-key
    weight: 1000
    is_active: true
    sites:
      - site-001
    data:
      first_boot:
        operator_authorized_keys:
          - ssh-ed25519 AAAA...manager operator key...
```

The key goes to the operator user. `first_boot` may also set `operator_user`; the key
then goes to that user.

Before OSISM 11.1.0, set the key as `operator_authorized_keys` at the top level of each
device's `local_context_data`.

Without a key in NetBox, a newly provisioned node is reachable only through credentials
built into the image, if it has any.
