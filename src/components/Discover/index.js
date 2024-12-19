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
            <p>OSISM is a platform for software-defined infrastructure.</p>
	    <p>OpenStack and Ceph provide a proven and reliable foundation for platforms such as GitLab CI, Kubernetes, Cloud Foundry and OpenShift.</p>
            <p>OSISM is used by the Sovereign Cloud Stack (SCS) to manage core infrastructure services. OSISM is an integral part of one of the first Gaia-X hosters as the basis for pluscloud open from the German cloud service provider PlusServer in Cologne.</p>
            <p>
              <a className="button button--secondary button--lg" href="mailto:info@osism.tech?subject=OSISM Whitepaper"><Translate description="Discover CTA1">discover.cta1</Translate></a>
              <a className="button button--secondary button--lg" style={{"margin-left": "10px"}} href="mailto:info@osism.tech?subject=OSISM Demo"><Translate description="Homepage CTA1">homepage.cta1</Translate></a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
