/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";

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
      <Header title={site.siteMetadata.title}>
        <Navbar locations={["Search", "Recipes"]} />
      </Header>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Sidebar width={350}>
          <Header title={site.siteMetadata.title} spaceOnly />
          <div style={{ padding: "1.45rem" }}>
            <h2>Search</h2>
            <ul>
              <li>
                Result <button>+</button>
              </li>
              <li>
                Result <button>+</button>
              </li>
              <li>
                Result <button>+</button>
              </li>
              <li>
                Result <button>+</button>
              </li>
            </ul>
          </div>
        </Sidebar>
        <div
          style={{
            position: "absolute",
            top: "5rem",
            left: 0,
            right: 0,
            maxWidth: 800,
            margin: "0 auto",
            paddingLeft: "1rem",
            // TODO: on mobile increase left pad 1rem
          }}
        >
          <main>{children}</main>
        </div>
      </div>
      {/* <Footer
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      /> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
