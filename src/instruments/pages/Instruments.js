import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import InstrumentList from '../components/InstrumentList';

const Instruments = () => {
  const [loadedInstruments, setLoadedInstruments] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/instruments`
        );
        setLoadedInstruments(responseData.instruments);
      } catch (err) {}
    };
    fetchInstruments();
  }, [sendRequest]);

  const projectDeletedHandler = (deletedInstrumentId) => {
    setLoadedInstruments((prevInstruments) =>
      prevInstruments.filter(
        (instrument) => instrument.id !== deletedInstrumentId
      )
    );
  };

  return (
    <div className="main">
      <ErrorModal error={error} onClear={clearError} />

      <div className="user">
        <div className="users">
          <h3>Instruments</h3>
        </div>
        {isLoading && (
          <div className="center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        {!isLoading && loadedInstruments && (
          <InstrumentList items={loadedInstruments} />
        )}
        ß
      </div>
    </div>
  );
};

export default Instruments;
