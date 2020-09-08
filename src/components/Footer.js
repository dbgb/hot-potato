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
            github
          }
        }
      }
    `
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a href={site.siteMetadata.github}>
          © {site.siteMetadata.author} {new Date().getFullYear()}
        </a>
        &nbsp;&ndash;&nbsp;Built with&nbsp;
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  );
}
