import Paper from '@material-ui/core/Paper';
import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <Paper className="card-paper" elevation={3}>
      <div className={`card ${props.className}`} style={props.style}>
        {props.children}
      </div>
    </Paper>
  );
};

export default Card;
