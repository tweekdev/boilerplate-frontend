import { Avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

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

export default function LastTabs(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Dernières tabs" />
      {props.tabs &&
        props.tabs.map((tab, i) => (
          <CardHeader
            key={i}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                Tabs
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <Link to={`/tab/${tab.id}`}>
                  <VisibilityIcon />
                </Link>
              </IconButton>
            }
            title={`${tab.name} - ${tab.chanteur}`}
            subheader={`${tab.type.name} - ${moment(
              tab.date,
              'YYYYMMDD'
            ).fromNow()}`}
          />
        ))}
    </Card>
  );
}
