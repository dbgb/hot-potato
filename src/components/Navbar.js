import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "gatsby";
import styled from "styled-components";

const NavList = styled.ul`
  font-family: Caveat, serif;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0 1rem 0 0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--color-text-header);
`;

const Navbar = ({ locations }) => {
  const listItems = locations.map((to) => {
    return (
      <NavItem key={to}>
        <NavLink to={to === "/" ? "/" : `/${to.toLowerCase()}/`}>
          {to === "/" ? "Home" : `${to}`}
        </NavLink>
      </NavItem>
    );
  });

  return <NavList>{listItems}</NavList>;
};

Navbar.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default Navbar;
