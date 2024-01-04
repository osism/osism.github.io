import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SoftwareModules from '@site/src/components/SoftwareModules';
import Subscriptions from '@site/src/components/Subscriptions';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="osism__title">Get your data center ready for the AI & multi-cloud era</h1>
        <p className="osism__subtitle">OSISM provides production-grade cloud infrastructure based on OpenStack for enterprises, service providers & ISVs</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="OSISM – Open Cloud Infrastructure">
      <HomepageHeader />
      <main>
        <SoftwareModules />
        <Subscriptions />
      </main>
    </Layout>
  );
}
