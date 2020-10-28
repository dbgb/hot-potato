import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled, { css } from "styled-components";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import DarkModeToggle from "./DarkModeToggle";
import {
  MdHome,
  MdSync,
  MdCompareArrows,
  MdImportExport,
  MdSearch,
  MdRemove,
  MdFormatListNumbered,
} from "react-icons/md";

const IconStyling = css`
  font-size: 2.5rem;
  margin-left: 0.5rem;
  color: var(--color-secondary);
`;

const SearchIcon = styled(MdSearch)`
  ${IconStyling};
  margin-left: 0;
`;

const QuickCycleIcon = styled(MdSync)`
  ${IconStyling};
`;

const QuickRemoveIcon = styled(MdRemove)`
  ${IconStyling};
`;

const QuickListIcon = styled(MdFormatListNumbered)`
  ${IconStyling};
`;

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;

  main {
    position: relative;
    top: var(--offset-content-top);
    width: 800px;
    margin: 0 auto;
    padding: 0 0.5rem;
  }
`;

const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <>
      <Header title={site.siteMetadata.title} showLogo>
        {/* <Navbar locations={["Recipes"]} /> */}
        {/* <Link to="/recipes">
          <HomeIcon />
        </Link> */}
        <SearchIcon />
        <QuickListIcon />
        <QuickCycleIcon />
        <DarkModeToggle />
      </Header>
      <LayoutContainer>
        <Sidebar>
          <Header title={site.siteMetadata.title} spaceOnly />
          <Search />
        </Sidebar>
        <main>{children}</main>
      </LayoutContainer>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
