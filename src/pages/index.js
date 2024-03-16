import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Discover from '@site/src/components/Discover';
import Users from '@site/src/components/Users';
import Partners from '@site/src/components/Partners';
import Services from '@site/src/components/Services';
import Subscriptions from '@site/src/components/Subscriptions';
import SoftwareModules from '@site/src/components/SoftwareModules';
import Translate from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 style={{"font-size": "3em"}}><Translate description="Homepage title">homepage.title</Translate></h1>
        <p style={{"font-size": "1.5em"}}><Translate description="Homepage subtitle">homepage.subtitle</Translate></p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="<Translate description='Homepage pagetitle'>homepage.pagetitle</Translate>">
      <HomepageHeader />
      <main>
        <Discover />
        <SoftwareModules />
        <Subscriptions />
        <Partners />
      </main>
    </Layout>
  );
}
