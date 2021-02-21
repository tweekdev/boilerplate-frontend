import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context';
import Separator from '../..//UIElements/Separator';
import BackgroundLogo from '../../BackgroundLogo';
import WordsFading from '../wordsFading';

const Intro = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="home-intro__body stack">
        <div className="hero-title">
          <h2 className="title">
            <strong>Bienvenue</strong> sur
            <br />
            <span>TweekTabs</span>
          </h2>
          <Separator></Separator>
          <p className="subTitle">
            Un <WordsFading></WordsFading>site qui te permet
            <br></br>
            de trouver et partager des tablatures !
          </p>
        </div>
        <div className="button-access-home">
          {!auth.isLoggedIn && (
            <Link to={'/signup'}>
              <button className="button">Inscrit-toi</button>
            </Link>
          )}
          <Link to={'/tabs'}>
            <button className="button see-tabs">Voir les tablatures</button>
          </Link>
        </div>
      </div>
      <div className="backgroundImage">
        <BackgroundLogo></BackgroundLogo>
      </div>
    </>
  );
};

export default Intro;
