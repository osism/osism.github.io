import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

export default function Redirect({to}) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="canonical" href={to} />
    </Head>
  );
}
