module.exports = {
  siteMetadata: {
    title: "Hot Potato!",
    description: "A cookbook app for working with Markdown formatted recipes.",
    author: "dbgb",
    github: "https://github.com/dbgb",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "recipes",
        path: `${__dirname}/src/recipes`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-autolink-headers"],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Hot Potato!",
        short_name: "Hot Potato!",
        start_url: "/",
        background_color: "burlywood",
        theme_color: "burlywood",
        display: "minimal-ui",
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "@gatsby-contrib/gatsby-plugin-elasticlunr-search",
      options: {
        // Fields to add to search index
        fields: ["title", "category"],
        // Field to node mappings
        resolvers: {
          MarkdownRemark: {
            title: (node) => node.frontmatter.title,
            category: (node) => node.frontmatter.category,
            slug: (node) => node.fields.slug,
          },
        },
        // Skip indexing on recipes tagged as work in progress
        filter: (node, getNode) => node.frontmatter.wip !== true,
      },
    },
    // (optional) Enable Progressive Web App + Offline functionality
    // ref: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
};
