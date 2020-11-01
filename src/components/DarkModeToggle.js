import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "./ThemeContext";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  outline: none;
  margin-left: 1rem;
  background-color: var(--color-primary);
  transition: var(--ease);

  > svg {
    width: 2.25rem;
    height: 2.25rem;
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
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
    >
      {!!colorScheme && (isLightMode ? <RiSunFill /> : <RiMoonClearFill />)}
    </DarkModeButton>
  );
};

export default DarkModeToggle;
