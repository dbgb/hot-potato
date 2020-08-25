import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ title, spaceOnly = false, children }) => {
  return (
    <header>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexGrow: "1",
            padding: ".5rem 1rem",
          }}
        >
          <h1
            className={spaceOnly ? "spaceOnly" : ""}
            style={{
              margin: 0,
            }}
          >
            {
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {title}
              </Link>
            }
          </h1>
        </div>
        {children}
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
