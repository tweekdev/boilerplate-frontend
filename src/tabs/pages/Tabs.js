import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import TabsList from '../components/TabsList';
import './Tabs.css';
const Tabs = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedTabs, setLoadTabs] = useState();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs`
        );
        setLoadTabs(responseData.tabs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTabs();
  }, [sendRequest]);

  return (
    <div className="main main-tabs">
      <ErrorModal error={error} onClear={clearError} />

      <div className="tab">
        {isLoading && (
          <div className="center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        {!isLoading && loadedTabs && <TabsList items={loadedTabs} />}
      </div>
    </div>
  );
};

export default Tabs;
