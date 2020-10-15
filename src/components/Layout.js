import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import { DarkModeToggle } from "./DarkModeToggle";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { themes } from "../styles/themes";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Global CSS Variables */
    --ease: 0.3s ease;

    /* Global CSS Styling */
    color: ${(props) => props.theme.textMain};
    background-color: ${(props) => props.theme.background};
    transition: var(--ease);
  }
`;

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

  const isSSR = typeof window === "undefined";

  let initialTheme = "light";
  if (!isSSR) {
    let storedTheme = window.localStorage.getItem("color-scheme");
    storedTheme && (initialTheme = storedTheme);
  }
  const [theme, setTheme] = useState(initialTheme);
  const isLightTheme = theme === "light";

  const toggleTheme = () => {
    isLightTheme ? setTheme("dark") : setTheme("light");
    isLightTheme
      ? window.localStorage.setItem("color-scheme", "dark")
      : window.localStorage.setItem("color-scheme", "light");
  };

  return (
    <ThemeProvider theme={isLightTheme ? themes.light : themes.dark}>
      <GlobalStyles theme={isLightTheme ? themes.light : themes.dark} />
      <Header title={site.siteMetadata.title} showLogo>
        <Navbar locations={["Recipes"]} />
        <DarkModeToggle
          theme={isLightTheme ? themes.light : themes.dark}
          title="Toggle Dark Mode"
          aria-label="Dark mode toggle button"
          onClick={toggleTheme}
        >
          {isLightTheme ? <RiSunFill /> : <RiMoonClearFill />}
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
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
