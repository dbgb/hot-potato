/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// https://www.gatsbyjs.com/docs/node-apis/#onCreateNode
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // Create slugs for markdown recipe files
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "src/recipes",
      trailingSlash: false,
    });
    // Extend MarkdownRemark nodes with new slug field
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// https://www.gatsbyjs.com/docs/node-apis/#createPages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const recipeTemplate = path.resolve("./src/templates/recipe.js");

  // Query for MarkdownRemark slug fields
  const slugs = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Create page for each slug
  slugs.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: recipeTemplate,
      context: {
        // Data passed into context is available as GraphQL
        // variable within page queries
        slug: node.fields.slug,
      },
    });
  });
};
