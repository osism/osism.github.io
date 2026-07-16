---
sidebar_label: Release Cadence
sidebar_position: 10
---

# Release Cadence

This chapter describes how often OSISM produces a major release, which upstream
releases each major release is built on, and how long a release is supported.
The model described here is derived from how OSISM environments are actually
operated in practice — most notably the time operators need to plan and carry
out an upgrade — rather than from a fixed calendar.

## Why the cadence follows OpenStack and Kolla

The two most important components of an OSISM cloud pod are OpenStack and the
[Kolla](https://docs.openstack.org/kolla/latest/) images that OSISM uses to
deploy it. Everything else in a release — Ceph, the networking stack, the
Kubernetes layers, identity, monitoring — is integrated and tested around that
OpenStack version. It therefore makes sense to anchor the OSISM release cadence
to the upstream OpenStack and Kolla release cycles instead of defining an
independent schedule.

## Upstream release cycle

OpenStack follows a fixed six-month cycle and produces two releases per year:

* a `YYYY.1` release in **April** (for example `2026.1` Gazpacho),
* a `YYYY.2` release in **October** (for example `2025.2` Flamingo).

The `YYYY.1` (April) releases are **SLURP** releases (Skip-Level Upgrade Release
Process). SLURP releases are maintained upstream for longer than the non-SLURP
releases in between them and allow operators to upgrade once per year while
skipping the intermediate `YYYY.2` release. OpenStack does not use a formal
"LTS" label; the SLURP release is the closest equivalent and is what OSISM
treats as the long-term-support anchor.

:::info

**OSISM only ships and officially supports SLURP (`YYYY.1`) OpenStack releases.**
The non-SLURP `YYYY.2` releases are intentionally skipped so that every OSISM
major release lands on a version with the longer upstream maintenance window and
a supported skip-level upgrade path.

We do build the intermediate `YYYY.2` Kolla images for evaluation and testing
purposes, but they come with **no officially supported upgrade path and no
security updates**. They are not intended for production use.

:::

Each OSISM major version therefore maps one-to-one to the spring SLURP release
of its year:

| OSISM | OpenStack (SLURP, `YYYY.1`) | Name     |
|:------|:----------------------------|:---------|
| 10    | 2025.1                      | Epoxy    |
| 11    | 2026.1                      | Gazpacho |
| 12    | 2027.1                      | Indri    |
| 13    | 2028.1                      | (TBA)    |

Kolla follows the OpenStack
[cycle-trailing](https://docs.openstack.org/kolla/latest/contributor/release-management.html)
release model: it is released **up to about three months after** the
corresponding OpenStack coordinated release, giving it time to wait for
distribution packages and stabilise against the new OpenStack version.

## When OSISM releases

OSISM cuts one major release per year, timed **about one month after the Kolla
release** for the anchoring SLURP OpenStack version. Chained together, the
upstream milestones lead to an OSISM major release around **August**:

| Milestone                                      | Approximate timing | Example (2026 cycle)             |
|:-----------------------------------------------|:-------------------|:---------------------------------|
| OpenStack SLURP release (`YYYY.1`)             | April              | `2026.1` Gazpacho — 1 April 2026 |
| Kolla release (cycle-trailing, ~3 months)      | ~July              | ~July 2026                       |
| **OSISM major release** (~1 month after Kolla) | **~August**        | ~August 2026                     |

The exact date shifts with the actual upstream releases — if Kolla slips, the
OSISM release moves with it — but the ordering and the roughly one-per-year
cadence stay the same.

:::info

Similar to the Ubuntu point release model, the first release of a new OSISM
major version is intended for new installations, early adopters, and testing.
For existing production environments we recommend waiting for the first point
release before upgrading.

The first point release is shipped **at the latest two months after the initial
major release**. This gives early adopters enough time to complete their
upgrades and surface any issues, while still keeping the upgrade window for
production environments predictable.

:::

## What the release cadence covers

The OSISM release cadence is about the **OSISM framework** and the **OpenStack
release it officially supports** — not about the exact container images shipped
at any given moment.

Each OSISM major release is built and integration-tested around **one SLURP
OpenStack release**, deployed through the Kolla images that OSISM builds. The
OpenStack version is tied to the OSISM major release: upgrading the framework is
meant to go hand in hand with upgrading the OpenStack deployment it manages.
The framework can run against an older OpenStack version — this is required so
that an upgrade has a valid intermediate state — but that is a transitional
situation during an upgrade, not a configuration meant to be kept permanently.

Not every component is bound to this cadence. Kubernetes is managed with
[Gardener](./components/gardener.md) and Ceph with cephadm, and both are updated
independently of the OSISM major release. Ceph in particular is only the storage
backend and has no hard dependency on the OpenStack version, so it follows its
own upstream support timeline rather than the OSISM framework cadence.

Major releases are therefore where the **OpenStack upgrade**, **deprecations and
removals**, and **new features are introduced or configuration changes** happen.
Within a major release, OSISM ships **minor releases** as needed — roughly every
six to eight weeks — for framework updates and bug fixes. You can move from any
minor version to a higher one within the same major release without special
intervention. For the mechanics of how releases are produced, see
[Releases](../guides/developer-guide/releases.md) in the developer guide.

### Security fixes

Security fixes for OpenStack and the other Kolla-based components are shipped as
part of the **Kolla container images** that OSISM builds, independently of the
OSISM framework release cadence. Because OSISM maintains rolling image tags for
every major release, security-fixed images can be deployed without changing the
OSISM release itself — security updates are not gated on the six-to-eight-week
minor release cadence.

## Support and lifecycle

OSISM supports **the current major release plus the one before it**. As soon as
a new major release ships, the previous release enters a deprecation window that
gives operators time to upgrade before it reaches end of life.

The length of that window is set by observed operator behaviour: operators
report that they need roughly **six to nine months** to plan and complete an
upgrade after a new OSISM release becomes available. The deprecation window is
sized to cover that need.

A major release therefore moves through three phases:

| Phase                    | Duration                                               | What operators receive                                                                                                                                   |
|:-------------------------|:-------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Maintained**           | From release until the next major release (~12 months) | Full updates: minor releases, bug fixes, security fixes, and any mandatory feature or config changes.                                                    |
| **Extended Maintenance** | 6–9 months after the next major release ships          | Critical and security fixes only. This is the upgrade window — operators should move to a newer release.                                                 |
| **End of Life**          | —                                                      | No further updates. See [Retiring OpenStack Releases](../guides/developer-guide/retiring-openstack-releases.md) for how bundled versions are wound down. |

This gives each major release an effective supported lifetime of roughly
**18 to 21 months** (about 12 months Maintained plus the 6–9 month Extended
Maintenance window). At any given time exactly two releases are supported: the
newest one (Maintained) and the one before it (Extended Maintenance).

### Example timeline

Assuming a major release *N* ships in August:

* **August, year Y** — release *N* ships and enters **Maintained**. The
  previous release *N-1* moves from Maintained to **Extended Maintenance**, and
  the release before that, *N-2*, reaches **End of Life**.
* **August, year Y+1** — release *N+1* ships. *N* moves to Extended
  Maintenance; *N-1* reaches End of Life once its 6–9 month window has elapsed.

An operator running *N-1* when *N* ships thus has the full Extended Maintenance
window — six to nine months — to complete their upgrade before their release
reaches end of life.

For the current status and dates of each release, see the
[Release Notes](../release-notes/index.md).
