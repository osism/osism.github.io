import React from 'react';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: (<Translate description="OpenStack title">module.openstack.title</Translate>),
    name: (<>OpenStack</>),
    linktarget: "/docs/guides/concept-guide/components/openstack",
    Svg: require('@site/static/img/logo-openstack.svg').default,
    description: (
      <>
        <Translate description="OpenStack description">module.openstack.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Ceph title">module.ceph.title</Translate>),
    name: (<>Ceph</>),
    linktarget: "/docs/guides/concept-guide/components/ceph",
    Svg: require('@site/static/img/logo-ceph.svg').default,
    description: (
      <>
        <Translate description="Ceph description">module.ceph.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Ironic title">module.ironic.title</Translate>),
    name: (<>Ironic</>),
    linktarget: "/docs/guides/concept-guide/components/ironic",
    Svg: require('@site/static/img/logo-ironic.svg').default,
    description: (
      <>
        <Translate description="Ironic description">module.ironic.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="SONiC title">module.sonic.title</Translate>),
    name: (<>SONiC</>),
    linktarget: "/docs/guides/concept-guide/components/sonic",
    Svg: require('@site/static/img/logo-sonic.svg').default,
    description: (
      <>
        <Translate description="SONiC description">module.sonic.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="K3s title">module.k3s.title</Translate>),
    name: (<>K3S</>),
    linktarget: "/docs/guides/concept-guide/components/k3s",
    Svg: require('@site/static/img/logo-k3s.svg').default,
    description: (
      <>
        <Translate description="K3s description">module.k3s.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Gardener title">module.gardener.title</Translate>),
    name: (<>Gardener</>),
    linktarget: "/docs/guides/concept-guide/components/gardener",
    Svg: require('@site/static/img/logo-k8s.svg').default,
    description: (
      <>
        <Translate description="Gardener description">module.gardener.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Cluster APItitle">module.cluster_api.title</Translate>),
    name: (<>Cluster API</>),
    linktarget: "/docs/guides/concept-guide/components/clusterapi",
    Svg: require('@site/static/img/logo-cluster-api.svg').default,
    description: (
      <>
        <Translate description="Cluster API description">module.cluster_api.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Keycloak title">module.keycloak.title</Translate>),
    name: (<>Keycloak</>),
    linktarget: "/docs/guides/concept-guide/components/keycloak",
    Svg: require('@site/static/img/logo-keycloak.svg').default,
    description: (
      <>
        <Translate description="Keycloak description">module.keycloak.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Teleport title">module.teleport.title</Translate>),
    name: (<>Teleport</>),
    linktarget: "/docs/guides/concept-guide/components/teleport",
    Svg: require('@site/static/img/logo-teleport.svg').default,
    description: (
      <>
        <Translate description="Teleport description">module.teleport.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Prometheus title">module.prometheus.title</Translate>),
    name: (<>Prometheus & Grafana</>),
    linktarget: "/docs/guides/concept-guide/components/prometheus",
    Svg: require('@site/static/img/logo-grafana.svg').default,
    description: (
      <>
        <Translate description="Prometheus description">module.prometheus.description</Translate>
      </>
    ),
  },
  {
    title: (<Translate description="Netdata title">module.netdata.title</Translate>),
    name: (<>Netdata</>),
    linktarget: "/docs/guides/concept-guide/components/netdata",
    Svg: require('@site/static/img/logo-netdata.svg').default,
    description: (
      <>
        <Translate description="Netdata description">module.netdata.description</Translate>
      </>
    ),
  },
];

function Feature({Svg, title, description, name, linktarget}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--left">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--left">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
	  <a style={{"margin-top": "20px", "width": "45%"}} className="button button--secondary button--lg" href={linktarget}><Translate description="More information">generic.more_information</Translate></a>
	  <a className="button button--secondary button--lg" style={{"margin-top": "20px", "width": "45%", "margin-left": "10px"}} href="mailto:info@osism.tech?subject=OSISM Demo"><Translate description="Homepage CTA1">homepage.cta1</Translate></a>
	</p>
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
            <h1 id="supported-components"><Translate description="Software module title">module.title</Translate></h1>
          </div>
        </div>
        <div className="row">
          <div className={clsx('col col--12')}>
	    OSISM is the lifecycle management platform for software-defined cloud infrastructure.
            It manages the components needed to build your own private cloud.
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
