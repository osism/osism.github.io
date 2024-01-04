import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Checkmark from '../../assets/icons/checkmark.svg';


export default function Subscriptions() {
  return (
    <section className={styles.editions}>
      <div className="container">
        <div className="row">
	  <div className={clsx('col col--6')}>
	  <h3>Advanced & Enterprise Subscriptions</h3>
	  Our Advanced & Enterprise subscriptions provides you with years of
	  experience for deployments, full lifecycle management, and business
	  critical support.
	  </div>
	  <div className={clsx('col col--6')}>
          <table className="table">
            <thead>
              <tr>
	        <td></td>
	        <td>Community</td>
	        <td>Advanced</td>
	        <td>Enterprise</td>
	      </tr>
            </thead>
            <tbody>
	      <tr>
	        <td style={{"text-align": "left"}}>Open Source</td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Open Community</td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Open Documentation</td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Kubernetes ready<sup>2</sup></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	      </tr>
	      <tr>
	        <td colspan="4" style={{"text-align": "left", "font-weight": "bold"}}>Advanced Engineering & Operations</td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Security updates</td>
	        <td></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>LTS releases (> 2 years)</td>
	        <td></td>
	        <td></td>
	        <td><Checkmark className={styles.checkmark} /></td>
	      </tr>
	      <tr>
	        <td colspan="4" style={{"text-align": "left", "font-weight": "bold"}}>Support</td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Number of incidents / year</td>
	        <td></td>
	        <td>12</td>
	        <td>Unlimited</td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Support hours</td>
	        <td></td>
	        <td>Business hours</td>
	        <td>Up to 24x7</td>
	      </tr>
	      <tr>
	        <td style={{"text-align": "left"}}>Response time</td>
	        <td></td>
	        <td>1 business day</td>
	        <td>Up to 15 minutes</td>
	      </tr>
	      <tr>
                <td style={{"text-align": "left"}}>Support access via ticket</td>
	        <td></td>
                <td><Checkmark className={styles.checkmark} /></td>
                <td><Checkmark className={styles.checkmark} /></td>
              </tr>
	      <tr>
                <td style={{"text-align": "left"}}>Support access via mail</td>
	        <td></td>
                <td><Checkmark className={styles.checkmark} /></td>
                <td><Checkmark className={styles.checkmark} /></td>
              </tr>
	      <tr>
                <td style={{"text-align": "left"}}>Support access via chat</td>
	        <td></td>
	        <td></td>
                <td><Checkmark className={styles.checkmark} /></td>
              </tr>
	      <tr>
                <td style={{"text-align": "left"}}>Support access via phone</td>
	        <td></td>
	        <td></td>
                <td><Checkmark className={styles.checkmark} /></td>
              </tr>
	      <tr>
	        <td colspan="4" style={{"text-align": "left", "font-weight": "bold"}}>Services</td>
	      </tr>
            </tbody>
	  </table>
        </div>
        </div>
        <div className="row" style={{"font-size": "0.5em"}}>
	  <div className={clsx('col col--6')}>
          </div>
	  <div className={clsx('col col--6')}>
	    [1] Services of the Enterprise edition are provided by integration partners
	    [2] OpenShift, Rancher, Gardener, Kubermatic, Cluster API, and many more are directly usable
          </div>
        </div>
      </div>
    </section>
  );
}
