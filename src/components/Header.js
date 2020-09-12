import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { ThemeContext } from "../styles/ThemeContext";

const HeaderContent = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  padding: 0.5rem;
`;

const HeaderGrow = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 0.5rem 1.5rem;

  h1 {
    margin: 0;
  }

  a:hover {
    text-decoration: none;
  }
`;

const HeaderLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const HeaderImg = styled(Img)`
  margin-right: -1rem;
`;

const Header = ({ title, spaceOnly = false, showLogo = false, children }) => {
  const { file } = useStaticQuery(
    graphql`
      {
        file(relativePath: { eq: "hot-potato.png" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    `
  );

  const logo = file.childImageSharp.fixed;

  const theme = useContext(ThemeContext);

  const HeaderContainer = styled.header`
    background: ${theme.primary};
  `;

  const HeaderTitle = styled.h1`
    visibility: ${spaceOnly ? "hidden" : "null"};
  `;

  return (
    <HeaderContainer>
      <HeaderContent>
        {showLogo && <HeaderImg fixed={logo} />}
        <HeaderGrow>
          <HeaderTitle>{<HeaderLink to="/">{title}</HeaderLink>}</HeaderTitle>
        </HeaderGrow>
        {children}
      </HeaderContent>
    </HeaderContainer>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
