import React from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "./ThemeContext";
import { ModalProvider } from "./ModalContext";
import { QuickListProvider } from "./QuickListContext";
import { breakpoints } from "../styles/breakpoints";
import sidebar from "../styles/sidebar";

const GlobalStyles = createGlobalStyle`
  :root {
    /* 
     * Global CSS Variables
     */
    --content-max-width: 60rem;
    --content-offset-top: calc(var(--header-offset-bottom) + 2rem);
    --ease: 0.4s ease;
    --header-offset-bottom: 5rem;
    --sidebar-width: ${sidebar.width}rem;

    /*
     * Global CSS Styling
     */
    color: var(--color-text-main);
    background-color: var(--color-background);

    @media screen and (max-width: ${breakpoints.sm}em) {
      font-size: 80%;
    }

    @media screen and (max-width: calc(${breakpoints.xs}em - 3em)) {
      /* 
       * Combined with fallback styling in the Header component, keeps UI
       * functional without layout breakage until ~250px viewport width
       */
      font-size: 70%;
    }
  }

  ::selection {
    background-color: var(--color-primary);
  }
`;

/*
 * Used in `gatsby-browser.js` to wrap the Gatsby root element, and
 * `gatsby-ssr.js` to persist the global styling, flicker-free, across page
 * changes
 */

const App = ({ children }) => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <QuickListProvider>
          <GlobalStyles />
          {children}
        </QuickListProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
