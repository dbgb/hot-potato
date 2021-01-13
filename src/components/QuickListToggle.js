import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { commonButtonStyling, commonOutlineStyling } from "../styles/common";
import { GoPlus, GoCheck } from "react-icons/go";

const QuickListToggleButton = styled.button`
  ${commonButtonStyling}

  &:focus {
    ${commonOutlineStyling}
  }
`;

const Checkmark = styled(GoCheck)`
  color: var(--color-highlight);
`;

export default function QuickListToggle({ inQuickList, onClick }) {
  return (
    <QuickListToggleButton onClick={onClick}>
      {inQuickList ? <Checkmark /> : <GoPlus />}
    </QuickListToggleButton>
  );
}

QuickListToggle.propTypes = {
  inQuickList: PropTypes.bool.isRequired,
};
