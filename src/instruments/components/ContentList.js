import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ContentList.css';
const ContentList = (props) => {
  const [searchTerm, setSeachTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  return (
    <div className="instrument-content-id">
      <div className="descritif-instruments">
        <h1>
          <strong>{props.items.name}</strong>
        </h1>
        <p>
          Envie d'apprendre et maitriser de nouvelles musiques par le biais de
          tablatures ou tutoriels ? Alors vous êtes sur le bon chemin...
        </p>
      </div>
      <div className="header-search">
        {isVisible && (
          <div className="search-container">
            <input
              className="form-control search-tabs search1"
              type="text"
              placeholder="recherche"
              onChange={(e) => setSeachTerm(e.target.value)}
            ></input>
          </div>
        )}
        <div className="search-active">
          <button
            className="btn-active-seach"
            onClick={() => setIsVisible(!isVisible)}
          >
            <SearchIcon></SearchIcon>
          </button>
        </div>
      </div>
      <div className="instruments-list-data">
        {props.items.tabs.length > 0 && (
          <div className="list-instrument-datas">
            <div className="descritif-instruments-data">
              <h2>
                Toutes les <strong>tabs</strong>
              </h2>
              <p>
                Envie d'apprendre et maitriser de nouvelles musiques par le
                biais de tablatures ? Alors vous êtes sur le bon chemin...
              </p>
            </div>
            {props.items.tabs &&
              props.items.tabs
                .filter((val) => {
                  if (searchTerm === '') {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((instrument) => (
                  <div key={instrument.id} className="tutorials--items">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Card className="card-tutorials">
                      <div className="header">
                        <h3>{instrument.name}</h3>
                      </div>

                      <div className="tutorials-item__info">
                        <div className="tutorials-data">
                          <label>Chanteur:</label>
                          <h4> {instrument.chanteur}</h4>
                        </div>
                        <div className="tutorials-data">
                          <label>Difficulty:</label>
                          {instrument.difficulty[0].name === 'easy' ? (
                            <h4 className="dif easy">
                              {instrument.difficulty[0].name}
                            </h4>
                          ) : instrument.difficulty[0].name === 'medium' ? (
                            <h4 className="dif medium">
                              {instrument.difficulty[0].name}
                            </h4>
                          ) : instrument.difficulty[0].name === 'hard' ? (
                            <h4 className="dif hard">
                              {instrument.difficulty[0].name}
                            </h4>
                          ) : null}
                        </div>
                        <div className="tutorials-data">
                          <label>Type:</label>
                          <h4> {instrument.type[0].name}</h4>
                        </div>
                      </div>
                      <Link
                        className="tutorials-choose"
                        to={`/tutorial/${instrument.id}`}
                      >
                        <button className="pill button ">Choisir</button>
                      </Link>
                    </Card>
                  </div>
                ))}
          </div>
        )}
        {props.items.tutorials.length > 0 && (
          <div className="list-instrument-datas">
            <div className="descritif-instruments-data">
              <h2>
                Tous les <strong>tutoriels</strong>
              </h2>
              <p>
                Envie d'apprendre et maitriser de nouvelles musiques par le
                biais de videos ou tablatures ? Alors vous êtes sur le bon
                chemin...
              </p>
            </div>

            {props.items.tutorials &&
              props.items.tutorials
                .filter((val) => {
                  if (searchTerm === '') {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((instrument) => (
                  <div key={instrument.id} className="tutorials--items">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Card className="card-tutorials">
                      <div className="header">
                        <h3>{instrument.name}</h3>
                      </div>

                      <div className="tutorials-item__info">
                        <div className="tutorials-data">
                          <label>Chanteur:</label>
                          <h4> {instrument.chanteur}</h4>
                        </div>
                        <div className="tutorials-data">
                          <label>Difficulty:</label>
                          {instrument.difficulty[0].name === 'easy' ? (
                            <h4 className="dif easy">
                              {instrument.difficulty[0].name}
                            </h4>
                          ) : instrument.difficulty[0].name === 'medium' ? (
                            <h4 className="dif medium">
                              {instrument.difficulty[0].name}
                            </h4>
                          ) : instrument.difficulty[0].name === 'hard' ? (
                            <h4 className="dif hard">
                              {instrument.difficulty[0].name}
                            </h4>
                          ) : null}
                        </div>
                        <div className="tutorials-data">
                          <label>Type:</label>
                          <h4> {instrument.type[0].name}</h4>
                        </div>
                      </div>
                      <Link
                        className="tutorials-choose"
                        to={`/tutorial/${instrument.id}`}
                      >
                        <button className="pill button ">Choisir</button>
                      </Link>
                    </Card>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
