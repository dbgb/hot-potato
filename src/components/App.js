import React from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "./ThemeContext";
import { ModalProvider } from "./ModalContext";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Global CSS Variables */
    --ease: 0.3s ease;
    --max-width-main: 800px;
    --offset-content-top: 90px;

    /* Global CSS Styling */
    color: var(--color-text-main);
    background-color: var(--color-background);

    @media screen and (max-width: 400px) {
      font-size: 80%;
    }
  }
`;

// Used in `gatsby-browser.js` to wrap the Gatsby root element, and
// `gatsby-ssr.js` to persist the global styling, flicker-free, across page
// changes
const App = ({ children }) => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <GlobalStyles />
        {children}
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
