import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

export default function Recipes({ data }) {
  const { edges, totalCount } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Recipes" />
      <h1>Recipes</h1>
      <ul>
        {edges.map(({ node }, index) => {
          const { title, category } = node.frontmatter;
          const { slug } = node.fields;

          return (
            <li key={index}>
              {category} <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <p>{totalCount} recipes and counting!</p>
      <Link to="/">Home</Link>
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          html
          frontmatter {
            category
            title
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`;
