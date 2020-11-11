import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoints } from "../styles/breakpoints";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0px;
  min-height: 100%;
  width: ${(props) => `${props.width}px`};
  border-right: 1px solid var(--color-primary);
  background-color: var(--color-background);
  opacity: 1;
  z-index: 1;
  transition: var(--ease);

  @media screen and (max-width: ${breakpoints.xl}px) {
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
