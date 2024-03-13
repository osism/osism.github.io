import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function Partners() {
  return (
    <section className={styles.partners}>
      <div className="container" style={{"padding": "20px"}}>
        <div className="row">
	  <div className={clsx('col col--12')}>
	    <h1><Translate description="Partners title">partners.title</Translate></h1>
            Our integration partners have many years of experience in building and operating large OpenStack and Ceph environments. They have a wide range of know-how and ensure a smooth integration of customized OSISM and SCS environments. Managed services are also available through our partners. Some of our integration partners offer managed operations for private OpenStack clouds as well as Kubernetes. On your own hardware in your own data center, on our hardware in your data center or on our hardware in our data center (with DE-CIX DirectCLOUD). We offer a turnkey solution on field-proven hardware and we will take care of operations.
          </div>
        </div>
      </div>
    </section>
  );
}
