import React, { useCallback, useContext, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TabDetail.css';
import './TabDetail.less';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TabDetail = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const changePage = useCallback(
    (offset) =>
      setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset),
    []
  );
  const previousPage = useCallback(() => changePage(-1), [changePage]);

  const nextPage = useCallback(() => changePage(1), [changePage]);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No tabs found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="tabs-content">
      <div className="tabs-list-item">
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          <Card className="tab-card">
            <div key={props.items.id} className="tab-item">
              {isLoading && <LoadingSpinner asOverlay />}
              <div className="tab-item__info">
                <h2> {props.items.name}</h2>
                <div className="tabs-data">
                  <label>Chanteur:</label>
                  <h4> {props.items.chanteur}</h4>
                </div>
                <div className="tabs-data">
                  <label>Difficulty:</label>
                  {props.items.difficulty.name === 'easy' ? (
                    <h4 className="dif easy">{props.items.difficulty.name}</h4>
                  ) : props.items.difficulty.name === 'medium' ? (
                    <h4 className="dif medium">
                      {props.items.difficulty.name}
                    </h4>
                  ) : props.items.difficulty.name === 'hard' ? (
                    <h4 className="dif hard">{props.items.difficulty.name}</h4>
                  ) : null}
                </div>
                <div className="tabs-data">
                  <label>Type:</label>
                  <h4> {props.items.type.name}</h4>
                </div>
                <div className="tabs-data">
                  <label>Instrument:</label>
                  <h4>{props.items.instrument.name}</h4>
                </div>
                <a
                  href={`${process.env.REACT_APP_BACKEND_URL}/${props.items.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="button">Ouvrir</button>
                </a>
              </div>
            </div>
            <div className="tab-item Test__container__options">
              <div className="Test__container__content">
                <Document
                  className="custom-classname-document"
                  file={`${process.env.REACT_APP_BACKEND_URL}/${props.items.file}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <div className="Test__container__content__document">
                    <Page pageNumber={pageNumber} />
                  </div>
                  <div className="page-controls">
                    <button
                      disabled={pageNumber <= 1}
                      onClick={previousPage}
                      type="button"
                    >
                      Previous
                    </button>
                    <span>
                      {`Page ${pageNumber || (numPages ? 1 : '--')} of ${
                        numPages || '--'
                      }`}
                    </span>
                    <button
                      disabled={pageNumber >= numPages}
                      onClick={nextPage}
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </Document>
              </div>
            </div>
          </Card>
        </React.Fragment>
      </div>
    </div>
  );
};

export default TabDetail;
