import React from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: (<Translate description="OpenStack title">module.openstack.title</Translate>),
    Svg: require('@site/static/img/logo-openstack.svg').default,
    description: (
      <>
        <Translate description="OpenStack description">module.openstack.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="SONiC title">module.sonic.title</Translate>),
    Svg: require('@site/static/img/logo-sonic.svg').default,
    description: (
      <>
        <Translate description="SONiC description">module.sonic.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Ceph title">module.ceph.title</Translate>),
    Svg: require('@site/static/img/logo-ceph.svg').default,
    description: (
      <>
        <Translate description="Ceph description">module.ceph.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Ironic title">module.ironic.title</Translate>),
    Svg: require('@site/static/img/logo-ironic.svg').default,
    description: (
      <>
        <Translate description="Ironic description">module.ironic.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Gardener title">module.gardener.title</Translate>),
    Svg: require('@site/static/img/logo-k8s.svg').default,
    description: (
      <>
        <Translate description="Gardener description">module.gardener.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="K3s title">module.k3s.title</Translate>),
    Svg: require('@site/static/img/logo-k3s.svg').default,
    description: (
      <>
        <Translate description="K3s description">module.k3s.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Keycloak title">module.keycloak.title</Translate>),
    Svg: require('@site/static/img/logo-keycloak.svg').default,
    description: (
      <>
        <Translate description="Keycloak description">module.keycloak.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Prometheus title">module.prometheus.title</Translate>),
    Svg: require('@site/static/img/logo-grafana.svg').default,
    description: (
      <>
        <Translate description="Prometheus description">module.prometheus.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Netdata title">module.netdata.title</Translate>),
    Svg: require('@site/static/img/logo-netdata.svg').default,
    description: (
      <>
        <Translate description="Netdata description">module.netdata.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Teleport title">module.teleport.title</Translate>),
    Svg: require('@site/static/img/logo-teleport.svg').default,
    description: (
      <>
        <Translate description="Teleport description">module.teleport.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Proxmox title">module.proxmox.title</Translate>),
    Svg: require('@site/static/img/logo-proxmox.svg').default,
    description: (
      <>
        <Translate description="Proxmox description">module.proxmox.description</Translate>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--left">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function SoftwareModules () {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--12')}>
            <h1><Translate description="Software module title">module.title</Translate></h1>
          </div>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
