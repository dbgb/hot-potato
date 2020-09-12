import { keyframes } from "styled-components";

export const upRock = keyframes`
  0%, 100% {
    transform: rotate(-4deg);
  }
  30% {
    transform: scale(.99);
  }
  50% {
    transform: rotate(-2deg);
  }
  80% {
    transform: scale(.99);
  }
`;

export const speedInLeft = keyframes`
  from {
    transform: translate3d(-80%, 0, 0);
    opacity: 0;
  }
  60% {
    transform: skewX(-10deg);
    opacity: 1;
  }
  80% {
    transform: skewX(5deg);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;
