import React from "react";
import styled, { css } from "styled-components";

import { Icon } from "react-icons-kit";
import { messageCircle, repeat, heart, share } from "react-icons-kit/feather";
import { COLORS } from "../../constants";

// let bg = undefined;
// let baseColor = undefined;

const TweetLogos = ({ type, color, id }) => {
  const iconArr = [messageCircle, repeat, heart, share];
  // baseColor = color;
  let bg = `${color}Bg`;
  let hoverStyle = {};
  const hoverStyling = () => {
    hoverStyle = { color: COLORS[color], background: COLORS[bg] };
  };

  return (
    <StyledIcon
      color={color}
      bg={bg}
      size={20}
      icon={iconArr[id]}
      onMouseEnter={hoverStyling}
      style={hoverStyle}
    />
  );
};

const StyledIcon = styled(Icon)`
  padding: 8px;
  border-radius: 50%;
  transition: 100ms;

  &:hover {
    color: ${props => COLORS[props.color]};
    background: ${props => COLORS[props.bg]};
  }
`;
//

export default TweetLogos;
