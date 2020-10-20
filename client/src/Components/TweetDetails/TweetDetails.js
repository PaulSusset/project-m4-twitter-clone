import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather";
import { format } from "date-fns";
import TweetLogos from "../TweetLogos";
import { COLORS } from "../../constants";
import Preload from "../Preload";
import ErrorScreen from "../ErrorScreen";

const TweetDetails = () => {
  const tweetLogoArr = [
    { type: "messageCircle", color: "primary" },
    { type: "retweet", color: "green" },
    { type: "like", color: "red" },
    { type: "share", color: "primary" },
  ];
  const [isLiked, setIsLiked] = useState("");
  const [isRetweeted, setIsRetweeted] = useState("");
  const { setCurrentPage, error, setError } = useContext(CurrentUserContext);
  const { tweetId } = useParams();
  const [tweetInfo, setTweetInfo] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setError(false);
    fetch(`/api/tweet/${tweetId}`)
      .then((data) => data.json())
      .then((data) => setTweetInfo(data.tweet))
      .then(() => {
        // setIsLiked(tweetInfo.isLiked);
        setInfoLoaded(true);
        setCurrentPage("Thread");
        console.log(tweetInfo);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [isLiked, isRetweeted]);

  useEffect(() => {
    if (tweetInfo !== null && tweetInfo !== {}) {
      setIsLiked(tweetInfo.isLiked);
      setIsRetweeted(tweetInfo.isRetweeted);
    }
    // setInfoLoaded(true);
  }, [tweetInfo]);
  return (
    <>
      {!error ? (
        <>
          {infoLoaded ? (
            <TotalDiv>
              {tweetInfo["retweetFrom"] && (
                <Retweet to={`/profile/${tweetInfo.retweetFrom.handle}`}>
                  {tweetInfo.retweetFrom.displayName} Remeowed
                  <Icon
                    style={{ position: "absolute", left: "-16px", top: "-1px" }}
                    size={10}
                    icon={repeat}
                  />
                </Retweet>
              )}
              <Actual>
                <IDBox>
                  <Avatar src={tweetInfo["author"]["avatarSrc"]} alt="avatar" />
                  <Tweeter to={`/profile/${tweetInfo.author.handle}`}>
                    <DisplayName>
                      {tweetInfo["author"]["displayName"]}
                    </DisplayName>
                    <Handle>@{tweetInfo.author.handle}</Handle>
                  </Tweeter>
                </IDBox>
                <div>
                  <Status>{tweetInfo["status"]}</Status>
                  {tweetInfo["media"].length ? (
                    <Media src={tweetInfo["media"][0]["url"]} alt="media" />
                  ) : (
                    ""
                  )}
                  <StyledDate>
                    {format(
                      new Date(tweetInfo["sortedTimestamp"]),
                      "K:mm a • MMM  do y"
                    )}{" "}
                    • Critter web app
                  </StyledDate>
                  <StyledDate>
                    <Bold>{tweetInfo.numRetweets}</Bold> Retweets •{" "}
                    <Bold>{tweetInfo.numLikes}</Bold> Likes
                  </StyledDate>
                  <LogoBar>
                    {tweetLogoArr.map((logo, i) => {
                      console.log(tweetInfo);
                      return (
                        <TweetLogos
                          color={logo.color}
                          type={logo.type}
                          id={i}
                          key={logo.type}
                          setIsLiked={setIsLiked}
                          isLiked={isLiked}
                          isRetweeted={isRetweeted}
                          setIsRetweeted={setIsRetweeted}
                          tweetId={tweetId}
                        />
                      );
                    })}
                  </LogoBar>
                </div>
              </Actual>
            </TotalDiv>
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

const TotalDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px lightgrey solid;
  padding: 6px 20px;
  text-decoration: none;
  transition: ease 150ms;
  color: black;
  /* padding-right: 40px; */
  &:hover {
    background: ${COLORS.fadedBg};
  }
`;
const Tweeter = styled(Link)`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding-bottom: 5px;
  color: black;
  text-decoration: none;
  &:hover > h3 {
    text-decoration: underline;
  }
`;
const Media = styled.img`
  height: auto;
  width: 100%;
  padding-top: 6px;
  border-radius: 20px;
`;
const Actual = styled.div`
  display: flex;
  flex-direction: column;
`;
const Retweet = styled(Link)`
  color: gray;
  font-size: 0.5rem;
  margin-left: 60px;
  position: relative;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0 10px 10px 0;
`;
const DisplayName = styled.h3`
  font-size: 1.1rem;
  font-weight: 900;
  padding: 0px 0px 2px 0px;
  margin: 0;
`;
const Handle = styled.h4`
  color: gray;
  font-size: 0.8rem;
  margin: 0;
`;
const LogoBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;
const IDBox = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.div`
  font-size: 1.8rem;
  padding: 10px 0;
`;
const StyledDate = styled.div`
  color: grey;
  padding: 15px 0;
  border-bottom: 1px solid lightgrey;
`;
const Bold = styled.span`
  color: black;
  font-weight: 900;
`;
export default TweetDetails;
