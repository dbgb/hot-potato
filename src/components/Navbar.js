import React from "react";
import { Link } from "gatsby";
import styles from "./Navbar.module.css";

const Navbar = ({ locations }) => {
  const listItems = locations.map((to) => {
    return (
      <li className={styles.navbarItem} key={to}>
        <Link
          className={styles.navBarItemLink}
          to={to === "/" ? "/" : `/${to.toLowerCase()}/`}
        >
          {to === "/" ? "Home" : `${to}`}
        </Link>
      </li>
    );
  });

  return <ul className={styles.navbar}>{listItems}</ul>;
};

export default Navbar;
