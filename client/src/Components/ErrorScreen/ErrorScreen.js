import React from "react";
import { Icon } from "react-icons-kit";
import styled from "styled-components";
import { aperture } from "react-icons-kit/feather";

const ErrorScreen = () => {
  return (
    <BigBox>
      <Icon size={50} icon={aperture} />
      <h2>An unknown error has occurred.</h2>
      <p>
        Please try refreshing the page, or{" "}
        <a href={"//google.ca"}>contact support</a> if the problem persists
      </p>
    </BigBox>
  );
};

const BigBox = styled.div`
  margin-top: 15vh;
  display: flex;
  height: 40vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

export default ErrorScreen;
