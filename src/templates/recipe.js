import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import styles from "./recipe.module.css";

export default function Recipe({ data }) {
  const recipe = data.markdownRemark;

  return (
    <Layout>
      <div>
        <SEO title={recipe.frontmatter.title} />
        <div
          className={styles.recipe}
          dangerouslySetInnerHTML={{ __html: recipe.html }}
        />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
