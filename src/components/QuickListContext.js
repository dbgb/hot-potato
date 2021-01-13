import React, { useState, createContext, useEffect } from "react";

// Required to prevent failure on Gatsby build
// ref: https://github.com/gatsbyjs/gatsby/issues/19255
const defaultState = {
  quickListOpen: false,
  setQuickListOpen: () => {},
};

export const QuickListContext = createContext(defaultState);

export const QuickListProvider = ({ children }) => {
  const [quickListOpen, setQuickListOpen] = useState(false);
  const [quickItems, setQuickItems] = useState([]);

  useEffect(() => {
    /*
     * Persist quicklist items across mounts
     */
    const storedItems = window.localStorage.getItem("quick-items");

    if (storedItems) {
      setQuickItems(JSON.parse(storedItems));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fire once, on mount

  useEffect(() => {
    /*
     * Keep persistent quicklist items up to date
     */
    window.localStorage.setItem("quick-items", JSON.stringify(quickItems));

    // Guard against empty case
    if (quickItems.length === 0) {
      window.localStorage.removeItem("quick-items");
      return;
    }
  }, [quickItems]);

  return (
    <QuickListContext.Provider
      value={{ quickListOpen, setQuickListOpen, quickItems, setQuickItems }}
    >
      {children}
    </QuickListContext.Provider>
  );
};
