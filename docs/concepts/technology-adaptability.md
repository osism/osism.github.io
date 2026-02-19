---
sidebar_label: Technology Adaptability
sidebar_position: 15
---

# Technology Adaptability

## OSISM as a downstream integrator

OSISM does not develop the entire infrastructure stack from scratch. Instead, it integrates
proven open source projects into a cohesive platform for building and operating cloud
infrastructure. Kolla provides the lifecycle management for OpenStack, Ceph handles
software-defined storage, OVN and SONiC take care of networking, Prometheus and Grafana
cover monitoring, and so on.

The value of OSISM lies not in any single upstream project but in the **integration,
orchestration, and unified lifecycle management** of all these components together. OSISM
provides the glue that turns a collection of independent open source projects into an
operable cloud platform.

This downstream model has a direct consequence: OSISM inherits both the strengths and the
lifecycle constraints of its upstream projects. When an upstream project thrives, OSISM
benefits. When an upstream project slows down, gets archived, or is superseded by a better
alternative, OSISM must adapt.

## Technology does not stand still

The IT industry continuously produces new approaches, tools, and paradigms. In cloud
infrastructure, this is particularly visible:

* **Deployment patterns** evolve from imperative scripts to declarative, operator-based
  models.
* **Upstream communities** shift focus. A project that was the standard five years ago
  may see declining activity today while its successor gains momentum.
* **Operational expectations** change. Teams expect modern tooling, GitOps workflows, and
  Kubernetes-native patterns. Recruiting and retaining skilled operators depends on working
  with current technology.

A cloud infrastructure platform that is designed for long-term operation (10 years and
beyond) cannot afford to be locked into the technology choices of its initial release.
The technology underneath must be renewable while the platform continues to serve its
purpose.

## Adaptability as a design principle

OSISM is built as a framework, not as a monolithic product tied to a fixed set of
tools. The components that OSISM integrates are deliberately treated as **replaceable
implementation details** rather than permanent architectural fixtures.

This means:

* When a better alternative to an integrated component emerges and matures, OSISM can
  evaluate and adopt it.
* Transitions happen in a controlled, stepwise manner: introduction of the new approach,
  a deprecation period for the old one, documented migration paths, and eventually removal.
* The platform identity of OSISM is independent of any single upstream project.

This adaptability is not a theoretical concept. It is already happening in practice:

| What changed              | Old approach                | New approach               | Status                                        |
|:--------------------------|:----------------------------|:---------------------------|:----------------------------------------------|
| Ceph lifecycle management | ceph-ansible                | cephadm                    | Deprecated in OSISM 10, migration in progress |
| Kubernetes ingress        | ingress-nginx               | Gateway API                | Removed in OSISM 10                           |
| Kubernetes dashboard      | Kubernetes Dashboard        | Headlamp                   | Removed in OSISM 10                           |
| Message queuing           | RabbitMQ 3 (classic queues) | RabbitMQ 4 (quorum queues) | Migrated in OSISM 10                          |
| Container registry        | Quay.io                     | registry.osism.tech        | Migrated in OSISM 10                          |

Each of these transitions followed the same principle: acknowledge the shift, evaluate
the successor, provide a migration path, and move forward.

## New projects do not replace OSISM

When OSISM starts or adopts a new project that could potentially replace a component
currently in use, this does **not** mean that OSISM is being discontinued or superseded.
It means the opposite: OSISM is actively evolving.

A practical example illustrates this well. Kolla and Kolla-Ansible have served the
OpenStack community reliably for over a decade. They remain one of the most widely
used lifecycle management tools for OpenStack. At the same time, the broader industry
trend is moving toward Kubernetes-based operators for managing complex applications.
Red Hat has already transitioned from TripleO (which used Kolla container images) to
OpenStack Kubernetes Operators as the basis for their next-generation OpenStack platform.

If OSISM were to develop or adopt a project that provides an alternative deployment
mechanism for OpenStack or any other integrated component, this would be a natural step
in the platform's evolution:

* **OSISM remains the integrating framework.** The platform identity, the operational
  tooling, the configuration management, and the user experience continue.
* **The implementation detail changes.** How a specific component is deployed and managed
  under the hood may shift to a newer, more sustainable approach.
* **Existing deployments are supported.** Migration paths ensure that operators running
  production infrastructure are not left behind. Deprecation periods give time to plan
  and execute transitions.
* **The ecosystem benefits.** Operators work with current technology. The platform stays
  attractive for new adopters. The community around OSISM remains engaged with modern
  tooling.

## Why this matters for operators

For organizations running cloud infrastructure on OSISM, technology adaptability provides
concrete assurances:

* **No dead ends.** If an upstream project reaches end of life, OSISM will have evaluated
  and prepared an alternative. The platform does not become unmaintainable because a single
  dependency is discontinued.
* **Current technology.** Infrastructure teams work with tools and patterns that reflect
  the current state of the industry, not the state from when the platform was first
  deployed.
* **Controlled transitions.** Changes are never sudden. Deprecations are announced,
  migration paths are documented, and support is available throughout the transition.
* **Long-term viability.** A platform that can renew its technology foundation is a
  platform that can operate for decades, not just for the lifespan of its initial
  tool choices.

OSISM's commitment is not to any specific upstream project. It is to providing a
reliable, operable, and modern cloud infrastructure platform built on open source. The
tools underneath may change. The commitment does not.
