import React, { useState, createContext } from "react";

// Required to prevent failure on Gatsby build
// ref: https://github.com/gatsbyjs/gatsby/issues/19255
const defaultState = {
  quickListOpen: false,
  setQuickListOpen: () => {},
};

export const QuickListContext = createContext(defaultState);

export const QuickListProvider = ({ children }) => {
  const [quickListOpen, setQuickListOpen] = useState(false);

  return (
    <QuickListContext.Provider value={{ quickListOpen, setQuickListOpen }}>
      {children}
    </QuickListContext.Provider>
  );
};
