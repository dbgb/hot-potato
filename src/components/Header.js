import React from "react";
import { Link } from "gatsby";
import { Navbar } from "./NavBar";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ title, children }) => {
  return (
    <div style={{ background: "burlywood" }}>
      <header className="container">
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            padding: ".5rem 1rem",
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
              {title}
            </Link>
          </h1>
        </div>
        {children}
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
