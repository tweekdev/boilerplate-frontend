import React, { useContext } from 'react';
import { pdfjs } from 'react-pdf';
import YouTube from 'react-youtube';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TutorialDetail.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const TutorialDetail = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="tab-content">
      <div className="tabs-list-item Test__container">
        <ErrorModal error={error} onClear={clearError} />
        <div key={props.items.id} className="tab-item">
          {isLoading && <LoadingSpinner asOverlay />}
          <h1>
            {props.items.name} - {props.items.chanteur}
          </h1>
        </div>
      </div>
      <div className="tuto-item-info">
        <div className="video">
          <YouTube
            videoId={props.items.link} // defaults -> null
            id={props.items.link} // defaults -> null
            opts={opts} // defaults -> {}
            onReady={_onReady} // defaults -> noop
          />
        </div>
        <div className="tuto-item__info">
          <Card className="card-tuto-item-info">
            <div className="tutorials-data">
              <label>Difficulty:</label>
              {props.items.difficulty.name === 'easy' ? (
                <h4 className="dif easy">{props.items.difficulty.name}</h4>
              ) : props.items.difficulty.name === 'medium' ? (
                <h4 className="dif medium">{props.items.difficulty.name}</h4>
              ) : props.items.difficulty.name === 'hard' ? (
                <h4 className="dif hard">{props.items.difficulty.name}</h4>
              ) : null}
            </div>
            <div className="tutorials-data">
              <label>Type:</label>
              <h4 className="items-desc">{props.items.type.name}</h4>
            </div>
            <div className="tutorials-data">
              <label>Instrument:</label>
              <h4 className="items-desc">{props.items.instrument.name}</h4>
            </div>
            {props.items.tab ? (
              <div className="linktab">
                <a
                  className="medium linktab"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={props.items.tab}
                >
                  Acceder à la tablature
                </a>
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;
