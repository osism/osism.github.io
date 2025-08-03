# Ironic

OpenStack Ironic is a project that provides bare-metal as a Service (BMaaS). It is used to provision physical machines rather than virtual machines and enables a cloud-like experience for bare-metal workloads. Within OSISM, Ironic is deployed as part of the OpenStack control plane and integrates with other services such as Nova and Neutron.

## Benefits of OpenStack Ironic:

* **Hardware Provisioning**: Ironic has automation patterns for enrollment, deployment, cleaning, and re-provisioning of hardware. This automation streamlines the setup process, reducing the time and effort required to bring new servers online.
* **Integration with OpenStack**: Ironic integrates seamlessly with other OpenStack services, such as Nova for compute management, Neutron for networking, and Glance for image services. This integration allows users to manage both virtual and bare-metal resources through a unified OpenStack dashboard.
* **Support for Multiple Hardware Drivers**: Ironic supports a wide range of hardware through various drivers, including IPMI, Redfish, and vendor-specific drivers. This flexibility ensures compatibility with a diverse set of hardware platforms and management interfaces.
* **Resource Management and Scheduling**: Ironic leverages OpenStack’s scheduling capabilities to manage the allocation of physical servers, ensuring optimal utilization of hardware resources. Users can request specific hardware configurations and Ironic will match these requests with available resources.
* **Provisioning States**: Ironic manages the lifecycle of bare-metal nodes through various provisioning states, such as enroll, available, active, and maintenance. This state management ensures that hardware is correctly tracked and managed throughout its lifecycle.
* **Network Integration**: Ironic integrates with Neutron to provide networking services for bare-metal nodes, including support for VLANs, flat networks, and more complex networking setups. This integration ensures that bare-metal nodes can be seamlessly integrated into existing network topologies.

By utilizing OpenStack Ironic, organizations can leverage the benefits of BMaaS,
providing users with the performance and control of physical hardware while maintaining
the flexibility and scalability of cloud infrastructure. This approach is particularly
beneficial for workloads that require high performance, low latency, or specific hardware
configurations that are not achievable with virtual machines. Ironic becomes a strong enabler in environments where:

- Bare-metal provisioning must be **repeatable, remote-controlled, and self-service**
- Physical servers are reused across **different workloads, tenants, or deployments**
- Automation is required to **reduce manual steps during scaling or hardware replacement**

## Lifecycle Management of Ironic in OSISM
