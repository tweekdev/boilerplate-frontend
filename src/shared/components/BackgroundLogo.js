import React from 'react';
import { animated, useSpring } from 'react-spring';
import './BackgroudLogo.css';
const BackgroundLogo = (props) => {
  // Animation
  const BackgroundLogoSpring = useSpring({
    delay: 200,
    opacity: 1,
    from: { opacity: 0 },
  });

  return <animated.div style={BackgroundLogoSpring}>pds</animated.div>;
};

export default BackgroundLogo;
