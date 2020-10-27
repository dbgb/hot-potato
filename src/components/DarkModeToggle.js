import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "./ThemeProvider";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeButton = styled.button`
  border: none;
  outline: none;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  background-color: var(--color-primary);
  transition: var(--ease);

  > svg {
    width: 2rem;
    height: 2rem;
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
      {!!colorScheme && (isLightMode ? <RiSunFill /> : <RiMoonClearFill />)}
    </DarkModeButton>
  );
};

export default DarkModeToggle;
