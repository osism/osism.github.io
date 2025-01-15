// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

import {EnumChangefreq} from 'sitemap';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OSISM – Sovereign Cloud Platform',
  tagline: 'Get your data center ready for the mulit-cloud era',
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
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
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
        ],
      },
      '@docusaurus/plugin-content-docs',
      {
        id: 'users',
        path: 'users',
        routeBasePath: 'users',
        sidebarPath: require.resolve('./sidebarUsers.js')
      }
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        logo: {
          alt: 'OSISM Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          { to: "/users", label: "Users", position: "left" },
          { to: "/partners", label: "Partners", position: "left" },
          {
	    href: 'mailto:info@osism.tech?subject=OSISM Demo',
            label: 'Schedule a demo',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Comparisons',
                href: '/docs/appendix/comparisons',
              },
              {
                label: 'Documentation',
                href: '/docs',
              },
              {
                label: 'Users',
                href: '/users',
              },
              {
                label: 'Partners',
                href: '/partners',
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
                href: 'https://zuul.services.betacloud.xyz/t/osism/status',
              },
              {
                href: 'https://regiocloud.github.io',
                label: 'REGIO.cloud',
              },
              {
                href: 'https://www.sovereigncloudstack.org',
                label: 'Sovereign Cloud Stack',
              },
	    ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: '/about-us',
              },
              {
                label: 'Contact Us',
                href: '/contact-us',
              },
              {
	        href: 'mailto:info@osism.tech?subject=OSISM Demo',
                label: 'Schedule a demo',
              },
              {
                label: 'Support',
                href: '/support',
              },
              {
                label: 'Jobs',
                href: '/jobs',
              },
              {
                label: 'Privacy Policy',
                href: '/privacy',
              },
              {
                label: 'Terms & Conditions',
                href: '/terms',
              },
              {
                label: 'Legals',
                href: '/legals',
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
        indexPages: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],
};

module.exports = config;
