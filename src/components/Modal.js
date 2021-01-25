import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { commonButtonStyling, commonOutlineStyling } from "../styles/common";
import { MdClose } from "react-icons/md";
import { ModalContext } from "./ModalContext";
import { breakpoints } from "../styles/breakpoints";

const ModalContainer = styled.div`
  position: fixed;
  top: var(--header-offset-bottom);
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0;
  margin: 0;
  display: ${(props) => props.display};
  background-color: var(--color-background);
  z-index: 999;

  @media screen and (min-width: calc(${breakpoints.md}em)) {
    padding: 0 10rem;
  }

  @media screen and (min-width: calc(${breakpoints.lg}em)) {
    padding: 0 20rem;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  padding-top: 0.5rem;
  margin: 0.5rem;
  ${commonButtonStyling};

  &:focus {
    ${commonOutlineStyling}
  }
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
        title="Close recipe search"
        aria-label="Close recipe search"
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
