import React from "react";

export const themes = {
  light: {
    primary: "#deb887",
    secondary: "#fbf7f3",
  },
  dark: {
    primary: "#373737",
    secondary: "#9b9b9b",
  },
};

export const ThemeContext = React.createContext(themes.light);
