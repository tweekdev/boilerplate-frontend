import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/auth-context';
import WordsFading from '../wordsFading';
import './Intro.css';
const Intro = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="home-intro__body stack">
        <div className="hero-title">
          <h2 className="title">
            <strong>Bienvenue</strong> sur
            <br />
            <span>Boilerplate</span>
          </h2>
          <p className="subTitle">
            Un <WordsFading/>site qui te permet
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
        </div>
      </div>
    </>
  );
};

export default Intro;
