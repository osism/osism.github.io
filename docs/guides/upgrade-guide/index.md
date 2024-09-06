---
sidebar_label: Upgrade Guide
sidebar_position: 20
---

# Upgrade Guide

## A dedicated test environment

Using a dedicated test environment to upgrade the complex technical system landscape
consististing of Kubernetes, Ceph and Openstack is benenfical for some reasons:

1. **Developing and Testing Upgrade Procedures**:
   - **Validation of Runbooks**: Allows you to develop, validate and refine upgrade procedures documented in runbooks, ensuring accuracy and completeness.
   - **Procedure Testing**: Ensures that each step of the upgrade process is thoroughly tested specific for your conditions, reducing the risk of errors during the actual upgrade.

2. **Testing New Technical Changes**:
   - **Risk-Free Testing**: Provides a safe space to implement and test new technical changes without impacting the production environment.
   - **Issue Identification**: Helps identify and resolve potential issues with new features or configurations before they go live.

3. **Practicing Critical Steps for Training**:
   - **Staff Training**: Enables IT staff to practice critical steps and gain hands-on experience with the upgrade process, enhancing their preparedness.
   - **Engineer Familiarization**: Allows new engineers to become familiar with the system itself, features and workflows, reducing the learning curve.

4. **Developing New Concepts**:
   - **Concept Testing**: Facilitates the development and testing of new concepts, ensuring they are viable and effective before implementation in production.
   - **Innovation Space**: Provides a controlled environment to experiment with innovative ideas and configurations without disrupting existing services.

Overall, a dedicated test environment ensures a smoother, safer upgrade and operation process, minimizes risks, and enhances staff training and innovation.

## General hints for the Upgrade documentation

In the examples, the pull of images (if supported by a role) is always run first. While
this is optional, it is recommended to speed up the execution of the upgrade action in
the second step. This significantly reduces the times required for the restart from a
service.

## The order of the upgrade steps


:::warning

Always read the [release notes](https://osism.tech/docs/release-notes/) first to learn what has changed and what
adjustments are necessary. Read the release notes even if you are only updating for minor releases e.g. from 7.0.2 to 7.0.5.

:::

* Step 1: [Upgrade the Manager](./manager)
* Step 2: [Upgrade the Network](./network)
* Step 3: [Upgrade the Ceph](./ceph)
* Step 4: [Upgrade Docker](./docker)
* Step 5: [Upgrade Kubernetes](./kubernetes)
* Step 6: [Upgrade Logging & Monitoring](./logging-monitoring)
* Step 7: [Upgrade the Infrastructure](./infrastructure)
* Step 8: [Upgrade Openstack](./openstack)

