import React, { Fragment, useState } from "react";
import "./Sidebar.css";

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
        className="sidebar"
        style={{
          minWidth: width,
          minHeight: height,
          transform: `translateX(${xPos}px)`,
        }}
      >
        <button
          className="sidebarToggle"
          aria-label="Toggle sidebar"
          onClick={() => handleToggle()}
          style={{ transform: `translate(${width}px, 25vh)` }}
        ></button>
        <div className="sidebarContent">{children}</div>
      </div>
    </Fragment>
  );
}
