---
sidebar_label: Zuul Ci
sidebar_position: 30
---

# Zuul CI

We use [Zuul CI](https://zuul-ci.org) for our CI. Our Zuul CI instance is available
at [zuul.services.betacloud.xyz](https://zuul.services.betacloud.xyz/t/osism/status).

## The `zuul` label

On CI jobs that consume a lot of resources and have long runtimes we use a label
`zuul` to run these jobs.

These CI jobs run in the [label pipeline](https://zuul.services.betacloud.xyz/t/osism/buildsets?pipeline=label)
and are only started once after the label has been assigned. If changes are made
to a PR, the label must first be removed and then reassigned for a new run of the
CI jobs.

The `zuul` label is usable in the following repositories:

* [osism/container-images-kolla](https://github.com/osism/container-images-kolla)
* [osism/testbed](https://github.com/osism/testbed)
