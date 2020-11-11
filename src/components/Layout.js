import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled, { css } from "styled-components";
import { commonButtonStyling } from "../styles/buttons";
import { MdSwapVert, MdSearch, MdFormatListNumbered } from "react-icons/md";
import Header from "./Header";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import DarkModeToggle from "./DarkModeToggle";
import { ThemeContext } from "./ThemeContext";
import { ModalContext } from "./ModalContext";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;

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

  a {
    display: flex;
  }
`;

const ToolbarButton = styled.button`
  display: flex;
  font-size: 2.5rem;
  margin-left: 1rem;
  padding: 0;
  ${commonButtonStyling}
`;

const ToolbarLink = styled(Link)`
  display: flex;
  font-size: 2.5rem;
  margin-left: 1rem;
  ${commonButtonStyling}
`;

const ToolbarIconStyling = css`
  color: var(--color-secondary);
`;

const SearchIcon = styled(MdSearch)`
  ${ToolbarIconStyling};
`;

const QuickCycleIcon = styled(MdSwapVert)`
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
  const { colorScheme } = useContext(ThemeContext);
  const { setModalOpen } = useContext(ModalContext);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Header title={site.siteMetadata.title} showLogo>
        {!!colorScheme && (
          <ToolbarContainer>
            <ToolbarButton
              title="Open recipe search"
              aria-label="Open recipe search"
              onClick={openModal}
            >
              <SearchIcon />
            </ToolbarButton>
            <ToolbarLink
              title="Open recipe quicklist"
              aria-label="Open recipe quicklist"
              to="/recipes"
            >
              <QuickListIcon />
            </ToolbarLink>
            <ToolbarButton
              title="Cycle quicklist recipes"
              aria-label="Cycle quicklist recipes"
            >
              <QuickCycleIcon />
            </ToolbarButton>
            <DarkModeToggle />
          </ToolbarContainer>
        )}
      </Header>
      <LayoutContainer>
        <Modal>
          <Search />
        </Modal>
        <Sidebar>
          <Header title={site.siteMetadata.title} spaceOnly />
          <Search />
        </Sidebar>
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
