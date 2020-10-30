import React, { useState, createContext } from "react";

// Required to prevent failure on Gatsby build
// ref: https://github.com/gatsbyjs/gatsby/issues/19255
const defaultState = {
  modalOpen: false,
  setModalOpen: () => {},
};

export const ModalContext = createContext(defaultState);

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
