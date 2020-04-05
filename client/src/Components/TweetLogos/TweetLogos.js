import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { iosHeartOutline } from "react-icons-kit/ionicons/iosHeartOutline";
import { basic_heart } from "react-icons-kit/linea/basic_heart";
import { heartO, heart } from "react-icons-kit/fa";
import { Icon } from "react-icons-kit";
import { messageCircle, repeat, share } from "react-icons-kit/feather";
import { COLORS } from "../../constants";
import ScaleIn from "../ScaleIn";

const TweetLogos = ({
  type,
  color,
  id,
  setIsLiked,
  isLiked,
  isRetweeted,
  setIsRetweeted,
  tweetId,
}) => {
  // console.log(type, id, isRetweeted);
  const iconArr = [messageCircle, repeat, heartO, share];
  const [isLoaded, setIsLoaded] = useState(false);
  let bg = `${color}Bg`;
  let highlight = "";
  if (id === 1) {
    highlight = isRetweeted;
  }
  if (id === 2) {
    highlight = isLiked;
  } else {
    highlight = false;
  }
  useEffect(() => {
    setIsLoaded(true);
  });
  // const [loaded, setLoaded] = useState(false);
  const handleLike = (e) => {
    e.preventDefault();
    switch (type) {
      case "like": {
        fetch(`/api/tweet/${tweetId}/like`, {
          method: "PUT",
          body: JSON.stringify({ like: !isLiked }),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((data) => data.json())
          .then((data) => console.log(data));
        setIsLiked(!isLiked);
        break;
      }
      case "retweet": {
        fetch(`/api/tweet/${tweetId}/retweet`, {
          method: "PUT",
          body: JSON.stringify({ retweet: !isRetweeted }),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((data) => data.json())
          .then((data) => console.log(data));
        setIsRetweeted(!isRetweeted);
        break;
      }
      default: {
        console.log("default");
      }
    }
  };

  return (
    <>
      {isLoaded ? (
        <StyledA onClick={handleLike} tabIndex="0" color={color}>
          <StyledIcon
            color={color}
            bg={bg}
            size={20}
            icon={iconArr[id]}
            style={highlight ? { color: `${COLORS[color]}`, zIndex: "0" } : {}}
          ></StyledIcon>
          {isLiked && id === 2 && (
            <ScaleIn>
              <StyledHeart bg={bg} icon={heart} size={20} />
            </ScaleIn>
          )}
        </StyledA>
      ) : (
        ""
      )}
    </>
  );
};

const StyledIcon = styled(Icon)`
  padding: 8px;
  border-radius: 50%;
  transition: 100ms;
  z-index: 2;
  background: inherit;
  &:hover {
    color: ${(props) => COLORS[props.color]};
    background: ${(props) => COLORS[props.bg]};
  }
`;
const StyledA = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: black;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background: inherit;
  position: relative;
  &:focus {
    outline: none;
    box-shadow: ${(props) => COLORS[props.color]} 0 0 3pt 2pt;
  }
`;
const StyledHeart = styled(Icon)`
  color: ${COLORS.red};
  padding: 8px;
  border-radius: 50%;
  transition: 100ms;
  &:hover {
    background: ${(props) => COLORS[props.bg]};
  }

  /* position: absolute; */
`;

export default TweetLogos;
