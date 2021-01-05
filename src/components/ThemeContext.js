import React, { useState, useEffect, useMemo, createContext } from "react";
import { themes } from "../styles/themes";

/*
 * Required to prevent failure on Gatsby build
 * ref: https://github.com/gatsbyjs/gatsby/issues/19255
 */
const defaultState = {
  colorScheme: undefined,
  persistColorScheme: () => {},
};

export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }) => {
  /*
   * As the first paint of the application comes from SSR (no window object),
   * there's no obvious way of knowing what color scheme the end user wants.
   * Therefore, the component color scheme state is initially undefined, then
   * set on mount to the value of the initial-color-scheme css variable
   * determined by the `gatsby-ssr` pre-body script
   */
  const [colorScheme, setColorScheme] = useState(undefined);

  // On mount side effects bound to root element
  useEffect(() => {
    const root = window.document.documentElement;
    /*
     *  Apply global transition effect on mount to prevent unset transition on
     *  first paint for elements which have not yet been assigned their styling
     *  from the ssr preBody script.
     */
    root.style.setProperty("transition", "var(--ease)");

    // Assigned in `gatsby-ssr` preBody script
    const initialColorScheme = root.style.getPropertyValue(
      "--initial-color-scheme"
    );

    setColorScheme(initialColorScheme);
  }, []); // Fire once, on mount

  const context = useMemo(() => {
    const persistColorScheme = (scheme) => {
      window.localStorage.setItem("color-scheme", scheme);

      const isLightMode = scheme === "light";
      const root = window.document.documentElement;
      root.style.setProperty(
        "--color-primary",
        isLightMode ? themes.light.primary : themes.dark.primary
      );
      root.style.setProperty(
        "--color-secondary",
        isLightMode ? themes.light.secondary : themes.dark.secondary
      );
      root.style.setProperty(
        "--color-background",
        isLightMode ? themes.light.background : themes.dark.background
      );
      root.style.setProperty(
        "--color-highlight",
        isLightMode ? themes.light.highlight : themes.dark.highlight
      );
      root.style.setProperty(
        "--color-text-header",
        isLightMode ? themes.light.textHeader : themes.dark.textHeader
      );
      root.style.setProperty(
        "--color-text-main",
        isLightMode ? themes.light.textMain : themes.dark.textMain
      );
      root.style.setProperty(
        "--color-link",
        isLightMode ? themes.light.link : themes.dark.link
      );

      setColorScheme(scheme);
    };

    return { colorScheme, persistColorScheme };
  }, [colorScheme, setColorScheme]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
