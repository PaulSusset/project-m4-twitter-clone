import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import Tweet from "../Tweet";
import { COLORS } from "../../constants";

const HomeFeed = () => {
  const { status, setCurrentPage, currentUser } = useContext(
    CurrentUserContext
  );
  const [tweetList, setTweetList] = useState([]);
  setCurrentPage("Home");
  useEffect(() => {
    if (status === "idle") {
      fetch("/api/me/home-feed")
        .then(data => data.json())
        .then(homeFeed => {
          setTweetList(homeFeed["tweetIds"]);
        })
        .catch(err => console.log(err));
    }
  }, [status]);

  const charCount = e => {
    if (e.target.value.length < 280) {
      document.getElementById("countdown").innerText =
        279 - e.target.value.length;
    } else {
      document.getElementById("countdown").innerText = 0;
    }
  };
  return (
    <>
      {status === "idle" && (
        <>
          <form>
            <StyledForm>
              <div>
                <Avatar src={currentUser.profile.avatarSrc} />
              </div>
              <div style={{ width: "100%" }}>
                <Meow
                  onKeyPress={charCount}
                  maxLength={280}
                  placeholder={"What's happening?"}
                ></Meow>
                <MeowBottom>
                  <div id={"countdown"}>280</div>
                  <SendBtn>Meow</SendBtn>
                </MeowBottom>
              </div>
            </StyledForm>
          </form>
          <FeedBox>
            {tweetList.map(tweet => {
              return <Tweet key={tweet} id={tweet}></Tweet>;
            })}
          </FeedBox>
        </>
      )}
    </>
  );
};

const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 10px;
  padding-top: 0;
`;

const StyledForm = styled.div`
  border-bottom: lightgrey 6px solid;
  display: flex;
  width: 100%;
`;

const Meow = styled.textarea`
  resize: none;
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  min-height: 200px;
  /* flex-grow: 1 1 0; */
  font-size: 1.3rem;
  font-family: inherit;
  border: none;
  &:focus {
    outline: none;
  }
  &[placeholder]:focus {
    opacity: 0.5;
  }
`;

const SendBtn = styled.button`
  font-family: inherit;
  color: white;
  background: ${COLORS.primary};
  font-size: 1rem;
  padding: 10px;
  border-radius: 30px;
  margin: 15px;
`;
const MeowBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
export default HomeFeed;
