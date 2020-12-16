import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: ${(props) => `${props.width}px`};
  border-right: 1px dotted var(--color-text-main);
  background-color: var(--color-background);
  opacity: 1;
  z-index: 1;
  transition: var(--ease);

  @media screen and (max-width: ${breakpoints.xl}em) {
    transform: translate(${(props) => `-${props.width}px`});
  }
  @media print {
    display: none;
  }
`;

const SidebarContent = styled.div`
  position: relative;
  top: var(--offset-content-top);
`;

const Sidebar = ({ width = 350, children }) => {
  return (
    <SidebarContainer width={width}>
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  width: PropTypes.number,
  children: PropTypes.node,
};

export default Sidebar;
