import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../styles/ThemeContext";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  min-height: 100vh;
  width: 350px;
  border-right: 1px solid burlywood;
  background-color: ${(props) => props.bg};
  opacity: 1;
  z-index: 1;
  transition: 0.3s ease;
  transform: ${(props) =>
    props.isOpen ? `translate(${props.position}px)` : `translate(0px)`};

  /* TODO: SSR friendly sidebar state detection / behaviour
  | 
  | First paint: SSR friendly CSS media query sets sidebar position
  | After hydration: once mounted/set, isOpen state dictates sidebar position
  |
  | "hasMounted ? null : -width"

  @media screen and (max-width: 767px) {
    transform: translate(-350px);
  }
  @media screen and (min-width: 768px) {
    transform: translate(0px);
  }
  */
`;

const SidebarContent = styled.div``;

const SidebarToggle = styled.button`
  position: absolute;
  top: 25vh;
  height: 100px;
  border: 1px solid #373737;
  border-left: 0;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: ${(props) => props.bg};
  outline: none;
  z-index: 1;
  transform: ${(props) => `translate(${props.position}px)`};
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
    <SidebarContainer bg={theme.secondary} position={xPos} isOpen>
      <SidebarToggle
        bg={theme.primary}
        position={width}
        onClick={() => handleToggle()}
        aria-label="Toggle sidebar"
      />
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
