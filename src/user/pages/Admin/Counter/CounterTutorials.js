import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));
function CounterTutorials(props) {
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <div className="icon">
        <YouTubeIcon />
      </div>
      <div className="count">
        <h3>{props.count}</h3>
      </div>
    </Paper>
  );
}

export default CounterTutorials;
