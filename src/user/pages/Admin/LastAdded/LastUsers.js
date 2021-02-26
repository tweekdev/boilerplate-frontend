import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    color: '#f8f8fa',
  },
  media: {
    height: 0,
    color: '#f8f8fa',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    color: '#f8f8fa',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function LastUsers(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Dernières inscriptions" />
      {props.users &&
        props.users.map((user) => (
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                alt="picture"
                src={`${process.env.REACT_APP_BACKEND_URL}/${user.picture}`}
                className={classes.avatar}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${user.name} - ${user.firstname}`}
            subheader={`${user.pseudo} - ${moment
              .utc(user.date_inscription, 'YYYYMMDD, h:mm:ss a')
              .fromNow()}`}
          />
        ))}
    </Card>
  );
}
