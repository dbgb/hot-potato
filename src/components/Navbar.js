import React from "react";
import { Link } from "gatsby";

export const Navbar = ({ locations }) => {
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
          to={to === "/" ? "/" : `/${to}`}
        >
          {to === "/" ? "home" : `${to}`}
        </Link>
      </li>
    );
  });

  return (
    <ul
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
