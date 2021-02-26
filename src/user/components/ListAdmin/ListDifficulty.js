import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
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
    backgroundColor: '#ff9800',
  },
}));

export default function ListDifficulty(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Difficulté" />
      {props.difficulties &&
        props.difficulties.map((difficulty, i) => (
          <CardHeader
            key={i}
            avatar={<Avatar className={classes.avatar}>D</Avatar>}
            action={
              <IconButton aria-label="settings">
                <Link to={`/difficulties/edit/${difficulty.id}`}>
                  <EditIcon />
                </Link>
              </IconButton>
            }
            title={`${difficulty.name}`}
          />
        ))}
    </Card>
  );
}
