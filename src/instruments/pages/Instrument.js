import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ContentList from '../components/ContentList';
import './Instrument.css';

const Tab = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const iid = useParams().iid;
  const [loadedTab, setLoadTab] = useState();

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabsTutos/${iid}`
        );
        setLoadTab(responseData.instruments[0]);
      } catch (err) {}
    };
    fetchTutorial();
  }, [sendRequest, iid]);

  return (
    <div className="main-instruments-page">
      <ErrorModal error={error} onClear={clearError} />

      <div className="instrument-page">
        {isLoading && (
          <div className="center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        {!isLoading && loadedTab && <ContentList items={loadedTab} />}
      </div>
    </div>
  );
};

export default Tab;
