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

## Greenfield exploration as part of the process

Technology adaptability is not limited to swapping one established component for another.
Sometimes the most effective way to evaluate a fundamentally new approach is to start from
a clean slate. OSISM therefore deliberately pursues **greenfield projects** for specific
areas of the platform when the potential benefits justify the effort.

A greenfield approach means building a solution from scratch, free from the constraints
and assumptions of an existing implementation. This serves several purposes:

* **Gaining first-hand experience.** Reading about a new technology is not the same as
  building with it. A greenfield project lets the team develop deep, practical expertise
  with a new tool, pattern, or architecture before committing to a full integration.
* **Validating feasibility.** Not every promising technology works well in practice for
  the specific requirements of cloud infrastructure operations. A focused greenfield
  effort reveals practical limitations early, before they become costly surprises in
  production.
* **Exploring without legacy constraints.** Existing implementations carry design
  decisions from a different era. A greenfield project can explore what a solution looks
  like when designed for today's requirements and patterns from the start, without being
  shaped by backward-compatibility concerns.
* **De-risking future transitions.** When OSISM eventually migrates a component, the
  knowledge gained from a greenfield exploration makes the transition more predictable
  and better informed. The team already understands the target technology in depth.

### Why greenfield instead of adopting an existing project

When exploring a new area, there are almost always existing open source projects that
address similar problems. The deliberate decision to build from scratch rather than
adopting one of these projects is not made out of ignorance or pride. It follows a
**best-of-breed** principle applied at the concept level.

Existing projects in the same space are studied and their ideas are taken into account.
However, each of these projects was built for its own context, with its own assumptions,
trade-offs, and constraints. Adopting one wholesale means inheriting all of those
decisions, including the ones that do not fit the specific requirements of OSISM and its
operators.

A greenfield approach allows OSISM to take the **best ideas from multiple sources** and
combine them into a solution that is purpose-built for the problem at hand:

* **Conceptual inspiration, not wholesale adoption.** Existing projects serve as reference
  implementations. Their architectures, APIs, and operational patterns are analyzed for
  what works well. But the resulting solution is designed from first principles for OSISM's
  specific needs rather than being constrained by another project's roadmap and design
  history.
* **Avoiding misaligned dependencies.** Adopting an existing project creates a dependency
  on that project's community, release cycle, and priorities. If those priorities diverge
  from what OSISM operators need, the integration becomes a constant source of friction,
  workarounds, and compromise.
* **Tailored integration.** A solution built within the OSISM ecosystem can be designed
  from the start to integrate cleanly with the existing platform: the configuration
  management, the lifecycle tooling, the operational workflows. An external project
  must be adapted to fit, which often results in a brittle integration layer.
* **Full understanding of the codebase.** When the team builds a solution, every design
  decision is understood and documented. There are no opaque internals, no inherited
  technical debt from a different project's history, and no surprises during
  troubleshooting.

This does not mean that OSISM reinvents everything. For mature, well-maintained upstream
projects that align with the platform's needs, adoption remains the preferred path.
The greenfield approach is reserved for areas where no existing project provides a
sufficiently good fit, or where the unique combination of requirements makes a
purpose-built solution the more sustainable long-term choice.

### How greenfield explorations mature

These greenfield efforts are conducted as targeted explorations, not as replacements
that ship immediately. They run alongside the proven production stack and mature at their
own pace. Only when a greenfield approach has demonstrated clear advantages and sufficient
maturity does it enter the path toward becoming a supported part of the platform, following
the same controlled transition process described above.

This willingness to invest in exploration is a deliberate choice. A platform designed for
long-term operation must not only react to change but actively seek out and understand
emerging approaches before they become urgent necessities.

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
