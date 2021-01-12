import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { GoX, GoTrashcan, GoPin, GoDash } from "react-icons/go";
import { Link } from "gatsby";
import { commonButtonStyling, commonOutlineStyling } from "../styles/common";
import { breakpoints } from "../styles/breakpoints";
import { QuickListContext } from "./QuickListContext";

// --------------------------
// -- Styled Subcomponents --
// --------------------------
const QuickListContainer = styled.div`
  position: absolute;
  top: var(--offset-header-bottom);
  right: 0;
  z-index: 1;
  padding: 1rem;
  background-color: var(--color-secondary);
  transition: background-color var(--ease), box-shadow var(--ease),
    border var(--ease), color var(--ease);

  display: ${(props) => props.display};
  flex-direction: column;
  min-width: 20rem;
  max-width: 50rem;

  box-shadow: 0 1px 1px var(--color-primary);
  border-bottom: 5px double var(--color-primary);
  border-left: 3px double var(--color-primary);
  border-bottom-left-radius: 4rem;

  @media screen and (max-width: ${breakpoints.sm}em) {
    border-right: 3px double var(--color-primary);
    border-bottom-right-radius: 4rem;
  }
`;

const QuickListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--color-primary);
  transition: border var(--ease);
`;

const QuickListLink = styled(Link)`
  flex: 1;
  text-decoration: none;
  color: var(--color-text-main);
  transition: color var(--ease);
  margin-right: 2rem;

  &:focus {
    ${commonOutlineStyling}
  }
`;

const QuickListGroup = styled.div`
  display: grid;
  grid-gap: 0.1rem;
  grid-template-columns: max-content;
  justify-items: center;
  /* Prevent scrollbar overlapping text labels at edge of screen */
  margin-right: 0.5rem;
`;

const QuickListToolbar = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0.7rem 0;
`;

const QuickListLabel = styled.label`
  text-align: center;
  font-size: 0.8rem;
`;

const QuickListButtonStyling = css`
  font-size: 2rem;
  padding-top: 0.5rem;
  ${commonButtonStyling}

  &:focus {
    ${commonOutlineStyling}
    outline-offset: initial;
  }
`;

const QuickListButton = styled.button`
  ${QuickListButtonStyling}
`;

// --------------------
// -- Main Component --
// --------------------
function QuickList() {
  const { quickListOpen, setQuickListOpen } = useContext(QuickListContext);

  const handleClose = () => {
    setQuickListOpen(false);
  };

  const renderQuickListItems = () => {
    return (
      <>
        <QuickListItem>
          <QuickListLink to="/italian_aubergine-parmigiana/">
            La Parmigiana di Melanzane ('Aubergine Parmigiana')
          </QuickListLink>
          <QuickListGroup>
            <QuickListButton id="quicklist-remove-1">
              <GoDash />
            </QuickListButton>
            <QuickListLabel htmlFor="quicklist-remove-1">Remove</QuickListLabel>
          </QuickListGroup>
        </QuickListItem>
        <QuickListItem>
          <QuickListLink to="/biscuits_cookies-oatmeal/">
            Oatmeal Cookies
          </QuickListLink>
          <QuickListGroup>
            <QuickListButton id="quicklist-remove-2">
              <GoDash />
            </QuickListButton>
            <QuickListLabel htmlFor="quicklist-remove-2">Remove</QuickListLabel>
          </QuickListGroup>
        </QuickListItem>
        <QuickListItem>
          <QuickListLink to="/sweet_french-toast/">
            French Toast / Arme Ritter
          </QuickListLink>
          <QuickListGroup>
            <QuickListButton id="quicklist-remove-3">
              <GoDash />
            </QuickListButton>
            <QuickListLabel htmlFor="quicklist-remove-3">Remove</QuickListLabel>
          </QuickListGroup>
        </QuickListItem>
      </>
    );
  };

  return (
    <QuickListContainer display={quickListOpen ? "flex" : "none"}>
      {/* QuickList Items */}
      {renderQuickListItems()}
      {/* QuickList Toolbar */}
      <QuickListToolbar>
        <QuickListGroup>
          <QuickListButton id="quicklist-empty">
            <GoTrashcan />
          </QuickListButton>
          <QuickListLabel htmlFor="quicklist-empty">
            Empty Quicklist
          </QuickListLabel>
        </QuickListGroup>
        <QuickListGroup>
          <QuickListButton id="quicklist-pin">
            <GoPin />
          </QuickListButton>
          <QuickListLabel htmlFor="quicklist-pin">Pin Quicklist</QuickListLabel>
        </QuickListGroup>
        <QuickListGroup>
          <QuickListButton id="quicklist-close" onClick={handleClose}>
            <GoX />
          </QuickListButton>
          <QuickListLabel htmlFor="quicklist-close">
            Close Quicklist
          </QuickListLabel>
        </QuickListGroup>
      </QuickListToolbar>
    </QuickListContainer>
  );
}

QuickList.propTypes = {};

export default QuickList;
