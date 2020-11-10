import { css } from "styled-components";

export const commonButtonStyling = css`
  border: none;
  background: none;
  color: var(--color-text-main);
  transition: color var(--ease);

  &:focus {
    outline-offset: 1px;
    outline: 3px dotted var(--color-text-main);
  }
`;
