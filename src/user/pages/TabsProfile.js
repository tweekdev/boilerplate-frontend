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
import '../../tabs/components/TabsItem.css';
import './TabsProfile.css';

toast.configure();
const TabsProfile = (props) => {
  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [loadedTabs, setLoadTabs] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweektabs/tabs/user/${auth.userId}`
        );
        setLoadTabs(responseData.tabs);
      } catch (err) {}
    };
    fetchTabs();
  }, [sendRequest]);

  const confirmDeleteHandler = async (id) => {
    setShowConfirmModal(false);

    try {
      await sendRequest(`/api/tweektabs/tabs/${id}`, 'DELETE', null, {
        Authorization: 'Bearer ' + auth.token,
      });
      toast.success('🦄 Tabs supprimé!', {
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
    <div className="main main-tabs-profile">
      <ErrorModal error={error} onClear={clearError} />
      {auth.isLoggedIn && (
        <div className="add-new-container">
          <Link to={'/tabs/new'}>
            <AddIcon />
          </Link>
        </div>
      )}
      <div className="tab-profil">
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading &&
          loadedTabs &&
          loadedTabs.map((tab, i) => (
            <div
              key={tab.id}
              className={`card-tabs card-tabs-profil ${
                i % 2 === 0 ? 'normalize' : 'inversed'
              }`}
            >
              <div className="header">
                <h3>{tab.name}</h3>
              </div>

              <div className="tabs-item__info">
                <div className="tabs-data">
                  <label>Chanteur:</label>
                  <h5> {tab.chanteur}</h5>
                </div>
                <div className="tabs-data">
                  <label>Difficulty:</label>
                  {tab.difficulty.name === 'easy' ? (
                    <h5 className="dif easy">{tab.difficulty.name}</h5>
                  ) : tab.difficulty.name === 'medium' ? (
                    <h5 className="dif medium">{tab.difficulty.name}</h5>
                  ) : tab.difficulty.name === 'hard' ? (
                    <h5 className="dif hard">{tab.difficulty.name}</h5>
                  ) : null}
                </div>
                <div className="tabs-data">
                  <label>Type:</label>
                  <h5> {tab.type.name}</h5>
                </div>
                <div className="tabs-data">
                  <label>Instrument:</label>
                  <h5>{tab.instrument.name}</h5>
                </div>
              </div>
              <div className="tabs-data tabs-choose-profil">
                <Link to={`/tabs/edit/${tab.id}`}>
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
                        onClick={() => confirmDeleteHandler(tab.id)}
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

export default TabsProfile;
