import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import '../../tabs/components/TabsItem.css';
import './TabsProfile.css';
const TabsProfile = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [loadedTabs, setLoadTabs] = useState();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/user/${auth.userId}`
        );
        setLoadTabs(responseData.tabs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTabs();
  }, [sendRequest]);

  const confirmDeleteHandler = async () => {
    try {
      console.log();
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tabs/${loadedTabs.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
    } catch (err) {}
  };

  return (
    <div className="main main-tabs-profile">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tab-profil">
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading &&
          loadedTabs &&
          loadedTabs.map((tab, i) => (
            <Card
              key={tab.id}
              className={`card-tabs ${i % 2 === 0 ? 'normalize' : 'inversed'}`}
            >
              <div className="header">
                <h3>{tab.name}</h3>
              </div>

              <div className="tabs-item__info">
                <div className="tabs-data">
                  <label>Chanteur:</label>
                  <h4> {tab.chanteur}</h4>
                </div>
                <div className="tabs-data">
                  <label>Difficulty:</label>
                  {tab.difficulty.name === 'easy' ? (
                    <h4 className="dif easy">{tab.difficulty.name}</h4>
                  ) : tab.difficulty.name === 'medium' ? (
                    <h4 className="dif medium">{tab.difficulty.name}</h4>
                  ) : tab.difficulty.name === 'hard' ? (
                    <h4 className="dif hard">{tab.difficulty.name}</h4>
                  ) : null}
                </div>
                <div className="tabs-data">
                  <label>Type:</label>
                  <h4> {tab.type.name}</h4>
                </div>
                <div className="tabs-data">
                  <label>Instrument:</label>
                  <h4>{tab.instrument.name}</h4>
                </div>
              </div>
              <div className="tabs-data tabs-choose">
                <Link to={`/tabs/edit/${tab.id}`}>
                  <button className="pill button">
                    <EditIcon />
                  </button>
                </Link>
                <button onClick={confirmDeleteHandler} className="pill button">
                  <DeleteIcon />
                </button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default TabsProfile;
