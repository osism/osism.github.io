---
sidebar_label: Security
sidebar_position: 50
---

# Security

This section contains security advisories and notes for OSISM and related components such as OpenStack.

We follow a need-to-know principle when handling security issues. Details about
vulnerabilities are not disclosed publicly until a fix or workaround is available.
This also applies to security information we receive from upstream projects through
their dedicated channels, such as embargoed vulnerability reports or pre-disclosure
notifications.

When a security issue becomes known, affected partners are informed in a timely manner
through direct communication channels. They receive a description of the issue that is
as detailed as necessary, an assessment of its severity and impact, and specific
instructions for action such as applying patches, updating configurations, or
implementing workarounds. When necessary, prepared container images with the relevant
fixes are provided to enable a swift rollout.

All partners are bound by a non-disclosure agreement (NDA) to ensure the confidential
handling of security-related information.

## OpenStack Security Advisories (OSSA)

| Advisory                          | Description                                         | Component                    |
|:----------------------------------|:----------------------------------------------------|:-----------------------------|
| [OSSA-2026-001](ossa-2026-001.md) | Privilege Escalation via Identity Headers in OAuth2 | OpenStack keystonemiddleware |
| [OSSA-2026-002](ossa-2026-002.md) | Nova calls qemu-img without format restrictions     | OpenStack Nova               |
