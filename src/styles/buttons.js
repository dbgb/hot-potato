import { css } from "styled-components";

export const commonFocusStyling = css`
  &:focus {
    outline-offset: 1px;
    outline: 3px dotted var(--color-text-main);
  }
`;

export const commonButtonStyling = css`
  border: none;
  background: none;
  color: var(--color-text-main);
  transition: color var(--ease);
  cursor: pointer;
  ${commonFocusStyling}
`;
