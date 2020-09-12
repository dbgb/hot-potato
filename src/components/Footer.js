import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

const FooterContainer = styled.footer`
  position: relative;
  top: 2rem;
  display: flex;
  font-size: 0.75rem;
  flex-direction: column;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            author
            github
          }
        }
      }
    `
  );

  return (
    <FooterContainer>
      <FooterContent>
        <a href={site.siteMetadata.github}>
          © {site.siteMetadata.author} {new Date().getFullYear()}
        </a>
        &nbsp;&ndash;&nbsp;Built with&nbsp;
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
