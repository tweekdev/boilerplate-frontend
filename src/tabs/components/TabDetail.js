import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MicIcon from '@material-ui/icons/Mic';
import StraightenOutlinedIcon from '@material-ui/icons/StraightenOutlined';
import React, { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TabDetail.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    '& > *': {
      margin: theme.spacing(1),
    },
    color: '#f8f8fa',
  },
  text: {
    color: '#f8f8fa',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatar: {
    backgroundColor: '#0F122F',
  },
}));
const TabDetail = (props) => {
  const classes = useStyles();

  const { isLoading, error, clearError } = useHttpClient();
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
    <div className="tab-content">
      <div className="tabs-list-item">
        <ErrorModal error={error} onClear={clearError} />
        <div key={props.items.id} className="tab-item">
          {isLoading && <LoadingSpinner asOverlay />}
          <h1>
            {props.items.name} - {props.items.chanteur}
          </h1>
        </div>
      </div>
      <div className="tab-item-info">
        <div className="pdf">
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
        <div className="tab-item__info">
          <Card className="card-tab-item-info">
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <MicIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.text}
                  primary="Chanteur"
                  secondary={props.items.chanteur}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <LibraryMusicIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.text}
                  primary="Type"
                  secondary={props.items.type.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <StraightenOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.text}
                  primary="Instrument"
                  secondary={props.items.instrument.name}
                />
              </ListItem>
            </List>

            <div className="linktab">
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/${props.items.file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="button">Ouvrir</button>
              </a>
            </div>
          </Card>
        </div>
      </div>
      <div className="data-bottom">
        <div className="tabs-data-single">
          <label>Difficulty:</label>
          {props.items.difficulty.name === 'easy' ? (
            <h4 className="dif easy">{props.items.difficulty.name}</h4>
          ) : props.items.difficulty.name === 'medium' ? (
            <h4 className="dif medium">{props.items.difficulty.name}</h4>
          ) : props.items.difficulty.name === 'hard' ? (
            <h4 className="dif hard">{props.items.difficulty.name}</h4>
          ) : null}
        </div>
        {props.items.creator && (
          <div className="tabs-data-single">
            <div className={`${classes.root} user-head`}>
              <Avatar
                alt="picture"
                src={`${process.env.REACT_APP_BACKEND_URL}/${props.items.creator.picture}`}
                className={classes.small}
              />
            </div>
            <div className="auteur">
              <h5>
                Auteur: <strong>{props.items.creator.pseudo} </strong>
              </h5>
            </div>
          </div>
        )}
      </div>
      {props.items.description && (
        <div className="description-data-single">
          <h2>A propos de cette tabs</h2>
          <p>{props.items.description}</p>
        </div>
      )}
    </div>
  );
};

export default TabDetail;
