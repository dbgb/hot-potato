import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "./ThemeProvider";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeButton = styled.button`
  border: none;
  outline: none;
  margin: 5px 0 0 5px;
  width: 3rem;
  height: 3rem;
  background-color: var(--color-primary);
  transition: var(--ease);

  > svg {
    min-width: 30px;
    min-height: 30px;
    fill: var(--color-secondary);
  }
`;

const DarkModeToggle = () => {
  const { colorScheme, persistColorScheme } = useContext(ThemeContext);
  const isLightMode = colorScheme === "light";

  const toggleTheme = () => {
    isLightMode ? persistColorScheme("dark") : persistColorScheme("light");
  };

  return (
    <DarkModeButton
      title="Toggle Dark Mode"
      aria-label="Dark mode toggle button"
      onClick={toggleTheme}
    >
      {isLightMode ? <RiSunFill /> : <RiMoonClearFill />}
    </DarkModeButton>
  );
};

export default DarkModeToggle;
