import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../styles/ThemeContext";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  min-height: 100vh;
  width: 350px;
  border-right: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  opacity: 1;
  z-index: 1;
  transition: var(--ease);
  transform: ${(props) =>
    props.isOpen ? `translate(${props.position}px)` : `translate(0px)`};
`;

const SidebarContent = styled.div``;

const SidebarToggle = styled.button`
  position: absolute;
  top: 25vh;
  height: 100px;
  border: 1px solid ${(props) => props.theme.border};
  border-left: 0;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: ${(props) => props.theme.border};
  outline: none;
  z-index: 1;
  transform: ${(props) => `translate(${props.position}px)`};
  transition: var(--ease);
`;

const Sidebar = ({ width = 350, children }) => {
  const theme = useContext(ThemeContext);

  const [xPos, setXPos] = useState(-width); // closed by default (mobile friendly)
  const [isOpen, setIsOpen] = useState(xPos === 0); // true if sidebar open

  const handleToggle = () => {
    if (isOpen) {
      setXPos(-width);
      setIsOpen(!isOpen);
    } else {
      setXPos(0);
      setIsOpen(!isOpen);
    }
  };

  return (
    <SidebarContainer theme={theme} position={xPos} isOpen>
      <SidebarToggle
        theme={theme}
        position={width}
        onClick={() => handleToggle()}
        aria-label="Toggle sidebar"
      />
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
