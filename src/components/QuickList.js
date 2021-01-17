import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { GoX, GoTrashcan, GoDash, GoInfo } from "react-icons/go";
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
  min-width: 20rem;
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

const quickListElementOpacity = 0.4;

const QuickListInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: var(--color-text-main);
  transition: color var(--ease);
  opacity: ${quickListElementOpacity};

  > svg {
    margin: 0.5rem;
    width: 5rem;
    height: 5rem;
  }
`;

const QuickListInfoMsg = styled.span`
  font-family: "Roboto Mono", "Consolas", "Courier New", Courier, monospace;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const QuickListInfoMsgSmall = styled(QuickListInfoMsg)`
  font-size: 0.8rem;
  max-width: 15rem;
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
  opacity: ${(props) => props.$disabled && `${quickListElementOpacity}`};

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

  &:disabled {
    outline: none;
  }
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

  const handleCloseOnClick = () => {
    window.innerWidth <= 1000 && setQuickListOpen(false);
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
    if (!quickItems.length) {
      return (
        <QuickListInfo>
          <QuickListInfoMsg>Quicklist is empty!</QuickListInfoMsg>
          <GoInfo />
          <QuickListInfoMsgSmall>
            Recipes can be added to the Quicklist from instant search results
          </QuickListInfoMsgSmall>
        </QuickListInfo>
      );
    }

    return quickItems.map(({ key, title, slug }) => {
      const removeButtonId = `quicklist-remove-${key.substr(0, 8)}`;

      return (
        <QuickListItem key={key}>
          <QuickListLink to={slug} onClick={handleCloseOnClick}>
            {title}
          </QuickListLink>
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
        {/* QuickList: Empty */}
        <QuickListGroup $disabled={!quickItems.length}>
          <QuickListButton
            disabled={!quickItems.length}
            aria-disabled={!quickItems.length}
            id="quicklist-empty"
            onClick={handleEmpty}
          >
            <GoTrashcan />
          </QuickListButton>
          <QuickListLabel htmlFor="quicklist-empty">
            Empty Quicklist
          </QuickListLabel>
        </QuickListGroup>
        {/* QuickList: Close */}
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
