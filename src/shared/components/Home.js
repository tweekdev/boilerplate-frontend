import React from 'react';
import './Home.css';
import CarouselHome from './Home/carousel/CarouselHome';
import Content from './Home/content/Content';
import Intro from './Home/Intro/Intro';

const Home = () => {
  return (
    <div className="main-home">
      <section className="container">
        <div className="home-intro">
          <Intro/>
        </div>
        <div className="home-push">
          <Content/>
        </div>
        <div className="home-push">
          <CarouselHome/>
        </div>
      </section>
    </div>
  );
};

export default Home;
