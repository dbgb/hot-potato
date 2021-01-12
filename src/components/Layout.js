import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled, { css } from "styled-components";
import { commonButtonStyling, commonOutlineStyling } from "../styles/common";
import { breakpoints } from "../styles/breakpoints";
import { MdSearch, MdFormatListNumbered } from "react-icons/md";
import Header from "./Header";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import QuickList from "./QuickList";
import DarkModeToggle from "./DarkModeToggle";
import { ModalContext } from "./ModalContext";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--color-secondary);
  transition: background-color var(--ease);

  main {
    position: relative;
    top: var(--offset-content-top);
    width: var(--max-width-main);
    margin: 0 auto;
    padding: 0 0.5rem;

    @media print {
      top: 0;
      margin: 1rem;
    }
  }
`;

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  a {
    display: flex;
  }
`;

const ToolbarButton = styled.button`
  display: flex;
  font-size: 2.5rem;
  margin-left: 1rem;
  padding: 0;
  ${commonButtonStyling};

  &:focus {
    ${commonOutlineStyling}
  }
`;

const SearchButton = styled(ToolbarButton)`
  @media screen and (min-width: calc(${breakpoints.xl}em + 0.0625em)) {
    /*
     * As of 01/2021, Chrome does not play well with mixed unit media queries in
     * Styled Components - hence using .0625em == 1px
     */
    display: none;
  }
`;

const ToolbarIconStyling = css`
  color: var(--color-text-header);
  transition: color var(--ease);
`;

const SearchIcon = styled(MdSearch)`
  ${ToolbarIconStyling};
`;

const QuickListIcon = styled(MdFormatListNumbered)`
  ${ToolbarIconStyling};
`;

const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const openModal = () => {
    setModalOpen(true);
  };

  const openQuickList = () => {
    console.log("Open QuickList");
  };

  const renderSearchOption = () => {
    if (modalOpen) {
      return (
        <Modal>
          <Search />
        </Modal>
      );
    } else {
      return (
        <Sidebar>
          <Header title={site.siteMetadata.title} spaceOnly />
          <Search />
        </Sidebar>
      );
    }
  };

  return (
    <>
      <Header title={site.siteMetadata.title}>
        <ToolbarContainer>
          <SearchButton
            title="Open recipe search"
            aria-label="Open recipe search"
            onClick={openModal}
          >
            <SearchIcon />
          </SearchButton>
          <ToolbarButton
            title="Open recipe quicklist"
            aria-label="Open recipe quicklist"
            onClick={openQuickList}
          >
            <QuickListIcon />
          </ToolbarButton>
          <DarkModeToggle />
        </ToolbarContainer>
        <QuickList />
      </Header>
      <LayoutContainer>
        {renderSearchOption()}
        <main>{children}</main>
      </LayoutContainer>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
