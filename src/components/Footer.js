import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div id="footerContent">
        © dbgb {new Date().getFullYear()}, Built with&nbsp;
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  );
}
