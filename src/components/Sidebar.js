import React, { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  min-height: 100vh;
  width: 350px;
  border-right: 1px solid var(--color-primary);
  background-color: var(--color-background);
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
  border: 1px solid var(--color-primary);
  border-left: 0;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: var(--color-primary);
  outline: none;
  z-index: 1;
  transform: ${(props) => `translate(${props.position}px)`};
  transition: var(--ease);
`;

const Sidebar = ({ width = 350, children }) => {
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
    <SidebarContainer position={xPos} isOpen>
      <SidebarToggle
        position={width}
        onClick={() => handleToggle()}
        aria-label="Toggle sidebar"
      />
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
