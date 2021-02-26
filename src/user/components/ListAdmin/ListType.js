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
    backgroundColor: '#29b6f6',
  },
}));

export default function ListType(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Types" />
      {props.types &&
        props.types.map((type, i) => (
          <CardHeader
            key={i}
            avatar={<Avatar className={classes.avatar}>T</Avatar>}
            action={
              <IconButton aria-label="settings">
                <Link to={`/types/edit/${type.id}`}>
                  <EditIcon />
                </Link>
              </IconButton>
            }
            title={`${type.name}`}
          />
        ))}
    </Card>
  );
}
