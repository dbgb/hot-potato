import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

const IndexPage = ({ data }) => {
  const { title } = data.site.siteMetadata;
  const { fixed: logo } = data.file.childImageSharp;

  return (
    <Layout>
      <SEO title={title} />
      <div style={{ textAlign: "center" }}>
        <Img fixed={logo} style={{ display: "block", margin: "0 auto" }} />
      </div>
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
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`;

export default IndexPage;
