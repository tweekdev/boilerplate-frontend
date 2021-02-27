import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import InstrumentList from '../components/InstrumentList';
import './Instruments.css';
const Instruments = () => {
  const [loadedInstruments, setLoadedInstruments] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/instruments`);
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
    <div className="main-instruments">
      <ErrorModal error={error} onClear={clearError} />
      <div className="instrument">
        {isLoading && (
          <div className="center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
        {!isLoading && loadedInstruments && (
          <InstrumentList items={loadedInstruments} />
        )}
      </div>
    </div>
  );
};

export default Instruments;
