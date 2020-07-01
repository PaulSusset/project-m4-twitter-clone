import React from "react";
import Spinner from "../Spinner";
import styled from "styled-components";

const Preload = () => {
  return (
    <SpinnerBox>
      <Spinner size={50} />
    </SpinnerBox>
  );
};

const SpinnerBox = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Preload;
