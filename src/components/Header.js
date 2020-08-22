import React from "react";
import { Link } from "gatsby";
import { Navbar } from "./NavBar";
import PropTypes from "prop-types";

const Header = ({ siteTitle }) => {
  return (
    <div style={{ background: "burlywood" }}>
      <header
        style={{
          display: "flex",
          margin: "0 auto",
          marginBottom: "1.3rem",
          maxWidth: 800,
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            padding: "1rem 1.45rem",
          }}
        >
          <h1
            style={{
              margin: 0,
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
        <Navbar locations={["/", "Search", "Recipes"]} />
      </header>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
