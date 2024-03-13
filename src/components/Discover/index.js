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
            OSISM is a powerful deployment and lifecycle management framework for software-defined infrastructure like OpenStack and hyper-converged Ceph as well as required services such as a RabbitMQ broker or a MariaDB Galera cluster. Monitoring, log aggregation, and high availability are also a key focus. OSISM is developed according to the Operate First principle. OpenStack provides a proven and reliable foundation for platforms such as Gitlab CI, Kubernetes, Cloud Foundry, and OpenShift. OpenStack is a first class citizien in the areas of High Performance Computing (HPC), supercomputers, and Edge Data Centers. OSISM is used by the Sovereign Cloud Stack (SCS) to manage the core infrastructure services. As the basis for pluscloud open from the German-based cloud service provider PlusServer in Cologne, OSISM is an integral part of one of the first Gaia-X hosters.
          </div>
        </div>
      </div>
    </section>
  );
}
