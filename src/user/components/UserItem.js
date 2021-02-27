import DeleteIcon from '@material-ui/icons/Delete';
import { XGrid } from '@material-ui/x-grid';
import React, { useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserItem.css';

const UserItem = (props) => {
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
      await sendRequest(`/api/tweektabs/users/${props.id}`, 'DELETE', null, {
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
        header="Are you sure ?"
        footerClass="users-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this user? Please note that it can't
          be undone thereafter.
        </p>
      </Modal>
      <div className="users-item">
        <Card className="users-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div style={{ height: 400, width: '100%' }}>
            <XGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
            />
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserItem;
