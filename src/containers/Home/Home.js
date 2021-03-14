import React from 'react';
import './Home.css';
import Intro from './Intro/Intro';

const Home = () => {
  return (
    <div className="main-home">
      <section className="container">
        <div className="home-intro">
          <Intro />
        </div>
      </section>
    </div>
  );
};

export default Home;
