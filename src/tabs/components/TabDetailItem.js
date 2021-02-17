import React, { useContext, useState } from 'react';
import { Document, Page } from 'react-pdf';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TabsItem.css';

const TabDetailItem = (props) => {
  const { isLoading, error, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div key={props.id} className="instrument-item">
        <Card className="instru">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="instrument-item__info">
            <h2>{props.name}</h2>
            <h2>{props.chanteur}</h2>
            <h3>{props.difficulty.name}</h3>
            <h4> {props.type.name}</h4>
            <h4>{props.instrument.name}</h4>
          </div>
          <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default TabDetailItem;
