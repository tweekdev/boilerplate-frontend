import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TabDetail from '../components/TabDetail';
import './Tabs.css';

const Tab = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const tib = useParams().tabsId;
  const [loadedTab, setLoadTab] = useState();

  useEffect(() => {
    const fetchTab = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/${tib}`
        );
        console.log(responseData.tabs);
        setLoadTab(responseData.tabs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTab();
  }, [sendRequest, tib]);

  return (
    <div className="main-tabs">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tab">
        {isLoading && (
          <div className="center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        {!isLoading && loadedTab && <TabDetail items={loadedTab} />}
      </div>
    </div>
  );
};

export default Tab;
