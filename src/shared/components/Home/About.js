import React from 'react';
import styled from 'styled-components';
import Button from '../FormElements/Button';
import './About.css';
const AboutText = styled.div`
  color: #d4dcff;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.8;
  width: 85%;
  margin: 0 auto;
  text-align: center;
  transition: color 0.2s ease-out;

  & em {
    color: #5396e7;
    font-weight: 600;
    transition: color 0.2s ease-out;
  }
  & p {
    margin-bottom: 2rem;
  }
`;

const CustomSpan = styled.span`
  position: relative;
  font-style: italic;
  color: #5396e7;
  font-weight: 600;
  display: inline-block;
  word-break: break-word;
  white-space: normal;

  &:after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

const StackTitle = styled.h2`
  font-weight: 600;
  color: #d4dcff;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  transition: color 0.2s ease-out;
`;

const Stack = styled.p`
  color: #d4dcff;
  width: 75%;
  margin: 0 auto;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: #5396e7;
  text-transform: uppercase;
  font-weight: 700;
  transition: color 0.2s ease-out;
`;

const SubTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 2rem;
  color: #d4dcff;
  font-weight: 400;
  transition: color 0.2s ease-out;

  & span {
    color: #5396e7;
    font-style: italic;
    font-weight: 600;
    transition: color 0.2s ease-out;
  }
`;

const About = () => {
  var age = 0;
  const today = new Date();
  const birthDate = 1998; // create a date object directly from `dob1` argument
  const age_now = today.getFullYear() - birthDate;
  var m = today.getMonth();
  if (m <= 7) {
    age = age_now - 1;
  } else {
    age = age_now;
  }

  return (
    <div className="About__content">
      <Title>About me</Title>
      <SubTitle>
        If you’re <span>wondering</span> who <span>I am</span>…
      </SubTitle>
      <AboutText boutText>
        <p>
          I'm <span>Theau</span>, I am {age} years and I am a web developer from
          France.{' '}
        </p>
        <p>
          I did the formation web force 3 by Numerical where I learned{' '}
          <span>HTML, CSS, Javascript, PHP, SQL...</span> and by myself{' '}
          <span>nodeJs, Angular, VueJS, React...</span> because I love the
          environment Javascript !!!{' '}
        </p>
        <p>
          The code for me is a passion so I take online course like{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/vuejs-2-par-la-pratique/"
          >
            Vue.js 2 par la pratique
          </a>
          ,
          <a
            className="link_about"
            href="https://www.udemy.com/modern-javascript-from-novice-to-ninja/"
          >
            {' '}
            Modern JavaScript (from Novice to Ninja)
          </a>{' '}
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/react-2nd-edition/"
          >
            The Complete React developer course
          </a>
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/react-the-complete-guide-incl-redux/"
          >
            React - The Complete Guide
          </a>
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/nodejs-et-expressjs-par-la-pratique/"
          >
            Node.js - Express.js
          </a>
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/understand-nodejs/"
          >
            Learn and understand nodeJS
          </a>
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/the-complete-javascript-course/"
          >
            The complete Javascript course
          </a>
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/understand-javascript/"
          >
            Understanding the Weird Parts
          </a>
          ,{' '}
          <a
            className="link_about"
            href="https://www.udemy.com/modern-javascript-from-novice-to-ninja/"
          >
            Advanced CSS and Sass: Flexbox, Grid, Animations and More!
          </a>
          ,{' '}
          <a className="link_about" href="https://javascript30.com/">
            Javascript30
          </a>
          ,{' '}
          <a className="link_about" href="https://www.udemy.com/react-redux/">
            Modern React w/ Redux
          </a>{' '}
          and others on youtube, openclassroom... to learn a maximum.{' '}
        </p>
        <p>
          I always want to learn, do and be more ! so I'm always working and
          learning and creating new projects !
        </p>
        <StackTitle>
          My current <CustomSpan>stack</CustomSpan> of{' '}
          <CustomSpan>languages/technologies</CustomSpan> is:
        </StackTitle>
        <Stack>
          HTML5 - CSS3 - SASS/LESS/SCSS - STYLED COMPONENTS - BOOTSTRAP -
          JAVASCRIPT - JQUERY - REACTJS - REACT NATIVE - REDUX - ANGULAR - VUEJS
          - IONIC - CORDOVA - FIREBASE - PHP - SYMFONY - NODEJS - SQL - NOSQL
        </Stack>
        <img
          src="https://tryhackme-badges.s3.amazonaws.com/w0lf15.png"
          alt="TryHackMe"
        />
        <div className="actions-content">
          <h2 className="stack">My curriculum</h2>
          <div className="actions">
            <Button
              className="actions-content-btn"
              href="http://imagetweek.tweekdev.com/links/cvTheauAntoineFr.pdf"
            >
              curriculum FR
            </Button>
            <Button
              className="actions-content-btn"
              inverse
              href="http://imagetweek.tweekdev.com/links/cvTheauAntoineEnglish.pdf"
            >
              curriculum EN
            </Button>
          </div>
        </div>
      </AboutText>
    </div>
  );
};

export default About;
