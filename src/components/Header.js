import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ title, spaceOnly = false, showLogo = false, children }) => {
  const { file } = useStaticQuery(
    graphql`
      {
        file(relativePath: { eq: "hot-potato.png" }) {
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    `
  );

  const logo = file.childImageSharp.fixed;

  return (
    <header>
      <div className={styles.container}>
        {showLogo && <Img className={styles.logo} fixed={logo} />}
        <div className={styles.headerGrow}>
          <h1 className={spaceOnly ? styles.spaceOnly : null}>
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
