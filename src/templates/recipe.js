import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import styled from "styled-components";

const RecipeContainer = styled.div`
  a {
    text-decoration: underline dotted;
    color: var(--color-link);
    transition: color var(--ease);
  }

  a:hover {
    color: var(--color-highlight);
  }
`;

const RecipeContent = styled.div`
  color: var(--color-text-main);
  transition: color var(--ease);

  p {
    margin-bottom: 1rem;
  }

  h1,
  h2 {
    text-shadow: 2px 1px var(--color-primary);
    transition: text-shadow var(--ease);
  }

  ul,
  ol {
    line-height: 1.2rem;
    margin-left: 1.8rem;
    margin-bottom: 1rem;
  }

  @media print {
    h1,
    h2 {
      text-shadow: none;
    }
  }
`;

export default function Recipe({ data }) {
  const recipe = data.markdownRemark;

  return (
    <Layout>
      <RecipeContainer>
        <SEO title={recipe.frontmatter.title} />
        <RecipeContent dangerouslySetInnerHTML={{ __html: recipe.html }} />
      </RecipeContainer>
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
