import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "./ThemeContext";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeButton = styled.button`
  display: flex;
  padding: 0;
  border: none;
  margin-left: 1rem;
  background-color: var(--color-primary);
  transition: var(--ease);

  &:focus {
    outline: 2px dotted var(--color-secondary);
  }

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
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
      aria-pressed={!isLightMode}
      onClick={toggleTheme}
    >
      {!!colorScheme && (isLightMode ? <RiSunFill /> : <RiMoonClearFill />)}
    </DarkModeButton>
  );
};

export default DarkModeToggle;
