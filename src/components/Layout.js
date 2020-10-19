import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { ThemeContext } from "./ThemeProvider";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import DarkModeToggle from "./DarkModeToggle";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;

  main {
    position: relative;
    top: 2rem;
    width: 800px;
    margin: 0 auto;
    padding: 0 1.5rem;
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

  const { colorScheme, persistColorScheme } = useContext(ThemeContext); // BUG: SSR build cannot destructure "undefined"
  const isLightMode = colorScheme === "light";

  const toggleTheme = () => {
    isLightMode ? persistColorScheme("dark") : persistColorScheme("light");
  };

  return (
    <>
      <Header title={site.siteMetadata.title} showLogo>
        <Navbar locations={["Recipes"]} />
        <DarkModeToggle
          title="Toggle Dark Mode"
          aria-label="Dark mode toggle button"
          onClick={toggleTheme}
        >
          {isLightMode ? <RiSunFill /> : <RiMoonClearFill />}
        </DarkModeToggle>
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
