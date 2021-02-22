import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TutorialsList from '../components/TutorialsList';
import './Tutorials.css';
const Tutorials = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedTutorials, setLoadTutorials] = useState();

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tutorials`
        );
        setLoadTutorials(responseData.tutorials);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTutorials();
  }, [sendRequest]);

  return (
    <div className="main main-tutorials">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tutorial">
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedTutorials && (
          <TutorialsList items={loadedTutorials} />
        )}
      </div>
    </div>
  );
};

export default Tutorials;
