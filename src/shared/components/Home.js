import React from 'react';
import { Link } from 'react-router-dom';
import { config, useSpring } from 'react-spring';
import BackgroundLogo from './BackgroundLogo';
import './Home.css';
import WordsFading from './Home/wordsFading';
import Separator from './UIElements/Separator';

const Home = () => {
  // Title animation
  const TitleSpring = useSpring({
    config: config.wobbly,
    delay: 200,
    opacity: 1,
    transform: 'translateX(0px)',
    from: { opacity: 0, transform: 'translateX(40px)' },
  });

  // Sub title animation
  const SubTitleSpring = useSpring({
    config: config.stiff,
    delay: 300,
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(40px)' },
  });

  return (
    <div className="main">
      <div className="backgroundImage">
        <BackgroundLogo></BackgroundLogo>
      </div>
      <div className="container">
        <div className="smallWrapper">
          <h2 className="title" style={TitleSpring}>
            Bienvenue sur
            <br />
            <span>TweekTabs</span>
          </h2>
          <Separator></Separator>
          <h2 className="subTitle" style={SubTitleSpring}>
            Un <WordsFading></WordsFading>site qui te permet
            <br></br>
            de trouver et partager des tablatures !
          </h2>
          <Link to={'/signup'}>
            <button className="button">Inscrit-toi</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
