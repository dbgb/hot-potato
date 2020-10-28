import React from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "./ThemeProvider";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Global CSS Variables */
    --ease: 0.3s ease;
    --offset-content-top: 90px;

    /* Global CSS Styling */
    color: var(--color-text-main);
    background-color: var(--color-background);

    @media screen and (max-width: 400px) {
      font-size: 85%;
    }
  }
`;

// Used in `gatsby-browser.js` to wrap the Gatsby root element, and
// `gatsby-ssr.js` to persist the global styling, flicker-free, across page
// changes
const App = ({ children }) => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default App;
