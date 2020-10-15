import React, { useContext } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import styled, { ThemeContext } from "styled-components";

const RecipeContainer = styled.div`
  a {
    color: ${(props) => props.theme.link};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const RecipeContent = styled.div`
  color: ${(props) => props.theme.textMain};
  h1,
  h2 {
    text-shadow: 2px 1px ${(props) => props.theme.primary};
  }
`;

export default function Recipe({ data }) {
  const theme = useContext(ThemeContext);
  const recipe = data.markdownRemark;

  return (
    <Layout>
      <RecipeContainer theme={theme}>
        <SEO title={recipe.frontmatter.title} />
        <RecipeContent
          theme={theme}
          dangerouslySetInnerHTML={{ __html: recipe.html }}
        />
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
