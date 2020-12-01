/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";
import App from "./src/components/App";

require("typeface-caveat");
require("typeface-roboto-mono");
require("./src/styles/default.css");

// Provide global styles and context to Gatsby root component
export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
