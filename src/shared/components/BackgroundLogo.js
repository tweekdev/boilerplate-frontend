import React from 'react';
import { animated, useSpring } from 'react-spring';
import Logo from '../../assets/image/hero-bg.png';
import './BackgroudLogo.css';
const BackgroundLogo = (props) => {
  // Animation
  const BackgroundLogoSpring = useSpring({
    delay: 200,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={BackgroundLogoSpring}>
      <img className="styledImage" src={Logo} alt="Logo" />
    </animated.div>
  );
};

export default BackgroundLogo;
