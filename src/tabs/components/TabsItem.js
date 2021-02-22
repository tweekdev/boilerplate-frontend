import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TabsItem.css';

const TabsItem = (props) => {
  const { isLoading } = useHttpClient();

  return (
    <div key={props.id} className="tabs--items">
      {isLoading && <LoadingSpinner asOverlay />}
      <Card
        className={`card-tabs ${props.i % 2 == 0 ? 'normalize' : 'inversed'}`}
      >
        <div className="header">
          <h3>{props.name}</h3>
        </div>

        <div className="tabs-item__info">
          <div className="tabs-data">
            <label>Chanteur:</label>
            <h4> {props.chanteur}</h4>
          </div>
          <div className="tabs-data">
            <label>Difficulty:</label>
            {props.difficulty.name === 'easy' ? (
              <h4 className="dif easy">{props.difficulty.name}</h4>
            ) : props.difficulty.name === 'medium' ? (
              <h4 className="dif medium">{props.difficulty.name}</h4>
            ) : props.difficulty.name === 'hard' ? (
              <h4 className="dif hard">{props.difficulty.name}</h4>
            ) : null}
          </div>
          <div className="tabs-data">
            <label>Type:</label>
            <h4> {props.type.name}</h4>
          </div>
          <div className="tabs-data">
            <label>Instrument:</label>
            <h4>{props.instrument.name}</h4>
          </div>
        </div>
        <Link className="tabs-choose" to={`/tab/${props.id}`}>
          <button className="pill button-reverse ">Choisir</button>
        </Link>
      </Card>
    </div>
  );
};

export default TabsItem;
