import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather";
import { format } from "date-fns";
import TweetLogos from "../TweetLogos";
import { COLORS } from "../../constants";

const Tweet = ({ id }) => {
  const tweetLogoArr = [
    { type: "messageCircle", color: "primary" },
    { type: "repeat", color: "green" },
    { type: "heart", color: "red" },
    { type: "share", color: "primary" }
  ];

  const [tweetInfo, setTweetInfo] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch(`/api/tweet/${id}`)
      .then(data => data.json())
      .then(data => {
        console.log(data["tweet"]);
        setTweetInfo(data["tweet"]);
        setLoaded(true);
      });
  }, []);
  return (
    <>
      {loaded ? (
        <TotalDiv to={`/tweet/${tweetInfo.id}`}>
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
            <div>
              <Avatar src={tweetInfo["author"]["avatarSrc"]} alt="avatar" />
            </div>
            <div>
              <Tweeter to={`/profile/${tweetInfo.author.handle}`}>
                <DisplayName>{tweetInfo["author"]["displayName"]}</DisplayName>
                <Handle>
                  @{tweetInfo.author.handle} •{" "}
                  <span>
                    {format(new Date(tweetInfo["sortedTimestamp"]), "MMM Do")}
                  </span>
                </Handle>
              </Tweeter>
              <div>{tweetInfo["status"]}</div>
              {tweetInfo["media"].length ? (
                <Media src={tweetInfo["media"][0]["url"]} alt="media" />
              ) : (
                ""
              )}
              <LogoBar>
                {tweetLogoArr.map((logo, i) => {
                  return (
                    <TweetLogos
                      color={logo.color}
                      type={logo.type}
                      id={i}
                      key={logo.type}
                    />
                  );
                })}
              </LogoBar>
            </div>
          </Actual>
        </TotalDiv>
      ) : (
        ""
      )}
    </>
  );
};

const TotalDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px lightgrey solid;
  padding-top: 6px;
  text-decoration: none;
  transition: ease 150ms;
  color: black;
  padding-right: 40px;
  &:hover {
    background: ${COLORS.fadedBg};
  }
`;
const Tweeter = styled(Link)`
  display: flex;
  align-items: center;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 10px;
  padding-top: 0;
`;
const DisplayName = styled.h3`
  font-size: 1.1rem;
  font-weight: 900;
  padding: 0px 10px 0px 0px;
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

export default Tweet;