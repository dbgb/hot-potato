import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import styled from "styled-components";
import { upRock, speedInLeft } from "../styles/animations";

const FlyingImg = styled.div`
  display: flex;
  height: 60vh;
  justify-content: center;
  align-items: center;
  animation: ${speedInLeft} 2s ease-out;
`;

const RockingImg = styled(Img)`
  animation: ${upRock} 1s linear infinite;
`;

const IndexPage = ({ data }) => {
  const { title } = data.site.siteMetadata;
  const { fixed: logo } = data.file.childImageSharp;

  return (
    <Layout>
      <SEO title={title} />
      <FlyingImg>
        <RockingImg fixed={logo} />
      </FlyingImg>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    file(relativePath: { eq: "hot-potato.png" }) {
      childImageSharp {
        fixed(width: 300, height: 300) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`;

export default IndexPage;
