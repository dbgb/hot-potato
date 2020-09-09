import React, { Fragment, useState, useContext } from "react";
import styles from "./Sidebar.module.css";
import { ThemeContext } from "../styles/ThemeContext";

export default function Sidebar({
  width = 350,
  // isOpen, TODO: use React context instead of local/passed state
  children,
}) {
  const theme = useContext(ThemeContext);

  // const [xPos, setXPos] = useState(-width); // closed by default (mobile friendly)
  // const [isOpen, setIsOpen] = useState(xPos === 0); // true if sidebar open

  // First paint: SSR friendly CSS media query sets sidebar position based on screen width
  // After hydration: once set, `isOpen` state dictates sidebar position
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
    <Fragment>
      <div
        className={styles.sidebar}
        // className={`${styles.sidebar} ${isOpen ? styles.show : styles.hide}`}
        style={{
          transform: `translateX(${xPos}px)`,
          backgroundColor: theme.secondary,
        }}
      >
        <button
          onClick={() => handleToggle()}
          aria-label="Toggle sidebar"
          className={styles.sidebarToggle}
          style={{
            backgroundColor: theme.primary,
          }}
        ></button>
        <div className={styles.sidebarContent}>{children}</div>
      </div>
    </Fragment>
  );
}
