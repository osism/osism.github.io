# Ironic

OpenStack Ironic is a project that provides Baremetal as a Service (BMaaS), enabling the
provisioning and management of physical machines in a cloud-like manner. Unlike traditional
virtualization, where virtual machines run on top of a hypervisor, BMaaS allows users to
directly manage and utilize physical hardware, offering the full performance and isolation
of dedicated servers.

Key benefits of OpenStack Ironic:

* Hardware Provisioning: Ironic automates the provisioning of physical servers, including
  the deployment of operating systems and configuration of hardware settings. This automation
  streamlines the setup process, reducing the time and effort required to bring new servers
  online.
* Integration with OpenStack: Ironic integrates seamlessly with other OpenStack services,
  such as Nova for compute management, Neutron for networking, and Glance for image services.
  This integration allows users to manage both virtual and baremetal resources through a
  unified OpenStack dashboard.
* Support for Multiple Hardware Drivers: Ironic supports a wide range of hardware through
  various drivers, including IPMI, Redfish, and vendor-specific drivers. This flexibility
  ensures compatibility with a diverse set of hardware platforms and management interfaces.
* Resource Management and Scheduling: Ironic leverages OpenStack’s scheduling capabilities
  to manage the allocation of physical servers, ensuring optimal utilization of hardware
  resources. Users can request specific hardware configurations and Ironic will match these
  requests with available resources.
* Provisioning States: Ironic manages the lifecycle of baremetal nodes through various
  provisioning states, such as enroll, available, active, and maintenance. This state
  management ensures that hardware is correctly tracked and managed throughout its lifecycle.
* Network Integration: Ironic integrates with Neutron to provide networking services for
  baremetal nodes, including support for VLANs, flat networks, and more complex networking
  setups. This integration ensures that baremetal nodes can be seamlessly integrated into
  existing network topologies.

By utilizing OpenStack Ironic, organizations can leverage the benefits of BMaaS,
providing users with the performance and control of physical hardware while maintaining
the flexibility and scalability of cloud infrastructure. This approach is particularly
beneficial for workloads that require high performance, low latency, or specific hardware
configurations that are not achievable with virtual machines.

## Lifecycle Management of Ironic in OSISM
