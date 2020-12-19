import React from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "./ThemeContext";
import { ModalProvider } from "./ModalContext";
import { breakpoints } from "../styles/breakpoints";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Global CSS Variables */
    --ease: 0.3s ease;
    --max-width-main: 61rem;
    --offset-content-top: 7rem;

    /* Global CSS Styling */
    color: var(--color-text-main);
    background-color: var(--color-background);

    @media screen and (max-width: ${breakpoints.sm}em) {
      font-size: 80%;
    }

    @media screen and (max-width: calc(${breakpoints.xs}em - 3em)) {
      /* Prevent undesirable layout wrapping until ~300px viewport width */
      font-size: 70%;
    }
  }

  ::selection {
    background-color: var(--color-primary);
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
