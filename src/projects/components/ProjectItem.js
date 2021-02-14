import React, { useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProjectItem.css';

const PlaceItem = (props) => {
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
      await sendRequest(`/api/tweekdev/projects/${props.id}`, 'DELETE', null, {
        Authorization: 'Bearer ' + auth.token,
      });
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
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3 className="place-item__technos">{props.technos}</h3>
            <p className="place-item__p">{props.description}</p>
          </div>
          <div className="place-item__image">
            <img src={`/api/tweekdev/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <div className="place-item__actions">
              <Button href={props.lien}>Lien</Button>

              <Button href={props.repository} inverse>
                Repository
              </Button>
            </div>
          </div>
          {auth.userId === props.creatorId && (
            <div className="place-item__actions">
              <Button to={`/projects/${props.id}`}>EDIT</Button>

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

export default PlaceItem;
