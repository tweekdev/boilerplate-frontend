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
import React from 'react';
import YouTube from 'react-youtube';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './TutorialDetail.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    '& > *': {
      margin: theme.spacing(1),
    },
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
  text: {
    color: '#f8f8fa',
  },
}));
const TutorialDetail = (props) => {
  const classes = useStyles();
  const { isLoading, error, clearError } = useHttpClient();
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
      <div className="tabs-list-item">
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
            className="video-youtube"
            videoId={props.items.link} // defaults -> null
            id={props.items.link} // defaults -> null
            opts={opts} // defaults -> {}
            onReady={_onReady} // defaults -> noop
          />
        </div>
        <div className="tuto-item__info">
          <Card className="card-tuto-item-info">
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
            {props.items.tab ? (
              <div className="linktab">
                <a
                  className="button"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={props.items.tab}
                >
                  Tablature
                </a>
              </div>
            ) : null}
          </Card>
        </div>
      </div>
      <div className="data-bottom">
        <div className="tutorials-data-single">
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
          <div className="tutorials-data-single">
            <div className={`${classes.root} user-head`}>
              <Avatar
                alt="picture"
                src={`/api/tweektabs/${props.items.creator.picture}`}
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
          <h2>A propos de ce tutoriel</h2>
          <p>{props.items.description}</p>
        </div>
      )}
    </div>
  );
};

export default TutorialDetail;
