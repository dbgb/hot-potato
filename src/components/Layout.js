import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { themes, ThemeContext } from "../styles/ThemeContext";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Global CSS Variables */
    --ease: 0.3s ease;

    /* Global CSS Styling */
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

const DarkModeButton = styled.button`
  border: none;
  outline: none;
  margin: 5px 0 0 5px;
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.theme.primary};
  transition: var(--ease);

  > svg {
    min-width: 30px;
    min-height: 30px;
    fill: ${(props) => props.theme.secondary};
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
    // Make consistent app theming available throughout app via React Context
    <ThemeContext.Provider value={isLightTheme ? themes.light : themes.dark}>
      <GlobalStyles theme={isLightTheme ? themes.light : themes.dark} />
      <Header title={site.siteMetadata.title} showLogo>
        <Navbar locations={["Recipes"]} />
        <DarkModeButton
          theme={isLightTheme ? themes.light : themes.dark}
          title="Toggle Dark Mode"
          aria-label="Dark mode toggle button"
          onClick={toggleTheme}
        >
          {isLightTheme ? <RiSunFill /> : <RiMoonClearFill />}
        </DarkModeButton>
      </Header>
      <LayoutContainer>
        <Sidebar>
          <Header title={site.siteMetadata.title} spaceOnly />
          <Search />
        </Sidebar>
        <main>{children}</main>
      </LayoutContainer>
      <Footer />
    </ThemeContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
