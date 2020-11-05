import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
import styled, { css } from "styled-components";
import Header from "./Header";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Search from "./Search";
import DarkModeToggle from "./DarkModeToggle";
import { MdSync, MdSearch, MdFormatListNumbered } from "react-icons/md";
import { ThemeContext } from "./ThemeContext";
import { ModalContext } from "./ModalContext";

const IconStyling = css`
  font-size: 2.5rem;
  margin-left: 1rem;
  color: var(--color-secondary);
`;

const SearchIcon = styled(MdSearch)`
  ${IconStyling};
  margin-left: 0;
`;

const QuickCycleIcon = styled(MdSync)`
  ${IconStyling};
`;

const QuickListIcon = styled(MdFormatListNumbered)`
  ${IconStyling};
`;

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
  }
`;

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Space") {
      openModal();
    }
  };

  return (
    <>
      <Header title={site.siteMetadata.title} showLogo>
        {!!colorScheme && (
          <ToolbarContainer>
            <SearchIcon
              tabIndex={0}
              onKeyDown={(event) => handleKeyDown(event)}
              onClick={openModal}
            />
            <Link to="/recipes">
              <QuickListIcon />
            </Link>
            <QuickCycleIcon />
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
