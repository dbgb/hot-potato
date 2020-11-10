import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { commonButtonStyling } from "../styles/buttons";
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

const ModalClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  padding-top: 0.5rem;
  margin: 0.5rem;
  ${commonButtonStyling};
`;

const ModalContent = styled.div`
  margin-top: 3.5rem;
`;

const Modal = ({ children }) => {
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContainer display={modalOpen ? "block" : "none"}>
      <ModalClose
        tabIndex={0}
        title="Close search modal"
        aria-label="Close search modal"
        onClick={closeModal}
      >
        <MdClose />
      </ModalClose>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
