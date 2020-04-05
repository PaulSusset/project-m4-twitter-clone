import React from "react";
import { Icon } from "react-icons-kit";
import { loader } from "react-icons-kit/feather";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants";

const Spinner = ({ size }) => {
  return <Spinning size={size} icon={loader} />;
};
const spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const Spinning = styled(Icon)`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1000ms infinite;
  }
`;
const Box = styled.div`
  height: 24px;
  width: 24px;
`;

export default Spinner;
