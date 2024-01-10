// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OSISM – Open Cloud Infrastructure',
  tagline: 'Get your data center ready for the mulit-cloud era',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
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
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'usecases',
        path: 'usecases',
        routeBasePath: 'usecases',
        sidebarPath: require.resolve('./sidebarUsecases.js')
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
            label: 'Docs',
          },
          { to: "/usecases", label: "Use Cases", position: "left" },
          {
            href: 'https://regiocloud.github.io',
            label: 'REGIO',
            position: 'right',
          },
          {
            href: 'https://scs.community',
            label: 'Sovereign Cloud Stack',
            position: 'right',
          },
          {
            href: 'https://github.com/osism',
            label: 'GitHub',
            position: 'right',
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
                label: 'Documentation',
                href: '/docs/intro',
              },
              {
                label: 'Use Cases',
                href: '/usecases',
              },
	    ],
          },
          {
            title: 'Community',
            items: [
              {
                href: 'https://scs.community',
                label: 'Sovereign Cloud Stack',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/osism',
              },
              {
                label: 'Zuul CI',
                href: 'https://zuul.services.betacloud.xyz/t/osism/status',
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
                label: 'Blog',
                href: '/blog',
              },
              {
                label: 'Contact Us',
                href: '/contact-us',
              },
              {
                label: 'Partners',
                href: '/partners',
              },
              {
                label: 'Careers',
                href: '/careers',
              },
              {
                label: 'Legals',
                href: '/legals',
              },
              {
                label: 'Privacy Policy',
                href: '/privacy',
              },
              {
                label: 'Terms & Conditions',
                href: '/terms',
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
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],
};

module.exports = config;
