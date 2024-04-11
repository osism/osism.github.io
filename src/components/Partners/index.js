import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const PartnerList = [
  {
    title: ("B1 Systems GmbH"),
    Svg: require('@site/static/img/logo-b1systems.svg').default,
    description: (
      <>
        <a href="https://b1-systems.de/">B1 Systems</a> is a German provider of Linux & Open Source consulting, training, managed service & support founded in 2004 and operating worldwide. Our team of 150 Linux experts offers tailor-made solutions based on cloud & container technologies, virtualization & high availability as well as monitoring, system & configuration management.
      </>
    ),
  },
  {
    title: ("stackXperts GmbH"),
    Svg: require('@site/static/img/logo-stackxperts.svg').default,
    description: (
      <>
        <a href="https://www.stackxperts.com/">StackXperts</a> is founded by a group of enthusiastic system engineers with decades of experience in cloud computing, data centers, networking, and all facets of modern IT requirements. We install, maintain, and consult on public, private, and hybrid cloud setups, utilizing open-source solutions with a strong focus on avoiding vendor lock-in and ensuring cost-efficient environments. Our clients include major public cloud providers, financial institutions, research organizations, and industrial companies.
      </>
    ),
  },
]

function Partner({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--left">
        <Svg className={styles.partnerSvg} role="img" />
      </div>
      <div className="text--left" style={{marginTop: '1em'}}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section className={styles.partners}>
      <div className="container" style={{"padding": "20px"}}>
        <div className="row">
	  <div className={clsx('col col--12')}>
	    <h1><Translate description="Partners title">partners.title</Translate></h1>
            <p></p>
          </div>
        </div>
        <div className="row">
	  <div className={clsx('col col--12')}>
	    <h1><Translate description="Integration partners title">integration_partners.title</Translate></h1>
            <p>Our integration partners have years of experience in building and operating cloud environments of all sizes. They have a wide range of skills and can ensure the smooth integration of customised private clouds. Some of our integration partners offer managed operations for private clouds as well as Kubernetes. Send us an email to <a href="mailto:info@osism.tech">info@osism.tech</a> for more information.</p>
            <p></p>
          </div>
        </div>
        <div className="row">
          {PartnerList.map((props, idx) => (
            <Partner key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
