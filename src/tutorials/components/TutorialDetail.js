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
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="tabs-content">
      <div className="tabs-list-item Test__container">
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          <Card className="tab-card">
            <div key={props.items.id} className="tab-item">
              {isLoading && <LoadingSpinner asOverlay />}
              <div className="tab-item__info">
                <h2>{props.items.name}</h2>
                <h2>{props.items.chanteur}</h2>
                <h3 className="difficulty">
                  Level: {props.items.difficulty.name}
                </h3>
                <h4 className="items-desc">Type: {props.items.type.name}</h4>
                <h4 className="items-desc">
                  Instrument: {props.items.instrument.name}
                </h4>
                {props.items.tab ? (
                  <h4 className="items-desc">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={props.items.tab}
                    >
                      Tablature
                    </a>
                  </h4>
                ) : null}
              </div>
            </div>
            <div className="tab-item Test__container__options">
              <div className="Test__container__content">
                <YouTube
                  videoId={props.items.link} // defaults -> null
                  id={props.items.link} // defaults -> null
                  opts={opts} // defaults -> {}
                  onReady={_onReady} // defaults -> noop
                />
              </div>
            </div>
          </Card>
        </React.Fragment>
      </div>
    </div>
  );
};

export default TutorialDetail;
