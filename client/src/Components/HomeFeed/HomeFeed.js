import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import TextareaAutosize from "react-textarea-autosize";
import Tweet from "../Tweet";
import { COLORS } from "../../constants";
import Spinner from "../Spinner";
import Preload from "../Preload";
import ErrorScreen from "../ErrorScreen";

const HomeFeed = () => {
  const { status, setCurrentPage, currentUser, error, setError } = useContext(
    CurrentUserContext
  );
  const [tweetList, setTweetList] = useState([]);
  const [tweetSent, setTweetSent] = useState(false);
  setCurrentPage("Home");
  useEffect(() => {
    // setError(false);
    if (status === "idle") {
      fetch("/api/me/home-feed")
        .then((data) => data.json())
        .then((homeFeed) => {
          setTweetList(homeFeed["tweetIds"]);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, [status, tweetSent, error]);

  const charCount = (e) => {
    if (e.target.value.length < 280) {
      document.getElementById("countdown").innerText =
        280 - e.target.value.length;
    } else {
      document.getElementById("countdown").innerText = 0;
    }
  };
  const [tweetLoading, setTweetLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTweetLoading(true);
    const data = { status: e.target.meowContent.value };
    e.target.reset();
    fetch("/api/tweet", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setTweetSent(!tweetSent);
        setTweetLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <>
      {!error ? (
        <>
          {status === "idle" ? (
            <>
              <form onSubmit={handleSubmit}>
                <StyledForm>
                  <div>
                    <Avatar src={currentUser.profile.avatarSrc} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Meow
                      name={"meowContent"}
                      onChange={charCount}
                      maxLength={280}
                      placeholder={"What's happening?"}
                    ></Meow>
                    <MeowBottom>
                      <div id={"countdown"}>280</div>
                      <SendBtn name={"submitButton"} type={"submit"}>
                        {tweetLoading ? <Spinner size={18.8} /> : "Meow"}
                      </SendBtn>
                    </MeowBottom>
                  </div>
                </StyledForm>
              </form>
              <FeedBox>
                {tweetList.map((tweet) => {
                  return <Tweet key={tweet} id={tweet}></Tweet>;
                })}
              </FeedBox>
            </>
          ) : (
            <Preload />
          )}
        </>
      ) : (
        <ErrorScreen />
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
  /* padding-top: 0; */
`;

const StyledForm = styled.div`
  border-bottom: lightgrey 6px solid;
  display: flex;
  width: 100%;
`;

const Meow = styled(TextareaAutosize)`
  resize: none;
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  font-size: 1.3rem;
  font-family: inherit;
  border: none;
  min-height: 60px;
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
  box-sizing: border-box;
  width: 71px;
`;
const MeowBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  color: lightgrey;
`;
export default HomeFeed;
