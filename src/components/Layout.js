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
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

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
      {/* <Header title={site.siteMetadata.title}>
        <Navbar locations={["Search", "Recipes"]} />
      </Header> */}
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Sidebar width={350}>
          <Header title={site.siteMetadata.title}>
            <Navbar locations={["Search", "Recipes"]} />
          </Header>
          <div style={{ padding: "1.45rem" }}>
            <h2>Search</h2>
            <br />
            <h3>Content</h3>
            <h3>Content</h3>
            <h3>Content</h3>
            <h3>Content</h3>
            <h3>Content</h3>
            <h3>Content</h3>
          </div>
        </Sidebar>
        <div
          style={{
            position: "absolute",
            top: "1.45rem",
            left: 0,
            right: 0,
            maxWidth: 800,
            margin: "0 auto",
            paddingLeft: "1.45rem",
          }}
        >
          <main>{children}</main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
