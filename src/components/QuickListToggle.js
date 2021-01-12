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

export default function QuickListToggle({ inQuickList }) {
  return (
    <QuickListToggleButton>
      {inQuickList ? <GoCheck /> : <GoPlus />}
    </QuickListToggleButton>
  );
}

QuickListToggle.propTypes = {
  inQuickList: PropTypes.bool.isRequired,
};
