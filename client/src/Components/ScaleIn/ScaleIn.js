import React from "react";
import { useSpring, animated } from "react-spring";

const ScaleIn = ({ children }) => {
  const style = useSpring({
    position: "absolute",
    transform: "scale(1)",
    from: {
      transform: "scale(0)",
    },
    config: { tension: 170, friction: 9, velocity: 10 },
  });
  return <animated.div style={style}>{children}</animated.div>;
};

export default ScaleIn;
