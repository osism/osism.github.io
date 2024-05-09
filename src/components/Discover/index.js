import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function Discover() {
  return (
    <section className={styles.discover}>
      <div className="container" style={{"padding": "20px"}}>
        <div className="row">
	  <div className={clsx('col col--12')}>
	    <h1><Translate description="Discover title">discover.title</Translate></h1>
            <p>OSISM is the deployment and lifecycle management framework for software-defined infrastructures such as OpenStack, Proxmox VE and Ceph, and the services they require, such as a RabbitMQ broker or a MariaDB Galera cluster. Monitoring, log aggregation, zero-downtime operations, and high availability are also key areas of OSISM.</p>
	    <p>OpenStack and Proxmox VE provide a proven and reliable foundation for platforms such as GitLab CI, Kubernetes, Cloud Foundry and OpenShift.</p>
            <p>OSISM is used by the Sovereign Cloud Stack (SCS) to manage core infrastructure services. OSISM is an integral part of one of the first Gaia-X hosters as the basis for pluscloud open from the German cloud service provider PlusServer in Cologne.</p>
            <p>Send us an email to <a href="mailto:info@osism.tech">info@osism.tech</a> for more information.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
