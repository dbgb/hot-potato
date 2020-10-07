import React from "react";

export const themes = {
  light: {
    primary: "#deb887",
    secondary: "#fbf7f3",
    background: "#fbf7f3",
    border: "#deb887",
    textHeader: "#fbf7f3",
    textFooter: "#111111",
    textMain: "#111111",
    link: "#111111",
  },
  dark: {
    primary: "#3e424f",
    secondary: "#696d7b",
    background: "#696d7b",
    border: "#3e424f",
    textHeader: "#fbf7f3",
    textFooter: "#111111",
    textMain: "#fbf7f3",
    link: "#111111",
  },
};

export const ThemeContext = React.createContext(themes.light);
