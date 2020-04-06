import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { COLORS } from "../../constants";
import Tweet from "../Tweet";
import { Icon } from "react-icons-kit";
import { calendar, mapPin } from "react-icons-kit/feather";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import Preload from "../Preload";
import ErrorScreen from "../ErrorScreen";

const Profile = () => {
  window.scrollTo(0, 0);
  const { setCurrentPage, currentPage, error, setError } = useContext(
    CurrentUserContext
  );
  const { profileId } = useParams();
  const [profile, setProfile] = useState();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [tab, setTab] = useState("tweets");
  const [tweetList, setTweetList] = useState([]);
  useEffect(() => {
    setError(false);
    fetch(`/api/${profileId}/profile`)
      .then((data) => data.json())
      .then((data) => {
        setProfile(data.profile);
      })
      .then(() => {
        setProfileLoaded(true);
        setCurrentPage(`Profile`);
        return;
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    fetch(`/api/${profileId}/feed`)
      .then((data) => data.json())
      .then((data) => {
        setTweetList(data["tweetIds"]);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [profileId, currentPage]);

  const currentTabStyle = {
    color: `${COLORS.primary}`,
    borderBottom: `${COLORS.primary} solid 2px`,
  };

  return (
    <>
      {!error ? (
        <>
          {profileLoaded ? (
            <>
              <div style={{ position: "relative" }}>
                <Banner src={profile.bannerSrc} />
                <Avatar src={profile.avatarSrc} />
              </div>
              <FollowDiv>
                {profile.isBeingFollowedByYou ? (
                  <UnFollowBtn
                    onMouseEnter={(e) => (e.target.innerText = "Unfollow")}
                    onMouseLeave={(e) => (e.target.innerText = "Following")}
                  >
                    Following
                  </UnFollowBtn>
                ) : (
                  <FollowBtn>Follow</FollowBtn>
                )}
              </FollowDiv>
              <InfoBox>
                <div>
                  <DisplayName>{profile.displayName}</DisplayName>
                  <HandleBox>
                    <Handle>@{profile.handle}</Handle>
                    {profile.isFollowingYou && (
                      <FollowsYou>Follows you</FollowsYou>
                    )}
                  </HandleBox>
                </div>
                <div>{profile.bio}</div>
                <HandleBox>
                  <Details>
                    <TopRow>
                      <Icon icon={mapPin} style={{ paddingRight: "4px" }} />
                      {profile.location}
                    </TopRow>
                    <div>
                      <Num>{profile.numFollowing}</Num> Following
                    </div>
                  </Details>
                  <Details>
                    <TopRow>
                      <Icon icon={calendar} style={{ paddingRight: "4px" }} />
                      Joined {format(new Date(profile.joined), "MMMM yyyy")}
                    </TopRow>
                    <div>
                      <Num>{profile.numFollowers}</Num> Followers
                    </div>
                  </Details>
                </HandleBox>
              </InfoBox>
              <TabBox>
                <Tab
                  id={"tweets"}
                  // onClick={changeTab}
                  onClick={() => setTab("tweets")}
                  style={tab === "tweets" ? currentTabStyle : {}}
                >
                  Tweets
                </Tab>
                <Tab
                  id={"media"}
                  // onClick={changeTab}
                  onClick={() => setTab("media")}
                  style={tab === "media" ? currentTabStyle : {}}
                >
                  Media
                </Tab>
                <Tab
                  id={"likes"}
                  // onClick={changeTab}
                  onClick={() => setTab("likes")}
                  style={tab === "likes" ? currentTabStyle : {}}
                >
                  Likes
                </Tab>
              </TabBox>
              <FeedBox>
                {tab === "tweets" &&
                  tweetList.map((tweet) => {
                    return <Tweet key={tweet} id={tweet}></Tweet>;
                  })}
                {tab !== "tweets" && <div>Oops! Not yet developped</div>}
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

const Banner = styled.img`
  width: 100%;
  height: auto;
`;
const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px white solid;
  position: absolute;
  bottom: -77px;
  left: 20px;
`;
const FollowDiv = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px;
  box-sizing: border-box;
`;
const UnFollowBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100px;
  width: 133px;
  font-size: 1.2rem;
  font-weight: 900;
  color: white;
  background: ${COLORS.primary};
  padding: 10px 20px;
  border-radius: 30px;
  font-family: inherit;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    color: white;
    background: ${COLORS.red};
  }
`;
const FollowBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100px;
  font-size: 1.2rem;
  font-weight: 900;
  color: ${COLORS.primary};
  border: ${COLORS.primary} solid 1px;
  background: white;
  padding: 10px 20px;
  border-radius: 30px;
  font-family: inherit;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    color: white;
    background: ${COLORS.primary};
  }
`;
const DisplayName = styled.h3`
  font-size: 1.1rem;
  font-weight: 900;
  padding: 0px 10px 0px 0px;
  margin: 0;
`;
const Handle = styled.h4`
  font-size: 0.8rem;
  margin: 0;
`;
const HandleBox = styled.div`
  display: flex;
  color: gray;
`;
const FollowsYou = styled.div`
  background: ${COLORS.primaryBg};
  padding: 3px;
  border-radius: 4px;
  font-size: 0.6rem;
  color: grey;
  margin-left: 5px;
`;
const InfoBox = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
`;
const Num = styled.span`
  color: black;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 0;
`;
const TopRow = styled.div`
  padding-bottom: 10px;
`;
const TabBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  border-bottom: 1px solid lightgrey;
`;
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  padding: 15px 0;
  margin-top: 10px;
  transition: 100ms;
  cursor: pointer;
  &:hover {
    border-bottom: ${COLORS.primary} solid 2px;
    background-image: linear-gradient(white, ${COLORS.primaryBg});
    color: ${COLORS.primary};
  }
`;
const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Profile;
