import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import { useHistory, Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { arrowLeft } from "react-icons-kit/feather/arrowLeft";

const TitleBar = () => {
  const { currentPage } = useContext(CurrentUserContext);
  useEffect(() => {});
  let history = useHistory();
  return (
    <TitleBox>
      {currentPage !== "Home" ? (
        <TitleLink to="" onClick={history.goBack}>
          <Icon icon={arrowLeft} size={26} style={{ marginRight: "5px" }} />{" "}
          {currentPage}
        </TitleLink>
      ) : (
        <Title>{currentPage}</Title>
      )}
    </TitleBox>
  );
};

const TitleLink = styled(Link)`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  height: 74px;
  width: 100%;
  max-width: 801px;
  margin-right: 20%;
  /* position: fixed; */
  /* top: 0; */
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: 900;
  border-bottom: 1px solid lightgrey;
  /* border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey; */
  padding: 21px;
  background: white;
  /* z-index: 3; */
`;
const Title = styled.div`
  box-sizing: border-box;
  height: 74px;
  width: 100%;
  /* max-width: 801px; */
  /* margin-right: 20%; */
  /* position: sticky; */
  /* top: 0; */
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: 900;
  border-bottom: 1px solid lightgrey;
  /* border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey; */
  padding: 22px;
  background: white;
  /* z-index: 2; */
`;
const TitleBox = styled.div`
  box-sizing: border-box;
  height: 74px;
  width: 100%;
  max-width: 801px;
  margin-right: 20%;
  position: sticky;
  float: left;
  top: 0;
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: 900;
  border-bottom: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  /* border-right: 1px solid lightgrey; */
  /* padding: 22px; */
  background: white;
  z-index: 3;
`;
export default TitleBar;
