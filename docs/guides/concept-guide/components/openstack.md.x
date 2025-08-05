
# OpenStack

## Lifecycle Management of OpenStack in OSISM

The open source project Kolla from the [OpenInfra Foundation](https://openinfra.dev) is
used in OSISM for the life cycle management of OpenStack. Kolla’s mission is to provide
production-ready containers and deployment tools for operating OpenStack clouds. Kolla has
been actively developed by a very diverse team for 10 years and is one of the most common
(if not the most common) life cycle management tool for OpenStack.

The container images provided by Kolla are not only used by Kolla itself. They are also used
in TripleO, the basis for the now discontinued
[RedHat OpenStack Platform](https://www.redhat.com/en/technologies/linux-platforms/openstack-platform),
and the [OpenStack Kubernetes Operators](https://github.com/openstack-k8s-operators),
the basis for the new
[OpenStack Services on OpenShift from Redhat](https://www.redhat.com/en/blog/red-hat-openstack-services-openshift-next-generation-red-hat-openstack-platform).

### OpenStack Services Architecture

OpenStack is composed of multiple independent services which can work (and usually do) together. Having services which are independent of each other enables faster delivery of new features and more reliable fixes for bugs and security issues, and is widely recognized as a best practice for software development.

But OpenStack services rarely run standalone, except by developers working on the services themselves. Most OpenStack clusters run a standard set of services and, even when some of those servers could be disabled, with no loss of functionality for a certain application workload, the standard set is usually left enabled. Which means most clusters running Red Hat OpenStack Services on OpenShift run all services included with the product.

An OpenStack Operator focuses on user-facing OpenStack services, meaning services which provide an API for users outside of the cluster. Some OpenStack services exist to provide internal infrastructure for an OpenStack cluster and their APIs are available only from inside a cluster, for use by other OpenStack services and compute nodes. The OpenStack Administration learning journey provides more details about these internal services, and this course focuses on the user-facing services.

### OpenStack Services to Manage Applications

The first set of OpenStack services are the minimal services required by pratically any functional OpenStack cluster. It would be hard to support even the simplest applications without including all services in this category, so we call them fundamental services.

It is common for the OpenStack community to refer to individual services by either their code names or their purposes. Follows a list of the fundamental OpenStack services covered in this section:

* Keystone: Identity service
* Nova: Compute service
* Cinder: Block Storage service
* Neutron: Networking service
* Glance: Image service
* Placement: Placement service
* Barbican: Secret service

#### OpenStack Authentication and Service Discovery: Keystone

The first service all OpenStack Operators interact with is Keystone, the Identity service. It is both the authentication entry point for an OpenStack cluster, which validates user login credentials, and also a discovery entry point for other OpenStack services. All other OpenStack services rely on Keystone to find each other and to validate access tokens.

So OpenStack Operator users (and also Administrator users) first connect to Keystone, and then connect to whatever other service they need. Tools such as the OpenStack client and Horizon make this process transparent, creating the illusion of a unified set of commands or pages for an entire cluster.

#### OpenStack Virtual Machines: Nova

As aplication workloads run on OpenStack as Virtual Machines (VMs), the first service Operators care about is Nova, the Compute service. It interacts with the local hypervisor in compute nodes to manage VMs and provides advanced features such as live migration and snapshots. OpenStack nova uses the server resource type to manage VMs. It is usual to refer to Nova VMs as "server instances".

If an Operator just creates a VM using Nova APIs, that VM has no connectivity to anything else, including other VMs inside the same OpenStack cluster. And all data inside that VM can be lost in events such as hardware failure of a compute node. So most VMs require that you use Nova together with other fundamental services. But, if everything you need is access to the virtual console of a VM, to run software installed locally on that VM, them Nova alone would be sufficient.

Fortunately, both the OpenStack client and Horizon offer quick commands and workflows to create VMs already attached to virtual storage and connected to virtual networks, performing multiple OpenStack API calls for one user action.


#### OpenStack Virtual Disks: Cinder

Application workloads need to store multiple kinds of data, from their boot disk and its operating system, potentially customized with many changes configuration files, added packages, and so on. They may also require multiple data disks to store application data, logs, and other information as operating system files.

The Block Storage service, Cinder, provides virtual disks, called volumes, which can be attached to VMs as you need. Once the volume is attached to a VM, you need to use operating system commands inside that VM to format the volume with a file system and configure directories, file ownership, and file permissions before applications are able to store data on the volume. Just like you would do with a physical disk on a physical server.

You can attach multiple volumes to the same VM, and you move volumes from one VM to another. You can even attach a single volume to multiple VMs at the same time, though this is a dangerous operation: applications not designed for shared disks may easily corrupt data.

Cinder does not provide shared filesystems, which some worloads require. Stay tuned for the next section, which describes the right OpenStack service for such applications. The "block" nature of Cinder relates to the network storage protocol, such as iSCSI, Fibre Channel, or Ceph RBD.

Cinder also provides advanced features such as clones and snapshots of volumes, which you use for backup and disaster recovery procedures, or for quick cloning of VMs. The root or boot disk of a VM is usually a Cinder volume because this enables VMs to survive the loss of the compute node running the VM.

There might be reasons to NOT use Cincer volumes for VM disks, for example to support very fast local NVMe flash storage, but then the application itself needs to provide resiliency and fault tolerance for that data. Most times, applications rely on the infrastructure to do it for them, which means Cinder does the job.

#### OpenStack Virtual Networks: Neutron

Most application workloads require network connectivity to other servers, which can be other VMs inside a cluster or physical servers outside the cluster. Actually, as long as there is network connectivity, each side does not know if the other side is a physical or virtual machine or another kind of device.

Neutron is the Networking service of OpenStack. It provides virtual internal networks, which it calls tenant networks, and connectivity to external networks, which it calls provider networks. OpenStack Operators are usually allowed to create multiple tenant networks and configure many related resources, such as security rules (similar to network firewalls), routing rules, and network address translation between tenant or provider networks.

It is possible to manage Neutron virtual networks down to the virtual port level, and you can even create virtual VLANs (virtual Virtual Local Area Networks?) ports and trunks on tenant networks, for applications which you migrate from physical servers and need to keep their original operating system settings. Provider networks, from the other side, can abstract data center networking details, such as VLAN IDs, from connected VMs, if you wish.

Notice that, whatever you configure on your Neutron virtual networks, you need consistent configurations in the operating system inside your VMs. OpenStack helps with this task by providing features, such as cloud-init, to offer an initial configuration to new VMs, and also provides virtual DHCP services. But, if you want to configure static IP addresses and routes inside your VMs, you can. It is also a best practice to configure the internal firewall of your operating system, such as firewalld from RHEL, in addition to the network security resoruces from OpenStack.

#### Operating System Boot Images: Glance

If you create a new VM, you need a bootable operating system disk. It could be an installation disk, designed to use for only the first boot, and that installs an operating system on the root disk of the VM; but usually it is a root disk already preinstalled and preconfigured. Nowadays, all operating system vendors provide these two kinds of operating system images, and whatever you wish to use, you need to provide that image to OpenStack.

Glance, the OpenStack Image service, not only provides a choice of such images that Nova can use for the first boot of a VM, or to copy to the root disk of a VM, prior to its first boot, but also provides management of an image catalog, so Operators and Administrators can create and maintain a large set of customized VM images.

There are many reasons to customize VM images, from preconfiguring operating system settings required by your organization policies, such as enterprise identity servers, certificate auhtorities, and agents for anti-virus and backup software, to including entire application stacks, like an online web store that you use to run multiple VMs with copies of the same application, possibly in multiple OpenStack clusters.

It is the work of OpenStack Administrator to provide at least one image to Glance before Operators can create VMs.

#### OpenStack Server Scheduling: Placement

The OpenStack Placement service is different than other services introduced so far because OpenStack Operator users and external applications do not interact directly with it, but indirectly through resources of other services, especially Nova.

The Placement service tracks compute resource availability and consumption throughout an OpenStack cluster, and enables other OpenStack services to define and track different classes of resources. For example, Nova defines number of CPU cores and memory of compute nodes, and server instances consume those resources. Neutron defines number of IP address of internal virtual networks and of floating IP address available for connectivity with external networks. Cinder defines the total disk space and number of logical units (LUNs) of each storage backend.

OpenStack API resources can consume compute resources from different OpenStack services. For example, server instances consume CPU and memory from compute nodes, IP addresses from virtual networks, and disk space from a storage backend. If there are no sufficient compute resources available in the cluster, you cannot create the API resource.

Thanks to Placement, Nova can schedule each server instance to a compute node with sufficient available compute resources for that instance.

Placement also enables the definition of new classes of compute resources, for example: the availability of GPUs in compute nodes. Then server instances can request a number of GPUs, and an OpenStack Operator can be sure that instance either gets the GPUs it needs, or fails to start.

Defining new classes of compute resources is usually an OpenStack Admninistrator task, while configuring workloads to consume compute resources from those classes is an OpenStack Operator task.

#### OpenStack Secrets Management: Barbican

We already know that security in OpenStack starts with Keystone, as the authentication entry point for all OpenStack services. While most end-user applications do not need to invoke OpenStack APIs, thus would have no need for direct interactions with Keystone, most applications do interact with a wide range of services. These services range from external APIs of a software vendor to middleware running on other servers inside and outside of their OpenStack cluster, such as database servers and messaging middleware.

Management of credentials to access those services and APIs is a potential source of security issues. They should not be hardoced in either application source code nor on its configuration files. Ideally they would live outside of application VMs. Security conscious organizations require that applications use Key Management Services (KMS) to store such credentials, and OpenStack offers Barbican: the Key Management service.

OpenStack Barbican enables secure storage of many types of keys, including symetric and assymetric keys, and including both passwords and certificate files. Applications authenticate to Barbican using Keystone to retrieve keys, and OpenStack Operators manage those keys independent of applications.

Multiple OpenStack services offer integration with Barbican, for example to encrypt data stored in Cinder volumes or Swift objects.

### Additional OpenStack Services for Storage

* Manila: Shared Filesystems service
* Swift: Object Store service

Almost all workloads use Block storage from Cinder because server instances need virtual disks, but those virtual disks are not sufficient for all kinds of workloads. Some workloads require shared file systems, and the use of networked file sharing services, such as like NFS, is very common for scaling applications to multiple servers or integrating different applications by sharing data files.

Public cloud started without file sharing services, but offering object storage as an alternative, which made it very popular among cloud-native applications and on the business backends of mobile applications. Object storage also enables scaling applications to multiple servers and integrating different applications by sharing object files.

For end users, object storage may look just like file storage: buckets or containers are folders or directories, and objects are files. But, from a developer’s perspective, they are very different. For example, objects support write-once semantics and versioning, but files support append and random access modes.

In the end, applications are typically designed to use either of them (file or object storage) and cannot be easily configured to use the other. This course is not intended to provide a comparision of the benefits and capabilities of object versus file storage: from the perspective of OpenStack Operators, the decision was already made, and their job is to provide whatever of these capabilities applications require.

#### OpenStack File Shares: Manila

Manila offers access to remote file shares using a variety of network protocols, according to the capabilities of the storage backends configured on your OpenStack cluster. Typical business requirements, such as high availability of data by replication, depends on the storage backend rather than on OpenStack.

The role of Manila is providing a uniform interface for making file shares avaibale to application VMs, so an OpenStack Operator does not need direct acces to the storage backends themselves and their proprietary administration interfaces. Depending on the backend, Manila may also abstract networking and authentication details, making it look like the file share exists inside the virtual tenant network.

Manila does not abstract the file sharing protocol itself: if an application VM expects a remote NFS share, Manila must be configured to provide NFS services. Besides, it is outside the scope of Manila to abstract file system security, such as uid, gid, and permission masks of POSIX files.

#### OpenStack Objects: Swift

Swift offers object storage capabilities similar to Amazon S3. S3 is a de-facto standard, supported by a large number of storage vendors and applications, but there is no formal specification nor interoperability test suite to show objectively if two S3 products from different vendors are similar or different in capabilities. Unfortunately, there is no way any vendor can tell, except by extensive testing, if one application works fine with the S3 API implementation of a specific storage vendor.

Swift has its own application API, but it never got close to the popularity of Amazon S3. Most storage backends certified for Red Hat OpenStack offer both the Swift and S3 APIs, and an OpenStack Operator can manage object storage using Swift while applications access that storage using S3. Which is already good because most storage vendors do a good job of emulating the S3 API from the perspective of applications but require their own proprietary administration interfaces, so Swift can abstract these interfaces for an OpenStack Operator.

Swift is one of the few services in an OpenStack cluster that is accessed directly by end-user applications running outside its cluster. Unlike traditional networked file systems, which need special configurations at the end-user operating system and require application protocols not designed for remote networks and the internet, object storage uses the HTTP protocol which mobile and web applications commonly use to interact with other cloud services.

### Additional OpenStack Services for Networking

* Octavia: Load Balancer service
* Designate: DNS service

These services enable dynamic and scalable applications, not tied to manually configured IP address and DNS names: New applications can be immediately accessible using a human-readable name, and multiple servers accessed using a single IP address. If used together, the human-readable name, or vanity name, can point to the single IP address.

#### OpenStack Network Load Balancing: Octavia

Octavia enables fronting a server group or server pool with a single IP address, and forwarding network requests to any server of the group. This enables scalable and high-available applications, because more servers can handle more load, and servers can run in different compute nodes, insulating application users from failures of those compute nodes and of individual server instances.

Octavia also works with Nova to enable autoscaling of server groups, so the number of servers grows and shrinks according to demand. Octavia can work on both Layer 3, as a pure IP load balancer, or at Layer 7, as an HTTP and TLS load balancer. In either case, Octavia can detect failures internal to server instances, such as when an application becomes unresponsive, and stops sending sending traffic to those instances.

#### OpenStack Dynamic DNS: Designate

The DNS protocol is one of the oldest standards of the Internet, but management of DNS servers is totally proprietary. Octavia offers OpenStack Operators with a standard interface for managing DNS zones and records, and also integration with Nova, Neutron, and Octavia, to automatically assign DNS names to resources such as server instances, floating IP addresses, and load balancers.

## References

Parts of the content are based on the [Red Hat OpenStack Services on OpenShift Quick Course](https://github.com/RedHatQuickCourses/rhoso-intro).

* https://redhatquickcourses.github.io/rhoso-intro/rhoso-intro/1/index.html
* https://github.com/RedHatQuickCourses/rhoso-intro/blob/main/modules/ch2-services/pages/s1-fundamental-lecture.adoc
* Source: https://github.com/RedHatQuickCourses/rhoso-intro/blob/main/modules/ch2-services/pages/s3-additional-lecture.adoc
