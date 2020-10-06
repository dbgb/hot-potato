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

const DarkModeButton = styled.button`
  border: none;
  margin: 5px 10px 0 0;
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.theme.primary};
  transition: 0.3s ease;

  > svg {
    min-width: 25px;
    min-height: 25px;
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

  const [theme, setTheme] = useState("light");
  const isLightTheme = theme === "light";

  const toggleTheme = () => {
    isLightTheme ? setTheme("dark") : setTheme("light");
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
    <ThemeContext.Provider value={isLightTheme ? themes.light : themes.dark}>
      <Header title={site.siteMetadata.title} showLogo>
        <Navbar locations={["Recipes"]} />
        <DarkModeButton
          theme={isLightTheme ? themes.light : themes.dark}
          title="Toggle Dark Mode"
          aria-label="Dark mode toggle button"
          onClick={toggleTheme}
        >
          {isLightTheme ? <RiMoonClearFill /> : <RiSunFill />}
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
