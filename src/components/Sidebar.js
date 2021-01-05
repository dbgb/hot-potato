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
  border-right: 1px dotted var(--color-text-main);
  background-color: var(--color-background);
  opacity: 1;
  z-index: 1;
  transition: var(--ease);

  width: ${(props) => `${props.width}rem`};
  @media screen and (min-width: calc(${breakpoints.xl}em + 10em)) {
    /* 
     * Extra wide sidebar for widescreen desktop layout
     */
    width: calc(${(props) => `${props.width}rem`} + 5rem);
  }

  @media screen and (max-width: ${breakpoints.xl}em) {
    /* 
     * Collapse sidebar on transition to smaller than xl layouts
     */
    transform: translate(${(props) => `-${props.width}rem`});
  }

  @media print {
    display: none;
  }
`;

const SidebarContent = styled.div`
  position: relative;
  top: var(--offset-content-top);
`;

const Sidebar = ({ width = 25, children }) => {
  return (
    <SidebarContainer width={width}>
      <SidebarContent>{children}</SidebarContent>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  width: PropTypes.number, // Sidebar width in rem
  children: PropTypes.node,
};

export default Sidebar;
