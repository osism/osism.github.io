// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

import {EnumChangefreq} from 'sitemap';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OSISM – Sovereign Cloud Platform',
  tagline: 'Get your data center ready for the multi-cloud era',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://osism.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/osism/osism.github.io/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: EnumChangefreq.DAILY,
          priority: 1,
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/cloud-in-a-box/',
            from: '/docs/guides/other-guides/cloud-in-a-box/',
          },
          {
            to: '/docs/testbed/',
            from: '/docs/guides/other-guides/testbed',
          },
          {
            to: '/docs/concepts/',
            from: '/docs/guides/concept-guide/',
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'OSISM',
        // logo: {
        //   alt: 'OSISM Logo',
        //   src: 'img/logo.svg',
        //   href: 'https://osism.tech/docs',
        // },
        items: [],
        // items: [
        //   {
        //     type: 'docSidebar',
        //     sidebarId: 'tutorialSidebar',
        //     position: 'left',
        //     label: 'Documentation',
        //   },
        // ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: '/docs',
              },
              {
                label: 'Partner',
                href: 'https://osism.cloud/de/partner',
              },
	    ],
          },
          {
            title: 'External links',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/osism/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/osism',
              },
              {
                href: 'https://github.com/osism/issues/issues/new/choose',
                label: 'Open issue on GitHub',
              },
              {
                label: 'Zuul CI',
                href: 'https://zuul.services.osism.tech/t/osism/status',
              },
	    ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://osism.cloud/de/ueber-uns',
              },
              {
                label: 'Contact Us',
                href: 'https://osism.cloud',
              },
              {
	        href: 'mailto:info@osism.tech?subject=OSISM Demo',
                label: 'Schedule a demo',
              },
              {
                label: 'Support',
                href: 'https://osism.cloud/de/subskription',
              },
              {
                label: 'Privacy Policy',
                href: 'https://osism.cloud/de/datenschutz',
              },
              {
                label: 'Legals',
                href: 'https://osism.cloud/de/impressum',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OSISM GmbH. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  markdown: {
    mermaid: true,
  },
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        docsRouteBasePath: 'https://osism.tech/docs/',
        // blogRouteBasePath: 'https://osism.tech/blog/',
        indexPages: false,
        indexBlog: false,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],
};

module.exports = config;
