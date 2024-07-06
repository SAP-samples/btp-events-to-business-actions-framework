// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Build resilient apps with SAP BTP',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://navyakhurana.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/PAA/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'navyakhurana', // Usually your GitHub org/user name.
  projectName: 'PAA', // Usually your repo name
  deploymentBranch: 'paa-doc',
  trailingSlash: false,

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  scripts: [
    // ...
    {
      src: 'js/custom.js',
      async: true,
    },
  ],

  plugins: [require.resolve("docusaurus-plugin-image-zoom")],

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
        docs: {routeBasePath: '/',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
          sidebarPath: require.resolve('./sidebars.js'),
        },
        // blog: {
        //   showReadingTime: true,
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        apiKey: 'f8f941f3bffd5bf970ba1fa27550a06e',
        indexName: 'paadocs',
        contextualSearch: true,
        placeholder: 'Search',
        appId: 'SX6JA1B3F5',
        //Search other parameters

      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // image zoom
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
      docs: {
        sidebar: {
          hideable: true
        },
      },
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Build Events-to-Business Actions Scenarios with SAP BTP and Microsoft Azure/AWS',
        logo: {
          alt: 'My Site Logo',
          src: 'img/githubFolder.png',
        },
        items: [
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/SAP-samples/btp-events-to-business-actions-framework',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/',
              },
            ],
          },
          {
            title: 'SAP Community',
            items: [
              {
                label: 'Blogs',
                href: 'https://blogs.sap.com/',
              },
              {
                label: 'Q&A',
                href: 'https://answers.sap.com/index.html',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Discovery Center',
                href: 'https://discovery-center.cloud.sap/index.html',
              },
              {
                label: 'GitHub Repo',
                href: 'https://github.com/SAP-samples/btp-events-to-business-actions-framework',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        additionalLanguages: ['bash', 'diff', 'json'],
      },
    }),
};

module.exports = config;


