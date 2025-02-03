import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Checkmark from '../../assets/icons/checkmark.svg';


export default function Subscriptions() {
  return (
    <section className={styles.editions}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--12')}>
            <h1>Subscriptions</h1>
          </div>
        </div>
        <div className="row">
          <div className={clsx('col col--12')}>
            <p>OSISM subscriptions are the extra service you need to keep your private cloud running smoothly.
            Open source software with high-quality enterprise support, so you can keep your private cloud up to date and have access to experts when you need them.
            Send us an email to <a href="mailto:info@osism.tech">info@osism.tech</a> for more information.</p>
          </div>
        </div>
        <div className="row">
          <div className={clsx('col col--6')}>
            <table className="table">
              <thead>
                <tr>
                  <td></td>
                  <td>Community</td>
                  <td>Partner</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{"text-align": "left"}}>Open Source</td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Open Community</td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Open Documentation</td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Open Development</td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Open Operations</td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}><a href="https://www.sovereigncloudstack.org">SCS</a> compatible</td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td colspan="4" style={{"text-align": "left", "font-weight": "bold"}}>Support</td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Number of incidents / year</td>
                  <td></td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Support hours</td>
                  <td></td>
                  <td>Up to 24x7</td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Response time</td>
                  <td></td>
                  <td>Up to 15 minutes</td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Support access via ticket</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Support access via mail</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Support access via chat</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Support access via phone</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Support access via video conference</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td colspan="4" style={{"text-align": "left", "font-weight": "bold"}}>Services & Solutions</td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Professional Services</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Remote Services</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed Services</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Regular Reviews</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Guided Upgrades</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={clsx('col col--6')}>
            <table className="table">
              <thead>
                <tr>
	          <td></td>
                  <td>Community</td>
                  <td>Partner</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{"text-align": "left"}}>Kubernetes ready<sup>2</sup></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Air Gapped Environments</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Signed & Trusted Packages & Images</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Security Updates</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Bill of Materials (BOM)</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Software Bill of Materials (SBOM)</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Audit Logging</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Enterprise Network Backends</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Enterprise Storage Backends</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Enterprise Guest Operating Systems<sup>3</sup></td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>LTS Releases (> 12 months)</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Kernel Live Patches</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Pre-built K8s Cluster API Images</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Pre-built Ironic Node Images</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Pre-built Octavia Node Images</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td colspan="4" style={{"text-align": "left", "font-weight": "bold"}}>Managed Services</td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed Health Monitor</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed <a href="https://www.sovereigncloudstack.org">SCS</a> Compliant Tests</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed Wazuh Server</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed NetBox</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed Container Registry</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed Keycloak</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
                <tr>
                  <td style={{"text-align": "left"}}>Managed Teleport</td>
                  <td></td>
                  <td><Checkmark className={styles.checkmark} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row" style={{"font-size": "0.7em"}}>
          <div className={clsx('col col--12')}>
            <ol>
              <li>Some of the listed services of the partner edition are provided by our solution partners</li>
              <li>OpenShift, Rancher, Gardener, Kubermatic, Cluster API, and many more are directly usable</li>
              <li>Red Hat Enterprise Linux, SUSE Linux Enterprise Server, Oracle Linux, Windows Server, Windows, Rockylinux, Almalinux</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
