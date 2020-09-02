/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import styles from "./Layout.module.css";

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

  //TODO:--

  // This check ensures the Gatsby static build process doesn't fail during
  // server side rendering, when the browser-only `window` object is not
  // available - ref: https://github.com/gatsbyjs/gatsby/issues/17667
  // const isSSR = typeof window === "undefined";

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const isLargeScreen = windowWidth >= 1520;

  // const ClientSideOnlyLazy = React.lazy(() => {
  //   useEffect(() => {
  //     // Check window width on every render
  //     window.addEventListener("resize", setWindowWidth(window.innerWidth));
  //     return () => {
  //       // Clean up event listener on unmount, and before every render
  //       window.removeEventListener("resize", setWindowWidth(window.innerWidth));
  //     };
  //     // Only activate side effect when deps value changes
  //   }, [isLargeScreen]);
  // });

  // TODO:--end

  return (
    <>
      <Header title={site.siteMetadata.title}>
        <Navbar locations={["Recipes"]} />
      </Header>
      <div className={styles.container}>
        <Sidebar width={350}>
          <Header title={site.siteMetadata.title} spaceOnly />
          <Search />
        </Sidebar>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
