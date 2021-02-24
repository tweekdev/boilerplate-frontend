import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import '../../tutorials/components/TutorialsItem.css';
import './TutorialsProfile.css';
const TutorialsProfile = (props) => {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchTutorials();
  }, [sendRequest]);

  const confirmDeleteHandler = async () => {
    try {
      console.log();
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tutorials/${loadedTutorials.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
    } catch (err) {}
  };

  return (
    <div className="main main-tutorials-profile">
      <ErrorModal error={error} onClear={clearError} />

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
                <button onClick={confirmDeleteHandler} className="pill button">
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TutorialsProfile;
