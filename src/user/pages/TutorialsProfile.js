import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import '../../tutorials/components/TutorialsItem.css';
import './TutorialsProfile.css';

toast.configure();
const TutorialsProfile = (props) => {
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [loadedTutorials, setLoadTutorials] = useState();
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tutorials/user/${auth.userId}`
        );
        setLoadTutorials(responseData.tutorials);
      } catch (err) {}
    };
    fetchTutorials();
  }, [sendRequest]);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async (id) => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tutorials/${id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      toast.success('🦄 Tutoriel supprimé!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/');
    } catch (err) {
      toast.error('An error occurred!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="main main-tutorials-profile">
      <ErrorModal error={error} onClear={clearError} />
      {auth.isLoggedIn && (
        <div className="add-new-container">
          <Link to={'/tutorial/new'}>
            <AddIcon />
          </Link>
        </div>
      )}
      <div className="tutorial-profil">
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading &&
          loadedTutorials &&
          loadedTutorials.map((tutorial, i) => (
            <div
              key={tutorial.id}
              className={`card-tutorials card-tutorials-profil ${
                i % 2 === 0 ? 'normalize' : 'inversed'
              }`}
            >
              <div className="header">
                <h3>{tutorial.name}</h3>
              </div>

              <div className="tutorials-item__info">
                <div className="tutorials-data">
                  <label>Chanteur:</label>
                  <h5> {tutorial.chanteur}</h5>
                </div>
                <div className="tutorials-data">
                  <label>Difficulty:</label>
                  {tutorial.difficulty.name === 'easy' ? (
                    <h5 className="dif easy">{tutorial.difficulty.name}</h5>
                  ) : tutorial.difficulty.name === 'medium' ? (
                    <h5 className="dif medium">{tutorial.difficulty.name}</h5>
                  ) : tutorial.difficulty.name === 'hard' ? (
                    <h5 className="dif hard">{tutorial.difficulty.name}</h5>
                  ) : null}
                </div>
                <div className="tutorials-data">
                  <label>Type:</label>
                  <h5> {tutorial.type.name}</h5>
                </div>
                <div className="tutorials-data">
                  <label>Instrument:</label>
                  <h5>{tutorial.instrument.name}</h5>
                </div>
              </div>
              <div className="tutorials-data tutorials-choose-profil">
                <Link to={`/tutorials/edit/${tutorial.id}`}>
                  <button className="pill button">
                    <EditIcon />
                  </button>
                </Link>
                <button
                  onClick={showDeleteWarningHandler}
                  className="pill button"
                >
                  <DeleteIcon />
                </button>
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
                      <Button
                        danger
                        onClick={() => confirmDeleteHandler(tutorial.id)}
                      >
                        DELETE
                      </Button>
                    </React.Fragment>
                  }
                >
                  <p>
                    Do you want to proceed and delete this place? Please note
                    that it can't be undone thereafter.
                  </p>
                </Modal>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TutorialsProfile;
