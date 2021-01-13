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
  padding: 0.5rem 1.5rem;
  background-color: var(--color-secondary);
  transition: background-color var(--ease), box-shadow var(--ease),
    border var(--ease), color var(--ease);

  display: ${(props) => props.display};
  flex-direction: column;
  max-width: 50rem;

  box-shadow: 0 1px 1px var(--color-primary);
  border-bottom: 5px double var(--color-primary);
  border-left: 3px double var(--color-primary);
  border-bottom-left-radius: 4rem;

  @media screen and (max-width: ${breakpoints.sm}em) {
    border-right: 3px double var(--color-primary);
    border-bottom-right-radius: 4rem;
    left: 0;
  }
`;

const QuickListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
  padding: 0 0.5rem;
`;

const QuickListToolbar = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.7rem;
  margin-top: ${(props) => (props.quickListEmpty ? "initial" : "0.7rem")};
`;

const QuickListLabel = styled.label`
  text-align: center;
  font-size: 0.8rem;
`;

const QuickListButtonStyling = css`
  font-size: 1.6rem;
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
  const {
    quickListOpen,
    setQuickListOpen,
    quickItems,
    setQuickItems,
  } = useContext(QuickListContext);

  const handleClose = () => {
    setQuickListOpen(false);
  };

  const handleRemove = (key, title, slug) => {
    // localStorage key updates/removal handled in QuickListContext
    const newItem = {
      key: key,
      title: title,
      slug: slug,
    };

    setQuickItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.title !== newItem.title);

      return [...newItems];
    });
  };

  const handleEmpty = () => {
    setQuickItems([]);
  };

  const renderQuickListItems = () => {
    return quickItems.map(({ key, title, slug }) => {
      const removeButtonId = `quicklist-remove-${key.substr(0, 8)}`;

      return (
        <QuickListItem key={key}>
          <QuickListLink to={slug}>{title}</QuickListLink>
          <QuickListGroup>
            <QuickListButton
              id={removeButtonId}
              onClick={() => handleRemove(key, title, slug)}
            >
              <GoDash />
            </QuickListButton>
            <QuickListLabel htmlFor={removeButtonId}>Remove</QuickListLabel>
          </QuickListGroup>
        </QuickListItem>
      );
    });
  };

  return (
    <QuickListContainer display={quickListOpen ? "flex" : "none"}>
      {/* QuickList Items */}
      {renderQuickListItems()}
      {/* QuickList Toolbar */}
      <QuickListToolbar quickListEmpty={!quickItems.length}>
        <QuickListGroup>
          <QuickListButton id="quicklist-empty" onClick={handleEmpty}>
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
