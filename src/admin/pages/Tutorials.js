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
        setLoadTutorials(responseData.Tutorials);
      } catch (err) {}
    };
    fetchTutorials();
  }, [sendRequest]);

  return (
    <div className="main-admin">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tutorials-admin">
        <h3>Tutoriels</h3>
      </div>
      {isLoading && (
        <div className="center-admin">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}
      {!isLoading && loadedTutorials && (
        <TutorialsList tutorials={loadedTutorials} />
      )}
    </div>
  );
};

export default Tutorials;
