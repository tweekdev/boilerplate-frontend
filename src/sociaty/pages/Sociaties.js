import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useAuth } from '../../shared/hooks/auth-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import SociatyList from '../components/SociatyList';
import NewSociaty from './NewSociaty';
import './Sociaties.css';
const Sociaties = () => {
  const { role } = useAuth();
  const [loadedSociaties, setLoadedSociaties] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchSociaties = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/sociatys`
        );
        setLoadedSociaties(responseData.sociatys);
      } catch (err) {}
    };
    fetchSociaties();
  }, [sendRequest]);

  const sociatyDeletedHandler = (deletedSociatyId) => {
    setLoadedSociaties((prevSociaty) =>
      prevSociaty.filter((sociaty) => sociaty.id !== deletedSociatyId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && loadedSociaties && (
        <div className="sociaty">
          <div className="sociaties">
            <h2>Sociaty Post</h2>
          </div>
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading &&
            loadedSociaties &&
            (role === '600a95934e40401083620eb4' ||
              role === '600aa5b24e40401083620eb6') && <NewSociaty></NewSociaty>}
          <SociatyList
            items={loadedSociaties}
            onDeleteSociaty={sociatyDeletedHandler}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Sociaties;
