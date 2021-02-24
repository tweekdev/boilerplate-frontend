import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TutorialsItem.css';

const TutorialsItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <div key={props.id} className="tutorials--items">
      {isLoading && <LoadingSpinner asOverlay />}
      <Card
        className={`card-tutorials ${
          props.i % 2 == 0 ? 'normalize' : 'inversed'
        }`}
      >
        <div className="header">
          <h3>{props.name}</h3>
        </div>

        <div className="tutorials-item__info">
          <div className="tutorials-data">
            <label
              className={`${
                props.i % 2 === 0 ? 'normalize-label' : 'inversed-label'
              }`}
            >
              Chanteur:
            </label>
            <h4> {props.chanteur}</h4>
          </div>
          <div className="tutorials-data">
            <label
              className={`${
                props.i % 2 === 0 ? 'normalize-label' : 'inversed-label'
              }`}
            >
              Difficulty:
            </label>
            {props.difficulty.name === 'easy' ? (
              <h4 className="dif easy">{props.difficulty.name}</h4>
            ) : props.difficulty.name === 'medium' ? (
              <h4 className="dif medium">{props.difficulty.name}</h4>
            ) : props.difficulty.name === 'hard' ? (
              <h4 className="dif hard">{props.difficulty.name}</h4>
            ) : null}
          </div>
          <div className="tutorials-data">
            <label
              className={`${
                props.i % 2 === 0 ? 'normalize-label' : 'inversed-label'
              }`}
            >
              Type:
            </label>
            <h4> {props.type.name}</h4>
          </div>
          <div className="tutorials-data">
            <label
              className={`${
                props.i % 2 === 0 ? 'normalize-label' : 'inversed-label'
              }`}
            >
              Instrument:
            </label>
            <h4>{props.instrument.name}</h4>
          </div>
        </div>
        <Link className="tutorials-choose" to={`/tutorial/${props.id}`}>
          <button className="pill button-reverse">Choisir</button>
        </Link>
      </Card>
    </div>
  );
};

export default TutorialsItem;
