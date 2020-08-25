import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ title, spaceOnly = false, children }) => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.headerGrow}>
          <h1 className={spaceOnly ? styles.spaceOnly : ""}>
            {
              <Link to="/" className={styles.headerLink}>
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
