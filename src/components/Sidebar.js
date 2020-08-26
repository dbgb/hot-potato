import React, { Fragment, useState } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ width, height = "100vh", children }) {
  const [xPos, setXPos] = useState(-width);

  const handleToggle = () => {
    if (xPos < 0) {
      setXPos(0);
    } else {
      setXPos(-width);
    }
  };

  return (
    <Fragment>
      <div
        className={styles.sidebar}
        style={{
          minWidth: width,
          maxWidth: width,
          minHeight: height,
          transform: `translateX(${xPos}px)`,
        }}
      >
        <button
          onClick={() => handleToggle()}
          aria-label="Toggle sidebar"
          className={styles.sidebarToggle}
          style={{ transform: `translate(${width}px, 25vh)` }}
        ></button>
        <div className={styles.sidebarContent}>{children}</div>
      </div>
    </Fragment>
  );
}
