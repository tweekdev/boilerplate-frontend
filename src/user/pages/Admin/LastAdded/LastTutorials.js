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

export default function LastTutorials(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Derniers tutoriels" />
      {props.tutorials &&
        props.tutorials.map((tutorial) => (
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                Tuto
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <Link to={`/tutorial/${tutorial.id}`}>
                  <VisibilityIcon />
                </Link>
              </IconButton>
            }
            title={`${tutorial.name} - ${tutorial.chanteur}`}
            subheader={`${tutorial.type.name} - ${moment(
              tutorial.date,
              'YYYYMMDD'
            ).fromNow()}`}
          />
        ))}
    </Card>
  );
}
