import React from "react";
import { Link } from "gatsby";
import "./Navbar.css";

const Navbar = ({ locations }) => {
  const listItems = locations.map((to) => {
    return (
      <li
        key={to}
        style={{
          margin: "0 1rem 0 0",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to={to === "/" ? "/" : `/${to.toLowerCase()}/`}
        >
          {to === "/" ? "Home" : `${to}`}
        </Link>
      </li>
    );
  });

  return (
    <ul
      id="navbar"
      style={{
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        margin: 0,
      }}
    >
      {listItems}
    </ul>
  );
};

export default Navbar;
