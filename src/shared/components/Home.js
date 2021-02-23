import React from 'react';
import ExploreArtist from '../../explore/pages/ExploreArtist';
import ExploreDifficulty from '../../explore/pages/ExploreDifficulty';
import ExploreLastTutorial from '../../explore/pages/ExploreLastTutorial';
import ExploreType from '../../explore/pages/ExploreType';
import './Home.css';
import Intro from './Home/Intro/Intro';

const Home = () => {
  return (
    <div className="main-home">
      <section className="container">
        <div className="home-intro">
          <Intro />
        </div>
        <div className="container-home">
          <div className="home-push">
            <ExploreType />
          </div>
          <div className="home-push">
            <ExploreArtist />
          </div>
          <div className="home-push last-home">
            <ExploreLastTutorial />
            <ExploreDifficulty />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
