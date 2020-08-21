module.exports = {
  siteMetadata: {
    title: "Hot Potato!",
    description: "A cookbook app for working with Markdown formatted recipes.",
    author: "dbgb",
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
        icon: "src/images/icon.png", // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // ref: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
};
