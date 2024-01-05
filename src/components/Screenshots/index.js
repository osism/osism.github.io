import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function Screenshots() {
  return (
    <section className={styles.screenshots}>
      <div className="container" style={{"padding": "20px"}}>
        <div className="row">
	  <div className={clsx('col col--6')}>
	    <h3>Central Operations Dashboard</h3>
          </div>
	  <div className={clsx('col col--6')}>
	    <img className={styles.screenshotImage} src={useBaseUrl('/img/screenshots/operations-dashboard.png')} />
	  </div>
        </div>
        <div className="row" style={{"padding": "20px"}}>
	  <div className={clsx('col col--6')}>
	    <img className={styles.screenshotImage} src={useBaseUrl('/img/screenshots/netdata.png')} />
	  </div>
	  <div className={clsx('col col--6')}>
	    <h3>Realtime insights with Netdata</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
