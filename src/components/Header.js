import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  min-height: 66px;
  width: 100%;
  z-index: 2;
  background: var(--color-primary);
  border-bottom: 1px solid var(--color-text-header);
  transition: var(--ease);

  @media print {
    display: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  max-width: var(--max-width-main);
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
  color: var(--color-text-header);
  text-decoration: none;
`;

const HeaderImg = styled(Img)`
  margin-right: -1rem;
  min-width: 50px;
`;

const HeaderTitle = styled.h1`
  visibility: ${(props) => (props.spaceOnly ? "hidden" : "visible")};
  text-shadow: 2px 1px var(--color-secondary);
  transition: var(--ease);

  @media screen and (max-width: ${breakpoints.xs}em) {
    font-size: 2rem;
  }
`;

const Header = ({ title, spaceOnly = false, children }) => {
  const { file } = useStaticQuery(
    graphql`
      {
        file(relativePath: { eq: "hot-potato.png" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `
  );

  const logo = file.childImageSharp.fixed;

  return (
    <HeaderContainer>
      <HeaderContent>
        {!spaceOnly && <HeaderImg fixed={logo} />}
        <HeaderGrow>
          <HeaderTitle spaceOnly={spaceOnly}>
            {<HeaderLink to="/">{title}</HeaderLink>}
          </HeaderTitle>
        </HeaderGrow>
        {children}
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
