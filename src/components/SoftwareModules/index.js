import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Infrastructure as a Service (IaaS) with OpenStack',
    Svg: require('@site/static/img/logo-openstack.svg').default,
    description: (
      <>
        Discover the Power of Flexibility and Scalability with OpenStack! In the dynamic world of cloud computing, OpenStack stands out as a comprehensive open-source solution, empowering businesses with robust Infrastructure as a Service (IaaS) capabilities. Embrace unparalleled flexibility as you deploy a variety of workloads, from virtual machines to container orchestration environments, all on a platform that seamlessly integrates with your existing systems.
      </>
    ),
  },
  {
    title: 'Software Defined Networking (SDN) with SONiC & OVN',
    Svg: require('@site/static/img/logo-sonic.svg').default,
    description: (
      <>
        With SONiC, experience unparalleled flexibility and scalability in your network operations. It enables you to control your network resources with software, simplifying complex tasks and providing a more efficient and adaptable network environment. This platform is not just about efficiency; it's about enabling rapid innovation and customization to meet the ever-evolving demands of cloud computing and data centers.
      </>
    ),
  },
  {
    title: 'Software Defined Storage (SDS) with Ceph',
    Svg: require('@site/static/img/logo-ceph.svg').default,
    description: (
      <>
        In the dynamic world of digital data, Ceph stands out as a game-changer. This highly scalable, open-source software-defined storage solution is designed to address the growing demand for performance, reliability, and flexibility in data management. Whether it's for small projects or large-scale enterprise needs, Ceph seamlessly adapts to any environment.
      </>
    ),
  },
  {
    title: 'Bare Metal as a Service (BMaaS) with Ironic',
    Svg: require('@site/static/img/logo-ironic.svg').default,
    description: (
      <>
        With Ironic, you get direct access to bare-metal hardware, eliminating the overhead of virtualization and offering a level of performance that virtual environments can't match. Ideal for high-performance computing, large-scale data processing, and intensive workloads.
      </>
    ),
  },
  {
    title: 'Kubernetes as a Service (KaaS) with Gardener',
    Svg: require('@site/static/img/logo-k8s.svg').default,
    description: (
      <>
        Kubernetes as a Service (KaaS) with Gardener offers a dynamic, scalable, and efficient solution for managing containerized applications across multiple cloud environments. Embrace the power of Kubernetes, optimized by Gardener's advanced automation and cluster management capabilities. With Gardener, you get seamless integration, simplified operations, and enhanced security for your Kubernetes clusters, whether on-premises, in the cloud, or in a hybrid setting.
      </>
    ),
  },
  {
    title: 'Kubernetes (K8s) with K3S',
    Svg: require('@site/static/img/logo-k3s.svg').default,
    description: (
      <>
        K3s is an innovative, lightweight Kubernetes distribution that simplifies the deployment and operation. One of the standout features of K3s is its minimal footprint, requiring only 512MB of RAM to run. K3s achieves its lightweight nature by removing legacy, alpha, and non-default features from Kubernetes, packaging all necessary components into a single binary less than 100MB in size. This all-in-one approach simplifies installation, updates, and operations, significantly reducing the overhead and expertise required to manage a Kubernetes cluster.

      </>
    ),
  },
  {
    title: 'Identity & Access Management with Keycloak',
    Svg: require('@site/static/img/logo-keycloak.svg').default,
    description: (
      <>
        Unlock the full potential of your digital security with Keycloak, the cutting-edge solution for Identity and Access Management (IAM). Designed for modern enterprises, Keycloak offers a robust and flexible platform to manage user identities and control access to applications and services.
      </>
    ),
  },
  {
    title: 'Logging, Monitoring & Telemetry with Prometheus & Grafana',
    Svg: require('@site/static/img/logo-grafana.svg').default,
    description: (
      <>
        Integrating Prometheus with Grafana offers a seamless experience. Set up is straightforward, and the synergy between Prometheus's detailed data collection and Grafana's sophisticated visualization tools provides an unmatched monitoring solution. This powerful combination empowers your team to make data-driven decisions, ensuring your systems are not only performing optimally but also poised for future growth.
      </>
    ),
  },
  {
    title: 'Realtime insights with Netdata',
    Svg: require('@site/static/img/logo-netdata.svg').default,
    description: (
      <>
        Netdata is revolutionizing the world of realtime monitoring, offering an unparalleled experience in tracking system performance and health. This powerful tool provides instant insights, ensuring you're always one step ahead in identifying and resolving issues. With its user-friendly interface, Netdata makes monitoring accessible to everyone, regardless of technical expertise.
      </>
    ),
  },
  {
    title: 'Protected access to all infrastructure with Teleport',
    Svg: require('@site/static/img/logo-teleport.svg').default,
    description: (
      <>
        Teleport is an innovative open-source software that redefines the way teams access their infrastructure. Designed with security and efficiency at its core, Teleport allows engineers and DevOps teams to seamlessly access servers, Kubernetes clusters, and internal applications, regardless of where they are located or what device they are using. It centralizes access control, providing a unified gateway to manage permissions and access rights across your entire infrastructure landscape.
      </>
    ),
  },
  {
    title: 'Pure virtualization & containerization with Proxmox VE',
    Svg: require('@site/static/img/logo-proxmox.svg').default,
    description: (
      <>
        Proxmox VE is a comprehensive open-source platform designed for virtualization and container-based management. It seamlessly combines two virtualization technologies in one solution: KVM for virtual machines and LXC for containerized applications. This dual capability allows to manage VMs and containers through a single, intuitive web-based interface, enhancing operational efficiency and flexibility.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--left">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function SoftwareModules () {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
