/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";
import { themes } from "./src/styles/themes";
import App from "./src/components/App";

// Any code passed into the return script tag of this component will not be
// sanitized by React. Used only at compile-time, so cannot be abused by users
// to inject malicious code into the application.
const InjectableScript = () => {
  // IIFE passed as a template string so as to be inserted into the DOM at
  // compile-time, but only invoked when interpreted by the browser at run-time.
  // Theme color choice values can then be interpolated into the template string
  // and used to update CSS variables - which, as they change, can be used to
  // style the DOM reactively.
  // Color scheme selection priority:
  //  1. Explicit choice made from previous use of theme toggle button
  //  2. If no localstorage entry, check user browser preference
  //  3. Default to light theme if no preference found
  let setColorsFromScheme = `
    (function() {
      function getInitialColorScheme() {
        const storedTheme = window.localStorage.getItem("color-scheme");
        const hasStoredTheme = typeof storedTheme === "string";
        if (hasStoredTheme) return storedTheme;

        const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)");
        const hasPreferredTheme = typeof preferredTheme.matches === "boolean";
        if (hasPreferredTheme) return preferredTheme.matches ? "dark" : "light";

        return "light";
      };
      const colorScheme = getInitialColorScheme();

      let root = document.documentElement;
      root.style.setProperty("--initial-color-scheme", colorScheme);
      root.style.setProperty("--color-primary",
        colorScheme === "light" ? "${themes.light.primary}" : "${themes.dark.primary}");
      root.style.setProperty("--color-secondary",
        colorScheme === "light" ? "${themes.light.secondary}" : "${themes.dark.secondary}");
      root.style.setProperty("--color-background",
        colorScheme === "light" ? "${themes.light.background}" : "${themes.dark.background}");
      root.style.setProperty("--color-text-header",
        colorScheme === "light" ? "${themes.light.textHeader}" : "${themes.dark.textHeader}");
      root.style.setProperty("--color-text-main",
        colorScheme === "light" ? "${themes.light.textMain}" : "${themes.dark.textMain}");
      root.style.setProperty("--color-link",
        colorScheme === "light" ? "${themes.light.link}" : "${themes.dark.link}");
    })()`;

  return <script dangerouslySetInnerHTML={{ __html: setColorsFromScheme }} />;
};

// Injecting the CSS color setting script before the main body of the
// application loads ensures that when the page renders, it detects the
// appropriate values for the end user, and never displays a flash of wrongly
// styled content.
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<InjectableScript key="color-scheme-setter" />);
};

// Prevent unmount of top-level component (and its state) across page changes
export const wrapPageElement = ({ element }) => {
  return <App>{element}</App>;
};
