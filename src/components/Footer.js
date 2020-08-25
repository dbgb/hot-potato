import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styles from "./Footer.module.css";

export default function Footer() {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        © {site.siteMetadata.author} {new Date().getFullYear()}, Built
        with&nbsp;
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  );
}
