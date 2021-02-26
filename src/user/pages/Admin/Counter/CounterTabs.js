import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
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
function CounterTabs(props) {
  const classes = useStyles();
  return (
    <Paper className="counter-content" elevation={3}>
      <div className="icon">
        <QueueMusicIcon />
      </div>
      <div className="count">
        <h3>{props.count}</h3>
      </div>
    </Paper>
  );
}

export default CounterTabs;
