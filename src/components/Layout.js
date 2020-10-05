import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import styled from "styled-components";
import { themes, ThemeContext } from "../styles/ThemeContext";

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
  border-radius: 30px;
  margin-right: 10px;
  background-color: #eee;
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

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  //TODO: -- SSR compatible responsive layout & element behaviour

  // Check if browser-only `Window` API is available
  // ie. the app is in the browser and not being built by Gatsby SSR
  // ref: https://github.com/gatsbyjs/gatsby/issues/17667

  // const isSSR = typeof window === "undefined";

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const isLargeScreen = windowWidth >= 1520;

  // useEffect(() => {
  //   // Check window width on every render
  //   window.addEventListener("resize", setWindowWidth(window.innerWidth));
  //   return () => {
  //     // Clean up event listener on unmount, and before every render
  //     window.removeEventListener("resize", setWindowWidth(window.innerWidth));
  //   };
  //   // Only activate side effect when deps value changes
  // }, [isLargeScreen]);

  // TODO: -- end

  return (
    // Make consistent app theming available throughout app via React Context
    <ThemeContext.Provider
      value={theme === "light" ? themes.light : themes.dark}
    >
      <Header title={site.siteMetadata.title} showLogo>
        <DarkModeButton onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </DarkModeButton>
        <Navbar locations={["Recipes"]} />
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
