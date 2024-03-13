import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


export default function Users() {
  return (
    <section className={styles.users}>
      <div className="container" style={{"padding": "20px"}}>
        <div className="row">
	  <div className={clsx('col col--12')}>
	    <h1><Translate description="Users title">users.title</Translate></h1>
          </div>
        </div>
      </div>
    </section>
  );
}
