import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Explore.css';
import ExploreArtist from './ExploreArtist';
import ExploreType from './ExploreType';
const Explore = (props) => {
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
    <div className="main main-explore">
      <div className="explore">
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        <div className="explore-home">
          <ExploreType />
          <ExploreArtist />
        </div>
      </div>
    </div>
  );
};

export default Explore;
