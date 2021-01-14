import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";
import { ThemeContext } from "./ThemeContext";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  height: var(--offset-header-bottom);
  width: 100vw;
  z-index: 2;
  border-bottom: 1px solid var(--color-text-header);
  background-color: var(--color-primary);
  transition: background-color var(--ease), border var(--ease);

  @media print {
    display: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  max-width: var(--max-width-main);
  padding: 0.5rem;
  margin: 0 auto;
`;

const HeaderImg = styled(Img)`
  margin-right: -1rem;
`;

const HeaderGrow = styled.div`
  display: flex;
  flex: 1;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.5rem;

  h1 {
    margin: 0;
  }

  a:hover {
    text-decoration: none;
  }
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  color: var(--color-text-header);
  transition: color var(--ease);
`;

const HeaderTitle = styled.h1`
  visibility: ${(props) => (props.spaceOnly ? "hidden" : "visible")};
  text-shadow: 2px 1px var(--color-secondary);
  transition: text-shadow var(--ease);
`;

const Header = ({ title, spaceOnly = false, children }) => {
  const { standardLogo, tinyLogo } = useStaticQuery(
    graphql`
      {
        standardLogo: file(relativePath: { eq: "hot-potato.png" }) {
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
        tinyLogo: file(relativePath: { eq: "hot-potato.png" }) {
          childImageSharp {
            fixed(width: 40) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `
  );

  const logoSrcSet = [
    standardLogo.childImageSharp.fixed,
    {
      ...tinyLogo.childImageSharp.fixed,
      media: `(max-width: calc(${breakpoints.xs}em - 3em))`,
    },
  ];

  const { colorScheme } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        {!spaceOnly && (
          <HeaderImg loading="eager" alt="logo" fixed={logoSrcSet} />
        )}
        {!!colorScheme && (
          <>
            <HeaderGrow>
              <HeaderTitle spaceOnly={spaceOnly}>
                {<HeaderLink to="/">{title}</HeaderLink>}
              </HeaderTitle>
            </HeaderGrow>
            {children}
          </>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  spaceOnly: PropTypes.bool,
  children: PropTypes.node,
};

export default Header;
