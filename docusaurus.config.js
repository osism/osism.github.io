// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const themes = require('prism-react-renderer').themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

import {EnumChangefreq} from 'sitemap';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OSISM – Sovereign Cloud Infrastructure',
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
          { to: "/blog", label: "Blog", position: "left" },
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
                label: 'Documentation',
                href: '/docs',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/osism',
              },
              {
                label: 'Zuul CI',
                href: 'https://zuul.services.betacloud.xyz/t/osism/status',
              },
              {
                label: 'Users',
                href: '/users',
              },
              {
                label: 'Partner Network',
                href: '/partners',
              },
              {
                label: 'Support',
                href: '/support',
              },
	    ],
          },
          {
            title: 'Comparisons',
            items: [
              {
                label: 'OSISM vs. FishOS',
                href: '/docs/appendix/comparisons#osism-vs-fishos',
              },
              {
                label: 'OSISM vs. Red Hat OpenStack Services on OpenShift',
                href: '/docs/appendix/comparisons#osism-vs-red-hat-openstack-services-on-openshift',
              },
              {
                label: 'OSISM vs. Canonical OpenStack',
                href: '/docs/appendix/comparisons#osism-vs-canonical-openstack',
              },
              {
                label: 'OSISM vs. SUSE OpenStack Cloud',
                href: '/docs/appendix/comparisons#osism-vs-suse-openstack-cloud',
              },
              {
                label: 'OSISM vs. Mirantis OpenStack for Kubernetes',
                href: '/docs/appendix/comparisons#osism-vs-mirantis-openstack-for-kubernetes',
              },
              {
                label: 'OSISM vs. OpenStack Ansible',
                href: '/docs/appendix/comparisons#osism-vs-openstack-ansible',
              },
	    ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'Blog',
                href: '/blog',
              },
              {
                label: 'Contact Us',
                href: '/contact-us',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/osism/',
              },
              {
                label: 'About Us',
                href: '/about-us',
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
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],
};

module.exports = config;
