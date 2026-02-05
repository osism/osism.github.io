import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

export default function NotFound() {
  const isDocsPath =
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/docs');

  useEffect(() => {
    if (!isDocsPath) {
      window.location.replace('https://osism.cloud');
    }
  }, [isDocsPath]);

  if (isDocsPath) {
    // For /docs/ paths, show a standard 404
    return (
      <>
        <Head>
          <title>Page Not Found</title>
        </Head>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">Page Not Found</h1>
              <p>We could not find what you were looking for.</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  // For all other paths, redirect to osism.cloud
  return (
    <Head>
      <meta httpEquiv="refresh" content="0; url=https://osism.cloud" />
      <link rel="canonical" href="https://osism.cloud" />
    </Head>
  );
}
