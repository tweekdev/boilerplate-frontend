import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import Button from '../FormElements/Button';
import './Thanks.css';

const Thanks = () => {
  return (
    <div className="thanks__content">
      <h2 className="title-thanks">Thanks to...</h2>
      <div className="thanks__content__infos">
        <img
          className="avatar"
          src="http://imagetweek.tweekdev.com/img/samira.jpg"
          alt="Username"
        />
        <div className="profile">
          <div className="profile-name">
            Samira Jezareth Álvarez
            <div className="cardBody">
              <h3 className="profile-infos">Fotografía • Diseño Gráfico</h3>
              <div className="text-description">
                She's an <em>incredible</em> person who makes a{' '}
                <em>very good</em> work. Go check the profile ! ✌🏼
              </div>
            </div>
            <div className="actions">
              <div className="social">
                <a
                  className="link"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Instagram"
                  href={`https://www.instagram.com/samirajezareth/`}
                >
                  <FaInstagram className="icons" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="stack">My curriculum</h2>
      <div className="actions-content">
        <Button href="http://imagetweek.tweekdev.com/links/cvTheauAntoineFr.pdf">
          curriculum FR
        </Button>
        <Button
          inverse
          href="http://imagetweek.tweekdev.com/links/cvTheauAntoineEnglish.pdf"
        >
          curriculum EN
        </Button>
      </div>
    </div>
  );
};

export default Thanks;
