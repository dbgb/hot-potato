import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import styles from "./Layout.module.css";
import { themes, ThemeContext } from "../styles/ThemeContext";

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
    // Make consistent app theme available through React Context
    <ThemeContext.Provider value={themes.light}>
      <Header title={site.siteMetadata.title} showLogo>
        <Navbar locations={["Recipes"]} />
      </Header>
      <div className={styles.container}>
        <Sidebar>
          <Header title={site.siteMetadata.title} spaceOnly />
          <Search />
        </Sidebar>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
