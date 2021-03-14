import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
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
function CounterUsers(props) {
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <div className="icon">
        <PeopleIcon />
      </div>
      <div className="count">
        <h3>{props.count}</h3>
      </div>
    </Paper>
  );
}

export default CounterUsers;
