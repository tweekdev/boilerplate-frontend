import React from 'react';
import ExploreArtist from '../../explore/pages/ExploreArtist';
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
        <div className="home-push">
          <ExploreType />
        </div>
        <div className="home-push">
          <ExploreArtist />
        </div>
      </section>
    </div>
  );
};

export default Home;
