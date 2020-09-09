import React from "react";

export const themes = {
  light: {
    primary: "#deb887",
    secondary: "#fbf7f3",
  },
  dark: {
    primary: "#fbf7f3",
    secondary: "#373737",
  },
};

export const ThemeContext = React.createContext(themes.light);
