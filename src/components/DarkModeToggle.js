import React, { useContext } from "react";
import styled from "styled-components";
import { commonButtonStyling } from "../styles/buttons";
import { ThemeContext } from "./ThemeContext";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const DarkModeButton = styled.button`
  display: flex;
  padding: 0;
  margin-left: 1rem;
  margin-right: 0.4rem;
  ${commonButtonStyling};

  > svg {
    width: 2.25rem;
    height: 2.25rem;
    color: var(--color-text-header);
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
