import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Subscriptions from '@site/src/components/Subscriptions';
import SoftwareModules from '@site/src/components/SoftwareModules';
import Translate from '@docusaurus/Translate';

import styles from './index.module.css';

function Announcements() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className="container" style={{"text-align": "center", "padding-top": "2em", "padding-bottom": "2em", "font-size": "1em"}}>
      🎉️ <b><a href="https://osism.tech/docs/release-notes/osism-7#713-20240908">OSISM 7.1.3 (20240908)</a> is out!</b> 🥳️
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 style={{"font-size": "3em", "text-justify": "auto"}}><Translate description="Homepage title">homepage.title</Translate></h1>
        <p style={{"font-size": "1.5em", "text-justify": "auto"}}><Translate description="Homepage subtitle1">homepage.subtitle1</Translate></p>
        <p>
          <a style={{"margin-top": "20px"}} className="button button--secondary button--lg" href="#supported-components"><Translate description="Software module title">module.title</Translate></a>
          <a style={{"margin-left": "20px", "margin-top": "20px"}} className="button button--secondary button--lg" href="mailto:info@osism.tech?subject=OSISM Demo"><Translate description="Homepage CTA1">homepage.cta1</Translate></a>
        </p>
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
        <SoftwareModules />
        <Subscriptions />
      </main>
    </Layout>
  );
}
