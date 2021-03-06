import { css } from "styled-components";

export const commonOutlineStyling = css`
  outline-offset: 1px;
  outline: 3px dotted var(--color-text-main);
`;

export const commonButtonStyling = css`
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text-main);
  transition: color var(--ease);
`;
