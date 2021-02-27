import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../..//hooks/http-hook';
import Card from '../../UIElements/Card';
import './Content.css';

const Content = () => {
  const [tutorials, setTutorials] = useState();
  const [tabs, setTabs] = useState();
  const [instruments, setInstruments] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchLastTabs = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/tabs/last`);
        setTabs(responseData.tabs);
      } catch (err) {}
    };
    const fetchLastInstruments = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweektabs/instruments/last`
        );
        setInstruments(responseData.instruments);
      } catch (err) {}
    };
    const fetchLastTutorials = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/tutorials/last`);
        setTutorials(responseData.tutorials);
      } catch (err) {}
    };
    fetchLastTabs();
    fetchLastInstruments();
    fetchLastTutorials();
  }, [sendRequest]);
  return (
    <>
      <div className="home-push-content">
        <div className="hero-title-push">
          <h2 className="title hero-title-push">
            <strong>Apprendre grâce à </strong>
            <br />
            <span>plusieurs formats</span>
          </h2>
          <p className="text">
            Vous cherchez une tablature ou partition pour un instrument
            précisément ou une vidéo pour découvrir le morceau ou travailler
            l'oreille ?<br></br>
            Vous devriez trouver votre bonheur...
          </p>
        </div>
        <div className="mosaique">
          <Card className="card-data-last">
            <div className="header-data">
              <Link to="/tabs">
                <button className="orange">Les dernieres tablatures</button>
              </Link>
            </div>
            {tabs &&
              tabs.map((tab) => (
                <div key={tab.id} className="data-last">
                  <Link className="link-datas-home-page" to={`/tab/${tab.id}`}>
                    {tab.name} - {tab.chanteur}
                  </Link>
                  <hr />
                </div>
              ))}
          </Card>
          <Card className="card-data-last middle-card">
            <div className="header-data">
              <Link to="/instruments">
                <button className="green">Quelques instruments</button>
              </Link>
            </div>
            {instruments &&
              instruments.map((instrument) => (
                <div key={instrument.id} className="data-last">
                  <Link
                    className="link-datas-home-page"
                    to={`/instruments/${instrument.id}`}
                  >
                    {instrument.name}
                  </Link>
                  <hr />
                </div>
              ))}
          </Card>
          <Card className="card-data-last">
            <div className="header-data">
              <Link to="/tutorial">
                <button className="red">Les derniers tutoriels</button>
              </Link>
            </div>
            {tutorials &&
              tutorials.map((tutorial) => (
                <div key={tutorial.id} className="data-last">
                  <Link
                    className="link-datas-home-page"
                    to={`/tutorial/${tutorial.id}`}
                  >
                    {tutorial.name} - {tutorial.chanteur}
                  </Link>
                  <hr />
                </div>
              ))}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Content;
