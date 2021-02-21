import React from 'react';
import './Home.css';
import Content from './Home/content/Content';
import Intro from './Home/Intro/Intro';

const Home = () => {
  return (
    <div className="main-home">
      <section className="container">
        <div className="home-intro">
          <Intro />
        </div>
        <div className="home-push">
          <Content />
        </div>
      </section>
    </div>
  );
};

export default Home;
