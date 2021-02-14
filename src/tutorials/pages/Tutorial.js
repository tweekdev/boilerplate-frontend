import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TutorialDetail from '../components/TutorialDetail';
import './Tutorial.css';

const Tab = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const tuib = useParams().tutorialId;
  const [loadedTab, setLoadTab] = useState();

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tutorials/${tuib}`
        );
        setLoadTab(responseData.tutorials);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTutorial();
  }, [sendRequest, tuib]);

  return (
    <div className="main-tutorials">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tutorial">
        {isLoading && (
          <div className="center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        {!isLoading && loadedTab && <TutorialDetail items={loadedTab} />}
      </div>
    </div>
  );
};

export default Tab;