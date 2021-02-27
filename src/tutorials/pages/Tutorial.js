import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
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
          `/api/tweektabs/tutorials/${tuib}`
        );
        setLoadTab(responseData.tutorials);
      } catch (err) {}
    };
    fetchTutorial();
  }, [sendRequest, tuib]);

  return (
    <div className="main-tutorials-single">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tutorial">
        {isLoading && (
          <div className="center">
            <div>
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />

              <Skeleton variant="rect" width={500} height={500} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton width="60%" />
            </div>
          </div>
        )}
        {!isLoading && loadedTab && <TutorialDetail items={loadedTab} />}
      </div>
    </div>
  );
};

export default Tab;
