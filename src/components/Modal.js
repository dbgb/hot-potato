import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { ModalContext } from "./ModalContext";

const ModalContainer = styled.div`
  position: fixed;
  top: 66px;
  left: 0;
  padding: 0;
  margin: 0;
  display: ${(props) => props.display};
  height: 100%;
  width: 100%;
  background-color: var(--color-background);
  z-index: 999;
`;

const ModalClose = styled(MdClose)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  font-size: 2rem;
  color: var(--color-text-main);
  transition: var(--ease);
`;

const ModalContent = styled.div`
  margin-top: 3.5rem;
`;

const Modal = ({ children }) => {
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Space") {
      closeModal();
    }
  };

  return (
    <ModalContainer display={modalOpen ? "block" : "none"}>
      <ModalClose
        tabIndex={0}
        onKeyDown={(event) => handleKeyPress(event)}
        onClick={closeModal}
      />
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
