import styled from "styled-components";

const DarkModeToggle = styled.button`
  border: none;
  outline: none;
  margin: 5px 0 0 5px;
  width: 3rem;
  height: 3rem;
  background-color: var(--color-primary);
  transition: var(--ease);

  > svg {
    min-width: 30px;
    min-height: 30px;
    fill: var(--color-secondary);
  }
`;

export default DarkModeToggle;
