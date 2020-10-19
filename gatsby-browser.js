/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";
import App from "./src/components/App";

require("typeface-caveat");
require("typeface-clear-sans");
require("./src/styles/default.css");

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
