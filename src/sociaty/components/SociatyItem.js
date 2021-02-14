import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './SociatyItem.css';

const NewsItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/sociatys/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this sociaty? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className="sociaty-item">
        <Card className="sociaty-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="sociaty-item__title">
            <h2 className="sociaty-item-h2">
              <Link className="sociaty-link" to={`/sociaties/${props.id}`}>
                {props.name}
              </Link>
            </h2>
          </div>
          <div className="sociaty-item__info">
            <p className="sociaty-item__p">{props.adresse}</p>
          </div>
          {auth.role === '600a95934e40401083620eb4' && (
            <div className="sociaty-item__actions">
              <Link className="sociaty-link" to={`/sociaties/edit/${props.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            </div>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default NewsItem;
