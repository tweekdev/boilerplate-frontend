import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './InstrumentItem.css';

const InstrumentItem = (props) => {
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
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div key={props.id} className="instrument-item">
        <Card className="instru">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="instrument-item__info">
            <h2>{props.name}</h2>
          </div>
          <Link to={`/instruments/${props.id}`}>
            <button className="button-reverse">Choisir</button>
          </Link>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default InstrumentItem;
