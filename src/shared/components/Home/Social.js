import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { config, useSpring } from 'react-spring';
import './Social.css';

// Sub title animation

const Social = () => {
  const SubTitleSpring = useSpring({
    config: config.stiff,
    delay: 300,
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(40px)' },
  });

  return (
    <>
      <p className="subtitle" style={SubTitleSpring}>
        Contact me
      </p>
      <a className="email" href={`mailto:tja.theau54@gmail.com`}>
        tja.theau54@gmail.com
      </a>
      <div className="socialWrapper">
        <a
          className="styleLink"
          target="_blank"
          aria-label="Github"
          rel="noopener noreferrer"
          href={`https://github.com/tweekdev`}
        >
          <FaGithub className="styledLink" />
        </a>
        <a
          className="styleLink"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Linkedin"
          href={`https://www.linkedin.com/in/théau-antoine/`}
        >
          <FaLinkedinIn className="styledLink" />
        </a>
        <a
          className="styleLink"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Instagram"
          href={`https://www.instagram.com/theauuuu_antoine/`}
        >
          <FaInstagram className="styledLink" />
        </a>
      </div>
    </>
  );
};

export default Social;
