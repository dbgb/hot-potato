import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  top: var(--offset-content-top);
  font-size: 0.75rem;

  @media print {
    display: none;
  }
`;

const FooterContent = styled.div`
  color: var(--color-text-main);

  > a {
    color: var(--color-link);
    text-decoration: none;
  }
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
