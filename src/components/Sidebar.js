import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../styles/ThemeContext";

const SidebarContent = styled.div``;

const Sidebar = ({ width = 350, children }) => {
  // First paint: SSR friendly CSS media query sets sidebar position
  // After hydration: once `isOpen` state is set, it dictates sidebar position
  const [xPos, setXPos] = useState(-width); // closed by default (mobile friendly)
  const [isOpen, setIsOpen] = useState(xPos === 0); // true if sidebar open
  const theme = useContext(ThemeContext);

  const SidebarContainer = styled.div`
    position: fixed;
    top: 0;
    min-height: 100vh;
    width: 350px;
    background-color: ${theme.secondary};
    border-right: 1px solid burlywood;
    opacity: 1;
    z-index: 1;
    transition: 0.3s ease;

    ${"" /* transform: translate(${xPos}px); */}
    ${"" /* transform: ${isOpen ? translate(Xpx) : translate(Ypx)} */}

    @media screen and (max-width: 767px) {
      transform: translate(-350px);
    }
    @media screen and (min-width: 768px) {
      transform: translate(0px);
    }
  `;

  const SidebarToggle = styled.button`
    position: absolute;
    top: 25vh;
    height: 100px;
    border: 1px solid #373737;
    border-left: 0;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${theme.primary};
    outline: none;
    z-index: 1;
    transform: translate(350px);
  `;

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
    <SidebarContainer style={{ transform: `translate(${xPos}px)` }}>
      <SidebarToggle
        onClick={() => handleToggle()}
        aria-label="Toggle sidebar"
        style={{
          backgroundColor: theme.primary,
        }}
      />
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
