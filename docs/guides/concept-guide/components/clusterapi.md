# Cluster API

Cluster API is a Kubernetes project to manage and bootstrap Kubernetes clusters. It provides declarative APIs and tools for managing the Kubernetes cluster lifecycle. Cluster API is an implementation of *Kubernetes as a Service* (KaaS), a cloud service model that simplifies the deployment, management and scaling of Kubernetes clusters.

## Key benefits of Cluster API
* **Standardization**: The provisioning of clusters is simplified through the use of YAML manifests. The declarative approach makes it easier to create, update, and delete clusters, thus automating version control and configuration of Kubernetes clusters.
* **Abstraction**: Cluster API easily abstracts the underlying platform specific requirements like security, networking, and storage. The deployment across various environments, including public clouds (AWS, Azure, GCP), private clouds (OpenStack), and on-premises data centers, gets unified.
* **Lifecycle Management:** Assuring a consistent workflow, Cluster API helps with provisioning, scaling, upgrading, and deletion of Kubernetes clusters. This consistency reduces operational overhead and automates repetitive workflows.
* **Customization**: The extension and customization of Kubernetes clusters always yields the same experience across different infrastructures. Through the use of custom resource definitions (CRDs) and controllers, organizations can tailor the API to meet specific requirements, such as integrating with existing CI/CD pipelines or adding custom operational logic.
* **Efficiency:** With Cluster API, organizations can automate repetitive tasks, reduce human error, and ensure that clusters are configured according to best practices. This automation leads to increased operational efficiency and faster delivery of applications - significantly reducing time-to-market (TTM).

By using Kubernetes as a Service with Cluster API, organizations can achieve a highly automated, scalable and consistent approach to managing Kubernetes clusters across different environments. This allows them to focus more on application development, and less on the operational complexities of managing Kubernetes infrastructure.

## Lifecycle Management of Cluster API in OSISM
Cluster API is a powerful tool, integrated in other services it can be seamlessly combined, and workload can be further abstracted and automated. 

### Cluster API with OpenStack Magnum
![In an OpenStack enviroment, a Magnum Plugin takes YAML-manifests to define and deploy specifications for Kubernetes clusters. First, Cluster Resources get defined. After that, Control Plane Nodes and Worker Nodes are configurated. If there are changes to the YAML-Manifests, Magnum will adjust the Nodes accordingly.](./images/cluster-api-magnum.png)

### Cluster API with SCS Cluster Stacks
![SCS works in an different cloud infrastructure enviroments. SCS takes YAML-manifests to define and deploy specifications for Kubernetes clusters. First, Cluster Resources get defined. After that, Control Plane Nodes and Worker Nodes are configured. If there are changes to the YAML-Manifests, SCS will adjust the Nodes accordingly.](./images/cluster-api-scs.png)
